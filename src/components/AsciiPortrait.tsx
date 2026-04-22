"use client";

import { motion } from "framer-motion";

const ASCII_ART = String.raw`   ╭───────────────╮
   │  ░░▒▒▓▓▓▓▒▒░░  │
   │ ░▒▓█       █▓▒░ │
   │ ▒▓█  ┏━┓ ┏━╸█▓▒ │
   │ ▒▓█  ┣┳┛ ┃  █▓▒ │
   │ ▒▓█  ╹┗╸ ┗━╸█▓▒ │
   │ ░▒▓█       █▓▒░ │
   │  ░░▒▒▓▓▓▓▒▒░░  │
   ╰───────╤───────╯
       ◜◝◜◝◜◝◜◝
       │ // │ //
       ╰────┴───╯
        ░░░░░░░░
         ◌ ◌ ◌`;

export default function AsciiPortrait() {
  return (
    <motion.pre
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        color: ["rgba(74,222,128,0.6)", "rgba(34,211,238,0.6)", "rgba(74,222,128,0.6)"],
        textShadow: [
          "0 0 12px rgba(74,222,128,0.25)",
          "0 0 14px rgba(34,211,238,0.3)",
          "0 0 12px rgba(74,222,128,0.25)",
        ],
      }}
      transition={{
        opacity: { duration: 0.8 },
        color: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        textShadow: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
      className="font-mono text-[10px] sm:text-xs leading-tight whitespace-pre select-none text-white/60"
    >
      {ASCII_ART}
    </motion.pre>
  );
}
