import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  PieChart, 
  Briefcase, 
  Zap,
  Globe,
  Star,
  Plus,
  Eye,
  Share2,
  MessageSquare
} from 'lucide-react';
import { ContentModal } from '../components/ContentModal';
import { contentService, Article } from '../services/contentService';
import { cn } from '../lib/utils';

const REVENUE_DATA = [
  { name: 'Mon', ads: 400, subs: 1200, affiliate: 300 },
  { name: 'Tue', ads: 300, subs: 1500, affiliate: 200 },
  { name: 'Wed', ads: 600, subs: 1800, affiliate: 500 },
  { name: 'Thu', ads: 800, subs: 1700, affiliate: 400 },
  { name: 'Fri', ads: 500, subs: 2200, affiliate: 600 },
  { name: 'Sat', ads: 900, subs: 2500, affiliate: 800 },
  { name: 'Sun', ads: 700, subs: 2100, affiliate: 450 },
];

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = contentService.getArticles((fetched) => {
      setArticles(fetched);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-zen-offwhite pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-10 h-[1px] bg-zen-forest" />
              <span className="text-xs font-bold uppercase tracking-widest text-zen-slate">Growth Protocol</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-zen-forest">Monetization Hub</h1>
            <p className="text-zen-slate mt-2">Real-time performance of ZenNomad ecosystem.</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-zen-forest text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zen-slate transition-all shadow-xl shadow-zen-forest/20 flex items-center gap-3 active:scale-95"
          >
            <Plus size={16} />
            Publish Dispatch
          </button>
        </header>

        {/* Content Management Modal */}
        <ContentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Article Analytics */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zen-forest/5 flex items-center justify-center text-zen-forest">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-xl font-display font-bold text-zen-forest">Movement Impact</h3>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-zen-clay/30 overflow-hidden shadow-xl shadow-zen-forest/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zen-clay/5 border-b border-zen-clay/30">
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zen-slate">Dispatch</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zen-slate">Category</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zen-slate text-center flex items-center justify-center gap-1"><Eye size={14} /> Views</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zen-slate text-center"><div className="flex items-center justify-center gap-1"><Share2 size={14} /> Shares</div></th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zen-slate text-center"><div className="flex items-center justify-center gap-1"><MessageSquare size={14} /> Comments</div></th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zen-slate">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zen-clay/20">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-12 text-center text-zen-slate italic text-sm">Synchronizing data streams...</td>
                    </tr>
                  ) : articles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-12 text-center text-zen-slate italic text-sm">No dispatches found in this sector.</td>
                    </tr>
                  ) : (
                    articles.map((article) => {
                      const totalShares = (article.shareCountTwitter || 0) + (article.shareCountFacebook || 0);
                      const totalViews = article.viewCount || 0;
                      const totalComments = article.commentCount || 0;
                      const engagement = totalViews > 0 
                        ? Math.min(100, (((totalShares * 2) + totalComments * 3) / totalViews) * 100).toFixed(1) 
                        : 0;

                      return (
                        <tr key={article.id} className="hover:bg-zen-forest/5 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                <img src={article.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-bold text-zen-forest font-display line-clamp-1">{article.title}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-zen-clay/10 text-zen-slate">
                              {article.category}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-center text-sm font-mono text-zen-slate">{totalViews}</td>
                          <td className="px-8 py-6 text-center text-sm font-mono text-zen-slate">{totalShares}</td>
                          <td className="px-8 py-6 text-center text-sm font-mono text-zen-slate">{totalComments}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="flex-grow min-w-[80px] h-2 bg-zen-clay/20 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${engagement}%` }}
                                  className="h-full bg-zen-forest"
                                />
                              </div>
                              <span className="text-[10px] font-bold text-zen-forest font-mono">{engagement}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '₹42,300', icon: DollarSign, trend: '+14%', color: 'text-emerald-500' },
            { label: 'Active Subs', value: '1,280', icon: Star, trend: '+5%', color: 'text-amber-500' },
            { label: 'Ad Impressions', value: '45.2k', icon: Globe, trend: '+22%', color: 'text-indigo-500' },
            { label: 'Conversion', value: '3.8%', icon: TrendingUp, trend: '-2%', color: 'text-rose-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="zen-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zen-forest/5 flex items-center justify-center text-zen-forest">
                  <stat.icon size={20} />
                </div>
                <span className={`text-xs font-bold ${stat.color} bg-current/10 px-2 py-1 rounded-lg`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-zen-slate mb-1">{stat.label}</p>
              <h3 className="text-3xl font-display font-bold text-zen-forest">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Revenue Chart */}
          <div className="lg:col-span-8 zen-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold text-zen-forest">Weekly Revenue Split</h3>
                <p className="text-xs text-zen-slate">Subs vs Ads vs Affiliate</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zen-forest" />
                  <span className="text-[10px] font-bold uppercase">Subscriptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zen-accent" />
                  <span className="text-[10px] font-bold uppercase">Ads</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B3022" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1B3022" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="subs" stroke="#1B3022" fillOpacity={1} fill="url(#colorSubs)" strokeWidth={3} />
                  <Area type="monotone" dataKey="ads" stroke="#94A3B8" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Module Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="zen-card p-6 bg-zen-forest text-zen-offwhite">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Zap className="text-amber-400" size={24} />
                  <h3 className="font-display font-bold">Premium Paywall</h3>
                </div>
                <div 
                  onClick={() => {
                    const next = localStorage.getItem('zen_nomad_pro') !== 'true';
                    localStorage.setItem('zen_nomad_pro', String(next));
                    window.location.reload(); // Force reload to see changes globally in this demo
                  }}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all cursor-pointer relative flex items-center px-1",
                    localStorage.getItem('zen_nomad_pro') === 'true' ? "bg-amber-400" : "bg-white/20"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-white transition-all shadow-md",
                    localStorage.getItem('zen_nomad_pro') === 'true' ? "translate-x-6" : "translate-x-0"
                  )} />
                </div>
              </div>
              <p className="text-sm opacity-80 mb-6 font-sans">Subscription logic managed via RevenueCat. Status: <span className="font-bold underline">{localStorage.getItem('zen_nomad_pro') === 'true' ? 'Active' : 'Missing'}</span></p>
              <button className="w-full bg-white text-zen-forest py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zen-clay transition-colors">
                Configure Tiers
              </button>
            </div>

            <div className="zen-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-zen-forest text-xl">Ad Engine</h3>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-bold uppercase text-emerald-500">Active</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 neo-inset">
                  <span className="text-xs font-bold text-zen-slate">Banner Ads</span>
                  <span className="text-xs font-bold">12.4k imp</span>
                </div>
                <div className="flex items-center justify-between p-3 neo-inset">
                  <span className="text-xs font-bold text-zen-slate">Native Placements</span>
                  <span className="text-xs font-bold">8.1k imp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="zen-card p-8">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold text-zen-forest">Nomad Essentials Shop Performance</h3>
                <p className="text-xs text-zen-slate">Affiliate marketing CTR and Earnings</p>
              </div>
              <button className="text-xs font-bold uppercase text-zen-forest border-b border-zen-forest">Add Product</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Heritage Backpack', clicks: 840, earnings: '₹14,500' },
                { name: 'Zen Sound Pods', clicks: 310, earnings: '₹22,100' },
                { name: 'Minimalist Journal', clicks: 1200, earnings: '₹5,700' },
              ].map((item, i) => (
                <div key={i} className="neo-outset p-6">
                   <h4 className="font-display font-bold text-zen-forest mb-4">{item.name}</h4>
                   <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-zen-slate">Total Clicks</p>
                        <p className="text-xl font-bold">{item.clicks}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase text-zen-slate">Earnings</p>
                        <p className="text-xl font-bold text-emerald-600">{item.earnings}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
