import type { ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
  as?: HeadingLevel;
}

export default function SectionHeading({
  children,
  subtitle,
  className = "",
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={`mb-12 ${className}`.trim()}>
      <Heading className="section-heading">{children}</Heading>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
