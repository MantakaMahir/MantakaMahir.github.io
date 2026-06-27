type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--line)] py-14 sm:py-20">
      <div className="grid gap-7 lg:grid-cols-[minmax(180px,260px)_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold text-[var(--accent)]">{eyebrow}</p>
          <h2 className="mt-3 max-w-64 text-3xl font-normal leading-tight tracking-[-0.025em] text-balance sm:text-4xl">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
