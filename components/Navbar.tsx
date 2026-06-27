import { navItems } from "@/data/loader";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--background)]/88 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10" aria-label="Main navigation">
        <a href="#home" className="text-sm font-semibold tracking-[-0.01em] decoration-[var(--accent)] underline-offset-8 hover:underline">
          Mantaka Mahir
        </a>
        <div className="flex items-center gap-4 overflow-x-auto text-sm text-[var(--muted)] sm:gap-5">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="shrink-0 transition hover:text-[var(--foreground)]">
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
