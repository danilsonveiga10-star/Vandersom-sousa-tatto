"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { STUDIO } from "@/lib/content";

export default function Studio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

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
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
      gsap.fromTo(
        imgWrapRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: imgWrapRef.current, start: "top 80%", once: true },
        }
      );
      gsap.to(imgWrapRef.current!.querySelector("img"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="estudio"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bg)] px-6 py-24 sm:px-10 sm:py-32"
    >
      <span data-rise className="label-mono">
        03 — Estúdio
      </span>

      <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-12 sm:gap-6">
        <div className="sm:col-span-6 lg:col-span-5">
          <h2 data-rise className="font-display text-[15vw] leading-[0.85] text-[var(--color-ink)] sm:text-[5.5vw]">
            {STUDIO.city.toUpperCase()}
          </h2>
          <h2 data-rise className="font-display text-[15vw] leading-[0.85] text-[var(--color-blood)] sm:text-[5.5vw]">
            {STUDIO.country.toUpperCase()}
          </h2>

          <div data-rise className="mt-10 flex flex-col gap-3 border-l border-[var(--color-line-strong)] pl-5 text-sm text-[var(--color-ink-dim)]">
            <p>{STUDIO.venue}</p>
            <p className="label-mono text-[var(--color-ink-faint)]">{STUDIO.coords}</p>
          </div>

          <p data-rise className="font-serif-italic mt-10 max-w-sm text-lg text-[var(--color-ink-dim)]">
            Atendimento com hora marcada em Lisboa, projeto conversado antes
            da agulha tocar a pele. Também organiza workshops de
            hiper-realismo, por marcação.
          </p>
        </div>

        <div className="relative sm:col-span-6 sm:col-start-7 lg:col-span-6 lg:col-start-7">
          <div
            ref={imgWrapRef}
            className="relative -mr-6 aspect-[3/4] w-[calc(100%+1.5rem)] overflow-hidden sm:mr-0 sm:w-full lg:-mr-16 lg:w-[calc(100%+4rem)]"
          >
            <Image
              src="/images/studio-portrait.jpg"
              alt="Retrato hiper-realista tatuado por Vanderson, antebraço"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <span className="label-mono absolute -bottom-4 left-0 bg-[var(--color-bg)] px-3 py-1 sm:left-4">
            {STUDIO.venue}
          </span>
        </div>
      </div>
    </section>
  );
}
