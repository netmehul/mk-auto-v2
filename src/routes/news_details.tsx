import { useEffect, useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SiteFooter } from "@/components/mka/SiteFooter";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { RevealGroup, RevealItem } from "@/components/mka/Reveal";
import { NewsHeaderBand } from '@/components/mka/news/NewsHeaderBand';
import { fetchPostBySlug, getPostExternalLink, getPostThumbnailUrl, type PostItem } from '@/lib/posts';
import { ArrowLeft, RefreshCw, Calendar, Tag, AlertCircle, ExternalLink } from 'lucide-react';
import newsPlaceholder from "@/assets/news-1.jpg";

interface NewsDetailsSearch {
  slug?: string | undefined;
}

export const Route = createFileRoute('/news_details')({
  validateSearch: (search: Record<string, unknown>): NewsDetailsSearch => {
    const rawSlug = search["slug"];
    return {
      slug: typeof rawSlug === 'string' && rawSlug.trim() !== '' ? rawSlug.trim() : undefined,
    };
  },
  component: NewsDetails,
});

const DEFAULT_FALLBACK_SLUG = "mka-strengthens-its-nationwide-showroom-network";

interface TocItem {
  id: string;
  label: string;
}

function processArticleContent(rawHtml?: string | null): {
  toc: TocItem[];
  processedHtml: string;
} {
  if (!rawHtml || typeof rawHtml !== "string") {
    return { toc: [], processedHtml: "" };
  }

  // Strip empty paragraphs
  const trimmed = rawHtml.trim();
  if (
    trimmed === "" ||
    trimmed === "<p></p>" ||
    trimmed === "<p><br></p>" ||
    trimmed === "<p><br/></p>" ||
    trimmed === "<p>&nbsp;</p>"
  ) {
    return { toc: [], processedHtml: "" };
  }

  const toc: TocItem[] = [];
  let headingCount = 0;

  // Replace <h2> tags to ensure they have unique IDs and capture label
  const processedHtml = rawHtml.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, innerText) => {
    const cleanLabel = innerText.replace(/<[^>]*>?/gm, "").trim();
    if (!cleanLabel) return match;

    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    let headingId = idMatch ? idMatch[1] : "";

    if (!headingId) {
      headingCount++;
      headingId =
        cleanLabel
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || `section-${headingCount}`;

      toc.push({ id: headingId, label: cleanLabel });
      return `<h2 id="${headingId}" ${attrs}>${innerText}</h2>`;
    } else {
      toc.push({ id: headingId, label: cleanLabel });
      return match;
    }
  });

  return { toc, processedHtml };
}

