import tractor from "@/assets/tractor.jpg";
import harvester from "@/assets/harvester.jpg";
import sprayer from "@/assets/sprayer.jpg";
import fertilizer from "@/assets/fertilizer.jpg";
import seeds from "@/assets/seeds.jpg";
import herbicide from "@/assets/herbicide.jpg";

export const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

/* ── PRODUTOR LOGADO ───────────────────────────────────────── */
export const me = {
  name: "Rodrigo Tavares",
  initials: "RT",
  farm: "Fazenda Forte Santa",
  location: "Seberi, RS",
  score: 847,
  band: "A",
  neighbors: 34,
  savingsMonth: 4280,
};

/* ── MÁQUINAS ──────────────────────────────────────────────── */
export type Machine = {
  id: string;
  name: string;
  category: string;
  owner: string;
  distance: string;
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
    distance: "28 km",
    pricePerDay: 1200,
    marketPrice: 2100,
    rating: 4.9,
    ownerScore: 910,
    image: harvester,
    available: "Disponível: out – fev",
  },
  {
    id: "m2",
    name: "Trator Valtra BH180",
    category: "Tratores",
    owner: "Mateus Lima",
    distance: "14 km",
    pricePerDay: 580,
    marketPrice: 980,
    rating: 4.7,
    ownerScore: 780,
    image: tractor,
    available: "Disponível: sob consulta",
  },
  {
    id: "m3",
    name: "Pulverizador Jacto Uniport",
    category: "Pulverização",
    owner: "Coop. Vale Verde",
    distance: "22 km",
    pricePerDay: 540,
    marketPrice: 980,
    rating: 4.7,
    ownerScore: 845,
    image: sprayer,
    available: "Livre a partir de 18/jun",
  },
];

/* ── COMPRAS COLETIVAS ─────────────────────────────────────── */
export type Participant = {
  initials: string;
  name: string;
  city: string;
  crops: string;
  score: number;
  qty: number;
  organizer?: boolean;
};

export type GroupBuy = {
  id: string;
  product: string;
  brand: string;
  organizer: string;
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
};

export const groupBuys: GroupBuy[] = [
  {
    id: "g1",
    product: "Ureia Granulada",
    brand: "Yara Brasil",
    organizer: "Marco Bianchi",
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
      { initials: "MB", name: "Marco Bianchi", city: "Passo Fundo", crops: "Soja/Milho", score: 892, qty: 18, organizer: true },
      { initials: "JK", name: "João Klein", city: "Carazinho", crops: "Soja/Trigo", score: 815, qty: 12 },
      { initials: "RL", name: "Rosa Lenz", city: "Sarandi", crops: "Soja", score: 760, qty: 10 },
    ],
  },
  {
    id: "g2",
    product: "Semente de Soja TMG 7062",
    brand: "TMG Sementes",
    organizer: "Vera Stolz",
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
      { initials: "VS", name: "Vera Stolz", city: "Ijuí", crops: "Soja", score: 870, qty: 60, organizer: true },
      { initials: "PT", name: "Pedro Thomé", city: "Augusto Pestana", crops: "Soja/Milho", score: 805, qty: 50 },
    ],
  },
  {
    id: "g3",
    product: "Herbicida Glifosato 5L",
    brand: "Syngenta",
    organizer: "Lauro Pereira",
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
      { initials: "LP", name: "Lauro Pereira", city: "Lagoa Vermelha", crops: "Soja/Milho", score: 830, qty: 40, organizer: true },
    ],
  },
];

/* ── MATCHES (algoritmo) ───────────────────────────────────── */
export type Match = {
  initials: string;
  name: string;
  city: string;
  reason: string;
  pct: number;
};

export const matches: Match[] = [
  { initials: "RM", name: "Rodrigo Melo", city: "Carazinho", reason: "Mesma cultura · precisa de colheitadeira", pct: 94 },
  { initials: "AR", name: "Ana Ritter", city: "Passo Fundo", reason: "Quer comprar ureia · volume similar ao seu", pct: 87 },
  { initials: "LP", name: "Lauro Pereira", city: "Lagoa Vermelha", reason: "Tem plantadeira disponível para aluguel", pct: 81 },
];

/* ── VÍNCULOS (negócios em andamento) ──────────────────────── */
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
    title: "Rodrigo Melo quer alugar sua colheitadeira",
    sub: "S680 John Deere · 15 a 25 de outubro",
    status: "warn",
    badge: "Aprovar",
    meta: [
      { label: "📍", strong: "32 km" },
      { label: "⭐ Score", strong: "780" },
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
      { label: "📍", strong: "18 km" },
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

/* ── PERFIL PÚBLICO (Rodrigo Melo, ex.) ───────────────────── */
export const publicProfile = {
  initials: "RM",
  name: "Rodrigo Melo",
  farm: "Fazenda Forte Santa",
  location: "Seberi, RS · 28 km de você",
  score: 910,
  band: "Faixa A",
  stats: [
    { value: "420 ha", label: "Área cultivada" },
    { value: "8", label: "Negócios feitos" },
    { value: "2 anos", label: "Na plataforma" },
  ],
  dims: [
    { label: "Completude do perfil", value: 95 },
    { label: "Negócios concluídos", value: 88 },
    { label: "Pagamentos em dia", value: 100 },
    { label: "Avaliações recebidas", value: 85 },
  ],
  crops: ["Soja", "Milho", "Trigo", "Pastagem"],
  interests: ["Aluguel de máquina", "Compra coletiva", "Divisão de frete"],
  machines: [
    { icon: "🌾", name: "Colheitadeira JD S780", detail: "2021 · Plataforma 35 pés · Disponível out–fev", price: "R$ 1.400/dia" },
    { icon: "🚜", name: "Trator NH T7.315", detail: "2019 · 315 cv · Disponível sob consulta", price: "R$ 680/dia" },
  ],
  history: [
    { icon: "🌿", title: "Compra coletiva · Ureia 60 ton", date: "Março 2025 · 6 produtores" },
    { icon: "🌾", title: "Aluguel colheitadeira · 12 dias", date: "Abril 2025 · R$ 16.800" },
    { icon: "🌿", title: "Compra coletiva · Semente soja", date: "Outubro 2024 · 4 produtores" },
  ],
};
