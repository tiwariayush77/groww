import React from 'react';
import { Icons } from '../constants.tsx';
import { Screen, formatCurrency } from '../types.ts';

interface MFContentProps {
  navigateTo: (screen: Screen) => void;
}

const MFContent: React.FC<MFContentProps> = ({ navigateTo }) => {
  const funds = [
    { id: 'HD', name: 'HDFC Flexi Cap', cat: 'Flexi Cap', sip: '₹3,000/mo', value: '₹92,418', ret: '+22.4%', xirr: '14.2%', progress: 85, color: '#00B386', bgColor: 'bg-groww-green/10' },
    { id: 'MI', name: 'Mirae Large Cap', cat: 'Large Cap', sip: '₹2,000/mo', value: '₹48,200', ret: '+11.8%', xirr: '9.4%', progress: 45, color: '#3B82F6', bgColor: 'bg-groww-blue/10' },
    { id: 'AX', name: 'Axis Bluechip', cat: 'Large Cap', sip: '₹2,000/mo', value: '₹38,800', ret: '+18.1%', xirr: '12.1%', progress: 36, color: '#5367FF', bgColor: 'bg-groww-indigo/10' },
    { id: 'PP', name: 'Parag Parikh', cat: 'Flexi Cap', sip: '₹1,500/mo', value: '₹28,100', ret: '+15.3%', xirr: '11.8%', progress: 26, color: '#FF6B35', bgColor: 'bg-groww-orange/10' },
    { id: 'SB', name: 'SBI Nifty 50', cat: 'Index', sip: '₹1,000/mo', value: '₹18,400', ret: '+22.7%', xirr: '14.8%', progress: 17, color: '#22C55E', bgColor: 'bg-groww-green/10' },
    { id: 'NI', name: 'Nippon Large Cap', cat: 'Large Cap', sip: '₹1,000/mo', value: '₹5,180', ret: '+8.9%', xirr: '7.2%', progress: 5, color: '#A855F7', bgColor: 'bg-groww-purple/10' },
    { id: 'UT', name: 'UTI Flexi Cap', cat: 'Flexi Cap', sip: '₹500/mo', value: '₹3,402', ret: '+9.7%', xirr: '8.1%', progress: 3, color: '#F59E0B', bgColor: 'bg-groww-amber/10' },
  ];

  return (
    <div className="flex flex-col pb-24 gap-6 pt-3">
      {/* Portfolio summary */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-primary border-light">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label uppercase">My Mutual Funds</span>
            <div className="bg-[#F7F8FA] text-text-2 text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F0F0F0]">
              7 FUNDS
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-display">₹2,34,500</h2>
            <span className="text-[13px] font-bold text-groww-green">▲ +₹1,240 (0.5%)</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#F5F5F5]">
            <div>
              <p className="text-micro">Invested</p>
              <p className="text-[13px] font-bold text-text-1">₹1,89,000</p>
            </div>
            <div>
              <p className="text-micro">Returns</p>
              <p className="text-[13px] font-bold text-groww-green">+₹45,500</p>
            </div>
            <div>
              <p className="text-micro">XIRR</p>
              <p className="text-[13px] font-bold text-text-1">11.2%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Overlap Ribbon */}
      <section className="px-4">
        <div 
          id="tour-overlap-ribbon"
          onClick={() => navigateTo('overlap')}
          className="bg-groww-amber/5 border border-groww-amber/20 rounded-xl p-4 flex items-center justify-between interactive"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Icons.AlertTriangle className="w-4 h-4 text-groww-amber" />
              <span className="text-title text-text-1">Portfolio Overlap Detected</span>
            </div>
            <p className="text-body mt-1 pl-6">
              64% of your holdings repeat · ₹3,800/yr in extra fees
            </p>
          </div>
          <Icons.ChevronRight className="w-5 h-5 text-groww-amber/40" />
        </div>
      </section>

      {/* Tab switcher */}
      <section className="px-4">
        <div className="bg-[#F0F2F5] rounded-xl p-1 flex">
          <button className="flex-1 bg-white shadow-sm rounded-lg py-2 text-[13px] font-bold text-text-1 btn-interactive">
            Invested
          </button>
          <button className="flex-1 py-2 text-[13px] font-medium text-text-2 btn-interactive">
            Explore
          </button>
        </div>
      </section>

      {/* Fund list - Refactored to remove card soup */}
      <section>
        <h2 className="text-micro px-4 mb-2">Your Holdings</h2>
        <div className="mx-4 border-t border-[#F0F0F0]">
          {funds.map((fund, i) => (
            <div key={i} className="py-5 border-b border-[#F0F0F0] interactive">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[11px] ${fund.bgColor} border border-black/5`} style={{ color: fund.color }}>
                  {fund.id}
                </div>
                <div className="flex-1">
                  <p className="text-title">{fund.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-label">{fund.cat}</span>
                    <div className="w-1 h-1 rounded-full bg-[#D0D0D0]" />
                    <span className="text-label text-text-2">{fund.sip}</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <p className="text-[13px] font-bold text-text-1">{fund.value}</p>
                    <p className="text-[12px] font-bold text-groww-green">{fund.ret}</p>
                  </div>
                  <Icons.ChevronRight className="w-4 h-4 text-[#D0D0D0]" />
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-[#F5F5F5]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-label">XIRR {fund.xirr}</span>
                  <span className="text-label">Invested {formatCurrency(Math.round(parseInt(fund.value.replace(/[₹,]/g, '')) / (1 + parseFloat(fund.ret) / 100)))}</span>
                </div>
                <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${fund.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MFContent;
