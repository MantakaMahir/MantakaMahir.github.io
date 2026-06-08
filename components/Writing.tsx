import { writing } from "@/data/content";
import { Section } from "./Section";

export function Writing() {
  return (
    <Section id="writing" eyebrow="Credentials" title="Certifications">
      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {writing.map((item, index) => (
          <a
            key={`${item.title}-${index}`}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between gap-6 py-5 transition hover:bg-[var(--paper)]"
          >
            <div>
              <p className="text-xs text-[var(--muted)]">0{index + 1}</p>
              <h3 className="mt-1 text-xl font-normal tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.detail}</p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
