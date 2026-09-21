import { STUDIO } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg)] px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-lg text-[var(--color-ink)]">RATO TATTOO</span>

        <div className="flex flex-wrap gap-x-6 gap-y-2 label-mono">
          <a href={STUDIO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-blood)]">
            Instagram
          </a>
          <a href={STUDIO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-blood)]">
            WhatsApp
          </a>
        </div>

        <span className="label-mono text-[var(--color-ink-faint)]">
          {STUDIO.city}, {STUDIO.country} — {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
