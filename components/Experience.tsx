import { experience } from "@/data/loader";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="space-y-1">
        {experience.map((item, index) => (
          <article
            key={`${item.org}-${index}`}
            className="grid gap-3 border-b border-[var(--line)] py-6 first:pt-0 last:border-b-0 sm:grid-cols-[180px_1fr]"
          >
            <div>
              <p className="text-sm font-semibold">{item.org}</p>
              <p className="text-xs text-[var(--muted)]">{item.period}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <ul className="mt-3 space-y-2">
                {item.highlights.map((h, i) => (
                  <li key={i} className="text-sm leading-6 text-[var(--muted)]">
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
