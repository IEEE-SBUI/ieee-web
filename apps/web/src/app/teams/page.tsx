import Image from "next/image";
import { client } from "@/src/sanity/client";
import { urlFor } from "@/src/sanity/imageUrl";
import { Corridor, CORRIDOR_COLORS } from "@/src/lib/tokens";
import PageHeader from "@/src/components/PageHeader";

export const revalidate = 60;

/* ── Types ─────────────────────────────────────────────────────── */

interface SanityImage {
  asset?: { _ref?: string };
  alt?: string;
}

interface PersonRef {
  _id?: string;
  name: string;
  image?: SanityImage;
  /** Only present on exec-board members fetched with photoType. */
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
  corridor: Corridor;
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

/* ── Queries ────────────────────────────────────────────────────── */

// Exec board members include _id, photoType, and duoPartner so the page
// can group pairs into a single landscape duo card.
const CONFIG_QUERY = `*[_type == "teamConfig" && year == $year][0]{
  year,
  president->{ _id, name, image, photoType, duoPartner->{ _id, name, image } },
  vicePresident->{ _id, name, image, photoType, duoPartner->{ _id, name, image } },
  secretary->{ _id, name, image, photoType, duoPartner->{ _id, name, image } },
  treasurer->{ _id, name, image, photoType, duoPartner->{ _id, name, image } },
  directorInternalOps->{ _id, name, image },
  directorEduDev->{ _id, name, image },
  directorPublicRelations->{ _id, name, image }
}`;

const DIVISIONS_QUERY = `*[_type == "division"] | order(order asc) {
  abbreviation,
  fullName,
  corridor,
  manager->{ name, image },
  viceManager->{ name, image },
  staff[]->{ name, image }
}`;

/* ── Corridor order ─────────────────────────────────────────────── */

const CORRIDORS: Corridor[] = [
  "Internal Operations",
  "Education and Development",
  "Public Relations",
];

/* ── Helpers ────────────────────────────────────────────────────── */

function buildImageUrl(
  image: SanityImage | undefined,
  displayW: number,
  displayH: number
): string | null {
  if (!image?.asset?._ref) return null;
  try {
    return urlFor(image as Parameters<typeof urlFor>[0])
      .width(displayW * 2)
      .height(displayH * 2)
      .fit("crop")
      .url();
  } catch {
    return null;
  }
}

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ── Exec board slot grouping ───────────────────────────────────── */

type ExecEntry = { member: PersonRef | undefined; role: string };

type DisplaySlot =
  | { kind: "solo"; member: PersonRef; role: string }
  | {
      kind: "duo";
      primary: PersonRef;
      primaryRole: string;
      partner: { _id: string; name: string; image?: SanityImage };
      partnerRole: string;
    };

/**
 * Groups exec board entries into solo/duo display slots.
 * Members who appear as someone's duoPartner are consumed by that duo card
 * and skipped in their own position.
 */
function buildExecSlots(entries: ExecEntry[]): DisplaySlot[] {
  // Collect IDs that are already displayed inside a duo card.
  const partnerIds = new Set<string>();
  for (const { member } of entries) {
    if (member?._id && member.photoType === "duo" && member.duoPartner?._id) {
      partnerIds.add(member.duoPartner._id);
    }
  }

  // _id → role so we can label the partner inside a duo card.
  const idToRole = new Map<string, string>(
    entries
      .filter((e) => e.member?._id)
      .map(({ member, role }) => [member!._id!, role])
  );

  const slots: DisplaySlot[] = [];
  for (const { member, role } of entries) {
    if (!member) continue;
    if (member._id && partnerIds.has(member._id)) continue;

    if (member.photoType === "duo" && member.duoPartner?._id) {
      slots.push({
        kind: "duo",
        primary: member,
        primaryRole: role,
        partner: member.duoPartner,
        partnerRole: idToRole.get(member.duoPartner._id) ?? "",
      });
    } else {
      slots.push({ kind: "solo", member, role });
    }
  }
  return slots;
}

/* ── Photo components ───────────────────────────────────────────── */

/**
 * Portrait card (2:3) for a single exec board member.
 * Math: at 192 px wide in a 4-col grid, photo is 192 × 288 px.
 */
function SoloCard({ member, role }: { member: PersonRef; role: string }) {
  const src = buildImageUrl(member.image, 192, 288);
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--hover-border-color)]"
      style={{ "--hover-border-color": "rgba(28,225,164,0.4)" } as React.CSSProperties}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 200px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: "rgba(28,225,164,0.08)" }}
          >
            <span className="text-4xl font-black text-white/20">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>
      <div className="px-4 py-3 text-center">
        <p className="font-bold text-white text-sm leading-snug">{member.name}</p>
        <p className="mt-0.5 text-xs font-semibold tracking-wide text-[var(--color-accent-teal)]">
          {role}
        </p>
      </div>
    </div>
  );
}

/**
 * Landscape duo card (4:3) for two exec members sharing one group photo.
 * At 4:3 with width = 2 × SoloCard width, the photo height matches the
 * solo card photo height (288 px), keeping grid rows uniform.
 */
