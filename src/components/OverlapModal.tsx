import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icons } from '../constants.tsx';

interface OverlapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMF: () => void;
}

const OverlapModal: React.FC<OverlapModalProps> = ({ isOpen, onClose, onNavigateToMF }) => {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimateBars(true), 300);
      return () => clearTimeout(timer);
    } else {
      setAnimateBars(false);
    }
  }, [isOpen]);

  const stocks = [
    { name: 'Reliance Industries', overlap: 85, color: '#E74C3C', count: '6 of 7', bg: '#FFF0F0', text: '#E74C3C' },
    { name: 'HDFC Bank', overlap: 71, color: '#FF9800', count: '5 of 7', bg: '#FFF8E6', text: '#FF9800' },
    { name: 'Infosys', overlap: 71, color: '#FF9800', count: '5 of 7', bg: '#FFF8E6', text: '#FF9800' },
    { name: 'ICICI Bank', overlap: 57, color: '#FF9800', count: '4 of 7', bg: '#FFF8E6', text: '#FF9800' },
    { name: 'TCS', overlap: 42, color: '#F59E0B', count: '3 of 7', bg: '#FFFDE7', text: '#F59E0B' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
          />

          {/* Sheet Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[430px] bg-white rounded-t-[24px] max-height-[90vh] overflow-y-auto no-scrollbar pb-8 shadow-2xl"
            style={{ maxHeight: '90vh' }}
          >
            {/* Drag Handle */}
            <div className="w-10 h-1 bg-[#E0E0E0] rounded-full mx-auto mt-3 mb-1" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4">
              <h2 className="text-[18px] font-bold text-[#1F1F1F]">Overlap Report</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#717171] btn-interactive"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            {/* Severity Banner */}
            <div className="mx-4 mt-4 bg-gradient-to-br from-[#FF6F00] to-[#FF9800] rounded-xl p-4 text-white shadow-lg shadow-orange-500/20">
              <div className="flex items-center justify-between">
                <h3 className="text-[28px] font-extrabold tracking-tighter">64% OVERLAP</h3>
                <div className="bg-white/20 rounded-full px-2.5 py-1 text-[10px] font-bold flex items-center gap-1">
                  🔴 NEEDS ACTION
                </div>
              </div>
              <p className="text-[12px] text-white/85 mt-1 leading-relaxed">
                You own 7 funds but hold 3 effective portfolios
              </p>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                <div className="flex-1">
                  <p className="text-[16px] font-bold">₹3,800</p>
                  <p className="text-[10px] text-white/70">/yr wasted</p>
                </div>
                <div className="w-[1px] h-8 bg-white/20" />
                <div className="flex-1">
                  <p className="text-[16px] font-bold">0.8%</p>
                  <p className="text-[10px] text-white/70">return drag</p>
                </div>
                <div className="w-[1px] h-8 bg-white/20" />
                <div className="flex-1">
                  <p className="text-[16px] font-bold">5 stocks</p>
                  <p className="text-[10px] text-white/70">in 6 of 7 funds</p>
                </div>
              </div>
            </div>

            {/* Most Repeated Stocks */}
            <div className="px-4 mt-6">
              <h4 className="text-micro mb-3">MOST REPEATED STOCKS</h4>
              <div className="space-y-3">
                {stocks.map((stock, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-[#F7F8FA] rounded-xl border border-black/[0.02]">
                    <span className="text-[13px] font-semibold text-[#1F1F1F] min-w-[140px] truncate">{stock.name}</span>
                    <div className="flex-1 h-2 bg-[#EFEFEF] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: animateBars ? `${stock.overlap}%` : 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: stock.color }}
                      />
                    </div>
                    <div 
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: stock.bg, color: stock.text }}
                    >
                      {stock.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="px-4 mt-6">
              <h4 className="text-micro mb-3">RECOMMENDED ACTION</h4>
              <div className="bg-white border-[1.5px] border-[#E8FAF5] rounded-[14px] p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-semibold text-[#1F1F1F]">Remove this fund</span>
                  <div className="bg-[#E8FAF5] text-[#00B386] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    High confidence
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 bg-[#F7F8FA] rounded-xl mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center font-bold text-[13px] border border-[#F59E0B]/10">
                    UT
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[13px] font-semibold text-[#1F1F1F]">UTI Flexi Cap Fund</h5>
                    <p className="text-[11px] text-[#9E9E9E]">78% overlap with HDFC Flexi Cap</p>
                  </div>
                  <span className="text-[11px] text-[#9E9E9E]">₹500/month</span>
                </div>

                <div className="bg-[#E8FAF5] rounded-lg p-3 space-y-2">
                  <p className="text-[11px] font-semibold text-[#1F1F1F] mb-1">If you redirect ₹500/month to SBI Nifty 50 Index Fund:</p>
                  {[
                    'Overlap drops from 64% → 38%',
                    'Save ₹540/year in expense ratio',
                    'True diversification across 4 categories'
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Icons.Check className="w-3 h-3 text-[#00B386]" />
                      <span className="text-[12px] text-[#1F1F1F]">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="sticky bottom-0 bg-white border-t border-[#F5F5F5] p-4 mt-6">
              <button className="w-full bg-primary text-white h-[52px] rounded-xl text-[14px] font-bold shadow-lg shadow-primary/20 active:brightness-90 transition-all btn-interactive">
                Pause UTI SIP · Save ₹3,800/year
              </button>
              <button 
                onClick={onNavigateToMF}
                className="w-full h-[44px] text-[13px] font-medium text-[#717171] mt-2 btn-interactive"
              >
                View full details in MF tab →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OverlapModal;
