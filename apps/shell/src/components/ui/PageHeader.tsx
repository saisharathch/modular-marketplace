import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  children,
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-slate-400">{description}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
