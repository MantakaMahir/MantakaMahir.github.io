import { projects } from "@/data/content";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <article key={`${project.name}-${index}`} className="flex flex-col border border-[var(--line)] bg-[var(--paper)] p-6 transition hover:border-[var(--foreground)] sm:p-7">
            <p className="text-xs text-[var(--muted)]">0{index + 1}</p>
            <h3 className="mt-2 text-2xl font-normal tracking-[-0.03em]">{project.name}</h3>
            <p className="mt-3 text-base leading-7 text-[var(--muted)] flex-1">{project.description}</p>
            <p className="mt-4 text-sm font-semibold text-[var(--accent)]">{project.metric}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--muted)]">{tag}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">{project.techStack}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
