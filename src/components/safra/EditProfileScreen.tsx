import { useState } from "react";
import { IconArrowLeft, IconCheck, IconPlus } from "./icons";
import type { Screen } from "./types";
import { me } from "./data";

const CROPS = ["Soja", "Milho", "Trigo", "Arroz", "Feijão", "Café", "Cana", "Algodão", "Pastagem", "Outro"];
const INTERESTS = [
  "Comprar insumos em grupo",
  "Alugar minha máquina",
  "Alugar máquina de vizinho",
  "Dividir frete",
  "Vender produção em grupo",
  "Compartilhar armazém",
];

function Chips({ items, initial }: { items: string[]; initial: string[] }) {
  const [sel, setSel] = useState<Set<string>>(new Set(initial));
  const toggle = (c: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((c) => {
        const on = sel.has(c);
        return (
          <button
            key={c}
            onClick={() => toggle(c)}
            className="rounded-full border px-3.5 py-2 text-[12px] transition"
            style={{
              background: on ? "var(--brand-pale)" : "transparent",
              borderColor: on ? "var(--brand)" : "var(--line)",
              color: on ? "var(--brand)" : "var(--ink-soft)",
              fontWeight: on ? 600 : 500,
            }}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

const fieldCls =
  "w-full rounded-[10px] border-[1.5px] border-[var(--line)] bg-white px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none focus:border-[var(--brand)]";
const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-faint)]";

function Card({ icon, title, sub, children }: { icon: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="mx-4 mb-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--brand-pale)] text-[15px]">{icon}</span>
        <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px]">{title}</span>
      </div>
      <div className="mb-3.5 ml-9 text-[11px] text-[var(--ink-faint)]">{sub}</div>
      {children}
    </div>
  );
}

const machines = [
  { icon: "🌾", name: "Colheitadeira John Deere S780", detail: "2021 · Plataforma 35 pés", price: "R$ 1.400 / dia", avail: "disponível out–fev" },
  { icon: "🚜", name: "Trator New Holland T7.315", detail: "2019 · 315 cv", price: "R$ 680 / dia", avail: "disponível sob consulta" },
];

export function EditProfileScreen({ go }: { go: (s: Screen) => void }) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => go("profile"), 900);
  }

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Header */}
      <div className="rounded-b-[24px] bg-[var(--brand)] px-5 pb-5 pt-[64px] text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => go("profile")}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-white/15"
          >
            <IconArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-white/60">Perfil</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px]">Editar perfil</div>
          </div>
          {/* Avatar */}
          <div className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-white/30 bg-white/20 text-[15px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {me.initials}
            <button className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-[var(--brand)] bg-[var(--accent)] text-white">
              <IconPlus size={8} />
            </button>
          </div>
        </div>
      </div>

      {/* Dados pessoais */}
      <div className="px-4 pt-4 pb-1">
        <div style={{ fontFamily: "var(--font-display)" }} className="mb-2 text-[13px] text-[var(--ink-faint)] uppercase tracking-[0.5px]">Dados pessoais</div>
      </div>
      <div className="mx-4 mb-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="mb-3">
          <label className={labelCls}>Nome completo</label>
          <input className={fieldCls} defaultValue={me.name} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>CPF / CNPJ</label>
            <input className={fieldCls} defaultValue="032.541.890-77" />
          </div>
          <div>
            <label className={labelCls}>Telefone</label>
            <input className={fieldCls} defaultValue="(54) 99812-3344" />
          </div>
        </div>
      </div>

      {/* Propriedade */}
      <Card icon="🌱" title="Propriedade" sub="Nome e localização da fazenda.">
        <div className="mb-3">
          <label className={labelCls}>Nome da propriedade</label>
          <input className={fieldCls} defaultValue={me.farm} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Estado</label>
            <select className={fieldCls} defaultValue="RS">
              <option>RS</option><option>MT</option><option>PR</option>
              <option>GO</option><option>MS</option><option>SP</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Município</label>
            <input className={fieldCls} defaultValue="Seberi" />
          </div>
          <div>
            <label className={labelCls}>Área total (ha)</label>
            <input type="number" className={fieldCls} defaultValue={480} />
          </div>
          <div>
            <label className={labelCls}>Área cultivada (ha)</label>
            <input type="number" className={fieldCls} defaultValue={420} />
          </div>
        </div>
      </Card>

      {/* Culturas */}
      <Card icon="🌾" title="Culturas que você planta" sub="Selecione todas que se aplicam.">
        <Chips items={CROPS} initial={["Soja", "Milho", "Trigo"]} />
      </Card>

      {/* Interesses */}
      <Card icon="🤝" title="O que você quer fazer?" sub="Isso define com quem vamos te conectar.">
        <Chips items={INTERESTS} initial={["Comprar insumos em grupo", "Alugar minha máquina"]} />
      </Card>

      {/* Maquinário */}
      <Card icon="🚜" title="Maquinário para aluguel" sub="Máquinas disponíveis entre safras.">
        <div className="space-y-2.5">
          {machines.map((mc) => (
            <div key={mc.name} className="flex items-center gap-3 rounded-[12px] border border-[var(--line)] p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-[20px]" style={{ background: "#F0D9B5" }}>{mc.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{mc.name}</div>
                <div className="text-[11px] text-[var(--ink-faint)]">{mc.detail}</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--brand-pale)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--brand)]">{mc.price}</span>
                  <span className="text-[10px] text-[var(--ink-faint)]">{mc.avail}</span>
                </div>
              </div>
            </div>
          ))}
          <button className="flex w-full items-center justify-center gap-2 rounded-[12px] border-[1.5px] border-dashed border-[var(--line)] py-3 text-[13px] font-semibold text-[var(--brand)]">
            <IconPlus size={16} /> Adicionar máquina
          </button>
        </div>
      </Card>

      {/* Botão salvar */}
      <div className="px-4 pt-2">
        <button
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-[14px] py-4 text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(43,106,24,0.3)] transition active:scale-[0.99]"
          style={{
            fontFamily: "var(--font-display)",
            background: saved ? "var(--accent)" : "var(--brand)",
          }}
        >
          {saved ? (
            <><IconCheck size={16} /> Salvo!</>
          ) : (
            "Salvar alterações"
          )}
        </button>
      </div>
    </div>
  );
}
