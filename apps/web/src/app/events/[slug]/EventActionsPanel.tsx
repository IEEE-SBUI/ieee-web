"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

interface EventActionsPanelProps {
  registrationUrl?: string;
  isPast: boolean;
}

export default function EventActionsPanel({
  registrationUrl,
  isPast,
}: EventActionsPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (!shareUrl) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for non-secure HTTP contexts (e.g. testing servers or LAN IPs)
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          throw new Error("execCommand copy failed");
        }
      }
    } catch (err) {
      console.error("Failed to copy link: ", err);
      // Final manual fallback
      alert(`Could not automatically copy the link. You can manually copy it here:\n\n${shareUrl}`);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between gap-4">
      <button
        type="button"
        className={`h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all shrink-0 cursor-pointer ${
          copied ? "text-[var(--color-accent-teal)] border-[var(--color-accent-teal)]/30" : "text-white/80 hover:text-[var(--color-accent-teal)] hover:bg-white/10"
        }`}
        onClick={handleShare}
        title={copied ? "Link copied!" : "Share event link"}
      >
        <Share2 size={18} />
      </button>

      {isPast ? (
        <button
          disabled
          className="flex-1 h-12 bg-white/5 border border-white/10 text-white/30 rounded-xl cursor-not-allowed text-xs font-bold uppercase tracking-wider"
        >
          Registration Closed
        </button>
      ) : (
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-teal)] px-8 text-xs font-bold text-[var(--color-bg-primary)] transition-all duration-300 hover:bg-[#15c58f] shadow-[0_0_15px_rgba(28,225,164,0.15)] uppercase tracking-wider"
        >
          Register for Event
        </a>
      )}
    </div>
  );
}
