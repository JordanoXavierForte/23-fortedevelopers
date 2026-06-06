import tractor from "@/assets/tractor.jpg";
import harvester from "@/assets/harvester.jpg";
import sprayer from "@/assets/sprayer.jpg";
import fertilizer from "@/assets/fertilizer.jpg";
import seeds from "@/assets/seeds.jpg";
import herbicide from "@/assets/herbicide.jpg";

export const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

// ─────────────────────────────────────────────────────────────
// PRODUTORES — mock espelhando o motor Python (agroviz_engine.py)
// Score calculado pelas dimensões: completude · histórico · pontualidade · reputação
// ─────────────────────────────────────────────────────────────

export type ScoreDimensoes = {
  completude: number;    // 0–100
  historico: number;
  pontualidade: number;
  reputacao: number;
};

export type MaquinaCadastrada = {
  tipo: string;
  modelo: string;
  ano: number;
  precoDia: number;
  disponivel: string;
};

export type ProdutorMock = {
  id: number;
  nome: string;
  iniciais: string;
  municipio: string;
  estado: string;
  fazenda: string;
  areaCultivadaHa: number;
  culturas: string[];
  interesses: string[];
  maquinas: MaquinaCadastrada[];
  score: number;
  faixa: "A" | "B" | "C" | "D" | "E";
  dimensoes: ScoreDimensoes;
  negociosConcluidos: number;
  mesesNaPlataforma: number;
  avaliacaoMedia: number;
};

