import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Send, CheckCircle, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { contentService } from '../services/contentService';

export const Resources: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contentService.submitInquiry(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zen-offwhite min-h-screen pb-24">
      <header className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-12 h-[1px] bg-zen-forest" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zen-slate">Co-Creation</span>
            <span className="w-12 h-[1px] bg-zen-forest" />
          </div>
          <h2 className="text-5xl font-display font-bold text-zen-forest mb-6">Join the Movement</h2>
          <p className="text-zen-slate text-lg max-w-2xl mx-auto leading-relaxed">
            ZenNomad is more than a platform. It's a collective effort to simplify the modern struggle. Partner with us to scale tranquility.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Why Partner */}
        <div className="space-y-12">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zen-slate mb-8">Why Partner?</h3>
            <div className="space-y-8">
              {[
                { title: 'Global reach', desc: 'Connect with a community of high-conscious nomads across 40+ countries.' },
                { title: 'Ethical Aligned', desc: 'We only partner with brands that prioritize human focus and ecological health.' },
                { title: 'Content Co-Creation', desc: 'Draft articles, vlogs, and wisdom tracks together with our editorial team.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-10 h-10 rounded-full bg-zen-forest/5 flex items-center justify-center text-zen-forest flex-shrink-0">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-zen-forest mb-2">{item.title}</h4>
                    <p className="text-sm text-zen-slate leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-zen-forest p-10 rounded-[2.5rem] text-zen-offwhite">
            <h3 className="text-2xl font-display font-bold mb-6">Common Questions</h3>
            <div className="space-y-6">
              {[
                'How do we feature our products?',
                'Can I write for ZenNomad?',
                'Who is the ideal partner?'
              ].map((q, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/10 group cursor-pointer">
                  <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">{q}</span>
                  <HelpCircle size={14} className="text-zen-accent" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Partnership Form */}
        <div className="zen-card p-8 md:p-12 sticky top-24">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-display font-bold text-zen-forest mb-4">Message Received.</h3>
              <p className="text-zen-slate mb-8">Deepak or a member of the nomad team will reach out personally within 48 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold uppercase tracking-widest text-zen-forest border-b border-zen-forest border-spacing-2"
              >
                Send another dispatch
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-zen-clay/30 flex items-center justify-center text-zen-forest">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-zen-forest">Partner with Us</h3>
                  <p className="text-xs text-zen-slate uppercase font-bold tracking-widest">A direct line to Deepak</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zen-slate px-1">Identity / Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-zen-offwhite border-none py-4 px-6 rounded-2xl text-sm focus:ring-2 focus:ring-zen-forest/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zen-slate px-1">Digital Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-zen-offwhite border-none py-4 px-6 rounded-2xl text-sm focus:ring-2 focus:ring-zen-forest/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zen-slate px-1">The Proposal</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we co-create value?"
                  className="w-full bg-zen-offwhite border-none py-4 px-6 rounded-2xl text-sm focus:ring-2 focus:ring-zen-forest/10 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-zen-forest text-white py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-zen-slate transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? 'Sending Dispatch...' : <>Send Dispatch <Send size={14} /></>}
              </button>

              <div className="pt-6 border-t border-zen-clay/30 flex items-center justify-center gap-6 text-zen-slate">
                <div className="flex items-center gap-2 hover:text-zen-forest transition-colors cursor-pointer">
                  <Mail size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Email Direct</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};
