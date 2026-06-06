import { useState } from "react";
import { IconArrowLeft, IconUsers, IconCheck } from "./icons";
import { fmtBRL, groupBuys } from "./data";
import type { Screen } from "./types";

export function GroupBuyDetailScreen({ go }: { go: (s: Screen) => void }) {
  const g = groupBuys[0];
  const [qty, setQty] = useState(10);
  const pct = Math.round((g.current / g.goal) * 100);
  const saving = g.marketPrice - g.unitPrice;
  const total = qty * g.unitPrice;
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative h-[180px] w-full">
        <img src={g.image} alt={g.product} className="h-full w-full object-cover" />
        <button
          onClick={() => go("groupbuys")}
          className="absolute left-4 top-3 grid h-9 w-9 place-items-center rounded-[10px] bg-white/90 text-[var(--ink)]"
        >
          <IconArrowLeft />
        </button>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">{g.brand}</div>
        <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-0.5 text-[18px] leading-tight">
          {g.product}
        </h2>

        <div className="mt-3 rounded-[14px] border border-[var(--line)] bg-white p-3">
          <div className="flex items-end justify-between">
            <div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[28px] leading-none text-[var(--brand)]">
                {g.current}<span className="text-[14px] text-[var(--ink-faint)]"> /{g.goal}</span>
              </div>
              <div className="text-[10px] text-[var(--ink-faint)]">sacos confirmados</div>
            </div>
            <div className="text-right text-[10px] text-[var(--ink-faint)]">
              <div className="inline-flex items-center gap-1"><IconUsers size={11} /> {g.participants} produtores</div>
              <div className="mt-0.5 font-semibold text-[var(--brand)]">{g.deadline}</div>
            </div>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--line)]">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand-dark)] to-[var(--brand)]" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-1 text-[10px] font-semibold text-[var(--brand)]">{pct}% da meta atingida</div>
        </div>

        <div className="mt-2 flex items-center gap-2.5 rounded-[12px] bg-[var(--brand-pale)] p-3">
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[26px] leading-none text-[var(--brand)]">
            {fmtBRL(saving)}
          </div>
          <div className="text-[10px] leading-tight text-[var(--brand-dark)]">
            de economia por saco<br />
            <span className="text-[var(--ink-soft)]">vs. compra individual</span>
          </div>
        </div>

        <div className="mt-3 rounded-[14px] border border-[var(--line)] bg-white p-3">
          <div className="mb-2 text-[11px] font-semibold">Sua participação</div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--ink-soft)]">Sacos</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-7 w-7 place-items-center rounded-full border border-[var(--line)] text-[14px]">−</button>
              <span style={{ fontFamily: "var(--font-display)" }} className="w-8 text-center text-[16px]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-7 w-7 place-items-center rounded-full border border-[var(--line)] text-[14px]">+</button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[var(--line)] pt-2 text-[11px]">
            <span className="text-[var(--ink-soft)]">Total</span>
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[18px] text-[var(--brand)]">{fmtBRL(total)}</span>
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-[var(--brand)]">
            <IconCheck size={11} /> Economiza {fmtBRL(qty * saving)} no total
          </div>
        </div>

        <button className="mt-3 w-full rounded-[12px] bg-[var(--brand)] py-3 text-[13px] font-semibold text-white">
          Entrar na compra
        </button>
      </div>
    </div>
  );
}
