import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-800 bg-slate-900 p-10 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
        404 Error
      </p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-slate-400">
        The page you requested does not exist or may have been moved.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          Go Home
        </Link>

        <Link
          to="/catalog"
          className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-500"
        >
          Browse Catalog
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
