import { client } from "@/src/sanity/client";
import TeamsPageClient from "./TeamsPageClient";

// Revalidate once every 60 seconds (incremental static regeneration)
export const revalidate = 60;

// Query for TeamConfig for year 2026
const TEAM_CONFIG_QUERY = `*[_type == "teamConfig" && year == "2026"][0] {
  year,
  president-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  vicePresident-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  secretary-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  vicesecretary-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  treasurer-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  vicetreasurer-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  directorInternalOps-> { _id, name, image, photoType, isLeftInDuo },
  directorEduDev-> { _id, name, image, photoType, isLeftInDuo },
  directorPublicRelations-> { _id, name, image, photoType, isLeftInDuo }
}`;

// Query for divisions
const DIVISIONS_QUERY = `*[_type == "division"] | order(order asc) {
  abbreviation,
  fullName,
  corridor,
  manager-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  viceManager-> { _id, name, image, photoType, isLeftInDuo, duoPartner-> { _id, name, image, isLeftInDuo } },
  staff[]-> { _id, name, image, photoType, isLeftInDuo }
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

  // Safe fallback if no config or divisions found in Sanity
  if (!config) {
    config = {
      year: new Date().getFullYear().toString(),
    };
  }

  return <TeamsPageClient config={config} divisions={divisions || []} />;
}