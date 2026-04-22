"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 30,
  className,
}: TypewriterTextProps) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown("");
    setDone(false);
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const start = () => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setShown(text.slice(0, i));
        if (i < text.length) {
          timer = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(start, delay);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {shown}
      {!done ? <span className="typing-cursor" aria-hidden /> : null}
    </span>
  );
}
