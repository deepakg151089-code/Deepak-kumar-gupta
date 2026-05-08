import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = React.useState(true);

  const whatsappLink = "https://wa.me/91XXXXXXXXXX?text=Hi%20Advika%20Elite,%20I%20am%20interested%20in%20your%20skills%20courses.%20Please%20provide%20more%20details.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 relative mb-2"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <MessageCircle size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-0.5">Live Support</p>
                <p className="text-sm font-bold text-slate-700 whitespace-nowrap italic">Need Help with Admissions?</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:bg-emerald-600 transition-colors relative group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-wisdom-deep text-white px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          Chat with Advika Elite
        </span>
      </motion.a>
    </div>
  );
};
