import { client } from "@/src/sanity/client";
import ArticlesPageClient from "./ArticlesPageClient";

export const revalidate = 60;

export const metadata = {
  title: "Articles",
  description: "Explore publications and tech articles authored by members of IEEE Student Branch Universitas Indonesia.",
};

const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  summary,
  mainImage,
  body,
  "authorName": author->name,
  "categories": categories[]->title
}`;

const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) { title }`;

export default async function ArticlesPage() {
  let articles: any[] = [];
  let categories: string[] = [];

  try {
    const [articlesData, categoriesData] = await Promise.all([
      client.fetch<any[]>(ARTICLES_QUERY),
      client.fetch<{ title: string }[]>(CATEGORIES_QUERY),
    ]);
    articles = articlesData || [];
    categories = (categoriesData || []).map((c) => c.title);
  } catch (error) {
    console.error("Failed to fetch articles from Sanity CMS:", error);
  }

  return (
    <ArticlesPageClient
      initialArticles={articles}
      initialCategories={categories}
    />
  );
}
