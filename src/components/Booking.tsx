"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { STUDIO } from "@/lib/content";
import { useMagnetic } from "@/lib/useMagnetic";

export default function Booking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const btnRef = useMagnetic<HTMLAnchorElement>(0.5);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-rise]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bg)] px-6 py-28 text-center sm:px-10 sm:py-40"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 text-[var(--color-blood)] opacity-70 sm:h-56 sm:w-56"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M100 20 C 60 70, 40 110, 60 140 C 80 170, 130 165, 140 130 C 148 100, 120 90, 105 105 C 92 118, 100 135, 115 132"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center pt-24 sm:pt-32">
        <span data-rise className="label-mono">
          Ou vá direto ao ponto
        </span>

        <h2 data-rise className="font-display mt-6 text-[18vw] leading-[0.82] text-[var(--color-ink)] sm:text-[9vw]">
          AGENDAR
        </h2>
        <p data-rise className="font-serif-italic mt-4 text-2xl text-[var(--color-ink-dim)] sm:text-3xl">
          sua próxima tatuagem
        </p>

        <a
          ref={btnRef}
          data-cursor="magnetic"
          href={STUDIO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-rise
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-[var(--color-blood)] px-10 py-5 label-mono text-[var(--color-ink)] transition-transform hover:scale-[1.03]"
        >
          Falar no WhatsApp
        </a>

        <div data-rise className="mt-10 flex flex-col items-center gap-1 text-sm text-[var(--color-ink-faint)]">
          <span>
            {STUDIO.venue} · {STUDIO.city}, {STUDIO.country}
          </span>
        </div>
      </div>
    </section>
  );
}
