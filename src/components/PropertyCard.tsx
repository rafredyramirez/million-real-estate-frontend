import { Link } from "react-router-dom";
import type { PropertyDto } from "@/features/properties/types";
import { formatCurrency } from "@/lib/format";

const placeholder = "https://placehold.co/600x400?text=No+Image";

function safeImageUrl(input?: string | null): string {
  if (!input) return placeholder;
  const trimmed = input.trim();
  if (!trimmed) return placeholder;

  try {
    const url = new URL(trimmed, window.location.origin);
    return url.href;
  } catch {
    try {
      return encodeURI(trimmed);
    } catch {
      return placeholder;
    }
  }
}

export default function PropertyCard({ p }: { p: PropertyDto }) {
  const src = safeImageUrl(p.imageUrl);

  return (
    <article className="card overflow-hidden transition hover:shadow-md hover:-translate-y-0.5">
      <div className="relative">
        <img
          src={src}
          alt={p.name}
          className="h-40 w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholder;
          }}
        />
        <span className="badge absolute right-2 top-2 border-slate-200 bg-white/90">
          {formatCurrency(p.price)}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{p.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{p.address}</p>
        <Link
          to={`/property/${p.id}`}
          className="mt-3 inline-block text-blue-600 hover:underline"
        >
          Ver detalle →
        </Link>
      </div>
    </article>
  );
}
