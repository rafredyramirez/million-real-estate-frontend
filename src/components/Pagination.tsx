type Props = {
  page: number;
  totalPages: number;
  pageSize: number;
  onChangePage: (page: number) => void;
  onChangePageSize?: (size: number) => void;
};

export default function Pagination({ page, totalPages, pageSize, onChangePage, onChangePageSize }: Props) {
  if (totalPages <= 1 && !onChangePageSize) return null;
  const prev = () => page > 1 && onChangePage(page - 1);
  const next = () => page < totalPages && onChangePage(page + 1);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-slate-600">Página {page} de {Math.max(totalPages, 1)}</div>
      <div className="flex items-center gap-2">
        {onChangePageSize && (
          <select
            className="input w-auto"
            value={pageSize}
            onChange={(e) => onChangePageSize(Number(e.target.value))}
          >
            {[8, 12, 16, 24].map(n => <option key={n} value={n}>{n} / página</option>)}
          </select>
        )}
        <div className="flex gap-2">
          <button className="btn-muted rounded-xl px-3 py-2" onClick={prev} disabled={page <= 1}>Anterior</button>
          <button className="btn rounded-xl px-3 py-2" onClick={next} disabled={page >= totalPages}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}
