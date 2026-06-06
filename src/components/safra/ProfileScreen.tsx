import { IconArrowLeft, IconCheck, IconChat, IconUsers, IconMapPin } from "./icons";
import type { Screen } from "./types";
import { publicProfile as p } from "./data";

export function ProfileScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {/* Header */}
      <div className="relative rounded-b-[28px] bg-gradient-to-br from-[var(--brand-dark)] to-[var(--brand)] px-5 pb-6 pt-[64px] text-center text-white">
        <button onClick={() => go("home")} className="absolute left-4 top-[64px] grid h-8 w-8 place-items-center rounded-[9px] bg-white/15">
          <IconArrowLeft />
        </button>
        <div className="relative mx-auto mt-2 grid h-[72px] w-[72px] place-items-center rounded-full border-[3px] border-white/40 bg-white/20" style={{ fontFamily: "var(--font-display)" }}>
          <span className="text-[24px]">{p.initials}</span>
          <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[var(--accent)] text-[var(--brand-dark)]">
            <IconCheck size={10} />
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-display)" }} className="mt-3 text-[20px]">{p.name}</div>
        <div className="text-[12px] text-white/70">{p.farm}</div>
        <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-white/55"><IconMapPin size={11} /> {p.location}</div>

        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-[14px] bg-white/10">
          {p.stats.map((s) => (
            <div key={s.label} className="bg-white/8 px-1 py-3">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[17px]">{s.value}</div>
              <div className="mt-0.5 text-[9px] text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Score card */}
      <div className="mx-4 mt-4 rounded-[16px] border border-[var(--line)] bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[15px]">Score Safra+</span>
          <span style={{ fontFamily: "var(--font-display)" }} className="rounded-full bg-[var(--brand)] px-3.5 py-1 text-[12px] font-bold text-white">{p.band}</span>
        </div>
        <div style={{ fontFamily: "var(--font-display)" }} className="text-center text-[48px] leading-none text-[var(--brand)]">{p.score}</div>
        <div className="mb-4 text-center text-[11px] text-[var(--ink-faint)]">de 1000 pontos · Atualizado hoje</div>
        <div className="space-y-2.5">
          {p.dims.map((d) => (
            <div key={d.label} className="flex items-center gap-2.5">
              <span className="w-[112px] shrink-0 text-[11px] text-[var(--ink-faint)]">{d.label}</span>
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
          {p.crops.map((c, i) => (
            <span key={c} className="rounded-full px-3.5 py-1.5 text-[12px] font-medium" style={i === p.crops.length - 1 ? { background: "#F0D9B5", color: "var(--earth,#B7894A)" } : { background: "var(--brand-pale)", color: "var(--brand)" }}>{c}</span>
          ))}
        </div>
      </Section>

      {/* Interesses */}
      <Section title="🤝 Interesses de negócio">
        <div className="flex flex-wrap gap-1.5">
          {p.interests.map((c, i) => (
            <span key={c} className="rounded-full px-3.5 py-1.5 text-[12px] font-medium" style={i === p.interests.length - 1 ? { background: "#F0D9B5", color: "var(--earth,#B7894A)" } : { background: "var(--brand-pale)", color: "var(--brand)" }}>{c}</span>
          ))}
        </div>
      </Section>

      {/* Máquinas */}
      <Section title="🚜 Maquinário disponível">
        {p.machines.map((m) => (
          <div key={m.name} className="flex items-center gap-3 border-b border-[var(--line)] py-2.5 last:border-0 last:pb-0">
            <span className="grid h-9 w-9 place-items-center rounded-[9px] text-[18px]" style={{ background: "#F0D9B5" }}>{m.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold">{m.name}</div>
              <div className="text-[11px] text-[var(--ink-faint)]">{m.detail}</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] text-[var(--brand)]">{m.price}</div>
          </div>
        ))}
      </Section>

      {/* Histórico */}
      <Section title="📋 Histórico de negócios">
        {p.history.map((h) => (
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

      {/* Ações */}
      <div className="px-4 pt-1">
        <button className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--brand)] py-3.5 text-[14px] font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
          <IconChat size={15} /> Enviar mensagem
        </button>
        <button onClick={() => go("vinculos")} className="mt-2 flex w-full items-center justify-center gap-2 rounded-[12px] border-[1.5px] border-[var(--brand)] py-3 text-[13px] font-semibold text-[var(--brand)]" style={{ fontFamily: "var(--font-display)" }}>
          <IconUsers size={15} /> Convidar para negócio
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