function DuoCard({
  primary,
  primaryRole,
  partner,
  partnerRole,
}: {
  primary: PersonRef;
  primaryRole: string;
  partner: { _id: string; name: string; image?: SanityImage };
  partnerRole: string;
}) {
  const src = buildImageUrl(primary.image, 400, 300);
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--hover-border-color)]"
      style={{ "--hover-border-color": "rgba(28,225,164,0.4)" } as React.CSSProperties}
    >
      {/* Wide 4:3 landscape photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={`${primary.name} and ${partner.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center gap-4"
            style={{ background: "rgba(28,225,164,0.08)" }}
          >
            <span className="text-4xl font-black text-white/20">
              {getInitials(primary.name)}
            </span>
            <span className="text-2xl text-white/10">/</span>
            <span className="text-4xl font-black text-white/20">
              {getInitials(partner.name)}
            </span>
          </div>
        )}
      </div>

      {/* Two name + role blocks side by side */}
      <div className="flex divide-x divide-white/10">
        <div className="flex-1 px-4 py-3 text-center">
          <p className="font-bold text-white text-sm leading-snug">{primary.name}</p>
          <p className="mt-0.5 text-xs font-semibold tracking-wide text-[var(--color-accent-teal)]">
            {primaryRole}
          </p>
        </div>
        <div className="flex-1 px-4 py-3 text-center">
          <p className="font-bold text-white text-sm leading-snug">{partner.name}</p>
          <p className="mt-0.5 text-xs font-semibold tracking-wide text-[var(--color-accent-teal)]">
            {partnerRole}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Small rectangular thumbnail. Used for Director, Manager, Vice Manager,
 * and Staff rows. Replaces the circular avatar.
 */
function Thumb({
  image,
  name,
  size,
  accentColor,
}: {
  image?: SanityImage;
  name?: string;
  size: number;
  accentColor?: string;
}) {
  const src = buildImageUrl(image, size, size);
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "Member"}
        width={size}
        height={size}
        className="rounded-lg object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, Math.floor(size * 0.35)),
        background: accentColor ? `${accentColor}33` : "rgba(255,255,255,0.08)",
      }}
    >
      {getInitials(name)}
    </div>
  );
}

/* ── BOD sub-components ─────────────────────────────────────────── */

function DirectorCard({
  member,
  role,
  accentColor,
}: {
  member?: PersonRef;
  role: string;
  accentColor: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border bg-[var(--color-bg-card)] px-4 py-3"
      style={{ borderColor: `${accentColor}44` }}
    >
      <Thumb image={member?.image} name={member?.name} size={48} accentColor={accentColor} />
      <div className="min-w-0">
        <p className="font-bold text-white text-sm leading-snug truncate">
          {member?.name ?? "—"}
        </p>
        <p className="text-xs font-semibold tracking-wide" style={{ color: accentColor }}>
          {role}
        </p>
      </div>
    </div>
  );
}

