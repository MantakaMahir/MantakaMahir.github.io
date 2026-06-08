import { skills } from "@/data/content";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools and focus areas">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Core</p>
          <h3 className="mb-4 text-base font-semibold">{skills.core.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {skills.core.items.map((item, i) => (
              <li key={i} className="border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--muted)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {skills.groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-base font-semibold">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <li key={i} className="border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
