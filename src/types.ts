/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 
  | 'splash'
  | 'home' 
  | 'goals' 
  | 'goal-detail' 
  | 'portfolio' 
  | 'fund-detail' 
  | 'mf' 
  | 'overlap' 
  | 'tax' 
  | 'onboarding' 
  | 'crash-guard';

export interface Goal {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  savedAmount: number;
  targetDate: string;
  status: 'on-track' | 'needs-attention' | 'behind' | 'not-started';
  color: string;
  bgColor: string;
  textColor: string;
}

export const formatCurrency = (amount: number) => {
  return '₹' + amount.toLocaleString('en-IN');
};
