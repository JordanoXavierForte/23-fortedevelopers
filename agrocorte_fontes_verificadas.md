# AgroCorte — Documento de Fontes Verificadas
**Code Race 2026 · Preparado em 06/06/2026**

> Este documento lista os dados utilizados nos slides do AgroCorte com suas fontes primárias, nível de confiança e links para verificação. Dados marcados com ⚠️ são estimativas fundamentadas — verifique antes de apresentar.

---

## 1. DORES DO PRODUTOR

### 1.1 Insumo caro — compra individual vs. compra em grupo

| Dado | Valor | Fonte | Confiança |
|------|-------|-------|-----------|
| Sobrepreço pago pelo produtor médio comprando sozinho | **~20–25%** | CNA — Confederação da Agricultura e Pecuária do Brasil, relatórios de custo de produção | ✅ Confirmado (faixa) |
| Número usado no briefing ("22% mais caro") | **22%** | Citado como "CNA 2023" | ⚠️ Plausível, verificar edição exata |

**Como verificar:**
- Site: [cnabrasil.org.br](https://www.cnabrasil.org.br) → Publicações → Custos de Produção
- CONAB publica planilhas detalhadas de custo por cultura (soja, milho, trigo) com discriminação por insumo: [conab.gov.br/info-agro/custos-de-producao](https://www.conab.gov.br/info-agro/custos-de-producao)

**Dado complementar verificável:**
- O Brasil importa **~85% dos fertilizantes** que consome — forte dependência que amplifica a variação de preço entre compras individuais e em escala (fonte: ANDA — Associação Nacional para Difusão de Adubos, Anuário Estatístico)

---

### 1.2 Máquina agrícola parada — capital imobilizado

| Dado | Valor | Fonte | Confiança |
|------|-------|-------|-----------|
| Frota brasileira de tratores agrícolas | **~1,2–1,4 milhão de unidades** | IPEA TD 2597 (2020) — Silva, Baricelo, Vian | ✅ Paper acadêmico revisado |
| Frota de colheitadeiras | **~100–110 mil unidades** | Censo Agropecuário IBGE 2017 + projeção ANFAVEA | ✅ Ordem de grandeza confirmada |
| Utilização média de colheitadeira por ano | **~300–500 horas/safra** | Estudos de mecanização agrícola EMBRAPA | ⚠️ Estimativa técnica de engenharia agrícola |
| Capacidade nominal de uso | **~1.000–1.200 horas/ano** | Parâmetro de indústria (fabricantes) | ⚠️ Referência de fabricante |
| Ociosidade estimada | **~60–70% do tempo** | Cálculo derivado das duas linhas acima | ⚠️ Estimativa |
| Valor de uma colheitadeira de grande porte | **R$ 1,5–3 milhões** | Preços de mercado 2024–2025 | ✅ Verificável em concessionárias |

**Fonte primária do paper do IPEA:**
- Silva RP, Baricelo LG, Vian CEF. *"Evolução, composição e distribuição regional do estoque de tratores e máquinas agrícolas no Brasil"*. Texto para Discussão IPEA, 2020.
- Disponível em: [repositorio.ipea.gov.br](https://repositorio.ipea.gov.br) (buscar "estoque tratores máquinas agrícolas")
- Também disponível no ResearchGate (buscar pelo título)

---

### 1.3 Ausência de plataforma organizada de aluguel

| Dado | Valor | Fonte | Confiança |
|------|-------|-------|-----------|
| Existência de plataforma concorrente direta no Brasil | **Não identificada** | Pesquisa Google Scholar 2025: "Osiris" (SBC, 2025) é o único trabalho acadêmico descrevendo um sistema similar | ✅ Pesquisado em 06/06/2026 |
| Aluguel informal de máquinas entre produtores | **Prática cultural consolidada**, sem plataforma de apoio | Citado na literatura de extensão rural / SENAR | ⚠️ Sem número preciso disponível |

**Fonte do paper Osiris (concorrente acadêmico):**
- Tiadoro E, Wendt RZ, Muniz MAB, Fialho M et al. *"Osiris: a platform for advertising agricultural machinery rentals"*. Simpósio Brasileiro de Computação Aplicada à Saúde (SBCAS), SBC, 2025.
- Disponível em: [sol.sbc.org.br](https://sol.sbc.org.br) (buscar "Osiris agricultural machinery")
- **Uso estratégico nos slides:** citar este paper prova que o problema é real e reconhecido academicamente, e que o AgroCorte tem diferencial (foco no match inteligente)

---

## 2. TAMANHO DO MERCADO

### 2.1 Estrutura dos produtores rurais brasileiros

| Dado | Valor | Fonte | Confiança |
|------|-------|-------|-----------|
| Total de estabelecimentos agropecuários | **5.073.324** | Censo Agropecuário IBGE 2017 | ✅ Dado oficial |
| Proporção de agricultores familiares | **77% dos estabelecimentos** | Censo Agropecuário IBGE 2017 | ✅ Dado oficial |
| Participação da agricultura familiar no VBP | **~23%** | Censo Agropecuário IBGE 2017 | ✅ Dado oficial |
| Médios produtores (segmento-alvo principal) | Estimado em **~500 mil–1 milhão** | Derivado do Censo por faixa de área | ⚠️ Estimativa por faixa |

**Como verificar:**
- Censo Agropecuário 2017 (acesso gratuito): [censoagro2017.ibge.gov.br](https://censoagro2017.ibge.gov.br)
- Tabelas customizáveis por estado, porte e cultura: [sidra.ibge.gov.br](https://sidra.ibge.gov.br)

> ⚠️ **Atenção:** O Censo Agropecuário mais recente é de 2017. O IBGE iniciou novo censo em 2023, mas os resultados completos ainda não foram publicados até o momento desta pesquisa. Use "Censo Agropecuário 2017" na citação.

---

### 2.2 Mercado de insumos agrícolas

| Dado | Valor | Fonte | Confiança |
|------|-------|-------|-----------|
| Mercado de defensivos agrícolas | **~R$ 50–65 bilhões/ano** | SINDIVEG / CropLife Brasil, 2022–2023 | ✅ Amplamente citado |
| Mercado total de insumos (defensivos + fertilizantes + sementes) | **~R$ 200–250 bilhões/ano** | Estimativa setorial, CNA/AENDA | ⚠️ Estimativa ampla |

---

### 2.3 Cooperativismo — canal de distribuição B2B

| Dado | Valor | Fonte | Confiança |
|------|-------|-------|-----------|
| Cooperativas agropecuárias no Brasil | **~1.500** | OCB — Organização das Cooperativas Brasileiras, Anuário do Cooperativismo 2023 | ✅ Confirmado |
| Associados em cooperativas agropecuárias | **~1,2 milhão** | OCB 2023 | ✅ Confirmado (número usado no briefing) |
| Participação das cooperativas nas exportações do agro (Sul do Brasil) | **~50%** | OCB / MAPA | ✅ Amplamente citado |

**Como verificar:**
- [ocb.org.br](https://www.ocb.org.br) → Anuário do Cooperativismo Brasileiro (download gratuito)

---

## 3. DIFERENCIAL COMPETITIVO — ALGORITMO DE MATCH

### 3.1 Por que o algoritmo é o diferencial

| Afirmação | Embasamento | Confiança |
|-----------|-------------|-----------|
| "Não existe plataforma organizada de aluguel de maquinário no Brasil" | Pesquisa Scholar: único sistema similar (Osiris, 2025) é trabalho acadêmico, sem produto comercial no mercado | ✅ |
| "Efeito de rede: cada produtor que entra melhora o match para todos" | Princípio de sistemas de recomendação colaborativa — literatura ampla em ML/RecSys | ✅ Conceito consolidado |
| Score de produtor baseado em regressão linear | Técnica padrão de scoring em plataformas de marketplace (Airbnb, iFood, etc.) | ✅ Referência de mercado |

---

## 4. DADOS PARA CÁLCULO DE OPORTUNIDADE (Slide TAM/SAM/SOM)

> Estes números são **estimativas fundamentadas** para o pitch — deixar claro nos slides que são projeções.

### Cálculo sugerido para o slide:

**Módulo Compra Conjunta:**
- ~1 milhão de médios produtores
- × R$ 40.000/ano em insumos (estimativa conservadora, CONAB custos de produção)
- = **R$ 40 bilhões de mercado endereçável**
- Economia potencial de 15–20% via compra conjunta = **R$ 6–8 bilhões de valor a capturar**

**Módulo Locação de Maquinário:**
- ~100.000 colheitadeiras com ~200 dias ociosos/ano
- × R$ 600–1.400/dia (faixa de mercado informal)
- = **R$ 12–28 bilhões em capacidade ociosa/ano**

---

## 5. REFERÊNCIAS COMPLETAS

### Papers acadêmicos confirmados no Google Scholar (06/06/2026)

1. **IPEA — Frota de máquinas agrícolas**
   Silva RP, Baricelo LG, Vian CEF. *Evolução, composição e distribuição regional do estoque de tratores e máquinas agrícolas no Brasil*. Texto para Discussão IPEA nº 2597, 2020.
   URL: https://repositorio.ipea.gov.br (buscar TD 2597)

2. **Osiris — Plataforma de anúncio de aluguel de máquinas (concorrente acadêmico)**
   Tiadoro E, Wendt RZ, Muniz MAB, Fialho M et al. *Osiris: a platform for advertising agricultural machinery rentals*. SBCAS/SBC, 2025.
   URL: https://sol.sbc.org.br (buscar "Osiris agricultural machinery")

3. **Viabilidade econômica de locação de máquinas agrícolas**
   Jayme TA. *Análise da viabilidade econômica da locação de máquinas agrícolas para o setor sucroenergético*. PUC Goiás, 2025.
   URL: https://repositorio.pucgoias.edu.br

### Fontes primárias governamentais

4. **IBGE — Censo Agropecuário 2017**
   https://censoagro2017.ibge.gov.br
   *(Dado mais completo disponível sobre estrutura fundiária brasileira)*

5. **CONAB — Custos de Produção por Cultura**
   https://www.conab.gov.br/info-agro/custos-de-producao
   *(Planilhas de Excel por cultura: soja, milho, trigo, arroz — download gratuito)*

6. **OCB — Anuário do Cooperativismo Brasileiro**
   https://www.ocb.org.br
   *(Dados de cooperativas agropecuárias, número de associados)*

7. **ANFAVEA — Anuário da Indústria Automobilística** (inclui máquinas agrícolas)
   https://www.anfavea.com.br
   *(Frota de tratores e colheitadeiras por ano)*

---

## 6. O QUE AINDA PRECISA SER VERIFICADO

- [ ] Confirmar a edição exata do relatório CNA com o dado de **22% mais caro** (buscar em cnabrasil.org.br → publicações)
- [ ] Baixar planilha CONAB de custo de produção de soja para ter o **peso real dos insumos no custo total**
- [ ] Verificar se a ANFAVEA voltou ao ar (site estava fora em 06/06/2026) para confirmar frota de colheitadeiras
- [ ] Acessar o paper Osiris (SBC 2025) para extrair citação exata sobre o problema de ociosidade de maquinário

---

*Documento preparado para o Code Race 2026 — AgroCorte · "Vizinhos do agro, juntos custam menos"*
