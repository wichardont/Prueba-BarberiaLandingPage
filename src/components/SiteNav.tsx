

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#reservar", label: "Reservar" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a
          href="#inicio"
          className="font-display text-lg tracking-[0.18em] uppercase"
        >
          Barbería <span className="text-primary">Norte</span>
        </a>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
