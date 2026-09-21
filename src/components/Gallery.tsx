"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GALLERY_WORKS } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M8 5v14l11-7-11-7z" />
    </svg>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openLightbox = (i: number) => {
    videoRefs.current[i]?.pause();
    setOpenIndex(i);
  };

  const closeLightbox = () => {
    if (openIndex !== null) videoRefs.current[openIndex]?.play().catch(() => {});
    setOpenIndex(null);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  useEffect(() => {
    const root = sectionRef.current;
    const videos = videoRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { root: null, threshold: 0.2 }
    );
    videos.forEach((v) => v && observer.observe(v));
    return () => {
      videos.forEach((v) => v && observer.unobserve(v));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section || reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const scrollLength = track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollLength}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [reduced]);

  return (
    <section id="trabalhos" ref={sectionRef} className="relative bg-[var(--color-bg)]">
      <div className="flex items-center justify-between px-6 pt-16 sm:px-10">
        <span className="label-mono">02 — Trabalhos</span>
        <span className="label-mono hidden sm:inline">Arraste ou role para ver mais</span>
      </div>

      <div className="h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="scrollbar-none flex h-full items-center gap-6 overflow-x-auto px-6 py-16 will-change-transform sm:gap-10 sm:overflow-x-visible sm:px-[8vw]"
        >
          {GALLERY_WORKS.map((work, i) => (
            <figure
              key={work.id}
              role="button"
              tabIndex={0}
              data-cursor="view"
              data-cursor-text="Assistir"
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(i);
                }
              }}
              className="group relative h-[62vh] w-[78vw] shrink-0 cursor-pointer overflow-hidden bg-[var(--color-bg-raised)] sm:h-[68vh] sm:w-[42vw] lg:w-[30vw]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={work.src}
                poster={work.poster}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={work.caption}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-ink)]/70 bg-black/30 text-[var(--color-ink)] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <PlayIcon />
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <span className="label-mono text-[var(--color-blood-bright)]">
                    {work.technique}
                  </span>
                  <p className="mt-1 max-w-[22ch] font-serif-italic text-lg text-[var(--color-ink)]">
                    {work.placement}
                  </p>
                </div>
                <span className="label-mono text-[var(--color-ink-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
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

            <div
              className="relative max-h-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={GALLERY_WORKS[openIndex].id}
                src={GALLERY_WORKS[openIndex].src}
                poster={GALLERY_WORKS[openIndex].poster}
                controls
                autoPlay
                loop
                playsInline
                className="max-h-[85vh] w-full bg-black"
              />
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <span className="label-mono text-[var(--color-blood-bright)]">
                    {GALLERY_WORKS[openIndex].technique}
                  </span>
                  <p className="mt-1 font-serif-italic text-lg text-[var(--color-ink)]">
                    {GALLERY_WORKS[openIndex].caption}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
