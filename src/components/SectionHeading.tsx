import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  children,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`.trim()}>
      <h2 className="section-heading">{children}</h2>
      {subtitle ? (
        <p className="mt-3 text-sm text-white/40">{subtitle}</p>
      ) : null}
    </div>
  );
}
