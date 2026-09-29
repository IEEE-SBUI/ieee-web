import { TECHTONIC_CONFIG } from '../data/techtonicConfig';

export default function TechtonicSponsorship() {
  return (
    <div className="pt-6 border-t border-white/10">
      <span className="text-xs font-mono uppercase tracking-widest text-[#1CE1A4] block">
        Partnership Opportunities
      </span>
      <h3 className="mt-2 text-xl font-bold text-white">Sponsorship Package</h3>
      <p className="mt-3 text-sm text-gray-300 leading-relaxed">
        Connect your organization with top engineering and business student talent from across Indonesia through competition branding, keynote sessions, and booth exhibitions.
      </p>

      <div className="mt-6 font-mono text-xs text-[#1CE1A4]">
        <span>Contact: </span>
        <a href={`mailto:${TECHTONIC_CONFIG.contact.email}`} className="underline font-bold">
          {TECHTONIC_CONFIG.contact.email}
        </a>
      </div>
    </div>
  );
}
