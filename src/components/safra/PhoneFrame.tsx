import type { ReactNode } from "react";

export function PhoneFrame({ children, fullscreen = false }: { children: ReactNode; fullscreen?: boolean }) {
  const h = fullscreen ? "min(92vh, 920px)" : "700px";
  const w = fullscreen ? "min(42.5vh, 425px)" : "324px";

  return (
    /* wrapper — contém a moldura + botões laterais */
    <div className="relative shrink-0" style={{ height: h, width: w }}>

      {/* botões laterais físicos — fora da moldura para não serem cortados */}
      <span className="pointer-events-none absolute -left-[3px] top-[110px] z-10 h-[32px] w-[3px] rounded-l bg-[#1a1a1a]" />
      <span className="pointer-events-none absolute -left-[3px] top-[166px] z-10 h-[58px] w-[3px] rounded-l bg-[#1a1a1a]" />
      <span className="pointer-events-none absolute -left-[3px] top-[238px] z-10 h-[58px] w-[3px] rounded-l bg-[#1a1a1a]" />
      <span className="pointer-events-none absolute -right-[3px] top-[175px] z-10 h-[100px] w-[3px] rounded-r bg-[#1a1a1a]" />

      {/* moldura preta — overflow-hidden garante que nada vaza pelos cantos arredondados */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[56px] bg-[#1a1a1a] p-3"
        style={{
          boxShadow: [
            "0 50px 100px -20px rgba(0,0,0,0.35)",
            "0 30px 60px -30px rgba(0,0,0,0.3)",
            "inset 0 0 0 2px #2a2a2a",
            "inset 0 0 0 6px #0a0a0a",
          ].join(", "),
        }}
      >
        {/* tela */}
        <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-[var(--bg)]">

          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-[14px] z-40 h-[34px] w-[118px] -translate-x-1/2 rounded-full bg-black" />

          {/* status bar — time left of island, icons right of island */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[56px] items-center bg-[var(--brand)] text-[14px] font-semibold text-white">
            {/* time — left side, before island */}
            <span className="pl-8">9:41</span>
            {/* spacer that pushes icons to the right of the island */}
            <div className="flex-1" />
            {/* icons — right side, after island */}
            <span className="flex items-center gap-1.5 pr-8">
              {/* wifi */}
              <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 2.2c2.6 0 5 1 6.8 2.7l-1.4 1.5A7.6 7.6 0 0 0 8 4.3 7.6 7.6 0 0 0 2.6 6.4L1.2 4.9A9.6 9.6 0 0 1 8 2.2Z" />
                <path d="M8 6c1.4 0 2.7.5 3.6 1.5l-1.4 1.4A3.1 3.1 0 0 0 8 8a3.1 3.1 0 0 0-2.2.9L4.4 7.5A5.1 5.1 0 0 1 8 6Z" />
                <circle cx="8" cy="10.4" r="1.4" />
              </svg>
              {/* bateria */}
              <span className="relative ml-0.5 inline-flex h-[11px] w-[24px] items-center rounded-[3px] border border-white p-[1.5px]">
                <span className="h-full w-[72%] rounded-[1px] bg-white" />
                <span className="absolute -right-[3px] top-1/2 h-[5px] w-[2px] -translate-y-1/2 rounded-r-sm bg-white" />
              </span>
            </span>
          </div>

          {/* conteúdo */}
          <div className="flex h-full flex-col">{children}</div>

          {/* home indicator */}
          <div className="pointer-events-none absolute bottom-[8px] left-1/2 z-40 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black/25" />
        </div>
      </div>
    </div>
  );
}
