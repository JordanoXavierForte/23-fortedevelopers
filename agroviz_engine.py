"""
AgroViz · Motor de Match entre Produtores Rurais
=================================================
Hackathon 2026 — Safra+

ARQUITETURA (5 módulos):
  1. Modelos de dados         → Produtor, GrupoCompra, MaquinaAnuncio
  2. ScoreEngine              → Score 0–1000 multidimensional
  3. FeatureExtractor         → Vetor numérico por produtor
  4. MatchEngine (KNN)        → Produtores compatíveis
  5. MatchGrupoCompra         → Candidatos para grupos abertos
"""

from __future__ import annotations

import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from sklearn.neighbors import NearestNeighbors

import warnings
warnings.filterwarnings("ignore")


# ─────────────────────────────────────────────────────────────────
# 1. MODELOS DE DADOS
# ─────────────────────────────────────────────────────────────────

@dataclass
class Produtor:
    id: int
    nome: str
    estado: str
    municipio: str
    lat: float
    lng: float
    area_total_ha: float
    area_cultivada_ha: float
    culturas: List[str]
    interesses: List[str]
    maquinas: List[Dict]           # [{tipo, preco_dia, disponivel_meses}]
    negocios_concluidos: int = 0
    pagamentos_em_dia: int = 0     # 0–100 (%)
    avaliacoes_media: float = 0.0  # 0–5
    meses_na_plataforma: int = 0


@dataclass
class GrupoCompra:
    id: int
    insumo: str
    quantidade_meta_ton: float
    quantidade_atual_ton: float
    municipio: str
    estado: str
    lat: float
    lng: float
    preco_unitario_grupo: float
    preco_unitario_mercado: float
    participantes: List[int]
    culturas_alvo: List[str]


@dataclass
class MaquinaAnuncio:
    id: int
    produtor_id: int
    tipo: str
    modelo: str
    ano: int
    preco_dia: float
    disponivel_meses: List[int]
    lat: float
    lng: float
    municipio: str
    estado: str


# ─────────────────────────────────────────────────────────────────
# 2. SCORE MULTIDIMENSIONAL (0–1000)
# ─────────────────────────────────────────────────────────────────

class ScoreEngine:
    """
    Dimensões e pesos:
      D1 Completude de perfil  20%
      D2 Histórico de negócios 30%
      D3 Pontualidade          30%
      D4 Reputação             20%

    Prioriza comportamento financeiro sobre dados estáticos:
    um produtor pontual sem perfil completo vale mais que
    um com perfil cheio e histórico zerado.
    """

    PESOS = {"completude": 0.20, "historico": 0.30, "pontualidade": 0.30, "reputacao": 0.20}

    def calcular(self, p: Produtor) -> Dict:
        d = {
            "completude":   self._completude(p),
            "historico":    self._historico(p),
            "pontualidade": p.pagamentos_em_dia / 100.0,
            "reputacao":    p.avaliacoes_media / 5.0,
        }
        bruto = sum(d[k] * self.PESOS[k] for k in d)
        score = round(min(1000, max(0, bruto * 1000)))
        return {
            "score": score,
            "faixa": self._faixa(score),
            "dimensoes": {k: round(v * 100) for k, v in d.items()},
        }

    def _completude(self, p: Produtor) -> float:
        pontos = sum([
            bool(p.estado), bool(p.municipio),
            bool(p.lat and p.lng),
            p.area_total_ha > 0, bool(p.area_cultivada_ha),
            len(p.culturas) > 0,  len(p.culturas) > 0,   # peso duplo
            len(p.interesses) > 0, len(p.interesses) > 0, # peso duplo
            len(p.maquinas) > 0,
        ])
        return pontos / 10.0

    def _historico(self, p: Produtor) -> float:
        if p.negocios_concluidos == 0:
            return 0.1
        return min(1.0, np.log1p(p.negocios_concluidos) / np.log1p(20))

    def _faixa(self, s: int) -> str:
        if s >= 850: return "A"
        if s >= 700: return "B"
        if s >= 550: return "C"
        if s >= 400: return "D"
        return "E"


# ─────────────────────────────────────────────────────────────────
# 3. EXTRATOR DE FEATURES (vetor 12-D)
# ─────────────────────────────────────────────────────────────────

