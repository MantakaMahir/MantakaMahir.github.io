import { hero } from "@/data/loader";

export function Hero() {
  return (
    <section className="grid min-h-[72vh] content-center gap-8 py-20 sm:py-28">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">{hero.eyebrow}</p>
        <h1 className="mt-5 text-5xl font-normal leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted)] sm:text-2xl">{hero.subheadline}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {hero.snapshot.map((item) => (
            <span key={item.label} className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-xs text-[var(--muted)]">
              <span className="font-semibold text-[var(--foreground)]">{item.label}:</span> {item.value}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="#projects" className="inline-flex items-center justify-center border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5">
          View Projects
        </a>
        <a href="#contact" className="inline-flex items-center justify-center border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--foreground)]">
          Contact Me
        </a>
      </div>
    </section>
  );
}
