import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...userProfile,
      name,
      email
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#131B2A] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                {isRegister ? 'Create KitchenIQ Account' : 'User Authentication'}
              </h2>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Secure Profile & Sync</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#162032] border border-slate-700/80 rounded-xl text-slate-100 font-medium focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-bold uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#162032] border border-slate-700/80 rounded-xl text-slate-100 font-medium focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-bold uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#162032] border border-slate-700/80 rounded-xl text-slate-100 font-medium focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/20"
          >
            {isRegister ? 'Register Account' : 'Save & Login'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-emerald-400 hover:underline font-bold uppercase tracking-wider"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};