class FeatureExtractor:
    """
    Índice  Significado
    ──────  ─────────────────────────────────────────
    [0]     área cultivada normalizada
    [1]     volume estimado de insumo (área × fator)
    [2]     tem máquina cadastrada
    [3]     quer alugar MINHA máquina
    [4]     quer comprar insumo em grupo
    [5]     quer dividir frete
    [6]     planta grãos (soja/milho/trigo/arroz/feijão)
    [7]     planta culturas especiais (café/cana/algodão)
    [8]     planta pastagem/pecuária
    [9]     score normalizado
    [10]    tempo na plataforma normalizado
    [11]    diversidade de culturas
    """

    GRAOS     = {"Soja", "Milho", "Trigo", "Arroz", "Feijão"}
    ESPECIAIS = {"Café", "Cana", "Algodão"}
    PECUARIA  = {"Pastagem"}

    FATOR_INSUMO = {
        "Soja": 0.32, "Milho": 0.40, "Trigo": 0.28, "Arroz": 0.25,
        "Feijão": 0.20, "Café": 0.45, "Cana": 0.38, "Algodão": 0.35,
        "Pastagem": 0.10,
    }

    def extrair(self, p: Produtor, score: int) -> np.ndarray:
        c = set(p.culturas)
        vol = sum(self.FATOR_INSUMO.get(cu, 0.20) * p.area_cultivada_ha for cu in p.culturas)

        return np.array([
            min(p.area_cultivada_ha / 2000.0, 1.0),
            min(vol / 500.0, 1.0),
            1.0 if p.maquinas else 0.0,
            1.0 if "Alugar minha máquina" in p.interesses else 0.0,
            1.0 if "Comprar insumos em grupo" in p.interesses else 0.0,
            1.0 if "Dividir frete" in p.interesses else 0.0,
            1.0 if c & self.GRAOS else 0.0,
            1.0 if c & self.ESPECIAIS else 0.0,
            1.0 if c & self.PECUARIA else 0.0,
            score / 1000.0,
            min(p.meses_na_plataforma / 24.0, 1.0),
            min(len(p.culturas) / 5.0, 1.0),
        ])


# ─────────────────────────────────────────────────────────────────
# 4. KNN MATCH — produtores compatíveis
# ─────────────────────────────────────────────────────────────────

class MatchEngine:
    """
    K-Nearest Neighbors ponderado.

    Por que KNN?
    • Interpretável: distância entre vetores tem significado real
    • Sem necessidade de dados históricos para funcionar
    • Escala com novos produtores sem retreinamento

    Pesos: interesses complementares valem 3× mais que dados estáticos.
    """

    PESOS = np.array([1.0, 2.0, 1.5, 3.0, 3.0, 1.5, 2.0, 1.0, 0.5, 2.0, 0.5, 1.0])

    def __init__(self):
        self._modelo: Optional[NearestNeighbors] = None
        self._prod: List[Produtor] = []

    def indexar(self, produtores: List[Produtor], scores: Dict[int, int], ext: FeatureExtractor):
        self._prod = produtores
        mat = np.array([ext.extrair(p, scores[p.id]) * self.PESOS for p in produtores])
        k = min(10, len(produtores))
        self._modelo = NearestNeighbors(n_neighbors=k, algorithm="ball_tree", metric="euclidean")
        self._modelo.fit(mat)
        self._ext = ext

    def buscar(self, alvo: Produtor, score_alvo: int,
               raio_km: float = 150.0, top_n: int = 5) -> List[Dict]:
        if not self._modelo:
            raise RuntimeError("Chame indexar() antes de buscar()")

        vetor = self._ext.extrair(alvo, score_alvo) * self.PESOS
        dists, idxs = self._modelo.kneighbors([vetor])

        resultados = []
        for dist, idx in zip(dists[0], idxs[0]):
            cand = self._prod[idx]
            if cand.id == alvo.id:
                continue
            dist_km = _haversine(alvo.lat, alvo.lng, cand.lat, cand.lng)
            if dist_km > raio_km:
                continue
            motivos = _motivos(alvo, cand)
            if not motivos:
                continue
            pct = _pct_match(dist, dist_km, raio_km)
            resultados.append({
                "produtor": cand,
                "match_pct": pct,
                "dist_km": round(dist_km, 1),
                "motivos": motivos,
            })

        resultados.sort(key=lambda x: x["match_pct"], reverse=True)
        return resultados[:top_n]


# ─────────────────────────────────────────────────────────────────
# 5. MATCH PARA GRUPOS DE COMPRA
# ─────────────────────────────────────────────────────────────────

