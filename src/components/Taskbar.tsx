import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Wifi,
  Globe,
  Mail,
  Music,
  Monitor,
  HardDrive,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { WindowState } from '../types';
import { sounds } from '../utils/audio';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  startMenuOpen: boolean;
  onToggleStartMenu: () => void;
  onWindowClick: (win: WindowState) => void;
  onOpenApp: (id: string) => void;
  onMinimizeAll: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  startMenuOpen,
  onToggleStartMenu,
  onWindowClick,
  onOpenApp,
  onMinimizeAll
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);
  const [soundMuted, setSoundMuted] = useState(!sounds.enabled);

  // Calendar month navigation
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      );
      setDateStr(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    sounds.enabled = soundMuted;
    setSoundMuted(!soundMuted);
    if (soundMuted) sounds.playClick();
  };

  const prevMonth = () => {
    sounds.playClick();
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    sounds.playClick();
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  // Calendar calculations
  const currentYear = calendarDate.getFullYear();
  const currentMonth = calendarDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <>
      {/* Calendar Popover with Month Navigation */}
      {showCalendar && (
        <div
          onClick={e => e.stopPropagation()}
          className="fixed bottom-9 right-1 z-[9999] bg-[#f0f0e8] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-2xl p-3 rounded text-xs font-sans select-none w-72"
        >
          <div className="bg-[#0058e6] text-white font-bold p-2 rounded-t mb-2 flex justify-between items-center">
            <span>{dateStr}</span>
            <span className="font-mono text-sm">{timeStr}</span>
          </div>

          <div className="flex items-center justify-between font-bold text-zinc-800 mb-2 px-1">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-zinc-300 rounded cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span>
              {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-zinc-300 rounded cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px]">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <span key={d} className="font-bold text-zinc-500 py-0.5">
                {d}
              </span>
            ))}

            {/* Leading blanks */}
            {Array.from({ length: firstDayIndex }, (_, i) => (
              <span key={`blank-${i}`} className="p-1 text-zinc-300">
                -
              </span>
            ))}

            {/* Month days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday =
                day === new Date().getDate() &&
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getFullYear();
              return (
                <span
                  key={day}
                  className={`p-1 rounded cursor-pointer ${
                    isToday
                      ? 'bg-[#0058e6] text-white font-bold shadow-xs'
                      : 'hover:bg-zinc-200 text-zinc-800'
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-zinc-300 flex justify-between items-center text-[10px] text-zinc-500">
            <span>Timezone: Local System</span>
            <button
              onClick={() => setCalendarDate(new Date())}
              className="text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>
      )}

      {/* Network Status Popover */}
      {showNetwork && (
        <div
          onClick={e => e.stopPropagation()}
          className="fixed bottom-9 right-8 z-[9999] bg-[#f0f0e8] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-2xl p-3 rounded text-xs font-sans select-none w-64 space-y-2"
        >
          <div className="bg-[#0058e6] text-white font-bold p-1.5 rounded-t flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-300" />
              <span>Local Area Connection</span>
            </span>
            <span className="text-[10px] bg-emerald-700 px-1.5 py-0.5 rounded text-white">Connected</span>
          </div>

          <div className="p-2 bg-white rounded border border-zinc-300 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-zinc-500">Status:</span>
              <span className="font-bold text-zinc-900">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Speed:</span>
              <span className="font-mono text-zinc-900">1.0 Gbps (Fiber)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">IP Address:</span>
              <span className="font-mono text-zinc-900">10.240.18.92</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Cloud Gateway:</span>
              <span className="font-mono text-zinc-900">Giritronics-Amex-VPN</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-600 flex items-center gap-1.5 bg-zinc-100 p-1.5 rounded border border-zinc-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Encrypted tunnel active with zero vulnerabilities.</span>
          </div>
        </div>
      )}

      {/* Volume Slider Popover */}
      {showVolume && (
        <div
          onClick={e => e.stopPropagation()}
          className="fixed bottom-9 right-16 z-[9999] bg-[#f0f0e8] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-2xl p-3 rounded text-xs font-sans select-none flex flex-col items-center gap-2"
        >
          <span className="font-bold text-zinc-700">Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            value={soundMuted ? 0 : volumeLevel}
            onChange={e => {
              setVolumeLevel(parseInt(e.target.value));
              if (soundMuted) setSoundMuted(false);
            }}
            className="h-28 accent-blue-600 cursor-pointer"
            style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
          />
          <button
            onClick={toggleMute}
            className="px-2 py-1 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 rounded text-[11px] font-semibold cursor-pointer"
          >
            {soundMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      )}

      {/* Main XP Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 z-[9990] bg-gradient-to-r from-[#245edb] via-[#3f8cf3] to-[#245edb] border-t border-[#4689eb] flex items-center justify-between select-none font-sans shadow-lg">
        {/* Left Section: Start Button & Quick Launch */}
        <div className="flex items-center h-full">
          {/* Authentic Curved Green Start Button */}
          <button
            onClick={onToggleStartMenu}
            className={`h-full px-4 rounded-r-xl flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              startMenuOpen
                ? 'bg-gradient-to-b from-[#2a6d1e] to-[#429c31] border-r-2 border-b-2 border-zinc-700'
                : 'bg-gradient-to-b from-[#388e3c] via-[#4caf50] to-[#2e7d32] hover:brightness-110 active:brightness-95 border-r border-[#55b85a]'
            }`}
          >
            {/* Windows XP 4-Color Logo */}
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 transform rotate-6">
              <div className="w-1.5 h-1.5 bg-[#e53935] rounded-xs" />
              <div className="w-1.5 h-1.5 bg-[#43a047] rounded-xs" />
              <div className="w-1.5 h-1.5 bg-[#1e88e5] rounded-xs" />
              <div className="w-1.5 h-1.5 bg-[#fdd835] rounded-xs" />
            </div>
            <span className="font-black italic text-white text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide">
              start
            </span>
          </button>

          {/* Quick Launch Toolbar */}
          <div className="hidden sm:flex items-center gap-1 px-2 border-r border-blue-400/60 h-5">
            <button
              onClick={onMinimizeAll}
              className="p-1 hover:bg-white/20 rounded cursor-pointer"
              title="Show Desktop"
            >
              <Monitor className="w-3.5 h-3.5 text-blue-100" />
            </button>
            <button
              onClick={() => onOpenApp('explorer')}
              className="p-1 hover:bg-white/20 rounded cursor-pointer"
              title="My Computer (File Explorer)"
            >
              <HardDrive className="w-3.5 h-3.5 text-blue-100" />
            </button>
            <button
              onClick={() => onOpenApp('projects')}
              className="p-1 hover:bg-white/20 rounded cursor-pointer"
              title="Featured Projects Showcase"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            </button>
            <button
              onClick={() => onOpenApp('ie')}
              className="p-1 hover:bg-white/20 rounded cursor-pointer"
              title="Internet Explorer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-100" />
            </button>
            <button
              onClick={() => onOpenApp('outlook')}
              className="p-1 hover:bg-white/20 rounded cursor-pointer"
              title="Outlook Express"
            >
              <Mail className="w-3.5 h-3.5 text-blue-100" />
            </button>
            <button
              onClick={() => onOpenApp('mediaplayer')}
              className="p-1 hover:bg-white/20 rounded cursor-pointer"
              title="Windows Media Player"
            >
              <Music className="w-3.5 h-3.5 text-blue-100" />
            </button>
          </div>

          {/* Active Window Buttons in Taskbar */}
          <div className="flex items-center gap-1 px-1 overflow-x-auto max-w-[50vw]">
            {windows
              .filter(w => w.isOpen)
              .map(win => {
                const isActive = activeWindowId === win.id && !win.isMinimized;
                return (
                  <button
                    key={win.id}
                    onClick={() => {
                      sounds.playClick();
                      onWindowClick(win);
                    }}
                    className={`h-6 px-2.5 max-w-[150px] truncate rounded flex items-center gap-1.5 text-xs transition select-none cursor-pointer ${
                      isActive
                        ? 'bg-[#1941a5] text-white border-t border-l border-[#0e276b] border-b border-r border-[#3b66d9] shadow-inner font-bold'
                        : 'bg-gradient-to-b from-[#3a83ee] to-[#2563eb] hover:bg-[#327bf0] text-blue-100 border border-[#5293f7]'
                    }`}
                  >
                    <span className="text-xs shrink-0">{win.icon}</span>
                    <span className="truncate">{win.title}</span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Right Section: System Tray */}
        <div className="h-full bg-gradient-to-r from-[#0c59cc] to-[#0a48a8] border-l border-[#1b6eed] px-3 flex items-center gap-2.5 text-white">
          {/* Audio Volume */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowVolume(!showVolume);
              setShowCalendar(false);
              setShowNetwork(false);
            }}
            className="hover:bg-white/10 p-0.5 rounded cursor-pointer"
            title="Volume Control"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-red-300" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Network Connection Icon */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowNetwork(!showNetwork);
              setShowCalendar(false);
              setShowVolume(false);
            }}
            className="hover:bg-white/10 p-0.5 rounded cursor-pointer"
            title="Enterprise Network: Connected (Click for details)"
          >
            <Wifi className="w-3.5 h-3.5 text-emerald-300" />
          </button>

          {/* Clock (Click opens Calendar) */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowCalendar(!showCalendar);
              setShowVolume(false);
              setShowNetwork(false);
            }}
            className="hover:bg-white/10 px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer font-sans text-xs font-semibold tracking-tight"
            title="Click to view calendar"
          >
            <span>{timeStr || '12:00 PM'}</span>
          </button>
        </div>
      </div>
    </>
  );
};
