import React, { useState } from 'react';
import { Icons } from '../constants.tsx';
import { Screen, formatCurrency } from '../types.ts';

interface GoalDetailProps {
  navigateTo: (screen: Screen) => void;
}

const GoalDetail: React.FC<GoalDetailProps> = ({ navigateTo }) => {
  const [sipAmount, setSipAmount] = useState(3200);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateCorpus = (pmt: number) => {
    const months = 11 * 12; // 11 years
    const rate = 0.01; // 1% monthly (approx 12.6% annual)
    const corpus = pmt * ((Math.pow(1 + rate, months) - 1) / rate);
    return Math.round(corpus);
  };

  const projectedCorpus = calculateCorpus(sipAmount);
  const progressPercent = Math.min(100, Math.round((projectedCorpus / 4700000) * 100));

  const handleStart = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigateTo('goals');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        <div className="text-6xl mb-6 animate-bounce">🎉</div>
        <h2 className="text-display mb-2">SIP Started!</h2>
        <p className="text-body">Your goal for Child's Education is now back on track.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-24 gap-6 pt-3">
      {/* Goal header - Refactored to remove card soup */}
      <section>
        <div className="mx-4 border-t border-[#F0F0F0] py-6">
          <h2 className="text-title">🎓 Higher Education</h2>
          <p className="text-label mt-1">₹47,00,000 needed by June 2037 (11 years)</p>
          
          <div className="flex items-center justify-center py-8">
            <div className="relative w-[120px] h-[120px] flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#F5F5F5" strokeWidth="10" />
                <circle 
                  cx="60" cy="60" r="54" fill="none" stroke="#FF9800" strokeWidth="10" 
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - 0.08)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-display leading-none">8%</span>
                <span className="text-micro mt-1">funded</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#F0F0F0]">
            <div>
              <p className="text-micro">Saved</p>
              <p className="text-[15px] font-bold text-text-1 mt-1">₹3,76,000</p>
            </div>
            <div>
              <p className="text-micro">Gap</p>
              <p className="text-[15px] font-bold text-groww-red mt-1">₹43,24,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulation card */}
      <section className="px-4">
        <div className="bg-[#F7F8FA] rounded-xl p-5 border border-[#F0F0F0]">
          <p className="text-label font-bold text-text-2">Monthly SIP needed</p>
          <div className="flex items-center justify-between mt-3 mb-4">
            <span className="text-display text-primary">{formatCurrency(sipAmount)}/mo</span>
            <span className="text-[13px] font-bold text-groww-green bg-groww-green/10 px-2 py-1 rounded">Projected: {formatCurrency(projectedCorpus)}</span>
          </div>
          
          <input 
            type="range" 
            min="500" 
            max="10000" 
            step="100" 
            value={sipAmount}
            onChange={(e) => setSipAmount(parseInt(e.target.value))}
            className="w-full h-2 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer accent-primary mb-6"
          />

          <div className="flex items-center justify-between text-micro mb-2">
            <span>Progress towards goal</span>
            <span className="text-text-1">{progressPercent}%</span>
          </div>
          <div className="h-2.5 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>
      </section>

      {/* Recommended fund */}
      <section className="px-4">
        <div className="bg-white border border-primary/20 rounded-xl p-5 shadow-secondary">
          <p className="text-micro mb-4">Recommended for this goal</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-groww-blue/10 flex items-center justify-center text-groww-blue font-bold border border-groww-blue/20">
              MI
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-text-1">Mirae Asset Mid Cap Fund</p>
              <p className="text-label">Mid Cap · Direct Growth</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            <div className="bg-groww-blue/10 text-groww-blue text-[10px] font-bold px-2.5 py-1 rounded-lg">16.4% CAGR</div>
            <div className="bg-primary/10 text-groww-green text-[10px] font-bold px-2.5 py-1 rounded-lg">High Growth</div>
            <div className="bg-groww-purple/10 text-groww-purple text-[10px] font-bold px-2.5 py-1 rounded-lg">10yr+ horizon</div>
          </div>
        </div>
      </section>

      {/* Start button */}
      <section className="px-4">
        <button 
          onClick={handleStart}
          className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-primary btn-interactive"
        >
          Start SIP · {formatCurrency(sipAmount)}/month
        </button>
      </section>
    </div>
  );
};

export default GoalDetail;
