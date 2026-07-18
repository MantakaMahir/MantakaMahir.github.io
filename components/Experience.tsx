import { experience } from "@/data/loader";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="space-y-1">
        {experience.map((item, index) => (
          <article
            key={`${item.org}-${index}`}
            className="grid gap-3 border-b border-[var(--line)] py-7 first:pt-0 last:border-b-0 sm:grid-cols-[190px_1fr]"
          >
            <div>
              {"href" in item ? (
                <a href={item.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
                  {item.org}
                </a>
              ) : (
                <p className="text-sm font-semibold text-[var(--accent)]">{item.org}</p>
              )}
              <p className="text-xs text-[var(--muted)]">{item.period}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.type}</p>
            </div>
            <div>
              <h3 className="text-xl font-normal tracking-[-0.015em]">{item.role}</h3>
              <ul className="mt-3 space-y-2">
                {item.highlights.map((h, i) => (
                  <li key={i} className="text-base leading-7 text-[var(--muted)]">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
