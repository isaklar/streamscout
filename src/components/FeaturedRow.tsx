import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE, type MediaResult } from "@/lib/tmdb";

export default function FeaturedRow({
  title,
  items,
}: {
  title: string;
  items: MediaResult[];
}) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((item) => {
          const name = item.title || item.name || "Unknown";
          const href = `/${item.media_type}/${item.id}`;
          return (
            <Link
              key={item.id}
              href={href}
              className="group relative overflow-hidden rounded-xl border border-white/5 transition-all hover:border-indigo-500/40 hover:scale-[1.02]"
            >
              <div className="relative aspect-[2/3] w-full bg-gray-800">
                {item.poster_path ? (
                  <Image
                    src={`${IMAGE_BASE}/w342${item.poster_path}`}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500 text-sm">
                    No poster
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                  <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                    {name}
                  </p>
                  {item.vote_average > 0 && (
                    <p className="text-xs text-yellow-400 mt-0.5">
                      ★ {item.vote_average.toFixed(1)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
