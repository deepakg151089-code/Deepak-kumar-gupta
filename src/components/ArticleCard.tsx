import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Play, Crown, Headphones, FileText, Bookmark } from 'lucide-react';
import _ReactPlayer from 'react-player';
const ReactPlayer = _ReactPlayer as any;
import { cn } from '../lib/utils';
import { ShareModal } from './ShareModal';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: any;
    image: string;
    premium?: boolean;
    contentType?: 'article' | 'video' | 'audio';
    videoUrl?: string;
  };
  onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isVideo = article.contentType === 'video';
  const isAudio = article.contentType === 'audio';
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareOpen(true);
  };

  const handleMediaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        onClick={onClick}
        className="zen-card group cursor-pointer h-full flex flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-zen-clay/10">
          {isVideo && article.videoUrl && isPlaying ? (
            <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
              <ReactPlayer
                url={article.videoUrl}
                width="100%"
                height="100%"
                controls={true}
                playing={true}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          ) : (
            <div className="relative w-full h-full" onClick={(isVideo || isAudio) ? handleMediaClick : undefined}>
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {(isVideo || isAudio) && (
                <div className="absolute inset-0 flex items-center justify-center bg-zen-forest/20 group-hover:bg-zen-forest/40 transition-colors">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full glass flex items-center justify-center text-zen-forest shadow-2xl"
                  >
                    {isVideo ? <Play size={24} fill="currentColor" fillOpacity={0.2} /> : <Headphones size={24} />}
                  </motion.div>
                </div>
              )}
            </div>
          )}
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-zen-forest">
              {article.category}
            </span>
            {article.premium && (
              <span className="bg-amber-400 text-white px-2 py-1 rounded-full flex items-center shadow-lg">
                <Crown size={12} />
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleShare}
              className="p-2 rounded-full glass text-zen-forest hover:bg-zen-forest hover:text-white transition-all shadow-xl"
            >
              <Share2 size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full glass text-zen-forest hover:bg-zen-forest hover:text-white transition-all shadow-xl"
            >
              <Bookmark size={14} />
            </motion.button>
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-[10px] font-bold text-zen-slate uppercase tracking-widest mb-4">
             {isVideo ? <Play size={10} /> : isAudio ? <Headphones size={10} /> : <FileText size={10} />}
             <span>{article.contentType || 'Article'} • {article.author}</span>
          </div>
          <h3 className="text-2xl font-display font-bold leading-tight mb-4 text-zen-forest group-hover:text-zen-slate transition-colors">
            {article.title}
          </h3>
          <p className="text-zen-slate text-sm line-clamp-2 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="mt-auto pt-6 border-t border-zen-clay/30 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zen-slate">
            <span>{article.date?.toDate?.() ? article.date.toDate().toLocaleDateString() : 'Today'}</span>
            <span className="text-zen-forest group-hover:underline">Read Dispatch</span>
          </div>
        </div>
      </motion.div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title={article.title} 
        url={`${window.location.origin}/article/${article.id}`} 
      />
    </>
  );
};