export const produtores: ProdutorMock[] = [
  {
    id: 1,
    nome: "Carlos Bento",
    iniciais: "CB",
    municipio: "Não-Me-Toque",
    estado: "RS",
    fazenda: "Fazenda Santa Rita",
    areaCultivadaHa: 580,
    culturas: ["Soja", "Milho", "Trigo"],
    interesses: ["Comprar insumos em grupo", "Alugar minha máquina"],
    maquinas: [
      { tipo: "Colheitadeira", modelo: "John Deere S780", ano: 2021, precoDia: 1400, disponivel: "out–fev" },
      { tipo: "Trator", modelo: "New Holland T7.315", ano: 2019, precoDia: 680, disponivel: "sob consulta" },
    ],
    score: 905,
    faixa: "A",
    dimensoes: { completude: 100, historico: 72, pontualidade: 100, reputacao: 94 },
    negociosConcluidos: 8,
    mesesNaPlataforma: 18,
    avaliacaoMedia: 4.7,
  },
  {
    id: 2,
    nome: "José Melo",
    iniciais: "JM",
    municipio: "Carazinho",
    estado: "RS",
    fazenda: "Fazenda Boa Esperança",
    areaCultivadaHa: 380,
    culturas: ["Soja", "Trigo"],
    interesses: ["Comprar insumos em grupo", "Alugar máquina de vizinho"],
    maquinas: [],
    score: 822,
    faixa: "B",
    dimensoes: { completude: 90, historico: 59, pontualidade: 95, reputacao: 90 },
    negociosConcluidos: 5,
    mesesNaPlataforma: 12,
    avaliacaoMedia: 4.5,
  },
  {
    id: 3,
    nome: "Ana Ritter",
    iniciais: "AR",
    municipio: "Passo Fundo",
    estado: "RS",
    fazenda: "Sítio Bom Retiro",
    areaCultivadaHa: 280,
    culturas: ["Soja", "Milho"],
    interesses: ["Comprar insumos em grupo", "Dividir frete"],
    maquinas: [],
    score: 755,
    faixa: "B",
    dimensoes: { completude: 90, historico: 46, pontualidade: 90, reputacao: 84 },
    negociosConcluidos: 3,
    mesesNaPlataforma: 8,
    avaliacaoMedia: 4.2,
  },
  {
    id: 4,
    nome: "Lauro Pereira",
    iniciais: "LP",
    municipio: "Lagoa Vermelha",
    estado: "RS",
    fazenda: "Estância São Marcos",
    areaCultivadaHa: 720,
    culturas: ["Soja", "Milho", "Feijão"],
    interesses: ["Alugar minha máquina", "Dividir frete"],
    maquinas: [
      { tipo: "Plantadeira", modelo: "Jumil 3180", ano: 2019, precoDia: 850, disponivel: "ago–out" },
      { tipo: "Trator", modelo: "Valtra BH180", ano: 2020, precoDia: 680, disponivel: "ano todo" },
    ],
    score: 943,
    faixa: "A",
    dimensoes: { completude: 100, historico: 84, pontualidade: 98, reputacao: 98 },
    negociosConcluidos: 12,
    mesesNaPlataforma: 24,
    avaliacaoMedia: 4.9,
  },
  {
    id: 5,
    nome: "Vera Stolz",
    iniciais: "VS",
    municipio: "Ijuí",
    estado: "RS",
    fazenda: "Fazenda Paraíso Verde",
    areaCultivadaHa: 210,
    culturas: ["Soja", "Trigo"],
    interesses: ["Comprar insumos em grupo"],
    maquinas: [],
    score: 748,
    faixa: "B",
    dimensoes: { completude: 80, historico: 36, pontualidade: 100, reputacao: 80 },
    negociosConcluidos: 2,
    mesesNaPlataforma: 4,
    avaliacaoMedia: 4.0,
  },
  {
    id: 6,
    nome: "Marco Bianchi",
    iniciais: "MB",
    municipio: "Passo Fundo",
    estado: "RS",
    fazenda: "Fazenda Vale Fértil",
    areaCultivadaHa: 480,
    culturas: ["Soja", "Milho"],
    interesses: ["Comprar insumos em grupo", "Alugar minha máquina"],
    maquinas: [
      { tipo: "Pulverizador", modelo: "Jacto Uniport", ano: 2020, precoDia: 540, disponivel: "set–nov" },
    ],
    score: 867,
    faixa: "A",
    dimensoes: { completude: 100, historico: 64, pontualidade: 97, reputacao: 92 },
    negociosConcluidos: 6,
    mesesNaPlataforma: 16,
    avaliacaoMedia: 4.6,
  },
  {
    id: 7,
    nome: "Antônio Ferraz",
    iniciais: "AF",
    municipio: "Marau",
    estado: "RS",
    fazenda: "Fazenda Cerro Alegre",
    areaCultivadaHa: 660,
    culturas: ["Soja", "Milho", "Trigo"],
    interesses: ["Alugar minha máquina", "Dividir frete"],
    maquinas: [
      { tipo: "Colheitadeira", modelo: "John Deere S680", ano: 2021, precoDia: 1200, disponivel: "out–fev" },
    ],
    score: 969,
    faixa: "A",
    dimensoes: { completude: 100, historico: 91, pontualidade: 100, reputacao: 98 },
    negociosConcluidos: 15,
    mesesNaPlataforma: 30,
    avaliacaoMedia: 4.9,
  },
  {
    id: 8,
    nome: "Rosa Lenz",
    iniciais: "RL",
    municipio: "Sarandi",
    estado: "RS",
    fazenda: "Chácara dos Ipês",
    areaCultivadaHa: 250,
    culturas: ["Soja"],
    interesses: ["Comprar insumos em grupo", "Dividir frete"],
    maquinas: [],
    score: 787,
    faixa: "B",
    dimensoes: { completude: 80, historico: 53, pontualidade: 92, reputacao: 86 },
    negociosConcluidos: 4,
    mesesNaPlataforma: 10,
    avaliacaoMedia: 4.3,
  },
  {
    id: 9,
    nome: "Pedro Thomé",
    iniciais: "PT",
    municipio: "Augusto Pestana",
    estado: "RS",
    fazenda: "Sítio Thomé",
    areaCultivadaHa: 160,
    culturas: ["Soja", "Milho"],
    interesses: ["Comprar insumos em grupo"],
    maquinas: [],
    score: 700,
    faixa: "B",
    dimensoes: { completude: 70, historico: 22, pontualidade: 100, reputacao: 76 },
    negociosConcluidos: 1,
    mesesNaPlataforma: 3,
    avaliacaoMedia: 3.8,
  },
  {
    id: 10,
    nome: "Rodrigo Lima",
    iniciais: "RdL",
    municipio: "Cruz Alta",
    estado: "RS",
    fazenda: "Fazenda Horizonte",
    areaCultivadaHa: 320,
    culturas: ["Soja", "Trigo"],
    interesses: ["Alugar minha máquina", "Comprar insumos em grupo"],
    maquinas: [
      { tipo: "Trator", modelo: "Valtra BH180", ano: 2018, precoDia: 580, disponivel: "sob consulta" },
    ],
    score: 869,
    faixa: "A",
    dimensoes: { completude: 90, historico: 68, pontualidade: 96, reputacao: 88 },
    negociosConcluidos: 7,
    mesesNaPlataforma: 20,
    avaliacaoMedia: 4.4,
  },
];

