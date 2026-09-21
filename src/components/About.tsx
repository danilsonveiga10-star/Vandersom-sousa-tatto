"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { STUDIO } from "@/lib/content";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelector("[data-portrait]"),
        { clipPath: "inset(0 0 0 100%)" },
        {
          clipPath: "inset(0 0 0 0%)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-rise]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="artista"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bg-raised)] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-14 sm:grid-cols-12 sm:gap-8">
        <div className="order-2 sm:order-1 sm:col-span-7">
          <span data-rise className="label-mono">
            04 — O Artista
          </span>
          <h2 data-rise className="font-display mt-6 text-[13vw] leading-[0.86] text-[var(--color-ink)] sm:text-[5vw]">
            CADA TRAÇO,
            <br />
            <span className="text-[var(--color-blood)]">UMA VEZ.</span>
          </h2>
          <p data-rise className="mt-8 max-w-md text-base leading-relaxed text-[var(--color-ink-dim)] sm:text-lg">
            Tatuador especializado em hiper-realismo, a trabalhar em{" "}
            {STUDIO.city}. Constrói cada peça em preto e cinza, camada sobre
            camada até a pele parecer fotografia — do retrato ao blackwork
            mais denso. Também dá orçamentos e workshops.
          </p>
          <p data-rise className="mt-4 font-serif-italic text-lg text-[var(--color-ink-faint)]">
            {STUDIO.handle}
          </p>
        </div>

        <div className="order-1 sm:order-2 sm:col-span-5">
          <div
            data-portrait
            className="relative -mx-6 aspect-[4/5] overflow-hidden sm:mx-0 sm:-mr-10 lg:-mr-16"
          >
            <Image
              src="/images/artist-portrait.jpg"
              alt="Vanderson, tatuador especializado em hiper-realismo"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover grayscale-[15%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
