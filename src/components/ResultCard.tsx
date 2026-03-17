import type { LoanResult } from '../utils/loanCalculator';

interface ResultCardProps {
  result: LoanResult;
}

function formatYen(amount: number): string {
  return Math.round(amount).toLocaleString('ja-JP') + '円';
}

function formatManYen(amount: number): string {
  const man = Math.round(amount / 10000);
  return man.toLocaleString('ja-JP') + '万円';
}

function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const m = months % 12;
  if (m === 0) return `${years}年`;
  return `${years}年${m}ヶ月`;
}

export default function ResultCard({ result }: ResultCardProps) {
  const {
    withoutMonthlyPayment,
    withoutTotalPayment,
    withoutTotalInterest,
    withoutMonths,
    withMonthlyPayment,
    withTotalPayment,
    withTotalInterest,
    withMonths,
    savedAmount,
    savedMonths,
  } = result;

  return (
    <div className="space-y-6">
      {/* 節約効果ハイライト */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-md">
        <p className="text-blue-100 text-sm font-medium mb-1">繰り上げ返済による節約効果</p>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <p className="text-xs text-blue-200 mb-0.5">節約できる金利</p>
            <p className="text-3xl font-bold">{formatManYen(savedAmount)}</p>
          </div>
          {savedMonths > 0 && (
            <div>
              <p className="text-xs text-blue-200 mb-0.5">返済期間の短縮</p>
              <p className="text-3xl font-bold">{formatMonths(savedMonths)}</p>
            </div>
          )}
        </div>
      </div>

      {/* 比較テーブル */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-3 text-sm font-medium text-gray-500 bg-gray-50 border-b border-gray-100">
          <div className="py-3 px-4"></div>
          <div className="py-3 px-4 text-center text-gray-600">繰り上げなし</div>
          <div className="py-3 px-4 text-center text-blue-600 font-semibold">繰り上げあり</div>
        </div>

        <div className="divide-y divide-gray-50">
          <Row
            label="月々の返済額"
            without={formatYen(withoutMonthlyPayment)}
            with_={formatYen(withMonthlyPayment)}
            highlight={withMonthlyPayment < withoutMonthlyPayment}
          />
          <Row
            label="返済期間"
            without={formatMonths(withoutMonths)}
            with_={formatMonths(withMonths)}
            highlight={withMonths < withoutMonths}
          />
          <Row
            label="総返済額"
            without={formatManYen(withoutTotalPayment)}
            with_={formatManYen(withTotalPayment)}
            highlight
          />
          <Row
            label="うち利息"
            without={formatManYen(withoutTotalInterest)}
            with_={formatManYen(withTotalInterest)}
            highlight
          />
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        ※元利均等返済方式で計算しています。実際の返済額は金融機関によって異なる場合があります。
      </p>
    </div>
  );
}

function Row({
  label,
  without,
  with_,
  highlight,
}: {
  label: string;
  without: string;
  with_: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 text-sm py-4 px-4 hover:bg-gray-50 transition-colors">
      <div className="font-medium text-gray-600 flex items-center">{label}</div>
      <div className="text-center text-gray-500">{without}</div>
      <div className={`text-center font-semibold ${highlight ? 'text-blue-600' : 'text-gray-700'}`}>{with_}</div>
    </div>
  );
}
