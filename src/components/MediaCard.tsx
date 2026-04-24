import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE, type MediaResult } from "@/lib/tmdb";

export default function MediaCard({ item }: { item: MediaResult }) {
  const title = item.title || item.name || "Unknown";
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : null;
  const href = `/${item.media_type}/${item.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl bg-white/5 border border-white/5 transition-all hover:border-indigo-500/40 hover:bg-white/10 hover:scale-[1.02]"
    >
      <div className="relative aspect-[2/3] w-full bg-gray-800">
        {item.poster_path ? (
          <Image
            src={`${IMAGE_BASE}/w342${item.poster_path}`}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500 text-sm">
            No poster
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="rounded-md bg-indigo-600/90 px-2 py-0.5 text-xs font-semibold uppercase text-white">
            {item.media_type === "movie" ? "Movie" : "TV"}
          </span>
          {item.vote_average > 0 && (
            <span className="rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-yellow-400">
              ★ {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-semibold text-white line-clamp-2 text-sm leading-tight group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>
        {year && <p className="text-xs text-gray-400">{year}</p>}
        {item.overview && (
          <p className="mt-1 text-xs text-gray-400 line-clamp-2">{item.overview}</p>
        )}
      </div>
    </Link>
  );
}
