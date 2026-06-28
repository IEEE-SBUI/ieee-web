"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/src/sanity/client";
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
  photoType?: "individual" | "duo" | "trio";
  isLeftInDuo?: boolean;
  duoPartner?: {
    _id: string;
    name: string;
    image?: SanityImage;
    isLeftInDuo?: boolean;
  };
  trioPosition?: "left" | "center" | "right";
  trioPartners?: Array<{
    _id: string;
    name: string;
    image?: SanityImage;
    trioPosition?: "left" | "center" | "right";
  }>;
}
interface DivisionData {
  abbreviation: string;
  fullName: string;
  corridor: "Internal Operations" | "Education and Development" | "Public Relations";
  manager?: PersonRef;
  viceManagers?: PersonRef[];
  staff?: PersonRef[];
}
interface TeamConfigData {
  year: string;
  president?: PersonRef;
  vicePresident?: PersonRef;
  secretary?: PersonRef;
  vicesecretary?: PersonRef;
  treasurer?: PersonRef;
  vicetreasurer?: PersonRef;
  directorInternalOps?: PersonRef;
  directorEduDev?: PersonRef;
  directorPublicRelations?: PersonRef;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations";
  image?: SanityImage;
  order: number;
}

type RenderItem =
  | { kind: "solo"; member: TeamMember }
  | {
      kind: "duo";
      id: string;
      member1: PersonRef;
      role1: string;
      member2: PersonRef;
      role2: string;
      category: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations";
    }
  | {
      kind: "trio";
      id: string;
      member1: PersonRef;
      role1: string;
      member2: PersonRef;
      role2: string;
      member3: PersonRef;
      role3: string;
      category: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations";
    };

