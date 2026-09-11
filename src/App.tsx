import React, { useState, useEffect } from 'react';
import { WindowState, WallpaperOption } from './types';
import { WALLPAPERS } from './data/wallpapers';
import { sounds } from './utils/audio';

// Components
import { WindowFrame } from './components/WindowFrame';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { DesktopContextMenu } from './components/DesktopContextMenu';
import { DisplayPropertiesModal } from './components/DisplayPropertiesModal';
import { ClippyAssistant } from './components/ClippyAssistant';
import { BSODScreen } from './components/BSODScreen';
import { RunModal } from './components/RunModal';
import { ShutDownDialog } from './components/ShutDownDialog';
import { LockScreen } from './components/LockScreen';
import { TurnedOffScreen } from './components/TurnedOffScreen';

// Applications
import { InternetExplorerApp } from './components/apps/InternetExplorerApp';
import { OutlookApp } from './components/apps/OutlookApp';
import { MediaPlayerApp } from './components/apps/MediaPlayerApp';
import { NotepadApp } from './components/apps/NotepadApp';
import { CalculatorApp } from './components/apps/CalculatorApp';
import { PaintApp } from './components/apps/PaintApp';
import { MinesweeperApp } from './components/apps/MinesweeperApp';
import { CommandPromptApp } from './components/apps/CommandPromptApp';
import { ControlPanelApp } from './components/apps/ControlPanelApp';
import { FileExplorerApp } from './components/apps/FileExplorerApp';
import { ProjectsApp } from './components/apps/ProjectsApp';

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: 'ie',
    title: 'Internet Explorer - Amex Cloud Architecture & Projects',
    icon: '🌐',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 60,
    y: 35,
    width: 780,
    height: 520
  },
  {
    id: 'explorer',
    title: 'My Computer - Local & Cloud Drives',
    icon: '💽',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    x: 80,
    y: 45,
    width: 760,
    height: 500
  },
  {
    id: 'projects',
    title: 'Featured Projects - AI Tutor, Mind Buddy & More',
    icon: '🚀',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    x: 100,
    y: 55,
    width: 820,
    height: 540
  },
  {
    id: 'notepad',
    title: 'Notepad - Nallukumar_R_Resume.txt',
    icon: '📝',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    x: 120,
    y: 70,
    width: 620,
    height: 440
  },
  {
    id: 'outlook',
    title: 'Outlook Express - kumar10naidu@gmail.com',
    icon: '✉️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    x: 160,
    y: 80,
    width: 660,
    height: 460
  },
  {
    id: 'mediaplayer',
    title: 'Windows Media Player 9',
    icon: '🎵',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    x: 220,
    y: 60,
    width: 520,
    height: 430
  },
  {
    id: 'calculator',
    title: 'Calculator',
    icon: '🧮',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    x: 260,
    y: 110,
    width: 320,
    height: 380
  },
  {
    id: 'paint',
    title: 'untitled - Paint',
    icon: '🎨',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    x: 180,
    y: 50,
    width: 700,
    height: 480
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    icon: '💣',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    x: 300,
    y: 120,
    width: 360,
    height: 390
  },
  {
    id: 'cmd',
    title: 'Command Prompt - C:\\Users\\Nallukumar',
    icon: '💻',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    x: 140,
    y: 90,
    width: 640,
    height: 380
  },
  {
    id: 'control',
    title: 'Control Panel - Security & Skills',
    icon: '⚙️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    x: 200,
    y: 75,
    width: 600,
    height: 440
  }
];

