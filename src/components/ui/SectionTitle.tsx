interface SectionTitleProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function SectionTitle({ title, subtitle, children }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-200">{title}</h2>
        {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
