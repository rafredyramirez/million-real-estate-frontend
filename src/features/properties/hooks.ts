import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProperties, getProperty } from "./api";
import type { PropertyFilter } from "./types";

export function useProperties(filter: PropertyFilter) {
  return useQuery({
    queryKey: ["properties", filter],
    queryFn: () => getProperties(filter),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}
