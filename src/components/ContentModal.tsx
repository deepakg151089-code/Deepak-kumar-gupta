import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Type, Video, Image as ImageIcon, Tag, Crown, Headphones, Globe } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { contentService } from '../services/contentService';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContentModal: React.FC<ContentModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: CATEGORIES[0].label,
    image: '',
    contentType: 'article' as 'article' | 'video' | 'audio',
    videoUrl: '',
    audioUrl: '',
    featured: false,
    premium: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoading(true);
    try {
      await contentService.createArticle({
        ...formData,
        author: auth.currentUser.displayName || 'ZenNomad Team',
      });
      onClose();
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: CATEGORIES[0].label,
        image: '',
        contentType: 'article',
        videoUrl: '',
        audioUrl: '',
        featured: false,
        premium: false
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zen-forest/40 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-zen-offwhite shadow-3xl z-[70] overflow-y-auto border-l border-zen-clay/30"
          >
            <form onSubmit={handleSubmit} className="p-8 md:p-16">
              <div className="flex items-center justify-between mb-16">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-10 h-[1px] bg-zen-forest" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zen-slate">Content Forge</span>
                  </div>
                  <h2 className="text-4xl font-display font-bold text-zen-forest">Draft Dispatch</h2>
                </div>
                <button type="button" onClick={onClose} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-zen-forest hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-12">
                {/* Content Type Toggle */}
                <div className="flex p-2 bg-zen-clay/30 rounded-3xl w-fit">
                  {[
                    { id: 'article' as const, icon: Type, label: 'Text' },
                    { id: 'video' as const, icon: Video, label: 'Vlog' },
                    { id: 'audio' as const, icon: Headphones, label: 'Audio' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, contentType: type.id })}
                      className={cn(
                        "flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest",
                        formData.contentType === type.id ? "bg-zen-forest text-white shadow-xl" : "text-zen-slate hover:text-zen-forest"
                      )}
                    >
                      <type.icon size={14} />
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>

                {/* Main Fields */}
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zen-slate px-2">Headline</label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-white/50 border border-zen-clay/50 rounded-3xl py-6 px-8 text-2xl font-display font-bold text-zen-forest focus:outline-none focus:ring-4 focus:ring-zen-forest/5 focus:border-zen-forest transition-all placeholder:text-zen-clay"
                      placeholder="Title of your dispatch..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zen-slate px-2">Category</label>
                      <div className="relative">
                        <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-zen-clay" size={18} />
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-white/50 border border-zen-clay/50 rounded-3xl py-5 pl-16 pr-8 appearance-none focus:outline-none focus:ring-4 focus:ring-zen-forest/5 font-bold text-xs uppercase tracking-widest text-zen-forest"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.label}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zen-slate px-2">Cover Art URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-zen-clay" size={18} />
                        <input
                          required
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full bg-white/50 border border-zen-clay/50 rounded-3xl py-5 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-zen-forest/5 font-medium text-sm text-zen-forest placeholder:text-zen-clay"
                          placeholder="Unsplash or custom URL..."
                        />
                      </div>
                    </div>
                  </div>

                  {formData.contentType === 'video' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zen-slate px-2">Video Source URL</label>
                      <div className="relative">
                        <Video className="absolute left-6 top-1/2 -translate-y-1/2 text-zen-clay" size={18} />
                        <input
                          required
                          value={formData.videoUrl}
                          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                          className="w-full bg-white/50 border border-zen-clay/50 rounded-3xl py-5 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-zen-forest/5 font-medium text-sm text-zen-forest"
                          placeholder="YouTube / Vimeo link..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {formData.contentType === 'audio' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zen-slate px-2">Audio Source URL</label>
                      <div className="relative">
                        <Headphones className="absolute left-6 top-1/2 -translate-y-1/2 text-zen-clay" size={18} />
                        <input
                          required
                          value={formData.audioUrl}
                          onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                          className="w-full bg-white/50 border border-zen-clay/50 rounded-3xl py-5 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-zen-forest/5 font-medium text-sm text-zen-forest"
                          placeholder="Direct audio URL or Podcast link..."
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zen-slate px-2">The Hook (Excerpt)</label>
                    <textarea
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                      className="w-full bg-white/50 border border-zen-clay/50 rounded-3xl py-6 px-8 focus:outline-none focus:ring-4 focus:ring-zen-forest/5 font-sans italic text-zen-forest"
                      placeholder="One sentence to draw them in..."
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zen-slate px-2">Deep Narrative</label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={10}
                      className="w-full bg-white/50 border border-zen-clay/50 rounded-[2.5rem] py-8 px-8 focus:outline-none focus:ring-4 focus:ring-zen-forest/5 font-sans leading-relaxed text-lg text-zen-forest"
                      placeholder="Expand your movement here..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 p-6 bg-zen-forest/5 rounded-3xl border border-zen-forest/10 hover:border-zen-forest/30 transition-all cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}>
                      <div className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", formData.featured ? "bg-zen-forest border-zen-forest" : "border-zen-clay")}>
                        {formData.featured && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zen-forest uppercase tracking-widest">Featured Dispatch</p>
                        <p className="text-[10px] text-zen-slate">Highlight on the collective feed.</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-6 bg-amber-400/5 rounded-3xl border border-amber-400/10 hover:border-amber-400/30 transition-all cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, premium: !prev.premium }))}>
                      <div className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", formData.premium ? "bg-amber-400 border-amber-400" : "border-zen-clay")}>
                        {formData.premium && <Crown size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Pro Member Only</p>
                        <p className="text-[10px] text-zen-slate">Exclusive to our elite nomads.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-zen-clay/30 flex items-center space-x-6">
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex-grow bg-zen-forest text-white font-bold py-6 px-10 rounded-3xl flex items-center justify-center space-x-4 hover:bg-zen-slate transition-all shadow-2xl shadow-zen-forest/20 disabled:opacity-50 active:scale-95 group"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="text-[10px] uppercase tracking-[0.4em]">Publish Dispatch</span>
                        <Globe size={18} className="transition-transform group-hover:rotate-12" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-6 rounded-3xl font-bold text-xs uppercase tracking-widest text-zen-slate hover:text-zen-forest transition-colors"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

