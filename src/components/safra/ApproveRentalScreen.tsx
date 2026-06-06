import { useState } from "react";
import { IconArrowLeft, IconCheck } from "./icons";
import type { Screen } from "./types";
import { me } from "./data";

const JOSE = {
  initials: "JM",
  name: "José Melo",
  farm: "Fazenda Boa Esperança",
  city: "Carazinho, RS",
  score: 822,
  band: "B",
};

const TERMS = [
  "O locatário é responsável por combustível e lubrificantes durante o período de uso.",
  "Danos causados por mau uso são de responsabilidade do locatário.",
  "A máquina deve ser devolvida limpa e nas mesmas condições de recebimento.",
  "Defeitos mecânicos por desgaste normal são de responsabilidade do locador.",
];

export function ApproveRentalScreen({ go }: { go: (s: Screen) => void }) {
  const [checked, setChecked] = useState(TERMS.map(() => false));
  const [signed, setSigned] = useState(false);

  const allChecked = checked.every(Boolean);

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  }

  function handleSign() {
    if (!allChecked) return;
    setSigned(true);
    setTimeout(() => go("vinculos"), 2300);
  }

  return (
    <div className="flex-1 overflow-y-auto pb-8">
      {/* Header */}
      <div className="rounded-b-[28px] bg-[var(--brand)] px-5 pb-5 pt-[64px] text-white">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => go("vinculos")}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-white/15"
          >
            <IconArrowLeft size={16} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-wider text-white/60">Locação de máquina</div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[18px] leading-tight">
              Aprovar Locação
            </div>
          </div>
        </div>

        {/* Machine summary */}
        <div className="rounded-[14px] bg-white/12 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-white/20 text-[28px]">
              🚜
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] leading-snug">
                Colheitadeira John Deere S780
              </div>
              <div className="text-[11px] text-white/60">Ano 2021 · Sua máquina</div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/15 pt-3 text-[11px]">
            <span className="text-white/70">📅 15/out → 25/out/2026</span>
            <span className="font-bold text-[var(--accent)]">10 diárias</span>
          </div>
        </div>
      </div>

      {/* Requester */}
      <div className="mx-4 mt-4 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="mb-2.5 text-[10px] font-bold uppercase tracking-wide text-[var(--ink-faint)]">
          Solicitante
        </div>
        <div className="flex items-center gap-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-[14px] font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {JOSE.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[15px]">
              {JOSE.name}
            </div>
            <div className="text-[11px] text-[var(--ink-faint)]">
              {JOSE.farm} · {JOSE.city}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="rounded-full bg-[var(--brand-pale)] px-2.5 py-1 text-[11px] font-bold text-[var(--brand)]">
              ⭐ {JOSE.score}
            </div>
            <div className="mt-0.5 text-[9px] text-[var(--ink-faint)]">Faixa {JOSE.band}</div>
          </div>
        </div>
      </div>

      {/* Financial */}
      <div className="mx-4 mt-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-wide text-[var(--ink-faint)]">
          Resumo financeiro
        </div>
        <div className="space-y-2.5">
          <FinRow label="10 diárias × R$ 1.400" value="R$ 14.000" />
          <FinRow label="Depósito caução (20%)" value="R$ 2.800" note="Devolvido após inspeção da máquina" />
          <div className="border-t border-dashed border-[var(--line)] pt-2.5">
            <div className="flex items-baseline justify-between">
              <span style={{ fontFamily: "var(--font-display)" }} className="text-[14px] text-[var(--ink)]">
                Total a receber
              </span>
              <span style={{ fontFamily: "var(--font-display)" }} className="text-[20px] text-[var(--brand)]">
                R$ 14.000
              </span>
            </div>
            <div className="mt-0.5 text-[10px] text-[var(--ink-faint)]">
              Via PIX em até 2 dias úteis após a devolução
            </div>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="mx-4 mt-3 rounded-[16px] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-wide text-[var(--ink-faint)]">
          Termos do contrato — leia e aceite cada item
        </div>
        <div className="space-y-3.5">
          {TERMS.map((t, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-start gap-3"
              onClick={() => toggle(i)}
            >
              <div
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border-[1.5px] transition-colors"
                style={{
                  borderColor: checked[i] ? "var(--brand)" : "var(--line)",
                  background: checked[i] ? "var(--brand)" : "transparent",
                }}
              >
                {checked[i] && <IconCheck size={10} style={{ color: "white" }} />}
              </div>
              <span className="text-[12px] leading-snug text-[var(--ink-soft)]">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Digital signature */}
      {!signed && (
        <div className="mx-4 mt-3 rounded-[16px] border border-[var(--brand-pale)] bg-[var(--brand-pale)] p-4">
          <div className="mb-2.5 text-[10px] font-bold uppercase tracking-wide text-[var(--brand)]">
            Assinatura digital
          </div>
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-[13px] font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {me.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] text-[var(--ink)]">
                {me.name}
              </div>
              <div className="text-[11px] text-[var(--ink-faint)]">{me.farm} · CPF verificado ✓</div>
            </div>
            <div className="shrink-0 text-right text-[10px] text-[var(--ink-faint)]">
              <div>06/out/2026</div>
              <div>14:32</div>
            </div>
          </div>
        </div>
      )}

      {/* Actions / Success */}
      <div className="mx-4 mt-4">
        {signed ? (
          <div className="flex flex-col items-center gap-3 rounded-[20px] bg-[var(--brand-pale)] py-10 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--brand)] text-white shadow-lg">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-[20px] text-[var(--brand)]">
              Locação aprovada!
            </div>
            <div className="text-[13px] text-[var(--brand-dark)]">José Melo será notificado agora.</div>
          </div>
        ) : (
          <>
            {!allChecked && (
              <div className="mb-3 rounded-[10px] border border-[var(--accent)] bg-[#FEF3C7] px-3.5 py-2.5 text-[11px] text-[#92400E]">
                ⚠️ Aceite todos os termos do contrato para assinar.
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => go("vinculos")}
                className="flex-1 rounded-[12px] border-[1.5px] border-[var(--line)] py-3.5 text-[14px] font-semibold text-[var(--ink-faint)] transition active:scale-[0.98]"
              >
                Recusar
              </button>
              <button
                onClick={handleSign}
                disabled={!allChecked}
                className="flex-1 rounded-[12px] bg-[var(--brand)] py-3.5 text-[14px] font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40"
              >
                Aprovar e Assinar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FinRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-start justify-between text-[12px]">
      <div>
        <span className="text-[var(--ink-faint)]">{label}</span>
        {note && <div className="mt-0.5 text-[10px] text-[var(--ink-faint)]">{note}</div>}
      </div>
      <span className="font-semibold text-[var(--ink)]">{value}</span>
    </div>
  );
}
