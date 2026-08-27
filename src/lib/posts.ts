export interface PostItem {
  id?: number | string;
  title: string;
  slug?: string;
  short_content?: string;
  content?: string;
  thumbnail_url?: string;
  category?: string;
  created_at?: string;
  published_at?: string;
  external_link?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[] | string;
}

export interface PostsPaginationData {
  current_page: number;
  data: PostItem[];
  first_page_url?: string;
  from?: number;
  last_page: number;
  last_page_url?: string;
  links?: Array<{ url: string | null; label: string; page?: number | null; active: boolean }>;
  next_page_url?: string | null;
  path?: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
  total: number;
}

export interface PostsApiResponse {
  status: boolean;
  message: string;
  data: PostsPaginationData;
}

export interface PostDetailApiResponse {
  status: boolean;
  message: string;
  data: PostItem;
}

/**
 * Normalizes external link URL to ensure proper protocol.
 */
export function getPostExternalLink(item?: PostItem | null): string | null {
  if (!item) return null;
  const link = item.external_link;
  if (!link || typeof link !== "string" || !link.trim()) {
    return null;
  }
  const cleanLink = link.trim();
  if (/^https?:\/\//i.test(cleanLink)) {
    return cleanLink;
  }
  return `https://${cleanLink}`;
}

/**
 * Returns navigation link and target metadata for a post item.
 */
export function getPostLink(item: PostItem): { href: string; isExternal: boolean } {
  const externalLink = getPostExternalLink(item);
  if (externalLink) {
    return { href: externalLink, isExternal: true };
  }
  const slug = item.slug?.trim();
  return {
    href: slug ? `/news_details?slug=${encodeURIComponent(slug)}` : "/news_details",
    isExternal: false,
  };
}

/**
 * Normalizes post thumbnail URL to resolve correctly against the backend server.
 * Returns null if no thumbnail URL is provided.
 */
export function getPostThumbnailUrl(url?: string | null): string | null {
  if (!url || typeof url !== "string" || !url.trim()) {
    return null;
  }

  const rawUrl = url.trim();
  const baseUrl = (import.meta.env["VITE_BACKEND_URL"] as string | undefined) || "http://192.168.1.161:8000/api";
  const backendOrigin = baseUrl.replace(/\/api\/?$/, "");

  // If URL uses backend test domain or placeholder domain
  if (rawUrl.includes("mahy-khoory-automotive-backend.test")) {
    return rawUrl.replace(/https?:\/\/mahy-khoory-automotive-backend\.test/, backendOrigin);
  }

  // If relative path
  if (rawUrl.startsWith("/")) {
    return `${backendOrigin}${rawUrl}`;
  }

  return rawUrl;
}

/**
 * Fetch posts from the API with pagination.
 */
export async function fetchPosts(options?: {
  page?: number | undefined;
  limit?: number | undefined;
  signal?: AbortSignal | undefined;
}): Promise<PostsPaginationData> {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 6;

  const baseUrl = (import.meta.env["VITE_BACKEND_URL"] as string | undefined) || "http://192.168.1.161:8000/api";
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/posts?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}`;

  const myHeaders = new Headers();
  const apiToken = import.meta.env["VITE_API_TOKEN"] as string | undefined;
  if (apiToken) {
    myHeaders.append("Authorization", apiToken);
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    ...(options?.signal ? { signal: options.signal } : {}),
  };

  const response = await fetch(endpoint, requestOptions);

  if (!response.ok) {
    let errorDetail = `Failed to fetch posts (${response.status})`;
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.error || errorDetail;
    } catch {
      const errText = await response.text();
      if (errText) errorDetail = errText;
    }
    throw new Error(errorDetail);
  }

  const result: PostsApiResponse = await response.json();
  if (!result.status || !result.data) {
    throw new Error(result.message || "Failed to load posts.");
  }

  return result.data;
}

/**
 * Fetch a single post detail by its slug.
 */
export async function fetchPostBySlug(
  slug: string,
  options?: { signal?: AbortSignal | undefined }
): Promise<PostItem> {
  const cleanSlug = slug?.trim();
  if (!cleanSlug) {
    throw new Error("Post slug is required.");
  }

  const baseUrl = (import.meta.env["VITE_BACKEND_URL"] as string | undefined) || "http://192.168.1.161:8000/api";
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/posts/${encodeURIComponent(cleanSlug)}`;

  const myHeaders = new Headers();
  const apiToken = import.meta.env["VITE_API_TOKEN"] as string | undefined;
  if (apiToken) {
    myHeaders.append("Authorization", apiToken);
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    ...(options?.signal ? { signal: options.signal } : {}),
  };

  const response = await fetch(endpoint, requestOptions);

  if (!response.ok) {
    let errorDetail = `Failed to fetch post details (${response.status})`;
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.error || errorDetail;
    } catch {
      const errText = await response.text();
      if (errText) errorDetail = errText;
    }
    throw new Error(errorDetail);
  }

  const result: PostDetailApiResponse = await response.json();
  if (!result.status || !result.data) {
    throw new Error(result.message || "Failed to load post details.");
  }

  return result.data;
}

