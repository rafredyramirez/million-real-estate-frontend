import type { PropertyFilter, SortDir } from "@/features/properties/types";

const clean = (v: string | null): string | undefined =>
  v && v.trim() !== "" ? v : undefined;

const toNum = (v: string | null): number | undefined => {
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

type SortBy = NonNullable<PropertyFilter["sortBy"]>;

const isSortBy = (v?: string): v is SortBy =>
  v === "CreatedAt" || v === "Price" || v === "Name";

const isSortDir = (v?: string): v is SortDir =>
  v === "asc" || v === "desc";

export function readFilter(sp: URLSearchParams): PropertyFilter {
  const sortByRaw = clean(sp.get("sortBy"));
  const sortDirRaw = clean(sp.get("sortDir"));

  const sortBy: SortBy = isSortBy(sortByRaw) ? sortByRaw : "CreatedAt";
  const sortDir: SortDir = isSortDir(sortDirRaw) ? sortDirRaw : "desc";

  return {
    name: clean(sp.get("name")),
    address: clean(sp.get("address")),
    minPrice: toNum(sp.get("minPrice")),
    maxPrice: toNum(sp.get("maxPrice")),
    page: toNum(sp.get("page")) ?? 1,
    pageSize: toNum(sp.get("pageSize")) ?? 12,
    sortBy,
    sortDir,
  };
}

export function writeFilter(f: PropertyFilter): string {
  const sp = new URLSearchParams();
  if (f.name) sp.set("name", f.name);
  if (f.address) sp.set("address", f.address);
  if (f.minPrice != null) sp.set("minPrice", String(f.minPrice));
  if (f.maxPrice != null) sp.set("maxPrice", String(f.maxPrice));
  sp.set("page", String(f.page ?? 1));
  sp.set("pageSize", String(f.pageSize ?? 12));
  if (f.sortBy) sp.set("sortBy", f.sortBy);
  if (f.sortDir) sp.set("sortDir", f.sortDir);
  return sp.toString();
}
