import { IconArrowLeft, IconLeaf, IconCheck } from "./icons";
import type { Screen } from "./types";
import { fmtBRL } from "./data";

export function ProfileScreen({ go }: { go: (s: Screen) => void }) {
  const stats = [
    { label: "Economia total", value: fmtBRL(18420) },
    { label: "Aluguéis", value: "12" },
    { label: "Compras", value: "9" },
  ];
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative rounded-b-[28px] bg-gradient-to-br from-[var(--brand-dark)] to-[var(--brand)] px-5 pb-6 pt-3 text-center text-white">
        <button onClick={() => go("home")} className="absolute left-4 top-3 grid h-8 w-8 place-items-center rounded-[9px] bg-white/15">
          <IconArrowLeft />
        </button>
        <div className="relative mx-auto mt-2 grid h-16 w-16 place-items-center rounded-full border-2 border-white/40 bg-white/20" style={{ fontFamily: "var(--font-display)" }}>
          <span className="text-[22px]">JP</span>
          <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[var(--accent)] text-[var(--brand-dark)]">
            <IconCheck size={10} />
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-[18px]">João Pereira</div>
        <div className="text-[11px] text-white/70">Fazenda Boa Esperança</div>
        <div className="text-[10px] text-white/55">Cascavel, PR</div>

        <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-[14px] bg-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/8 px-1 py-2.5">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[15px]">{s.value}</div>
              <div className="text-[9px] text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="rounded-[14px] border border-[var(--line)] bg-white p-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--brand-pale)] text-[var(--brand)]">
              <IconLeaf size={18} />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold">Produtor verificado</div>
              <div className="text-[10px] text-[var(--ink-faint)]">Documentação aprovada</div>
            </div>
            <span className="rounded-full bg-[var(--brand-pale)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
              Nível Ouro
            </span>
          </div>
        </div>

        <div className="mt-2 rounded-[14px] border border-[var(--line)] bg-white p-3">
          <div className="mb-2 text-[11px] font-semibold">Próximas atividades</div>
          {[
            { t: "Reserva: Trator John Deere", d: "12/jun · 3 dias" },
            { t: "Compra: Fertilizante NPK", d: "Encerra em 4 dias" },
            { t: "Entrega prevista de sementes", d: "20/jun" },
          ].map((i) => (
            <div key={i.t} className="flex items-center justify-between border-t border-[var(--line)] py-2 first:border-t-0 first:pt-1">
              <div className="text-[11px]">{i.t}</div>
              <div className="text-[10px] text-[var(--ink-faint)]">{i.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