class MatchGrupoCompra:
    """
    Dado um grupo aberto, rankeia produtores com maior probabilidade
    de aderir usando: distância · cultura · volume · score · interesse.
    """

    FATORES = {
        "Ureia":   {"Soja": 0.10, "Milho": 0.18, "Trigo": 0.12, "default": 0.10},
        "MAP":     {"Soja": 0.12, "Milho": 0.15, "default": 0.08},
        "KCl":     {"Soja": 0.14, "Milho": 0.12, "default": 0.09},
        "Semente": {"Soja": 0.06, "Milho": 0.03, "default": 0.04},
    }

    def recomendar(self, grupo: GrupoCompra, produtores: List[Produtor],
                   scores: Dict[int, int], raio_km: float = 200.0,
                   score_min: int = 400) -> List[Dict]:
        ja_no_grupo = set(grupo.participantes)
        falta = grupo.quantidade_meta_ton - grupo.quantidade_atual_ton
        resultados = []

        for p in produtores:
            if p.id in ja_no_grupo:
                continue
            if scores.get(p.id, 0) < score_min:
                continue
            if "Comprar insumos em grupo" not in p.interesses:
                continue
            culturas_ok = set(p.culturas) & set(grupo.culturas_alvo)
            if not culturas_ok:
                continue
            dist_km = _haversine(p.lat, p.lng, grupo.lat, grupo.lng)
            if dist_km > raio_km:
                continue

            vol = self._vol(p, grupo.insumo)
            fit = self._fit(scores[p.id], dist_km, raio_km, vol, falta, culturas_ok)
            economia = vol * (grupo.preco_unitario_mercado - grupo.preco_unitario_grupo)

            resultados.append({
                "produtor": p,
                "score": scores[p.id],
                "fit_pct": fit,
                "dist_km": round(dist_km, 1),
                "vol_ton": round(vol, 1),
                "economia_brl": round(economia),
                "culturas": list(culturas_ok),
            })

        resultados.sort(key=lambda x: x["fit_pct"], reverse=True)
        return resultados

    def _vol(self, p: Produtor, insumo: str) -> float:
        tab = self.FATORES.get(insumo, {"default": 0.08})
        return sum(p.area_cultivada_ha * tab.get(c, tab["default"]) for c in p.culturas)

    def _fit(self, score, dist_km, raio_km, vol, falta, culturas) -> int:
        geo  = 1.0 - dist_km / raio_km
        conf = score / 1000.0
        vol_ok = min(vol / max(falta, 1), 1.0)
        cult = min(len(culturas) / 2.0, 1.0)
        return max(10, min(99, round((geo * 0.25 + conf * 0.30 + vol_ok * 0.25 + cult * 0.20) * 100)))


# ─────────────────────────────────────────────────────────────────
# FUNÇÕES AUXILIARES
# ─────────────────────────────────────────────────────────────────

def _haversine(lat1, lng1, lat2, lng2) -> float:
    R = 6371.0
    dlat = np.radians(lat2 - lat1)
    dlng = np.radians(lng2 - lng1)
    a = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlng / 2) ** 2
    return R * 2 * np.arcsin(np.sqrt(a))


def _pct_match(dist_vetor: float, dist_km: float, raio_km: float) -> int:
    base = np.exp(-dist_vetor)
    geo  = 1.0 - dist_km / raio_km
    pct  = (base * 0.75 + geo * 0.25) * 100
    return max(10, min(99, round(pct)))


def _motivos(alvo: Produtor, cand: Produtor) -> List[str]:
    motivos = []
    comuns = set(alvo.culturas) & set(cand.culturas)

    if ("Comprar insumos em grupo" in alvo.interesses
            and "Comprar insumos em grupo" in cand.interesses
            and comuns):
        c = ", ".join(list(comuns)[:2])
        motivos.append(f"Ambos plantam {c} e querem comprar insumos em grupo")

    if ("Alugar máquina de vizinho" in alvo.interesses
            and cand.maquinas
            and "Alugar minha máquina" in cand.interesses):
        tipo = cand.maquinas[0].get("tipo", "máquina")
        motivos.append(f"Você precisa de máquina · ele tem {tipo} disponível")

    if ("Alugar minha máquina" in alvo.interesses
            and alvo.maquinas
            and "Alugar máquina de vizinho" in cand.interesses):
        tipo = alvo.maquinas[0].get("tipo", "máquina")
        motivos.append(f"Ele precisa de máquina · você tem {tipo} disponível")

    if ("Dividir frete" in alvo.interesses
            and "Dividir frete" in cand.interesses
            and comuns):
        motivos.append("Mesma cultura · podem dividir o frete juntos")

    vol_a, vol_c = alvo.area_cultivada_ha, cand.area_cultivada_ha
    if vol_a > 0 and abs(vol_a - vol_c) / vol_a < 0.40:
        motivos.append("Volume de compra similar · boa base para negociação")

    return motivos


