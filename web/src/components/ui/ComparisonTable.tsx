'use client';

import { ExternalLink, Check, X, Minus } from 'lucide-react';

interface ComparisonRow {
  label: string;
  values: (string | boolean | null)[];
}

interface ComparisonTableProps {
  title?: string;
  headers: string[];
  rows: ComparisonRow[];
  highlightBest?: number;
}

export function ComparisonTable({ title, headers, rows, highlightBest }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-dark-100">
      {title && (
        <div className="bg-dark-50 px-6 py-4 border-b border-dark-100">
          <h3 className="font-bold text-dark-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-100 bg-dark-50">
              <th className="px-4 py-3 text-left font-semibold text-dark-700">Característica</th>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-center font-semibold ${
                    highlightBest === i ? 'text-brand-600 bg-brand-50' : 'text-dark-700'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-dark-50 last:border-0 hover:bg-dark-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-dark-700">{row.label}</td>
                {row.values.map((value, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 text-center ${
                      highlightBest === j ? 'bg-brand-50/50' : ''
                    }`}
                  >
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check className="mx-auto h-4 w-4 text-green-500" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-red-400" />
                      )
                    ) : value === null ? (
                      <Minus className="mx-auto h-4 w-4 text-dark-300" />
                    ) : (
                      <span className="text-dark-600">{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
