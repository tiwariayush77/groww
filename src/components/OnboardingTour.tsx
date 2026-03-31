import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TourStep {
  title: string;
  body: string;
  highlightId?: string;
}

const steps: TourStep[] = [
  {
    title: "Welcome to Groww AI Prototype",
    body: "This prototype shows 6 AI-powered improvements to Groww. Each one is grounded in real user pain points. Tap Next to take the guided tour.",
  },
  {
    title: "Your Portfolio Health Score",
    body: "A single 0–100 score that tells you how well your portfolio is doing across 4 dimensions. No more guessing.",
    highlightId: "health-score-card",
  },
  {
    title: "₹15,500 in tax savings — unclaimed",
    body: "It's April 1. The new financial year just started. Groww could have reminded you to book profits before the deadline. Now you know for next year.",
    highlightId: "tax-alert-card",
  },
  {
    title: "You own 7 funds but 3 portfolios",
    body: "64% of your holdings repeat across funds. This costs you ₹3,800/year in extra fees with no diversification benefit.",
    highlightId: "overlap-ribbon",
  },
  {
    title: "Your goals need a plan",
    body: "Your current SIPs will fall ₹16L short of your house goal. The gap calculator shows exactly what to add.",
    highlightId: "goal-gap-indicator",
  },
  {
    title: "What happens when you panic",
    body: "When markets fall, most investors pause SIPs and lose ₹4–5L over a decade. Tap the simulation to see the intervention.",
    highlightId: "crash-guard-card",
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
  onStepChange: (step: number) => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete, onStepChange }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [highlightRect, setHighlightRect] = React.useState<DOMRect | null>(null);

  React.useEffect(() => {
    onStepChange(currentStep);
    const highlightId = steps[currentStep].highlightId;
    if (highlightId) {
      const element = document.getElementById(highlightId);
      if (element) {
        setHighlightRect(element.getBoundingClientRect());
      } else {
        setHighlightRect(null);
      }
    } else {
      setHighlightRect(null);
    }
  }, [currentStep, onStepChange]);

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/65 pointer-events-auto" onClick={handleSkip} />
      
      {highlightRect && (
        <div 
          className="absolute z-[101] border-2 border-primary rounded-xl spotlight-hole pointer-events-none transition-all duration-300"
          style={{
            top: highlightRect.top - 4,
            left: highlightRect.left - 4,
            width: highlightRect.width + 8,
            height: highlightRect.height + 8,
          }}
        />
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-[102] bg-white rounded-2xl p-5 shadow-2xl max-w-[320px] w-full pointer-events-auto border border-[#F0F0F0]"
        style={highlightRect ? {
          position: 'absolute',
          top: highlightRect.bottom + 20 > window.innerHeight - 200 ? highlightRect.top - 200 : highlightRect.bottom + 20,
          left: '50%',
          transform: 'translateX(-50%)'
        } : {}}
      >
        <div className="flex gap-2 mb-4">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-primary w-4' : 'bg-[#E0E0E0]'}`} 
            />
          ))}
        </div>
        
        <h3 className="text-title mb-2">{steps[currentStep].title}</h3>
        <p className="text-body leading-relaxed mb-6">{steps[currentStep].body}</p>
        
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={handleSkip}
            className="text-[13px] text-text-3 font-bold h-11 px-4 btn-interactive"
          >
            Skip
          </button>
          <button 
            onClick={handleNext}
            className="bg-primary text-white text-[13px] font-bold px-6 py-2 rounded-xl h-11 flex items-center shadow-primary btn-interactive"
          >
            {currentStep === steps.length - 1 ? "Start exploring" : "Next →"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
