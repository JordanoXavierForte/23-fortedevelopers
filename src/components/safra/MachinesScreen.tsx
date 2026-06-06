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
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    filterRef.current!.scrollLeft = drag.current.scrollLeft - dx;
  }

  function onPointerUp(e: React.PointerEvent) {
    drag.current.active = false;
    filterRef.current?.releasePointerCapture(e.pointerId);
  }

  function onCategoryClick(c: string) {
    if (!drag.current.moved) setCat(c);
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="rounded-b-[24px] bg-[var(--brand)] px-5 pb-5 pt-12">
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

      <div className="space-y-3 px-4 pb-4 pt-3">
        {filtered.map((m) => {
          const saving = Math.round(((m.marketPrice - m.pricePerDay) / m.marketPrice) * 100);
          return (
            <button
              key={m.id}
              onClick={() => go("machineDetail")}
              className="w-full overflow-hidden rounded-[16px] border border-[var(--line)] bg-white text-left shadow-sm transition active:scale-[0.99]"
            >
              {/* Imagem full-width */}
              <div className="relative h-[140px] w-full overflow-hidden">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
                {/* Badge de economia sobre a imagem */}
                <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--brand)] px-2.5 py-1 text-[10px] font-bold text-white shadow">
                  -{saving}% vs. aluguel
                </span>
                {/* Badge de disponibilidade */}
                <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-medium text-white backdrop-blur-sm">
                  {m.available}
                </span>
              </div>

              {/* Informações */}
              <div className="px-3.5 py-3">
                <div className="truncate text-[13px] font-semibold leading-tight text-[var(--ink)]">
                  {m.name}
                </div>

                <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[var(--ink-faint)]">
                  <span className="flex items-center gap-1">
                    <IconStar size={10} style={{ color: "var(--accent)" }} />
                    {m.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconMapPin size={10} />
                    {m.distance}
                  </span>
                  <span>{m.owner}</span>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span style={{ fontFamily: "var(--font-display)" }} className="text-[20px] leading-none text-[var(--brand)]">
                      {fmtBRL(m.pricePerDay)}
                    </span>
                    <span className="text-[10px] text-[var(--ink-faint)]">/dia</span>
                  </div>
                  <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[10px] font-semibold text-[var(--ink-soft)]">
                    Score dono: {m.ownerScore}
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
