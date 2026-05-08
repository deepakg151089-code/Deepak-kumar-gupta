import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from 'firebase/auth';
import { LogIn, LogOut } from 'lucide-react';
import { loginWithGoogle, logout } from '../lib/firebase';
import { NAV_ITEMS } from '../constants';
import { cn } from '../lib/utils';

interface NavigationProps {
  user: User | null;
}

export const Navigation: React.FC<NavigationProps> = ({ user }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-wisdom-deep text-white hidden sm:flex flex-col py-8 z-50">
        <div className="px-6 mb-12">
          <h1 className="text-2xl font-bold serif text-wisdom-saffron tracking-tight">Advika Plus</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-1">Advanced Learning Hub</p>
        </div>
        
        <div className="flex-grow space-y-2 px-3">
          {NAV_ITEMS.map((item) => {
            // Only show dashboard if user is logged in
            if (item.id === 'dashboard' && !user) return null;
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive ? "bg-wisdom-saffron text-white shadow-lg" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} />
                <span className="hidden md:block font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
        
        <div className="px-4 pt-8 border-t border-white/10">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border-2 border-wisdom-saffron" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wisdom-saffron to-orange-600 flex items-center justify-center font-bold">
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="hidden md:block overflow-hidden">
                  <p className="text-sm font-bold truncate">{user.displayName}</p>
                  <p className="text-[10px] text-slate-400">Creator Admin</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-slate-400 hover:text-white transition-colors hidden md:block"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl transition-all"
            >
              <LogIn size={20} />
              <span className="hidden md:block font-medium">Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 sm:hidden flex justify-around items-center py-3 px-6 z-50">
        {NAV_ITEMS.map((item) => {
          if (item.id === 'dashboard' && !user) return null;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center space-y-1 transition-colors",
                isActive ? "text-wisdom-saffron" : "text-slate-400"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </NavLink>
          );
        })}
        {!user && (
          <button 
            onClick={loginWithGoogle}
            className="flex flex-col items-center space-y-1 text-slate-400"
          >
            <LogIn size={20} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Login</span>
          </button>
        )}
      </nav>
    </>
  );
};
