import { useEffect, useState } from "react";

type Step = { label: string; detail: string };

const MACHINE_STEPS: Step[] = [
  { label: "Calculando distâncias",    detail: "Haversine · raio 150 km" },
  { label: "Avaliando compatibilidade", detail: "Cultura × tipo de máquina" },
  { label: "Aplicando KNN",            detail: "12 features · pesos ponderados" },
  { label: "Ordenando por score",      detail: "Confiança do proprietário" },
];

const GROUP_STEPS: Step[] = [
  { label: "Analisando seu perfil",    detail: "Culturas · área · interesses" },
  { label: "Calculando distâncias",    detail: "Haversine · raio 200 km" },
  { label: "Estimando volume",         detail: "Fator Embrapa por cultura/ha" },
  { label: "Gerando ranking de fit",   detail: "Score · volume · proximidade" },
];

export function AlgoLoader({
  variant,
  onDone,
}: {
  variant: "machines" | "groups";
  onDone: () => void;
}) {
  const steps = variant === "machines" ? MACHINE_STEPS : GROUP_STEPS;
  const [current, setCurrent] = useState(0);
  const STEP_MS = 370;

  useEffect(() => {
    if (current < steps.length) {
      const t = setTimeout(() => setCurrent((c) => c + 1), STEP_MS);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onDone, 180);
      return () => clearTimeout(t);
    }
  }, [current]);

  const title =
    variant === "machines"
      ? "Buscando máquinas para você"
      : "Calculando compras compatíveis";

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      {/* Ícone pulsante */}
      <div className="relative mb-6 grid h-16 w-16 place-items-center rounded-[20px] bg-[var(--brand)]">
        <span className="text-[28px]">{variant === "machines" ? "🚜" : "🛒"}</span>
        <span className="absolute inset-0 animate-ping rounded-[20px] bg-[var(--brand)] opacity-20" />
      </div>

      <div
        style={{ fontFamily: "var(--font-display)" }}
        className="mb-1 text-center text-[17px] text-[var(--ink)]"
      >
        {title}
      </div>
      <div className="mb-6 text-center text-[11px] text-[var(--ink-faint)]">
        Algoritmo de match · KNN + Haversine
      </div>

      {/* Steps */}
      <div className="w-full space-y-2.5">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-[12px] border px-3.5 py-2.5 transition-all duration-300"
              style={{
                borderColor: done
                  ? "var(--brand)"
                  : active
                  ? "var(--brand)"
                  : "var(--line)",
                background: done
                  ? "var(--brand-pale)"
                  : active
                  ? "var(--brand-pale)"
                  : "white",
                opacity: i > current ? 0.4 : 1,
              }}
            >
              {/* Indicador */}
              <div
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-all"
                style={{
                  background: done ? "var(--brand)" : active ? "var(--brand)" : "var(--line)",
                  color: done || active ? "white" : "var(--ink-faint)",
                }}
              >
                {done ? "✓" : active ? <Spinner /> : i + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className="text-[12px] font-semibold leading-none"
                  style={{ color: done || active ? "var(--brand)" : "var(--ink-faint)" }}
                >
                  {s.label}
                </div>
                <div className="mt-0.5 text-[9px] text-[var(--ink-faint)]">{s.detail}</div>
              </div>

              {done && (
                <span className="rounded-full bg-[var(--brand)] px-2 py-0.5 text-[9px] font-bold text-white">
                  OK
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Barra de progresso */}
      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] transition-all duration-300"
          style={{ width: `${(current / steps.length) * 100}%` }}
        />
      </div>
      <div className="mt-1.5 text-[10px] text-[var(--ink-faint)]">
        {current} de {steps.length} etapas concluídas
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" />
    </svg>
  );
}
