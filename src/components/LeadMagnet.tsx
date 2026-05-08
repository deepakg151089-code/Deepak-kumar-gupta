import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, CheckCircle, ArrowRight, Loader2, Smartphone } from 'lucide-react';
import { contentService } from '../services/contentService';

export const LeadMagnet: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await contentService.saveLead({
        ...formData,
        source: 'AI & Data Analytics Career Roadmap 2026'
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <section className="py-24 bg-wisdom-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          
          {/* Left: Content Side */}
          <div className="flex-1 p-10 sm:p-16 bg-wisdom-deep text-white relative">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_30%_30%,#FB923C_0%,transparent_50%)]" />
             
             <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative z-10"
             >
                <div className="inline-block bg-wisdom-saffron/20 text-wisdom-saffron px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Free Resource
                </div>
                <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight italic">
                  AI & Data Analytics <br />
                  <span className="text-wisdom-saffron italic">Career Roadmap 2026</span>
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-md font-medium leading-relaxed">
                  Confused about where to start in 2026? Download our comprehensive 50-page guide to mastering AI, Big Data, and Modern Analytics.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    'Step-by-step learning path for 2026',
                    'Top 10 High-Paying AI Job Profiles',
                    'Essential Tools & Tech Stack Guide',
                    'Salary expectations & Interview Tips'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <div className="w-5 h-5 bg-wisdom-saffron rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-wisdom-deep" />
                      </div>
                      <span className="text-sm font-bold">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 py-6 border-t border-white/10">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <img 
                        key={i} 
                        src={`https://lexica-serve-encoded-images2.sharif.workers.dev/md/03d6f1ba-4f1e-450a-9d9e-8c31090626f2`} 
                        className="w-10 h-10 rounded-full border-2 border-wisdom-deep bg-slate-800" 
                        alt="avatar"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-400 italic">5k+ students downloaded this week</span>
                </div>
             </motion.div>
          </div>

          {/* Right: Form Side */}
          <div className="flex-1 p-10 sm:p-16 flex items-center justify-center bg-white">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 italic text-wisdom-deep">Check Your WhatsApp!</h3>
                  <p className="text-slate-500 mb-8 font-medium">We've sent the PDF link to your number. Happy learning!</p>
                  <button 
                    onClick={() => window.open('https://example.com/roadmap.pdf')}
                    className="w-full bg-wisdom-deep text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-wisdom-deep/20"
                  >
                    <Download /> Download Now
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full max-w-sm"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-black italic text-wisdom-deep mb-2">Get Your Free Guide</h3>
                    <p className="text-slate-500 text-sm font-medium">Tell us where to send your roadmap.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-wisdom-saffron outline-none transition-all font-bold placeholder:text-slate-300"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">WhatsApp Number</label>
                      <div className="relative">
                        <Smartphone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          required
                          type="tel" 
                          placeholder="91XXXXXXXX"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-14 py-4 focus:ring-2 focus:ring-wisdom-saffron outline-none transition-all font-bold placeholder:text-slate-300"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <button 
                      disabled={status === 'loading'}
                      className="w-full bg-wisdom-saffron text-wisdom-deep py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-wisdom-saffron/20 disabled:opacity-50 group"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>Send Me The PDF <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider">
                      We respect your privacy. No spam. Just learning.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
