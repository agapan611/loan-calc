import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyData } from '../utils/loanCalculator';

interface LoanChartProps {
  data: MonthlyData[];
}

export default function LoanChart({ data }: LoanChartProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h3 className="text-base font-bold text-gray-800 mb-6">残債推移グラフ</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tickFormatter={(v) => `${v}年目`}
            tick={{ fontSize: 12, fill: '#9ca3af' }}
          />
          <YAxis
            tickFormatter={(v) => `${v}万`}
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            width={50}
          />
          <Tooltip
            formatter={(value: unknown, name: unknown) => [
              `${Number(value ?? 0).toLocaleString('ja-JP')}万円`,
              name === 'balanceWithout' ? '繰り上げなし' : '繰り上げあり',
            ]}
            labelFormatter={(label) => `${label}年目`}
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '13px' }}
          />
          <Legend
            formatter={(value) => (value === 'balanceWithout' ? '繰り上げなし' : '繰り上げあり')}
            wrapperStyle={{ fontSize: '13px' }}
          />
          <Line
            type="monotone"
            dataKey="balanceWithout"
            stroke="#d1d5db"
            strokeWidth={2.5}
            dot={false}
            strokeDasharray="6 3"
          />
          <Line
            type="monotone"
            dataKey="balanceWith"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
