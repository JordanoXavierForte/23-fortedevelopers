import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconHome = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M3 11 12 4l9 7" /><path d="M5 10v9h14v-9" /><path d="M10 19v-5h4v5" /></svg>
);
export const IconTractor = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><circle cx="7" cy="17" r="3" /><circle cx="18" cy="17" r="2" /><path d="M4 14V8h6l2 4h6l1 5" /><path d="M10 8V5h4" /></svg>
);
export const IconCart = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M3 4h2l2 12h11l2-8H7" /><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></svg>
);
export const IconUser = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>
);
export const IconArrowLeft = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M15 5l-7 7 7 7" /></svg>
);
export const IconArrowRight = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M9 5l7 7-7 7" /></svg>
);
export const IconBell = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
);
export const IconLeaf = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M4 20s2-9 9-13c4-2 7-2 7-2s0 3-2 7c-4 7-13 9-13 9Z" /><path d="M4 20c4-4 8-6 12-8" /></svg>
);
export const IconUsers = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3 3-5 6-5s6 2 6 5" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14c3 0 5 2 5 5" /></svg>
);
export const IconMapPin = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const IconClock = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconCheck = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M5 12l5 5 9-11" /></svg>
);
export const IconTrendDown = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M3 7l7 7 4-4 7 7" /><path d="M21 17h-5v-5" /></svg>
);
export const IconStar = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p} fill="currentColor" stroke="none"><path d="M12 3l2.6 5.6 6.1.6-4.6 4.2 1.3 6L12 16.7 6.6 19.4l1.3-6L3.3 9.2l6.1-.6L12 3Z" /></svg>
);
export const IconLogo = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M4 20c0-7 5-12 12-12-1 7-5 12-12 12Z" /><path d="M12 12c2-4 5-6 8-6" /></svg>
);
export const IconExpand = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M4 10V4h6" /><path d="M20 14v6h-6" /><path d="M4 4l7 7" /><path d="M20 20l-7-7" /></svg>
);
export const IconCollapse = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M10 4v6H4" /><path d="M14 20v-6h6" /><path d="M10 10L3 3" /><path d="M14 14l7 7" /></svg>
);

