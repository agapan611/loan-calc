export default function AffiliateSection() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-white">
      <div className="mb-6">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">さらなる節約のために</p>
        <h3 className="text-xl font-bold mb-2">借り換えで金利を下げると、もっと節約できます</h3>
        <p className="text-slate-300 text-sm">
          金利が1%下がるだけで、数百万円の節約になることも。今より低い金利のローンに借り換えできないか、無料で比較してみましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AffiliateCard
          name="ARUHI（アルヒ）"
          description="フラット35最大手。固定金利派に人気の住宅ローン専門会社。"
          badge="無料相談"
          href="#"
          color="from-orange-500 to-orange-400"
        />
        <AffiliateCard
          name="住信SBIネット銀行"
          description="変動金利の低さで注目。ネット手続きで諸費用を抑えられる。"
          badge="最短当日審査"
          href="#"
          color="from-blue-500 to-blue-400"
        />
      </div>

      <p className="mt-4 text-xs text-slate-500 text-center">
        ※ 上記リンクはアフィリエイトリンクです。借り換えの判断はご自身の責任でお願いします。
      </p>
    </div>
  );
}

function AffiliateCard({
  name,
  description,
  badge,
  href,
  color,
}: {
  name: string;
  description: string;
  badge: string;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/10 hover:bg-white/15 rounded-xl p-4 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-bold text-white">{name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${color} text-white shrink-0`}>
          {badge}
        </span>
      </div>
      <p className="text-slate-300 text-xs leading-relaxed">{description}</p>
      <div className="mt-3 text-xs text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
        詳しく見る
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}
