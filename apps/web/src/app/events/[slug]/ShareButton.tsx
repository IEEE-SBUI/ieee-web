"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";

export default function ShareButton() {
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
      alert(`Could not automatically copy the link. You can manually copy it here:\n\n${shareUrl}`);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleShare}
        className={`h-9 px-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
          copied 
            ? "text-[var(--color-accent-teal)] border-[var(--color-accent-teal)]/30 bg-[var(--color-accent-teal)]/5" 
            : "text-white/80 hover:text-[var(--color-accent-teal)] hover:bg-white/10"
        }`}
        title="Share event link"
      >
        <Share2 size={14} />
        <span>{copied ? "Copied!" : "Share"}</span>
      </button>

      {/* Floating Tooltip Notification */}
      {copied && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[var(--color-accent-teal)] text-[var(--color-bg-primary)] text-[9px] font-bold uppercase tracking-wider whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-bottom-1 duration-200">
          Link Copied!
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-accent-teal)]" />
        </div>
      )}
    </div>
  );
}
