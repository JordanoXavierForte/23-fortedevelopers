import { useState, useRef } from "react";
import { IconBell, IconLeaf, IconAlert, IconSparkle } from "./icons";
import type { Screen } from "./types";
import { vinculos, vinculosHistory, matches } from "./data";
import type { Vinculo } from "./data";

const TABS = [
  { id: "all", label: "Tudo", count: 6 },
  { id: "buy", label: "🛒 Compras", count: 3 },
  { id: "machine", label: "🚜 Máquinas", count: 2 },
  { id: "freight", label: "🚚 Frete", count: 1 },
] as const;

const tone = {
  active: { border: "var(--brand)", badge: "var(--brand-pale)", badgeText: "var(--brand)" },
  warn: { border: "var(--accent)", badge: "#FEF3C7", badgeText: "#92400E" },
  alert: { border: "var(--danger)", badge: "#FADBD8", badgeText: "var(--danger)" },
  info: { border: "#2E6F9E", badge: "#D6EAF8", badgeText: "#2E6F9E" },
  done: { border: "var(--line)", badge: "var(--line)", badgeText: "var(--ink-faint)" },
};

const btnVariant = {
  primary: "bg-[var(--brand)] text-white",
  outline: "border-[1.5px] border-[var(--brand)] text-[var(--brand)]",
  ghost: "border-[1.5px] border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink-faint)]",
};

