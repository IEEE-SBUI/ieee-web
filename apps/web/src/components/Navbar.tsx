"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/** Brand logo asset file paths. */
const LOGO_IEEE_SBUI = "/logo-ieee-sbui.png";
const LOGO_UI = "/logo-ui.png";

/** Main navigation routes configuration. */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Divisions", href: "/divisions" },
  { label: "Articles", href: "/articles" },
  { label: "Events", href: "/events" },
] as const;

/** Dropdown menu links for listing historical executive committee boards. */
const TEAMS_DROPDOWN = [
  { label: "Team 2026", href: "/teams?year=2026" },
  { label: "Team 2025", href: "/teams?year=2025" },
  { label: "Team 2024", href: "/teams?year=2024" },
  { label: "Others", href: "/teams?year=others" },
] as const;

/**
 * Main site navigation displayed at the top of every page.
 *
 * Supports desktop and mobile navigation, including
 * a dropdown menu for team archives.
 *
 * @returns The navbar component.
 */

export default function Navbar() {
  const pathname = usePathname();
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[106px] w-full"
      aria-label="Main navigation"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(5, 5, 5, 0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      />

      <div className="relative flex h-full max-w-[1440px] mx-auto items-center justify-between px-6 sm:px-12 lg:px-[117px]">
        
        {/* Brand Logos: Displays IEEE SBUI and UI logos separated by a thin vertical rule */}
        <div className="flex items-center gap-[13px] shrink-0">
          <div className="relative h-[55px] w-[84px] overflow-hidden">
            <Image
              src={LOGO_IEEE_SBUI}
              alt="IEEE SBUI logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div
            className="h-[55px] w-px shrink-0"
            style={{ background: "rgba(255,255,255,0.25)" }}
            aria-hidden="true"
          />

          <div className="relative h-[55px] w-[55px] overflow-hidden">
            <Image
              src={LOGO_UI}
              alt="Universitas Indonesia logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop navigation menu links */}
        <div className="hidden lg:flex items-center gap-[35px]">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <div key={href} className="relative flex flex-col items-center group py-2">
                <Link
                  href={href}
                  className={`font-bold text-[14px] tracking-[-0.238px] transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-white"
                      : "text-white/75 hover:text-[var(--color-accent-teal)]"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label}
                </Link>
                {/* Active/Hover underline decoration that animates outward from center */}
                <span
                  className={`absolute -bottom-[18px] left-0 right-0 h-[3px] rounded-full bg-teal transition-transform duration-300 origin-center ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                  aria-hidden="true"
                />
              </div>
            );
          })}

          {/* Teams dropdown selector */}
          <div className="relative group/dropdown py-2">
            <button
              type="button"
              onClick={() => setTeamsOpen((prev) => !prev)}
              className={`flex items-center gap-[5px] font-bold text-[14px] tracking-[-0.238px] whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                teamsOpen
                  ? "text-[var(--color-accent-teal)]"
                  : "text-white/75 hover:text-white"
              }`}
              style={{
                fontFamily: "Inter, sans-serif",
                background: "none",
                border: "none",
                padding: 0,
              }}
              aria-expanded={teamsOpen}
              aria-haspopup="true"
            >
              Teams
              <ChevronDown
                size={16}
                className="transition-transform duration-300"
                style={{
                  transform: teamsOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            
            <span
              className={`absolute -bottom-[18px] left-0 right-0 h-[3px] rounded-full bg-teal transition-transform duration-300 origin-center ${
                teamsOpen
                  ? "scale-x-100 opacity-100"
                  : "scale-x-0 opacity-0 group-hover/dropdown:scale-x-100 group-hover/dropdown:opacity-100"
              }`}
              aria-hidden="true"
            />

            {teamsOpen && (
              <>
                {/* 
                  Click-away backdrop:
                  A full-screen transparent layer. Clicking outside the dropdown 
                  triggers the onClick, closing the open menu.
                */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setTeamsOpen(false)}
                  aria-hidden="true"
                />
                
                <div
                  className="absolute right-0 top-[calc(100%+14px)] z-20 w-[126px] max-h-[250px] overflow-y-auto overscroll-contain rounded-[10px]"
                  style={{
                    background: "#0c1517",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {TEAMS_DROPDOWN.map(({ label, href }, index) => {
                    const isItemActive = pathname === href;
                    return (
                      <div key={href}>
                        <Link
                          href={href}
                          onClick={() => setTeamsOpen(false)}
                          className={`group block px-[13px] py-[14px] font-bold text-[14px] tracking-[-0.238px] transition-colors duration-150 hover:bg-[rgba(28,225,164,0.1)] hover:text-[#1ce1a4] ${
                            isItemActive ? "text-white" : "text-white/75"
                          }`}
                        >
                          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                            {label}
                          </span>
                        </Link>
                      {index < TEAMS_DROPDOWN.length - 1 && (
                        <div
                          className="mx-[13px]"
                          style={{
                            height: "1px",
                            background: "rgba(255,255,255,0.1)",
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu toggle (Hamburger icon that animates into an 'X') */}
        <button
          type="button"
          className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          style={{ background: "none", border: "none" }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            className="block h-[2px] w-[22px] rounded transition-all duration-200"
            style={{
              background: "#fff",
              transform: mobileOpen
                ? "translateY(7px) rotate(45deg)"
                : "none",
            }}
          />
          <span
            className="block h-[2px] w-[22px] rounded transition-all duration-200"
            style={{
              background: "#fff",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-[2px] w-[22px] rounded transition-all duration-200"
            style={{
              background: "#fff",
              transform: mobileOpen
                ? "translateY(-7px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile navigation panel */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute left-0 right-0 top-[106px] z-40 flex flex-col py-4 max-h-[calc(100vh-106px)] overflow-y-auto overscroll-contain"
          style={{
            background: "rgba(8, 8, 17, 0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 font-bold text-[16px] tracking-[-0.272px] transition-colors duration-150"
              style={{
                fontFamily: "Inter, sans-serif",
                color:
                  pathname === href ? "#ffffff" : "rgba(255,255,255,0.75)",
              }}
            >
              {label}
            </Link>
          ))}

          <div
            className="mx-6 my-2"
            style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}
            aria-hidden="true"
          />

          <p
            className="px-6 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
          >
            Teams
          </p>
          {TEAMS_DROPDOWN.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 font-bold text-[15px] tracking-[-0.238px] transition-colors duration-150"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}