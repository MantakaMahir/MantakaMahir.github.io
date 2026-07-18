import Image from "next/image";
import { hero } from "@/data/loader";

export function Hero() {
  return (
    <section className="grid min-h-[76vh] content-center gap-10 py-12 sm:py-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-16">
      <div>
        <div className="max-w-3xl">
          <p className="inline-flex border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-sm font-semibold text-[var(--accent)]">{hero.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(3.5rem,8vw,5.75rem)] font-normal leading-[0.96] tracking-[-0.03em] text-balance">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)] text-pretty sm:text-[1.35rem] sm:leading-9">{hero.subheadline}</p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#projects" className="inline-flex items-center justify-center border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5">
            View Projects
          </a>
          <a href="#contact" className="inline-flex items-center justify-center border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--foreground)]">
            Contact Me
          </a>
        </div>
        <dl className="mt-12 grid max-w-3xl gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {hero.snapshot.map((item) => (
            <div key={item.label} className="bg-[var(--paper)] p-4">
              <dt className="text-xs text-[var(--muted)]">{item.label}</dt>
              <dd className="mt-1 text-sm font-semibold leading-6">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:mx-0 lg:justify-self-end">
        <div className="absolute -inset-5 rotate-[-2deg] border border-[var(--accent)] bg-[var(--accent-soft)]" />
        <div className="absolute -bottom-6 -left-6 h-28 w-28 border border-[var(--line)] bg-[var(--paper)]" />
        <Image
          src="https://github.com/MantakaMahir.png"
          alt="Portrait of Mantaka Mahir"
          width={320}
          height={320}
          unoptimized
          className="relative aspect-[4/5] w-full border border-[var(--line)] object-cover grayscale-[20%]"
        />
      </figure>
    </section>
  );
}
