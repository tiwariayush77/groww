import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TourStep {
  title: string;
  body: string;
  highlightId?: string;
}

const steps: TourStep[] = [
  {
    title: "Welcome to the Groww AI Prototype",
    body: "6 features built on real user pain points. Takes 60 seconds. Tap to begin.",
  },
  {
    title: "Your Portfolio Health Score",
    body: "One number that tells you how your portfolio is doing — across returns, diversification, goals, and safety. No more guessing.",
    highlightId: "tour-health-score",
  },
  {
    title: "₹15,500 left on the table",
    body: "It's April 1. This card would have reminded you to book profits before the FY ended — completely tax-free under the ₹1.25L LTCG exemption.",
    highlightId: "tour-tax-alert",
  },
  {
    title: "Your panic-pause guard",
    body: "When markets crash, most investors pause their SIPs and lose ₹4–5L over a decade. Toggle the switch to see how Groww intercepts that decision.",
    highlightId: "tour-crash-guard",
  },
  {
    title: "Your goals have a ₹16L gap",
    body: "Your education SIP is on track to fall short. The gap calculator shows exactly how much to add and which fund to add it to.",
    highlightId: "tour-goal-gap",
  },
  {
    title: "You're paying for 7 funds, getting 3",
    body: "64% of your holdings repeat across funds. This is the most actionable fix in your portfolio — tap the card to see the full report.",
    highlightId: "tour-overlap-card",
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
  onStepChange: (step: number) => void;
  currentScreen: string;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete, onStepChange, currentScreen }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [highlightRect, setHighlightRect] = React.useState<DOMRect | null>(null);

  // Body scroll lock
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const measureElement = React.useCallback(() => {
    const highlightId = steps[currentStep].highlightId;
    if (highlightId) {
      const element = document.getElementById(highlightId);
      if (element) {
        // Scroll into view first
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Wait for scroll to complete before measuring
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setHighlightRect(rect);
          } else {
            setHighlightRect(null);
          }
        }, 400);
      } else {
        setHighlightRect(null);
      }
    } else {
      setHighlightRect(null);
    }
  }, [currentStep]);

  // Re-measure on step or screen change
  React.useEffect(() => {
    onStepChange(currentStep);
    measureElement();
    
    // Fallback re-measure after a delay for screen transitions
    const timer = setTimeout(measureElement, 300);
    return () => clearTimeout(timer);
  }, [currentStep, currentScreen, onStepChange, measureElement]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const isStep0 = currentStep === 0;
  const pad = 8;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Four dark curtain panels surrounding the spotlight */}
      {highlightRect && !isStep0 && (
        <>
          {/* TOP curtain */}
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            height: Math.max(0, highlightRect.top - pad),
            background: 'rgba(0,0,0,0.72)',
            zIndex: 100,
            pointerEvents: 'none'
          }} />

          {/* BOTTOM curtain */}
          <div style={{
            position: 'fixed',
            top: highlightRect.bottom + pad,
            left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.72)',
            zIndex: 100,
            pointerEvents: 'none'
          }} />

          {/* LEFT curtain */}
          <div style={{
            position: 'fixed',
            top: Math.max(0, highlightRect.top - pad),
            left: 0,
            width: Math.max(0, highlightRect.left - pad),
            height: highlightRect.height + pad * 2,
            background: 'rgba(0,0,0,0.72)',
            zIndex: 100,
            pointerEvents: 'none'
          }} />

          {/* RIGHT curtain */}
          <div style={{
            position: 'fixed',
            top: Math.max(0, highlightRect.top - pad),
            left: highlightRect.right + pad,
            right: 0,
            height: highlightRect.height + pad * 2,
            background: 'rgba(0,0,0,0.72)',
            zIndex: 100,
            pointerEvents: 'none'
          }} />

          {/* HIGHLIGHT BORDER */}
          <div style={{
            position: 'fixed',
            top: highlightRect.top - pad,
            left: highlightRect.left - pad,
            width: highlightRect.width + pad * 2,
            height: highlightRect.height + pad * 2,
            border: '2.5px solid #00D09C',
            borderRadius: '14px',
            boxShadow: '0 0 0 3px rgba(0,209,156,0.15)',
            zIndex: 101,
            pointerEvents: 'none',
            transition: 'all 250ms ease'
          }} />
        </>
      )}

      {/* Step 0 Backdrop (Full screen dark overlay) */}
      {isStep0 && (
        <div className="absolute inset-0 bg-black/72 z-[99] pointer-events-auto" />
      )}

      <AnimatePresence mode="wait">
        {isStep0 ? (
          /* Step 0 - Welcome Modal */
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
            className="fixed top-1/2 left-1/2 z-[102] bg-white rounded-[20px] p-6 shadow-2xl w-[calc(100%-32px)] max-w-[380px] pointer-events-auto"
          >
            <h2 className="text-[18px] font-bold text-[#1F1F1F] mb-2 leading-tight">
              {steps[0].title}
            </h2>
            <p className="text-[14px] text-[#717171] leading-relaxed mb-6">
              {steps[0].body}
            </p>
            <button
              onClick={handleNext}
              className="w-full bg-primary text-white text-[14px] font-bold py-3.5 rounded-xl btn-interactive"
            >
              Start Tour →
            </button>
          </motion.div>
        ) : (
          /* Other Steps - Bottom Sheet */
          <motion.div
            key="step"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[102] bg-white rounded-t-[20px] p-5 pb-9 shadow-[0_-8px_32px_rgba(0,0,0,0.2)] max-w-[430px] mx-auto w-full pointer-events-auto box-border"
          >
            {/* Drag Handle */}
            <div className="w-8 h-1 bg-[#E0E0E0] rounded-full mx-auto mb-4" />

            {/* Step Dots Row */}
            <div className="flex justify-center gap-2 mb-4">
              {steps.slice(1).map((_, i) => {
                const stepIdx = i + 1;
                const isActive = stepIdx === currentStep;
                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ 
                      width: isActive ? 24 : 8,
                      backgroundColor: isActive ? '#00D09C' : '#E0E0E0'
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="h-2 rounded-full"
                  />
                );
              })}
            </div>

            <h3 className="text-[17px] font-bold text-[#1F1F1F] mb-2 leading-[1.3]">
              {steps[currentStep].title}
            </h3>
            <p className="text-[14px] text-[#717171] leading-relaxed mb-5">
              {steps[currentStep].body}
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-[13px] font-medium text-[#BDBDBD] py-2 cursor-pointer"
              >
                Skip tour
              </button>
              <button
                onClick={handleNext}
                className="bg-primary text-white text-[14px] font-semibold px-6 py-3 rounded-[10px] min-w-[120px] text-center cursor-pointer btn-interactive"
              >
                {currentStep === steps.length - 1 ? "See the overlap report →" : "Next →"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
