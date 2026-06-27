import { Section } from "./Section";

const courses = ["DSA", "OOP", "DBMS", "Networking"];

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Computer Science">
      <div className="border-y border-[var(--line)] py-7">
        <p className="text-2xl font-normal tracking-[-0.02em]">Military Institute of Science and Technology (MIST)</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {courses.map((course) => (
            <span key={course} className="border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-xs text-[var(--muted)]">
              {course}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
