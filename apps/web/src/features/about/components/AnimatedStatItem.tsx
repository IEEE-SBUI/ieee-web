"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedStatItemProps {
  value: string;
  label: string;
}

export default function AnimatedStatItem({
  value,
  label,
}: AnimatedStatItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [displayValue, setDisplayValue] = useState("0");
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!ref.current || played) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setPlayed(true);

        const target = parseInt(value.replace(/\D/g, ""));

        if (isNaN(target)) {
          setDisplayValue(value);
          return;
        }

        let start = 0;
        const duration = 700;
        const startTime = performance.now();

        const animate = (time: number) => {
          const progress = Math.min((time - startTime) / duration, 1);

          const current = Math.floor(progress * target);

          let suffix = "";

          if (value.includes("+")) suffix = "+";
          if (value.includes("st")) suffix = "st";

          setDisplayValue(current + suffix);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);

        observer.disconnect();
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [played, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="text-4xl md:text-5xl font-black text-gradient leading-none">
        {displayValue}
      </span>

      <span className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
        {label}
      </span>
    </div>
  );
}