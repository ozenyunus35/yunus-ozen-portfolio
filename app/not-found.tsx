import Link from "next/link";

/** Shown for any address that does not exist. It sits outside the language routes, so it speaks both languages. */
export default function NotFound() {
  return (
    <main className="page-hero relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="hero-wash" aria-hidden>
        <span className="hero-wash-a" />
        <span className="hero-wash-b" />
      </div>
      <div className="hero-grid-fade absolute inset-0 -z-10" aria-hidden />
      <div className="container-editorial">
        <p className="text-mono text-muted-foreground">
          <span className="text-[var(--accent-light)]">404</span> · GET {"/…"} → not found
        </p>
        <h1 className="text-display font-display mt-6 max-w-3xl">
          Page not found. <span className="accent-serif accent-ink">Sayfa bulunamadı.</span>
        </h1>
        <p className="text-body mt-6 max-w-xl text-muted-foreground">
          The link may be old or mistyped. · Bağlantı eski ya da hatalı yazılmış olabilir.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/en/" className="btn-primary">
            Home (English)
          </Link>
          <Link href="/tr/" className="btn-ghost">
            Ana sayfa (Türkçe)
          </Link>
        </div>
      </div>
    </main>
  );
}