function LinkCard({ v }: { v: Vinculo }) {
  const t = tone[v.status];
  const iconBg = v.iconTone === "earth" ? "#F0D9B5" : v.iconTone === "blue" ? "#D6EAF8" : "var(--brand-pale)";
  return (
    <div className="mb-2.5 rounded-[16px] border border-[var(--line)] bg-white p-3.5 shadow-sm" style={{ borderLeft: `4px solid ${t.border}`, opacity: v.status === "done" ? 0.88 : 1 }}>
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] text-[22px]" style={{ background: iconBg }}>{v.icon}</span>
        <div className="min-w-0 flex-1">
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[13px] font-semibold leading-tight">{v.title}</div>
          <div className="mt-1 text-[11px] text-[var(--ink-faint)]">{v.sub}</div>
        </div>
        <span className="shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.5px]" style={{ background: t.badge, color: t.badgeText }}>{v.badge}</span>
      </div>

      {v.meta && (
        <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1.5 border-t border-dashed border-[var(--line)] pt-2.5 text-[11px] text-[var(--ink-faint)]">
          {v.meta.map((m, i) => (
            <span key={i}>{m.label} <strong className="text-[var(--ink)]">{m.strong}</strong></span>
          ))}
        </div>
      )}

      {v.progress && (
        <div className="mt-2.5">
          <div className="mb-1 flex justify-between text-[11px] text-[var(--ink-faint)]">
            <span dangerouslySetInnerHTML={{ __html: bold(v.progress.current) }} />
            <span dangerouslySetInnerHTML={{ __html: bold(v.progress.goal) }} />
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)]" style={{ width: `${v.progress.pct}%` }} />
          </div>
        </div>
      )}

      {v.actions && (
        <div className="mt-3 flex gap-2">
          {v.actions.map((a) => (
            <button key={a.label} className={`flex-1 rounded-[10px] px-3 py-2.5 text-[12px] font-semibold transition active:scale-[0.98] ${btnVariant[a.variant]}`}>{a.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function bold(s: string) {
  // make leading number bold (e.g. "74 ton reservadas")
  return s.replace(/^(\S+\s\S+)/, "<strong style='color:var(--ink)'>$1</strong>");
}

export function VinculosScreen({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState<string>("all");
  const visible = tab === "all" ? vinculos : vinculos.filter((v) => v.kind === tab);
  const actionNeeded = visible.filter((v) => v.status === "warn" || v.status === "alert");
  const inProgress = visible.filter((v) => v.status === "active" || v.status === "info");
  const topMatch = matches[0];

  const tabsRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  function onPointerDown(e: React.PointerEvent) {
    const el = tabsRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    tabsRef.current!.scrollLeft = drag.current.scrollLeft - dx;
  }

  function onPointerUp(e: React.PointerEvent) {
    drag.current.active = false;
    tabsRef.current?.releasePointerCapture(e.pointerId);
  }

  function onTabClick(id: string) {
    if (!drag.current.moved) setTab(id);
  }

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {/* Header */}
      <div className="rounded-b-[28px] bg-[var(--brand)] px-5 pb-6 pt-12 text-white">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-[11px] bg-white/15"><IconLeaf size={18} /></div>
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[20px]">Safra<span className="text-[var(--accent)]">+</span></span>
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-[10px] bg-white/15">
            <IconBell size={16} />
            <span className="absolute right-[8px] top-[7px] h-[7px] w-[7px] rounded-full border-2 border-[var(--brand)] bg-[var(--accent)]" />
          </button>
        </div>
        <div style={{ fontFamily: "var(--font-display)" }} className="text-[22px]">Meus Vínculos</div>
        <div className="mb-4 text-[12px] text-white/70">Acompanhe seus negócios em andamento</div>
        <div className="flex gap-2">
          {[{ n: 4, l: "Ativos" }, { n: 2, l: "Pendentes" }, { n: 12, l: "Concluídos" }].map((s) => (
            <div key={s.l} className="flex-1 rounded-[12px] bg-white/12 px-3 py-2.5 text-center">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[20px] leading-none">{s.n}</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.5px] text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div
        ref={tabsRef}
        className="flex gap-2 overflow-x-auto px-4 pt-4 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTabClick(t.id)}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] px-3.5 py-2 text-[12px] font-medium transition"
              style={{
                background: active ? "var(--brand)" : "white",
                borderColor: active ? "var(--brand)" : "var(--line)",
                color: active ? "white" : "var(--ink-faint)",
              }}
            >
              {t.label}
              <span className="rounded-full px-1.5 text-[11px] font-bold" style={{ background: active ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.06)" }}>{t.count}</span>
            </button>
          );
        })}
      </div>

      {/* Ação necessária */}
      {actionNeeded.length > 0 && (
        <div className="px-4 pt-4">
          <div className="mb-2.5 flex items-center justify-between">
            <span style={{ fontFamily: "var(--font-display)" }} className="inline-flex items-center gap-1.5 text-[14px]">
              <span style={{ color: "var(--accent)" }}><IconAlert size={14} /></span> Ação necessária
            </span>
            <span className="text-[11px] text-[var(--ink-faint)]">{actionNeeded.length} itens</span>
          </div>
          {actionNeeded.map((v) => <LinkCard key={v.id} v={v} />)}
        </div>
      )}

      {/* Em andamento */}
      {inProgress.length > 0 && (
        <div className="px-4 pt-3">
          <div className="mb-2.5 flex items-center justify-between">
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px]">🟢 Em andamento</span>
            <span className="text-[11px] text-[var(--ink-faint)]">{inProgress.length} vínculos</span>
          </div>
          {inProgress.map((v) => <LinkCard key={v.id} v={v} />)}
        </div>
      )}

      {/* Sugestão */}
      <div className="px-4 pt-3">
        <div className="mb-2.5 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)" }} className="inline-flex items-center gap-1.5 text-[14px]">
            <span style={{ color: "var(--accent)" }}><IconSparkle size={14} /></span> Sugestões para você
          </span>
          <span className="text-[11px] text-[var(--ink-faint)]">baseado no seu perfil</span>
        </div>
        <div className="rounded-[16px] bg-gradient-to-br from-[var(--brand)] to-[var(--brand-dark)] p-4 text-white">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1px] text-white/80">🤝 Match de alta compatibilidade</div>
          <div className="mb-2.5 flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/25 text-[13px] font-bold">{topMatch.initials}</div>
            <div className="min-w-0 flex-1">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[13px] font-semibold">{topMatch.name} · {topMatch.city}</div>
              <div className="truncate text-[11px] text-white/80">{topMatch.reason}</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[16px] text-[var(--accent)]">{topMatch.pct}%</div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 rounded-[10px] border border-white/30 bg-white/15 py-2.5 text-[12px] font-semibold">Ignorar</button>
            <button onClick={() => go("profile")} className="flex-1 rounded-[10px] bg-white py-2.5 text-[12px] font-semibold text-[var(--brand)]">Iniciar vínculo</button>
          </div>
        </div>
      </div>

      {/* Histórico */}
      <div className="px-4 pt-3">
        <div className="mb-2.5 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px]">📋 Histórico recente</span>
          <span className="text-[11px] text-[var(--ink-faint)]">Ver todos</span>
        </div>
        {vinculosHistory.map((v) => <LinkCard key={v.id} v={v} />)}
      </div>
    </div>
  );
}
