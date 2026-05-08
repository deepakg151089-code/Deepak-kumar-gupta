import React from 'react';
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  ShieldCheck,
  CheckCircle2,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-wisdom-deep pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-wisdom-saffron/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-3xl font-black italic text-white mb-6">
              Advika<span className="text-wisdom-saffron italic"> Elite</span>
            </h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 pr-4">
              Empowering the next generation of professionals with industry-leading skills in AI, Data Analytics, and specialized coding. Your career success starts here.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-wisdom-saffron hover:bg-wisdom-saffron/10 hover:-translate-y-1 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Top Courses */}
          <div>
            <h4 className="text-white font-black italic text-lg mb-8 uppercase tracking-widest text-[10px]">Top Courses</h4>
            <ul className="space-y-4">
              {[
                'Master AI & ML 2026',
                'Advanced Data Analytics',
                'Professional Excel Masterclass',
                'Python for Data Science',
                'Digital Marketing Elite'
              ].map((link, i) => (
                <li key={i}>
                  <a href="/courses" className="text-slate-400 text-sm font-bold hover:text-wisdom-saffron transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-wisdom-saffron/40 group-hover:bg-wisdom-saffron transition-colors" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Support */}
          <div>
            <h4 className="text-white font-black italic text-lg mb-8 uppercase tracking-widest text-[10px]">Quick Support</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-slate-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-wisdom-saffron" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-white/40 mb-1">Call Us Anywhere</p>
                  <p className="text-sm font-bold text-slate-200">+91 91XXXXXXXXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-slate-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-wisdom-saffron" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-white/40 mb-1">Email Support</p>
                  <p className="text-sm font-bold text-slate-200">hello@advikaelite.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-slate-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-wisdom-saffron" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-white/40 mb-1">Center Location</p>
                  <p className="text-sm font-bold text-slate-200">Main Square, Ranchi, Jharkhand</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:pl-4">
            <h4 className="text-white font-black italic text-lg mb-8 uppercase tracking-widest text-[10px]">Newsletter Signup</h4>
            <p className="text-slate-400 text-sm font-medium mb-6 italic">Get weekly updates on new courses & tech jobs.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm font-bold outline-none focus:ring-2 focus:ring-wisdom-saffron transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-wisdom-saffron text-wisdom-deep px-4 rounded-xl flex items-center justify-center hover:scale-105 transition-all">
                <Send size={18} />
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
               <ShieldCheck className="text-wisdom-saffron" size={32} />
               <div>
                  <p className="text-[10px] font-black uppercase text-white tracking-widest">Secured Payment</p>
                  <p className="text-[10px] text-slate-500 font-bold italic line-clamp-1">SSL Encrypted / Safe & Secure</p>
               </div>
            </div>
          </div>
        </div>

        {/* Certified Badge Section */}
        <div className="border-t border-white/5 pt-10 mb-10 flex flex-wrap justify-center gap-12 items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <div className="flex items-center gap-2">
             <Award className="text-wisdom-saffron" />
             <span className="text-white text-xs font-black uppercase tracking-tighter italic">ISO 21001:2018 Certified</span>
           </div>
           <div className="flex items-center gap-2">
             <CheckCircle2 className="text-wisdom-saffron" />
             <span className="text-white text-xs font-black uppercase tracking-tighter italic">Google Workspace Partner</span>
           </div>
           <div className="flex items-center gap-2">
             <Award className="text-wisdom-saffron" />
             <span className="text-white text-xs font-black uppercase tracking-tighter italic">MSME Registered Institute</span>
           </div>
           <div className="flex items-center gap-2">
             <CheckCircle2 className="text-wisdom-saffron" />
             <span className="text-white text-xs font-black uppercase tracking-tighter italic">Skill India Affiliated</span>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 border-t border-white/5">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Advika Elite Education Group. Developed with Integrity.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-wisdom-saffron transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-wisdom-saffron transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-wisdom-saffron transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

