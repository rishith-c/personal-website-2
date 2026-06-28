"use client";

import { useEffect, useState } from "react";

const KEYS: { k: string; label: string }[] = [
  { k: "T", label: "cover" },
  { k: "I", label: "index" },
  { k: "N", label: "now" },
  { k: "C", label: "contact" },
  { k: "G", label: "github ↗" },
  { k: "L", label: "linkedin ↗" },
  { k: "?", label: "this menu" },
];

/**
 * Keyboard navigation + a little command palette of one. Single-key jumps
 * around the page (reusing the Lenis anchor handler via a synthetic anchor
 * click), opens socials, and `?` toggles a spatial legend overlay. A small
 * hint pill floats bottom-centre so the keys are discoverable.
 */
export default function KeyNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const jump = (hash: string) => {
      const a = document.createElement("a");
      a.href = hash;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "?") { e.preventDefault(); setOpen((v) => !v); return; }

      switch (e.key.toLowerCase()) {
        case "t": jump("#top"); break;
        case "i": jump("#index"); break;
        case "n": jump("#now"); break;
        case "c": jump("#contact"); break;
        case "g": window.open("https://github.com/rishith-c", "_blank", "noopener"); break;
        case "l": window.open("https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/", "_blank", "noopener"); break;
        default: return;
      }
      setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* hint pill */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Keyboard shortcuts"
        className="press fixed bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-[color:var(--color-bg)]/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)] backdrop-blur transition-colors hover:text-[color:var(--color-ink)] supports-[backdrop-filter]:bg-[color:var(--color-bg)]/40 md:inline-flex"
      >
        <kbd className="rounded-[3px] border border-[color:var(--color-rule)] px-1 text-[color:var(--color-ink-soft)]">?</kbd>
        keys
      </button>

      {/* legend overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-5 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-[color:var(--color-ink)]/10 backdrop-blur-[2px]" />
        <div
          role="dialog"
          aria-label="Keyboard shortcuts"
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-[340px] rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-bg-elevated)]/90 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 ${
            open ? "translate-y-0 scale-100" : "translate-y-3 scale-95"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]">
            Shortcuts
          </p>
          <ul className="mt-4 space-y-2.5">
            {KEYS.map((row) => (
              <li key={row.k} className="flex items-center justify-between font-mono text-[13px] text-[color:var(--color-ink-soft)]">
                <span>{row.label}</span>
                <kbd className="rounded-[4px] border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] px-2 py-0.5 text-[12px] text-[color:var(--color-ink)]">
                  {row.k}
                </kbd>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-[color:var(--color-rule-soft)] pt-3 font-mono text-[11px] text-[color:var(--color-ink-mute)]">
            esc to close
          </p>
        </div>
      </div>
    </>
  );
}
