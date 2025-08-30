export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-40 w-full" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-5/6" />
        <div className="skeleton h-3 w-1/3" />
      </div>
    </div>
  );
}
