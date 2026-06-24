"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";
import PageHeader from "@/src/components/PageHeader";
import { ALL_COUNTRY_CODES } from "@/src/utils/countryCodes";
import { IEEE_SOCIETIES } from "@/src/data/ieeeSocieties";
import { WobblyBlob, Starburst } from "@/src/components/DecorativeShapes";

const DEFAULT_SOCIETIES = IEEE_SOCIETIES;

const DEFAULT_CONTACTS = [
  { name: "Raul Sumaryada", phone: "085282408017", lineId: "raulyurgent25" },
  { name: "Daiyan Farrel", phone: "081212406794", lineId: "" },
];

export interface RegistrationSettings {
  title?: string;
  description?: string;
  lineGroupUrl?: string;
  contactPersons?: Array<{ name: string; phone: string; lineId: string }>;
  societies?: Array<{ name: string; price: number }>;
}

interface RegisterFormProps {
  settings: RegistrationSettings;
  societies: Array<{ name: string; price: number }>;
}

export default function RegisterForm({ settings, societies }: RegisterFormProps) {
  const [countryCode, setCountryCode] = useState("+62");
  const [CCDropdownOpen, setCCDropdownOpen] = useState(false);
  const [CCSearchQuery, setCCSearchQuery] = useState("");
  const ccDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ccDropdownRef.current && !ccDropdownRef.current.contains(event.target as Node)) {
        setCCDropdownOpen(false);
      }
    }
    if (CCDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [CCDropdownOpen]);

  const [formData, setFormData] = useState({
    full_name: "",
    batch: "2025",
    faculty: "",
    major: "",
    email: "",
    phone_number: "",
    id_line: "",
    date_of_birth: "",
    origin: "internal",
    membership_type: "local",
    preferred_societies: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const filteredCountries = ALL_COUNTRY_CODES.filter(
    (country) =>
      country.name.toLowerCase().includes(CCSearchQuery.toLowerCase()) ||
      country.code.includes(CCSearchQuery)
  );

  const formTitle = settings.title || "Join IEEE SBUI";
  const formDescription =
    settings.description ||
    "Fill out the registration details below to apply for your IEEE Student Branch Universitas Indonesia membership.";
  const societiesList =
    societies && societies.length > 0
      ? societies
      : settings.societies && settings.societies.length > 0
      ? settings.societies
      : DEFAULT_SOCIETIES;
  const contactPersons =
    settings.contactPersons && settings.contactPersons.length > 0
      ? settings.contactPersons
      : DEFAULT_CONTACTS;
  const lineGroupUrl = settings.lineGroupUrl;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocietyChange = (societyName: string) => {
    setFormData((prev) => {
      const selected = prev.preferred_societies.includes(societyName)
        ? prev.preferred_societies.filter((name) => name !== societyName)
        : [...prev.preferred_societies, societyName];
      return { ...prev, preferred_societies: selected };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone_number: `${countryCode}${formData.phone_number.replace(/^0+/, "")}`,
          preferred_societies:
            formData.membership_type === "international"
              ? formData.preferred_societies
              : [],
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong during registration.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-95px)] bg-[var(--color-bg-primary)] px-6 py-12 flex flex-col justify-center items-center">
        <div className="bg-[var(--color-bg-card)]/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-2xl w-full">
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Thank you for registering to become a part of IEEE SBUI! Our team will review your submission and contact you shortly with further instructions. Please check your email and LINE for updates.
          </p>

          {lineGroupUrl && (
            <div className="mb-6">
              <a
                href={lineGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-[#06C755] hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md text-center"
              >
                Join LINE Group Chat
              </a>
            </div>
          )}

          <div className="bg-[var(--color-bg-primary)] rounded-lg p-5 mb-8 text-center border border-white/5 max-w-sm mx-auto w-full">
            <p className="text-xs text-[var(--color-accent-teal)] font-bold mb-3">
              Contact Person Details
            </p>
            <ul className="space-y-2 text-sm text-gray-300 inline-block text-left">
              {contactPersons.map((contact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">🔹</span>
                  <span>
                    <strong>{contact.name}</strong>: {contact.phone}
                    {contact.lineId ? ` (LINE: ${contact.lineId})` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-[var(--color-accent-teal)] to-[var(--color-accent-sky)] text-black font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all shadow-md"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pb-20">
      <PageHeader
        title={formTitle}
        description={formDescription}
      />

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Welcome and Benefits Panel */}
        <div 
          className="lg:col-span-5 lg:sticky lg:top-[120px] bg-[var(--color-bg-card)]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 text-sm leading-relaxed text-gray-300"
        >
          {/* Theme Banner */}
          <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden border border-white/5 shadow-md">
            <Image
              src="/banner-2026.webp"
              alt="IEEE SBUI 2026 Instrumenting Harmony Theme Banner"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </div>

          <div className="relative">
            <h2 className="text-xl font-extrabold text-white pr-8">Hello, Future Young Professionals! 🌟</h2>
          </div>
          <p className="text-gray-300">
            We're excited to welcome new members to the IEEE Student Branch Universitas Indonesia! By joining IEEE SBUI, you gain access to a global network of innovators, exclusive events, and professional development opportunities.
          </p>

          <div className="space-y-3 mt-2">
            <div className="mb-1">
              <span className="font-extrabold text-[var(--color-accent-teal)] text-xs uppercase tracking-wider">
                Membership Benefits
              </span>
            </div>
            <ul className="space-y-3 pl-1">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 shrink-0 mt-0.5">-</span>
                <span>Access to IEEE's vast digital library and research papers (IEEExplore) 📚</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 shrink-0 mt-0.5">-</span>
                <span>Exclusive invitations to IEEE SBUI events, company visits, workshops, and seminars 🎟️</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 shrink-0 mt-0.5">-</span>
                <span>Networking opportunities with industry professionals and researchers (IEEE Collabratec) 🤝</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 shrink-0 mt-0.5">-</span>
                <span>Leadership and career development programs 🌍</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 shrink-0 mt-0.5">-</span>
                <span>Discounts on IEEE conferences, publications, and certifications 💡</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-[var(--color-bg-primary)]/60 rounded-xl p-4 border border-white/5 mt-2 flex flex-col gap-2">
            <p>
              <strong className="text-[var(--color-accent-sky)]">📆 Registration Period:</strong> Open Now!
            </p>
            <p className="text-xs text-gray-300">
              Don&apos;t miss out on this opportunity to be part of a leading global engineering and technology community! Mark your calendars and register now!
            </p>
          </div>
          
          <p className="text-xs text-gray-300">
            For any questions or further details, feel free to reach out. We&apos;re excited to have you on board!
          </p>
          
          <div className="border-t border-white/5 pt-4 mt-2 flex justify-between items-end text-xs text-gray-300">
            <div>
              <p>Sincerely,</p>
              <p className="font-semibold text-white mt-0.5">IEEE SBUI 2026</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[var(--color-accent-teal)]">#InstrumentingHarmony</p>
              <p className="text-xs text-gray-200">Involve - Evolve - Resolve</p>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-7 w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--color-bg-card)]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6"
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-4 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Section 1: Personal Info */}
          <div>
            <h2 className="text-lg font-bold text-white border-b border-white/5 pb-2 mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="block text-xs text-white font-semibold mb-2">
                  Full Name <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                />
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block text-xs text-white font-semibold mb-2">
                  Date of Birth <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                  aria-label="Date of birth"
                  className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-xs text-white font-semibold mb-2">
                  Email Address <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone_number" className="block text-xs text-white font-semibold mb-2">
                  Phone Number <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex w-full gap-2 relative" ref={ccDropdownRef}>
                  <div className="relative flex shrink-0">
                    {/* Trigger Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setCCDropdownOpen((prev) => !prev);
                        setCCSearchQuery("");
                      }}
                      className="w-[88px] md:w-[110px] bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-2 md:px-3 py-3 flex items-center justify-between text-white focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all text-sm cursor-pointer select-none"
                    >
                      <span className="flex items-center gap-1">
                        <span className="text-base">{ALL_COUNTRY_CODES.find(c => c.code === countryCode)?.flag || "🇮🇩"}</span>
                        <span className="font-medium">{countryCode}</span>
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-gray-400 transition-transform duration-200 ${
                          CCDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {CCDropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 w-[280px] z-50 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[var(--color-bg-card)] backdrop-blur-xl">
                        {/* Search Input */}
                        <div className="p-2 border-b border-white/5">
                          <input
                            type="text"
                            value={CCSearchQuery}
                            onChange={(e) => setCCSearchQuery(e.target.value)}
                            placeholder="Search country or code..."
                            aria-label="Search country or calling code"
                            className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[var(--color-accent-teal)] transition-all"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        {/* List */}
                        <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                          {filteredCountries.length === 0 ? (
                            <div className="px-4 py-3 text-xs text-gray-300 text-center">
                              No results found
                            </div>
                          ) : (
                            filteredCountries.map((country) => (
                              <button
                                key={country.name + country.code}
                                type="button"
                                onClick={() => {
                                  setCountryCode(country.code);
                                  setCCDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left text-xs flex items-center justify-between transition-colors hover:bg-white/5 ${
                                  countryCode === country.code ? "bg-teal-500/10 text-[var(--color-accent-teal)]" : "text-gray-300"
                                }`}
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-sm">{country.flag}</span>
                                  <span className="truncate">{country.name}</span>
                                </span>
                                <span className="font-semibold ml-2 shrink-0">{country.code}</span>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <input
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, phone_number: val }));
                    }}
                    required
                    placeholder="e.g. 8123456789"
                    className="flex-1 min-w-0 bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label  htmlFor="id_line" className="block text-xs text-white font-semibold mb-2">
                  LINE ID <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="id_line"
                  id="id_line"
                  value={formData.id_line}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your LINE ID"
                  className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Academic Details */}
          <div>
            <h2 className="text-lg font-bold text-white border-b border-white/5 pb-2 mb-6">
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="batch" className="block text-xs text-white font-semibold mb-2">
                  Batch Year <span className="text-red-500 ml-0.5">*</span>
                </label>
                <select
                  name="batch"
                  id="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  aria-label="Batch year"
                  className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <div>
                <label htmlFor="origin" className="block text-xs text-white font-semibold mb-2">
                  Origin <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3">
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="origin"
                      id="origin_internal"
                      value="internal"
                      checked={formData.origin === "internal"}
                      onChange={handleInputChange}
                      className="accent-[var(--color-accent-teal)]"
                    />
                    Internal IEEE SBUI
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="origin"
                      id="origin_external"
                      value="external"
                      checked={formData.origin === "external"}
                      onChange={handleInputChange}
                      className="accent-[var(--color-accent-teal)]"
                    />
                    External Visitor
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="faculty" className="block text-xs text-white font-semibold mb-2">
                  Faculty <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="faculty"
                  id="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Faculty of Engineering"
                  className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                />
              </div>

              <div>
                <label htmlFor="major" className="block text-xs text-white font-semibold mb-2">
                  Major <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="major"
                  id="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Computer Engineering"
                  className="w-full bg-[var(--color-bg-primary)] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Membership Details */}
          <div>
            <h2 className="text-lg font-bold text-white border-b border-white/5 pb-2 mb-6">
              Membership Details
            </h2>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-xs text-white font-semibold mb-2">
                  Membership Type <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3">
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="membership_type"
                      value="local"
                      checked={formData.membership_type === "local"}
                      onChange={handleInputChange}
                      className="accent-[var(--color-accent-teal)]"
                    />
                    Local Membership
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer relative group">
                    <input
                      type="radio"
                      name="membership_type"
                      value="international"
                      checked={formData.membership_type === "international"}
                      onChange={handleInputChange}
                      className="accent-[var(--color-accent-teal)]"
                    />
                    <span className="flex items-center gap-1.5">
                      International Membership
                      <Info size={14} className="text-gray-400 hover:text-white cursor-help shrink-0" />
                    </span>
                    {/* Tooltip */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[var(--color-bg-card)] border border-white/15 text-xs text-gray-300 rounded-lg p-3 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-2xl z-50 text-left normal-case font-normal leading-relaxed">
                      Joining the international membership is optional and includes benefits such as access to IEEE journals, societies, and student associations, but it also requires payment.
                    </span>
                  </label>
                </div>
              </div>

              {/* Conditional societies list for International Membership */}
              {formData.membership_type === "international" && (
                <div className="bg-[var(--color-bg-primary)] border border-white/5 rounded-xl p-5 mt-2">
                  <p className="text-xs text-white font-bold mb-1">
                    Preferred IEEE Societies (Optional)
                  </p>
                  <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                    Select your areas of technical interest to join specific IEEE societies (price per society is listed next to each option).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {societiesList.map((soc) => (
                      <label
                        key={soc.name}
                        className="flex items-start gap-2.5 text-xs text-gray-300 hover:text-white cursor-pointer select-none py-1"
                      >
                        <input
                          type="checkbox"
                          checked={formData.preferred_societies.includes(soc.name)}
                          onChange={() => handleSocietyChange(soc.name)}
                          className="mt-0.5 accent-[var(--color-accent-teal)]"
                        />
                        <span>
                          {soc.name}{" "}
                          <span className="text-[var(--color-accent-sky)] font-semibold">
                            (${soc.price})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--color-accent-teal)] to-[var(--color-accent-sky)] text-black font-extrabold py-4 px-6 rounded-lg hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Submit Registration"
            )}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
