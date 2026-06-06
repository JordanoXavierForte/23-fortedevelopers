import { IconCheck, IconMapPin, IconTrendDown, IconUsers } from "./icons";
import type { Screen } from "./types";
import { me, fmtBRL } from "./data";

const myDims = [
  { label: "Completude do perfil", value: 100 },
  { label: "Histórico", value: 72 },
  { label: "Pontualidade", value: 100 },
  { label: "Reputação", value: 94 },
];

const myCrops = ["Soja", "Milho", "Trigo"];
const myInterests = ["Comprar insumos em grupo", "Alugar minha máquina"];
const myMachines = [
  { icon: "🌾", name: "Colheitadeira John Deere S780", detail: "Ano 2021 · R$ 1.400/dia · out–fev", price: "R$ 1.400/dia" },
  { icon: "🚜", name: "Trator New Holland T7.315", detail: "Ano 2019 · R$ 680/dia · sob consulta", price: "R$ 680/dia" },
];
const myHistory = [
  { icon: "🌱", title: "Compra coletiva de soja — 74 ton", date: "Concluído · mar 2025" },
  { icon: "🚜", title: "Aluguel colheitadeira para Lauro P.", date: "Concluído · jan 2025" },
  { icon: "🛒", title: "Insumos em grupo — herbicida", date: "Concluído · nov 2024" },
];

export function ProfileScreen({ go: _go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {/* Header */}
      <div className="relative rounded-b-[28px] bg-gradient-to-br from-[var(--brand-dark)] to-[var(--brand)] px-5 pb-6 pt-[64px] text-center text-white">
        <div className="relative mx-auto mt-2 grid h-[72px] w-[72px] place-items-center rounded-full border-[3px] border-white/40 bg-white/20" style={{ fontFamily: "var(--font-display)" }}>
          <span className="text-[24px]">{me.initials}</span>
          <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[var(--accent)] text-[var(--brand-dark)]">
            <IconCheck size={10} />
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-display)" }} className="mt-3 text-[20px]">{me.name}</div>
        <div className="text-[12px] text-white/70">{me.farm}</div>
        <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-white/55"><IconMapPin size={11} /> {me.location}</div>

        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-[14px] bg-white/10">
          {[
            { value: me.score, label: "Score" },
            { value: me.deals, label: "Negócios" },
            { value: me.neighbors, label: "Vizinhos" },
          ].map((s) => (
            <div key={s.label} className="bg-white/8 px-1 py-3">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[17px]">{s.value}</div>
              <div className="mt-0.5 text-[9px] text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Economia */}
      <div className="mx-4 mt-4 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--brand-pale)] text-[var(--brand)]">
            <IconTrendDown size={14} />
          </span>
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px]">Economia total na Safra+</span>
        </div>
        <div style={{ fontFamily: "var(--font-display)" }} className="text-[36px] leading-none text-[var(--brand)]">{fmtBRL(me.savingsTotal)}</div>
        <div className="mt-1 text-[11px] text-[var(--ink-faint)]">economizados desde que você entrou</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: "Compras coletivas", value: fmtBRL(me.savingsBuys) },
            { label: "Aluguel de máquinas", value: fmtBRL(me.savingsMachines) },
          ].map((s) => (
            <div key={s.label} className="rounded-[10px] bg-[var(--surface-2,#F9F7F3)] px-3 py-2.5">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[15px] text-[var(--brand)]">{s.value}</div>
              <div className="mt-0.5 text-[9px] text-[var(--ink-faint)]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Score */}
      <div className="mx-4 mt-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px]">Score Safra+</span>
          <span style={{ fontFamily: "var(--font-display)" }} className="rounded-full bg-[var(--brand)] px-3.5 py-1 text-[12px] font-bold text-white">{me.band}</span>
        </div>
        <div style={{ fontFamily: "var(--font-display)" }} className="text-center text-[44px] leading-none text-[var(--brand)]">{me.score}</div>
        <div className="mb-4 text-center text-[11px] text-[var(--ink-faint)]">de 1000 pontos · Atualizado hoje</div>
        <div className="space-y-2.5">
          {myDims.map((d) => (
            <div key={d.label} className="flex items-center gap-2.5">
              <span className="w-[120px] shrink-0 text-[11px] text-[var(--ink-faint)]">{d.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)]" style={{ width: `${d.value}%` }} />
              </div>
              <span className="w-7 text-right text-[11px] font-semibold">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Culturas */}
      <Section title="🌾 Culturas">
        <div className="flex flex-wrap gap-1.5">
          {myCrops.map((c) => (
            <span key={c} className="rounded-full bg-[var(--brand-pale)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--brand)]">{c}</span>
          ))}
        </div>
      </Section>

      {/* Interesses */}
      <Section title="🤝 Interesses de negócio">
        <div className="flex flex-wrap gap-1.5">
          {myInterests.map((c) => (
            <span key={c} className="rounded-full bg-[var(--brand-pale)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--brand)]">{c}</span>
          ))}
        </div>
      </Section>

      {/* Máquinas */}
      <Section title="🚜 Meu maquinário">
        {myMachines.map((m) => (
          <div key={m.name} className="flex items-center gap-3 border-b border-[var(--line)] py-2.5 last:border-0 last:pb-0">
            <span className="grid h-9 w-9 place-items-center rounded-[9px] text-[18px]" style={{ background: "#F0D9B5" }}>{m.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold">{m.name}</div>
              <div className="text-[11px] text-[var(--ink-faint)]">{m.detail}</div>
            </div>
          </div>
        ))}
        <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-dashed border-[var(--line)] py-2.5 text-[12px] text-[var(--ink-faint)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]">
          + Adicionar máquina
        </button>
      </Section>

      {/* Histórico */}
      <Section title="📋 Histórico de negócios">
        {myHistory.map((h) => (
          <div key={h.title} className="flex items-center gap-3 border-b border-[var(--line)] py-2.5 last:border-0 last:pb-0">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--brand-pale)] text-[16px]">{h.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px]">{h.title}</div>
              <div className="text-[11px] text-[var(--ink-faint)]">{h.date}</div>
            </div>
            <span className="rounded-full bg-[var(--brand-pale)] px-2.5 py-1 text-[10px] font-semibold text-[var(--brand)]">Concluído</span>
          </div>
        ))}
      </Section>

      {/* Ação — editar perfil */}
      <div className="px-4 pt-1">
        <button onClick={() => _go("editProfile")} className="flex w-full items-center justify-center gap-2 rounded-[12px] border-[1.5px] border-[var(--brand)] py-3 text-[13px] font-semibold text-[var(--brand)]" style={{ fontFamily: "var(--font-display)" }}>
          <IconUsers size={15} /> Editar perfil
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-4 mt-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
      <div style={{ fontFamily: "var(--font-display)" }} className="mb-3.5 text-[14px]">{title}</div>
      {children}
    </div>
  );
}
