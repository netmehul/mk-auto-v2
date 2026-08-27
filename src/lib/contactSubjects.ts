export interface ContactSubject {
  id?: string | number;
  name: string;
}

export interface ContactSubjectsApiResponse {
  status: boolean;
  message: string;
  data: ContactSubject[];
}

export const FALLBACK_CONTACT_SUBJECTS: ContactSubject[] = [
  { id: 1, name: "Vehicle Sales" },
  { id: 2, name: "Service & Aftersales" },
  { id: 3, name: "Genuine Parts" },
  { id: 4, name: "Warranty" },
  { id: 5, name: "Corporate Enquiry" },
  { id: 6, name: "Careers" },
  // { name: "Other" },
];

/**
 * Fetch dynamic contact subjects / departments from the backend API.
 */
export async function fetchContactSubjects(options?: {
  signal?: AbortSignal | undefined;
}): Promise<ContactSubject[]> {
  const baseUrl =
    (import.meta.env["VITE_BACKEND_URL"] as string | undefined) ||
    "http://192.168.1.161:8000/api";
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/contact-subjects`;

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
    let errorDetail = `Failed to fetch contact subjects (${response.status})`;
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.error || errorDetail;
    } catch {
      const errText = await response.text();
      if (errText) errorDetail = errText;
    }
    throw new Error(errorDetail);
  }

  const result = await response.json();
  if (Array.isArray(result?.data)) {
    return result.data.map((item: any) => ({
      id: item.id ?? item._id ?? undefined,
      name: typeof item === "string" ? item : item.name || item.title || item.label || "",
    })).filter((item: ContactSubject) => Boolean(item.name));
  }

  if (Array.isArray(result)) {
    return result.map((item: any) => ({
      id: item.id ?? item._id ?? undefined,
      name: typeof item === "string" ? item : item.name || item.title || item.label || "",
    })).filter((item: ContactSubject) => Boolean(item.name));
  }

  return [];
}
