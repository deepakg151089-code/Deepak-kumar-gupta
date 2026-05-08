import React from 'react';
import { motion } from 'motion/react';
import { NOMAD_ESSENTIALS } from '../constants';
import { Star, ShoppingBag, ArrowRight, ExternalLink, ShieldCheck, Truck } from 'lucide-react';

export const Courses: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <header className="mb-20">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-12 h-[1px] bg-zen-forest" />
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-zen-slate">Curated Gear</span>
        </div>
        <h2 className="text-5xl font-display font-bold text-zen-forest mb-6">Nomad Essentials</h2>
        <p className="text-zen-slate max-w-2xl text-lg">
          High-performance tools for a life of perpetual movement. Every item is verified for durability, minimalism, and focus.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {NOMAD_ESSENTIALS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="zen-card group"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-zen-forest/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zen-slate px-3 py-1 bg-zen-clay/30 rounded-full">
                  In Stock
                </span>
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-4 text-zen-forest line-clamp-1">{product.title}</h3>
              <p className="text-sm text-zen-slate mb-8 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-zen-clay/30">
                <span className="text-2xl font-bold text-zen-forest">₹{product.price.toLocaleString()}</span>
                <button 
                  onClick={() => window.open(product.affiliateUrl, '_blank')}
                  className="bg-zen-forest text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zen-slate transition-colors flex items-center gap-2"
                >
                  Buy Now <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Section */}
      <section className="mt-32 p-12 md:p-20 bg-zen-forest rounded-[4rem] text-zen-offwhite overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div>
            <div className="w-16 h-16 glass mx-auto md:mx-0 flex items-center justify-center mb-8 rounded-2xl text-zen-offwhite">
              <ShieldCheck size={32} />
            </div>
            <h4 className="text-xl font-display font-bold mb-4">Verified Quality</h4>
            <p className="text-zen-offwhite/60 text-sm leading-relaxed">Each product is tested in real nomadic conditions across 5 continents.</p>
          </div>
          <div>
            <div className="w-16 h-16 glass mx-auto md:mx-0 flex items-center justify-center mb-8 rounded-2xl text-zen-offwhite">
              <ShoppingBag size={32} />
            </div>
            <h4 className="text-xl font-display font-bold mb-4">Curated Choice</h4>
            <p className="text-zen-offwhite/60 text-sm leading-relaxed">We favor minimalism. If it isn't essential, it isn't listed.</p>
          </div>
          <div>
            <div className="w-16 h-16 glass mx-auto md:md:mx-0 flex items-center justify-center mb-8 rounded-2xl text-zen-offwhite">
              <Truck size={32} />
            </div>
            <h4 className="text-xl font-display font-bold mb-4">Affiliate Logic</h4>
            <p className="text-zen-offwhite/60 text-sm leading-relaxed">Buying through us supports the movement without extra cost to you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