# ─────────────────────────────────────────────────────────────────
# MOCK DE DADOS — produtores RS/SC/PR (espelha o app)
# ─────────────────────────────────────────────────────────────────

PRODUTORES: List[Produtor] = [
    Produtor(
        id=1, nome="Carlos Bento", estado="RS", municipio="Não-Me-Toque",
        lat=-28.46, lng=-52.82, area_total_ha=650, area_cultivada_ha=580,
        culturas=["Soja", "Milho", "Trigo"],
        interesses=["Comprar insumos em grupo", "Alugar minha máquina"],
        maquinas=[{"tipo": "Colheitadeira", "preco_dia": 1400}],
        negocios_concluidos=8, pagamentos_em_dia=100,
        avaliacoes_media=4.7, meses_na_plataforma=18,
    ),
    Produtor(
        id=2, nome="José Melo", estado="RS", municipio="Carazinho",
        lat=-28.28, lng=-52.78, area_total_ha=420, area_cultivada_ha=380,
        culturas=["Soja", "Trigo"],
        interesses=["Comprar insumos em grupo", "Alugar máquina de vizinho"],
        maquinas=[],
        negocios_concluidos=5, pagamentos_em_dia=95,
        avaliacoes_media=4.5, meses_na_plataforma=12,
    ),
    Produtor(
        id=3, nome="Ana Ritter", estado="RS", municipio="Passo Fundo",
        lat=-28.26, lng=-52.40, area_total_ha=310, area_cultivada_ha=280,
        culturas=["Soja", "Milho"],
        interesses=["Comprar insumos em grupo", "Dividir frete"],
        maquinas=[],
        negocios_concluidos=3, pagamentos_em_dia=90,
        avaliacoes_media=4.2, meses_na_plataforma=8,
    ),
    Produtor(
        id=4, nome="Lauro Pereira", estado="RS", municipio="Lagoa Vermelha",
        lat=-28.21, lng=-51.52, area_total_ha=800, area_cultivada_ha=720,
        culturas=["Soja", "Milho", "Feijão"],
        interesses=["Alugar minha máquina", "Dividir frete"],
        maquinas=[
            {"tipo": "Plantadeira", "preco_dia": 850},
            {"tipo": "Trator", "preco_dia": 680},
        ],
        negocios_concluidos=12, pagamentos_em_dia=98,
        avaliacoes_media=4.9, meses_na_plataforma=24,
    ),
    Produtor(
        id=5, nome="Vera Stolz", estado="RS", municipio="Ijuí",
        lat=-28.39, lng=-53.91, area_total_ha=240, area_cultivada_ha=210,
        culturas=["Soja", "Trigo"],
        interesses=["Comprar insumos em grupo"],
        maquinas=[],
        negocios_concluidos=2, pagamentos_em_dia=100,
        avaliacoes_media=4.0, meses_na_plataforma=4,
    ),
    Produtor(
        id=6, nome="Marco Bianchi", estado="RS", municipio="Passo Fundo",
        lat=-28.24, lng=-52.42, area_total_ha=520, area_cultivada_ha=480,
        culturas=["Soja", "Milho"],
        interesses=["Comprar insumos em grupo", "Alugar minha máquina"],
        maquinas=[{"tipo": "Pulverizador", "preco_dia": 540}],
        negocios_concluidos=6, pagamentos_em_dia=97,
        avaliacoes_media=4.6, meses_na_plataforma=16,
    ),
    Produtor(
        id=7, nome="Antônio Ferraz", estado="RS", municipio="Marau",
        lat=-28.45, lng=-52.20, area_total_ha=730, area_cultivada_ha=660,
        culturas=["Soja", "Milho", "Trigo"],
        interesses=["Alugar minha máquina", "Dividir frete"],
        maquinas=[{"tipo": "Colheitadeira", "preco_dia": 1200}],
        negocios_concluidos=15, pagamentos_em_dia=100,
        avaliacoes_media=4.9, meses_na_plataforma=30,
    ),
    Produtor(
        id=8, nome="Rosa Lenz", estado="RS", municipio="Sarandi",
        lat=-27.95, lng=-52.93, area_total_ha=280, area_cultivada_ha=250,
        culturas=["Soja"],
        interesses=["Comprar insumos em grupo", "Dividir frete"],
        maquinas=[],
        negocios_concluidos=4, pagamentos_em_dia=92,
        avaliacoes_media=4.3, meses_na_plataforma=10,
    ),
    Produtor(
        id=9, nome="Pedro Thomé", estado="RS", municipio="Augusto Pestana",
        lat=-28.38, lng=-54.00, area_total_ha=190, area_cultivada_ha=160,
        culturas=["Soja", "Milho"],
        interesses=["Comprar insumos em grupo"],
        maquinas=[],
        negocios_concluidos=1, pagamentos_em_dia=100,
        avaliacoes_media=3.8, meses_na_plataforma=3,
    ),
    Produtor(
        id=10, nome="Rodrigo Lima", estado="RS", municipio="Cruz Alta",
        lat=-28.64, lng=-53.61, area_total_ha=350, area_cultivada_ha=320,
        culturas=["Soja", "Trigo"],
        interesses=["Alugar minha máquina", "Comprar insumos em grupo"],
        maquinas=[{"tipo": "Trator", "preco_dia": 580}],
        negocios_concluidos=7, pagamentos_em_dia=96,
        avaliacoes_media=4.4, meses_na_plataforma=20,
    ),
]

