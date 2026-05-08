import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const COMBOS = [
  {
    id: 1,
    title: "AI Power Bundle",
    courses: ["Master AI Fundamentals", "Data Analytics with Python", "Soft Skills for Tech"],
    originalPrice: "5,999",
    specialPrice: "2,499",
    tag: "Best Seller",
    color: "bg-blue-600",
    shadow: "shadow-blue-500/30"
  },
  {
    id: 2,
    title: "Excel Pro Bundle",
    courses: ["Advanced Excel & Macros", "Power BI Dashboards", "Freelancing Secrets"],
    originalPrice: "4,499",
    specialPrice: "1,899",
    tag: "Most Popular",
    color: "bg-wisdom-deep",
    shadow: "shadow-wisdom-deep/30"
  },
  {
    id: 3,
    title: "The Ultimate Career Starter",
    courses: ["Full Stack Web Dev", "UI/UX Design", "Communication Masterclass"],
    originalPrice: "8,999",
    specialPrice: "3,999",
    tag: "Limitied Offer",
    color: "bg-orange-600",
    shadow: "shadow-orange-500/30"
  }
];

export const ComboOffers: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black italic text-wisdom-deep mb-4"
          >
            Special <span className="text-wisdom-saffron italic">Combo Offers</span>
          </motion.h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Save big with our expertly curated course bundles. Get certified in multiple skills at a fraction of the cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMBOS.map((combo, i) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-full"
            >
              <div className={cn(
                "absolute -inset-1 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200",
                combo.color
              )} />
              
              <div className="relative bg-white rounded-[2.5rem] border border-slate-100 p-8 h-full flex flex-col shadow-sm group-hover:shadow-2xl transition-all duration-500">
                {/* Ribbon Tag */}
                <div className={cn(
                  "absolute -top-4 -right-4 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-white shadow-lg flex items-center gap-2 z-10",
                  combo.color
                )}>
                  <Sparkles size={12} /> {combo.tag}
                </div>

                <div className="mb-8">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6", combo.color)}>
                        <Zap size={28} />
                    </div>
                    <h3 className="text-2xl font-black italic text-wisdom-deep leading-tight">
                        {combo.title}
                    </h3>
                </div>

                <div className="flex-grow space-y-4 mb-10">
                    {combo.courses.map((course, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm font-bold text-slate-600">{course}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-slate-50 mt-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-slate-400 line-through font-bold text-lg">₹{combo.originalPrice}</span>
                        <span className="text-3xl font-black italic text-wisdom-deep">₹{combo.specialPrice}</span>
                    </div>

                    <button className={cn(
                        "w-full py-5 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl",
                        combo.color,
                        combo.shadow
                    )}>
                        Buy Now <ChevronRight size={20} />
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 bg-wisdom-cream rounded-full border border-slate-100 italic font-bold text-slate-500 uppercase text-[10px] tracking-widest shadow-inner">
                <span className="flex items-center gap-2 truncate whitespace-nowrap"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Life Time Access</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-2 truncate whitespace-nowrap"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Industry Certification</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-2 truncate whitespace-nowrap"><div className="w-2 h-2 rounded-full bg-emerald-500" /> 1-on-1 Mentorship</span>
            </div>
        </div>
      </div>
    </section>
  );
};
