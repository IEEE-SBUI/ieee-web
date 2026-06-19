import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

/**
 * Navigation links displayed in the footer.
 */
const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Divisions", href: "/divisions" },
  { label: "Articles", href: "/articles" },
  { label: "Events", href: "/events" },
  { label: "Our Team", href: "/team?year=2026" },
];

/**
 * External and internal resource links displayed in the footer.
 */
const resourceLinks = [
  { label: "IEEE Global", href: "https://www.ieee.org", external: true },
  { label: "Registration", href: "#" },
];

/**
 * Global footer shown across the site.
 *
 * Provides chapter branding, navigation links,
 * contact information, and social media links.
 *
 * @returns The site footer component.
 */

/**
 * Social media accounts displayed in the footer.
 */
const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/ieeesbui",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/ieeesbui",
    icon: FaLinkedinIn,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@ieeesbui",
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(130,128,229,0.1)] bg-[rgba(0,0,0,0.9)] backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Branding, description text, and social icons */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-ieee-sbui.png"
                alt="IEEE Student Branch Universitas Indonesia Logo"
                width={180}
                height={80}
                className="h-15 w-auto -ml-3"
              />
              <Image
                src="/logo-ui.png"
                alt="Universitas Indonesia Logo"
                width={100}
                height={100}
                className="h-11 w-auto"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              IEEE Student Branch Universitas Indonesia is a student-led chapter
              dedicated to advancing technology for the benefit of humanity.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-teal)]"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-teal)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: External & Internal Chapter Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              Resources
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-teal)]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-teal)]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Direct Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              Contact
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Faculty of Engineering, Universitas Indonesia, Depok, West Java
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:ieeesbui2026@gmail.com"
                  className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-teal)]"
                >
                  ieeesbui2026@gmail.com
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="border-t border-[rgba(130,128,229,0.1)]">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-8">
          <p className="text-center text-xs text-[var(--color-text-muted)]">
            &copy; 2026 IEEE Student Branch Universitas Indonesia. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