export function App() {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<string | null>('ie');
  const [wallpaper, setWallpaper] = useState<WallpaperOption>(WALLPAPERS[0]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [isBSOD, setIsBSOD] = useState(false);
  const [recycleEmpty, setRecycleEmpty] = useState(false);

  // Advanced OS States: Lock, Shutdown, Run Modal, Shutdown Dialog
  const [isLocked, setIsLocked] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const [showShutDownDialog, setShowShutDownDialog] = useState(false);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [browserInitialUrl, setBrowserInitialUrl] = useState<string | undefined>(undefined);

  // Desktop selection marquee
  const [marquee, setMarquee] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  // Context Menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Notification balloon in taskbar tray
  const [showBalloon, setShowBalloon] = useState(true);

  // Auto-dismiss balloon after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBalloon(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut listener: Alt+R for Run, Esc for closing menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        sounds.playClick();
        setShowRunDialog(true);
      } else if (e.key === 'Escape') {
        setStartMenuOpen(false);
        setContextMenu(null);
        setShowRunDialog(false);
        setShowShutDownDialog(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Bring window to top and set active
  const bringToFront = (id: string) => {
    setWindows(wList => {
      const maxZ = Math.max(...wList.map(w => w.zIndex), 10);
      return wList.map(w => (w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w));
    });
    setActiveWindowId(id);
    setStartMenuOpen(false);
  };

  const openApp = (id: string, payload?: string) => {
    sounds.playClick();
    if (id === 'ie' && payload) {
      setBrowserInitialUrl(payload);
    }
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isOpen: true, isMinimized: false } : w))
    );
    bringToFront(id);
  };

  const closeWindow = (id: string) => {
    sounds.playClick();
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isOpen: false } : w)));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    sounds.playClick();
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMaximize = (id: string) => {
    sounds.playClick();
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const updatePosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, x, y } : w)));
  };

  const updateSize = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, width, height } : w)));
  };

  const minimizeAll = () => {
    sounds.playClick();
    setWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
    setActiveWindowId(null);
  };

  // Desktop Context Menu & clicks
  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playClick();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setStartMenuOpen(false);
  };

  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    setContextMenu(null);
    setStartMenuOpen(false);
    setSelectedIconId(null);

    // Only start marquee if left clicked directly on desktop
    if (e.button === 0 && (e.target as HTMLElement).id === 'desktop-surface') {
      setMarquee({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY
      });
    }
  };

  const handleDesktopMouseMove = (e: React.MouseEvent) => {
    if (marquee) {
      setMarquee(prev => (prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null));
    }
  };

  const handleDesktopMouseUp = () => {
    setMarquee(null);
  };

  const refreshDesktop = () => {
    sounds.playClick();
    setSelectedIconId(null);
  };

  const handleEmptyRecycle = () => {
    sounds.playRecycle();
    setRecycleEmpty(true);
  };

  // Turn off action simulation
  const handleTurnOffRequest = () => {
    sounds.playClick();
    setShowShutDownDialog(true);
  };

  const handleLogOff = () => {
    sounds.playStartup();
    setIsLocked(true);
    minimizeAll();
  };

  // Desktop Icon definitions
  const desktopIcons = [
    { id: 'explorer', label: 'My Computer', icon: '💽', isApp: true },
    { id: 'projects', label: 'Featured Projects', icon: '🚀', isApp: true },
    { id: 'ie', label: 'Internet Explorer', icon: '🌐', isApp: true },
    { id: 'outlook', label: 'Outlook Express', icon: '✉️', isApp: true },
    { id: 'mediaplayer', label: 'Media Player', icon: '🎵', isApp: true },
    { id: 'notepad', label: 'Resume.txt', icon: '📝', isApp: true },
    { id: 'paint', label: 'Paint', icon: '🎨', isApp: true },
    { id: 'calculator', label: 'Calculator', icon: '🧮', isApp: true },
    { id: 'minesweeper', label: 'Minesweeper', icon: '💣', isApp: true },
    { id: 'cmd', label: 'Command Prompt', icon: '💻', isApp: true },
    { id: 'control', label: 'Control Panel', icon: '⚙️', isApp: true },
    {
      id: 'recycle',
      label: recycleEmpty ? 'Recycle Bin (Empty)' : 'Recycle Bin',
      icon: recycleEmpty ? '🗑️' : '📁',
      isApp: false,
      onClick: handleEmptyRecycle
    }
  ];

  if (isBSOD) {
    return <BSODScreen onRecover={() => setIsBSOD(false)} />;
  }

  if (isShutDown) {
    return <TurnedOffScreen onPowerOn={() => setIsShutDown(false)} />;
  }

  if (isLocked) {
    return (
      <LockScreen
        onUnlock={() => setIsLocked(false)}
        onTurnOff={() => setIsShutDown(true)}
      />
    );
  }

  return (
    <div
      id="desktop-surface"
      onContextMenu={handleDesktopContextMenu}
      onMouseDown={handleDesktopMouseDown}
      onMouseMove={handleDesktopMouseMove}
      onMouseUp={handleDesktopMouseUp}
      className="fixed inset-0 select-none overflow-hidden flex flex-col font-sans"
      style={{
        ...wallpaper.style,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Selection Marquee Box */}
      {marquee && (
        <div
          className="fixed border border-[#2f71cd] bg-[#2f71cd]/20 pointer-events-none z-[9000]"
          style={{
            left: `${Math.min(marquee.startX, marquee.currentX)}px`,
            top: `${Math.min(marquee.startY, marquee.currentY)}px`,
            width: `${Math.abs(marquee.currentX - marquee.startX)}px`,
            height: `${Math.abs(marquee.currentY - marquee.startY)}px`
          }}
        />
      )}

      {/* Desktop Icons Grid (2 Columns, 6 Rows for clear spacing) */}
      <div className="p-3 grid grid-flow-col grid-rows-6 gap-3 w-fit z-10">
        {desktopIcons.map(item => {
          const isSelected = selectedIconId === item.id;
          return (
            <div
              key={item.id}
              onClick={e => {
                e.stopPropagation();
                setSelectedIconId(item.id);
              }}
              onDoubleClick={e => {
                e.stopPropagation();
                if (item.isApp) openApp(item.id);
                else item.onClick?.();
              }}
              className={`w-20 p-1 flex flex-col items-center justify-center text-center cursor-pointer rounded-xs transition group ${
                isSelected
                  ? 'bg-[#0a246a]/60 border border-dotted border-white/80'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="text-3xl mb-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-active:scale-95 transition-transform">
                {item.icon}
              </div>
              <span
                className={`text-[11px] font-medium leading-tight px-1 rounded-xs ${
                  isSelected
                    ? 'bg-[#0a246a] text-white'
                    : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Windows Stack */}
      {windows.map(win => (
        <WindowFrame
          key={win.id}
          window={win}
          isActive={activeWindowId === win.id}
          onFocus={() => bringToFront(win.id)}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onToggleMaximize={() => toggleMaximize(win.id)}
          onUpdatePosition={(x, y) => updatePosition(win.id, x, y)}
          onUpdateSize={(w, h) => updateSize(win.id, w, h)}
        >
          {win.id === 'ie' && <InternetExplorerApp initialUrl={browserInitialUrl} />}
          {win.id === 'explorer' && <FileExplorerApp onOpenApp={openApp} />}
          {win.id === 'projects' && <ProjectsApp onOpenApp={openApp} />}
          {win.id === 'outlook' && <OutlookApp />}
          {win.id === 'mediaplayer' && <MediaPlayerApp />}
          {win.id === 'notepad' && <NotepadApp />}
          {win.id === 'calculator' && <CalculatorApp />}
          {win.id === 'paint' && <PaintApp />}
          {win.id === 'minesweeper' && <MinesweeperApp />}
          {win.id === 'cmd' && (
            <CommandPromptApp
              onTriggerBSOD={() => setIsBSOD(true)}
              onOpenApp={openApp}
            />
          )}
          {win.id === 'control' && <ControlPanelApp />}
        </WindowFrame>
      ))}

      {/* Clippy Assistant */}
      <ClippyAssistant
        onOpenApp={openApp}
        onOpenProperties={() => setPropertiesOpen(true)}
      />

      {/* Balloon Notification Tooltip */}
      {showBalloon && (
        <div
          onClick={() => setShowBalloon(false)}
          className="fixed bottom-10 right-4 z-[9992] max-w-xs bg-[#ffffd0] border-2 border-zinc-700 rounded-lg p-2.5 shadow-xl text-xs font-sans text-zinc-900 cursor-pointer animate-fade-in"
        >
          <div className="flex justify-between items-center font-bold text-blue-900 border-b border-yellow-300 pb-1 mb-1">
            <span>Welcome to NalluOS XP!</span>
            <span className="text-[10px] text-zinc-500">✕</span>
          </div>
          <p className="text-[11px] leading-snug">
            All enterprise cloud services, File Explorer, Featured Projects, and interactive portfolio apps are active and ready.
          </p>
        </div>
      )}

      {/* Right Click Context Menu */}
      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onRefresh={refreshDesktop}
          onOpenProperties={() => setPropertiesOpen(true)}
          onNewNote={() => openApp('notepad')}
          onEmptyRecycle={handleEmptyRecycle}
          onOpenApp={openApp}
          onOpenRun={() => setShowRunDialog(true)}
        />
      )}

      {/* Display Properties Modal */}
      {propertiesOpen && (
        <DisplayPropertiesModal
          currentWallpaper={wallpaper}
          onSelectWallpaper={setWallpaper}
          onClose={() => setPropertiesOpen(false)}
        />
      )}

      {/* Run Command Dialog */}
      {showRunDialog && (
        <RunModal
          onClose={() => setShowRunDialog(false)}
          onOpenApp={openApp}
        />
      )}

      {/* Shut Down Windows Dialog */}
      {showShutDownDialog && (
        <ShutDownDialog
          onClose={() => setShowShutDownDialog(false)}
          onTurnOff={() => {
            setShowShutDownDialog(false);
            sounds.playShutdown();
            setIsShutDown(true);
          }}
          onRestart={() => {
            setShowShutDownDialog(false);
            sounds.playStartup();
            setWindows(INITIAL_WINDOWS);
            setActiveWindowId('ie');
          }}
          onLock={() => {
            setShowShutDownDialog(false);
            sounds.playClick();
            setIsLocked(true);
          }}
        />
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <StartMenu
          onClose={() => setStartMenuOpen(false)}
          onOpenApp={openApp}
          onOpenProperties={() => setPropertiesOpen(true)}
          onOpenRun={() => setShowRunDialog(true)}
          onTurnOff={handleTurnOffRequest}
          onLogOff={handleLogOff}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        startMenuOpen={startMenuOpen}
        onToggleStartMenu={() => {
          sounds.playClick();
          setStartMenuOpen(!startMenuOpen);
        }}
        onWindowClick={win => {
          if (win.isMinimized) {
            bringToFront(win.id);
          } else if (activeWindowId === win.id) {
            minimizeWindow(win.id);
          } else {
            bringToFront(win.id);
          }
        }}
        onOpenApp={openApp}
        onMinimizeAll={minimizeAll}
      />
    </div>
  );
}

export default App;
