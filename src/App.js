import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { WALLPAPERS } from "./data/wallpapers";
import { sounds } from "./utils/audio";
import { WindowFrame } from "./components/WindowFrame";
import { Taskbar } from "./components/Taskbar";
import { StartMenu } from "./components/StartMenu";
import { DesktopContextMenu } from "./components/DesktopContextMenu";
import { DisplayPropertiesModal } from "./components/DisplayPropertiesModal";
import { ClippyAssistant } from "./components/ClippyAssistant";
import { BSODScreen } from "./components/BSODScreen";
import { RunModal } from "./components/RunModal";
import { ShutDownDialog } from "./components/ShutDownDialog";
import { LockScreen } from "./components/LockScreen";
import { TurnedOffScreen } from "./components/TurnedOffScreen";
import { InternetExplorerApp } from "./components/apps/InternetExplorerApp";
import { OutlookApp } from "./components/apps/OutlookApp";
import { MediaPlayerApp } from "./components/apps/MediaPlayerApp";
import { NotepadApp } from "./components/apps/NotepadApp";
import { CalculatorApp } from "./components/apps/CalculatorApp";
import { PaintApp } from "./components/apps/PaintApp";
import { MinesweeperApp } from "./components/apps/MinesweeperApp";
import { CommandPromptApp } from "./components/apps/CommandPromptApp";
import { ControlPanelApp } from "./components/apps/ControlPanelApp";
import { FileExplorerApp } from "./components/apps/FileExplorerApp";
import { ProjectsApp } from "./components/apps/ProjectsApp";
import { WelcomeDesk } from "./components/WelcomeDesk";
import { HardDrive, Globe2, Mail as MailIcon, Music2, FileText as FileIcon, Palette, Settings, Recycle, FolderOpen, Calculator as CalculatorIcon, Bomb, Terminal } from "lucide-react";
const INITIAL_WINDOWS = [
  {
    id: "ie",
    title: "Internet Explorer - Amex Cloud Architecture & Projects",
    icon: "\u{1F310}",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 60,
    y: 35,
    width: 780,
    height: 520
  },
  {
    id: "explorer",
    title: "My Computer - Local & Cloud Drives",
    icon: "\u{1F4BD}",
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
    id: "projects",
    title: "Featured Projects - AI Tutor, Mind Buddy & More",
    icon: "\u{1F680}",
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
    id: "notepad",
    title: "Notepad - Nallukumar_R_Resume.txt",
    icon: "\u{1F4DD}",
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
    id: "outlook",
    title: "Outlook Express - kumar10naidu@gmail.com",
    icon: "\u2709\uFE0F",
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
    id: "mediaplayer",
    title: "Windows Media Player 9",
    icon: "\u{1F3B5}",
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
    id: "calculator",
    title: "Calculator",
    icon: "\u{1F9EE}",
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
    id: "paint",
    title: "untitled - Paint",
    icon: "\u{1F3A8}",
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
    id: "minesweeper",
    title: "Minesweeper",
    icon: "\u{1F4A3}",
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
    id: "cmd",
    title: "Command Prompt - C:\\Users\\Nallukumar",
    icon: "\u{1F4BB}",
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
    id: "control",
    title: "Control Panel - Security & Skills",
    icon: "\u2699\uFE0F",
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
function App() {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState("ie");
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [isBSOD, setIsBSOD] = useState(false);
  const [recycleEmpty, setRecycleEmpty] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const [showShutDownDialog, setShowShutDownDialog] = useState(false);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [browserInitialUrl, setBrowserInitialUrl] = useState(void 0);
  const [marquee, setMarquee] = useState(null);
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showBalloon, setShowBalloon] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);
  const installPwa = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };
  useEffect(() => {
    const timer = setTimeout(() => setShowBalloon(false), 7e3);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        sounds.playClick();
        setShowRunDialog(true);
      } else if (e.key === "Escape") {
        setStartMenuOpen(false);
        setContextMenu(null);
        setShowRunDialog(false);
        setShowShutDownDialog(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const bringToFront = (id) => {
    setWindows((wList) => {
      const maxZ = Math.max(...wList.map((w) => w.zIndex), 10);
      return wList.map((w) => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
    });
    setActiveWindowId(id);
    setStartMenuOpen(false);
  };
  const openApp = (id, payload) => {
    sounds.playClick();
    if (id === "ie" && payload) {
      setBrowserInitialUrl(payload);
    }
    setWindows(
      (prev) => prev.map((w) => w.id === id ? { ...w, isOpen: true, isMinimized: false } : w)
    );
    bringToFront(id);
  };
  const closeWindow = (id) => {
    sounds.playClick();
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };
  const minimizeWindow = (id) => {
    sounds.playClick();
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };
  const toggleMaximize = (id) => {
    sounds.playClick();
    setWindows(
      (prev) => prev.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    );
  };
  const updatePosition = (id, x, y) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, x, y } : w));
  };
  const updateSize = (id, width, height) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, width, height } : w));
  };
  const minimizeAll = () => {
    sounds.playClick();
    setWindows((prev) => prev.map((w) => ({ ...w, isMinimized: true })));
    setActiveWindowId(null);
  };
  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    sounds.playClick();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setStartMenuOpen(false);
  };
  const handleDesktopMouseDown = (e) => {
    setContextMenu(null);
    setStartMenuOpen(false);
    setSelectedIconId(null);
    if (e.button === 0 && e.target.id === "desktop-surface") {
      setMarquee({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY
      });
    }
  };
  const handleDesktopMouseMove = (e) => {
    if (marquee) {
      setMarquee((prev) => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null);
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
  const handleTurnOffRequest = () => {
    sounds.playClick();
    setShowShutDownDialog(true);
  };
  const handleLogOff = () => {
    sounds.playStartup();
    setIsLocked(true);
    minimizeAll();
  };
  const desktopIcons = [
    { id: "explorer", label: "My Computer", icon: HardDrive, isApp: true },
    { id: "projects", label: "Featured Projects", icon: FolderOpen, isApp: true },
    { id: "ie", label: "Internet Explorer", icon: Globe2, isApp: true },
    { id: "outlook", label: "Outlook Express", icon: MailIcon, isApp: true },
    { id: "mediaplayer", label: "Media Player", icon: Music2, isApp: true },
    { id: "notepad", label: "Resume.txt", icon: FileIcon, isApp: true },
    { id: "paint", label: "Paint", icon: Palette, isApp: true },
    { id: "calculator", label: "Calculator", icon: CalculatorIcon, isApp: true },
    { id: "minesweeper", label: "Minesweeper", icon: Bomb, isApp: true },
    { id: "cmd", label: "Command Prompt", icon: Terminal, isApp: true },
    { id: "control", label: "Control Panel", icon: Settings, isApp: true },
    {
      id: "recycle",
      label: recycleEmpty ? "Recycle Bin (Empty)" : "Recycle Bin",
      icon: Recycle,
      isApp: false,
      onClick: handleEmptyRecycle
    }
  ];
  if (isBSOD) {
    return /* @__PURE__ */ jsx(BSODScreen, { onRecover: () => setIsBSOD(false) });
  }
  if (isShutDown) {
    return /* @__PURE__ */ jsx(TurnedOffScreen, { onPowerOn: () => setIsShutDown(false) });
  }
  if (isLocked) {
    return /* @__PURE__ */ jsx(
      LockScreen,
      {
        onUnlock: () => setIsLocked(false),
        onTurnOff: () => setIsShutDown(true)
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id: "desktop-surface",
      onContextMenu: handleDesktopContextMenu,
      onMouseDown: handleDesktopMouseDown,
      onMouseMove: handleDesktopMouseMove,
      onMouseUp: handleDesktopMouseUp,
      className: "fixed inset-0 select-none overflow-hidden flex flex-col font-sans",
      style: {
        ...wallpaper.style,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      },
      children: [
        marquee && /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed border border-[#2f71cd] bg-[#2f71cd]/20 pointer-events-none z-[9000]",
            style: {
              left: `${Math.min(marquee.startX, marquee.currentX)}px`,
              top: `${Math.min(marquee.startY, marquee.currentY)}px`,
              width: `${Math.abs(marquee.currentX - marquee.startX)}px`,
              height: `${Math.abs(marquee.currentY - marquee.startY)}px`
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "p-2 grid grid-flow-col grid-rows-6 gap-2 w-fit z-10", children: desktopIcons.map((item) => {
          const isSelected = selectedIconId === item.id;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: (e) => {
                e.stopPropagation();
                setSelectedIconId(item.id);
              },
              onDoubleClick: (e) => {
                e.stopPropagation();
                if (item.isApp) openApp(item.id);
                else item.onClick?.();
              },
              className: `w-[76px] min-h-[68px] p-1 flex flex-col items-center justify-center text-center cursor-pointer transition group ${isSelected ? "bg-[#0a246a]/60 border border-dotted border-white/80" : "hover:bg-[#316ac5]/40"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "h-9 w-9 mb-1 flex items-center justify-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] group-active:scale-95 transition-transform", children: jsx(item.icon, { className: "h-8 w-8 text-white stroke-[1.4]" }) }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `text-[11px] leading-tight px-1 ${isSelected ? "bg-[#0a246a] text-white" : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"}`,
                    children: item.label
                  }
                )
              ]
            },
            item.id
          );
        }) }),
        /* @__PURE__ */ jsx(WelcomeDesk, { onOpenApp: openApp, loggedIn, onLogin: () => {
          sounds.playStartup();
          setLoggedIn(true);
        } }),
        windows.map((win) => /* @__PURE__ */ jsxs(
          WindowFrame,
          {
            window: win,
            isActive: activeWindowId === win.id,
            onFocus: () => bringToFront(win.id),
            onClose: () => closeWindow(win.id),
            onMinimize: () => minimizeWindow(win.id),
            onToggleMaximize: () => toggleMaximize(win.id),
            onUpdatePosition: (x, y) => updatePosition(win.id, x, y),
            onUpdateSize: (w, h) => updateSize(win.id, w, h),
            children: [
              win.id === "ie" && /* @__PURE__ */ jsx(InternetExplorerApp, { initialUrl: browserInitialUrl }),
              win.id === "explorer" && /* @__PURE__ */ jsx(FileExplorerApp, { onOpenApp: openApp }),
              win.id === "projects" && /* @__PURE__ */ jsx(ProjectsApp, { onOpenApp: openApp }),
              win.id === "outlook" && /* @__PURE__ */ jsx(OutlookApp, {}),
              win.id === "mediaplayer" && /* @__PURE__ */ jsx(MediaPlayerApp, {}),
              win.id === "notepad" && /* @__PURE__ */ jsx(NotepadApp, {}),
              win.id === "calculator" && /* @__PURE__ */ jsx(CalculatorApp, {}),
              win.id === "paint" && /* @__PURE__ */ jsx(PaintApp, {}),
              win.id === "minesweeper" && /* @__PURE__ */ jsx(MinesweeperApp, {}),
              win.id === "cmd" && /* @__PURE__ */ jsx(
                CommandPromptApp,
                {
                  onTriggerBSOD: () => setIsBSOD(true),
                  onOpenApp: openApp
                }
              ),
              win.id === "control" && /* @__PURE__ */ jsx(ControlPanelApp, {})
            ]
          },
          win.id
        )),
        /* @__PURE__ */ jsx(
          ClippyAssistant,
          {
            onOpenApp: openApp,
            onOpenProperties: () => setPropertiesOpen(true)
          }
        ),
        showBalloon && /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setShowBalloon(false),
            className: "fixed bottom-10 right-4 z-[9992] max-w-xs bg-[#ffffd0] border border-zinc-700 p-2.5 shadow-xl text-xs font-sans text-zinc-900 cursor-pointer animate-fade-in",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center font-bold text-blue-900 border-b border-yellow-300 pb-1 mb-1", children: [
                /* @__PURE__ */ jsx("span", { children: "Welcome to NalluOS XP!" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-zinc-500", children: "\u2715" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] leading-snug", children: "All enterprise cloud services, File Explorer, Featured Projects, and interactive portfolio apps are active and ready." })
            ]
          }
        ),
        contextMenu && /* @__PURE__ */ jsx(
          DesktopContextMenu,
          {
            x: contextMenu.x,
            y: contextMenu.y,
            onClose: () => setContextMenu(null),
            onRefresh: refreshDesktop,
            onOpenProperties: () => setPropertiesOpen(true),
            onNewNote: () => openApp("notepad"),
            onEmptyRecycle: handleEmptyRecycle,
            onOpenApp: openApp,
            onOpenRun: () => setShowRunDialog(true)
          }
        ),
        propertiesOpen && /* @__PURE__ */ jsx(
          DisplayPropertiesModal,
          {
            currentWallpaper: wallpaper,
            onSelectWallpaper: setWallpaper,
            onClose: () => setPropertiesOpen(false)
          }
        ),
        showRunDialog && /* @__PURE__ */ jsx(
          RunModal,
          {
            onClose: () => setShowRunDialog(false),
            onOpenApp: openApp
          }
        ),
        showShutDownDialog && /* @__PURE__ */ jsx(
          ShutDownDialog,
          {
            onClose: () => setShowShutDownDialog(false),
            onTurnOff: () => {
              setShowShutDownDialog(false);
              sounds.playShutdown();
              setIsShutDown(true);
            },
            onRestart: () => {
              setShowShutDownDialog(false);
              sounds.playStartup();
              setWindows(INITIAL_WINDOWS);
              setActiveWindowId("ie");
            },
            onLock: () => {
              setShowShutDownDialog(false);
              sounds.playClick();
              setIsLocked(true);
            }
          }
        ),
        startMenuOpen && /* @__PURE__ */ jsx(
          StartMenu,
          {
            onClose: () => setStartMenuOpen(false),
            onOpenApp: openApp,
            onOpenProperties: () => setPropertiesOpen(true),
            onOpenRun: () => setShowRunDialog(true),
            onTurnOff: handleTurnOffRequest,
            onLogOff: handleLogOff
          }
        ),
        /* @__PURE__ */ jsx(
          Taskbar,
          {
            windows,
            activeWindowId,
            startMenuOpen,
            onToggleStartMenu: () => {
              sounds.playClick();
              setStartMenuOpen(!startMenuOpen);
            },
            onWindowClick: (win) => {
              if (win.isMinimized) {
                bringToFront(win.id);
              } else if (activeWindowId === win.id) {
                minimizeWindow(win.id);
              } else {
                bringToFront(win.id);
              }
            },
            onOpenApp: openApp,
            onMinimizeAll: minimizeAll,
            canInstall: installPrompt !== null,
            onInstall: installPwa
          }
        )
      ]
    }
  );
}
var App_default = App;
export {
  App,
  App_default as default
};
