import { now } from "@/data/content";
import { Section } from "./Section";

export function Now() {
  return (
    <Section id="now" eyebrow="Now" title="What I'm focused on">
      <div className="border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8">
        <p className="max-w-2xl text-xl leading-9 text-[var(--foreground)] italic">{now.line1}</p>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{now.line2}</p>
      </div>
    </Section>
  );
}
