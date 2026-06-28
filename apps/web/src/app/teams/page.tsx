import { client } from "@/src/sanity/client";
import TeamsPageClient from "./TeamsPageClient";

// Revalidate once every 60 seconds (incremental static regeneration)
export const revalidate = 60;

// Query for TeamConfig for year 2026
const TEAM_CONFIG_QUERY = `*[_type == "teamConfig" && year == "2026"][0] {
  year,
  president-> { _id, name, image, photoType, duoPartner-> { _id, name, image } },
  vicePresident-> { _id, name, image, photoType, duoPartner-> { _id, name, image } },
  secretary-> { _id, name, image, photoType, duoPartner-> { _id, name, image } },
  vicesecretary-> { _id, name, image, photoType, duoPartner-> { _id, name, image } },
  treasurer-> { _id, name, image, photoType, duoPartner-> { _id, name, image } },
  vicetreasurer-> { _id, name, image, photoType, duoPartner-> { _id, name, image } },
  directorInternalOps-> { _id, name, image, photoType },
  directorEduDev-> { _id, name, image, photoType },
  directorPublicRelations-> { _id, name, image, photoType }
}`;

// Query for divisions
const DIVISIONS_QUERY = `*[_type == "division"] | order(order asc) {
  abbreviation,
  fullName,
  corridor,
  manager-> { _id, name, image, photoType },
  viceManager-> { _id, name, image, photoType },
  staff[]-> { _id, name, image, photoType }
}`;

export default async function TeamsPage() {
  let config: any = null;
  let divisions: any[] = [];

  try {
    const [fetchedConfig, fetchedDivisions] = await Promise.all([
      client.fetch(TEAM_CONFIG_QUERY),
      client.fetch(DIVISIONS_QUERY),
    ]);
    config = fetchedConfig;
    divisions = fetchedDivisions;
  } catch (error) {
    console.error("Failed to fetch teams data from Sanity, using mock fallback:", error);
  }

  // Fallback if no config or divisions found in Sanity
  if (!config) {
    config = {
      year: "2026",
      president: { name: "Ahmad Rizky Pratama" },
      vicePresident: { name: "Dewi Nuraini" },
      secretary: { name: "Siti Putri Rahayu" },
      vicesecretary: null,
      treasurer: { name: "Fariz Hakim" },
      vicetreasurer: null,
      directorInternalOps: { name: "Bagas Wicaksono" },
      directorEduDev: { name: "Kirana Maharani" },
      directorPublicRelations: { name: "Nadia Rachma" },
    };
  }

  if (!divisions || divisions.length === 0) {
    divisions = [
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
  }

  return <TeamsPageClient config={config} divisions={divisions} />;
}