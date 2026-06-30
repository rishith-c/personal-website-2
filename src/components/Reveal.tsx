"use client";

import { useEffect } from "react";

/**
 * Site-wide motion layer, ported from the supercompress / linear-landing
 * animation script. Headlines marked [data-anim="headline"] are split into
 * words that blur-rise in; the hero plays on load, the rest on scroll-in.
 * [data-anim="body"] elements fade-rise, [data-anim="stagger"] containers
 * cascade their children, and #hero-mock gets a 3D illustrate entrance.
 */
export default function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const splitHeadline = (el: HTMLElement) => {
      if (el.dataset.split) return;
      // Headlines with inline markup (e.g. an italic span) keep their DOM and
      // fade in as a block instead of being flattened into words.
      if (el.childElementCount > 0) {
        el.classList.add("anim-body");
        el.dataset.block = "1";
        return;
      }
      const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      if (!text) return;
      el.dataset.split = "1";
      el.setAttribute("aria-label", text);
      el.textContent = "";
      const words = text.split(" ");
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "anim-word";
        span.style.setProperty("--word-i", String(i));
        span.textContent = word;
        el.appendChild(span);
        if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
      });
    };

    const revealWords = (el: Element) =>
      el.querySelectorAll(".anim-word").forEach((w) => w.classList.add("is-in"));

    const headlines = Array.from(
      document.querySelectorAll<HTMLElement>('[data-anim="headline"]'),
    );
    headlines.forEach(splitHeadline);

    const hero = document.querySelector<HTMLElement>('[data-anim="headline"][data-hero]');

    if (reduced) {
      headlines.forEach(revealWords);
      document
        .querySelectorAll('[data-anim="body"], [data-anim="stagger"], [data-block], #hero-mock')
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    // Hero headline plays immediately, word by word.
    if (hero) {
      requestAnimationFrame(() => {
        hero.querySelectorAll(".anim-word").forEach((w, i) => {
          window.setTimeout(() => w.classList.add("is-in"), 90 + i * 90);
        });
      });
    }

    const headlineIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          revealWords(e.target);
          headlineIO.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    headlines.forEach((h) => h !== hero && !h.dataset.block && headlineIO.observe(h));

    // Hero body bits play on a short timed cascade; the rest on scroll-in.
    const heroBodies = Array.from(document.querySelectorAll<HTMLElement>('[data-anim="body"][data-hero]'));
    heroBodies.forEach((el, i) => window.setTimeout(() => el.classList.add("is-in"), 900 + i * 150));

    const bodyIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          bodyIO.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll('[data-anim="body"]:not([data-hero]), [data-anim="stagger"], [data-block]')
      .forEach((el) => {
        if (el.matches('[data-anim="stagger"]')) {
          Array.from(el.children).forEach((c, i) =>
            (c as HTMLElement).style.setProperty("--stagger-i", String(i)),
          );
        }
        bodyIO.observe(el);
      });

    const mock = document.getElementById("hero-mock");
    if (mock) window.setTimeout(() => mock.classList.add("is-in"), 700);

    return () => {
      headlineIO.disconnect();
      bodyIO.disconnect();
    };
  }, []);

  return null;
}
