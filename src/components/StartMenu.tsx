import React, { useState } from 'react';
import {
  Globe,
  Mail,
  Music,
  FileText,
  LayoutGrid,
  Calculator,
  Bomb,
  Terminal,
  Folder,
  ShieldCheck,
  Image,
  LogOut,
  Power,
  ChevronRight,
  Sliders,
  ExternalLink,
  Search,
  HardDrive,
  Code2,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (id: string) => void;
  onOpenProperties: () => void;
  onOpenRun: () => void;
  onTurnOff: () => void;
  onLogOff: () => void;
}

interface AppOption {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  category: string;
}

const ALL_PROGRAMS_LIST: AppOption[] = [
  { id: 'ie', name: 'Internet Explorer', subtitle: 'Web Portfolio & Live Interactive Demos', icon: '🌐', category: 'Internet' },
  { id: 'explorer', name: 'My Computer (File Explorer)', subtitle: 'Browse drives, files & credentials', icon: '💽', category: 'System' },
  { id: 'projects', name: 'Featured Projects Showcase', subtitle: 'AI Tutor, Mind Buddy, You-Clone, Hash-Forge', icon: '🚀', category: 'Portfolio' },
  { id: 'outlook', name: 'Outlook Express', subtitle: 'Email kumar10naidu@gmail.com', icon: '✉️', category: 'Internet' },
  { id: 'mediaplayer', name: 'Windows Media Player 9', subtitle: 'Interactive Synthesized Lo-Fi Music', icon: '🎵', category: 'Media' },
  { id: 'notepad', name: 'Notepad', subtitle: 'Nallukumar_R_Resume.txt', icon: '📝', category: 'Accessories' },
  { id: 'calculator', name: 'Calculator', subtitle: 'Standard & Scientific Operations', icon: '🧮', category: 'Accessories' },
  { id: 'paint', name: 'Paint', subtitle: 'Draw, sketch & export artwork', icon: '🎨', category: 'Accessories' },
  { id: 'minesweeper', name: 'Minesweeper', subtitle: 'Classic Windows Puzzle Game', icon: '💣', category: 'Games' },
  { id: 'cmd', name: 'Command Prompt', subtitle: 'Interactive CLI terminal with commands', icon: '💻', category: 'System' },
  { id: 'control', name: 'Control Panel', subtitle: 'System Specs, Themes & Skills', icon: '⚙️', category: 'System' }
];

