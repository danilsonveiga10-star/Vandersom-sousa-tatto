"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINES = ["A PELE NÃO", "MENTE QUANDO", "A LUZ É REAL."];

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const lines = sectionRef.current!.querySelectorAll("[data-line] > span");
      gsap.set(lines, { yPercent: 100, opacity: 0 });
      gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      const para = sectionRef.current!.querySelector("[data-para]");
      gsap.fromTo(
        para,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: para, start: "top 85%", once: true },
        }
      );

      if (!reduced) {
        gsap.to(sectionRef.current!.querySelector("[data-marks]"), {
          rotate: 12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bg)] px-6 py-28 sm:px-10 sm:py-40"
    >
      <svg
        data-marks
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-[var(--color-line-strong)] opacity-60 sm:h-96 sm:w-96"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.6" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.6" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
        <div className="sm:col-span-9">
          <h2 className="font-display leading-[0.86] text-[var(--color-ink)]">
            {LINES.map((line, i) => (
              <span key={i} data-line className="split-line block overflow-hidden text-[13vw] sm:text-[7.2vw]">
                <span className="inline-block">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="flex items-end sm:col-span-3">
          <p data-para className="font-body text-sm leading-relaxed text-[var(--color-ink-dim)] sm:text-base">
            Hiper-realismo não tem contorno para esconder atrás. Cada camada
            de cinza precisa bater certo com a anterior, ou a luz não
            fecha. Sem atalho, sem segunda versão.
            <span className="mt-4 block label-mono text-[var(--color-ink-faint)]">
              — Vanderson, tatuador
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
