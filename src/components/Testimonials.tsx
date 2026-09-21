"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { TESTIMONIALS } from "@/lib/content";

function Stars() {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-[var(--color-blood)]">
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
        sectionRef.current!.querySelectorAll("[data-card]"),
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)] py-24 sm:py-32"
    >
      <div className="px-6 sm:px-10">
        <span data-rise className="label-mono">
          05 — Depoimentos
        </span>
        <h2 data-rise className="font-display mt-6 text-[13vw] leading-[0.86] text-[var(--color-ink)] sm:text-[6vw]">
          QUEM MARCA,
          <br />
          <span className="text-[var(--color-blood)]">VOLTA.</span>
        </h2>
        <p data-rise className="mt-6 max-w-md text-sm text-[var(--color-ink-faint)]">
          Depoimentos de exemplo, só para pré-visualização — trocamos pelos
          reais assim que o Vanderson enviar.
        </p>
      </div>

      <div className="scrollbar-none mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:px-10">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.id}
            data-card
            className="flex w-[82vw] shrink-0 snap-start flex-col justify-between border border-[var(--color-line)] bg-[var(--color-bg-raised)] p-6 sm:w-[26rem] sm:p-8"
          >
            <div>
              <Stars />
              <p className="font-serif-italic mt-5 text-lg leading-snug text-[var(--color-ink)] sm:text-xl">
                “{t.quote}”
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line-strong)] label-mono text-[var(--color-ink)]">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <p className="text-sm text-[var(--color-ink)]">{t.name}</p>
                <p className="text-xs text-[var(--color-ink-faint)]">Exemplo de pré-visualização</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
