function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="h-36 rounded-lg bg-slate-800" />
      <div className="mt-4 h-5 w-3/4 rounded bg-slate-800" />
      <div className="mt-2 h-4 w-1/3 rounded bg-slate-800" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-16 rounded bg-slate-800" />
        <div className="h-4 w-10 rounded bg-slate-800" />
      </div>
    </div>
  );
}

export default SkeletonCard;
