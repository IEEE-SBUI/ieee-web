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

interface StarburstProps {
  text?: string;
  className?: string;
  size?: string;
}

/**
 * A spiky neon pink starburst badge/sticker.
 * Includes a slowly spinning hover animation to look active and lively.
 */
export function Starburst({ text, className = "", size = "w-20 h-20" }: StarburstProps) {
  const id = React.useId().replace(/:/g, "");
  const isAbsolute = className.includes("absolute") || className.includes("fixed");
  const positionClass = isAbsolute ? "" : "relative";
  const displayClass = isAbsolute ? "flex" : "inline-flex";

  return (
    <div className={`${positionClass} ${displayClass} items-center justify-center select-none ${size} ${className} group`}>
      {/* Spiky polygon starburst */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full fill-[#FF007F] stroke-white stroke-[2.5] drop-shadow-[0_4px_14px_rgba(255,0,127,0.4)] animate-[spin_60s_linear_infinite] group-hover:scale-110 transition-transform duration-300 ease-out"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="50,2 56,22 75,10 70,30 90,24 78,42 97,49 80,59 93,73 75,74 81,92 65,84 63,100 50,86 37,100 35,84 19,92 25,74 7,73 20,59 3,49 22,42 10,24 30,30 25,10 44,22" />
      </svg>
      {/* Starburst Text */}
      {text && (
        <span className="absolute text-center text-white font-black uppercase text-[11px] tracking-tight leading-none -rotate-12 max-w-[70%] select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] font-sans">
          {text}
        </span>
      )}
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
