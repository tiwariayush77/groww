import React from 'react';
import { Icons } from '../constants.tsx';
import { Screen, formatCurrency } from '../types.ts';

interface GoalsContentProps {
  navigateTo: (screen: Screen) => void;
}

const GoalsContent: React.FC<GoalsContentProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col pb-24 gap-6 pt-3">
      {/* Goal Summary bar */}
      <section className="px-4">
        <div className="bg-white rounded-xl shadow-primary p-4 flex items-center justify-between border-light">
          <div>
            <p className="text-label uppercase">3 of 5 goals on track</p>
            <h2 className="text-display">58%</h2>
          </div>
          <div className="text-right">
            <p className="text-label uppercase">Total Goal Value</p>
            <p className="text-title">₹72,40,000</p>
          </div>
        </div>
      </section>

      {/* Goal Cards */}
      <section>
        <h2 className="text-micro px-4 mb-2">Active Goals</h2>
        <div className="flex flex-col gap-3 px-4">
          {/* Goal 1 */}
          <div className="bg-white rounded-xl p-4 shadow-secondary border-light interactive">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏠</span>
                <span className="text-title">Dream Home</span>
              </div>
              <div className="bg-groww-green/10 text-groww-green text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                On track
              </div>
            </div>
            <p className="text-body mt-1">₹15,00,000 by December 2030</p>
            
            <div className="mt-4">
              <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[34%]" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-label">₹5,10,000 saved</span>
                <span className="text-[12px] font-bold text-text-1">34%</span>
              </div>
            </div>

            <div className="mt-4 bg-groww-green/5 rounded-lg p-3">
              <p className="text-[12px] text-groww-green font-medium leading-relaxed">
                At current pace, you'll reach ₹15.2L by Nov 2030. You're on track! 🎉
              </p>
            </div>
            <div className="flex justify-end mt-3 pt-3 border-t border-[#F5F5F5]">
              <button className="text-[12px] text-primary font-bold flex items-center gap-1">
                View breakdown <Icons.ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Goal 2 */}
          <div className="bg-white rounded-xl p-4 shadow-secondary border-light interactive">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎓</span>
                <span className="text-title">Higher Education</span>
              </div>
              <div className="bg-groww-amber/10 text-groww-amber text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Needs attention
              </div>
            </div>
            <p className="text-body mt-1">₹47,00,000 by June 2037</p>
            
            <div className="mt-4">
              <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div className="h-full bg-groww-amber w-[8%]" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-label">₹3,76,000 saved</span>
                <span className="text-[12px] font-bold text-text-1">8%</span>
              </div>
            </div>

            <div id="goal-gap-indicator" className="mt-4 bg-groww-amber/5 rounded-lg p-3">
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-text-2">Current SIPs will build</span>
                <span className="text-groww-amber font-bold">₹31L by 2037</span>
              </div>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-text-2">Goal needs</span>
                <span className="text-text-1 font-bold">₹47L</span>
              </div>
              <div className="h-[1px] bg-groww-amber/20 my-2" />
              <div className="flex justify-between text-[12px]">
                <span className="text-text-2">Shortfall</span>
                <span className="text-groww-red font-bold">₹16L 🔴</span>
              </div>
              <div className="bg-white rounded-lg p-2.5 mt-2 border border-groww-amber/10">
                <p className="text-[12px] text-text-1 leading-relaxed">
                  Add ₹3,200/month in Mirae Asset Mid Cap to close the gap by 2037
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => navigateTo('goal-detail')}
                className="bg-primary text-white text-[13px] font-bold px-5 py-2.5 rounded-xl shadow-primary btn-interactive"
              >
                Add ₹3,200/month →
              </button>
            </div>
          </div>

          {/* Goal 3 */}
          <div className="bg-white rounded-xl p-4 shadow-secondary border-light interactive">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌴</span>
                <span className="text-title">Retire Comfortably</span>
              </div>
              <div className="bg-groww-red/10 text-groww-red text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Behind
              </div>
            </div>
            <p className="text-body mt-1">₹2,00,00,000 by April 2050</p>
            
            <div className="mt-4">
              <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div className="h-full bg-groww-red w-[3%]" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-label">₹6,02,000 saved</span>
                <span className="text-[12px] font-bold text-text-1">3%</span>
              </div>
            </div>

            <div className="mt-4 bg-groww-red/5 rounded-lg p-3">
              <p className="text-[12px] text-groww-red font-medium leading-relaxed">
                At current rate, you'll retire with ₹1.1Cr — 45% short of your ₹2Cr target. Start a dedicated retirement SIP now.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-groww-red text-white text-[13px] font-bold px-5 py-2.5 rounded-xl shadow-primary btn-interactive">
                Fix my retirement plan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Not started goals */}
      <section>
        <h2 className="text-micro px-4 mb-2">Goals you haven't started yet</h2>
        <div className="flex flex-col gap-3 px-4">
          {[
            { emoji: '🚗', name: 'Buy a Car', target: '₹8,00,000' },
            { emoji: '✈️', name: 'World Trip', target: '₹3,00,000' },
          ].map((goal, i) => (
            <div key={i} className="bg-white border border-[#F5F5F5] border-dashed rounded-xl p-4 interactive">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{goal.emoji}</span>
                  <span className="text-title">{goal.name}</span>
                </div>
                <span className="text-label">Target: {goal.target}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F5] border-dashed">
                <span className="text-label">₹0 invested</span>
                <button className="text-primary text-[12px] font-bold btn-interactive">
                  Start this goal →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Goal Button */}
      <div className="fixed bottom-[88px] left-0 right-0 p-4 max-w-[430px] mx-auto z-40">
        <button className="w-full bg-primary text-white font-bold h-12 rounded-xl shadow-primary flex items-center justify-center gap-2 text-[15px] btn-interactive">
          <Icons.Plus className="w-5 h-5" />
          Add New Goal
        </button>
      </div>
    </div>
  );
};

export default GoalsContent;
