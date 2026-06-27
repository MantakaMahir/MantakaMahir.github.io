import { about } from "@/data/loader";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A short introduction">
      <p className="max-w-3xl text-2xl leading-10 tracking-[-0.015em] text-[var(--foreground)] text-pretty">{about.body}</p>
    </Section>
  );
}
