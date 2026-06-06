import { IconArrowLeft, IconUsers, IconTrendDown } from "./icons";
import { fmtBRL, groupBuys } from "./data";
import type { Screen } from "./types";

export function GroupBuysScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="rounded-b-[24px] bg-[var(--brand)] px-5 pb-5 pt-12 text-white">
        <div className="mb-3 flex items-center gap-3">
          <button onClick={() => go("home")} className="grid h-8 w-8 place-items-center rounded-[9px] bg-white/15">
            <IconArrowLeft />
          </button>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/60">Insumos</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px]">
              Compras conjuntas
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-[12px] bg-white/12 p-2.5">
          <IconTrendDown />
          <div className="text-[11px] leading-snug">
            Quanto mais produtores entram, <strong>menor o preço</strong>.
          </div>
        </div>
      </div>

      <div className="space-y-2 px-4 pb-4 pt-3">
        {groupBuys.map((g) => {
          const pct = Math.round((g.current / g.goal) * 100);
          const saving = Math.round(((g.marketPrice - g.unitPrice) / g.marketPrice) * 100);
          return (
            <button
              key={g.id}
              onClick={() => go("groupbuyDetail")}
              className="flex w-full gap-3 overflow-hidden rounded-[14px] border border-[var(--line)] bg-white p-2.5 text-left active:scale-[0.99]"
            >
              <img src={g.image} alt={g.product} className="h-[92px] w-[92px] shrink-0 rounded-[10px] object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-semibold leading-tight">{g.product}</div>
                <div className="text-[9px] text-[var(--ink-faint)]">{g.brand} · {g.unit}</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span style={{ fontFamily: "var(--font-display)" }} className="text-[15px] leading-none text-[var(--brand)]">
                    {fmtBRL(g.unitPrice)}
                  </span>
                  <span className="text-[9px] text-[var(--danger)] line-through opacity-70">{fmtBRL(g.marketPrice)}</span>
                  <span className="ml-auto rounded-full bg-[var(--brand-pale)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--brand)]">
                    -{saving}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded bg-[var(--line)]">
                  <div className="h-full rounded bg-[var(--brand)]" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1 flex items-center justify-between text-[9px] text-[var(--ink-faint)]">
                  <span className="inline-flex items-center gap-1"><IconUsers size={11} /> {g.participants} · {pct}% da meta</span>
                  <span className="font-semibold text-[var(--brand)]">{g.deadline}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
