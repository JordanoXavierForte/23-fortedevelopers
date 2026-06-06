import { IconArrowLeft, IconMapPin, IconStar, IconCheck } from "./icons";
import type { Screen } from "./types";
import { me } from "./data";

type Participant = {
  initials: string;
  name: string;
  farm: string;
  city: string;
  state: string;
  distKm: number;
  crops: string[];
  areaHa: number;
  score: number;
  band: "A" | "B" | "C";
  deals: number;
  rating: number;
  qty: number;
  bio: string;
  avatarColor: string;
  organizer?: boolean;
  isMe?: boolean;
};

const PARTICIPANTS: Participant[] = [
  {
    initials: "VS",
    name: "Vera Stolz",
    farm: "Fazenda Paraíso Verde",
    city: "Ijuí",
    state: "RS",
    distKm: 97,
    crops: ["Soja", "Trigo"],
    areaHa: 210,
    score: 748,
    band: "B",
    deals: 2,
    rating: 4.0,
    qty: 60,
    bio: "Produtora familiar, foca em variedades de alta produtividade. Organizou 3 compras coletivas este ano.",
    avatarColor: "#2B6A18",
    organizer: true,
  },
  {
    initials: "PT",
    name: "Pedro Thomé",
    farm: "Sítio Thomé",
    city: "Augusto Pestana",
    state: "RS",
    distKm: 44,
    crops: ["Soja", "Milho"],
    areaHa: 160,
    score: 700,
    band: "B",
    deals: 1,
    rating: 3.8,
    qty: 50,
    bio: "Iniciando na plataforma, mas já com experiência de 8 anos em manejo de soja. Busca reduzir custo de insumos.",
    avatarColor: "#B7894A",
  },
  {
    initials: me.initials,
    name: me.name,
    farm: me.farm,
    city: "Seberi",
    state: "RS",
    distKm: 0,
    crops: ["Soja", "Milho", "Trigo"],
    areaHa: 480,
    score: 847,
    band: "A",
    deals: 8,
    rating: 4.7,
    qty: 30,
    bio: "Você está participando desta compra coletiva.",
    avatarColor: "#1a5c12",
    isMe: true,
  },
  {
    initials: "BN",
    name: "Beatriz Nunes",
    farm: "Chácara Nunes",
    city: "Sarandi",
    state: "RS",
    distKm: 61,
    crops: ["Soja"],
    areaHa: 180,
    score: 712,
    band: "B",
    deals: 3,
    rating: 4.2,
    qty: 20,
    bio: "Especializada em soja convencional. Prioriza compras em grupo para aumentar a margem na safra.",
    avatarColor: "#7C3AED",
  },
  {
    initials: "DM",
    name: "Davi Machado",
    farm: "Fazenda Machado",
    city: "Ijuí",
    state: "RS",
    distKm: 95,
    crops: ["Soja", "Milho"],
    areaHa: 230,
    score: 768,
    band: "B",
    deals: 4,
    rating: 4.3,
    qty: 20,
    bio: "Agricultor de terceira geração. Adotou gestão digital na safra 2024 e reduziu custos em 18%.",
    avatarColor: "#0369A1",
  },
];

const TOTAL_SACAS = PARTICIPANTS.reduce((s, p) => s + p.qty, 0);
const GOAL = 200;
const PCT = Math.round((TOTAL_SACAS / GOAL) * 100);

