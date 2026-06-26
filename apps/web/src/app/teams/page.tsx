"use client";

import { useState } from "react";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";

/* ── Types ─────────────────────────────────────────────────────── */
interface SanityImage {
  asset?: { _ref?: string };
  alt?: string;
}
interface PersonRef {
  _id?: string;
  name: string;
  image?: SanityImage;
  photoType?: "individual" | "duo";
  duoPartner?: {
    _id: string;
    name: string;
    image?: SanityImage;
  };
}
interface DivisionData {
  abbreviation: string;
  fullName: string;
  corridor: "Internal Operations" | "Education and Development" | "Public Relations";
  manager?: PersonRef;
  viceManager?: PersonRef;
  staff?: PersonRef[];
}
interface TeamConfigData {
  year: string;
  president?: PersonRef;
  vicePresident?: PersonRef;
  secretary?: PersonRef;
  treasurer?: PersonRef;
  directorInternalOps?: PersonRef;
  directorEduDev?: PersonRef;
  directorPublicRelations?: PersonRef;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Leadership" | "Internal Operations" | "Education & Dev" | "Public Relations";
  image?: SanityImage;
  order: number;
}

/* ── Simulated Data ─────────────────────────────────────────────── */
const MOCK_CONFIG: TeamConfigData = {
  year: "2026",
  president: { _id: "p1", name: "Ahmad Rizky Pratama", photoType: "individual" },
  vicePresident: { _id: "p2", name: "Dewi Nuraini", photoType: "individual" },
  secretary: {
    _id: "p3",
    name: "Siti Putri Rahayu",
    photoType: "duo",
    duoPartner: { _id: "p4", name: "Fariz Hakim" },
  },
  treasurer: { _id: "p4", name: "Fariz Hakim", photoType: "individual" },
  directorInternalOps: { _id: "d1", name: "Bagas Wicaksono" },
  directorEduDev: { _id: "d2", name: "Kirana Maharani" },
  directorPublicRelations: { _id: "d3", name: "Nadia Rachma" },
};

const MOCK_DIVISIONS: DivisionData[] = [
  {
    abbreviation: "HRD",
    fullName: "Human Resources Development",
    corridor: "Internal Operations",
    manager: { name: "Yusuf Pratama" },
    viceManager: { name: "Lina Agustina" },
    staff: [
      { name: "Raka Kurnia" },
      { name: "Nisa Aulia" },
      { name: "Dimas Maulana" },
      { name: "Fira Handayani" },
      { name: "Galuh Permata" },
      { name: "Iqbal Marzuki" },
      { name: "Zara Nabila" },
    ],
  },
  {
    abbreviation: "FIN",
    fullName: "Finance and Budgeting",
    corridor: "Internal Operations",
    manager: { name: "Aldi Lesmana" },
    viceManager: { name: "Tania Putri" },
    staff: [
      { name: "Gilang Fauzi" },
      { name: "Mirna Rahayu" },
      { name: "Eksa Wibowo" },
    ],
  },
  {
    abbreviation: "SEKRE",
    fullName: "Secretariat",
    corridor: "Internal Operations",
    manager: { name: "Rini Handayani" },
    viceManager: { name: "Deni Surya" },
    staff: [{ name: "Zahra Amelia" }, { name: "Fani Nurlita" }],
  },
  {
    abbreviation: "ACAD",
    fullName: "Academic Excellence",
    corridor: "Education and Development",
    manager: { name: "Hendra Firman" },
    viceManager: { name: "Annisa Nur" },
    staff: [
      { name: "Bima Irawan" },
      { name: "Salma Lestari" },
      { name: "Rizwan Azhar" },
      { name: "Dela Ayu" },
      { name: "Kevin Saputra" },
      { name: "Mega Wulandari" },
    ],
  },
  {
    abbreviation: "RND",
    fullName: "Research and Development",
    corridor: "Education and Development",
    manager: { name: "Ilham Oktavian" },
    viceManager: { name: "Maya Fitriani" },
    staff: [
      { name: "Reza Yudha" },
      { name: "Dara Ananda" },
      { name: "Winda Nurhaliza" },
    ],
  },
  {
    abbreviation: "MEDIA",
    fullName: "Media and Creative",
    corridor: "Public Relations",
    manager: { name: "Putri Sari" },
    viceManager: { name: "Adi Firmansyah" },
    staff: [
      { name: "Cinta Natasya" },
      { name: "Vira Ramadhani" },
      { name: "Bayu Nugroho" },
      { name: "Tiara Dewi" },
      { name: "Rian Maulana" },
    ],
  },
  {
    abbreviation: "COLLAB",
    fullName: "Collaboration and Partnerships",
    corridor: "Public Relations",
    manager: { name: "Hafid Abdillah" },
    viceManager: { name: "Layla Kusuma" },
    staff: [{ name: "Titan Alfarizi" }, { name: "Sandi Aprilian" }],
  },
  {
    abbreviation: "EVENT",
    fullName: "Events and Community",
    corridor: "Public Relations",
    manager: { name: "Rizal Anwar" },
    viceManager: { name: "Niar Amelia" },
    staff: [
      { name: "Faza Rabbani" },
      { name: "Yara Sakinah" },
      { name: "Dani Kurniawan" },
      { name: "Aulia Fitri" },
    ],
  },
];

