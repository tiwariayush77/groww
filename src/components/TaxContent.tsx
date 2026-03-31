import React, { useState } from 'react';
import { Icons } from '../constants.tsx';
import { Screen, formatCurrency } from '../types.ts';

interface TaxContentProps {
  navigateTo: (screen: Screen) => void;
}

const TaxContent: React.FC<TaxContentProps> = ({ navigateTo }) => {
  const [isExplainerExpanded, setIsExplainerExpanded] = useState(false);
  const [activeMonths, setActiveMonths] = useState<number[]>([0, 1, 2, 3]);

  const toggleMonth = (index: number) => {
    if (activeMonths.includes(index)) {
      setActiveMonths(activeMonths.filter(i => i !== index));
    } else {
      setActiveMonths([...activeMonths, index]);
    }
  };

  return (
    <div className="flex flex-col pb-24 gap-6 pt-3">
      {/* FY SUMMARY CARD */}
      <section className="px-4">
        <div className="bg-gradient-to-br from-[#1F1F1F] to-[#2A2A2A] rounded-xl p-5 shadow-primary border border-white/5">
          <p className="text-micro text-white/50 mb-4">Financial Year 2025–26</p>
          <div className="flex gap-8">
            <div>
              <p className="text-label text-white/60">LTCG Gains</p>
              <p className="text-display text-white mt-1">₹1,24,200</p>
            </div>
            <div>
              <p className="text-label text-white/60">STCG Gains</p>
              <p className="text-display text-white mt-1">₹8,400</p>
            </div>
          </div>

          <div className="bg-groww-red/15 border border-groww-red/30 rounded-xl p-3.5 mt-5">
            <p className="text-[12px] text-white/90 leading-relaxed">
              ⚠️ LTCG exemption limit is ₹1,25,000. You used ₹1,24,200 — only ₹800 remaining.
            </p>
          </div>
          <p className="text-[11px] text-white/40 mt-3 italic leading-relaxed">
            If you had booked profits before March 31, tax liability would have been ₹0.
          </p>
        </div>
      </section>

      {/* WHAT YOU MISSED THIS YEAR */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-secondary border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-title">This Year's Missed Opportunity</h3>
            <div className="bg-groww-red/10 text-groww-red text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              ₹15,500 tax
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { id: 'HD', name: 'HDFC Flexi Cap', info: 'Book 200 units before Mar 31', saved: '₹8,200 saved' },
              { id: 'PP', name: 'Parag Parikh', info: 'Book 150 units before Mar 31', saved: '₹4,800 saved' },
              { id: 'SB', name: 'SBI Nifty 50', info: 'Book 80 units before Mar 31', saved: '₹2,500 saved' },
            ].map((item, i) => (
              <div key={i} className="flex items-center bg-[#F7F8FA] rounded-xl p-3 border border-[#F0F0F0] interactive">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] bg-white text-text-2 shadow-sm border border-[#F0F0F0]">
                  {item.id}
                </div>
                <div className="flex-1 px-3">
                  <p className="text-[13px] font-bold text-text-1">{item.name}</p>
                  <p className="text-label">{item.info}</p>
                </div>
                <span className="text-[12px] font-bold text-groww-red">{item.saved}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT YEAR PLANNER */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-secondary border-light">
          <h3 className="text-title mb-4">Plan for FY 2026–27</h3>
          
          <div className="grid grid-cols-6 gap-1 mb-6">
            {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((month, i) => (
              <button 
                key={i}
                onClick={() => toggleMonth(i)}
                className={`h-8 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${
                  activeMonths.includes(i) 
                    ? 'bg-primary text-white shadow-primary scale-105' 
                    : 'bg-[#F5F5F5] text-text-3 hover:bg-[#E0E0E0]'
                }`}
              >
                {month}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <h4 className="text-[13px] font-bold text-text-1 flex items-center gap-2">
                <Icons.Bell className="w-4 h-4 text-primary" /> Set March 2027 reminder
              </h4>
              <p className="text-body mt-1">Remind me in March to review LTCG before FY ends</p>
              <div className="flex justify-end mt-3">
                <button className="bg-primary text-white text-[12px] font-bold px-4 py-2 rounded-xl shadow-primary btn-interactive">
                  Set reminder
                </button>
              </div>
            </div>

            <div className="bg-groww-amber/5 rounded-xl p-4 border border-groww-amber/10">
              <h4 className="text-[13px] font-bold text-text-1 flex items-center gap-2">
                <Icons.TrendingUp className="w-4 h-4 text-groww-amber" /> Auto-track LTCG
              </h4>
              <p className="text-body mt-1">Get a notification when you're within ₹10,000 of the ₹1.25L limit</p>
              <div className="flex justify-end mt-3">
                <button className="bg-groww-amber text-white text-[12px] font-bold px-4 py-2 rounded-xl shadow-primary btn-interactive">
                  Enable
                </button>
              </div>
            </div>

            <div className="bg-groww-blue/5 rounded-xl p-4 border border-groww-blue/10">
              <h4 className="text-[13px] font-bold text-text-1 flex items-center gap-2">
                <Icons.Download className="w-4 h-4 text-groww-blue" /> Download Tax P&L
              </h4>
              <p className="text-body mt-1">LTCG, STCG, dividends — ready for your CA</p>
              <div className="flex justify-end mt-3">
                <button className="bg-groww-blue text-white text-[12px] font-bold px-4 py-2 rounded-xl shadow-primary btn-interactive">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW LTCG TAX WORKS */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-secondary border-light overflow-hidden">
          <button 
            onClick={() => setIsExplainerExpanded(!isExplainerExpanded)}
            className="w-full flex items-center justify-between interactive"
          >
            <span className="text-title">How LTCG Tax Works</span>
            <Icons.ChevronRight className={`w-5 h-5 text-text-3 transition-transform duration-300 ${isExplainerExpanded ? 'rotate-90' : ''}`} />
          </button>
          
          {isExplainerExpanded && (
            <div className="mt-4 bg-[#F7F8FA] rounded-xl p-4 animate-in slide-in-from-top-2 duration-300 border border-[#F0F0F0]">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-groww-green mt-2 shrink-0" />
                  <p className="text-body">Holding mutual funds &gt; 1 year = Long Term Capital Gain (LTCG)</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-groww-amber mt-2 shrink-0" />
                  <p className="text-body">First ₹1,25,000 of LTCG every year is tax-free</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-groww-red mt-2 shrink-0" />
                  <p className="text-body">Gains above ₹1,25,000 taxed at 12.5% with no indexation benefit</p>
                </div>
                <div className="bg-white rounded-lg p-3 mt-2 border border-[#F0F0F0]">
                  <p className="text-[12px] text-text-1 leading-relaxed">
                    <span className="font-bold">Example:</span> ₹2,00,00,000 LTCG → ₹74,375 taxable → ₹9,297 tax payable
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TaxContent;
