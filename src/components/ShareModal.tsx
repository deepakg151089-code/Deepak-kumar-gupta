import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Twitter, Facebook, Link as LinkIcon, Share2 } from 'lucide-react';
import { useState } from 'react';
import { contentService } from '../services/contentService';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  articleId?: string;
  shareCountTwitter?: number;
  shareCountFacebook?: number;
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  url, 
  articleId,
  shareCountTwitter = 0,
  shareCountFacebook = 0
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShareClick = (platform: 'twitter' | 'facebook', href: string) => {
    if (articleId) {
      contentService.trackShare(articleId, platform).catch(console.error);
    }
    window.open(href, '_blank', 'width=600,height=400');
  };

  const shareLinks = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      color: 'hover:bg-sky-500', 
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      count: shareCountTwitter,
      platform: 'twitter' as const
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'hover:bg-blue-600', 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      count: shareCountFacebook,
      platform: 'facebook' as const
    },
  ];

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-zen-offwhite rounded-[3rem] shadow-3xl p-10 z-[70] border border-zen-clay/30"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-zen-forest/5 flex items-center justify-center text-zen-forest">
                  <Share2 size={20} />
                </div>
                <h3 className="text-xl font-display font-bold text-zen-forest">Broadcast</h3>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-zen-forest hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-zen-slate text-xs font-bold uppercase tracking-widest mb-10 text-center">Fuel the Movement</p>

            <div className="flex justify-around mb-12 gap-4">
              {shareLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleShareClick(link.platform, link.href)}
                  className="flex-grow flex flex-col items-center space-y-4 group"
                >
                  <div className={`w-full aspect-square rounded-3xl bg-white border border-zen-clay/30 ${link.color} flex flex-col items-center justify-center group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm group-hover:shadow-xl`}>
                    <link.icon size={28} />
                    <span className="mt-2 text-[10px] font-bold font-sans">{link.count > 0 ? `${link.count}` : '0'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-zen-slate uppercase tracking-[0.2em]">{link.name}</span>
                </button>
              ))}
            </div>

            <div className="relative group">
              <input
                readOnly
                value={url}
                className="w-full bg-white/50 border border-zen-clay/50 rounded-2xl py-5 pl-14 pr-14 text-[10px] font-mono text-zen-slate focus:outline-none transition-all group-hover:border-zen-forest/30"
              />
              <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-zen-clay group-hover:text-zen-forest transition-colors" size={16} />
              <button
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-zen-forest text-white shadow-xl shadow-zen-forest/20 hover:bg-zen-slate transition-all flex items-center justify-center active:scale-90"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            
            <AnimatePresence>
              {copied && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[10px] font-bold text-emerald-600 mt-6 uppercase tracking-widest"
                >
                  Wisdom Locked to Clipboard
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
