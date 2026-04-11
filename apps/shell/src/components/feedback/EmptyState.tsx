import type { ReactNode } from "react";
import { Button, Card, CardContent } from "@/shared/ui";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-14 text-center">
        {icon && <div className="mb-4 text-slate-400">{icon}</div>}
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
        {actionLabel && onAction && (
          <Button className="mt-6" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
