import React from 'react';
import { Icons } from '../constants.tsx';
import { Screen, formatCurrency } from '../types.ts';

interface FundDetailProps {
  navigateTo: (screen: Screen) => void;
}

const FundDetail: React.FC<FundDetailProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col pb-24 gap-6 pt-3">
      {/* Fund header */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-secondary border-light">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-groww-blue/10 flex items-center justify-center text-groww-blue font-bold text-xl border border-groww-blue/20">
              MI
            </div>
            <div className="flex-1">
              <h2 className="text-title">Mirae Asset Large Cap Fund</h2>
              <p className="text-label mt-0.5">Large Cap · Direct Growth · ★★★★☆</p>
            </div>
          </div>
          <div className="h-[1px] bg-[#F0F0F0] my-5" />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-micro">Invested</p>
              <p className="text-[15px] font-bold text-text-1 mt-1">₹43,000</p>
            </div>
            <div>
              <p className="text-micro">Current</p>
              <p className="text-[15px] font-bold text-text-1 mt-1">₹48,200</p>
            </div>
            <div>
              <p className="text-micro">P&L</p>
              <p className="text-[15px] font-bold text-groww-green mt-1">+₹5,200</p>
            </div>
          </div>
        </div>
      </section>

      {/* Returns comparison */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-secondary border-light">
          <h3 className="text-title mb-5">Return Comparison</h3>
          
          <div className="flex flex-col gap-5">
            {[
              { label: 'Your XIRR', value: '9.4%', fill: '47%', color: '#3B82F6' },
              { label: 'Fund XIRR', value: '14.2%', fill: '71%', color: '#00D09C' },
              { label: 'Category avg', value: '11.5%', fill: '57%', color: '#9E9E9E' },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <span className="w-[85px] text-right text-label font-medium">{item.label}</span>
                <div className="flex-1 mx-4 h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-700" style={{ width: item.fill, backgroundColor: item.color }} />
                </div>
                <span className="w-[50px] text-[15px] font-bold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insight card */}
      <section className="px-4">
        <div className="bg-groww-amber/5 rounded-xl p-4 border border-groww-amber/10">
          <div className="flex items-center gap-2">
            <Icons.Zap className="w-4 h-4 text-groww-amber" />
            <span className="text-micro text-groww-amber">AI Insight</span>
          </div>
          <p className="text-body mt-2.5 leading-relaxed">
            Your lump sum of ₹15,000 in January 2024 was invested near a 3-month market high. This single timing decision reduced your effective XIRR by approximately 4.8%. SIP investors in this same fund earned 13.1% XIRR over the same period.
          </p>
        </div>
      </section>

      {/* Action card */}
      <section className="px-4">
        <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
          <h4 className="text-[15px] font-bold text-text-1">SIP investors earned 13.1% — 3.7% more than you</h4>
          <p className="text-body mt-1.5">Switch all future investments in this fund to monthly SIP to avoid market timing risks.</p>
          <button className="w-full bg-primary text-white font-bold h-12 rounded-xl mt-5 shadow-primary btn-interactive">
            Switch to SIP →
          </button>
        </div>
      </section>
    </div>
  );
};

export default FundDetail;