/* ── Accent Configuration (Using Established Corridor Colors) ── */
const ACCENT_COLORS: Record<string, { text: string; bg: string; border: string; raw: string }> = {
  "Leadership": {
    text: "text-[#f59e0b]",
    bg: "from-[#f59e0b]/10 to-[#f59e0b]/20 text-[#f59e0b]/40 border-[#f59e0b]/10 hover:border-[#f59e0b]/30",
    border: "border-[#f59e0b]/10 hover:border-[#f59e0b]/30",
    raw: "#f59e0b",
  },
  "Internal Operations": {
    text: "text-[#1CE1A4]",
    bg: "from-[#1CE1A4]/10 to-[#1CE1A4]/20 text-[#1CE1A4]/40 border-[#1CE1A4]/10 hover:border-[#1CE1A4]/30",
    border: "border-[#1CE1A4]/10 hover:border-[#1CE1A4]/30",
    raw: "#1CE1A4",
  },
  "Education and Development": {
    text: "text-[#8280E5]",
    bg: "from-[#8280E5]/10 to-[#8280E5]/20 text-[#8280E5]/40 border-[#8280E5]/10 hover:border-[#8280E5]/30",
    border: "border-[#8280E5]/10 hover:border-[#8280E5]/30",
    raw: "#8280E5",
  },
  "Education & Dev": {
    text: "text-[#8280E5]",
    bg: "from-[#8280E5]/10 to-[#8280E5]/20 text-[#8280E5]/40 border-[#8280E5]/10 hover:border-[#8280E5]/30",
    border: "border-[#8280E5]/10 hover:border-[#8280E5]/30",
    raw: "#8280E5",
  },
  "Public Relations": {
    text: "text-[#46BCED]",
    bg: "from-[#46BCED]/10 to-[#46BCED]/20 text-[#46BCED]/40 border-[#46BCED]/10 hover:border-[#46BCED]/30",
    border: "border-[#46BCED]/10 hover:border-[#46BCED]/30",
    raw: "#46BCED",
  },
};

