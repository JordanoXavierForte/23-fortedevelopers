import { IconBell, IconLeaf, IconUsers, IconTrendDown, IconStar, IconShield } from "./icons";
import type { Screen } from "./types";
import { fmtBRL, me, machines, groupBuys } from "./data";

export function HomeScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="rounded-b-[28px] bg-[var(--brand)] px-5 pb-5 pt-[64px] text-white">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-[11px] bg-white/15">
              <IconLeaf size={18} />
            </div>
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[20px]">
              Safra<span className="text-[var(--accent)]">+</span>
            </span>
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-[10px] bg-white/15">
            <IconBell size={16} />
            <span className="absolute right-[8px] top-[7px] h-[7px] w-[7px] rounded-full border-2 border-[var(--brand)] bg-[var(--accent)]" />
          </button>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px]">
            Boa noite, {me.name.split(" ")[0]} 👋
          </div>
          <div className="text-[11px] text-white/65">{me.farm} · {me.location}</div>
        </div>

        {/* Score pills */}
        <div className="mt-4 flex gap-2.5">
          <button onClick={() => go("profile")} className="flex flex-1 items-center gap-2.5 rounded-[12px] bg-white/12 px-3 py-2.5 text-left">
            <div className="flex-1">
              <div className="text-[10px] text-white/65">Seu score</div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[22px] leading-none">{me.score}</div>
            </div>
            <span className="rounded-full bg-[var(--green-light,#52B788)] px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: "var(--accent)" }}>{me.band}</span>
          </button>
          <div className="flex flex-1 items-center gap-2.5 rounded-[12px] bg-white/12 px-3 py-2.5">
            <div className="flex-1">
              <div className="text-[10px] text-white/65">Vizinhos próximos</div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[22px] leading-none">{me.neighbors}</div>
            </div>
            <IconUsers size={18} />
          </div>
        </div>
      </div>

      {/* Resumo de economia */}
      <div className="px-4 pt-4">
        <div className="rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--brand-pale)] text-[var(--brand)]">
              <IconTrendDown size={16} />
            </span>
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px] text-[var(--ink)]">Sua economia na Safra+</span>
          </div>

          {/* Valor destaque */}
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[38px] leading-none text-[var(--brand)]">
            {fmtBRL(me.savingsTotal)}
          </div>
          <div className="mt-1 text-[11px] text-[var(--ink-faint)]">economizados desde que você entrou</div>

          {/* Breakdown */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "Este mês", value: fmtBRL(me.savingsMonth), highlight: true },
              { label: "Compras", value: fmtBRL(me.savingsBuys) },
              { label: "Máquinas", value: fmtBRL(me.savingsMachines) },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[10px] px-2.5 py-2.5 text-center"
                style={{ background: s.highlight ? "var(--brand-pale)" : "var(--surface-2,#F9F7F3)" }}
              >
                <div
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[13px] leading-tight"
                  data-highlight={s.highlight}
                >
                  <span style={{ color: s.highlight ? "var(--brand)" : "var(--ink)" }}>{s.value}</span>
                </div>
                <div className="mt-0.5 text-[9px] text-[var(--ink-faint)]">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Frase motivacional */}
          <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-[var(--brand-pale)] px-3 py-2.5 text-[11px] text-[var(--brand)]">
            <IconUsers size={14} />
            <span>Você fez <strong>{me.deals} negócios</strong> com vizinhos até agora. Continue!</span>
          </div>
        </div>
      </div>

      {/* Compras abertas */}
      <div className="px-4 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 style={{ fontFamily: "var(--font-display)" }} className="text-[15px]">🛒 Compras abertas</h3>
          <button onClick={() => go("groupbuys")} className="text-[11px] font-semibold text-[var(--brand)]">Ver todas</button>
        </div>
        {groupBuys.slice(0, 2).map((g) => {
          const pct = Math.round((g.current / g.goal) * 100);
          const saving = Math.round(((g.marketPrice - g.unitPrice) / g.marketPrice) * 100);
          return (
            <button
              key={g.id}
              onClick={() => go("groupbuyDetail")}
              className="mb-2 w-full rounded-[16px] border border-[var(--line)] bg-white p-3.5 text-left shadow-sm transition active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <img src={g.image} alt={g.product} className="h-11 w-11 shrink-0 rounded-[12px] object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold">{g.product} · {g.current} {g.unitShort}</div>
                  <div className="text-[11px] text-[var(--ink-faint)]">Organizado por <strong className="text-[var(--brand)]">{g.organizer}</strong> · {g.organizerCity}</div>
                </div>
              </div>
              <div className="mt-2.5 flex justify-between text-[11px] text-[var(--ink-faint)]">
                <span><strong className="text-[var(--ink)]">{g.current} {g.unitShort}</strong> confirmadas</span>
                <span>meta: {g.goal} {g.unitShort}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--line)]">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)]" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full bg-[var(--brand-pale)] px-2.5 py-1 text-[10px] font-semibold text-[var(--brand)]">↓ {saving}% vs. individual</span>
                <span className="rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[10px] font-semibold text-[#92400E]">{g.deadline}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Máquinas perto */}
      <div className="px-4 pb-4 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 style={{ fontFamily: "var(--font-display)" }} className="text-[15px]">🚜 Máquinas perto de você</h3>
          <button onClick={() => go("machines")} className="text-[11px] font-semibold text-[var(--brand)]">Ver todas</button>
        </div>
        {machines.slice(0, 2).map((m) => (
          <button
            key={m.id}
            onClick={() => go("machineDetail")}
            className="mb-2 flex w-full gap-3 rounded-[16px] border border-[var(--line)] bg-white p-3 text-left shadow-sm transition active:scale-[0.99]"
          >
            <img src={m.image} alt={m.name} className="h-[68px] w-[68px] shrink-0 rounded-[12px] object-cover" loading="lazy" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold">{m.name}</div>
              <div className="text-[10px] text-[var(--ink-faint)]">{m.owner} · {m.distance}</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[var(--brand-pale)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
                <IconShield size={11} /> Score {m.ownerScore} · Confiável
              </div>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span style={{ fontFamily: "var(--font-display)" }} className="text-[16px] leading-none text-[var(--brand)]">{fmtBRL(m.pricePerDay)}</span>
                <span className="text-[10px] text-[var(--ink-faint)]">/ dia</span>
                <span className="ml-auto inline-flex items-center gap-0.5 text-[10px] text-[var(--ink-faint)]"><IconStar size={10} style={{ color: "var(--accent)" }} /> {m.rating}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
