import { skills } from "@/data/loader";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools and focus areas">
      <div className="space-y-9">
        <div>
          <h3 className="mb-4 text-base font-semibold text-[var(--accent)]">{skills.core.title}</h3>
          <ul className="flex flex-wrap gap-2.5">
            {skills.core.items.map((item, i) => (
              <li key={i} className="border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--muted)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {skills.groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-base font-semibold text-[var(--accent)]">{group.title}</h3>
            <ul className="flex flex-wrap gap-2.5">
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
