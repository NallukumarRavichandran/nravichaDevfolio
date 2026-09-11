import React from 'react';
import { RefreshCw, LayoutGrid, Image, Trash2, FileText, ShieldCheck, HardDrive, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  onOpenProperties: () => void;
  onNewNote: () => void;
  onEmptyRecycle: () => void;
  onOpenApp: (id: string) => void;
  onOpenRun?: () => void;
}

export const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({
  x,
  y,
  onClose,
  onRefresh,
  onOpenProperties,
  onNewNote,
  onEmptyRecycle,
  onOpenApp,
  onOpenRun
}) => {
  // Clamp menu to screen bounds
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 320);

  const handleClick = (action: () => void) => {
    sounds.playClick();
    action();
    onClose();
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      className="fixed z-[9999] w-52 bg-[#f5f5f0] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-xl rounded-xs py-1 text-xs text-zinc-900 select-none font-sans"
      style={{ left: `${adjustedX}px`, top: `${adjustedY}px` }}
    >
      <button
        onClick={() => handleClick(onRefresh)}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5 text-zinc-600" />
        <span>Refresh Desktop</span>
      </button>

      <div className="h-[1px] bg-zinc-300 my-1 mx-1" />

      <button
        onClick={() => handleClick(() => onOpenApp('explorer'))}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
      >
        <HardDrive className="w-3.5 h-3.5 text-blue-600" />
        <span>Open File Explorer</span>
      </button>

      <button
        onClick={() => handleClick(() => onOpenApp('projects'))}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Featured Projects</span>
      </button>

      <button
        onClick={() => handleClick(onNewNote)}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5 text-blue-600" />
        <span>New Text Document (Resume)</span>
      </button>

      <button
        onClick={() => handleClick(() => onOpenApp('paint'))}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
      >
        <LayoutGrid className="w-3.5 h-3.5 text-purple-600" />
        <span>Open Paint.exe</span>
      </button>

      <button
        onClick={() => handleClick(onEmptyRecycle)}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5 text-cyan-700" />
        <span>Empty Recycle Bin</span>
      </button>

      <div className="h-[1px] bg-zinc-300 my-1 mx-1" />

      {onOpenRun && (
        <button
          onClick={() => handleClick(onOpenRun)}
          className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
        >
          <span className="text-sm">🏃</span>
          <span>Run Command...</span>
        </button>
      )}

      <button
        onClick={() => handleClick(() => onOpenApp('control'))}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Security & Skills</span>
      </button>

      <button
        onClick={() => handleClick(onOpenProperties)}
        className="w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 font-bold cursor-pointer"
      >
        <Image className="w-3.5 h-3.5 text-sky-600" />
        <span>Properties</span>
      </button>
    </div>
  );
};