export function ParticipantsScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Header */}
      <div className="rounded-b-[28px] bg-[var(--brand)] px-5 pb-5 pt-[64px] text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => go("vinculos")}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-white/15"
          >
            <IconArrowLeft size={16} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-wider text-white/60">Compra coletiva · Soja</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px] leading-tight">
              Participantes
            </div>
          </div>
          <div className="shrink-0 rounded-full bg-white/20 px-3 py-1.5 text-[12px] font-bold">
            {PARTICIPANTS.length} produtores
          </div>
        </div>

        {/* Progress resumo */}
        <div className="mt-4 rounded-[14px] bg-white/12 p-3.5">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="text-white/70">🌱 Semente de Soja TMG 7062</span>
            <span className="font-bold text-[var(--accent)]">{PCT}% da meta</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-white/90"
              style={{ width: `${PCT}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-white/60">
            <span>{TOTAL_SACAS} sacas confirmadas</span>
            <span>meta: {GOAL} sacas</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3 px-4 pt-4">
        {PARTICIPANTS.map((p) => (
          <ParticipantCard key={p.initials} p={p} />
        ))}
      </div>
    </div>
  );
}

function ParticipantCard({ p }: { p: Participant }) {
  return (
    <div
      className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-white shadow-sm"
      style={{ borderLeft: p.isMe ? "4px solid var(--brand)" : undefined }}
    >
      {/* Topo do card */}
      <div className="flex items-center gap-3.5 px-4 pt-4 pb-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="grid h-[56px] w-[56px] place-items-center rounded-full text-[18px] font-bold text-white shadow-md"
            style={{ background: p.avatarColor, fontFamily: "var(--font-display)" }}
          >
            {p.initials}
          </div>
          {/* Badge faixa */}
          <span
            className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-white text-[9px] font-black text-white"
            style={{ background: p.band === "A" ? "var(--brand)" : "#D97706" }}
          >
            {p.band}
          </span>
        </div>

        {/* Nome + Farm */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "var(--font-display)" }} className="truncate text-[15px] font-semibold text-[var(--ink)]">
              {p.name}
            </span>
            {p.organizer && (
              <span className="shrink-0 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                Org.
              </span>
            )}
            {p.isMe && (
              <span className="shrink-0 rounded-full bg-[var(--brand-pale)] px-2 py-0.5 text-[9px] font-bold text-[var(--brand)]">
                Você
              </span>
            )}
          </div>
          <div className="mt-0.5 truncate text-[12px] text-[var(--ink-faint)]">{p.farm}</div>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[var(--ink-faint)]">
            <IconMapPin size={10} />
            <span>{p.city}, {p.state}</span>
            {p.distKm > 0 && <span>· {p.distKm} km</span>}
          </div>
        </div>

        {/* Sacas confirmadas */}
        <div className="shrink-0 text-right">
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[20px] leading-none text-[var(--brand)]">
            {p.qty}
          </div>
          <div className="mt-0.5 text-[9px] uppercase tracking-wide text-[var(--ink-faint)]">sacas</div>
        </div>
      </div>

      {/* Bio */}
      <div className="mx-4 mb-3 rounded-[10px] bg-[var(--surface-2,#F9F7F3)] px-3 py-2.5 text-[11px] italic leading-snug text-[var(--ink-soft)]">
        "{p.bio}"
      </div>

      {/* Culturas */}
      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
        {p.crops.map((c) => (
          <span
            key={c}
            className="rounded-full bg-[var(--brand-pale)] px-2.5 py-1 text-[10px] font-medium text-[var(--brand)]"
          >
            {c}
          </span>
        ))}
        <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[10px] text-[var(--ink-faint)]">
          {p.areaHa} ha
        </span>
      </div>

      {/* Stats */}
      <div className="mx-4 mb-3.5 grid grid-cols-3 gap-1.5">
        <Stat icon={<StarIcon />} label="Score" value={String(p.score)} highlight />
        <Stat icon={<CheckIcon />} label="Negócios" value={String(p.deals)} />
        <Stat icon={<StarFilledIcon />} label="Avaliação" value={String(p.rating)} />
      </div>

      {/* Botão */}
      {p.isMe ? (
        <div className="mx-4 mb-4 flex items-center justify-center gap-1.5 rounded-[11px] bg-[var(--brand-pale)] py-2.5 text-[12px] font-semibold text-[var(--brand)]">
          <IconCheck size={13} /> Participando desta compra
        </div>
      ) : (
        <button className="mx-4 mb-4 flex w-[calc(100%-32px)] items-center justify-center gap-2 rounded-[11px] bg-[var(--brand)] py-3 text-[12px] font-semibold text-white shadow-sm transition active:scale-[0.99]">
          <ChatIcon /> Entrar em contato
        </button>
      )}
    </div>
  );
}

function Stat({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center rounded-[10px] border border-[var(--line)] py-2">
      <span className="mb-0.5 text-[var(--brand)] opacity-70">{icon}</span>
      <span
        style={{ fontFamily: "var(--font-display)" }}
        className="text-[14px] leading-none"
        data-highlight={highlight}
      >
        <span style={{ color: highlight ? "var(--brand)" : "var(--ink)" }}>{value}</span>
      </span>
      <span className="mt-0.5 text-[9px] uppercase tracking-wide text-[var(--ink-faint)]">{label}</span>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function StarFilledIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#D97706" }}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