/* ── Accent Configuration (Using Established Corridor Colors) ── */
const ACCENT_COLORS: Record<string, { text: string; bg: string; border: string; raw: string }> = {
  "Executive Board": {
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

/**
 * Builds list of items to render, merging duo/trio partners into wide shared cards.
 */
function buildRenderItems(
  entries: Array<{ member: PersonRef; role: string }>,
  category: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations"
): RenderItem[] {
  const items: RenderItem[] = [];
  const processedIds = new Set<string>();

  entries.forEach(({ member, role }, idx) => {
    if (!member) return;
    const memberId = member._id || member.name;

    if (processedIds.has(memberId)) return;

    if (member.photoType === "trio" && member.trioPartners && member.trioPartners.length >= 2) {
      const partner1 = member.trioPartners[0];
      const partner2 = member.trioPartners[1];
      const partner1Id = partner1._id || partner1.name;
      const partner2Id = partner2._id || partner2.name;

      const p1Entry = entries.find(
        (e) => e.member && (e.member._id === partner1._id || e.member.name === partner1.name)
      );
      const p2Entry = entries.find(
        (e) => e.member && (e.member._id === partner2._id || e.member.name === partner2.name)
      );

      const role1 = role;
      const role2 = p1Entry ? p1Entry.role : "Staff";
      const role3 = p2Entry ? p2Entry.role : "Staff";

      items.push({
        kind: "trio",
        id: `trio-${memberId}-${partner1Id}-${partner2Id}`,
        member1: member,
        role1,
        member2: partner1,
        role2,
        member3: partner2,
        role3,
        category,
      });

      processedIds.add(memberId);
      processedIds.add(partner1Id);
      processedIds.add(partner2Id);
    } else if (member.photoType === "duo" && member.duoPartner) {
      const partner = member.duoPartner;
      const partnerId = partner._id || partner.name;

      const partnerEntry = entries.find(
        (e) => e.member && (e.member._id === partner._id || e.member.name === partner.name)
      );
      const partnerRole = partnerEntry ? partnerEntry.role : "Vice Manager";

      items.push({
        kind: "duo",
        id: `duo-${memberId}-${partnerId}`,
        member1: member,
        role1: role,
        member2: partner,
        role2: partnerRole,
        category,
      });

      processedIds.add(memberId);
      processedIds.add(partnerId);
    } else {
      items.push({
        kind: "solo",
        member: {
          id: memberId,
          name: member.name,
          role: role,
          image: member.image,
          category,
          order: idx,
        },
      });
      processedIds.add(memberId);
    }
  });

  return items;
}

/* ── Base Components ────────────────────────────────────────────── */
function SectionDivider({ label, colorClass }: { label: string; colorClass?: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <span className={`text-[10px] font-extrabold uppercase whitespace-nowrap ${colorClass || "text-gray-400"}`}>
        {label}
      </span>
      <div className="h-[1px] flex-grow bg-white/5" />
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const accent = ACCENT_COLORS[member.category] || ACCENT_COLORS["Executive Board"];
  const imageUrl = member.image ? urlFor(member.image) : "";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-bg-card)]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-bg-card)]/75 flex flex-col h-full shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent.bg} border-b border-white/5`}>
            <span className="text-4xl font-black select-none transition-transform duration-300 group-hover:scale-110">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col justify-end gap-0.5">
        <h4 className="font-bold text-white text-sm sm:text-base leading-tight group-hover:text-[var(--color-accent-teal)] transition-colors duration-300">
          {member.name}
        </h4>
        <p className="text-[11px] font-bold text-gray-400">
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
  category: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations";
}) {
  const accent = ACCENT_COLORS[category] || ACCENT_COLORS["Executive Board"];

  // Determine left vs right placement based on isLeftInDuo and fallback hierarchy
  let leftMember = member1;
  let leftRole = role1;
  let rightMember = member2;
  let rightRole = role2;

  if (member1.isLeftInDuo === true || member2.isLeftInDuo === false) {
    leftMember = member1;
    leftRole = role1;
    rightMember = member2;
    rightRole = role2;
  } else if (member2.isLeftInDuo === true || member1.isLeftInDuo === false) {
    leftMember = member2;
    leftRole = role2;
    rightMember = member1;
    rightRole = role1;
  } else {
    // Fallback: leader (President or Manager without "vice") on the left, vice on the right
    const isM1Leader = role1.toLowerCase().includes("president") || (role1.toLowerCase().includes("manager") && !role1.toLowerCase().includes("vice"));
    const isM2Leader = role2.toLowerCase().includes("president") || (role2.toLowerCase().includes("manager") && !role2.toLowerCase().includes("vice"));

    if (isM1Leader && !isM2Leader) {
      leftMember = member1;
      leftRole = role1;
      rightMember = member2;
      rightRole = role2;
    } else if (isM2Leader && !isM1Leader) {
      leftMember = member2;
      leftRole = role2;
      rightMember = member1;
      rightRole = role1;
    }
  }

  const sharedImage = leftMember.image || rightMember.image;
  const imageUrl = sharedImage ? urlFor(sharedImage) : "";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-bg-card)]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-bg-card)]/75 flex flex-col h-full shadow-md sm:col-span-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20 border-b border-white/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${leftMember.name} and ${rightMember.name}`}
            fill
            unoptimized
            style={{ objectPosition: "center 38%" }}
            sizes="(max-width: 640px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent.bg}`}>
            <span className="text-3xl font-black select-none transition-transform duration-300 group-hover:scale-110">
              {getInitials(leftMember.name)} + {getInitials(rightMember.name)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-end gap-3 sm:gap-4 mt-auto">
        {/* Left Side */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <h4 className="font-bold text-white text-sm sm:text-base leading-tight break-words">
            {leftMember.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400">
            {leftRole}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-0.5 sm:items-end sm:text-right min-w-0">
          <h4 className="font-bold text-white text-sm sm:text-base leading-tight break-words">
            {rightMember.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400">
            {rightRole}
          </p>
        </div>
      </div>
    </div>
  );
}

function TrioCard({
  member1,
  role1,
  member2,
  role2,
  member3,
  role3,
  category,
}: {
  member1: PersonRef;
  role1: string;
  member2: PersonRef;
  role2: string;
  member3: PersonRef;
  role3: string;
  category: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations";
}) {
  const accent = ACCENT_COLORS[category] || ACCENT_COLORS["Executive Board"];

  const members = [
    { m: member1, r: role1 },
    { m: member2, r: role2 },
    { m: member3, r: role3 },
  ];

  let left = members[0];
  let center = members[1];
  let right = members[2];

  const leftItem = members.find((x) => x.m.trioPosition === "left");
  const centerItem = members.find((x) => x.m.trioPosition === "center");
  const rightItem = members.find((x) => x.m.trioPosition === "right");

  const usedIndices = new Set<number>();
  if (leftItem) {
    left = leftItem;
    usedIndices.add(members.indexOf(leftItem));
  }
  if (centerItem) {
    center = centerItem;
    usedIndices.add(members.indexOf(centerItem));
  }
  if (rightItem) {
    right = rightItem;
    usedIndices.add(members.indexOf(rightItem));
  }

  const remaining = members.filter((_, idx) => !usedIndices.has(idx));

  // Smart fallback sorting: if no positions are set and there's a primary leader, put them in the center
  if (remaining.length === 3) {
    const isLeader = (role: string) => {
      const r = role.toLowerCase();
      return (r.includes("president") || r.includes("manager")) && !r.includes("vice");
    };
    const leaderIndex = members.findIndex((x) => isLeader(x.r));
    if (leaderIndex !== -1) {
      center = members[leaderIndex];
      const others = members.filter((_, idx) => idx !== leaderIndex);
      left = others[0];
      right = others[1];
    } else {
      left = members[0];
      center = members[1];
      right = members[2];
    }
  } else {
    if (!leftItem && remaining.length > 0) {
      left = remaining.shift()!;
    }
    if (!centerItem && remaining.length > 0) {
      center = remaining.shift()!;
    }
    if (!rightItem && remaining.length > 0) {
      right = remaining.shift()!;
    }
  }

  const sharedImage = left.m.image || center.m.image || right.m.image;
  const imageUrl = sharedImage ? urlFor(sharedImage) : "";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-bg-card)]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-bg-card)]/75 flex flex-col h-full shadow-md sm:col-span-2 md:col-span-3">
      <div className="relative aspect-[16/10] sm:aspect-[2.1/1] w-full overflow-hidden bg-black/20 border-b border-white/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${left.m.name}, ${center.m.name}, and ${right.m.name}`}
            fill
            unoptimized
            style={{ objectPosition: "center 38%" }}
            sizes="(max-width: 640px) 100vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent.bg}`}>
            <span className="text-3xl font-black select-none transition-transform duration-300 group-hover:scale-110">
              {getInitials(left.m.name)} + {getInitials(center.m.name)} + {getInitials(right.m.name)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-2 mt-auto">
        {/* Left Side */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <h4 className="font-bold text-white text-sm sm:text-base leading-tight break-words">
            {left.m.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400">
            {left.r}
          </p>
        </div>

        {/* Center Side */}
        <div className="flex flex-col gap-0.5 sm:items-center sm:text-center min-w-0">
          <h4 className="font-bold text-white text-sm sm:text-base leading-tight break-words w-full">
            {center.m.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400">
            {center.r}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-0.5 sm:items-end sm:text-right min-w-0">
          <h4 className="font-bold text-white text-sm sm:text-base leading-tight break-words w-full">
            {right.m.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400">
            {right.r}
          </p>
        </div>
      </div>
    </div>
  );
}

function RenderGrid({ items }: { items: RenderItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => {
        if (item.kind === "duo") {
          return (
            <DuoCard
              key={item.id}
              member1={item.member1}
              role1={item.role1}
              member2={item.member2}
              role2={item.role2}
              category={item.category}
            />
          );
        } else if (item.kind === "trio") {
          return (
            <TrioCard
              key={item.id}
              member1={item.member1}
              role1={item.role1}
              member2={item.member2}
              role2={item.role2}
              member3={item.member3}
              role3={item.role3}
              category={item.category}
            />
          );
        } else {
          return <MemberCard key={item.member.id} member={item.member} />;
        }
      })}
    </div>
  );
}

/* ── Section Components ─────────────────────────────────────────── */
function ExecutiveBoardSection({ config }: { config: TeamConfigData }) {
  const entries = [
    config.president && { member: config.president, role: "President" },
    config.vicePresident && { member: config.vicePresident, role: "Vice President" },
    config.secretary && { member: config.secretary, role: "Secretary" },
    config.vicesecretary && { member: config.vicesecretary, role: "Vice Secretary" },
    config.treasurer && { member: config.treasurer, role: "Treasurer" },
    config.vicetreasurer && { member: config.vicetreasurer, role: "Vice Treasurer" },
  ].filter(Boolean) as Array<{ member: PersonRef; role: string }>;

  const items = buildRenderItems(entries, "Executive Board");

  const presVpItems = items.filter(
    (item) =>
      item.kind === "duo" ||
      item.kind === "trio" ||
      (item.kind === "solo" && item.member.role.toLowerCase().includes("president"))
  );
  const otherItems = items.filter((item) => !presVpItems.includes(item));

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-amber-500 pl-4 py-1">
        <h3 className="text-xl font-black text-white uppercase">
          Executive Board
        </h3>
      </div>
      
      {/* President & Vice President Duo/Trio Card Row */}
      {presVpItems.length > 0 && (
        <RenderGrid items={presVpItems} />
      )}

      {/* Secretary, Treasurer, etc. below */}
      {otherItems.length > 0 && (
        <RenderGrid items={otherItems} />
      )}
    </div>
  );
}

