"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { STUDIO, INTEREST_OPTIONS, TIME_SLOTS } from "@/lib/content";
import Calendar from "./booking/Calendar";

const WEEKDAYS_LONG = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const MONTHS_LONG = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function formatDate(d: Date) {
  return `${WEEKDAYS_LONG[d.getDay()]}, ${d.getDate()} de ${MONTHS_LONG[d.getMonth()]}`;
}

export default function BookingForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-rise]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
      gsap.fromTo(
        sectionRef.current!.querySelector("[data-form]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const canSubmit = name.trim().length > 1 && phone.trim().length > 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const lines = [
      "Olá! Gostaria de marcar uma sessão.",
      `Nome: ${name.trim()}`,
      `WhatsApp: ${phone.trim()}`,
      date ? `Data desejada: ${formatDate(date)}` : null,
      time ? `Horário preferido: ${time}` : null,
      interest ? `Interesse: ${interest}` : null,
    ].filter(Boolean);
    const url = `${STUDIO.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="agendar"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="grid grid-cols-1 gap-14 sm:grid-cols-12 sm:gap-8">
        <div className="sm:col-span-5">
          <span data-rise className="label-mono">
            06 — Marque a sua sessão
          </span>
          <h2 data-rise className="font-display mt-6 text-[13vw] leading-[0.86] text-[var(--color-ink)] sm:text-[5vw]">
            TUDO COMEÇA
            <br />
            POR UMA <span className="text-[var(--color-blood)]">IDEIA.</span>
          </h2>
          <p data-rise className="mt-6 max-w-sm text-[var(--color-ink-dim)]">
            Escolha o dia e o horário que prefere e envie diretamente pelo
            WhatsApp. O Vanderson confirma consigo a marcação.
          </p>

          <div data-rise className="mt-10 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] font-display text-sm text-[var(--color-ink)]">
              I
            </span>
            <div className="text-sm text-[var(--color-ink-dim)]">
              <p>Atendimento só com marcação</p>
              <p>{STUDIO.city}, {STUDIO.country}</p>
            </div>
          </div>
        </div>

        <form
          data-form
          onSubmit={handleSubmit}
          className="border border-[var(--color-line)] bg-[var(--color-bg-raised)] p-6 sm:col-span-6 sm:col-start-7 sm:p-10"
        >
          <p className="font-display text-2xl text-[var(--color-ink)]">Solicitar sessão</p>
          <p className="mt-1 text-sm text-[var(--color-ink-faint)]">Leva menos de um minuto.</p>

          <label className="mt-8 block text-sm text-[var(--color-ink-dim)]">
            Nome completo
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="O seu nome"
              className="mt-2 w-full rounded-sm border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-blood)]"
            />
          </label>

          <label className="mt-5 block text-sm text-[var(--color-ink-dim)]">
            WhatsApp
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="912 345 678"
              className="mt-2 w-full rounded-sm border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-blood)]"
            />
          </label>

          <div className="mt-6">
            <p className="text-sm text-[var(--color-ink-dim)]">Data desejada</p>
            <div className="mt-2 border border-[var(--color-line)] p-4">
              <Calendar selected={date} onSelect={setDate} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <label className="text-sm text-[var(--color-ink-dim)]">
              Horário preferido
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-2 w-full rounded-sm border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-3 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-blood)]"
              >
                <option value="">Escolha o dia primeiro</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="text-sm text-[var(--color-ink-dim)]">
              Interesse (opcional)
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="mt-2 w-full rounded-sm border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-3 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-blood)]"
              >
                <option value="">Selecione</option>
                {INTEREST_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            data-cursor="magnetic"
            className="mt-8 w-full rounded-full bg-[var(--color-blood)] py-4 label-mono text-[var(--color-ink)] transition-opacity disabled:opacity-40"
          >
            Enviar pelo WhatsApp
          </button>
          <p className="mt-3 text-xs text-[var(--color-ink-faint)]">
            O horário é uma preferência. O Vanderson confirma consigo a disponibilidade real.
          </p>
        </form>
      </div>
    </section>
  );
}
