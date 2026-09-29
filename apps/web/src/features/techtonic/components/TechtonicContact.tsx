import { TECHTONIC_CONFIG } from '../data/techtonicConfig';

export default function TechtonicContact() {
  const { contact } = TECHTONIC_CONFIG;

  return (
    <section className="bg-[var(--color-bg-primary)] py-16 sm:py-24 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Contact Us
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-lg">
              For inquiries regarding competition guidelines, registration procedures, guidebook specifications, or sponsorships, reach out directly.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-semibold w-24">Email:</span>
                <a href={`mailto:${contact.email}`} className="text-white hover:text-[#1CE1A4] font-semibold">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-semibold w-24">Instagram:</span>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#46BCED] hover:underline font-semibold">
                  {contact.instagram}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6 lg:border-l lg:border-white/10">
            <h3 className="text-sm font-bold uppercase text-gray-400 mb-6">
              Contact Persons
            </h3>

            <div className="space-y-6">
              {contact.contacts.map((person, idx) => (
                <div key={idx} className="flex items-center justify-between pt-4 first:pt-0 border-t border-white/10 first:border-0">
                  <div>
                    <span className="text-base font-bold text-white block">{person.name}</span>
                    <span className="text-xs text-gray-400">{person.role}</span>
                  </div>
                  <a
                    href={`https://wa.me/${person.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#1CE1A4] hover:underline font-bold"
                  >
                    {person.phone} →
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
