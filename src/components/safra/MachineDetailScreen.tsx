import { IconArrowLeft, IconStar, IconMapPin, IconCheck, IconClock } from "./icons";
import { fmtBRL, machines } from "./data";
import type { Screen } from "./types";

export function MachineDetailScreen({ go, machineId }: { go: (s: Screen) => void; machineId: string }) {
  const m = machines.find((x) => x.id === machineId) ?? machines[0];
  const saving = Math.round(((m.marketPrice - m.pricePerDay) / m.marketPrice) * 100);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative h-[180px] w-full">
        <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        <button
          onClick={() => go("machines")}
          className="absolute left-4 top-12 grid h-9 w-9 place-items-center rounded-[10px] bg-white/90 text-[var(--ink)] backdrop-blur"
        >
          <IconArrowLeft />
        </button>
      </div>

      <div className="px-4 pb-3 pt-3">
        <div className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-pale)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--brand)]">
          {m.category}
        </div>
        <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-1.5 text-[18px] leading-tight">
          {m.name}
        </h2>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-[var(--ink-faint)]">
          <span className="inline-flex items-center gap-0.5"><IconStar size={10} style={{ color: "var(--accent)" }} /> {m.rating}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-0.5"><IconMapPin size={10} /> {m.distance}</span>
          <span>·</span>
          <span>{m.owner}</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-[12px] border border-[var(--line)] bg-white p-2.5">
            <div className="text-[8px] uppercase tracking-wider text-[var(--ink-faint)]">Safra+</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px] leading-none text-[var(--brand)]">
              {fmtBRL(m.pricePerDay)}
            </div>
            <div className="text-[9px] text-[var(--ink-faint)]">por dia</div>
          </div>
          <div className="rounded-[12px] border border-[var(--line)] bg-[var(--surface-2)] p-2.5">
            <div className="text-[8px] uppercase tracking-wider text-[var(--ink-faint)]">Mercado</div>
            <div className="text-[16px] font-semibold text-[var(--danger)] line-through opacity-75">
              {fmtBRL(m.marketPrice)}
            </div>
            <div className="text-[9px] font-semibold text-[var(--brand)]">você economiza {saving}%</div>
          </div>
        </div>

        <div className="mt-3 rounded-[12px] border border-[var(--line)] bg-white p-3">
          <div className="mb-2 text-[11px] font-semibold">Inclui</div>
          {[
            "Operador treinado",
            "Combustível incluso",
            "Manutenção em dia",
            "Seguro contra avarias",
          ].map((t) => (
            <div key={t} className="mb-1 flex items-center gap-2 text-[11px] text-[var(--ink-soft)]">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--brand-pale)] text-[var(--brand)]">
                <IconCheck size={10} />
              </span>
              {t}
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-[12px] bg-[var(--brand-pale)] p-2.5 text-[10px] text-[var(--brand-dark)]">
          <IconClock size={14} /> {m.available}
        </div>

        <button className="mt-3 w-full rounded-[12px] bg-[var(--brand)] py-3 text-[13px] font-semibold text-white shadow-sm transition active:scale-[0.99]">
          Reservar máquina
        </button>
      </div>
    </div>
  );
}