function NewsDetails() {
  const search = Route.useSearch();
  const targetSlug = search.slug || DEFAULT_FALLBACK_SLUG;

  const [post, setPost] = useState<PostItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = async (slugToFetch: string, signal?: AbortSignal | undefined) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPostBySlug(slugToFetch, signal ? { signal } : undefined);
      setPost(data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Failed to load article:", err);
        setError(err.message || "Unable to load article. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadPost(targetSlug, controller.signal);

    return () => {
      controller.abort();
    };
  }, [targetSlug]);

  const { toc, processedHtml } = useMemo(() => {
    return processArticleContent(post?.content);
  }, [post?.content]);

  const imageUrl = getPostThumbnailUrl(post?.thumbnail_url) || newsPlaceholder;

  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <SiteHeader />
      <NewsHeaderBand />

      <main className="flex-1 bg-off-white">
        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="section-y">
            <div className="shell max-w-5xl mx-auto space-y-8 animate-pulse">
              <div className="h-4 w-48 bg-grey-200 rounded" />
              <div className="flex gap-4 items-center">
                <div className="h-4 w-24 bg-grey-200 rounded" />
                <div className="h-4 w-32 bg-grey-100 rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-12 w-full bg-grey-200 rounded" />
                <div className="h-12 w-4/5 bg-grey-200 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-grey-100 rounded" />
              <div className="aspect-[16/8] w-full bg-grey-200 rounded-sm mt-10" />
              <div className="space-y-4 pt-10">
                <div className="h-4 w-full bg-grey-100 rounded" />
                <div className="h-4 w-full bg-grey-100 rounded" />
                <div className="h-4 w-5/6 bg-grey-100 rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="section-y">
            <div className="shell max-w-2xl mx-auto text-center">
              <div className="rounded-lg border border-red-200/60 bg-red-50/60 p-10 md:p-14 shadow-sm">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-display text-navy-900 mb-3">Unable to Load Article</h2>
                <p className="text-grey-500 text-sm leading-relaxed mb-8">{error}</p>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <button
                    type="button"
                    onClick={() => loadPost(targetSlug)}
                    className="inline-flex items-center gap-2 rounded-sm bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-gold hover:text-navy-900"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retry
                  </button>
                  <a
                    href="/news_insights"
                    className="inline-flex items-center gap-2 rounded-sm border border-grey-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-900 transition hover:bg-grey-100"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    All Articles
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Detail Content */}
        {!isLoading && !error && post && (
          <>
            {/* ARTICLE HEADER */}
            <section className="section-y pb-0">
              <div className="shell">
                <RevealGroup className="mx-auto max-w-5xl">
                  {/* Breadcrumb */}
                  <RevealItem>
                    <nav
                      aria-label="Breadcrumb"
                      className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-grey-500"
                    >
                      <a href="/" className="transition-colors duration-300 hover:text-navy-900">
                        Home
                      </a>
                      <span aria-hidden="true">/</span>
                      <a href="/news_insights" className="transition-colors duration-300 hover:text-navy-900">
                        News & Insights
                      </a>
                      <span aria-hidden="true">/</span>
                      <span className="text-grey-400 truncate max-w-[200px] sm:max-w-[300px]">
                        {post.title}
                      </span>
                    </nav>
                  </RevealItem>

                  {/* Category + Date */}
                  <RevealItem>
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      {post.category && (
                        <>
                          <span className="eyebrow inline-flex items-center gap-1.5 text-gold font-semibold">
                            <Tag className="w-3 h-3" />
                            {post.category}
                          </span>
                          <span className="h-px w-6 bg-grey-200" />
                        </>
                      )}
                      {(post.published_at || post.created_at) && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-grey-500">
                          <Calendar className="w-3.5 h-3.5 text-grey-400" />
                          {post.published_at || post.created_at}
                        </span>
                      )}
                    </div>
                  </RevealItem>

                  {/* Heading */}
                  <RevealItem>
                    <h1 className="mt-6 max-w-5xl text-3xl leading-[1.1] tracking-[-0.025em] text-navy-900 sm:text-4xl lg:text-5xl">
                      {post.title}
                    </h1>
                  </RevealItem>

                  {/* Intro / Short Content */}
                  {post.short_content && (
                    <RevealItem>
                      <p className="mt-7 max-w-3xl text-base leading-[1.75] text-grey-500 sm:text-lg">
                        {post.short_content}
                      </p>
                    </RevealItem>
                  )}
                </RevealGroup>

                {/* FEATURE IMAGE */}
                <RevealGroup className="mt-12 lg:mt-16">
                  <RevealItem>
                    <div className="overflow-hidden bg-navy-900/5 rounded-sm">
                      <img
                        src={imageUrl}
                        alt={post.title}
                        width={1920}
                        height={1080}
                        className="aspect-[16/8] w-full object-cover"
                      />
                    </div>
                  </RevealItem>
                </RevealGroup>
              </div>
            </section>

            {/* ARTICLE BODY */}
            <section className="pb-24 pt-16 lg:pb-32 lg:pt-24">
              <div className="shell">
                <div className={`grid gap-12 ${toc.length > 0 ? "lg:grid-cols-12 lg:gap-16" : "max-w-4xl mx-auto"}`}>
                  {/* TABLE OF CONTENTS (Rendered when headings exist) */}
                  {toc.length > 0 && (
                    <aside className="lg:col-span-3">
                      {/* Desktop TOC */}
                      <div className="sticky top-28 hidden lg:block">
                        <p className="eyebrow text-grey-500">Table of Contents</p>
                        <nav className="mt-5 border-l border-grey-200">
                          <ul className="space-y-1">
                            {toc.map((item) => (
                              <li key={item.id}>
                                <a
                                  href={`#${item.id}`}
                                  className="relative block border-l border-transparent py-2 pl-5 text-sm leading-relaxed text-grey-500 transition-all duration-300 hover:border-gold hover:text-navy-900"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>

                      {/* Mobile & Tablet TOC */}
                      <details className="group border-y border-grey-200 lg:hidden">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm font-medium uppercase tracking-[0.08em] text-navy-900">
                          <span>Table of Contents</span>
                          <span
                            aria-hidden="true"
                            className="text-lg leading-none transition-transform duration-300 group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <nav className="pb-5">
                          <ul className="space-y-1">
                            {toc.map((item) => (
                              <li key={item.id}>
                                <a
                                  href={`#${item.id}`}
                                  className="block py-2 text-sm leading-relaxed text-grey-500 transition-colors duration-300 hover:text-navy-900"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </details>
                    </aside>
                  )}

                  {/* ARTICLE CONTENT */}
                  <article className={toc.length > 0 ? "lg:col-span-8 lg:col-start-5" : "w-full"}>
                    <RevealGroup>
                      {/* External Link Callout if available */}
                      {getPostExternalLink(post) && (
                        <RevealItem>
                          <div className="mb-8 rounded border border-navy-900/10 bg-navy-900/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-navy-900">External Article</p>
                              <p className="text-xs text-grey-500 mt-0.5">This story was originally published on an external source.</p>
                            </div>
                            <a
                              href={getPostExternalLink(post)!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded bg-navy-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-gold hover:text-navy-900 shrink-0"
                            >
                              <span>Read External Article</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </RevealItem>
                      )}

                      {/* If HTML content is present, render it with article-content styling */}
                      {processedHtml ? (
                        <RevealItem>
                          <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: processedHtml }}
                          />
                        </RevealItem>
                      ) : (
                        /* Fallback when content is empty */
                        <RevealItem>
                          <div className="space-y-6 text-base sm:text-lg leading-[1.85] text-grey-500">
                            {post.short_content && (
                              <p className="text-lg sm:text-xl leading-[1.8] text-navy-900 font-normal">
                                {post.short_content}
                              </p>
                            )}
                          </div>
                        </RevealItem>
                      )}

                      {/* Keywords / Tags if present */}
                      {post.meta_keywords && (
                        <RevealItem>
                          <div className="mt-12 pt-6 border-t border-grey-200 flex flex-wrap items-center gap-2">
                            <span className="text-xs uppercase tracking-wider text-grey-400 mr-2">Keywords:</span>
                            {(Array.isArray(post.meta_keywords)
                              ? post.meta_keywords
                              : String(post.meta_keywords).split(",")
                            ).map((tag, idx) => {
                              const trimmedTag = tag.trim();
                              if (!trimmedTag) return null;
                              return (
                                <span
                                  key={idx}
                                  className="inline-block bg-navy-900/5 px-3 py-1 text-xs text-navy-900 rounded-sm"
                                >
                                  #{trimmedTag}
                                </span>
                              );
                            })}
                          </div>
                        </RevealItem>
                      )}

                      {/* ARTICLE FOOTER / BACK LINK */}
                      <RevealItem>
                        <div className="mt-16 border-t border-grey-200 pt-8">
                          <a
                            href="/news_insights"
                            className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.06em] text-navy-900 transition-colors duration-300 hover:text-gold"
                          >
                            <span className="transition-transform duration-300 group-hover:-translate-x-1">
                              ←
                            </span>
                            Back to News & Insights
                          </a>
                        </div>
                      </RevealItem>
                    </RevealGroup>
                  </article>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}