function CorridorDirectorsSection({ config }: { config: TeamConfigData }) {
  const directors = [
    { name: config.directorInternalOps?.name, image: config.directorInternalOps?.image, role: "Director of Internal Operations", corridor: "Internal Operations" },
    { name: config.directorEduDev?.name, image: config.directorEduDev?.image, role: "Director of Education and Development", corridor: "Education and Development" },
    { name: config.directorPublicRelations?.name, image: config.directorPublicRelations?.image, role: "Director of Public Relations", corridor: "Public Relations" },
  ].filter((d) => d.name) as Array<{ name: string; image?: SanityImage; role: string; corridor: string }>;

  const items = directors.map((dir, idx) => {
    let category: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations" = "Executive Board";
    if (dir.corridor === "Internal Operations") category = "Internal Operations";
    else if (dir.corridor === "Education and Development") category = "Education & Dev";
    else if (dir.corridor === "Public Relations") category = "Public Relations";

    return {
      kind: "solo" as const,
      member: {
        id: `dir-${idx}`,
        name: dir.name,
        role: dir.role,
        image: dir.image,
        category,
        order: idx,
      },
    };
  });

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-amber-500 pl-4 py-1">
        <h3 className="text-xl font-black text-white uppercase">
          Board of Directors
        </h3>
      </div>
      <RenderGrid items={items} />
    </div>
  );
}

