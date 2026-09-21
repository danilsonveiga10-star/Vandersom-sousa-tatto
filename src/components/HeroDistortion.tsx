"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { STUDIO } from "@/lib/content";

const DistortionScene = dynamic(() => import("./hero/DistortionScene"), { ssr: false });

const HERO_VIDEO = "/videos/work-04.mp4";
const HERO_POSTER = "/images/hero-poster.jpg";

function Word({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`split-line inline-flex ${className ?? ""}`} data-word>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block will-change-transform" data-char>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function HeroDistortion() {
  const reduced = useReducedMotion();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const ampRef = useRef(1.6);
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  useEffect(() => {
    const chars = overlayRef.current?.querySelectorAll("[data-char]");
    const fadeIns = overlayRef.current?.querySelectorAll("[data-fade]");
    if (!chars) return;

    gsap.set(chars, { yPercent: 130, opacity: 0, filter: "blur(14px)" });
    if (fadeIns) gsap.set(fadeIns, { opacity: 0, y: 16 });

    const play = () => {
      const tl = gsap.timeline({ delay: reduced ? 0 : 0.15 });
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: reduced ? 0.5 : 0.95,
        ease: "power4.out",
        stagger: reduced ? 0 : { each: 0.035, from: "start" },
      });
      if (fadeIns) {
        tl.to(
          fadeIns,
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          "-=0.5"
        );
      }
      if (!reduced) {
        tl.to(ampRef, { current: 0.4, duration: 2.4, ease: "power2.out" }, 0.1);
      } else {
        ampRef.current = 0.4;
      }
    };

    window.addEventListener("site-reveal", play, { once: true });
    return () => window.removeEventListener("site-reveal", play);
  }, [reduced]);

  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        yPercent: reduced ? 0 : -18,
        opacity: reduced ? 1 : 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      if (canvasWrapRef.current) {
        gsap.to(canvasWrapRef.current, {
          scale: reduced ? 1 : 1.12,
          filter: reduced ? "none" : "brightness(0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="topo"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-bg)]"
    >
      <div ref={canvasWrapRef} className="absolute inset-0">
        {reduced ? (
          <Image
            src={HERO_POSTER}
            alt="Hiper-realismo em preto e cinza, tatuagem por Vanderson"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : webglOk ? (
          <Canvas
            dpr={[1, 1.8]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 1] }}
            fallback={
              <video
                src={HERO_VIDEO}
                poster={HERO_POSTER}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            }
          >
            <Suspense fallback={null}>
              <DistortionScene src={HERO_VIDEO} ampRef={ampRef} />
            </Suspense>
          </Canvas>
        ) : (
          <video
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-black/30" />
      </div>

      <div
        ref={overlayRef}
        className="relative z-10 flex h-full w-full flex-col justify-between px-6 pb-10 pt-28 sm:px-10 sm:pb-14"
      >
        <div data-fade className="label-mono flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-blood)]" />
          Tatuador · {STUDIO.city}, {STUDIO.country}
        </div>

        <div>
          <h1 className="font-display leading-[0.8] text-[var(--color-ink)]">
            <Word text="RATO" className="block text-[19vw] sm:text-[11vw]" />
            <Word
              text="TATTOO"
              className="block text-[19vw] text-[var(--color-blood)] sm:text-[11vw]"
            />
          </h1>
          <p
            data-fade
            className="font-serif-italic mt-6 max-w-md text-xl text-[var(--color-ink-dim)] sm:text-2xl"
          >
            {STUDIO.specialties.join(" · ")}.
          </p>
        </div>

        <div data-fade className="flex items-end justify-between">
          <span className="label-mono">{STUDIO.coords}</span>
          <div className="flex flex-col items-center gap-2 text-[var(--color-ink-faint)]">
            <span className="label-mono">Scroll</span>
            <span className="h-10 w-px animate-pulse bg-[var(--color-line-strong)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
