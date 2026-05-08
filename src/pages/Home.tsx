import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, NOMAD_ESSENTIALS } from '../constants';
import { ArticleCard } from '../components/ArticleCard';
import { AmbitionTracker } from '../components/AmbitionTracker';
import { AboutFounder } from '../components/AboutFounder';
import { Compass, Zap, Search, ChevronRight, PlayCircle, Headphones, ShoppingBag, ArrowRight, Bookmark, MoveRight, Crown } from 'lucide-react';
import { cn } from '../lib/utils';
import { contentService, Article } from '../services/contentService';

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = contentService.getArticles((fetchedArticles) => {
      setArticles(fetchedArticles);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(a => a.category === activeCategory));
    }
  }, [activeCategory, articles]);

  const wisdomStats = [
    { label: 'Deep Focus Sessions', progress: 72, target: 'Daily 4h' },
    { label: 'Meditation Streak', progress: 100, target: '30 Days' },
    { label: 'Article Reads', progress: 45, target: '10/Week' },
  ];

  return (
    <div className="pb-24 bg-zen-offwhite min-h-screen">
      {/* Editorial Header */}
      <header className="pt-20 pb-12 px-4 border-b border-zen-clay/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[1px] bg-zen-forest" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-zen-slate">Issue № 01 — Spring 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] text-zen-forest mb-8">
              Movement <br />
              <span className="text-zen-accent italic">without</span> chaos.
            </h1>
            <p className="text-lg md:text-xl text-zen-slate font-medium max-w-lg leading-relaxed">
              Design a life of intentional progress. Join a global movement of nomads who choose ambition without the anxiety.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col gap-4 border-l border-zen-clay/50 pl-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-zen-slate">Daily Wisdom</p>
            <blockquote className="text-xl font-display font-bold text-zen-forest max-w-[280px]">
              "Focus is a muscle. Silence is the gym."
            </blockquote>
            <div className="flex items-center gap-2 text-zen-slate">
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-medium">Updated 4h ago</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            
            {/* Featured Articles */}
            <section className="mb-24">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zen-slate">The News Engine</h3>
                <div className="flex gap-2">
                   {['All', 'Daily Wisdom', 'Global News', 'Mindset'].map((cat) => (
                     <button 
                       key={cat} 
                       onClick={() => setActiveCategory(cat)}
                       className={cn(
                         "text-[10px] font-bold uppercase tracking-tighter px-4 py-2 rounded-full transition-all",
                         activeCategory === cat ? "bg-zen-forest text-white shadow-lg" : "hover:bg-zen-clay/30 text-zen-slate"
                       )}
                     >
                       {cat === 'Daily Wisdom' ? 'Wisdom' : cat === 'Global News' ? 'Global' : cat}
                     </button>
                   ))}
                </div>
              </div>
              
              {loading ? (
                <div className="flex flex-col gap-12">
                   {[1, 2, 3].map(n => (
                     <div key={n} className="animate-pulse flex flex-col md:flex-row gap-8">
                        <div className="md:col-span-5 w-full md:w-1/3 aspect-[4/5] bg-zen-clay/20 rounded-3xl" />
                        <div className="md:col-span-7 flex-grow space-y-4 pt-4">
                           <div className="h-4 w-32 bg-zen-clay/20 rounded" />
                           <div className="h-8 w-full bg-zen-clay/20 rounded" />
                           <div className="h-20 w-full bg-zen-clay/20 rounded" />
                        </div>
                     </div>
                   ))}
                </div>
              ) : filteredArticles.length > 0 ? (
                <div className="space-y-24">
                  {filteredArticles.map((article, i) => (
                    <motion.article 
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-5 aspect-[4/5] overflow-hidden rounded-[2rem] relative border border-zen-clay/20 shadow-xl">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                             <div className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-zen-forest">
                               {article.category}
                             </div>
                             {article.premium && (
                               <div className="bg-amber-400 text-white p-2 rounded-full shadow-lg flex items-center justify-center w-fit">
                                 <Crown size={12} />
                               </div>
                             )}
                          </div>
                        </div>
                        <div className="md:col-span-7 pt-4">
                          <div className="flex items-center gap-4 text-[10px] font-bold text-zen-slate uppercase tracking-widest mb-4">
                            <span>{article.date?.toDate?.() ? article.date.toDate().toLocaleDateString() : 'Today'}</span>
                            <span className="w-1 h-1 rounded-full bg-zen-clay" />
                            <span>By {article.author}</span>
                          </div>
                          <h2 
                            onClick={() => navigate(`/article/${article.id}`)}
                            className="text-3xl md:text-4xl font-display font-bold text-zen-forest mb-6 leading-tight group-hover:text-zen-slate transition-colors cursor-pointer"
                          >
                            {article.title}
                          </h2>
                          <p className="text-lg text-zen-slate mb-8 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-8">
                            <button 
                              onClick={() => navigate(`/article/${article.id}`)}
                              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zen-forest group-hover:gap-4 transition-all"
                            >
                              Read Article <MoveRight size={16} />
                            </button>
                            <button className="text-zen-slate hover:text-zen-forest">
                              <Bookmark size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-zen-clay/10 rounded-[3rem] border border-dashed border-zen-clay">
                   <p className="text-zen-slate font-display font-bold">No dispatches found in this sector.</p>
                </div>
              )}
            </section>

            {/* Video integration / Tutorials */}
            <section className="bg-zen-forest py-20 px-8 rounded-[3rem] text-zen-offwhite shadow-3xl shadow-zen-forest/20">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-60 mb-6 block">Vlogs & Tutorials</span>
                <h3 className="text-4xl font-display font-bold mb-8">Mastering the Sacred Morning Routine</h3>
                <div className="aspect-video rounded-3xl overflow-hidden relative group cursor-pointer shadow-3xl">
                   <img 
                    src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700" 
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-zen-forest group-hover:scale-110 transition-transform">
                        <PlayCircle size={40} fill="currentColor" fillOpacity={0.2} />
                     </div>
                   </div>
                   <div className="absolute bottom-6 left-6 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=10" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-xs font-bold tracking-widest">Tutorial by Deepak</span>
                   </div>
                </div>
                <div className="mt-10 flex gap-4">
                  <button className="bg-zen-offwhite text-zen-forest px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zen-clay transition-colors">
                    Join Premium Library
                  </button>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Ambition Tracker Side Panel */}
            <div className="sticky top-24">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zen-slate mb-8">Personal Growth</h3>
              {wisdomStats.map((stat, i) => (
                <AmbitionTracker key={i} label={stat.label} progress={stat.progress} target={stat.target} />
              ))}

              {/* Nomad Essentials - Shop integration */}
              <div className="mt-20">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zen-slate">Nomad Essentials</h3>
                  <button onClick={() => navigate('/shop')} className="text-[10px] font-bold text-zen-accent hover:text-zen-forest uppercase">Shop all</button>
                </div>
                <div className="space-y-6">
                  {NOMAD_ESSENTIALS.map(product => (
                    <div key={product.id} onClick={() => navigate('/shop')} className="zen-card p-4 flex gap-4 items-center group cursor-pointer transition-all hover:border-zen-forest">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-display font-bold text-zen-forest mb-1">{product.title}</h4>
                        <p className="text-[10px] text-zen-slate uppercase font-bold tracking-tighter">Verified Choice</p>
                        <div className="flex items-center justify-between mt-2">
                           <span className="text-xs font-bold">₹{product.price.toLocaleString()}</span>
                           <ArrowRight size={14} className="text-zen-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter / CTA */}
              <div className="mt-20 p-8 rounded-[2.5rem] bg-zen-clay/20 border border-zen-clay/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-zen-forest/5 rounded-full -translate-y-12 translate-x-12" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zen-slate mb-4 block">The Nomad Brief</span>
                <h4 className="text-2xl font-display font-bold text-zen-forest mb-4">Silence the noise.</h4>
                <p className="text-sm text-zen-slate mb-6">
                  One weekly dispatch with deep insights and nomad gear essentials.
                </p>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="w-full bg-white px-6 py-4 rounded-2xl text-sm border-none focus:ring-2 focus:ring-zen-forest/20 shadow-sm"
                  />
                  <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-zen-forest text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

            </div>
          </aside>
        </div>

        {/* Founder Section */}
        <AboutFounder />

      </main>

      {/* Modern Desktop Navigation (Hidden on Mobile) */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 z-50">
         {['01', '02', '03', '04'].map((num, i) => (
           <div key={i} className="group relative flex items-center gap-4 cursor-pointer">
              <span className="text-[10px] font-bold text-zen-slate opacity-40 group-hover:opacity-100 transition-opacity">{num}</span>
              <div className="w-8 h-[1px] bg-zen-clay group-hover:w-12 group-hover:bg-zen-forest transition-all" />
           </div>
         ))}
      </nav>
    </div>
  );
};


