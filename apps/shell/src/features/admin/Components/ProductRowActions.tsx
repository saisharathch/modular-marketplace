import { Card, CardContent } from "@/shared/ui";
import { formatCurrency } from "@/shared/lib/formatCurrency";

interface AdminStatsGridProps {
  totalProducts: number;
  totalCategories: number;
  averagePrice: number;
}

export function AdminStatsGrid({
  totalProducts,
  totalCategories,
  averagePrice,
}: AdminStatsGridProps) {
  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      helper: "Items currently listed",
    },
    {
      label: "Categories",
      value: totalCategories,
      helper: "Distinct catalog segments",
    },
    {
      label: "Avg. Price",
      value: formatCurrency(averagePrice),
      helper: "Average catalog price",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="space-y-2">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="text-3xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500">{stat.helper}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
