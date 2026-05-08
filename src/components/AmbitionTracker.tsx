import React from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp } from 'lucide-react';

interface AmbitionTrackerProps {
  label: string;
  progress: number; // 0 to 100
  target: string;
}

export const AmbitionTracker: React.FC<AmbitionTrackerProps> = ({ label, progress, target }) => {
  return (
    <div className="neo-outset p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zen-forest text-zen-offwhite flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zen-slate">{label}</h4>
            <p className="text-lg font-display font-bold">{progress}%</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-zen-slate uppercase">Target</span>
          <p className="text-sm font-bold text-zen-forest">{target}</p>
        </div>
      </div>
      
      <div className="ambition-progress">
        <motion.div 
          className="ambition-bar"
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-zen-slate uppercase tracking-tighter">
        <TrendingUp size={12} className="text-emerald-500" />
        <span>Pace is 12% faster than last month</span>
      </div>
    </div>
  );
};
