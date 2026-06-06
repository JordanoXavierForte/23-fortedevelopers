import { IconHome, IconTractor, IconCart, IconUser } from "./icons";
import type { Screen } from "./types";

const items: { id: Screen; label: string; Icon: typeof IconHome }[] = [
  { id: "home", label: "Início", Icon: IconHome },
  { id: "machines", label: "Máquinas", Icon: IconTractor },
  { id: "groupbuys", label: "Compras", Icon: IconCart },
  { id: "profile", label: "Perfil", Icon: IconUser },
];

export function BottomNav({
  current,
  onChange,
}: {
  current: Screen;
  onChange: (s: Screen) => void;
}) {
  return (
    <nav className="flex shrink-0 border-t border-[var(--line)] bg-white px-1 pb-4 pt-2">
      {items.map(({ id, label, Icon }) => {
        const active = current === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium transition"
            style={{ color: active ? "var(--brand)" : "var(--ink-faint)" }}
          >
            <Icon size={20} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
