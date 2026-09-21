"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { SPECIALTIES } from "@/lib/content";

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Specialties() {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const desktopRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    desktopRef.current = window.matchMedia("(pointer: fine)").matches;
    if (!containerRef.current || !floatRef.current || !desktopRef.current) return;

    const moveX = gsap.quickTo(floatRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(floatRef.current, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      moveX(e.clientX - rect.left);
      moveY(e.clientY - rect.top);
    };
    containerRef.current.addEventListener("mousemove", onMove);
    return () => containerRef.current?.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, {
      autoAlpha: active !== null ? 1 : 0,
      scale: active !== null ? 1 : 0.85,
      duration: 0.45,
      ease: "power3.out",
    });
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { autoAlpha: active === i ? 1 : 0, duration: 0.4, ease: "power2.out" });
    });
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (active === i) v.play().catch(() => {});
      else v.pause();
    });
  }, [active]);

  const openLightbox = (i: number) => setOpenIndex(i);
  const closeLightbox = () => setOpenIndex(null);

  useEffect(() => {
    if (openIndex === null) return;
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  return (
    <section
      id="especialidades"
      ref={containerRef}
      className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-bg)] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mb-14 flex items-end justify-between">
        <span className="label-mono">01 — Especialidades</span>
        <span className="label-mono hidden sm:inline">Passe o mouse sobre cada técnica</span>
      </div>

      <ul>
        {SPECIALTIES.map((s, i) => (
          <li
            key={s.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="group relative border-t border-[var(--color-line)] py-6 last:border-b sm:py-10"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="label-mono text-[var(--color-ink-faint)]">{s.index}</span>
                <h3 className="font-display text-[13vw] leading-[0.85] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-blood)] sm:text-[5.5vw]">
                  {s.name}
                </h3>
              </div>
              <p className="max-w-sm text-sm text-[var(--color-ink-dim)] sm:text-right">
                {s.description}
              </p>
            </div>

            {/* mobile inline thumbnail — desktop uses the cursor-follow preview */}
            <button
              type="button"
              onClick={() => openLightbox(i)}
              aria-label={`Abrir vídeo de ${s.name}`}
              data-cursor-text="Assistir"
              className="relative mt-5 flex w-full items-center justify-center overflow-hidden rounded-sm bg-black sm:hidden"
            >
              <video
                src={s.video}
                poster={s.poster}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-label={`Exemplo de tatuagem em ${s.name}`}
                className="max-h-[70vh] w-full object-contain"
              />
              <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-ink)]/60 bg-black/40 text-[var(--color-ink)] backdrop-blur-sm">
                <ExpandIcon />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div
        ref={floatRef}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-64 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-0 sm:block"
        style={{ visibility: "hidden" }}
      >
        {SPECIALTIES.map((s, i) => (
          <div
            key={s.name}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            className="absolute inset-0 opacity-0"
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={s.video}
              poster={s.poster}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {mounted &&
        openIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 sm:p-10"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Fechar"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-blood)] hover:text-[var(--color-blood)]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <video
                key={SPECIALTIES[openIndex].name}
                src={SPECIALTIES[openIndex].video}
                poster={SPECIALTIES[openIndex].poster}
                controls
                autoPlay
                loop
                playsInline
                className="max-h-[85vh] w-full bg-black object-contain"
              />
              <div className="mt-4">
                <span className="label-mono text-[var(--color-blood-bright)]">
                  {SPECIALTIES[openIndex].name}
                </span>
                <p className="mt-1 max-w-sm font-serif-italic text-lg text-[var(--color-ink)]">
                  {SPECIALTIES[openIndex].description}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
