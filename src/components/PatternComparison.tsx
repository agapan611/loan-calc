import { calculate } from '../utils/loanCalculator';
import type { LoanInput } from '../utils/loanCalculator';

interface PatternComparisonProps {
  baseInput: LoanInput;
}

const PATTERNS = [50, 100, 200, 300, 500];

function formatManYen(amount: number): string {
  return Math.round(amount / 10000).toLocaleString('ja-JP') + '万円';
}

function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const m = months % 12;
  if (m === 0) return `${years}年`;
  if (years === 0) return `${m}ヶ月`;
  return `${years}年${m}ヶ月`;
}

export default function PatternComparison({ baseInput }: PatternComparisonProps) {
  const validPatterns = PATTERNS.filter((p) => p < baseInput.balance);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-800">繰り上げ額別・節約効果の比較</h3>
        <p className="text-xs text-gray-400 mt-1">現在の条件で、繰り上げ額を変えるとどうなるか</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs font-medium">
              <th className="text-left px-4 py-3">繰り上げ額</th>
              <th className="text-right px-4 py-3">節約できる金利</th>
              <th className="text-right px-4 py-3">返済期間の短縮</th>
              <th className="text-right px-4 py-3">総返済額</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {validPatterns.map((p) => {
              const result = calculate({ ...baseInput, prepayment: p });
              const isCurrentPattern = p === baseInput.prepayment;
              return (
                <tr
                  key={p}
                  className={`hover:bg-gray-50 transition-colors ${isCurrentPattern ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-700">
                    {p}万円
                    {isCurrentPattern && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                        現在
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">
                    {formatManYen(result.savedAmount)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {result.savedMonths > 0 ? formatMonths(result.savedMonths) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {formatManYen(result.withTotalPayment)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
