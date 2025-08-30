import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { ZodError } from "zod";

import FiltersForm from "@/components/FiltersForm";
import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import SkeletonCard from "@/components/SkeletonCard";

import { useProperties } from "../hooks";
import type { PropertyFilter } from "../types";
import { readFilter, writeFilter } from "@/lib/searchParams";

export default function PropertiesPage() {
  
  const [sp, setSp] = useSearchParams();
  const initial = useMemo(() => readFilter(sp), [sp]);

  const [filter, setFilter] = useState<PropertyFilter>(initial);

  const { data, isLoading, isFetching, error } = useProperties(filter);

  useEffect(() => {
    setSp(writeFilter(filter), { replace: true });
  }, [filter, setSp]);

  useEffect(() => {
    const f = readFilter(sp);
    if (writeFilter(f) !== writeFilter(filter)) {
      setFilter(f);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Propiedades</h1>
        {isFetching && !isLoading && (
          <span className="text-xs text-slate-500">actualizando…</span>
        )}
      </div>

      <FiltersForm
        initial={filter}
        onChange={(f) => setFilter((prev) => ({ ...prev, ...f }))}
      />

      {error && (
        <div className="card border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {(() => {
            let msg = "Ocurrió un error al cargar. Reintenta.";

            if (error instanceof ZodError) {
              console.error("ZodError issues:", error.issues);
              msg = "La API devolvió un formato inesperado.";
              return <p>{msg}</p>;
            }

            if (isAxiosError(error)) {
              const detail = (error.response?.data as { detail?: string } | undefined)?.detail;
              const cid = error.response?.headers?.["x-correlation-id"] as string | undefined;
              msg = detail ?? error.message ?? msg;

              return (
                <>
                  <p>{msg}</p>
                  {cid && (
                    <p className="mt-1 text-xs text-red-600/70">CID: {cid}</p>
                  )}
                </>
              );
            }

            console.error("Unknown error:", error);
            return <p>{msg}</p>;
          })()}
        </div>
      )}

      {/* Loading skeletons */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: filter.pageSize ?? 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-600">Total: {data?.total ?? 0}</p>

          {!data || data.items.length === 0 ? (
            <div className="card p-10 text-center text-slate-600">
              No se encontraron propiedades con los filtros actuales.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.items.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          )}

          <Pagination
            page={data?.page ?? filter.page ?? 1}
            pageSize={data?.pageSize ?? filter.pageSize ?? 12}
            totalPages={data?.totalPages ?? 1}
            onChangePage={(pg) => setFilter((prev) => ({ ...prev, page: pg }))}
            onChangePageSize={(size) =>
              setFilter((prev) => ({ ...prev, page: 1, pageSize: size }))
            }
          />
        </>
      )}
    </section>
  );
}
