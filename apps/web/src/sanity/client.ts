import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jy3bnomi",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2026-05-15",
    useCdn: false,
});

const builder = createImageUrlBuilder(client);
export function urlFor(source: any) {
  if (!source || !source.asset || !source.asset._ref) return "";
  return builder.image(source).url();
}