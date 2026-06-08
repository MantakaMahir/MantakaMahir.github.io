type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--line)] py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-normal tracking-[-0.03em] sm:text-4xl">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
