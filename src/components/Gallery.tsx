"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GALLERY_WORKS } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reduced = useReducedMotion();

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
              data-cursor="view"
              data-cursor-text="Ver"
              className="group relative h-[62vh] w-[78vw] shrink-0 overflow-hidden bg-[var(--color-bg-raised)] sm:h-[68vh] sm:w-[42vw] lg:w-[30vw]"
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
    </section>
  );
}
