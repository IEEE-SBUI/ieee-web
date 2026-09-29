import React from "react";

interface WobblyBlobProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

/**
 * An organic, wobbly, soft-shaped background blob in mint green/teal.
 * Renders overlapping/skewed text inside to capture the booklet/gform feel.
 */
export function WobblyBlob({ children, className = "", color = "bg-[#1ce1a4]" }: WobblyBlobProps) {
  const isAbsolute = className.includes("absolute") || className.includes("fixed");
  const positionClass = isAbsolute ? "" : "relative";

  return (
    <div className={`${positionClass} inline-block ${className}`}>
      {/* Organic background shape with a slight rot/skew */}
      <div
        className={`absolute inset-0 ${color} opacity-95 shadow-[0_8px_32px_rgba(28,225,164,0.15)] transform -rotate-1.5 skew-y-0.5`}
        style={{
          // Chubbier organic wobbly shape
          borderRadius: "55% 45% 65% 35% / 45% 55% 45% 55%",
        }}
      />
      {/* Content container with inverse rotation to keep text legible */}
      <div className="relative z-10 px-8 py-3 transform rotate-1.5 skew-y-[-0.5deg] select-none text-center">
        {children}
      </div>
    </div>
  );
}

interface GradientMusicNoteProps {
  type?: "single" | "double";
  className?: string;
  size?: string;
}

/**
 * Floating music notes filled with the orange-to-pink gradient from the design reference.
 */
export function GradientMusicNote({ type = "single", className = "", size = "w-8 h-8" }: GradientMusicNoteProps) {
  const id = React.useId().replace(/:/g, "");
  const isAbsolute = className.includes("absolute") || className.includes("fixed");
  const positionClass = isAbsolute ? "" : "relative";

  return (
    <div className={`${positionClass} inline-block ${size} ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full drop-shadow-[0_3px_8px_rgba(255,122,0,0.4)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`note-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1CE1A4" />
            <stop offset="100%" stopColor="#5DD6F5" />
          </linearGradient>
        </defs>
        {type === "double" ? (
          <>
            <path
              d="M9 18V5l12-2v13"
              stroke={`url(#note-grad-${id})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="6" cy="18" r="3" fill={`url(#note-grad-${id})`} />
            <circle cx="18" cy="16" r="3" fill={`url(#note-grad-${id})`} />
          </>
        ) : (
          <>
            <circle cx="8" cy="18" r="4" fill={`url(#note-grad-${id})`} />
            <path
              d="M12 18V2l7 4"
              stroke={`url(#note-grad-${id})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  );
}

interface PlayfulTitleProps {
  text: string;
  className?: string;
}

/**
 * Renders text with slightly rotated and translated characters.
 * Replicates the organic, cut-out booklet typography from the reference image.
 */
export function PlayfulTitle({ text, className = "" }: PlayfulTitleProps) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span
      className={`inline-flex flex-wrap justify-center items-center gap-x-[0.3em] ${className}`}
      aria-hidden="true"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap items-center">
          {word.split("").map((char) => {
            const rotations = [-4, 3, -1.5, 4, -3, 2, -5, 1.5];
            const rot = rotations[charIndex % rotations.length];
            const translations = ["-translate-y-[0.5px]", "translate-y-[0.5px]", "translate-y-0"];
            const trans = translations[charIndex % translations.length];
            charIndex++;
            return (
              <span
                key={charIndex}
                aria-hidden="true"
                className={`inline-block transform ${trans} transition-transform duration-200 hover:scale-110`}
                style={{
                  transform: `rotate(${rot}deg)`,
                  marginRight: "-0.04em",
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
