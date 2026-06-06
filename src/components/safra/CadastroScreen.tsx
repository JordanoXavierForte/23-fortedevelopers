import { useState } from "react";
import { IconLeaf, IconPlus, IconArrowRight } from "./icons";
import type { Screen } from "./types";

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
            className="rounded-full border px-3.5 py-2 text-[12px] font-medium transition"
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
  "w-full rounded-[10px] border-[1.5px] border-[var(--line)] bg-white px-3.5 py-3 text-[14px] text-[var(--ink)] outline-none focus:border-[var(--brand)]";
const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-faint)]";

function Card({ icon, title, sub, children }: { icon: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="mx-4 mb-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--brand-pale)] text-[15px]">{icon}</span>
        <span style={{ fontFamily: "var(--font-display)" }} className="text-[15px]">{title}</span>
      </div>
      <div className="mb-3.5 ml-9 text-[11px] text-[var(--ink-faint)]">{sub}</div>
      {children}
    </div>
  );
}

export function CadastroScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {/* Header */}
      <div className="mb-4 rounded-b-[28px] bg-[var(--brand)] px-6 pb-6 pt-4 text-center text-white">
        <div className="flex items-center justify-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-white/15"><IconLeaf size={16} /></div>
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[20px]">
            Safra<span className="text-[var(--accent)]">+</span>
          </span>
        </div>
        <div className="mt-1.5 text-[11px] text-white/70">Vizinhos do agro · juntos custam menos</div>
        <div className="mt-4 flex justify-center gap-1.5">
          <span className="h-1.5 w-10 rounded-full bg-white/60" />
          <span className="h-1.5 w-10 rounded-full bg-[var(--accent)]" />
          <span className="h-1.5 w-10 rounded-full bg-white/30" />
          <span className="h-1.5 w-10 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Propriedade */}
      <Card icon="🌱" title="Sobre a sua propriedade" sub="Quanto mais você preencher, melhores as conexões.">
        <div className="mb-3.5">
          <label className={labelCls}>Nome da propriedade</label>
          <input className={fieldCls} placeholder="Ex: Fazenda São João" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Estado</label>
            <select className={fieldCls}>
              <option>RS</option><option>MT</option><option>PR</option>
              <option>GO</option><option>MS</option><option>SP</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Município</label>
            <input className={fieldCls} placeholder="Ex: Passo Fundo" />
          </div>
          <div>
            <label className={labelCls}>Área total (ha)</label>
            <input type="number" className={fieldCls} placeholder="480" />
          </div>
          <div>
            <label className={labelCls}>Área cultivada (ha)</label>
            <input type="number" className={fieldCls} placeholder="420" />
          </div>
        </div>
      </Card>

      {/* Culturas */}
      <Card icon="🌾" title="Culturas que você planta" sub="Selecione todas que se aplicam.">
        <Chips items={CROPS} initial={["Soja", "Milho"]} />
      </Card>

      {/* Interesses */}
      <Card icon="🤝" title="O que você quer fazer?" sub="Isso define com quem vamos te conectar.">
        <Chips items={INTERESTS} initial={["Comprar insumos em grupo", "Alugar minha máquina"]} />
        <div className="mt-4 rounded-[10px] border-l-[3px] border-[var(--brand)] bg-[var(--brand-pale)] px-3.5 py-3 text-[11px] leading-relaxed text-[var(--brand)]">
          💡 Produtores que preenchem os interesses recebem até <strong>3x mais sugestões de negócio</strong> compatíveis com o perfil deles.
        </div>
      </Card>

      {/* Maquinário */}
      <Card icon="🚜" title="Maquinário para aluguel" sub="Cadastre o que ficaria parado entre safras.">
        <div className="space-y-2.5">
          {[
            { icon: "🌾", name: "Colheitadeira John Deere S780", detail: "2021 · Plataforma 35 pés", price: "R$ 1.400 / dia", avail: "disponível out–fev" },
            { icon: "🚜", name: "Trator New Holland T7.315", detail: "2019 · 315 cv", price: "R$ 680 / dia", avail: "disponível sob consulta" },
          ].map((mc) => (
            <div key={mc.name} className="flex items-center gap-3 rounded-[12px] border border-[var(--line)] p-3">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[var(--earth-light,#F0D9B5)] text-[20px]" style={{ background: "#F0D9B5" }}>{mc.icon}</span>
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
        <div className="mt-4 rounded-[10px] border-l-[3px] border-[var(--brand)] bg-[var(--brand-pale)] px-3.5 py-3 text-[11px] leading-relaxed text-[var(--brand)]">
          🔒 Somente produtores com <strong>score acima de 600</strong> podem solicitar aluguel da sua máquina. Você sempre aprova antes.
        </div>
      </Card>

      <div className="px-4 pt-1">
        <button
          onClick={() => go("home")}
          className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[var(--brand)] py-4 text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(43,106,24,0.3)] transition active:scale-[0.99]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Continuar <IconArrowRight size={14} />
        </button>
        <p className="mt-3 text-center text-[11px] text-[var(--ink-faint)]">Passo 2 de 4 · Próximo: insumos de interesse</p>
      </div>
    </div>
  );
}
