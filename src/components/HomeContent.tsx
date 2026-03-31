import React from 'react';
import { motion } from 'motion/react';
import { Icons } from '../constants.tsx';
import { Screen } from '../types.ts';

interface HomeContentProps {
  navigateTo: (screen: Screen) => void;
  isCrashSimActive: boolean;
  setIsCrashSimActive: (active: boolean) => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ navigateTo, isCrashSimActive, setIsCrashSimActive }) => {
  return (
    <div className="flex flex-col pb-6 gap-6 pt-3">
      {/* Portfolio Snapshot */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-label uppercase">Total Portfolio Value</span>
          <div className="flex items-center gap-1 text-groww-green text-[12px] font-bold">
            <Icons.TrendingUp className="w-3 h-3" />
            +₹1,842 (0.8%)
          </div>
        </div>
        <h1 className="text-display">₹2,34,518</h1>
        <div className="flex items-center justify-between mt-1">
          <p className="text-label">Invested ₹1,89,000</p>
          <p className="text-[11px] text-groww-green font-bold">+24.1% total returns</p>
        </div>
      </section>

      {/* Quick Actions - Feature 2: Horizontal Pill Row */}
      <section>
        <h2 className="text-micro px-4 mb-2">Quick Actions</h2>
        <div className="flex overflow-x-auto gap-2 px-4 pb-2 no-scrollbar">
          {[
            { label: 'My Goals', icon: Icons.Goals, color: 'text-groww-blue', screen: 'goals' },
            { label: 'Mutual Funds', icon: Icons.MF, color: 'text-primary', screen: 'mf' },
            { label: 'Portfolio', icon: Icons.Portfolio, color: 'text-groww-purple', screen: 'portfolio' },
            { label: 'Tax Centre', icon: Icons.Tax, color: 'text-groww-amber', screen: 'tax' },
            { label: 'Market Pulse', icon: Icons.Activity, color: 'text-groww-green', screen: 'home' },
            { label: 'Your SIPs', icon: Icons.Repeat, color: 'text-groww-amber', screen: 'mf' },
          ].map((action, i) => (
            <button 
              key={i}
              onClick={() => navigateTo(action.screen as Screen)}
              className="flex-shrink-0 flex items-center gap-1.5 bg-[#F7F8FA] border-light rounded-full px-[14px] py-2 btn-interactive"
            >
              <action.icon className={`w-4 h-4 ${action.color}`} />
              <span className="text-[12px] font-medium text-text-1 whitespace-nowrap">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Feature 5: Portfolio Health Score */}
      <section className="px-4">
        <div id="health-score-card" className="bg-white rounded-xl shadow-primary p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-title">Portfolio Health</h3>
            <div className="flex items-center gap-1 text-groww-amber bg-groww-amber-bg px-2 py-0.5 rounded text-[10px] font-bold">
              <Icons.AlertCircle className="w-3 h-3" />
              NEEDS ATTENTION
            </div>
          </div>

          <div className="flex items-center gap-6 mb-4">
            {/* Donut Chart */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_4px_8px_rgba(255,152,0,0.25)]">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#F5F5F5"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#FF9800"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - 0.62)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-display leading-none" style={{ color: '#FF9800' }}>62</span>
                <span className="text-[10px] text-text-3 font-bold">/100</span>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="flex-1 space-y-2">
              {[
                { label: 'Diversification', score: 45, color: 'bg-groww-red' },
                { label: 'Returns vs Benchmark', score: 78, color: 'bg-groww-green' },
                { label: 'Goal Progress', score: 52, color: 'bg-groww-amber' },
                { label: 'Safety Readiness', score: 85, color: 'bg-groww-green' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-1.5 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <span className="text-label">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-bold text-text-1">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#F5F5F5]">
            <button 
              onClick={() => navigateTo('portfolio')}
              className="w-full flex items-center justify-between text-primary text-[13px] font-bold btn-interactive"
            >
              View detailed health report
              <Icons.ChevronRight className="w-4 h-4 text-[#D0D0D0]" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature 3: Tax Harvest Alert */}
      <section className="px-4">
        <div id="tax-alert-card" className="bg-white rounded-xl shadow-primary overflow-hidden border-l-4 border-groww-green">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-groww-green/10 flex items-center justify-center">
                <Icons.Tax className="w-4 h-4 text-groww-green" />
              </div>
              <h3 className="text-title">Tax Harvest Alert</h3>
            </div>
            <p className="text-body mb-4">
              You have <span className="font-bold text-text-1">₹42,000</span> in unclaimed LTCG tax exemptions for FY 2025-26. Book profits now to save tax.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => navigateTo('tax')}
                className="flex-1 bg-primary text-white py-2.5 rounded-lg text-[13px] font-bold btn-interactive"
              >
                Harvest Now
              </button>
              <button className="flex-1 border border-border-color text-text-1 py-2.5 rounded-lg text-[13px] font-bold btn-interactive">
                Remind Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 1: SIP Continuity Guard Simulation */}
      <section className="px-4">
        <div id="crash-guard-card" className={`rounded-xl shadow-primary overflow-hidden transition-all duration-300 border-l-4 ${isCrashSimActive ? 'bg-groww-red/5 border-groww-red' : 'bg-white border-groww-amber'}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCrashSimActive ? 'bg-groww-red/10' : 'bg-groww-blue/10'}`}>
                  <Icons.Shield className={`w-4 h-4 ${isCrashSimActive ? 'text-groww-red' : 'text-groww-blue'}`} />
                </div>
                <h3 className="text-title">SIP Continuity Guard</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-micro">Simulation</span>
                <button 
                  onClick={() => setIsCrashSimActive(!isCrashSimActive)}
                  className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${isCrashSimActive ? 'bg-groww-red' : 'bg-text-3'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${isCrashSimActive ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {!isCrashSimActive ? (
              <div>
                <p className="text-body mb-4">
                  Markets can be volatile. See how Groww AI helps you stay disciplined during a crash.
                </p>
                <button 
                  onClick={() => setIsCrashSimActive(true)}
                  className="w-full py-2.5 border border-groww-blue text-groww-blue rounded-lg text-[13px] font-bold btn-interactive"
                >
                  Simulate Market Crash
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white/50 rounded-lg p-3 mb-4 border border-groww-red/20">
                  <div className="flex items-center gap-2 text-groww-red font-bold text-[14px] mb-1">
                    <Icons.TrendingDown className="w-4 h-4" />
                    Market is down 12% this week!
                  </div>
                  <p className="text-body">
                    Groww AI detected panic selling. Pausing SIPs now could cost you <span className="font-bold text-text-1">₹1.4L</span> in long-term wealth.
                  </p>
                </div>
                <div className="space-y-2">
                  <button 
                    onClick={() => setIsCrashSimActive(false)}
                    className="w-full bg-groww-green text-white py-2.5 rounded-lg text-[13px] font-bold btn-interactive"
                  >
                    Continue my SIPs (Recommended)
                  </button>
                  <button 
                    onClick={() => setIsCrashSimActive(false)}
                    className="w-full bg-white border border-border-color text-text-1 py-2.5 rounded-lg text-[13px] font-bold btn-interactive"
                  >
                    Pause for 1 month only
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Your SIPs - Section 2: Remove Card Soup, use dividers */}
      <section>
        <div className="flex items-center justify-between px-4 mb-2">
          <h2 className="text-micro">Your SIPs</h2>
          <button className="text-[11px] font-bold text-primary btn-interactive">VIEW ALL</button>
        </div>
        <div className="mx-4 border-t border-[#F0F0F0]">
          {[
            { name: 'HDFC Flexi Cap', amount: 3000, value: '₹92,418', returns: '+22.4%', initials: 'HD', color: 'text-groww-green', bgColor: 'bg-groww-green/10' },
            { name: 'Axis Bluechip', amount: 2000, value: '₹38,800', returns: '+18.1%', initials: 'AX', color: 'text-groww-blue', bgColor: 'bg-groww-blue/10' },
          ].map((sip, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-[#F0F0F0] interactive">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${sip.bgColor} ${sip.color} flex items-center justify-center font-bold text-[13px] border border-black/5`}>
                  {sip.initials}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-text-1">{sip.name}</h4>
                  <p className="text-label">₹{sip.amount.toLocaleString('en-IN')}/month</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <p className="text-[13px] font-bold text-text-1">{sip.value}</p>
                  <p className="text-[10px] text-groww-green font-bold">{sip.returns}</p>
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

export default HomeContent;
