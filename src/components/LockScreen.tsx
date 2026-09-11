import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';

interface LockScreenProps {
  onUnlock: () => void;
  onTurnOff: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, onTurnOff }) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDateStr(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sounds.playStartup();
    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-gradient-to-r from-[#003399] via-[#0058e6] to-[#003399] flex flex-col justify-between p-6 select-none font-sans text-white">
      {/* Top Banner */}
      <div className="flex justify-between items-center border-b border-blue-400/40 pb-4">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
            <div className="w-2 h-2 bg-[#e53935] rounded-xs" />
            <div className="w-2 h-2 bg-[#43a047] rounded-xs" />
            <div className="w-2 h-2 bg-[#1e88e5] rounded-xs" />
            <div className="w-2 h-2 bg-[#fdd835] rounded-xs" />
          </div>
          <span className="font-bold text-lg tracking-wide">Microsoft Windows <span className="text-amber-400 font-extrabold italic">XP</span></span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono">{timeStr}</div>
          <div className="text-xs text-blue-200">{dateStr}</div>
        </div>
      </div>

      {/* Center User Account Card */}
      <div className="flex flex-col items-center justify-center max-w-md mx-auto w-full bg-white/10 backdrop-blur-xs border border-white/20 p-6 rounded-2xl shadow-2xl">
        <div className="w-20 h-20 rounded-xl bg-white/20 border-2 border-white flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-inner">
          NR
        </div>

        <h2 className="text-lg font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Nallukumar Ravichandran
        </h2>
        <p className="text-xs text-blue-200 mb-4 text-center">
          Software Developer Engineer @ Giritronics • Ex-American Express
        </p>

        <form onSubmit={handleUnlock} className="w-full space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="Enter password (or leave blank)..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex-1 bg-white text-zinc-900 px-3 py-1.5 rounded text-xs outline-hidden shadow-inner font-mono"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-xs cursor-pointer shadow-md active:scale-95 transition"
            >
              Log On ➔
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleUnlock()}
            className="w-full text-center text-xs text-blue-200 hover:text-white hover:underline cursor-pointer pt-1"
          >
            Click here to unlock session instantly
          </button>
        </form>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center border-t border-blue-400/40 pt-4 text-xs">
        <button
          onClick={onTurnOff}
          className="flex items-center gap-1.5 text-red-200 hover:text-white cursor-pointer px-3 py-1 rounded bg-white/10 hover:bg-red-600/60 transition"
        >
          <span>⏻</span>
          <span>Turn off computer</span>
        </button>

        <div className="text-blue-200 text-[11px]">
          Enterprise Java & Cloud Architecture Portfolio • Press Enter to log on
        </div>
      </div>
    </div>
  );
};
