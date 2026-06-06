import { IconBell, IconLeaf, IconTractor, IconCart, IconArrowRight, IconTrendDown } from "./icons";
import type { Screen } from "./types";
import { fmtBRL, machines, groupBuys } from "./data";

export function HomeScreen({ go }: { go: (s: Screen) => void }) {
  const topMachine = machines[0];
  const topGroup = groupBuys[0];
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="rounded-b-[28px] bg-[var(--brand)] px-5 pb-5 pt-3 text-white">
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
          <div className="text-[11px] text-white/65">Olá, bem-vindo</div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px]">
            João Pereira
          </div>
        </div>
      </div>

      {/* Savings card */}
      <div className="-mt-3 px-4">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
          <div className="mb-1 text-[9px] font-semibold uppercase tracking-[1px] text-[var(--ink-faint)]">
            Economia neste mês
          </div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[34px] leading-none text-[var(--brand)]">
            R$ 4.280
          </div>
          <div className="mt-1 text-[10px] text-[var(--ink-faint)]">vs. compra individual</div>
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--brand-pale)] px-2.5 py-1 text-[10px] font-semibold text-[var(--brand)]">
            <IconTrendDown size={11} />
            32% mais barato
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-3 grid grid-cols-2 gap-2 px-4">
        <button
          onClick={() => go("machines")}
          className="rounded-[14px] border border-[var(--line)] bg-white p-3 text-left transition active:scale-[0.98]"
        >
          <IconTractor size={20} />
          <div className="mt-1.5 text-[11px] font-semibold">Alugar máquina</div>
          <div className="mt-0.5 text-[9px] leading-snug text-[var(--ink-faint)]">
            Compartilhe com vizinhos
          </div>
          <div className="mt-2 flex items-end justify-between border-t border-[var(--line)] pt-2">
            <div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px] leading-none text-[var(--brand)]">
                -47%
              </div>
              <div className="text-[8px] text-[var(--ink-faint)]">vs. mercado</div>
            </div>
            <IconArrowRight />
          </div>
        </button>
        <button
          onClick={() => go("groupbuys")}
          className="rounded-[14px] border border-[var(--line)] bg-white p-3 text-left transition active:scale-[0.98]"
        >
          <IconCart size={20} />
          <div className="mt-1.5 text-[11px] font-semibold">Compra conjunta</div>
          <div className="mt-0.5 text-[9px] leading-snug text-[var(--ink-faint)]">
            Compre em grupo, pague menos
          </div>
          <div className="mt-2 flex items-end justify-between border-t border-[var(--line)] pt-2">
            <div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px] leading-none text-[var(--brand)]">
                -28%
              </div>
              <div className="text-[8px] text-[var(--ink-faint)]">vs. mercado</div>
            </div>
            <IconArrowRight />
          </div>
        </button>
      </div>

      {/* Destaques */}
      <div className="mt-4 px-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 style={{ fontFamily: "var(--font-display)" }} className="text-[15px]">
            Em destaque
          </h3>
        </div>

        <button
          onClick={() => go("machineDetail")}
          className="mb-2 flex w-full gap-3 overflow-hidden rounded-[14px] border border-[var(--line)] bg-white p-2.5 text-left"
        >
          <img
            src={topMachine.image}
            alt={topMachine.name}
            className="h-16 w-16 shrink-0 rounded-[10px] object-cover"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-semibold">{topMachine.name}</div>
            <div className="text-[9px] text-[var(--ink-faint)]">{topMachine.owner} · {topMachine.distance}</div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span style={{ fontFamily: "var(--font-display)" }} className="text-[15px] text-[var(--brand)]">
                {fmtBRL(topMachine.pricePerDay)}
              </span>
              <span className="text-[9px] text-[var(--ink-faint)]">/dia</span>
              <span className="ml-auto text-[9px] text-[var(--danger)] line-through opacity-70">
                {fmtBRL(topMachine.marketPrice)}
              </span>
            </div>
          </div>
        </button>

        <button
          onClick={() => go("groupbuyDetail")}
          className="mb-3 flex w-full gap-3 overflow-hidden rounded-[14px] border border-[var(--line)] bg-white p-2.5 text-left"
        >
          <img
            src={topGroup.image}
            alt={topGroup.product}
            className="h-16 w-16 shrink-0 rounded-[10px] object-cover"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-semibold">{topGroup.product}</div>
            <div className="text-[9px] text-[var(--ink-faint)]">{topGroup.brand} · {topGroup.unit}</div>
            <div className="mt-1.5 h-1 overflow-hidden rounded bg-[var(--line)]">
              <div className="h-full rounded bg-[var(--brand)]" style={{ width: `${(topGroup.current / topGroup.goal) * 100}%` }} />
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px] text-[var(--ink-faint)]">
              <span>{topGroup.participants} produtores</span>
              <span className="font-semibold text-[var(--brand)]">{topGroup.deadline}</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
