export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Mantaka Mahir</p>
        <a href="#home" className="transition hover:text-[var(--foreground)]">
          Back to top
        </a>
      </div>
    </footer>
  );
}
