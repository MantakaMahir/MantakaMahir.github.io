import Image from "next/image";
import { hero } from "@/data/loader";

export function Hero() {
  return (
    <section className="grid min-h-[72vh] content-center gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-center lg:gap-16">
      <div>
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
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#projects" className="inline-flex items-center justify-center border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5">
            View Projects
          </a>
          <a href="#contact" className="inline-flex items-center justify-center border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--foreground)]">
            Contact Me
          </a>
        </div>
      </div>
      <figure className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:mx-0 lg:justify-self-end">
        <div className="absolute -inset-4 rotate-[-3deg] border border-[var(--line)] bg-[var(--paper)]" />
        <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full border border-[var(--line)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]" />
        <Image
          src="https://github.com/MantakaMahir.png"
          alt="Portrait of Mantaka Mahir"
          width={320}
          height={320}
          unoptimized
          className="relative aspect-square w-full border border-[var(--line)] object-cover grayscale-[15%] shadow-[0_24px_80px_color-mix(in_oklab,var(--foreground)_14%,transparent)]"
        />
        <figcaption className="relative mt-3 text-right text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          Dhaka / Remote
        </figcaption>
      </figure>
    </section>
  );
}