function CorridorSection({
  corridorName,
  config,
  divisions,
}: {
  corridorName: "Internal Operations" | "Education and Development" | "Public Relations";
  config: TeamConfigData;
  divisions: DivisionData[];
}) {
  let categoryKey: "Executive Board" | "Internal Operations" | "Education & Dev" | "Public Relations" = "Internal Operations";
  if (corridorName === "Education and Development") categoryKey = "Education & Dev";
  else if (corridorName === "Public Relations") categoryKey = "Public Relations";

  const accent = ACCENT_COLORS[corridorName];

  let director: PersonRef | undefined;
  if (corridorName === "Internal Operations") director = config.directorInternalOps;
  else if (corridorName === "Education and Development") director = config.directorEduDev;
  else if (corridorName === "Public Relations") director = config.directorPublicRelations;

  const corridorDivisions = divisions.filter((d) => d.corridor === corridorName);

  return (
    <div className="space-y-10">
      {/* Corridor Header */}
      <div className="border-l-4 pl-4 py-1" style={{ borderColor: accent.raw }}>
        <h3 className="text-2xl font-black text-white uppercase">
          {corridorName}
        </h3>
      </div>

      {/* Director */}
      {director && (
        <div className="space-y-4">
          <span className="text-[10px] font-extrabold uppercase text-gray-400 block">
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
          const managementEntries = [
            division.manager && { member: division.manager, role: "Manager" },
            ...(division.viceManagers || []).map((vm) => ({ member: vm, role: "Vice Manager" })),
          ].filter(Boolean) as Array<{ member: PersonRef; role: string }>;

          const managementItems = buildRenderItems(managementEntries, categoryKey);

          const staffEntries = (division.staff || []).map((staffMember) => ({
            member: staffMember,
            role: "Staff",
          }));

          const staffItems = buildRenderItems(staffEntries, categoryKey);

          return (
            <div
              key={division.abbreviation}
              className="bg-white/[0.015] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6"
            >
              {/* Division Title */}
              <div>
                <span className="text-[11px] font-extrabold uppercase" style={{ color: accent.raw }}>
                  {division.abbreviation}
                </span>
                <h4 className="text-xl font-black text-white mt-0.5 leading-snug">
                  {division.fullName}
                </h4>
              </div>

              {/* Management Grid */}
              {managementItems.length > 0 && (
                <div className="space-y-4">
                  <SectionDivider label="Management" />
                  <RenderGrid items={managementItems} />
                </div>
              )}

              {/* Staff Grid */}
              {staffItems.length > 0 && (
                <div className="space-y-4">
                  <SectionDivider label="Staff" colorClass="text-gray-400/80" />
                  <RenderGrid items={staffItems} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Client Wrapper Component ───────────────────────────────── */
export interface TeamsPageClientProps {
  config: TeamConfigData;
  divisions: DivisionData[];
}

export default function TeamsPageClient({ config, divisions }: TeamsPageClientProps) {
  const year = config.year || "2026";
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Executive Board", "Internal Operations", "Education & Dev", "Public Relations"];

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
                    className={`px-4 py-2.5 rounded-xl text-left text-xs font-bold uppercase transition-all duration-300 border ${
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
                <ExecutiveBoardSection config={config} />
                <CorridorSection corridorName="Internal Operations" config={config} divisions={divisions} />
                <CorridorSection corridorName="Education and Development" config={config} divisions={divisions} />
                <CorridorSection corridorName="Public Relations" config={config} divisions={divisions} />
              </>
            )}
            {activeFilter === "Executive Board" && (
              <>
                <ExecutiveBoardSection config={config} />
                <CorridorDirectorsSection config={config} />
              </>
            )}
            {activeFilter === "Internal Operations" && (
              <CorridorSection corridorName="Internal Operations" config={config} divisions={divisions} />
            )}
            {activeFilter === "Education & Dev" && (
              <CorridorSection corridorName="Education and Development" config={config} divisions={divisions} />
            )}
            {activeFilter === "Public Relations" && (
              <CorridorSection corridorName="Public Relations" config={config} divisions={divisions} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
