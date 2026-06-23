import SectionHeading from "@/src/components/SectionHeading";
import { IEEE_PORTALS } from "@/src/data/ieeePortals";
import { FiExternalLink } from "react-icons/fi";

export default function IEEEPortalsSection() {
  return (
    <section aria-labelledby="portals-heading" className="py-16 md:py-24 border-t border-[rgba(255,255,255,0.03)] bg-[rgba(5,16,13,0.1)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        {/* Centered Heading */}
        <div className="mx-auto max-w-3xl text-center" id="portals-heading">
          <SectionHeading heading="Explore the IEEE Network" />
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Access the global ecosystem of IEEE resources, research repositories, professional networks, and career platforms.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {IEEE_PORTALS.map((category) => (
            <div
              key={category.title}
              className="flex flex-col rounded-xl border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-card)] p-6 md:p-8 hover:border-[rgba(28,225,164,0.15)] transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white border-b border-[rgba(255,255,255,0.08)] pb-3 tracking-wide">
                {category.title}
              </h3>

              {/* Animated Bubbles Grid */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {category.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-theme-mint)] hover:bg-[rgba(28,225,164,0.05)] hover:-translate-y-0.5 transition-all duration-200 ease-out"
                  >
                    <span>{link.label}</span>
                    <FiExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
