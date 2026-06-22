"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, BookOpen, AlertCircle } from "lucide-react";
import { client, urlFor } from "@/src/sanity/client";
import Button from "@/src/components/Button";
import ArticleCard from "@/src/features/articles/components/ArticleCard";
import DropdownFilter from "@/src/components/DropdownFilter";
import PageHeader from "@/src/components/PageHeader";
import { formatDate, calculateRichTextReadTime } from "@/src/lib/utils";

interface SanityArticle {
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  mainImage: any;
  body?: any[] | null;
  authorName: string;
  categories: string[];
}

/**
 * Displays the article archive page.
 *
 * Articles and categories are loaded once when the page mounts. Search and
 * filtering are performed client-side to provide instant feedback without
 * making additional requests to the CMS.
 */
export default function ArticlesPage() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter and search state
  const [articleSearch, setArticleSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  // Fetch through a local API route so the client does not need direct access
  // to Sanity configuration or query logic.
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setArticles(data.articles || []);
        setCategories(data.categories || []);
        setLoading(false);
      } catch (err) {
        // Keep the original error in the console to make debugging easier while
        // showing a user-friendly message in the UI.
        console.error("Failed to load articles from local CMS proxy:", err);
        setError(true);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // A category can be selected and deselected without clearing other filters.
  const handleCategoryToggle = (categoryTitle: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryTitle)
        ? prev.filter((c) => c !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  // Extract unique years from publishedAt dates in articles
  const yearsList = Array.from(
    new Set(
      articles
        .map((art) => (art.publishedAt ? new Date(art.publishedAt).getFullYear().toString() : ""))
        .filter((y) => y !== "")
    )
  ).sort((a, b) => b.localeCompare(a));

  // Apply all active filters together so users can combine search, category,
  // and publication year criteria.
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      article.categories?.some((cat) => selectedCategories.includes(cat));

    const matchesSearch = article.title
      .toLowerCase()
      .includes(articleSearch.toLowerCase());

    const articleYear = article.publishedAt
      ? new Date(article.publishedAt).getFullYear().toString()
      : "";
    const matchesYear =
      selectedYears.length === 0 || selectedYears.includes(articleYear);

    return matchesCategory && matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      
      {/* ── Full-Width Page Header Section ── */}
      <PageHeader
        title="Articles Archive"
        description="Explore publications authored by members of IEEE Student Branch Universitas Indonesia."
      />

      {/* ── Page Content Container ── */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-16">
        
        {/* ── Loader & Error States ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-accent-teal)]" />
            <p className="text-sm text-[var(--color-text-muted)]">Loading archive content...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#0C1517] border border-[rgba(255,255,255,0.06)] rounded-2xl">
            <AlertCircle className="text-red-500 mb-4 h-12 w-12" />
            <h3 className="text-lg font-bold text-white mb-2">CMS Connection Offline</h3>
            <p className="max-w-md text-sm text-[var(--color-text-muted)] mb-6">
              We are unable to connect to the content lake right now. Please verify your internet connection or check back later.
            </p>
            <Button variant="primary" filled={true} onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Search and Filters Container (Removed Box Border & Background) ── */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
              
              {/* Main Search Input */}
              <div className="relative flex-1 max-w-xl">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search articles by title..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="w-full bg-[#121214] border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[var(--color-accent-teal)] transition-all duration-300"
                />
              </div>

              {/* Collapsible Dropdowns Container */}
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                
                <DropdownFilter
                  label="Filter by category"
                  title="Categories"
                  items={categories.map((cat) => ({
                    id: cat,
                    label: cat,
                    count: articles.filter((art) => art.categories?.includes(cat)).length,
                  }))}
                  selectedItems={selectedCategories}
                  onToggle={handleCategoryToggle}
                  onClear={() => setSelectedCategories([])}
                  searchPlaceholder="Search categories..."
                  dropdownWidth="sm:w-[280px]"
                />

                <DropdownFilter
                  label="Filter by year"
                  title="Publication Year"
                  items={yearsList.map((year) => ({
                    id: year,
                    label: year,
                    count: articles.filter(
                      (art) =>
                        art.publishedAt &&
                        new Date(art.publishedAt).getFullYear().toString() === year
                    ).length,
                  }))}
                  selectedItems={selectedYears}
                  onToggle={(year) => {
                    setSelectedYears((prev) =>
                      prev.includes(year)
                        ? prev.filter((y) => y !== year)
                        : [...prev, year]
                    );
                  }}
                  onClear={() => setSelectedYears([])}
                  dropdownWidth="sm:w-[220px]"
                />

              </div>
            </div>

            {/* ── Articles Grid ── */}
            {filteredArticles.length > 0 ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => {
                  const imageUrl = urlFor(article.mainImage) || undefined;
                  return (
                    <ArticleCard
                      key={article.slug.current}
                      href={`/articles/${article.slug.current}`}
                      imageUrl={imageUrl}
                      categories={article.categories?.map((cat) => ({
                        label: cat,
                        // Article cards expect a corridor value for badge styling, but articles
                        // do not currently store corridor information in the CMS.
                        corridor: "Internal Operations",
                      })) || []}
                      title={article.title}
                      excerpt={article.summary}
                      date={formatDate(article.publishedAt, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      author={article.authorName}
                      readTimeMinutes={calculateRichTextReadTime(article.body)}
                    />
                  );
                })}
              </section>
            ) : (
              /* Empty State fallbacks */
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#0C1517] border border-[rgba(255,255,255,0.06)] rounded-2xl">
                <span className="p-4 rounded-full bg-white/5 text-white/40 mb-4">
                  <BookOpen size={36} />
                </span>
                <h3 className="text-lg font-bold text-white mb-2">No Articles Found</h3>
                <p className="max-w-md text-sm text-[var(--color-text-muted)] mb-6">
                  {articles.length === 0
                    ? "No articles have been published yet. Please check back later."
                    : "No articles found matching your criteria."}
                </p>
                {articles.length > 0 && (
                  <Button
                    variant="primary"
                    filled={true}
                    onClick={() => {
                      setArticleSearch("");
                      setSelectedCategories([]);
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
