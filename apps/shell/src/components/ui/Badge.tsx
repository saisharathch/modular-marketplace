import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "destructive";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantStyles = {
  default:
    "bg-blue-600/10 text-blue-400 border border-blue-600/20 text-xs font-medium",
  success:
    "bg-green-600/10 text-green-400 border border-green-600/20 text-xs font-medium",
  warning:
    "bg-yellow-600/10 text-yellow-400 border border-yellow-600/20 text-xs font-medium",
  destructive:
    "bg-red-600/10 text-red-400 border border-red-600/20 text-xs font-medium",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