// ─────────────────────────────────────────────────────────────
// PRODUTOR LOGADO (Carlos Bento = id 1)
// ─────────────────────────────────────────────────────────────

export const me = {
  name: "Rodrigo Tavares",
  initials: "RT",
  farm: "Fazenda Forte Santa",
  location: "Seberi, RS",
  score: 847,
  band: "A",
  neighbors: 34,
  savingsMonth: 4280,
  savingsTotal: 18420,
  savingsBuys: 11200,
  savingsMachines: 7220,
  deals: 8,
};

// ─────────────────────────────────────────────────────────────
// MATCHES — resultado do KNN (motor Python) para Carlos Bento
// Fonte: agroviz_engine.py → MatchEngine.buscar(id=1, raio=200km)
// ─────────────────────────────────────────────────────────────

export type Match = {
  initials: string;
  name: string;
  city: string;
  reason: string;
  pct: number;
  distKm: number;
  score: number;
};

export const matches: Match[] = [
  {
    initials: "JM",
    name: "José Melo",
    city: "Carazinho",
    reason: "Mesma cultura · precisa de colheitadeira",
    pct: 94,
    distKm: 20,
    score: 822,
  },
  {
    initials: "AR",
    name: "Ana Ritter",
    city: "Passo Fundo",
    reason: "Ambos plantam Soja/Milho · querem comprar insumos em grupo",
    pct: 87,
    distKm: 47,
    score: 755,
  },
  {
    initials: "LP",
    name: "Lauro Pereira",
    city: "Lagoa Vermelha",
    reason: "Tem plantadeira disponível para aluguel",
    pct: 81,
    distKm: 112,
    score: 943,
  },
  {
    initials: "MB",
    name: "Marco Bianchi",
    city: "Passo Fundo",
    reason: "Ambos plantam Soja/Milho · querem comprar insumos em grupo",
    pct: 78,
    distKm: 46,
    score: 867,
  },
  {
    initials: "VS",
    name: "Vera Stolz",
    city: "Ijuí",
    reason: "Mesma cultura · podem dividir o frete juntos",
    pct: 71,
    distKm: 97,
    score: 748,
  },
];

// ─────────────────────────────────────────────────────────────
// MÁQUINAS
// ─────────────────────────────────────────────────────────────

export type Machine = {
  id: string;
  name: string;
  category: string;
  owner: string;
  ownerId: number;
  distance: string;
  distKm: number;
  pricePerDay: number;
  marketPrice: number;
  rating: number;
  ownerScore: number;
  image: string;
  available: string;
};

export const machines: Machine[] = [
  {
    id: "m1",
    name: "Colheitadeira John Deere S680",
    category: "Colheita",
    owner: "Antônio Ferraz",
    ownerId: 7,
    distance: "28 km",
    distKm: 28,
    pricePerDay: 1200,
    marketPrice: 2100,
    rating: 4.9,
    ownerScore: 969,
    image: harvester,
    available: "Disponível: out – fev",
  },
  {
    id: "m2",
    name: "Trator Valtra BH180",
    category: "Tratores",
    owner: "Rodrigo Lima",
    ownerId: 10,
    distance: "14 km",
    distKm: 14,
    pricePerDay: 580,
    marketPrice: 980,
    rating: 4.7,
    ownerScore: 869,
    image: tractor,
    available: "Disponível: sob consulta",
  },
  {
    id: "m3",
    name: "Pulverizador Jacto Uniport",
    category: "Pulverização",
    owner: "Marco Bianchi",
    ownerId: 6,
    distance: "22 km",
    distKm: 22,
    pricePerDay: 540,
    marketPrice: 980,
    rating: 4.7,
    ownerScore: 867,
    image: sprayer,
    available: "Livre a partir de 18/jun",
  },
];

// ─────────────────────────────────────────────────────────────
// COMPRAS COLETIVAS
// ─────────────────────────────────────────────────────────────

export type Participant = {
  initials: string;
  name: string;
  city: string;
  crops: string;
  score: number;
  qty: number;
  organizer?: boolean;
};

export type GroupBuyCandidato = {
  initials: string;
  name: string;
  fitPct: number;
  volTon: number;
  economiaBrl: number;
};

