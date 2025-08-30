import { Outlet, Link, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="text-lg font-semibold tracking-tight">🏠 RealEstate</Link>
          <nav className="hidden gap-4 sm:flex">
            <NavLink to="/" className={({isActive}) => isActive ? "text-blue-700" : "text-slate-600 hover:text-slate-900"}>
              Propiedades
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
