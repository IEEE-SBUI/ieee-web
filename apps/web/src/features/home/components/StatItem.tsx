interface StatItemProps {
  /** The headline figure, e.g. "1st", "8", "50+". */
  value: string;

  /** Small uppercase caption shown beneath the figure. */
  label: string;
}

/**
 * A single key statistic: a large teal number with a small uppercase label.
 *
 * Presentational and content-agnostic so it can be reused across the
 * homepage About preview and the full About page.
 *
 * @returns A stat block.
 */
export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-bold text-[var(--color-accent-teal)] md:text-4xl">
        {value}
      </span>
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
        {label}
      </span>
    </div>
  );
}
