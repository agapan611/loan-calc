import { useState } from 'react';
import type { LoanInput, RepaymentType } from '../utils/loanCalculator';

interface InputFormProps {
  onCalculate: (input: LoanInput) => void;
}

export default function InputForm({ onCalculate }: InputFormProps) {
  const [balance, setBalance] = useState('3000');
  const [annualRate, setAnnualRate] = useState('1.5');
  const [remainingYears, setRemainingYears] = useState('25');
  const [prepayment, setPrepayment] = useState('100');
  const [repaymentType, setRepaymentType] = useState<RepaymentType>('period');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseFloat(balance);
    const r = parseFloat(annualRate);
    const y = parseFloat(remainingYears);
    const p = parseFloat(prepayment);

    if (!b || !r || !y || !p || b <= 0 || r <= 0 || y <= 0 || p <= 0) {
      setError('すべての項目に正しい数値を入力してください');
      return;
    }
    if (b > 99999) {
      setError('借入残高は99,999万円以下で入力してください');
      return;
    }
    if (r > 20) {
      setError('金利は20%以下で入力してください');
      return;
    }
    if (y > 50) {
      setError('返済年数は50年以下で入力してください');
      return;
    }
    if (p >= b) {
      setError('繰り上げ返済額は借入残高より小さくしてください');
      return;
    }
    setError('');
    onCalculate({ balance: b, annualRate: r, remainingYears: y, prepayment: p, repaymentType });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">シミュレーション条件を入力</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            借入残高
          </label>
          <div className="relative">
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="3000"
              min="1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">万円</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            適用金利（年利）
          </label>
          <div className="relative">
            <input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="1.5"
              step="0.1"
              min="0.01"
              max="20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            残り返済年数
          </label>
          <div className="relative">
            <input
              type="number"
              value={remainingYears}
              onChange={(e) => setRemainingYears(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="25"
              min="1"
              max="50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">年</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            繰り上げ返済額
          </label>
          <div className="relative">
            <input
              type="number"
              value={prepayment}
              onChange={(e) => setPrepayment(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="100"
              min="1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">万円</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-600 mb-2">繰り上げ返済タイプ</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRepaymentType('period')}
            className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
              repaymentType === 'period'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold">期間短縮型</div>
            <div className="text-xs mt-0.5 opacity-75">返済期間を短くする</div>
          </button>
          <button
            type="button"
            onClick={() => setRepaymentType('amount')}
            className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
              repaymentType === 'amount'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold">返済額減額型</div>
            <div className="text-xs mt-0.5 opacity-75">月々の負担を減らす</div>
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors text-base shadow-sm"
      >
        繰り上げ返済の効果を計算する
      </button>
    </form>
  );
}
