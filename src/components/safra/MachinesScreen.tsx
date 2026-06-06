import { useState, useRef } from "react";
import { IconArrowLeft, IconStar, IconMapPin } from "./icons";
import { fmtBRL, machines } from "./data";
import type { Screen } from "./types";

const categories = ["Todos", "Tratores", "Colheita", "Pulverização"];

export function MachinesScreen({ go }: { go: (s: Screen) => void }) {
  const [cat, setCat] = useState("Todos");
  const filtered = cat === "Todos" ? machines : machines.filter((m) => m.category === cat);

  const filterRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  function onPointerDown(e: React.PointerEvent) {
    const el = filterRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    filterRef.current!.scrollLeft = drag.current.scrollLeft - dx;
  }

  function onPointerUp(_e: React.PointerEvent) {
    drag.current.active = false;
  }

  function onCategoryClick(c: string) {
    if (!drag.current.moved) setCat(c);
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="rounded-b-[24px] bg-[var(--brand)] px-5 pb-5 pt-[64px]">
        <div className="mb-3 flex items-center gap-3 text-white">
          <button onClick={() => go("home")} className="grid h-8 w-8 place-items-center rounded-[9px] bg-white/15">
            <IconArrowLeft />
          </button>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/60">Catálogo</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px] text-white">
              Aluguel de máquinas
            </div>
          </div>
        </div>
        <div
          ref={filterRef}
          className="flex gap-1.5 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryClick(c)}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-semibold transition"
              style={{
                background: cat === c ? "white" : "rgba(255,255,255,0.15)",
                color: cat === c ? "var(--brand)" : "white",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 px-4 pb-4 pt-3">
        {filtered.map((m) => {
          const saving = Math.round(((m.marketPrice - m.pricePerDay) / m.marketPrice) * 100);
          return (
            <button
              key={m.id}
              onClick={() => go("machineDetail")}
              className="flex w-full gap-3 overflow-hidden rounded-[14px] border border-[var(--line)] bg-white p-2.5 text-left transition active:scale-[0.99]"
            >
              <img src={m.image} alt={m.name} className="h-[88px] w-[88px] shrink-0 rounded-[10px] object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-1">
                  <div className="truncate text-[12px] font-semibold leading-tight">{m.name}</div>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[9px] text-[var(--ink-faint)]">
                  <IconStar size={10} style={{ color: "var(--accent)" }} /> {m.rating} · {m.owner}
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[9px] text-[var(--ink-faint)]">
                  <IconMapPin size={10} /> {m.distance} · Score {m.ownerScore}
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span style={{ fontFamily: "var(--font-display)" }} className="text-[16px] leading-none text-[var(--brand)]">
                    {fmtBRL(m.pricePerDay)}
                  </span>
                  <span className="text-[9px] text-[var(--ink-faint)]">/dia</span>
                  <span className="ml-auto rounded-full bg-[var(--brand-pale)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--brand)]">
                    -{saving}%
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
