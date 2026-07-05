import React from 'react';

interface VinylRecordProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * VinylRecord Component
 * A premium retro-style giant spinning vinyl disc with a stationary tonearm overlay.
 * Uses site brand color palette (Teal, Sky Blue, Dark Void) and features high-contrast logo label.
 */
export default function VinylRecord({ className, ...props }: VinylRecordProps) {
  return (
    <div className={`relative aspect-square w-full flex items-center justify-center group select-none ${className}`} {...props}>
      <svg
        className="absolute inset-0 w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vinyl Lacquer Gloss Radial Highlight */}
          <radialGradient id="vinylGloss" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#222222" />
            <stop offset="70%" stopColor="#111111" />
            <stop offset="90%" stopColor="#080808" />
            <stop offset="100%" stopColor="#020205" />
          </radialGradient>

          {/* Circular Center Label ClipPath */}
          <clipPath id="labelClip">
            <circle cx="250" cy="250" r="105" />
          </clipPath>
        </defs>

        {/* 1. Spinning Record Assembly (With outer padding within viewBox) */}
        <g className="animate-[spin_30s_linear_infinite] origin-[250px_250px]">
          {/* The Vinyl Disc (Deep Charcoal Navy, padded radius 220) */}
          <circle cx="250" cy="250" r="220" fill="url(#vinylGloss)" stroke="#0C0B18" strokeWidth="5" />

          {/* Grooves (Retro Concentric Stroke Circles) */}
          <circle cx="250" cy="250" r="205" stroke="rgba(28,225,164,0.15)" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="194" stroke="rgba(28,225,164,0.1)" strokeWidth="1" />
          <circle cx="250" cy="250" r="183" stroke="rgba(28,225,164,0.15)" strokeWidth="2" />
          <circle cx="250" cy="250" r="172" stroke="rgba(28,225,164,0.1)" strokeWidth="1" />
          <circle cx="250" cy="250" r="161" stroke="rgba(28,225,164,0.15)" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="150" stroke="rgba(28,225,164,0.08)" strokeWidth="1" />

          {/* Specular Reflective Light Flares */}
          <path d="M 250 250 L 95 95 A 220 220 0 0 1 186 64 Z" fill="rgba(255, 255, 255, 0.04)" />
          <path d="M 250 250 L 405 405 A 220 220 0 0 1 314 436 Z" fill="rgba(255, 255, 255, 0.04)" />

          {/* Center Label Outer Ring (Teal) */}
          <circle cx="250" cy="250" r="126" fill="var(--color-accent-teal)" stroke="#0C0B18" strokeWidth="4.5" />

          {/* Center Label Inner Ring (High-Contrast Dark Void with Sky Blue Outline) */}
          <circle cx="250" cy="250" r="105" fill="#0C0B18" stroke="var(--color-accent-sky)" strokeWidth="4.5" />

          {/* The Brand Artwork Image (Aspect ratio scaled and clipped to center label) */}
          <image 
            href="/theme-2026.png" 
            x="130" 
            y="180" 
            width="240" 
            height="140" 
            clipPath="url(#labelClip)"
          />

          {/* Central spindle hole rim */}
          <circle cx="250" cy="250" r="6" fill="#0C0B18" />
        </g>

        {/* Stationary Tonearm Assembly (Overlayed on top right) */}
        {/* Pivot Base Mount (Teal/Sky/Midnight) */}
        <circle cx="410" cy="90" r="24" fill="var(--color-accent-teal)" stroke="#0C0B18" strokeWidth="4.5" />
        <circle cx="410" cy="90" r="11" fill="#0C0B18" />
        
        {/* Tonearm Shaft */}
        <line 
          x1="410" 
          y1="90" 
          x2="350" 
          y2="310" 
          stroke="black" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* Inner silver tube highlight */}
        <line 
          x1="408" 
          y1="92" 
          x2="352" 
          y2="308" 
          stroke="#ffffff" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          opacity="0.8"
        />

        {/* Cartridge Headshell (Teal) clamping on the record grooves */}
        <g transform="translate(350, 310) rotate(-35)">
          <rect x="-6" y="-12" width="12" height="24" rx="2" fill="var(--color-accent-teal)" stroke="#0C0B18" strokeWidth="2.5" />
          <path d="M 0 12 L 0 16" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
