import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Clock, HelpCircle, Trophy } from 'lucide-react';

const TESTS = [
  { id: '1', title: 'GNM 2026 Biology Full Mock Test', duration: '120 min', questions: 100, free: true },
  { id: '2', title: 'Nursing Entrance Chemistry Quiz', duration: '60 min', questions: 50, free: true },
  { id: '3', title: 'Paramedical Mathematics Booster', duration: '90 min', questions: 75, free: false },
  { id: '4', title: 'Physics Important Formula Test', duration: '45 min', questions: 40, free: true },
];

export const MockTests: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <header className="mb-12">
        <h2 className="text-4xl font-bold mb-4">Exam <span className="text-wisdom-saffron">Simulator</span></h2>
        <p className="text-slate-500 max-w-2xl">
          Practice under real exam conditions to find your weak spots and improve your speed before the big day.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTS.map((test, i) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ClipboardList size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{test.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> {test.duration}</span>
                  <span className="flex items-center gap-1"><HelpCircle size={14} /> {test.questions} MCQs</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              {test.free ? (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">FREE</span>
              ) : (
                <span className="text-xs font-bold text-wisdom-saffron bg-amber-50 px-2 py-1 rounded-full">PREMIUM</span>
              )}
              <button 
                className="bg-wisdom-deep text-white text-sm font-bold py-3 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all"
              >
                Start Test
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard/Stats Section */}
      <section className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-wisdom-deep rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Trophy className="text-wisdom-saffron" /> Rank Booster
            </h3>
            <p className="text-slate-300 mb-8 max-w-lg leading-relaxed">
              Our AI analysis identifies your patterns. Students who take at least 1 practice test daily have a <span className="text-wisdom-saffron font-bold text-lg">75% higher chance</span> of selection.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl">
                <div className="text-2xl font-bold text-wisdom-saffron tracking-tight">15k+</div>
                <div className="text-xs text-slate-400 uppercase font-bold mt-1">Tests Taken</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl">
                <div className="text-2xl font-bold text-wisdom-saffron tracking-tight">850+</div>
                <div className="text-xs text-slate-400 uppercase font-bold mt-1">Selections</div>
              </div>
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-wisdom-saffron/10 blur-[80px]" />
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm">
          <h4 className="font-bold mb-6">Recent Top Performers</h4>
          <div className="space-y-4">
            {[
              { name: 'Rahul Kumar', score: '98%', rank: 1 },
              { name: 'Priya Singh', score: '95%', rank: 2 },
              { name: 'Amit Verma', score: '92%', rank: 3 }
            ].map((user) => (
              <div key={user.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-wisdom-deep text-white flex items-center justify-center text-xs font-bold">
                    {user.rank}
                  </div>
                  <span className="font-medium text-sm">{user.name}</span>
                </div>
                <span className="font-bold text-emerald-600">{user.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
