import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Hourglass, Flame, ArrowRight } from 'lucide-react';

export const CountdownUrgency: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 }; // Reset for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="bg-wisdom-deep py-16 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wisdom-saffron/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wisdom-saffron/10 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-wisdom-saffron/20 text-wisdom-saffron px-4 py-2 rounded-full text-sm font-bold mb-6 border border-wisdom-saffron/30"
        >
          <Flame size={16} /> ADMISSIONS OPEN FOR 2026
        </motion.div>

        <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">
          Next Batch Starts <span className="text-wisdom-saffron italic">Very Soon</span>
        </h2>

        <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mb-12">
          {[
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-2 backdrop-blur-sm">
                <span className="text-3xl sm:text-5xl font-black text-wisdom-saffron font-mono">
                  {formatNumber(item.value)}
                </span>
              </div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between items-end mb-3">
            <span className="text-white font-bold text-sm">80% Seats Already Filled</span>
            <span className="text-wisdom-saffron font-black text-xl italic">Only 12 Seats Left!</span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1 border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-wisdom-saffron to-orange-400 rounded-full relative"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
            </motion.div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-wisdom-saffron text-wisdom-deep px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-wisdom-saffron/30 flex items-center gap-4 mx-auto group"
        >
          Secure Your Seat Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide {
          from { background-position: 0 0; }
          to { background-position: 20px 0; }
        }
      `}} />
    </section>
  );
};
