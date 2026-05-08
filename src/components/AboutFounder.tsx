import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

export const AboutFounder: React.FC = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-zen-forest/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-zen-clay/30 rounded-full blur-3xl" />
          
          <div className="glass p-8 md:p-12 rounded-[3rem] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                    alt="Deepak Kumar Gupta"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass-dark p-6 rounded-2xl text-zen-offwhite">
                  <p className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Focus</p>
                  <p className="font-display font-bold">Deep Minimalism</p>
                </div>
              </motion.div>
              
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-zen-slate mb-4 block">The Soul Behind ZenNomad</span>
                <h2 className="text-4xl font-display font-bold mb-6 text-zen-forest">Deepak Kumar Gupta</h2>
                <p className="text-zen-slate leading-relaxed mb-8">
                  A visionary nomad on a mission to simplify the modern struggle. Deepak believes that peak performance isn't found in the grind, but in the quiet spaces between movements.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-zen-forest/10 flex items-center justify-center text-zen-forest">
                      <Phone size={14} />
                    </div>
                    <span>+91 8840778831</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-zen-forest/10 flex items-center justify-center text-zen-forest">
                      <Mail size={14} />
                    </div>
                    <span>deepak151089@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-zen-forest/10 flex items-center justify-center text-zen-forest">
                      <MapPin size={14} />
                    </div>
                    <span>Mirzapur, U.P., India</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-xl neo-outset flex items-center justify-center text-zen-forest hover:bg-zen-forest hover:text-white transition-colors"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
