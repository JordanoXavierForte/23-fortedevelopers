import { useState } from "react";
import { IconArrowLeft, IconUsers, IconStar, IconArrowRight } from "./icons";
import { fmtBRL, groupBuys } from "./data";
import type { Screen } from "./types";

export function GroupBuyDetailScreen({ go }: { go: (s: Screen) => void }) {
  const g = groupBuys[0];
  const [qty, setQty] = useState<string>("");
  const pct = Math.round((g.current / g.goal) * 100);
  const perUnitSaving = g.marketPrice - g.unitPrice;
  const saving = Math.round((perUnitSaving / g.marketPrice) * 100);
  const remaining = g.goal - g.current;
  const n = parseFloat(qty);
  const mySaving = n > 0 ? n * perUnitSaving : 0;
  const othersCount = g.participants - g.members.length;
  const othersQty = g.current - g.members.reduce((s, m) => s + m.qty, 0);

  const avTones = ["", "earth", "amber"];

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {/* Header */}
      <div className="relative rounded-b-[28px] bg-[var(--brand)] px-5 pb-6 pt-3 text-white">
        <button onClick={() => go("groupbuys")} className="mb-2 grid h-8 w-8 place-items-center rounded-[9px] bg-white/15">
          <IconArrowLeft />
        </button>
        <div className="text-[10px] font-bold uppercase tracking-[1px] text-white/60">Compra coletiva · Aberta</div>
        <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-1 text-[22px] leading-tight">
          {g.product}<br />{g.goal} {g.unit === "tonelada" ? "toneladas" : g.unitShort}
        </h2>
        <div className="mt-1.5 text-[12px] text-white/70">Organizado por {g.organizer} · {g.organizerCity}</div>
      </div>

      {/* Progresso */}
      <div className="-mt-4 px-4">
        <div className="rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
          <div className="flex items-end justify-between">
            <div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[32px] leading-none text-[var(--brand)]">
                {g.current} <span className="text-[15px] text-[var(--ink-faint)]">{g.unitShort}</span>
              </div>
              <div className="mt-1 text-[11px] text-[var(--ink-faint)]">confirmadas até agora</div>
            </div>
            <div className="text-right text-[12px] text-[var(--ink-faint)]">
              <strong style={{ fontFamily: "var(--font-display)" }} className="block text-[17px] text-[var(--ink)]">{g.goal} {g.unitShort}</strong>
              meta do grupo
            </div>
          </div>
          <div className="my-2.5 h-3 overflow-hidden rounded-full bg-[var(--line)]">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)]" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[12px] font-semibold text-[var(--brand)]">{pct}% da meta · faltam {remaining} {g.unitShort} para fechar</div>
        </div>
      </div>

      {/* Economia */}
      <div className="mt-3 flex items-center gap-3.5 rounded-[12px] bg-[var(--brand-pale)] px-4 py-3.5 mx-4">
        <span className="text-[30px]">💰</span>
        <div>
          <div className="text-[11px] text-[var(--brand)]">Desconto estimado ao fechar</div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[20px] text-[var(--brand)]">{saving}% abaixo do mercado</div>
          <div className="mt-0.5 text-[11px] text-[var(--brand-dark)]">
            Individual: {fmtBRL(g.marketPrice)}/{g.unitShort.replace("s", "")} · Grupo: {fmtBRL(g.unitPrice)}/{g.unitShort.replace("s", "")}
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 px-4">
        {[
          { l: "Encerra em", v: g.deadline.replace("Encerra em ", ""), tone: "amber" },
          { l: "Participantes", v: `${g.participants} produtores`, tone: "" },
          { l: "Distribuidor", v: g.brand, tone: "" },
          { l: "Entrega", v: g.delivery, tone: "green" },
        ].map((c) => (
          <div key={c.l} className="rounded-[12px] border border-[var(--line)] bg-white p-3.5 shadow-sm">
            <div className="mb-1 text-[11px] text-[var(--ink-faint)]">{c.l}</div>
            <div
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[14px] font-semibold"
              data-tone={c.tone}
            >
              <span style={{ color: c.tone === "green" ? "var(--brand)" : c.tone === "amber" ? "var(--accent)" : "var(--ink)" }}>{c.v}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Participantes */}
      <div className="mx-4 mt-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div style={{ fontFamily: "var(--font-display)" }} className="mb-3.5 text-[14px]">👥 Quem está no grupo</div>
        {g.members.map((m, i) => (
          <div key={m.initials} className="flex items-center gap-3 border-b border-[var(--line)] py-2.5 last:border-0 last:pb-0">
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-bold text-white"
              style={{ background: avTones[i] === "earth" ? "var(--earth,#B7894A)" : avTones[i] === "amber" ? "var(--accent)" : "var(--brand)" }}
            >
              {m.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{m.name}{m.organizer && <span className="text-[var(--ink-faint)]"> · organizador</span>}</div>
              <div className="text-[11px] text-[var(--ink-faint)]">{m.city} · {m.crops}</div>
              <span className="mt-1 inline-flex items-center gap-0.5 rounded-full bg-[var(--brand-pale)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
                <IconStar size={9} style={{ color: "var(--accent)" }} /> {m.score}
              </span>
            </div>
            <div className="text-right">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] text-[var(--brand)]">{m.qty} {g.unitShort}</div>
              <div className="text-[10px] text-[var(--ink-faint)]">confirmadas</div>
            </div>
          </div>
        ))}
        {othersCount > 0 && (
          <div className="flex items-center gap-3 pt-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--line)] text-[12px] font-bold text-[var(--ink-soft)]">+{othersCount}</div>
            <div className="flex-1">
              <div className="text-[13px] font-medium">{othersCount} outros produtores</div>
              <div className="text-[11px] text-[var(--ink-faint)]">Total: {othersQty} {g.unitShort} confirmadas</div>
            </div>
            <span className="text-[11px] text-[var(--ink-faint)]">ver todos</span>
          </div>
        )}
      </div>

      {/* Entrar no grupo */}
      <div className="mx-4 mt-3 rounded-[16px] border-[1.5px] border-[var(--brand-pale)] bg-white p-4 shadow-sm">
        <div style={{ fontFamily: "var(--font-display)" }} className="mb-3.5 text-[15px] inline-flex items-center gap-1.5">
          <IconUsers size={16} style={{ color: "var(--brand)" }} /> Entrar neste grupo
        </div>
        <div className="mb-3.5">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-faint)]">Quanto você precisa?</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder={`Ex: 8 ${g.unitShort}`}
            className="w-full rounded-[10px] border-[1.5px] border-[var(--line)] bg-white px-3.5 py-3 text-[14px] outline-none focus:border-[var(--brand)]"
          />
        </div>
        <div className="mb-3.5">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-faint)]">Local de entrega</label>
          <select className="w-full rounded-[10px] border-[1.5px] border-[var(--line)] bg-white px-3.5 py-3 text-[14px] outline-none focus:border-[var(--brand)]">
            <option>Na minha fazenda</option>
            <option>Ponto de coleta da cooperativa</option>
            <option>A combinar</option>
          </select>
        </div>
        <div className="mb-3.5 rounded-[10px] bg-[var(--brand-pale)] px-3.5 py-3 text-center">
          <div className="text-[11px] text-[var(--brand)]">Sua economia estimada</div>
          <div style={{ fontFamily: "var(--font-display)" }} className="mt-0.5 text-[22px] text-[var(--brand)]">
            {mySaving > 0 ? `${fmtBRL(mySaving)} nesta compra` : "Informe a quantidade"}
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--brand)] py-3.5 text-[15px] font-semibold text-white transition active:scale-[0.99]" style={{ fontFamily: "var(--font-display)" }}>
          Confirmar participação <IconArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
