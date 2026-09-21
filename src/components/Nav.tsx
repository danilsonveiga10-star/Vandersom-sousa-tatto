"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { NAV_LINKS, STUDIO } from "@/lib/content";
import { useMagnetic } from "@/lib/useMagnetic";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const barRef = useRef<HTMLElement>(null);
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.35);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (!barRef.current) return;
      if (y > 80 && y > last) {
        gsap.to(barRef.current, { yPercent: -100, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(barRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      window.__lenis?.stop();
      const tl = gsap.timeline();
      tl.set(overlayRef.current, { display: "flex" });
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "cubic-bezier(0.65,0,0.35,1)" }
      );
      tl.fromTo(
        linksRef.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power4.out" },
        "-=0.35"
      );
    } else if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
          document.documentElement.style.overflow = "";
          window.__lenis?.start();
        },
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) window.__lenis?.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
  };

  return (
    <>
      <nav
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[220] flex items-center justify-between px-6 py-5 sm:px-10"
      >
        <a
          href="#topo"
          data-cursor="magnetic"
          onClick={(e) => {
            e.preventDefault();
            goTo("#topo");
          }}
          className="font-display text-lg tracking-tight text-[var(--color-ink)]"
        >
          RATO TATTOO
        </a>

        <div className="flex items-center gap-5">
          <a
            ref={magneticRef}
            href={STUDIO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="hidden rounded-full border border-[var(--color-line-strong)] px-5 py-2 label-mono transition-colors hover:border-[var(--color-blood)] hover:text-[var(--color-blood)] sm:inline-block"
          >
            Agendar
          </a>
          <button
            data-cursor="magnetic"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="label-mono flex items-center gap-2 text-[var(--color-ink)]"
          >
            <span>{open ? "Fechar" : "Menu"}</span>
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span
                className="h-px w-full bg-current transition-transform duration-300"
                style={{ transform: open ? "translateY(5.5px) rotate(45deg)" : "none" }}
              />
              <span
                className="h-px w-full bg-current transition-transform duration-300"
                style={{ transform: open ? "translateY(-5.5px) rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[210] hidden flex-col justify-between bg-[var(--color-bg)] px-6 pb-10 pt-28 sm:px-10"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="split-line border-b border-[var(--color-line)] py-3">
              <a
                ref={(el) => {
                  if (el) linksRef.current[i] = el;
                }}
                href={link.href}
                data-cursor="view"
                data-cursor-text="Ir"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.href);
                }}
                className="group flex items-baseline gap-4 font-display text-[13vw] leading-[0.9] text-[var(--color-ink)] transition-colors hover:text-[var(--color-blood)] sm:text-[5.5vw]"
              >
                <span className="font-body text-xs text-[var(--color-ink-faint)] group-hover:text-[var(--color-blood)]">
                  {link.index}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 pt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-serif-italic text-xl text-[var(--color-ink-dim)]">
            {STUDIO.city} — {STUDIO.venue}
          </p>
          <div className="flex gap-6 label-mono">
            <a href={STUDIO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-blood)]">
              Instagram
            </a>
            <a href={STUDIO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-blood)]">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
