import { about } from "@/data/content";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A short introduction">
      <p className="max-w-2xl text-xl leading-9 text-[var(--muted)]">{about.body}</p>
    </Section>
  );
}
