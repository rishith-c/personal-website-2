import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  const hoverClass = hover
    ? "transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#4ade80]/5"
    : "";
  return (
    <div className={`glass rounded-3xl p-6 ${hoverClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
