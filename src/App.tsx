/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, formatCurrency } from './types.ts';
import { Icons } from './constants.tsx';
import { OnboardingTour } from './components/OnboardingTour.tsx';

// Screens (to be implemented in detail)
import HomeContent from './components/HomeContent.tsx';
import GoalsContent from './components/GoalsContent.tsx';
import PortfolioContent from './components/PortfolioContent.tsx';
import MFContent from './components/MFContent.tsx';
import TaxContent from './components/TaxContent.tsx';
import GoalDetail from './components/GoalDetail.tsx';
import FundDetail from './components/FundDetail.tsx';
import OverlapDetail from './components/OverlapDetail.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [tourActive, setTourActive] = useState(false);
  const [isCrashSimActive, setIsCrashSimActive] = useState(false);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('home');
        setTourActive(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Navigation helper
  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleTourStepChange = (step: number) => {
    if (step === 3) setCurrentScreen('mf');
    else if (step === 4) setCurrentScreen('goals');
    else if (step === 5) setCurrentScreen('home');
  };

  const renderTopBar = () => {
    if (currentScreen === 'splash') return null;

    const commonClasses = "fixed top-0 left-0 right-0 h-[56px] bg-white z-50 flex items-center justify-between px-4 border-b border-[#F5F5F5] max-w-[430px] mx-auto shadow-sm";

    switch (currentScreen) {
      case 'home':
        return (
          <div className={commonClasses}>
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.brandfetch.io/id02rL-aAO/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" 
                height="22" 
                alt="Groww" 
                style={{height: '22px', width: 'auto'}} 
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center btn-interactive relative">
                <Icons.Bell className="w-6 h-6 text-text-1" />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-groww-red rounded-full border-2 border-white" />
              </button>
              <button className="w-8 h-8 rounded-full bg-groww-purple/10 flex items-center justify-center text-groww-purple font-bold text-xs btn-interactive border border-groww-purple/20">
                PR
              </button>
            </div>
          </div>
        );
      case 'goals':
        return (
          <div className={commonClasses}>
            <button onClick={() => navigateTo('home')} className="w-10 h-10 flex items-center justify-center -ml-2 btn-interactive">
              <Icons.ArrowLeft className="w-6 h-6 text-text-1" />
            </button>
            <span className="text-title">My Goals</span>
            <button className="w-10 h-10 flex items-center justify-center -mr-2 btn-interactive">
              <Icons.Plus className="w-6 h-6 text-text-1" />
            </button>
          </div>
        );
      case 'portfolio':
        return (
          <div className={commonClasses}>
            <div className="w-10" />
            <span className="text-title">Portfolio</span>
            <button className="flex items-center gap-1 text-text-2 text-[13px] font-bold btn-interactive bg-[#F5F5F5] px-3 py-1.5 rounded-lg border border-[#E0E0E0]">
              1Y <Icons.ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        );
      case 'mf':
        return (
          <div className={commonClasses}>
            <button onClick={() => navigateTo('home')} className="w-10 h-10 flex items-center justify-center -ml-2 btn-interactive">
              <Icons.ArrowLeft className="w-6 h-6 text-text-1" />
            </button>
            <span className="text-title">Mutual Funds</span>
            <div className="flex items-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center btn-interactive">
                <Icons.Search className="w-6 h-6 text-text-1" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center btn-interactive">
                <Icons.Filter className="w-6 h-6 text-text-1" />
              </button>
            </div>
          </div>
        );
      case 'tax':
        return (
          <div className={commonClasses}>
            <div className="w-10" />
            <span className="text-title">Tax Centre</span>
            <div className="bg-primary/10 text-groww-green text-[10px] font-bold px-2.5 py-1 rounded-lg border border-primary/20">
              FY 2025–26
            </div>
          </div>
        );
      case 'goal-detail':
      case 'fund-detail':
      case 'overlap':
        return (
          <div className={commonClasses}>
            <button 
              onClick={() => {
                if (currentScreen === 'goal-detail') navigateTo('goals');
                else if (currentScreen === 'fund-detail') navigateTo('portfolio');
                else if (currentScreen === 'overlap') navigateTo('mf');
              }} 
              className="w-10 h-10 flex items-center justify-center -ml-2 btn-interactive"
            >
              <Icons.ArrowLeft className="w-6 h-6 text-text-1" />
            </button>
            <span className="flex-1 text-center text-title truncate px-4">
              {currentScreen === 'goal-detail' ? 'Higher Education Goal' : 
               currentScreen === 'fund-detail' ? 'Mirae Asset Large Cap' : 
               'Overlap Report'}
            </span>
            <div className="w-10" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderBottomNav = () => {
    if (currentScreen === 'splash') return null;

    const tabs = [
      { id: 'home', label: 'Home', icon: Icons.Home },
      { id: 'goals', label: 'Goals', icon: Icons.Goals },
      { id: 'portfolio', label: 'Portfolio', icon: Icons.Portfolio },
      { id: 'mf', label: 'MF', icon: Icons.MF },
      { id: 'tax', label: 'Tax', icon: Icons.Tax },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 h-[72px] bg-white/95 backdrop-blur-[12px] z-50 flex items-center justify-around border-t border-[#F0F0F0] max-w-[430px] mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id || 
            (tab.id === 'goals' && currentScreen === 'goal-detail') ||
            (tab.id === 'portfolio' && currentScreen === 'fund-detail') ||
            (tab.id === 'mf' && currentScreen === 'overlap');
          
          return (
            <button 
              key={tab.id}
              onClick={() => navigateTo(tab.id as Screen)}
              className="flex flex-col items-center justify-center w-full h-full relative interactive group"
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute top-0 w-8 h-[3px] bg-primary rounded-full" 
                />
              )}
              <tab.icon className={`w-[22px] h-[22px] mb-1.5 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-[#BDBDBD] group-hover:text-text-2'}`} />
              <span className={`text-[10px] font-bold tracking-tight transition-colors duration-200 ${isActive ? 'text-primary' : 'text-[#BDBDBD] group-hover:text-text-2'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#E8EAED] flex justify-center">
      <div className="w-full max-w-[430px] bg-app-bg min-h-screen relative overflow-x-hidden shadow-2xl">
        {renderTopBar()}
        
        <main className={`${currentScreen === 'splash' ? 'pt-0 pb-0' : 'pt-[56px] pb-[72px]'} min-h-screen`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentScreen === 'splash' && (
                <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                  <motion.img 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src="https://cdn.brandfetch.io/id02rL-aAO/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" 
                    height="32" 
                    alt="Groww" 
                    style={{height: '32px', width: 'auto'}} 
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8 flex gap-1"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1, 
                          delay: i * 0.2 
                        }}
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                      />
                    ))}
                  </motion.div>
                </div>
              )}
              {currentScreen === 'home' && (
                <HomeContent 
                  navigateTo={navigateTo} 
                  isCrashSimActive={isCrashSimActive}
                  setIsCrashSimActive={setIsCrashSimActive}
                />
              )}
              {currentScreen === 'goals' && <GoalsContent navigateTo={navigateTo} />}
              {currentScreen === 'goal-detail' && <GoalDetail navigateTo={navigateTo} />}
              {currentScreen === 'portfolio' && <PortfolioContent navigateTo={navigateTo} />}
              {currentScreen === 'fund-detail' && <FundDetail navigateTo={navigateTo} />}
              {currentScreen === 'mf' && <MFContent navigateTo={navigateTo} />}
              {currentScreen === 'overlap' && <OverlapDetail navigateTo={navigateTo} />}
              {currentScreen === 'tax' && <TaxContent navigateTo={navigateTo} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {renderBottomNav()}

        {tourActive && (
          <OnboardingTour 
            onComplete={() => setTourActive(false)} 
            onStepChange={handleTourStepChange}
          />
        )}
      </div>
    </div>
  );
}
