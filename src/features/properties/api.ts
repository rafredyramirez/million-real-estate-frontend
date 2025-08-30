import api from "@/lib/axios";
import type { PropertyDto, PropertyFilter, PagedResult } from "./types";
import { pagedSchema, propertySchema } from "./schemas";

function buildQuery(f: PropertyFilter = {}) {
  const p = new URLSearchParams();
  if (f.name) p .set("name", f.name);
  if (f.address) p.set("address", f.address);
  if (f.minPrice != null) p.set("minPrice", String(f.minPrice));
  if (f.maxPrice != null) p.set("maxPrice", String(f.maxPrice));
  p.set("page", String(f.page ?? 1));
  p.set("pageSize", String(f.pageSize ?? 12));
  if (f.sortBy) p.set("sortBy", f.sortBy);
  if (f.sortDir) p.set("sortDir", f.sortDir);
  return p.toString();
}

export async function getProperties(filter: PropertyFilter = {}) {
  const { data } = await api.get<PagedResult<PropertyDto>>(`/Properties?${buildQuery(filter)}`);
  return pagedSchema(propertySchema).parse(data);
}

export async function getProperty(id: string) {
  const { data } = await api.get<PropertyDto>(`/Properties/${id}`);
  return propertySchema.parse(data);
}