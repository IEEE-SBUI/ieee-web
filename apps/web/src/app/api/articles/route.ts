import { NextResponse } from "next/server";
import { client } from "@/src/sanity/client";

interface SanityArticle {
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  mainImage: any;
  body: any[] | null;
  authorName: string;
  categories: string[];
}

/**
 * Fetches articles and categories from Sanity for the blog page.
 *
 * This route runs on the server so the frontend does not need direct access
 * to Sanity. It also lets us fetch articles and categories in a single request,
 * reducing the number of API calls made by the client.
 *
 * @returns A JSON response containing articles and category names.
 */
export async function GET() {
  try {
    const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      summary,
      mainImage,
      body,
      "authorName": author->name,
      "categories": categories[]->title
    }`;

    const categoriesQuery = `*[_type == "category"] | order(title asc) { title }`;

    // Articles and categories are independent, so fetching them in parallel
    // reduces the total response time compared to sequential requests.
    const [articlesData, categoriesData] = await Promise.all([
      client.fetch<SanityArticle[]>(articlesQuery),
      client.fetch<{ title: string }[]>(categoriesQuery),
    ]);

    return NextResponse.json({
      articles: articlesData || [],
      categories: (categoriesData || []).map((c) => c.title),
    });
  } catch (error) {
    // Log the original error on the server for debugging, but return a
    // generic message to avoid exposing internal implementation details.
    console.error("Server-side error fetching data from Sanity CMS:", error);

    return NextResponse.json(
      { error: "Failed to load articles from Sanity CMS" },
      { status: 500 }
    );
  }
}