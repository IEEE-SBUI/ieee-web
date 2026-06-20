import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/src/sanity/client";

const builder = createImageUrlBuilder(client);

/**
 * Build an image URL from a Sanity image source (e.g. an article `mainImage`).
 *
 * Returns the image-url builder so callers can chain sizing/cropping, e.g.
 * `urlFor(mainImage).width(800).height(500).fit("crop").url()`.
 *
 * Callers are responsible for handling a missing image (this expects a
 * non-null source).
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
