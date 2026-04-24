import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import MediaCard from "@/components/MediaCard";
import FeaturedRow from "@/components/FeaturedRow";
import { searchMulti, getTrending } from "@/lib/tmdb";

async function SearchResults({ query }: { query: string }) {
  const results = await searchMulti(query);

  if (!results.length) {
    return (
      <p className="text-center text-gray-400 mt-12">
        No results found for &ldquo;{query}&rdquo;. Try a different search.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-gray-400">
        {results.length} result{results.length !== 1 && "s"} for &ldquo;{query}&rdquo;
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((item) => (
          <MediaCard key={`${item.media_type}-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  );
}

async function FeaturedContent() {
  const [movies, shows] = await Promise.all([
    getTrending("movie"),
    getTrending("tv"),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <FeaturedRow title="🔥 Trending Movies" items={movies} />
      <FeaturedRow title="📺 Trending TV Shows" items={shows} />
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          🎬 StreamScout
        </h1>
        <p className="text-gray-400 mb-6">
          Find where to stream any movie or TV show
        </p>
        <SearchBar />
      </div>

      {query ? (
        <Suspense
          fallback={
            <div className="flex justify-center mt-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            </div>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <div className="flex justify-center mt-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            </div>
          }
        >
          <FeaturedContent />
        </Suspense>
      )}
    </main>
  );
}
