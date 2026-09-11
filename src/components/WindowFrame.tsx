import React, { useRef } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import { WindowState } from '../types';
import { sounds } from '../utils/audio';

interface WindowFrameProps {
  window: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onUpdateSize: (w: number, h: number) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onUpdatePosition,
  onUpdateSize,
  children
}) => {
  const dragOffset = useRef({ x: 0, y: 0 });

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    onFocus();
    dragOffset.current = {
      x: e.clientX - win.x,
      y: e.clientY - win.y
    };

    const handleMouseMove = (ev: MouseEvent) => {
      const newX = Math.max(0, Math.min(window.innerWidth - 100, ev.clientX - dragOffset.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, ev.clientY - dragOffset.current.y));
      onUpdatePosition(newX, newY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Resizing logic from bottom-right corner
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = win.width;
    const startH = win.height;

    const handleMouseMove = (ev: MouseEvent) => {
      const nextW = Math.max(320, startW + (ev.clientX - startX));
      const nextH = Math.max(220, startH + (ev.clientY - startY));
      onUpdateSize(nextW, nextH);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <div
      onMouseDown={onFocus}
      className={`fixed flex flex-col rounded-t-lg overflow-hidden shadow-2xl transition-all ${
        win.isMaximized
          ? 'top-0 left-0 w-full h-[calc(100vh-32px)] rounded-none'
          : ''
      } ${
        isActive
          ? 'border-[3px] border-[#0058e6]'
          : 'border-[3px] border-[#6b82a3]'
      }`}
      style={
        win.isMaximized
          ? { zIndex: win.zIndex }
          : {
              left: `${win.x}px`,
              top: `${win.y}px`,
              width: `${win.width}px`,
              height: `${win.height}px`,
              zIndex: win.zIndex
            }
      }
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          sounds.playClick();
          onToggleMaximize();
        }}
        className={`h-7.5 px-2 flex items-center justify-between select-none cursor-grab active:cursor-grabbing ${
          isActive
            ? 'bg-gradient-to-r from-[#0058e6] via-[#2f88ff] to-[#0058e6]'
            : 'bg-gradient-to-r from-[#627794] via-[#859cb8] to-[#627794]'
        }`}
      >
        {/* Title & Icon */}
        <div className="flex items-center gap-1.5 font-bold text-xs text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] truncate">
          <span className="text-sm">{win.icon}</span>
          <span className="truncate">{win.title}</span>
        </div>

        {/* Action Buttons (Minimize, Maximize, Close) */}
        <div className="flex items-center gap-1 shrink-0 ml-2" onMouseDown={e => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={() => {
              sounds.playClick();
              onMinimize();
            }}
            className="w-5 h-5 bg-[#0058e6] hover:bg-[#1a6cf0] border border-t-[#5999ff] border-l-[#5999ff] border-b-[#00348a] border-r-[#00348a] rounded-xs flex items-center justify-center text-white shadow-xs"
            title="Minimize"
          >
            <Minus className="w-3 h-3 stroke-[3]" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleMaximize();
            }}
            className="w-5 h-5 bg-[#0058e6] hover:bg-[#1a6cf0] border border-t-[#5999ff] border-l-[#5999ff] border-b-[#00348a] border-r-[#00348a] rounded-xs flex items-center justify-center text-white shadow-xs"
            title={win.isMaximized ? 'Restore Down' : 'Maximize'}
          >
            {win.isMaximized ? (
              <Copy className="w-2.5 h-2.5 stroke-[2.5]" />
            ) : (
              <Square className="w-2.5 h-2.5 stroke-[2.5]" />
            )}
          </button>

          {/* Close */}
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-5 h-5 bg-[#d93426] hover:bg-[#f04335] border border-t-[#ff7a6e] border-l-[#ff7a6e] border-b-[#8f190e] border-r-[#8f190e] rounded-xs flex items-center justify-center text-white shadow-xs ml-0.5"
            title="Close"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#f0f0e8] overflow-hidden relative">
        {children}

        {/* Resizing grip handle (bottom right) */}
        {!win.isMaximized && (
          <div
            onMouseDown={handleResizeMouseDown}
            className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-se-resize flex items-end justify-end p-0.5 z-50 opacity-40 hover:opacity-100"
            title="Resize"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M7 1L1 7M7 4L4 7M7 7" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
