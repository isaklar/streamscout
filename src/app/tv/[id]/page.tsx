import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDetails, getWatchProviders, IMAGE_BASE } from "@/lib/tmdb";
import StreamingProviders from "@/components/StreamingProviders";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const show = await getDetails("tv", Number(id));
  return { title: `${show.name} — StreamScout` };
}

export default async function TVPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) notFound();

  const [show, providers] = await Promise.all([
    getDetails("tv", numId),
    getWatchProviders("tv", numId),
  ]);

  const year = show.first_air_date ? new Date(show.first_air_date).getFullYear() : null;

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors mb-6"
      >
        ← Back to search
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="shrink-0">
          <div className="relative w-64 aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 mx-auto md:mx-0">
            {show.poster_path ? (
              <Image
                src={`${IMAGE_BASE}/w500${show.poster_path}`}
                alt={show.name || "TV show poster"}
                fill
                sizes="256px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No poster
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {show.name}
              {year && <span className="text-gray-400 font-normal ml-2">({year})</span>}
            </h1>
            {show.tagline && (
              <p className="text-gray-400 italic mt-1">{show.tagline}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {show.genres.map((g) => (
              <span
                key={g.id}
                className="rounded-full bg-indigo-600/20 border border-indigo-500/30 px-3 py-1 text-xs text-indigo-300"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {show.vote_average > 0 && (
              <span className="text-yellow-400">★ {show.vote_average.toFixed(1)}</span>
            )}
            {show.number_of_seasons && (
              <span>
                {show.number_of_seasons} season{show.number_of_seasons !== 1 && "s"}
              </span>
            )}
            {show.number_of_episodes && (
              <span>
                {show.number_of_episodes} episode{show.number_of_episodes !== 1 && "s"}
              </span>
            )}
            <span className="capitalize">{show.status}</span>
          </div>

          {show.overview && (
            <div>
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
                Overview
              </h2>
              <p className="text-gray-200 leading-relaxed">{show.overview}</p>
            </div>
          )}

          <StreamingProviders providers={providers} />
        </div>
      </div>
    </main>
  );
}
