import type { ReactNode } from "react";
import { Card, CardContent } from "./Card";

interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyState?: ReactNode;
}

export function DataTable<T>({ columns, rows, emptyState }: DataTableProps<T>) {
  if (rows.length === 0) return <>{emptyState}</>;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead>
              <tr className="bg-slate-950/40">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400 ${column.className ?? ""}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-slate-800/40">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 align-middle text-sm text-slate-200 ${column.className ?? ""}`}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
