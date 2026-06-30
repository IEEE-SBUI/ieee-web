"use client";

interface EventActionsPanelProps {
  registrationUrl?: string;
  isPast: boolean;
}

export default function EventActionsPanel({
  registrationUrl,
  isPast,
}: EventActionsPanelProps) {
  if (isPast) {
    return (
      <div className="mt-8 pt-6 border-t border-white/5">
        <button
          disabled
          className="w-full h-12 bg-white/5 border border-white/10 text-white/30 rounded-xl cursor-not-allowed text-xs font-bold uppercase tracking-wider"
        >
          Registration Closed
        </button>
      </div>
    );
  }

  if (!registrationUrl) {
    return null;
  }

  return (
    <div className="mt-8 pt-6 border-t border-white/5">
      <a
        href={registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-teal)] px-8 text-xs font-bold text-[var(--color-bg-primary)] transition-all duration-300 hover:bg-[#15c58f] shadow-[0_0_15px_rgba(28,225,164,0.15)] uppercase tracking-wider"
      >
        Register for Event
      </a>
    </div>
  );
}
