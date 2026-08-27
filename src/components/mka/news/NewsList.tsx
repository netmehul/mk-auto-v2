import { useEffect, useRef, useState, useCallback } from "react";
import { RevealGroup, RevealItem } from "../Reveal";
import { fetchPosts, getPostLink, getPostThumbnailUrl, type PostItem } from "@/lib/posts";
import { Loader2 } from "lucide-react";

const PAGE_LIMIT = 6;

export function NewsList() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef<boolean>(false);

  // Fetch initial or specific page
  const loadPosts = useCallback(async (pageToLoad: number, isInitial: boolean = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (isInitial) {
      setIsLoading(true);
      setError(null);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const result = await fetchPosts({ page: pageToLoad, limit: PAGE_LIMIT });
      
      setPosts((prev) => {
        if (pageToLoad === 1) {
          return result.data || [];
        }
        // Deduplicate in case of duplicate IDs/slugs across pages
        const existingIds = new Set(prev.map((p) => p.id || p.slug || p.title));
        const newItems = (result.data || []).filter((p) => !existingIds.has(p.id || p.slug || p.title));
        return [...prev, ...newItems];
      });

      setCurrentPage(result.current_page);
      setLastPage(result.last_page);
    } catch (err: any) {
      console.error(`Error loading posts page ${pageToLoad}:`, err);
      if (isInitial) {
        setError(err.message || "Failed to load news articles. Please try again.");
      }
    } finally {
      if (isInitial) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
      isFetchingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadPosts(1, true);
  }, [loadPosts]);

  // Infinite Scroll Intersection Observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const hasMore = currentPage < lastPage;
    if (!hasMore || isLoading || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting && !isFetchingRef.current && currentPage < lastPage) {
          loadPosts(currentPage + 1, false);
        }
      },
      {
        root: null,
        rootMargin: "300px", // Trigger slightly before reaching the bottom
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, lastPage, isLoading, isLoadingMore, loadPosts]);

  return (
    <section id="news" aria-labelledby="news-list-title" className="section-y bg-off-white">
      <div className="shell">
        <h2 id="news-list-title" className="sr-only">
          All News & Insights
        </h2>

        {/* Initial Loading Skeletons */}
        {isLoading ? (
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_LIMIT }).map((_, idx) => (
              <div key={idx} className="animate-pulse space-y-4">
                <div className="aspect-[3/2] w-full rounded-sm bg-grey-200" />
                <div className="flex items-center gap-3">
                  <div className="h-4 w-20 bg-grey-200 rounded" />
                  <div className="h-4 w-24 bg-grey-100 rounded" />
                </div>
                <div className="h-6 w-5/6 bg-grey-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-grey-100 rounded" />
                  <div className="h-4 w-4/5 bg-grey-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="mt-14 rounded-lg border border-red-200/60 bg-red-50/50 p-12 text-center">
            <p className="text-base text-red-800">{error}</p>
            <button
              type="button"
              onClick={() => loadPosts(1, true)}
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-navy-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-gold hover:text-navy-900"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="mt-14 rounded-lg border border-grey-200 bg-white/60 p-16 text-center">
            <p className="text-base text-grey-500">No news articles found at the moment.</p>
          </div>
        ) : (
          /* Post Grid */
          <>
            <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((story, index) => {
                const imgSrc = getPostThumbnailUrl(story.thumbnail_url);
                const { href, isExternal } = getPostLink(story);

                return (
                  <RevealItem key={story.id ?? story.slug ?? story.title ?? index}>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group block"
                    >
                      {imgSrc && (
                        <div className="overflow-hidden bg-navy-900/5">
                          <img
                            src={imgSrc}
                            alt={story.title}
                            loading="lazy"
                            width={1200}
                            height={800}
                            className="aspect-[3/2] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="mt-6 flex items-center gap-4">
                        <span className="eyebrow text-gold">{story.category || "News"}</span>
                        {(story.published_at || story.created_at) && (
                          <>
                            <span className="h-px w-6 bg-grey-200" />
                            <span className="text-xs text-grey-500">{story.published_at || story.created_at}</span>
                          </>
                        )}
                      </div>
                      <h3 className="mt-4 text-xl leading-snug text-navy-900 transition-colors duration-300 group-hover:text-gold">
                        {story.title}
                      </h3>
                      {(story.short_content || story.content) && (
                        <p className="mt-3 text-[15px] leading-[1.7] text-grey-500 line-clamp-3">
                          {story.short_content || story.content}
                        </p>
                      )}
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            {/* Sentinel for Infinite Scroll */}
            <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="mt-12 flex flex-col items-center justify-center gap-3 py-6 text-navy-900">
                <Loader2 className="h-6 w-6 animate-spin text-gold" />
                <span className="text-xs uppercase tracking-[0.14em] text-grey-500">
                  Loading more insights...
                </span>
              </div>
            )}

            {/* End of list indicator */}
            {!isLoading && !isLoadingMore && currentPage >= lastPage && posts.length > 0 && (
              <div className="mt-16 flex items-center justify-center gap-4 text-center">
                <span className="h-px w-12 bg-grey-200" />
                <span className="text-xs uppercase tracking-[0.16em] text-grey-400">
                  You have reached the end of the news
                </span>
                <span className="h-px w-12 bg-grey-200" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
