import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, User, Share2, Bookmark, Lock, Crown, ArrowRight } from 'lucide-react';
import _ReactPlayer from 'react-player';
const ReactPlayer = _ReactPlayer as any;
import { contentService, Article } from '../services/contentService';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { ShareModal } from '../components/ShareModal';
import { CommentSection } from '../components/CommentSection';
import { auth } from '../lib/firebase';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPro, setIsPro] = useState(localStorage.getItem('zen_nomad_pro') === 'true');

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const data = await contentService.getArticle(id);
      setArticle(data);
      setLoading(false);
      if (data) {
        contentService.incrementViews(id).catch(console.error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleUpgrade = () => {
    localStorage.setItem('zen_nomad_pro', 'true');
    setIsPro(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zen-offwhite">
        <div className="w-12 h-12 border-4 border-zen-forest border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-8 pt-20 text-center min-h-screen bg-zen-offwhite">
        <h2 className="text-3xl font-display font-bold mb-4">Insight not found</h2>
        <button onClick={() => navigate('/')} className="text-zen-forest font-bold hover:underline">
          Return to Home
        </button>
      </div>
    );
  }

  const showPaywall = article.premium && !isPro;

  return (
    <div className="bg-zen-offwhite min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-zen-slate hover:text-zen-forest transition-colors group"
          >
            <ChevronLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Wisdom</span>
          </button>
          <div className="flex gap-4">
            <button className="text-zen-slate hover:text-zen-forest"><Bookmark size={20} /></button>
            <button onClick={() => setIsShareOpen(true)} className="text-zen-slate hover:text-zen-forest"><Share2 size={20} /></button>
          </div>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zen-forest px-4 py-2 border border-zen-forest rounded-full bg-zen-forest/5">
              {article.category}
            </span>
            {article.premium && (
              <div className="flex items-center gap-2 bg-amber-400 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-amber-400/20">
                <Crown size={12} />
                <span>ZenNomad Pro</span>
              </div>
            )}
            <div className="h-[1px] flex-grow bg-zen-clay/30" />
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8 text-zen-forest">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-zen-slate text-xs font-bold uppercase tracking-widest border-y border-zen-clay/30 py-6">
            <div className="flex items-center gap-2">
              <User size={14} className="text-zen-accent" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-zen-accent" />
              <span>{article.date?.toDate?.() ? article.date.toDate().toLocaleDateString() : 'Today'}</span>
            </div>
          </div>
        </header>

        <div className="mb-16 rounded-[3rem] overflow-hidden shadow-3xl bg-zen-clay/10 aspect-video relative border border-zen-clay/30">
          {(article.contentType === 'video' && article.videoUrl) ? (
            <ReactPlayer
              url={article.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              light={article.image}
              playIcon={<div className="w-20 h-20 bg-zen-forest text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"><ArrowRight size={32} /></div>}
            />
          ) : (
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          {showPaywall && (
            <div className="absolute inset-0 bg-zen-forest/80 backdrop-blur-xl flex flex-col items-center justify-center text-white p-8 text-center">
              <div className="w-20 h-20 bg-amber-400 rounded-3xl flex items-center justify-center mb-8 shadow-2xl rotate-3">
                <Lock size={40} />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">The path is narrow.</h2>
              <p className="max-w-md text-white/70 mb-10 leading-relaxed font-sans">
                This deep narrative is reserved for the initiates. Join the ZenNomad Pro collective to unlock full access to our movement wisdom.
              </p>
              <button 
                onClick={handleUpgrade}
                className="bg-amber-400 text-zen-forest px-10 py-5 rounded-3xl text-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-amber-400/30"
              >
                Become Pro — $9/Month
              </button>
            </div>
          )}
        </div>

        <article className="max-w-none relative">
          <div className={cn(
            "font-sans text-zen-forest text-lg leading-relaxed space-y-8 whitespace-pre-wrap selection:bg-zen-forest selection:text-white",
            showPaywall && "blur-md select-none pointer-events-none opacity-30 h-48 overflow-hidden"
          )}>
            {article.content}
          </div>
          {showPaywall && (
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white/90 backdrop-blur px-8 py-4 rounded-full border border-zen-clay/30 shadow-2xl shadow-zen-forest/10 flex items-center gap-3">
                 <Lock size={16} className="text-amber-500" />
                 <span className="text-xs font-bold uppercase tracking-widest text-zen-forest">Wisdom Locked</span>
               </div>
            </div>
          )}
        </article>

        <CommentSection articleId={article.id!} />
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title={article.title} 
        url={window.location.href} 
        articleId={article.id}
        shareCountTwitter={article.shareCountTwitter}
        shareCountFacebook={article.shareCountFacebook}
      />
    </div>
  );
};
