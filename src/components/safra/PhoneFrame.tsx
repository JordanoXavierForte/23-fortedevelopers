import type { ReactNode } from "react";

export function PhoneFrame({ children, fullscreen = false }: { children: ReactNode; fullscreen?: boolean }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-[46px] border-2 border-[#DDD8D0] bg-[var(--surface-2)] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.09),0_32px_70px_rgba(0,0,0,0.18)]"
      style={
        fullscreen
          ? { height: "min(96vh, 1280px)", aspectRatio: "312 / 640" }
          : { height: 640, width: 312 }
      }
    >
      <div className="pointer-events-none absolute left-1/2 top-[11px] z-20 h-[20px] w-[82px] -translate-x-1/2 rounded-[20px] bg-[#1C1C18]" />
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-4 text-[11px] font-semibold text-[var(--ink)]">
          <span>9:41</span>
          <span className="text-[10px] text-[var(--ink-faint)]">Safra+</span>
        </div>
        {children}
      </div>
    </div>
  );
}
