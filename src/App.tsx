import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import LoanChart from './components/LoanChart';
import PatternComparison from './components/PatternComparison';
import AffiliateSection from './components/AffiliateSection';
import { calculate } from './utils/loanCalculator';
import type { LoanInput, LoanResult } from './utils/loanCalculator';
import './index.css';

export default function App() {
  const [result, setResult] = useState<LoanResult | null>(null);
  const [lastInput, setLastInput] = useState<LoanInput | null>(null);

  const handleCalculate = (input: LoanInput) => {
    const r = calculate(input);
    setResult(r);
    setLastInput(input);
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">LoanCalc</h1>
            <p className="text-xs text-gray-400">繰り上げ返済シミュレーター</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <div className="text-center py-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            繰り上げ返済で<span className="text-blue-600">いくら得する？</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            数字を入れるだけで節約効果をグラフで即可視化。スマホでもサクッと計算できます。
          </p>
        </div>

        {/* Input Form */}
        <InputForm onCalculate={handleCalculate} />

        {/* Results */}
        {result && lastInput && (
          <div id="result-section" className="space-y-6 pt-2">
            <ResultCard result={result} />
            <LoanChart data={result.chartData} />
            <PatternComparison baseInput={lastInput} />
            <AffiliateSection />
          </div>
        )}

        {/* SEO Content */}
        <div className="space-y-6 mt-8 pt-8 border-t border-gray-100">
          <SeoContent />
        </div>
      </main>

      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100 mt-4">
        <p>© 2026 LoanCalc | 計算結果はあくまで参考値です。正確な情報は金融機関にご確認ください。</p>
      </footer>
    </div>
  );
}

function SeoContent() {
  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">繰り上げ返済とは？基本をわかりやすく解説</h2>
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            繰り上げ返済とは、毎月の定期返済とは別に、ローンの元本を一括で返済することです。
            元本が減ると、それ以降の利息計算の基準が下がるため、<strong className="text-gray-800">総支払利息を大幅に削減できます</strong>。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold text-blue-800 mb-2">期間短縮型</h3>
              <p className="text-xs text-blue-700">
                月々の返済額はそのまま、返済期間を短くします。
                <strong>利息の節約効果が最も大きい</strong>のが特徴です。
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-bold text-green-800 mb-2">返済額減額型</h3>
              <p className="text-xs text-green-700">
                返済期間はそのまま、月々の負担を軽くします。
                <strong>家計の余裕を確保したい</strong>方に向いています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">よくある質問（FAQ）</h2>
        <div className="space-y-4">
          <Faq
            q="繰り上げ返済はいつするのが一番お得ですか？"
            a="早ければ早いほど効果が大きいです。返済初期は元本に対する利息の割合が高いため、1年でも早く返済すると節約額が格段に増えます。"
          />
          <Faq
            q="期間短縮型と返済額減額型、どちらがおすすめですか？"
            a="利息の削減効果は「期間短縮型」の方が大きいです。一方、家計の月々のキャッシュフローを改善したい場合は「返済額減額型」を選びましょう。"
          />
          <Faq
            q="繰り上げ返済に手数料はかかりますか？"
            a="金融機関によって異なります。ネット銀行は無料のケースが多く、大手銀行では数千〜数万円かかる場合があります。手数料が高い場合は、節約効果と比較して判断しましょう。"
          />
          <Faq
            q="住宅ローン控除（減税）に影響はありますか？"
            a="繰り上げ返済でローン残高が減ると、住宅ローン控除の控除額も下がります。残高が多いほど控除を受けられるため、低金利時代は繰り上げ返済より手元資金を増やす選択肢も検討してみてください。"
          />
        </div>
      </section>
    </>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
      <p className="font-semibold text-gray-800 text-sm mb-1.5">Q. {q}</p>
      <p className="text-gray-500 text-sm leading-relaxed">A. {a}</p>
    </div>
  );
}
