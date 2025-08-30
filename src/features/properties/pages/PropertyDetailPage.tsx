import { useParams } from "react-router-dom";
import { useProperty } from "../hooks";

export default function PropertyDetailPage() {
  const { id = "" } = useParams();
  const { data: p, isLoading, error } = useProperty(id);

  if (isLoading) return <p>Cargando…</p>;
  if (error || !p) return <p>No encontrado</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{p.name}</h1>
      <p className="text-slate-600">{p.address}</p>
      <p className="mt-2 text-xl font-semibold">${p.price.toLocaleString()}</p>
    </div>
  );
}
