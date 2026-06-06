import { useState, useRef, useEffect } from "react";
import { IconArrowLeft } from "./icons";
import type { Screen } from "./types";
import { me } from "./data";

type Msg = {
  id: number;
  from: "me" | "lp";
  text: string;
  time: string;
  read: boolean;
};

const INITIAL_MSGS: Msg[] = [
  { id: 1,  from: "lp", text: "Olá Rodrigo! Tudo certo com a plantadeira? Ela chegou em boas condições?", time: "08:12", read: true },
  { id: 2,  from: "me", text: "Oi Lauro! Chegou perfeita. A equipe adorou, já está trabalhando na área sul desde ontem cedo.", time: "08:34", read: true },
  { id: 3,  from: "lp", text: "Que ótimo! Ela foi calibrada para 35 pés de plataforma, espaçamento 45 cm. Já verificaram as adubatrizes?", time: "08:36", read: true },
  { id: 4,  from: "me", text: "Sim, o operador conferiu ao chegar. Tudo certinho. Rendimento está em 18 t/ha de média — excelente!", time: "09:00", read: true },
  { id: 5,  from: "lp", text: "Ótimo rendimento! Lembra que o técnico da Jumil passa quinta-feira para a revisão programada. Basta liberar a máquina por 1h.", time: "09:03", read: true },
  { id: 6,  from: "me", text: "Anotado. Quinta já encerramos a área sul mesmo, não vai atrapalhar nada. Devemos concluir uns 90 ha essa semana.", time: "09:15", read: true },
  { id: 7,  from: "lp", text: "Perfeito. Quanto à devolução, dia 11/out ainda tá de pé? Já tenho outro produtor aguardando na sequência.", time: "14:22", read: true },
  { id: 8,  from: "me", text: "Sim, talvez até na manhã do dia 12 para dar tempo de lavar e conferir o maquinário. Fica bom assim?", time: "14:45", read: true },
  { id: 9,  from: "lp", text: "Combinado! Pode devolver até meio-dia do dia 12. Vou avisar meu gerente. Qualquer coisa me chama aqui.", time: "14:47", read: false },
];

const LP = { initials: "LP", name: "Lauro Pereira", city: "Lagoa Vermelha", score: 943 };

export function MachineChatScreen({ go }: { go: (s: Screen) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(INITIAL_MSGS.length + 1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function sendMsg() {
    const text = draft.trim();
    if (!text) return;
    setMsgs((prev) => [
      ...prev,
      { id: nextId.current++, from: "me", text, time: nowTime(), read: false },
    ]);
    setDraft("");
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[var(--brand)] px-4 pb-3 pt-[56px] text-white">
        <button
          onClick={() => go("vinculos")}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-white/15"
        >
          <IconArrowLeft size={16} />
        </button>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/25 text-[13px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {LP.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[14px] leading-tight">{LP.name}</div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/70">
            <span>{LP.city}</span>
            <span>·</span>
            <span>Score {LP.score}</span>
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold text-[var(--accent)]">
          Faixa A
        </div>
      </div>

      {/* Banner do aluguel */}
      <div className="flex items-center justify-center gap-1.5 border-b border-[var(--line)] bg-[var(--brand-pale)] py-2 text-[10px] text-[var(--brand)]">
        <span>🌾</span>
        <span className="font-semibold">Aluguel ativo</span>
        <span className="text-[var(--ink-faint)]">·</span>
        <span>Plantadeira Jumil 3180</span>
        <span className="text-[var(--ink-faint)]">·</span>
        <span className="font-semibold">devolução 11/out</span>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto px-3 py-3" style={{ background: "var(--surface-2,#F9F7F3)" }}>
        {msgs.map((msg) => {
          const isMe = msg.from === "me";
          return (
            <div key={msg.id} className={`mb-2.5 flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {/* avatar */}
              <div
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
                style={{ background: isMe ? "var(--brand)" : "#7C6F5A", fontFamily: "var(--font-display)" }}
              >
                {isMe ? me.initials : LP.initials}
              </div>
              {/* bubble */}
              <div
                className="max-w-[72%] rounded-[14px] px-3 py-2 shadow-sm"
                style={{
                  background: isMe ? "var(--brand)" : "white",
                  borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                }}
              >
                <p className="text-[12px] leading-snug" style={{ color: isMe ? "white" : "var(--ink)" }}>
                  {msg.text}
                </p>
                <div className={`mt-1 flex items-center gap-1 text-[9px] ${isMe ? "justify-end text-white/60" : "text-[var(--ink-faint)]"}`}>
                  <span>{msg.time}</span>
                  {isMe && <span>{msg.read ? "✓✓" : "✓"}</span>}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 border-t border-[var(--line)] bg-white px-3 py-2.5">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder="Escreva uma mensagem..."
          rows={1}
          className="flex-1 resize-none rounded-[12px] border border-[var(--line)] bg-[var(--surface-2,#F9F7F3)] px-3.5 py-2.5 text-[12px] text-[var(--ink)] outline-none focus:border-[var(--brand)]"
          style={{ maxHeight: "80px" }}
        />
        <button
          onClick={sendMsg}
          disabled={!draft.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-white shadow-sm transition active:scale-95 disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
