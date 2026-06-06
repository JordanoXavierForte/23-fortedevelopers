import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/safra/PhoneFrame";
import { BottomNav } from "@/components/safra/BottomNav";
import { CadastroScreen } from "@/components/safra/CadastroScreen";
import { HomeScreen } from "@/components/safra/HomeScreen";
import { MachinesScreen } from "@/components/safra/MachinesScreen";
import { MachineDetailScreen } from "@/components/safra/MachineDetailScreen";
import { GroupBuysScreen } from "@/components/safra/GroupBuysScreen";
import { GroupBuyDetailScreen } from "@/components/safra/GroupBuyDetailScreen";
import { VinculosScreen } from "@/components/safra/VinculosScreen";
import { ProfileScreen } from "@/components/safra/ProfileScreen";
import { IconLeaf, IconExpand, IconCollapse } from "@/components/safra/icons";
import type { Screen } from "@/components/safra/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Safra+ — Menos custos, mais colheita" },
      { name: "description", content: "Aluguel compartilhado de máquinas e compras conjuntas para o agronegócio." },
    ],
  }),
  component: Index,
});

const features = [
  { title: "Aluguel compartilhado de máquinas", desc: "Trator, colheitadeira ou pulverizador por dia — sem precisar comprar." },
  { title: "Compras conjuntas de insumos", desc: "Junte-se a outros produtores e pague preço de atacado." },
  { title: "Economia transparente", desc: "Veja exatamente quanto está economizando vs. o mercado." },
];

const screenLabels: Record<Screen, string> = {
  cadastro: "Cadastro",
  home: "Início",
  machines: "Máquinas",
  machineDetail: "Máquinas",
  groupbuys: "Compras",
  groupbuyDetail: "Compras",
  vinculos: "Vínculos",
  profile: "Perfil",
};

function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedMachineId, setSelectedMachineId] = useState<string>("m1");
  const [selectedGroupBuyId, setSelectedGroupBuyId] = useState<string>("g1");
  const [fullscreen, setFullscreen] = useState(false);

  function goMachineDetail(id: string) {
    setSelectedMachineId(id);
    setScreen("machineDetail");
  }

  function goGroupBuyDetail(id: string) {
    setSelectedGroupBuyId(id);
    setScreen("groupbuyDetail");
  }
  const navScreens: Screen[] = ["cadastro", "home", "groupbuys", "vinculos", "profile"];
  const navHighlight: Screen =
    screen === "machineDetail" ? "machines" :
    screen === "groupbuyDetail" ? "groupbuys" :
    screen;

  return (
    <div className={`min-h-screen w-full bg-[var(--bg)] ${fullscreen ? "py-3" : "py-8"}`}>
      <div
        className={
          fullscreen
            ? "mx-auto flex w-full max-w-[1400px] items-center justify-center px-6"
            : "mx-auto flex w-full max-w-[1180px] flex-col items-center gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0"
        }
      >
        {/* Left panel */}
        {!fullscreen && (
          <div className="max-w-[460px] lg:flex-1 lg:pr-16">
            <div className="mb-7 flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--brand)] text-white">
                <IconLeaf size={20} />
              </div>
              <span style={{ fontFamily: "var(--font-display)" }} className="text-[24px] text-[var(--ink)]">
                Safra<span className="text-[var(--brand)]">+</span>
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-[38px] leading-[1.15] text-[var(--ink)]">
              Menos custos,<br />
              <em className="not-italic text-[var(--brand)]">mais colheita.</em>
            </h1>
            <p className="mt-4 max-w-[340px] text-[14px] leading-[1.7] text-[var(--ink-soft)]">
              Plataforma que conecta produtores rurais para compartilhar máquinas e comprar insumos em conjunto, reduzindo custos da cadeia produtiva.
            </p>

            <ul className="mt-8 space-y-3.5">
              {features.map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                  <div>
                    <div className="text-[13px] font-semibold text-[var(--ink)]">{f.title}</div>
                    <div className="text-[12px] text-[var(--ink-soft)]">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-2">
              {navScreens.map((s) => (
                <button
                  key={s}
                  onClick={() => setScreen(s)}
                  className="rounded-full px-3 py-1.5 text-[11px] font-semibold transition"
                  style={{
                    background: navHighlight === s ? "var(--brand)" : "transparent",
                    color: navHighlight === s ? "white" : "var(--ink-soft)",
                    border: navHighlight === s ? "1px solid var(--brand)" : "1px solid var(--line)",
                  }}
                >
                  {screenLabels[s]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phone */}
        <div className="relative flex flex-col items-center gap-4">
          <button
            onClick={() => setFullscreen((v) => !v)}
            className="absolute -right-2 -top-2 z-30 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--ink-soft)] shadow-sm transition hover:text-[var(--brand)]"
            aria-label={fullscreen ? "Sair do modo cheio" : "Modo cheio"}
          >
            {fullscreen ? <IconCollapse /> : <IconExpand />}
            {fullscreen ? "Reduzir" : "Tela cheia"}
          </button>
          <PhoneFrame fullscreen={fullscreen}>
            {screen === "cadastro" && <CadastroScreen go={setScreen} />}
            {screen === "home" && <HomeScreen go={setScreen} />}
            {screen === "machines" && <MachinesScreen go={setScreen} onSelectMachine={goMachineDetail} />}
            {screen === "machineDetail" && <MachineDetailScreen go={setScreen} machineId={selectedMachineId} />}
            {screen === "groupbuys" && <GroupBuysScreen go={setScreen} onSelectGroupBuy={goGroupBuyDetail} />}
            {screen === "groupbuyDetail" && <GroupBuyDetailScreen go={setScreen} groupBuyId={selectedGroupBuyId} />}
            {screen === "vinculos" && <VinculosScreen go={setScreen} />}
            {screen === "profile" && <ProfileScreen go={setScreen} />}
            {screen !== "cadastro" && <BottomNav current={navHighlight} onChange={setScreen} />}
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

