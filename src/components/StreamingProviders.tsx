import Image from "next/image";
import { IMAGE_BASE, type StreamingProvider, type WatchProviders } from "@/lib/tmdb";

function ProviderList({
  providers,
  label,
}: {
  providers: StreamingProvider[];
  label: string;
}) {
  if (!providers.length) return null;

  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </h3>
      <div className="flex flex-wrap gap-3">
        {providers.map((p) => (
          <div
            key={p.provider_id}
            className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          >
            {p.logo_path && (
              <Image
                src={`${IMAGE_BASE}/w45${p.logo_path}`}
                alt={p.provider_name}
                width={28}
                height={28}
                className="rounded-md"
              />
            )}
            <span className="text-sm text-white">{p.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StreamingProviders({
  providers,
}: {
  providers: WatchProviders;
}) {
  const hasAny =
    providers.flatrate?.length ||
    providers.ads?.length ||
    providers.rent?.length ||
    providers.buy?.length;

  if (!hasAny) {
    return (
      <div className="rounded-xl bg-white/5 border border-white/10 p-6">
        <h2 className="mb-2 text-lg font-semibold text-white">Where to Watch</h2>
        <p className="text-gray-400 text-sm">
          No streaming information available for your region.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Where to Watch</h2>
      <div className="flex flex-col gap-5">
        {providers.flatrate && (
          <ProviderList providers={providers.flatrate} label="Stream" />
        )}
        {providers.ads && (
          <ProviderList providers={providers.ads} label="Free with Ads" />
        )}
        {providers.rent && (
          <ProviderList providers={providers.rent} label="Rent" />
        )}
        {providers.buy && (
          <ProviderList providers={providers.buy} label="Buy" />
        )}
      </div>
      {providers.link && (
        <a
          href={providers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          View on TMDB →
        </a>
      )}
      <p className="mt-4 text-xs text-gray-500">
        Streaming data provided by JustWatch via TMDB.
      </p>
    </div>
  );
}
