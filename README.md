# 🌾 Safra+

> **Vizinhos do agro — juntos custam menos.**

Plataforma mobile-first que conecta produtores rurais brasileiros por meio de um **algoritmo de match inteligente**, viabilizando a locação de maquinários agrícolas ociosos e a compra conjunta de insumos — sem intermediários, sem mensalidade.

---

## 🎥 Pitch

[Assista ao pitch do Safra+ no YouTube](https://www.youtube.com/watch?v=C91KSaocI0I)

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| Eduardo Rodrigues Fortes | Negócios, Documentação e Entregas |
| Jordano Xavier | Desenvolvimento Frontend |
| Lorenzo Taschetto | Desenvolvimento Frontend |
| Daniel Ferreira Schopf | Algoritmo de Match e Lógica de Negócio |

---

## 🚨 O Problema

O agronegócio brasileiro carrega dois desperdícios estruturais invisíveis:

**1. Insumo caro para quem compra sozinho**
Produtores médios pagam até **22% a mais** em fertilizantes, defensivos e sementes por não terem escala de negociação — enquanto cooperativas e grandes players conseguem preços de volume. Não existe plataforma que organize compras coletivas entre produtores independentes próximos.

**2. Máquinas paradas entre safras**
Uma colheitadeira de grande porte custa entre R$ 1,5 e R$ 3 milhões e fica ociosa **60–70% do ano**. O aluguel entre vizinhos é prática cultural consolidada no Sul e Centro-Oeste, mas acontece 100% no boca a boca — sem garantia, sem rastreabilidade, sem plataforma.

> Fontes: CNA 2023 · IPEA TD 2597 (Silva, Baricelo, Vian, 2020) · Censo Agropecuário IBGE 2017

---

## 💡 A Solução

O **Safra+** é uma aplicação web mobile-first com três módulos principais:

### 🚜 Locação de Maquinários
Produtores cadastram máquinas disponíveis entre safras. O algoritmo sugere automaticamente os melhores matches de aluguel com base em proximidade geográfica, tipo de cultura, score de confiança do dono e janela de disponibilidade.

### 🛒 Compra Conjunta de Insumos
Produtores entram em grupos de compra para atingir volumes mínimos que desbloqueiam preços de atacado. O algoritmo agrupa automaticamente produtores com demandas compatíveis na mesma região e estima a economia individual de cada produtor.

### 🔗 Meus Vínculos
Painel centralizado com todos os links ativos do produtor — aluguéis em andamento, grupos de compra em formação e novas sugestões geradas pelo algoritmo.

---

## 🧠 Algoritmo de Match

O coração da plataforma. Diferencia o Safra+ de um marketplace comum ao **conectar proativamente** os produtores em vez de apenas listar anúncios.

O motor (`agroviz_engine.py`) é composto por **5 módulos encadeados**:

### Módulo 1 — Score de Confiabilidade (0–1000)

Cada produtor recebe um score calculado sobre 4 dimensões ponderadas:

| Dimensão | Peso | Lógica |
|----------|------|--------|
| Completude do perfil | 20% | Campos preenchidos no formulário de cadastro |
| Histórico de negócios | 30% | Curva logarítmica — evita domínio de usuários antigos |
| Pontualidade de pagamentos | 30% | % de pagamentos realizados no prazo |
| Reputação | 20% | Média de avaliações recebidas (0–5) |

Faixas: **A** (≥850) · **B** (≥700) · **C** (≥550) · **D** (≥400) · **E** (<400)

### Módulo 2 — Extração de Features (vetor de 12 dimensões)

Transforma o perfil qualitativo do produtor em vetor numérico para o KNN:

```
[0]  área cultivada normalizada
[1]  volume estimado de insumo por safra  ← área × fator por cultura (Embrapa/Conab)
[2]  tem máquina disponível
[3]  quer alugar máquina
[4]  quer comprar insumo em grupo
[5]  quer dividir frete
[6]  planta grãos (soja, milho, trigo, arroz, feijão)
[7]  planta culturas especiais (café, cana, algodão)
[8]  pecuária/pastagem
[9]  score de confiança normalizado
[10] tempo na plataforma normalizado
[11] diversidade de culturas
```

### Módulo 3 — KNN Match (K-Nearest Neighbors)

Encontra os produtores mais compatíveis usando distância euclidiana ponderada sobre o vetor de features. Interesses complementares têm peso 3×:

```python
PESOS_DISTANCIA = [
    1.0,  # área
    2.0,  # volume insumo       ← essencial para compra coletiva
    1.5,  # tem máquina
    3.0,  # quer alugar         ← match crítico
    3.0,  # quer comprar insumo ← match crítico
    1.5,  # quer dividir frete
    2.0,  # planta grãos
    1.0,  # culturas especiais
    0.5,  # pecuária
    2.0,  # score               ← confiança importa
    0.5,  # tempo plataforma
    1.0,  # diversidade
]
```

Filtros aplicados antes do KNN: raio geográfico (padrão 150 km via **Haversine**) e score mínimo de 300.

Percentual de match calculado por:
```
base  = e^(−distância_vetor)        → comportamento do perfil
geo   = 1 − (dist_km / raio_km)     → bônus de proximidade
match = base × 0.75 + geo × 0.25
```

### Módulo 4 — Match de Grupo de Compra

Dado um grupo de compra aberto, rankeia candidatos por **fit** (0–100):

| Critério | Peso |
|----------|------|
| Score de confiança | 30% |
| Volume compatível com o grupo | 25% |
| Proximidade geográfica | 25% |
| Alinhamento de culturas com o insumo | 20% |

Estima o volume individual de cada produtor usando fatores de consumo por cultura (ex: soja consome ~0,32 t de fertilizante/ha). Calcula a **economia em R$** que o produtor teria ao entrar no grupo.

### Módulo 5 — Match de Máquinas

Rankeia anúncios de maquinário por relevância para o buscador:

| Critério | Peso |
|----------|------|
| Tipo de máquina compatível com a cultura | 35% |
| Score do proprietário | 30% |
| Proximidade geográfica | 25% |
| Preço relativo ao mercado | 10% |

Tabela de compatibilidade cultura × máquina embutida (ex: soja → colheitadeira, plantadeira, pulverizador, trator).

### Módulo 5 — Match de Máquinas

Rankeia anúncios de maquinário por relevância para o buscador:

| Critério | Peso |
|----------|------|
| Tipo de máquina compatível com a cultura | 35% |
| Score do proprietário | 30% |
| Proximidade geográfica | 25% |
| Preço relativo ao mercado | 10% |

Tabela de compatibilidade cultura × máquina embutida (ex: soja → colheitadeira, plantadeira, pulverizador, trator).

---

## 🗂️ Escopo do Projeto

### Requisitos Planejados vs. Implementados

| # | Requisito | Status |
|---|-----------|--------|
| R01 | Tela de cadastro do produtor (perfil, área, culturas, interesses) | ✅ Implementado |
| R02 | Feed principal com sugestões de match | ✅ Implementado |
| R03 | Módulo de Locação de Maquinários com navegação por card | ✅ Implementado |
| R04 | Módulo de Compra Conjunta de Insumos com navegação por card | ✅ Implementado |
| R05 | Tela "Meus Vínculos" (painel de conexões ativas) | ✅ Implementado |
| R06 | Score de confiança multidimensional (0–1000) | ✅ Implementado |
| R07 | KNN match com vetor de 12 features ponderadas | ✅ Implementado |
| R08 | Match de grupo de compra com estimativa de economia | ✅ Implementado |
| R09 | Match de máquinas por cultura e disponibilidade | ✅ Implementado |
| R10 | Distância geográfica via fórmula de Haversine | ✅ Implementado |
| R11 | Mock de 10 produtores reais do RS espelhado no motor Python | ✅ Implementado |
| R12 | Motor Python executável independente (`agroviz_engine.py`) | ✅ Implementado |
| R13 | Candidatos sugeridos por grupo de compra (MatchGrupoCompra) | ✅ Implementado |
| R14 | Autenticação de usuários | 🚧 Fora do escopo do MVP |
| R15 | Persistência de dados em banco | 🚧 Fora do escopo do MVP |
| R16 | Backend em produção | 🚧 Fora do escopo do MVP |

> **Nota MVP:** Esta versão utiliza dados simulados (mock) para demonstrar o fluxo completo da aplicação. A lógica do algoritmo de match é **totalmente funcional** e opera sobre esses dados. A ausência de backend é uma decisão deliberada de escopo para o hackathon.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 · TypeScript · Tailwind CSS · Vite |
| Roteamento | TanStack Router |
| Algoritmo de Match | Python 3 · NumPy · scikit-learn |
| Dados | Mock em TypeScript (`data.ts`) espelhado no motor Python |
| Fontes | Google Fonts (DM Sans · DM Serif Display) |
| Runtime | Bun |

**Dependências Python:**
```
numpy
scikit-learn
```

---

## 🏗️ Arquitetura

```
23-fortedevelopers/
│
├── src/
│   ├── routes/
│   │   └── index.tsx            # Rota raiz — orquestra navegação entre telas
│   ├── components/safra/
│   │   ├── data.ts              # Mock de dados (10 produtores · scores · matches)
│   │   ├── types.ts             # Tipo Screen (union de todas as telas)
│   │   ├── icons.tsx            # Ícones SVG inline
│   │   ├── PhoneFrame.tsx       # Moldura do celular na demo
│   │   ├── BottomNav.tsx        # Navegação inferior (tabs)
│   │   ├── CadastroScreen.tsx   # Onboarding do produtor
│   │   ├── HomeScreen.tsx       # Feed com matches e compras abertas
│   │   ├── MachinesScreen.tsx   # Catálogo de máquinas para aluguel
│   │   ├── MachineDetailScreen.tsx   # Detalhe de uma máquina
│   │   ├── GroupBuysScreen.tsx  # Lista de compras coletivas
│   │   ├── GroupBuyDetailScreen.tsx  # Detalhe de um grupo de compra
│   │   ├── VinculosScreen.tsx   # Painel de vínculos ativos
│   │   └── ProfileScreen.tsx    # Perfil público de um produtor
│   └── assets/                  # Imagens (jpg)
│
├── agroviz_engine.py            # Motor de match Python (executável standalone)
│                                # ScoreEngine · FeatureExtractor · MatchEngine
│                                # MatchGrupoCompra · mock de 10 produtores
│
├── package.json
└── README.md
```

```
┌──────────────────────────────────────────────┐
│              USUÁRIO (Mobile)                │
└───────────────────┬──────────────────────────┘
                    │
┌───────────────────▼──────────────────────────┐
│            React Frontend                    │
│  ┌────────────────────────────────────────┐  │
│  │  Home │ Locação │ Compra │ Vínculos   │  │  ← Bottom Navigation
│  └────────────────────────────────────────┘  │
└───────────────────┬──────────────────────────┘
                    │ dados mockados
┌───────────────────▼──────────────────────────┐
│         Motor de Match (Python)              │
│                                              │
│  Produtor ──► ScoreEngine (0–1000)           │
│           ──► FeatureExtractor (12 dims)     │
│           ──► MatchEngine (KNN + Haversine)  │
│           ──► RegressaoEngajamento (Linear)  │
│                                              │
│  GrupoCompra ──► MatchGrupoCompra            │
│  MaquinaAnuncio ──► MatchMaquina             │
└──────────────────────────────────────────────┘
```

---

## 🎯 Público-Alvo

| Módulo | Perfil |
|--------|--------|
| Locação de Maquinários | Médios e grandes produtores (>100 ha) |
| Compra Conjunta de Insumos | Pequenos e médios produtores (<100 ha) |

**Mercado endereçável:** ~5 milhões de estabelecimentos agropecuários no Brasil (IBGE 2017), dos quais ~1 milhão são médios produtores — segmento mais sub-atendido por soluções digitais.

---

## 💰 Modelo de Negócio

- **Zero custo de entrada** — sem mensalidade, sem assinatura
- **Receita por transação** — comissão aplicada apenas quando o negócio é fechado
- **Canal B2B** — parcerias com cooperativas para acesso a 1,2 milhão de associados (OCB, 2023)
- **Efeito de rede** — cada novo produtor melhora a qualidade dos matches para todos
- **Alinhamento total:** o Safra+ só ganha quando o produtor ganha

---

## 🚀 Guia de Instalação e Execução

### Pré-requisitos

- [Bun](https://bun.sh) — runtime e gerenciador de pacotes (substitui Node/npm)
- Python 3.8+

### Frontend

```bash
# 1. Instalar dependências
bun install

# 2. Iniciar servidor de desenvolvimento
bun run dev
# Acesse http://localhost:5173
```

Para gerar o build de produção:

```bash
bun run build
bun run preview
# Acesse http://localhost:4173
```

### Motor Python (demo do algoritmo)

```bash
# 1. Instalar dependências Python
pip install numpy scikit-learn

# 2. Executar o motor
python3 agroviz_engine.py
```

O script imprime scores de confiança, matches KNN e candidatos para grupos de compra usando os 10 produtores do mock.

---

## 📚 Referências

- Silva RP, Baricelo LG, Vian CEF. *Evolução, composição e distribuição regional do estoque de tratores e máquinas agrícolas no Brasil*. IPEA TD nº 2597, 2020.
- Tiadoro E et al. *Osiris: a platform for advertising agricultural machinery rentals*. SBC/SBCAS, 2025.
- IBGE. *Censo Agropecuário 2017*. censoagro2017.ibge.gov.br
- OCB. *Anuário do Cooperativismo Brasileiro 2023*. ocb.org.br
- CNA. *Relatório de Custos de Produção 2023*. cnabrasil.org.br

---

*Code Race 2026 — 11ª Edição · Antonio Meneghetti Faculdade · Restinga Sêca, RS*
