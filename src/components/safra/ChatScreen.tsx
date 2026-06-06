import { useState, useRef, useEffect } from "react";
import { IconArrowLeft, IconCheck, IconShield } from "./icons";
import type { Screen } from "./types";
import { me, matches } from "./data";

const CONTACT = matches[0]; // José Melo

type Msg = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
  status?: "sent" | "read";
};

const INITIAL_MSGS: Msg[] = [
  {
    id: 1,
    from: "them",
    text: "Olá Rodrigo! Vi sua colheitadeira John Deere S780 disponível na Safra+. Ainda está disponível para aluguel em outubro?",
    time: "10:02",
  },
  {
    id: 2,
    from: "me",
    text: "Oi José! Sim, está disponível de outubro a fevereiro. Quando você precisaria exatamente?",
    time: "10:08",
    status: "read",
  },
  {
    id: 3,
    from: "them",
    text: "Perfeito! Estaria precisando por 5 dias em meados de outubro, por volta do dia 15. É viável?",
    time: "10:11",
  },
  {
    id: 4,
    from: "me",
    text: "Ótimo! O valor é R$ 1.400/dia, então seriam R$ 7.000 pelos 5 dias. Como é nosso primeiro vínculo, posso oferecer 10% de desconto: R$ 6.300 no total.",
    time: "10:15",
    status: "read",
  },
  {
    id: 5,
    from: "them",
    text: "Excelente proposta! Meu score na Safra+ é 822, pode verificar. Tenho histórico de vínculos concluídos sem nenhum problema.",
    time: "10:18",
  },
  {
    id: 6,
    from: "me",
    text: "Vi sim, temos 94% de compatibilidade. Vou confirmar a disponibilidade exata e te retorno ainda hoje. 👍",
    time: "10:21",
    status: "read",
  },
  {
    id: 7,
    from: "them",
    text: "Combinado! Agradeço a atenção, Rodrigo. Qualquer dúvida pode chamar aqui mesmo pelo chat.",
    time: "10:23",
  },
];

export function ChatScreen({ go }: { go: (s: Screen) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  let nextId = useRef(INITIAL_MSGS.length + 1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMsgs((prev) => [...prev, { id: nextId.current++, from: "me", text, time, status: "sent" }]);
    setDraft("");
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[var(--brand)] px-4 pb-3.5 pt-[64px] text-white">
        <button
          onClick={() => go("vinculos")}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-white/15"
        >
          <IconArrowLeft size={16} />
        </button>

        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white/30 bg-white/20 text-[14px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {CONTACT.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div style={{ fontFamily: "var(--font-display)" }} className="text-[15px] font-semibold leading-tight">
            {CONTACT.name}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/70">
            <IconShield size={9} />
            Score {CONTACT.score} · {CONTACT.city} · {CONTACT.distKm} km
          </div>
        </div>

        <div className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold text-[var(--accent)]">
          {CONTACT.pct}% match
        </div>
      </div>

      {/* Vínculo info banner */}
      <div className="flex items-center justify-center gap-1.5 border-b border-[var(--line)] bg-[var(--brand-pale)] py-2 text-[10px] text-[var(--brand)]">
        <IconCheck size={10} />
        Vínculo iniciado · Colheitadeira John Deere S780 · 5 dias
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto px-3 py-3" style={{ background: "var(--surface-2,#F9F7F3)" }}>
        {/* Data */}
        <div className="mb-4 text-center text-[10px] text-[var(--ink-faint)]">Hoje · 06 jun 2026</div>

        {msgs.map((msg) => {
          const isMe = msg.from === "me";
          return (
            <div key={msg.id} className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}>
              {!isMe && (
                <div className="mr-2 mt-auto grid h-7 w-7 shrink-0 place-items-center self-end rounded-full bg-[var(--brand)] text-[10px] font-bold text-white">
                  {CONTACT.initials}
                </div>
              )}
              <div
                className="max-w-[72%] rounded-[14px] px-3.5 py-2.5 text-[12px] leading-[1.55] shadow-sm"
                style={{
                  background: isMe ? "var(--brand)" : "white",
                  color: isMe ? "white" : "var(--ink)",
                  borderBottomRightRadius: isMe ? 4 : 14,
                  borderBottomLeftRadius: isMe ? 14 : 4,
                }}
              >
                {msg.text}
                <div
                  className="mt-1 flex items-center justify-end gap-1 text-[9px]"
                  style={{ color: isMe ? "rgba(255,255,255,0.65)" : "var(--ink-faint)" }}
                >
                  {msg.time}
                  {isMe && msg.status === "read" && (
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>✓✓</span>
                  )}
                  {isMe && msg.status === "sent" && (
                    <span style={{ color: "rgba(255,255,255,0.55)" }}>✓</span>
                  )}
                </div>
              </div>
              {isMe && (
                <div className="ml-2 mt-auto grid h-7 w-7 shrink-0 place-items-center self-end rounded-full bg-[var(--brand-pale)] text-[10px] font-bold text-[var(--brand)]">
                  {me.initials}
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 border-t border-[var(--line)] bg-white px-3 py-2.5">
        <textarea
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder="Mensagem..."
          className="flex-1 resize-none rounded-[20px] border border-[var(--line)] bg-[var(--surface-2,#F9F7F3)] px-3.5 py-2 text-[12px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
          style={{ maxHeight: 80 }}
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition active:scale-95"
          style={{
            background: draft.trim() ? "var(--brand)" : "var(--line)",
            color: draft.trim() ? "white" : "var(--ink-faint)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
