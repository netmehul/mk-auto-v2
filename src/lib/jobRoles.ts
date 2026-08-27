export interface JobRole {
  id?: string | number;
  name: string;
}

export interface JobRolesApiResponse {
  status: boolean;
  message: string;
  data: JobRole[];
}

export const FALLBACK_JOB_ROLES: JobRole[] = [
  { id: 1, name: "Sales" },
  { id: 2, name: "Aftersales" },
  { id: 3, name: "Service" },
  { id: 4, name: "Parts" },
  { id: 5, name: "Marketing & Communications" },
  { id: 6, name: "Finance" },
  { id: 7, name: "Human Resources" },
  { id: 8, name: "Administration" },
  // { name: "Other" },
];

/**
 * Fetch dynamic job roles from the backend API.
 */
export async function fetchJobRoles(options?: {
  signal?: AbortSignal | undefined;
}): Promise<JobRole[]> {
  const baseUrl =
    (import.meta.env["VITE_BACKEND_URL"] as string | undefined) ||
    "http://192.168.1.161:8000/api";
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/job-roles`;

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
    let errorDetail = `Failed to fetch job roles (${response.status})`;
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
    return result.data
      .map((item: any) => ({
        id: item.id ?? item._id ?? undefined,
        name: typeof item === "string" ? item : item.name || item.title || item.label || "",
      }))
      .filter((item: JobRole) => Boolean(item.name));
  }

  if (Array.isArray(result)) {
    return result
      .map((item: any) => ({
        id: item.id ?? item._id ?? undefined,
        name: typeof item === "string" ? item : item.name || item.title || item.label || "",
      }))
      .filter((item: JobRole) => Boolean(item.name));
  }

  return [];
}