/* ── Helpers ────────────────────────────────────────────────────── */
function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ── Base Components ────────────────────────────────────────────── */
function SectionDivider({ label, colorClass }: { label: string; colorClass?: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <span className={`text-[10px] font-extrabold tracking-widest uppercase whitespace-nowrap ${colorClass || "text-gray-400"}`}>
        {label}
      </span>
      <div className="h-[1px] flex-grow bg-white/5" />
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const accent = ACCENT_COLORS[member.category] || ACCENT_COLORS["Leadership"];

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-bg-card)]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-bg-card)]/75 flex flex-col h-full shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/20">
        {member.image ? (
          <Image
            src={member.image.asset?._ref || ""}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent.bg} border-b border-white/5`}>
            <span className="text-4xl font-black tracking-wider select-none transition-transform duration-300 group-hover:scale-110">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col justify-end gap-0.5">
        <h4 className="font-bold text-white text-sm sm:text-base leading-tight group-hover:text-[var(--color-accent-teal)] transition-colors duration-300">
          {member.name}
        </h4>
        <p className={`text-[11px] font-bold tracking-wide ${accent.text}`}>
          {member.role}
        </p>
      </div>
    </div>
  );
}

function DuoCard({
  member1,
  role1,
  member2,
  role2,
  category,
}: {
  member1: PersonRef;
  role1: string;
  member2: PersonRef;
  role2: string;
  category: "Leadership" | "Internal Operations" | "Education & Dev" | "Public Relations";
}) {
  const accent = ACCENT_COLORS[category] || ACCENT_COLORS["Leadership"];

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-bg-card)]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-bg-card)]/75 flex flex-col h-full shadow-md sm:col-span-2">
      <div className="relative aspect-[1.8/1] sm:aspect-[2.1/1] w-full overflow-hidden bg-black/20 flex divide-x divide-white/5 border-b border-white/5">
        {/* Member 1 */}
        <div className="relative flex-1 h-full overflow-hidden">
          {member1.image ? (
            <Image
              src={member1.image.asset?._ref || ""}
              alt={member1.name}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent.bg}`}>
              <span className="text-3xl font-black tracking-wider select-none transition-transform duration-300 group-hover:scale-110">
                {getInitials(member1.name)}
              </span>
            </div>
          )}
        </div>
        {/* Member 2 */}
        <div className="relative flex-1 h-full overflow-hidden">
          {member2.image ? (
            <Image
              src={member2.image.asset?._ref || ""}
              alt={member2.name}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent.bg}`}>
              <span className="text-3xl font-black tracking-wider select-none transition-transform duration-300 group-hover:scale-110">
                {getInitials(member2.name)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 divide-x divide-white/5 flex-grow">
        <div className="pr-4 flex flex-col justify-end gap-0.5">
          <h4 className="font-bold text-white text-xs sm:text-base leading-tight group-hover:text-[var(--color-accent-teal)] transition-colors duration-300">
            {member1.name}
          </h4>
          <p className={`text-[10px] sm:text-[11px] font-bold tracking-wide ${accent.text}`}>
            {role1}
          </p>
        </div>
        <div className="pl-4 flex flex-col justify-end gap-0.5">
          <h4 className="font-bold text-white text-xs sm:text-base leading-tight group-hover:text-[var(--color-accent-teal)] transition-colors duration-300">
            {member2.name}
          </h4>
          <p className={`text-[10px] sm:text-[11px] font-bold tracking-wide ${accent.text}`}>
            {role2}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Section Components ─────────────────────────────────────────── */
function ExecutiveBoardSection() {
  const config = MOCK_CONFIG;

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-amber-500 pl-4 py-1">
        <h3 className="text-xl font-black text-white uppercase tracking-wider">
          Executive Board
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* President & Vice President Duo Card */}
        {config.president && config.vicePresident && (
          <DuoCard
            member1={config.president}
            role1="President"
            member2={config.vicePresident}
            role2="Vice President"
            category="Leadership"
          />
        )}

        {/* Secretary & Treasurer */}
        {config.secretary && (
          <MemberCard
            member={{
              id: "secretary",
              name: config.secretary.name,
              role: "Secretary",
              category: "Leadership",
              image: config.secretary.image,
              order: 3,
            }}
          />
        )}

        {config.treasurer && (
          <MemberCard
            member={{
              id: "treasurer",
              name: config.treasurer.name,
              role: "Treasurer",
              category: "Leadership",
              image: config.treasurer.image,
              order: 4,
            }}
          />
        )}
      </div>
    </div>
  );
}

function CorridorDirectorsSection() {
  const config = MOCK_CONFIG;
  const directors = [
    { name: config.directorInternalOps?.name, role: "Director of Internal Operations", corridor: "Internal Operations" },
    { name: config.directorEduDev?.name, role: "Director of Education and Development", corridor: "Education and Development" },
    { name: config.directorPublicRelations?.name, role: "Director of Public Relations", corridor: "Public Relations" },
  ].filter((d) => d.name) as Array<{ name: string; role: string; corridor: string }>;

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-amber-500 pl-4 py-1">
        <h3 className="text-xl font-black text-white uppercase tracking-wider">
          Board of Directors
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {directors.map((dir, idx) => {
          let category: "Leadership" | "Internal Operations" | "Education & Dev" | "Public Relations" = "Leadership";
          if (dir.corridor === "Internal Operations") category = "Internal Operations";
          else if (dir.corridor === "Education and Development") category = "Education & Dev";
          else if (dir.corridor === "Public Relations") category = "Public Relations";

          return (
            <MemberCard
              key={idx}
              member={{
                id: `dir-${idx}`,
                name: dir.name,
                role: dir.role,
                category,
                order: idx,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function CorridorSection({
  corridorName,
}: {
  corridorName: "Internal Operations" | "Education and Development" | "Public Relations";
}) {
  const config = MOCK_CONFIG;
  const divisions = MOCK_DIVISIONS;
  
  let categoryKey: "Leadership" | "Internal Operations" | "Education & Dev" | "Public Relations" = "Internal Operations";
  if (corridorName === "Education and Development") categoryKey = "Education & Dev";
  else if (corridorName === "Public Relations") categoryKey = "Public Relations";

  const accent = ACCENT_COLORS[corridorName];

  // Fetch director for this corridor
  let director: PersonRef | undefined;
  if (corridorName === "Internal Operations") director = config.directorInternalOps;
  else if (corridorName === "Education and Development") director = config.directorEduDev;
  else if (corridorName === "Public Relations") director = config.directorPublicRelations;

  const corridorDivisions = divisions.filter((d) => d.corridor === corridorName);

  return (
    <div className="space-y-10">
      {/* Corridor Header */}
      <div className="border-l-4 pl-4 py-1" style={{ borderColor: accent.raw }}>
        <h3 className="text-2xl font-black text-white uppercase tracking-wider">
          {corridorName}
        </h3>
      </div>

      {/* Director */}
      {director && (
        <div className="space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block">
            Corridor Leadership
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <MemberCard
              member={{
                id: `corridor-dir-${corridorName}`,
                name: director.name,
                role: `Director of ${corridorName}`,
                category: categoryKey,
                image: director.image,
                order: 0,
              }}
            />
          </div>
        </div>
      )}

      {/* Corridor Divisions */}
      <div className="space-y-12">
        {corridorDivisions.map((division) => {
          const managerCard = division.manager ? (
            <MemberCard
              member={{
                id: `mgr-${division.abbreviation}`,
                name: division.manager.name,
                role: `Manager of ${division.fullName} (${division.abbreviation})`,
                category: categoryKey,
                image: division.manager.image,
                order: 0,
              }}
            />
          ) : null;

          const viceManagerCard = division.viceManager ? (
            <MemberCard
              member={{
                id: `v-mgr-${division.abbreviation}`,
                name: division.viceManager.name,
                role: `Vice Manager of ${division.fullName} (${division.abbreviation})`,
                category: categoryKey,
                image: division.viceManager.image,
                order: 0,
              }}
            />
          ) : null;

          return (
            <div
              key={division.abbreviation}
              className="bg-white/[0.015] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6"
            >
              {/* Division Title */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: accent.raw }}>
                  {division.abbreviation}
                </span>
                <h4 className="text-xl font-black text-white mt-0.5 leading-snug">
                  {division.fullName}
                </h4>
              </div>

              {/* Management Grid */}
              {(managerCard || viceManagerCard) && (
                <div className="space-y-4">
                  <SectionDivider label="Management" colorClass={accent.text} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {managerCard}
                    {viceManagerCard}
                  </div>
                </div>
              )}

              {/* Staff Grid */}
              {division.staff && division.staff.length > 0 && (
                <div className="space-y-4">
                  <SectionDivider label="Staff" colorClass="text-gray-400/80" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {division.staff.map((staffMember, index) => (
                      <MemberCard
                        key={index}
                        member={{
                          id: `staff-${division.abbreviation}-${index}`,
                          name: staffMember.name,
                          role: `Staff of ${division.fullName} (${division.abbreviation})`,
                          category: categoryKey,
                          image: staffMember.image,
                          order: index + 1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Page Component ────────────────────────────────────────── */
export default function TeamsPage() {
  const year = "2026";
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Leadership", "Internal Operations", "Education & Dev", "Public Relations"];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <PageHeader
        title={`Team ${year}`}
        description={`Meet the talented individuals who make up the IEEE Student Branch Universitas Indonesia for ${year}.`}
      />
      <main className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (Sticky Sidebar Filters) */}
          <div className="lg:col-span-3 lg:sticky lg:top-[120px] h-fit flex flex-col gap-6">
            <div>
              <span className="text-[var(--color-accent-teal)] font-bold text-xs uppercase tracking-wider">
                IEEE SBUI 2026
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Meet Our Team
              </h2>
            </div>
            <div className="flex lg:flex-col gap-2 flex-wrap">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2.5 rounded-xl text-left text-xs font-bold tracking-wider uppercase transition-all duration-300 border ${
                      isActive
                        ? "bg-white text-black border-white shadow-lg"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (Hierarchy Grid) */}
          <div className="lg:col-span-9 space-y-16">
            {activeFilter === "All" && (
              <>
                <ExecutiveBoardSection />
                <CorridorSection corridorName="Internal Operations" />
                <CorridorSection corridorName="Education and Development" />
                <CorridorSection corridorName="Public Relations" />
              </>
            )}
            {activeFilter === "Leadership" && (
              <>
                <ExecutiveBoardSection />
                <CorridorDirectorsSection />
              </>
            )}
            {activeFilter === "Internal Operations" && (
              <CorridorSection corridorName="Internal Operations" />
            )}
            {activeFilter === "Education & Dev" && (
              <CorridorSection corridorName="Education and Development" />
            )}
            {activeFilter === "Public Relations" && (
              <CorridorSection corridorName="Public Relations" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}