export const StartMenu: React.FC<StartMenuProps> = ({
  onClose,
  onOpenApp,
  onOpenProperties,
  onOpenRun,
  onTurnOff,
  onLogOff
}) => {
  const [allProgramsOpen, setAllProgramsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLaunch = (id: string) => {
    sounds.playClick();
    onOpenApp(id);
    onClose();
  };

  const filteredPrograms = searchQuery
    ? ALL_PROGRAMS_LIST.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredPrograms.length > 0) {
      handleLaunch(filteredPrograms[0].id);
    }
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      className="fixed bottom-8 left-0 z-[9995] w-96 max-w-[95vw] bg-white rounded-t-lg shadow-2xl border-t-2 border-l-2 border-r-2 border-[#0058e6] flex flex-col font-sans select-none overflow-hidden"
    >
      {/* User Header */}
      <div className="bg-gradient-to-r from-[#0058e6] via-[#2f88ff] to-[#0058e6] p-2.5 flex items-center gap-3 border-b border-blue-400">
        <div className="w-10 h-10 rounded-md bg-white/20 border-2 border-white flex items-center justify-center text-white shadow-inner font-bold text-base">
          NR
        </div>
        <div className="text-white flex-1 min-w-0">
          <div className="font-bold text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] truncate">
            Nallukumar Ravichandran
          </div>
          <div className="text-[10px] text-blue-100 truncate">Software Developer Engineer @ Giritronics • Ex-Amex</div>
        </div>
      </div>

      {/* Quick Search Input */}
      <form onSubmit={handleSearchSubmit} className="bg-[#d3e5fa] px-2 py-1.5 border-b border-blue-200 flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-zinc-400" />
          <input
            type="text"
            placeholder="Type here to search apps, files, or tools..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-2 py-1 bg-white border border-zinc-300 rounded text-xs outline-hidden text-zinc-900 focus:border-blue-500 shadow-inner"
          />
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-[11px] text-blue-800 hover:underline px-1"
          >
            Clear
          </button>
        )}
      </form>

      {/* If Searching, show Filtered Results */}
      {searchQuery ? (
        <div className="p-2 min-h-[360px] max-h-[420px] overflow-y-auto bg-white">
          <div className="text-[10px] font-bold text-zinc-500 uppercase px-2 mb-1.5">
            Search Results ({filteredPrograms.length})
          </div>
          {filteredPrograms.length === 0 ? (
            <div className="p-4 text-center text-zinc-500 text-xs">
              No matching programs or commands found for "{searchQuery}".
            </div>
          ) : (
            filteredPrograms.map(p => (
              <button
                key={p.id}
                onClick={() => handleLaunch(p.id)}
                className="w-full text-left p-2 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group mb-1 border border-transparent hover:border-blue-300 transition"
              >
                <span className="text-xl shrink-0">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-zinc-900 group-hover:text-white truncate">{p.name}</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-blue-100 truncate">{p.subtitle}</div>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 group-hover:bg-white/20 text-zinc-600 group-hover:text-white">
                  {p.category}
                </span>
              </button>
            ))
          )}
        </div>
      ) : (
        /* Standard Two Column Body */
        <div className="flex flex-1 min-h-[360px]">
          {/* Left Column (Pinned & Frequently used apps) */}
          <div className="w-1/2 p-2 bg-white flex flex-col justify-between border-r border-zinc-200">
            <div className="space-y-1">
              <button
                onClick={() => handleLaunch('ie')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-transparent group-hover:text-white shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="font-bold text-xs text-zinc-900 group-hover:text-white">Internet Explorer</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-blue-100 truncate">Portfolio & Live Demos</div>
                </div>
              </button>

              <button
                onClick={() => handleLaunch('projects')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center bg-amber-50 text-amber-600 group-hover:bg-transparent group-hover:text-white shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="font-bold text-xs text-zinc-900 group-hover:text-white">Featured Projects</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-blue-100 truncate">AI Tutor, Mind Buddy...</div>
                </div>
              </button>

              <button
                onClick={() => handleLaunch('outlook')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-transparent group-hover:text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="font-bold text-xs text-zinc-900 group-hover:text-white">Outlook Express</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-blue-100">Send direct message</div>
                </div>
              </button>

              <button
                onClick={() => handleLaunch('mediaplayer')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center bg-cyan-50 text-cyan-600 group-hover:bg-transparent group-hover:text-white shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="font-bold text-xs text-zinc-900 group-hover:text-white">Media Player 9</div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-blue-100">Lo-Fi Synth Tracks</div>
                </div>
              </button>

              <div className="h-[1px] bg-zinc-200 my-1" />

              <button
                onClick={() => handleLaunch('notepad')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group"
              >
                <FileText className="w-4 h-4 text-blue-600 group-hover:text-white shrink-0" />
                <span className="text-xs text-zinc-800 group-hover:text-white font-medium">Resume (Notepad)</span>
              </button>

              <button
                onClick={() => handleLaunch('calculator')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group"
              >
                <Calculator className="w-4 h-4 text-amber-600 group-hover:text-white shrink-0" />
                <span className="text-xs text-zinc-800 group-hover:text-white font-medium">Calculator</span>
              </button>

              <button
                onClick={() => handleLaunch('paint')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group"
              >
                <LayoutGrid className="w-4 h-4 text-purple-600 group-hover:text-white shrink-0" />
                <span className="text-xs text-zinc-800 group-hover:text-white font-medium">Paint</span>
              </button>

              <button
                onClick={() => handleLaunch('minesweeper')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group"
              >
                <Bomb className="w-4 h-4 text-red-600 group-hover:text-white shrink-0" />
                <span className="text-xs text-zinc-800 group-hover:text-white font-medium">Minesweeper</span>
              </button>

              <button
                onClick={() => handleLaunch('cmd')}
                className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group"
              >
                <Terminal className="w-4 h-4 text-zinc-800 group-hover:text-white shrink-0" />
                <span className="text-xs text-zinc-800 group-hover:text-white font-medium">Command Prompt</span>
              </button>
            </div>

            {/* All Programs button */}
            <div className="border-t border-zinc-200 pt-1 mt-1 relative">
              <button
                onClick={() => {
                  sounds.playClick();
                  setAllProgramsOpen(!allProgramsOpen);
                }}
                className="w-full p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center justify-between font-bold text-xs text-zinc-900 group cursor-pointer"
              >
                <span>All Programs</span>
                <ChevronRight className="w-4 h-4 text-green-600 group-hover:text-white" />
              </button>

              {/* All Programs Flyout Submenu */}
              {allProgramsOpen && (
                <div className="absolute left-full bottom-0 w-56 bg-white border border-zinc-400 shadow-2xl rounded py-1 z-50">
                  <div className="px-3 py-1 font-bold text-[10px] text-zinc-400 uppercase">Core Applications</div>
                  {ALL_PROGRAMS_LIST.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleLaunch(item.id)}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white text-xs flex items-center gap-2"
                    >
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Light blue system & places) */}
          <div className="w-1/2 p-2 bg-[#d3e5fa] space-y-1 text-zinc-800">
            <button
              onClick={() => handleLaunch('explorer')}
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group"
            >
              <HardDrive className="w-4 h-4 text-blue-700 group-hover:text-white" />
              <span>My Computer</span>
            </button>

            <button
              onClick={() => handleLaunch('notepad')}
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group"
            >
              <Folder className="w-4 h-4 text-amber-600 group-hover:text-white" />
              <span>My Documents</span>
            </button>

            <button
              onClick={() => handleLaunch('projects')}
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group"
            >
              <Code2 className="w-4 h-4 text-indigo-700 group-hover:text-white" />
              <span>My Projects</span>
            </button>

            <button
              onClick={() => handleLaunch('control')}
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group"
            >
              <Sliders className="w-4 h-4 text-blue-700 group-hover:text-white" />
              <span>Control Panel</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenProperties();
                onClose();
              }}
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group"
            >
              <Image className="w-4 h-4 text-sky-600 group-hover:text-white" />
              <span>Display Properties</span>
            </button>

            <div className="h-[1px] bg-blue-200 my-1.5" />

            <a
              href="https://github.com/NallukumarRavichandran"
              target="_blank"
              rel="noreferrer"
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center justify-between cursor-pointer text-xs group"
            >
              <span className="font-semibold text-zinc-900 group-hover:text-white">GitHub Profile ↗</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white" />
            </a>

            <a
              href="https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true"
              target="_blank"
              rel="noreferrer"
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center justify-between cursor-pointer text-xs group"
            >
              <span className="font-semibold text-zinc-900 group-hover:text-white">LinkedIn Profile ↗</span>
              <ExternalLink className="w-3 h-3 text-blue-600 group-hover:text-white" />
            </a>

            <div className="h-[1px] bg-blue-200 my-1.5" />

            <button
              onClick={() => handleLaunch('control')}
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer text-xs group"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:text-white" />
              <span>Security Center</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenRun();
                onClose();
              }}
              className="w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer text-xs group font-semibold text-zinc-900"
            >
              <span className="text-sm">🏃</span>
              <span>Run...</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer (Log Off / Turn Off) */}
      <div className="bg-gradient-to-r from-[#0058e6] via-[#2f88ff] to-[#0058e6] p-2 flex justify-end gap-3 text-white text-xs border-t border-blue-400">
        <button
          onClick={() => {
            sounds.playClick();
            onLogOff();
            onClose();
          }}
          className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/20 rounded font-bold cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
            <LogOut className="w-3 h-3 text-white" />
          </div>
          <span>Log Off</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            onTurnOff();
            onClose();
          }}
          className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/20 rounded font-bold cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
            <Power className="w-3 h-3 text-white" />
          </div>
          <span>Turn Off</span>
        </button>
      </div>
    </div>
  );
};
