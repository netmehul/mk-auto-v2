import { useEffect, useState } from "react";
import { RevealGroup, RevealItem } from "./Reveal";
import { fetchPosts, getPostLink, getPostThumbnailUrl, type PostItem } from "@/lib/posts";
import { Loader2 } from "lucide-react";

export function News() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadLatestPosts() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchPosts({ page: 1, limit: 3, signal: controller.signal });
        if (isMounted) {
          setPosts(result.data || []);
        }
      } catch (err: any) {
        if (err.name !== "AbortError" && isMounted) {
          console.error("Error loading news posts for homepage:", err);
          setError(err.message || "Failed to load latest news.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLatestPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section id="news" aria-labelledby="news-title" className="section-y bg-off-white">
      <div className="shell">
        <RevealGroup className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <RevealItem>
              <h2 id="news-title" className="h2-display uppercase mt-7 max-w-[20ch] text-navy-900">
                The latest from the group.
              </h2>
            </RevealItem>
          </div>
          <RevealItem>
            <a
              href="/news_insights"
              className="group inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.16em] text-navy-900"
            >
              View all news
              <span className="block h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
            </a>
          </RevealItem>
        </RevealGroup>

        {isLoading ? (
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[1, 2, 3].map((idx) => (
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
          <div className="mt-14 rounded-lg border border-red-200/50 bg-red-50/50 p-8 text-center text-navy-900">
            <p className="text-sm text-grey-500">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
            >
              Retry
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-14 rounded-lg border border-grey-200 bg-white/50 p-12 text-center">
            <p className="text-sm text-grey-500">No news articles found at the moment.</p>
          </div>
        ) : (
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
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
                    <h3 className="mt-4 text-xl leading-snug text-navy-900 group-hover:text-gold transition-colors duration-300">
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
        )}
      </div>
    </section>
  );
}
