import React from 'react';
import { Icons } from '../constants.tsx';
import { Screen, formatCurrency } from '../types.ts';

interface OverlapDetailProps {
  navigateTo: (screen: Screen) => void;
}

const OverlapDetail: React.FC<OverlapDetailProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col pb-24 gap-8 pt-3">
      {/* Score section */}
      <section className="px-4 text-center">
        <h2 className="text-[56px] font-bold text-groww-amber leading-none tracking-tighter">64%</h2>
        <p className="text-body mt-2">Overlap Score</p>
        
        <div className="relative mt-6 mb-3 h-4 bg-gradient-to-r from-groww-green via-[#FFEB3B] to-groww-red rounded-full shadow-inner">
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-groww-amber rounded-full shadow-lg transition-all duration-1000 ease-out"
            style={{ left: '64%' }}
          />
        </div>
        <div className="flex justify-between px-1">
          <span className="text-micro text-groww-green">Low</span>
          <span className="text-micro text-groww-amber">Moderate</span>
          <span className="text-micro text-groww-red">High</span>
        </div>
      </section>

      {/* Stock overlap section */}
      <section className="px-4">
        <h3 className="text-title">Most Repeated Stocks</h3>
        <p className="text-body mt-1 mb-6">These stocks appear across your 7 funds</p>

        <div className="flex flex-col gap-5">
          {[
            { name: 'Reliance Industries', fill: '85%', color: '#E74C3C', count: '6/7' },
            { name: 'HDFC Bank', fill: '71%', color: '#FF9800', count: '5/7' },
            { name: 'Infosys', fill: '71%', color: '#FF9800', count: '5/7' },
            { name: 'ICICI Bank', fill: '57%', color: '#FF9800', count: '4/7' },
            { name: 'TCS', fill: '42%', color: '#F59E0B', count: '3/7' },
          ].map((stock, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="min-w-[110px] text-[13px] font-bold text-text-1">{stock.name}</span>
              <div className="flex-1 h-2.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div className="h-full transition-all duration-1000 ease-out" style={{ width: stock.fill, backgroundColor: stock.color }} />
              </div>
              <span className="w-10 text-right text-micro font-bold" style={{ color: stock.color }}>{stock.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Cost cards */}
      <section className="px-4 flex gap-4">
        <div className="bg-groww-amber/5 flex-1 rounded-xl p-4 border border-groww-amber/10">
          <div className="flex items-baseline gap-1">
            <span className="text-display text-groww-amber">₹3,800</span>
            <span className="text-label">/yr</span>
          </div>
          <p className="text-label mt-1 leading-tight">Extra fees from redundant funds</p>
        </div>
        <div className="bg-groww-red/5 flex-1 rounded-xl p-4 border border-groww-red/10">
          <span className="text-display text-groww-red">0.8%</span>
          <p className="text-label mt-1 leading-tight">Annual return drag from over-diversification</p>
        </div>
      </section>

      {/* AI Recommendation - Refactored to remove card soup */}
      <section>
        <div className="mx-4 border-t border-[#F0F0F0] py-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-title flex items-center gap-2">
              <Icons.Zap className="w-4 h-4 text-primary" /> AI Recommendation
            </span>
            <div className="bg-primary/10 text-groww-green text-[10px] font-bold px-2.5 py-1 rounded-lg">
              High confidence
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-[#F7F8FA] p-3 rounded-xl border border-[#F0F0F0]">
            <div className="w-10 h-10 rounded-xl bg-groww-amber/10 flex items-center justify-center text-groww-amber font-bold text-xs border border-groww-amber/20">
              UT
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-text-1">UTI Flexi Cap Fund</p>
              <p className="text-label">78% overlap with HDFC Flexi Cap</p>
            </div>
            <div className="bg-groww-red/10 text-groww-red text-[10px] font-bold px-2.5 py-1.5 rounded-lg">
              Remove
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-4 mt-5 border border-primary/10">
            <p className="text-body leading-relaxed">
              Redirect ₹500/month from UTI Flexi Cap → SBI Nifty 50 Index Fund. This reduces overlap to 38%, saves ₹540/year in expense ratio, and improves true diversification.
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={() => navigateTo('mf')}
              className="flex-1 bg-primary text-white text-[13px] font-bold h-11 rounded-xl shadow-primary btn-interactive"
            >
              Pause UTI SIP
            </button>
            <button 
              onClick={() => navigateTo('mf')}
              className="flex-1 bg-white border border-[#E0E0E0] text-text-2 text-[13px] font-bold h-11 rounded-xl btn-interactive"
            >
              Remind later
            </button>
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <p className="text-body leading-relaxed italic">
            💡 Ideal portfolio: 3–4 funds across Large Cap Index + Flexi Cap + Mid Cap. You don't need 7.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OverlapDetail;
