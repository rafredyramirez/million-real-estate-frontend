import { useEffect, useMemo, useState } from "react";
import type { PropertyFilter, SortDir } from "@/features/properties/types";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
type SortBy = NonNullable<PropertyFilter["sortBy"]>;

type Props = { initial?: PropertyFilter; onChange: (f: PropertyFilter) => void; };

export default function FiltersForm({ initial, onChange }: Props) {
  const [name, setName] = useState<string>(initial?.name ?? "");
  const [address, setAddress] = useState<string>(initial?.address ?? "");
  const [minPrice, setMinPrice] = useState<string>(initial?.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState<string>(initial?.maxPrice?.toString() ?? "");
  const [sortBy, setSortBy] = useState<SortBy>(initial?.sortBy ?? "CreatedAt");
  const [sortDir, setSortDir] = useState<SortDir>(initial?.sortDir ?? "desc");

  const debName = useDebouncedValue(name, 400);
  const debAddr = useDebouncedValue(address, 400);

  const validRange = useMemo(() => {
    const min = minPrice ? Number(minPrice) : undefined;
    const max = maxPrice ? Number(maxPrice) : undefined;
    return !(min != null && max != null && min > max);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (!validRange) return;
    onChange({
      name: debName || undefined,
      address: debAddr || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      page: 1,
      pageSize: initial?.pageSize ?? 12,
      sortBy,
      sortDir,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debName, debAddr, minPrice, maxPrice, sortBy, sortDir, validRange]);

  const clear = () => {
    setName(""); setAddress(""); setMinPrice(""); setMaxPrice("");
    setSortBy("CreatedAt"); setSortDir("desc");
    onChange({ page: 1, pageSize: initial?.pageSize ?? 12, sortBy: "CreatedAt", sortDir: "desc" });
  };

  return (
    <div className="mb-4 space-y-3">
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <input className="input" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="input" placeholder="Dirección" value={address} onChange={(e)=>setAddress(e.target.value)} />
        <input className="input" placeholder="Precio min" inputMode="numeric" value={minPrice} onChange={(e)=>setMinPrice(e.target.value.replace(/\D/g,""))} />
        <input className="input" placeholder="Precio max" inputMode="numeric" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value.replace(/\D/g,""))} />
        <select className="input" value={sortBy} onChange={(e)=>setSortBy(e.target.value as SortBy)}>
          <option value="CreatedAt">Fecha creación</option>
          <option value="Price">Precio</option>
          <option value="Name">Nombre</option>
        </select>
        <select className="input" value={sortDir} onChange={(e)=>setSortDir(e.target.value as SortDir)}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </form>

      {!validRange && <p className="text-sm text-red-600">El precio mínimo no puede ser mayor que el máximo.</p>}
      
      <div className="flex flex-wrap gap-2">
        {name && <span className="badge border-slate-300 bg-slate-100">Nombre: {name}</span>}
        {address && <span className="badge border-slate-300 bg-slate-100">Dirección: {address}</span>}
        {minPrice && <span className="badge border-slate-300 bg-slate-100">Min: {Number(minPrice).toLocaleString()}</span>}
        {maxPrice && <span className="badge border-slate-300 bg-slate-100">Max: {Number(maxPrice).toLocaleString()}</span>}
        <button className="btn-ghost px-3 py-1.5 rounded-full border border-slate-300" onClick={clear}>Limpiar filtros</button>
      </div>
    </div>
  );
}
