import { projects } from "@/data/loader";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work">
      <div className="border-y border-[var(--line)]">
        {projects.map((project, index) => (
          <article key={`${project.name}-${index}`} className="grid gap-5 border-b border-[var(--line)] py-7 last:border-b-0 sm:grid-cols-[3rem_1fr] sm:py-8 lg:grid-cols-[4rem_1fr_15rem]">
            <p className="text-sm text-[var(--accent)]">0{index + 1}</p>
            <div>
              <h3 className="text-2xl font-normal leading-tight tracking-[-0.025em] text-balance">{project.name}</h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 text-xs text-[var(--muted)]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-sm leading-6 lg:text-right">
              <p className="font-semibold text-[var(--accent)]">{project.metric}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">{project.techStack}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
