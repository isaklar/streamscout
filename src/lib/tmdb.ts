const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface MediaResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: "movie" | "tv";
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
}

export interface StreamingProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviders {
  flatrate?: StreamingProvider[];
  rent?: StreamingProvider[];
  buy?: StreamingProvider[];
  ads?: StreamingProvider[];
  link?: string;
}

export interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genres: { id: number; name: string }[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
}

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY || "");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function searchMulti(query: string): Promise<MediaResult[]> {
  const data = await tmdbFetch<{ results: MediaResult[] }>("/search/multi", {
    query,
    include_adult: "false",
    language: "en-US",
    page: "1",
  });
  // Only return movies and TV shows
  return data.results.filter((r) => r.media_type === "movie" || r.media_type === "tv");
}

export async function getDetails(type: "movie" | "tv", id: number): Promise<MediaDetails> {
  return tmdbFetch<MediaDetails>(`/${type}/${id}`, { language: "en-US" });
}

export async function getWatchProviders(type: "movie" | "tv", id: number): Promise<WatchProviders> {
  const data = await tmdbFetch<{ results: Record<string, WatchProviders> }>(
    `/${type}/${id}/watch/providers`
  );
  return data.results?.SE || data.results?.US || {};
}

export async function getTrending(type: "movie" | "tv"): Promise<MediaResult[]> {
  const data = await tmdbFetch<{ results: MediaResult[] }>(`/trending/${type}/week`, {
    language: "en-US",
  });
  return data.results.slice(0, 5).map((r) => ({ ...r, media_type: type }));
}
