"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Timed curtain: the counter is an honest fixed clock (parks at 92% until
 * fonts are ready, never a fake setTimeout percentage). The gate for content
 * animations fires at the START of the curtain's exit, scroll unlocks once
 * the curtain has fully cleared.
 */
export default function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    if (reduced) {
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        onComplete: () => {
          document.documentElement.style.overflow = "";
          window.__lenis?.start();
          window.dispatchEvent(new Event("site-reveal"));
          setDone(true);
        },
      });
      return;
    }

    // honest fixed clock: 0 -> 100 in ~1500ms, deceleration applied to the
    // number itself. No fake "waiting for readiness" promise to hang on.
    const counter = { value: 0 };

    const tl = gsap.timeline();

    tl.to(counter, {
      value: 100,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${counter.value / 100})`;
      },
      onComplete: runExit,
    });

    function runExit() {
      // gate opens at the START of the curtain's exit — content beneath
      // animates through the curtain, not after it.
      window.dispatchEvent(new Event("site-reveal"));

      const exit = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          window.__lenis?.start();
          setDone(true);
        },
      });

      exit.to(panelRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: "cubic-bezier(0.65,0,0.35,1)",
      });
      exit.to(overlayRef.current, { autoAlpha: 0, duration: 0.01 }, "-=0.01");
    }

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[250] overflow-hidden"
      aria-hidden="true"
    >
      <div ref={panelRef} className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg)]">
        <div className="flex flex-col items-center gap-6">
          <span className="font-display text-[13vw] leading-[0.8] text-[var(--color-ink)] sm:text-[7vw]">
            RATO
          </span>
          <div className="flex items-center gap-4">
            <div className="h-px w-[28vw] max-w-60 overflow-hidden bg-[var(--color-line)] sm:w-40">
              <div
                ref={barRef}
                className="h-full w-full origin-left scale-x-0 bg-[var(--color-blood)]"
              />
            </div>
            <span
              ref={counterRef}
              className="font-body text-xs tabular-nums tracking-[0.2em] text-[var(--color-ink-dim)]"
            >
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