GRUPOS: List[GrupoCompra] = [
    GrupoCompra(
        id=1, insumo="Ureia",
        quantidade_meta_ton=80.0, quantidade_atual_ton=52.0,
        municipio="Passo Fundo", estado="RS",
        lat=-28.26, lng=-52.40,
        preco_unitario_grupo=1788.0, preco_unitario_mercado=2180.0,
        participantes=[1, 2, 3],
        culturas_alvo=["Soja", "Milho", "Trigo", "Feijão"],
    ),
    GrupoCompra(
        id=2, insumo="Semente",
        quantidade_meta_ton=200.0, quantidade_atual_ton=180.0,
        municipio="Ijuí", estado="RS",
        lat=-28.39, lng=-53.91,
        preco_unitario_grupo=480.0, preco_unitario_mercado=620.0,
        participantes=[5, 9],
        culturas_alvo=["Soja", "Milho"],
    ),
]


# ─────────────────────────────────────────────────────────────────
# DEMO
# ─────────────────────────────────────────────────────────────────

def demo():
    print("=" * 62)
    print("  AgroViz · Motor de Match — Safra+  |  Hackathon 2026")
    print("=" * 62)

    score_engine = ScoreEngine()
    extrator     = FeatureExtractor()
    match_engine = MatchEngine()
    match_grupo  = MatchGrupoCompra()

    # Scores
    scores: Dict[int, int] = {}
    print("\n📊 SCORES")
    print("-" * 62)
    for p in PRODUTORES:
        r = score_engine.calcular(p)
        scores[p.id] = r["score"]
        print(f"  {p.nome:<22} {r['score']:>4}  Faixa {r['faixa']}"
              f"  |  Pont {r['dimensoes']['pontualidade']}%"
              f"  Hist {r['dimensoes']['historico']}%")

    # Indexa KNN
    match_engine.indexar(PRODUTORES, scores, extrator)

    # Matches para Carlos Bento (id=1)
    alvo = PRODUTORES[0]
    print(f"\n🤝 MATCHES PARA {alvo.nome.upper()} ({alvo.municipio})")
    print("-" * 62)
    for m in match_engine.buscar(alvo, scores[alvo.id], raio_km=200.0, top_n=5):
        p = m["produtor"]
        print(f"\n  {p.nome} · {p.municipio} · {m['dist_km']} km  →  {m['match_pct']}%")
        for mot in m["motivos"]:
            print(f"    ✓ {mot}")

    # Candidatos para grupo de Ureia
    grupo = GRUPOS[0]
    print(f"\n🛒 CANDIDATOS PARA GRUPO: {grupo.insumo} (meta {grupo.quantidade_meta_ton}t)")
    print(f"   Faltam {grupo.quantidade_meta_ton - grupo.quantidade_atual_ton:.0f}t")
    print("-" * 62)
    for c in match_grupo.recomendar(grupo, PRODUTORES, scores):
        p = c["produtor"]
        print(f"  {p.nome:<22} fit {c['fit_pct']}%"
              f"  vol {c['vol_ton']}t"
              f"  economia R$ {c['economia_brl']:,}"
              f"  {c['dist_km']} km")

    print("\n" + "=" * 62)
    print("  Cruzamento concluído.")
    print("=" * 62)


if __name__ == "__main__":
    demo()