function MemberRow({
  member,
  label,
  accentColor,
}: {
  member?: PersonRef;
  label: string;
  accentColor: string;
}) {
  if (!member) return null;
  return (
    <div className="flex items-center gap-2.5">
      <Thumb image={member.image} name={member.name} size={36} accentColor={accentColor} />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white leading-tight truncate">{member.name}</p>
        <p className="text-[11px] text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}

const STAFF_MAX = 6;

function StaffStrip({
  staff,
  accentColor,
}: {
  staff?: PersonRef[];
  accentColor: string;
}) {
  if (!staff || staff.length === 0) return null;
  const shown = staff.slice(0, STAFF_MAX);
  const overflow = staff.length - shown.length;
  return (
    <div className="flex items-end gap-2 flex-wrap">
      {shown.map((member, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <Thumb image={member.image} name={member.name} size={32} accentColor={accentColor} />
          <p className="text-[9px] text-[var(--color-text-muted)] text-center max-w-[38px] truncate leading-tight">
            {member.name.split(" ")[0]}
          </p>
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
          style={{ width: 32, height: 32, background: `${accentColor}33` }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

function DivisionCard({
  division,
  accentColor,
}: {
  division: DivisionData;
  accentColor: string;
}) {
  return (
    <div
      className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--hover-border-color)]"
      style={{ "--hover-border-color": `${accentColor}66` } as React.CSSProperties}
    >
      <div>
        <span
          className="block h-1.5 w-10 rounded-full mb-3"
          style={{ background: accentColor }}
          aria-hidden="true"
        />
        <span className="text-[11px] font-semibold tracking-wider" style={{ color: accentColor }}>
          {division.abbreviation}
        </span>
        <h4 className="text-white font-bold text-base leading-snug mt-0.5">
          {division.fullName}
        </h4>
      </div>

      {(division.manager || division.viceManager) && (
        <div className="flex flex-col gap-2.5 border-t border-[var(--color-border)] pt-3">
          <MemberRow member={division.manager} label="Manager" accentColor={accentColor} />
          <MemberRow member={division.viceManager} label="Vice Manager" accentColor={accentColor} />
        </div>
      )}

      {division.staff && division.staff.length > 0 && (
        <div className="border-t border-[var(--color-border)] pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            Staff
          </p>
          <StaffStrip staff={division.staff} accentColor={accentColor} />
        </div>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */

interface PageProps {
  searchParams: Promise<{ year?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { year: yearParam } = await searchParams;
  const year = yearParam || "2026";
  const displayYear = year.toLowerCase() === "others" ? "Archive" : year;
  return {
    title: `Team ${displayYear} | IEEE Student Branch Universitas Indonesia`,
    description: `Meet the talented individuals making up the IEEE Student Branch Universitas Indonesia executive board and division members for ${displayYear === "Archive" ? "past years" : displayYear}.`,
  };
}

export default async function TeamsPage({ searchParams }: PageProps) {
  const { year: yearParam } = await searchParams;
  const year = yearParam || "2026";
  const isOthers = year.toLowerCase() === "others";
  const displayYear = isOthers ? "Archive" : `Team ${year}`;

  let config: TeamConfigData | null = null;
  let divisions: DivisionData[] = [];

  if (!isOthers) {
    try {
      [config, divisions] = await Promise.all([
        client.fetch<TeamConfigData | null>(CONFIG_QUERY, { year }),
        client.fetch<DivisionData[]>(DIVISIONS_QUERY),
      ]);
      divisions = divisions ?? [];
    } catch (err) {
      console.error("Failed to fetch team data from Sanity:", err);
    }
  }

  const directorMap: Record<Corridor, PersonRef | undefined> = {
    "Internal Operations": config?.directorInternalOps,
    "Education and Development": config?.directorEduDev,
    "Public Relations": config?.directorPublicRelations,
  };

  const execSlots = config
    ? buildExecSlots([
        { member: config.president, role: "President" },
        { member: config.vicePresident, role: "Vice President" },
        { member: config.secretary, role: "Secretary" },
        { member: config.treasurer, role: "Treasurer" },
      ])
    : [];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <PageHeader
        title={displayYear}
        description={
          isOthers
            ? "Explore the IEEE Student Branch Universitas Indonesia committees from past years."
            : `Meet the talented individuals who make up the IEEE Student Branch Universitas Indonesia for ${year}.`
        }
      />

      <main className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-16 md:py-24">
        {isOthers || config === null ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl">
            <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-muted)]">
              {isOthers
                ? "Archive view coming soon."
                : `No committee data found for ${year}.`}
            </p>
          </div>
        ) : (
          <>
            {/* ── Executive Board ─────────────────────────── */}
            <section className="mb-20">
              <h2 className="text-white md:text-gradient pb-1 text-3xl font-bold leading-tight md:text-4xl mb-10">
                Executive Board
              </h2>

              {/*
                Grid: 2 cols on mobile → 4 cols on sm+.
                SoloCard  = col-span-1 (1 column).
                DuoCard   = col-span-2 (2 columns, same width as 2 solos).
                Because DuoCard uses aspect-[4/3] and SoloCard uses aspect-[2/3],
                both have the same photo height at any given card width.
              */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {execSlots.map((slot, i) =>
                  slot.kind === "duo" ? (
                    <div key={`duo-${i}`} className="col-span-2">
                      <DuoCard
                        primary={slot.primary}
                        primaryRole={slot.primaryRole}
                        partner={slot.partner}
                        partnerRole={slot.partnerRole}
                      />
                    </div>
                  ) : (
                    <SoloCard
                      key={slot.member._id ?? String(i)}
                      member={slot.member}
                      role={slot.role}
                    />
                  )
                )}
              </div>
            </section>

            {/* ── Board of Directors ──────────────────────── */}
            <section>
              <h2 className="text-white md:text-gradient pb-1 text-3xl font-bold leading-tight md:text-4xl mb-10">
                Board of Directors
              </h2>

              <div className="flex flex-col gap-8">
                {CORRIDORS.map((corridor) => {
                  const accentColor = CORRIDOR_COLORS[corridor];
                  const director = directorMap[corridor];
                  const corridorDivisions = divisions.filter(
                    (d) => d.corridor === corridor
                  );
                  const gridCols =
                    corridorDivisions.length <= 2
                      ? "md:grid-cols-2"
                      : "md:grid-cols-2 lg:grid-cols-3";

                  return (
                    <div
                      key={corridor}
                      className="rounded-2xl border border-[var(--color-border)] overflow-hidden"
                    >
                      <div
                        className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        style={{ background: `${accentColor}12` }}
                      >
                        <h3 className="text-xl font-bold" style={{ color: accentColor }}>
                          {corridor}
                        </h3>
                        {director && (
                          <DirectorCard
                            member={director}
                            role="Director"
                            accentColor={accentColor}
                          />
                        )}
                      </div>

                      <div className="p-6">
                        {corridorDivisions.length === 0 ? (
                          <p className="text-sm text-[var(--color-text-muted)]">
                            No divisions found.
                          </p>
                        ) : (
                          <div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
                            {corridorDivisions.map((div) => (
                              <DivisionCard
                                key={div.abbreviation}
                                division={div}
                                accentColor={accentColor}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
