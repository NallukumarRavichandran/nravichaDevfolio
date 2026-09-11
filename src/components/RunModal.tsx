import React, { useState } from 'react';
import { sounds } from '../utils/audio';

interface RunModalProps {
  onClose: () => void;
  onOpenApp: (appId: string, payload?: string) => void;
}

export const RunModal: React.FC<RunModalProps> = ({ onClose, onOpenApp }) => {
  const [command, setCommand] = useState('explorer');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    sounds.playClick();

    switch (cmd) {
      case 'explorer':
      case 'mycomputer':
      case 'thispc':
      case 'files':
        onOpenApp('explorer');
        onClose();
        break;

      case 'projects':
      case 'portfolio':
        onOpenApp('projects');
        onClose();
        break;

      case 'cmd':
      case 'terminal':
      case 'command':
        onOpenApp('cmd');
        onClose();
        break;

      case 'calc':
      case 'calculator':
        onOpenApp('calculator');
        onClose();
        break;

      case 'notepad':
      case 'resume':
      case 'notes':
        onOpenApp('notepad');
        onClose();
        break;

      case 'mspaint':
      case 'paint':
      case 'draw':
        onOpenApp('paint');
        onClose();
        break;

      case 'ie':
      case 'iexplore':
      case 'chrome':
      case 'browser':
      case 'web':
        onOpenApp('ie');
        onClose();
        break;

      case 'outlook':
      case 'mail':
      case 'email':
        onOpenApp('outlook');
        onClose();
        break;

      case 'wmplayer':
      case 'music':
      case 'player':
        onOpenApp('mediaplayer');
        onClose();
        break;

      case 'control':
      case 'controlpanel':
      case 'settings':
        onOpenApp('control');
        onClose();
        break;

      case 'minesweeper':
      case 'winmine':
      case 'game':
        onOpenApp('minesweeper');
        onClose();
        break;

      case 'github':
        window.open('https://github.com/NallukumarRavichandran', '_blank', 'noopener,noreferrer');
        onClose();
        break;

      case 'linkedin':
        window.open('https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true', '_blank', 'noopener,noreferrer');
        onClose();
        break;

      default:
        if (
          cmd.startsWith('http://') ||
          cmd.startsWith('https://') ||
          cmd.startsWith('www.') ||
          cmd.includes('.org') ||
          cmd.includes('.com') ||
          cmd.includes('.io') ||
          cmd.includes('.net') ||
          cmd.includes('.edu') ||
          cmd.includes('.gov')
        ) {
          const url = cmd.startsWith('http://') || cmd.startsWith('https://') ? cmd : `https://${cmd}`;
          onOpenApp('ie', url);
          onClose();
        } else {
          setErrorMsg(`Windows cannot find '${command}'. Make sure you typed the name correctly, and then try again.`);
          sounds.playError();
        }
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center p-4">
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#ece9d8] border-2 border-[#0058e6] rounded shadow-2xl w-full max-w-sm flex flex-col font-sans select-none overflow-hidden"
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#0058e6] to-[#2b79f7] text-white px-2 py-1 font-bold text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span>🏃</span>
            <span>Run</span>
          </div>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-[#e81123] hover:bg-[#f1707a] text-white rounded text-[10px] flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-3 text-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🏃</div>
            <div className="text-zinc-800 leading-snug">
              Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold text-zinc-700 w-12 text-right">Open:</label>
            <input
              type="text"
              value={command}
              onChange={e => {
                setCommand(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              autoFocus
              className="flex-1 bg-white border border-zinc-500 rounded-xs px-2 py-1 text-xs outline-hidden shadow-inner"
            />
          </div>

          {errorMsg && (
            <div className="p-2 bg-red-50 border border-red-300 text-red-700 rounded text-[11px] leading-snug">
              {errorMsg}
            </div>
          )}

          <div className="bg-zinc-100 p-2 rounded border border-zinc-200 text-[10px] text-zinc-600 space-y-0.5">
            <div className="font-bold text-zinc-700">Quick suggestions:</div>
            <div className="flex flex-wrap gap-1">
              {['explorer', 'projects', 'cmd', 'calc', 'notepad', 'ie', 'paint', 'outlook', 'music', 'control', 'github', 'linkedin'].map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCommand(c)}
                  className="px-1.5 py-0.5 bg-white border border-zinc-300 hover:bg-blue-50 hover:border-blue-400 rounded text-[10px] font-mono cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-300">
            <button
              type="submit"
              className="px-4 py-1 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 active:border-zinc-600 rounded font-semibold text-xs cursor-pointer shadow-xs"
            >
              OK
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 active:border-zinc-600 rounded font-semibold text-xs cursor-pointer shadow-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