export type GroupBuy = {
  id: string;
  product: string;
  brand: string;
  organizer: string;
  organizerId: number;
  organizerCity: string;
  unitPrice: number;
  marketPrice: number;
  unit: string;
  unitShort: string;
  goal: number;
  current: number;
  participants: number;
  deadline: string;
  delivery: string;
  image: string;
  members: Participant[];
  candidatos: GroupBuyCandidato[];
};

export const groupBuys: GroupBuy[] = [
  {
    id: "g1",
    product: "Ureia Granulada",
    brand: "Yara Brasil",
    organizer: "Marco Bianchi",
    organizerId: 6,
    organizerCity: "Passo Fundo",
    unitPrice: 1788,
    marketPrice: 2180,
    unit: "tonelada",
    unitShort: "ton",
    goal: 80,
    current: 52,
    participants: 7,
    deadline: "Encerra em 5 dias",
    delivery: "Na fazenda",
    image: fertilizer,
    members: [
      { initials: "MB", name: "Marco Bianchi", city: "Passo Fundo", crops: "Soja/Milho", score: 867, qty: 18, organizer: true },
      { initials: "JM", name: "José Melo",      city: "Carazinho",   crops: "Soja/Trigo", score: 822, qty: 12 },
      { initials: "RL", name: "Rosa Lenz",       city: "Sarandi",     crops: "Soja",       score: 787, qty: 10 },
      { initials: "AR", name: "Ana Ritter",      city: "Passo Fundo", crops: "Soja/Milho", score: 755, qty: 12 },
    ],
    candidatos: [
      { initials: "LP", name: "Lauro Pereira",  fitPct: 74, volTon: 14.4, economiaBrl: 5645 },
      { initials: "AF", name: "Antônio Ferraz", fitPct: 69, volTon: 13.2, economiaBrl: 5174 },
      { initials: "RdL", name: "Rodrigo Lima",  fitPct: 62, volTon: 9.6,  economiaBrl: 3763 },
    ],
  },
  {
    id: "g2",
    product: "Semente de Soja TMG 7062",
    brand: "TMG Sementes",
    organizer: "Vera Stolz",
    organizerId: 5,
    organizerCity: "Ijuí",
    unitPrice: 480,
    marketPrice: 620,
    unit: "saca 40kg",
    unitShort: "sacas",
    goal: 200,
    current: 180,
    participants: 5,
    deadline: "Encerra em 2 dias",
    delivery: "Ponto de coleta",
    image: seeds,
    members: [
      { initials: "VS", name: "Vera Stolz",  city: "Ijuí",            crops: "Soja",       score: 748, qty: 60, organizer: true },
      { initials: "PT", name: "Pedro Thomé", city: "Augusto Pestana", crops: "Soja/Milho", score: 700, qty: 50 },
    ],
    candidatos: [
      { initials: "RL", name: "Rosa Lenz", fitPct: 58, volTon: 12.5, economiaBrl: 1750 },
    ],
  },
  {
    id: "g3",
    product: "Herbicida Glifosato 5L",
    brand: "Syngenta",
    organizer: "Lauro Pereira",
    organizerId: 4,
    organizerCity: "Lagoa Vermelha",
    unitPrice: 89,
    marketPrice: 134,
    unit: "galão 5L",
    unitShort: "galões",
    goal: 300,
    current: 96,
    participants: 11,
    deadline: "Encerra em 7 dias",
    delivery: "Na fazenda",
    image: herbicide,
    members: [
      { initials: "LP", name: "Lauro Pereira", city: "Lagoa Vermelha", crops: "Soja/Milho", score: 943, qty: 40, organizer: true },
    ],
    candidatos: [
      { initials: "AF", name: "Antônio Ferraz", fitPct: 71, volTon: 18.0, economiaBrl: 8100 },
      { initials: "CB", name: "Carlos Bento",   fitPct: 67, volTon: 16.4, economiaBrl: 7380 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// VÍNCULOS (negócios em andamento)
// ─────────────────────────────────────────────────────────────

export type LinkStatus = "active" | "warn" | "alert" | "info" | "done";

export type Vinculo = {
  id: string;
  kind: "machine" | "buy" | "freight";
  icon: string;
  iconTone?: "earth" | "blue";
  title: string;
  sub: string;
  status: LinkStatus;
  badge: string;
  meta?: { label: string; strong?: string }[];
  progress?: { current: string; goal: string; pct: number };
  actions?: { label: string; variant: "primary" | "outline" | "ghost" }[];
};

export const vinculos: Vinculo[] = [
  {
    id: "v1",
    kind: "machine",
    icon: "🚜",
    iconTone: "earth",
    title: "José Melo quer alugar sua colheitadeira",
    sub: "S780 John Deere · 15 a 25 de outubro",
    status: "warn",
    badge: "Aprovar",
    meta: [
      { label: "📍", strong: "28 km" },
      { label: "⭐ Score", strong: "822" },
      { label: "💰", strong: "R$ 14.000" },
    ],
    actions: [
      { label: "Recusar", variant: "outline" },
      { label: "Aprovar locação", variant: "primary" },
    ],
  },
  {
    id: "v2",
    kind: "buy",
    icon: "🌿",
    title: "Confirme sua participação · Ureia 80t",
    sub: "Você reservou 12 toneladas · prazo termina amanhã",
    status: "warn",
    badge: "Confirmar",
    progress: { current: "74 ton reservadas", goal: "meta: 80 ton", pct: 93 },
    actions: [
      { label: "Sair do grupo", variant: "ghost" },
      { label: "Confirmar 12 ton", variant: "primary" },
    ],
  },
  {
    id: "v3",
    kind: "machine",
    icon: "🌾",
    iconTone: "earth",
    title: "Aluguel · Plantadeira Jumil 3180",
    sub: "Locado de Lauro Pereira · 5 dias restantes",
    status: "active",
    badge: "Ativo",
    meta: [
      { label: "📅 Até", strong: "11/out" },
      { label: "💰", strong: "R$ 850/dia" },
      { label: "📍", strong: "112 km" },
    ],
    actions: [
      { label: "Ver contrato", variant: "ghost" },
      { label: "Conversar", variant: "outline" },
    ],
  },
  {
    id: "v4",
    kind: "buy",
    icon: "🌱",
    title: "Compra coletiva · Sementes de soja",
    sub: "Organizado por Vera Stolz · você comprou 30 sacas",
    status: "active",
    badge: "Em formação",
    progress: { current: "180 sacas de 200", goal: "economia: R$ 1.840", pct: 90 },
    actions: [
      { label: "Ver detalhes", variant: "ghost" },
      { label: "Ver participantes", variant: "outline" },
    ],
  },
  {
    id: "v5",
    kind: "freight",
    icon: "🚚",
    iconTone: "blue",
    title: "Frete compartilhado · Porto de Rio Grande",
    sub: "Com Ana Ritter e +2 produtores",
    status: "info",
    badge: "Agendado",
    meta: [
      { label: "📅", strong: "22/out" },
      { label: "💰 economia:", strong: "R$ 2.300" },
    ],
  },
];

export const vinculosHistory: Vinculo[] = [
  {
    id: "h1",
    kind: "buy",
    icon: "🌿",
    title: "Compra coletiva · MAP fertilizante",
    sub: "Concluído em set/2026 · economia: R$ 4.120",
    status: "done",
    badge: "Concluído",
  },
  {
    id: "h2",
    kind: "machine",
    icon: "🚜",
    iconTone: "earth",
    title: "Aluguel · Trator Valtra BH180",
    sub: "Encerrado em ago/2026 · avaliação ⭐ 5.0",
    status: "done",
    badge: "Concluído",
  },
];

// ─────────────────────────────────────────────────────────────
// PERFIL PÚBLICO (José Melo — id 2)
// Score e dimensões gerados pelo ScoreEngine do motor Python
// ─────────────────────────────────────────────────────────────

export const publicProfile = {
  initials: "RM",
  name: "Rodrigo Melo",
  farm: "Fazenda Forte Santa",
  location: "Seberi, RS · 28 km de você",
  score: 847,
  band: "A",
  stats: [
    { value: "380 ha", label: "Área cultivada" },
    { value: "5", label: "Negócios feitos" },
    { value: "1 ano", label: "Na plataforma" },
  ],
  dims: [
    { label: "Completude do perfil", value: 90 },
    { label: "Negócios concluídos", value: 66 },
    { label: "Pagamentos em dia", value: 95 },
    { label: "Avaliações recebidas", value: 90 },
  ],
  crops: ["Soja", "Trigo"],
  interests: ["Aluguel de máquina", "Compra coletiva"],
  machines: [] as { icon: string; name: string; detail: string; price: string }[],
  history: [
    { icon: "🌿", title: "Compra coletiva · Ureia 40 ton", date: "Março 2025 · 5 produtores" },
    { icon: "🌿", title: "Compra coletiva · Semente soja", date: "Outubro 2024 · 4 produtores" },
  ],
};
