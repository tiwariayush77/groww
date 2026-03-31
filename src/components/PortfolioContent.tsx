import React from 'react';
import { Icons } from '../constants.tsx';
import { Screen, formatCurrency } from '../types.ts';

interface PortfolioContentProps {
  navigateTo: (screen: Screen) => void;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col pb-24 gap-6 pt-3">
      {/* XIRR HERO CARD */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-primary border-light">
          <p className="text-micro mb-4">Your Returns</p>
          
          <div className="flex gap-3">
            <div className="bg-[#F7F8FA] rounded-xl p-4 flex-1">
              <p className="text-label">Your XIRR</p>
              <p className="text-display leading-tight">11.2%</p>
              <p className="text-[11px] text-groww-green font-bold mt-1">₹45,518 earned</p>
            </div>
            <div className="bg-groww-amber/5 rounded-xl p-4 flex-1">
              <p className="text-label">Nifty 50</p>
              <p className="text-display text-groww-amber leading-tight">13.8%</p>
              <p className="text-[11px] text-text-3 font-medium mt-1">Benchmark</p>
            </div>
          </div>

          <div className="bg-groww-amber/5 rounded-xl p-3 flex justify-between items-center mt-4 border border-groww-amber/10">
            <span className="text-[13px] font-medium text-groww-amber">You're 2.6% behind index</span>
            <button onClick={() => navigateTo('fund-detail')} className="text-[13px] font-bold text-primary btn-interactive">Why? →</button>
          </div>

          <div className="bg-primary/5 rounded-lg p-3 mt-3">
            <p className="text-[11px] text-text-1 leading-relaxed">
              💡 If you had matched Nifty 50 returns, your portfolio would be ₹8,240 larger today.
            </p>
          </div>
        </div>
      </section>

      {/* ALLOCATION CHART */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-secondary border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-title">Allocation</h3>
            <span className="text-label">By category</span>
          </div>

          <div className="h-3 bg-[#F5F5F5] rounded-full w-full flex overflow-hidden mb-4">
            <div className="h-full bg-primary" style={{ width: '52%' }} />
            <div className="h-full bg-groww-blue" style={{ width: '31%' }} />
            <div className="h-full bg-groww-purple" style={{ width: '10%' }} />
            <div className="h-full bg-groww-amber" style={{ width: '7%' }} />
          </div>

          <div className="grid grid-cols-2 gap-y-3">
            {[
              { color: '#00D09C', label: 'Flexi Cap', percent: '52%' },
              { color: '#3B82F6', label: 'Large Cap', percent: '31%' },
              { color: '#8B5CF6', label: 'Index', percent: '10%' },
              { color: '#FF9800', label: 'Liquid', percent: '7%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-label text-text-2">{item.label}</span>
                <span className="text-[11px] font-bold text-text-1">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUND PERFORMANCE TABLE - Remove Card Soup, use dividers */}
      <section>
        <div className="flex items-center justify-between px-4 mb-2">
          <h2 className="text-micro">Fund-wise Performance</h2>
          <button className="text-[11px] font-bold text-primary btn-interactive">SORT BY XIRR</button>
        </div>
        <div className="mx-4 border-t border-[#F0F0F0]">
          {[
            { id: 'HD', name: 'HDFC Flexi Cap', xirr: '14.2%', gap: '+0.4%', status: 'Ahead', color: '#00B386' },
            { id: 'MI', name: 'Mirae Large Cap', xirr: '9.4%', gap: '-4.4%', status: 'Behind', color: '#FF9800' },
            { id: 'AX', name: 'Axis Bluechip', xirr: '12.1%', gap: '-1.7%', status: 'Slight', color: '#00B386' },
            { id: 'PP', name: 'Parag Parikh', xirr: '11.8%', gap: '-2.0%', status: 'Slight', color: '#00B386' },
            { id: 'SB', name: 'SBI Nifty 50', xirr: '14.8%', gap: '+1.0%', status: 'Ahead', color: '#00B386' },
            { id: 'NI', name: 'Nippon Large', xirr: '7.2%', gap: '-6.6%', status: 'Behind', color: '#E74C3C' },
            { id: 'UT', name: 'UTI Flexi Cap', xirr: '8.1%', gap: '-5.7%', status: 'Behind', color: '#FF9800' },
          ].map((fund, i) => (
            <div 
              key={i} 
              onClick={() => navigateTo('fund-detail')}
              className="flex items-center py-4 border-b border-[#F0F0F0] interactive"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[13px] bg-[#F7F8FA] text-text-2 border border-[#F0F0F0]">
                {fund.id}
              </div>
              <div className="flex-1 px-3">
                <p className="text-[13px] font-bold text-text-1">{fund.name}</p>
                <p className="text-label">XIRR vs Nifty</p>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-[13px] font-bold text-text-1">{fund.xirr}</span>
                    <span className="text-[10px] font-bold" style={{ color: fund.color }}>{fund.gap}</span>
                  </div>
                  <div className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded mt-1 uppercase tracking-wider ${
                    fund.status === 'Ahead' ? 'bg-groww-green/10 text-groww-green' : 
                    fund.status === 'Behind' ? 'bg-groww-amber/10 text-groww-amber' : 
                    'bg-groww-green/10 text-groww-green'
                  }`}>
                    {fund.status}
                  </div>
                </div>
                <Icons.ChevronRight className="w-4 h-4 text-[#D0D0D0]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioContent;
