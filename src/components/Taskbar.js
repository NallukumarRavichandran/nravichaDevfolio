import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
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
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { sounds } from "../utils/audio";
const Taskbar = ({
  windows,
  activeWindowId,
  startMenuOpen,
  onToggleStartMenu,
  onWindowClick,
  onOpenApp,
  onMinimizeAll,
  canInstall,
  onInstall
}) => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);
  const [soundMuted, setSoundMuted] = useState(!sounds.enabled);
  const [calendarDate, setCalendarDate] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const updateTime = () => {
      const now = /* @__PURE__ */ new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
      );
      setDateStr(
        now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: "numeric" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1e3);
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
  const currentYear = calendarDate.getFullYear();
  const currentMonth = calendarDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showCalendar && /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "fixed bottom-9 right-1 z-[9999] bg-[#f0f0e8] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-2xl p-3 rounded text-xs font-sans select-none w-72",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#0058e6] text-white font-bold p-2 rounded-t mb-2 flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { children: dateStr }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-sm", children: timeStr })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-bold text-zinc-800 mb-2 px-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: prevMonth,
                className: "p-1 hover:bg-zinc-300 rounded cursor-pointer",
                title: "Previous Month",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx("span", { children: calendarDate.toLocaleString("default", { month: "long", year: "numeric" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: nextMonth,
                className: "p-1 hover:bg-zinc-300 rounded cursor-pointer",
                title: "Next Month",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-1 text-center font-mono text-[11px]", children: [
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => /* @__PURE__ */ jsx("span", { className: "font-bold text-zinc-500 py-0.5", children: d }, d)),
            Array.from({ length: firstDayIndex }, (_, i) => /* @__PURE__ */ jsx("span", { className: "p-1 text-zinc-300", children: "-" }, `blank-${i}`)),
            Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday = day === (/* @__PURE__ */ new Date()).getDate() && currentMonth === (/* @__PURE__ */ new Date()).getMonth() && currentYear === (/* @__PURE__ */ new Date()).getFullYear();
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: `p-1 rounded cursor-pointer ${isToday ? "bg-[#0058e6] text-white font-bold shadow-xs" : "hover:bg-zinc-200 text-zinc-800"}`,
                  children: day
                },
                day
              );
            })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-2 border-t border-zinc-300 flex justify-between items-center text-[10px] text-zinc-500", children: [
            /* @__PURE__ */ jsx("span", { children: "Timezone: Local System" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setCalendarDate(/* @__PURE__ */ new Date()),
                className: "text-blue-700 hover:underline font-semibold cursor-pointer",
                children: "Today"
              }
            )
          ] })
        ]
      }
    ),
    showNetwork && /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "fixed bottom-9 right-8 z-[9999] bg-[#f0f0e8] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-2xl p-3 rounded text-xs font-sans select-none w-64 space-y-2",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#0058e6] text-white font-bold p-1.5 rounded-t flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Wifi, { className: "w-3.5 h-3.5 text-emerald-300" }),
              /* @__PURE__ */ jsx("span", { children: "Local Area Connection" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-emerald-700 px-1.5 py-0.5 rounded text-white", children: "Connected" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 bg-white rounded border border-zinc-300 space-y-1 text-[11px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "Status:" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-zinc-900", children: "Connected" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "Speed:" }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-zinc-900", children: "1.0 Gbps (Fiber)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "IP Address:" }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-zinc-900", children: "10.240.18.92" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "Cloud Gateway:" }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-zinc-900", children: "Giritronics-Amex-VPN" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-zinc-600 flex items-center gap-1.5 bg-zinc-100 p-1.5 rounded border border-zinc-200", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Encrypted tunnel active with zero vulnerabilities." })
          ] })
        ]
      }
    ),
    showVolume && /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "fixed bottom-9 right-16 z-[9999] bg-[#f0f0e8] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-2xl p-3 rounded text-xs font-sans select-none flex flex-col items-center gap-2",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-zinc-700", children: "Volume" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: soundMuted ? 0 : volumeLevel,
              onChange: (e) => {
                setVolumeLevel(parseInt(e.target.value));
                if (soundMuted) setSoundMuted(false);
              },
              className: "h-28 accent-blue-600 cursor-pointer",
              style: { writingMode: "vertical-lr", direction: "rtl" }
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleMute,
              className: "px-2 py-1 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 rounded text-[11px] font-semibold cursor-pointer",
              children: soundMuted ? "Unmute" : "Mute"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 right-0 h-[30px] z-[9990] bg-gradient-to-b from-[#3d95ff] via-[#245edb] to-[#1552b9] border-t border-[#6da8ff] flex items-center justify-between select-none font-sans shadow-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center h-full", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onToggleStartMenu,
            className: `h-full px-3 rounded-r-lg flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${startMenuOpen ? "bg-gradient-to-b from-[#245d18] to-[#347d26] border-r-2 border-b-2 border-zinc-700" : "bg-gradient-to-b from-[#5aa344] via-[#3e8e2f] to-[#2d7023] hover:brightness-110 active:brightness-95 border-r border-[#75bd5e]"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-0.5 w-3.5 h-3.5 transform rotate-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#e53935] rounded-xs" }),
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#43a047] rounded-xs" }),
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#1e88e5] rounded-xs" }),
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#fdd835] rounded-xs" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-black italic text-white text-[13px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] tracking-wide", children: "start" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-1 px-2 border-r border-blue-400/60 h-5", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onMinimizeAll,
              className: "p-1 hover:bg-white/20 rounded cursor-pointer",
              title: "Show Desktop",
              children: /* @__PURE__ */ jsx(Monitor, { className: "w-3.5 h-3.5 text-blue-100" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onOpenApp("explorer"),
              className: "p-1 hover:bg-white/20 rounded cursor-pointer",
              title: "My Computer (File Explorer)",
              children: /* @__PURE__ */ jsx(HardDrive, { className: "w-3.5 h-3.5 text-blue-100" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onOpenApp("projects"),
              className: "p-1 hover:bg-white/20 rounded cursor-pointer",
              title: "Featured Projects Showcase",
              children: /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-yellow-200" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onOpenApp("ie"),
              className: "p-1 hover:bg-white/20 rounded cursor-pointer",
              title: "Internet Explorer",
              children: /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-blue-100" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onOpenApp("outlook"),
              className: "p-1 hover:bg-white/20 rounded cursor-pointer",
              title: "Outlook Express",
              children: /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-blue-100" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onOpenApp("mediaplayer"),
              className: "p-1 hover:bg-white/20 rounded cursor-pointer",
              title: "Windows Media Player",
              children: /* @__PURE__ */ jsx(Music, { className: "w-3.5 h-3.5 text-blue-100" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 px-1 overflow-x-auto max-w-[50vw]", children: windows.filter((w) => w.isOpen).map((win) => {
          const isActive = activeWindowId === win.id && !win.isMinimized;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                sounds.playClick();
                onWindowClick(win);
              },
              className: `h-6 px-2.5 max-w-[180px] truncate rounded-sm flex items-center gap-1.5 text-[11px] transition select-none cursor-pointer ${isActive ? "bg-[#1941a5] text-white border-t border-l border-[#0e276b] border-b border-r border-[#3b66d9] shadow-inner font-bold" : "bg-gradient-to-b from-[#3a83ee] to-[#2563eb] hover:bg-[#327bf0] text-blue-100 border border-[#5293f7]"}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs shrink-0", children: win.icon }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: win.title })
              ]
            },
            win.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-r from-[#0c59cc] to-[#0a48a8] border-l border-[#1b6eed] px-3 flex items-center gap-2.5 text-white", children: [
        canInstall && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onInstall,
            className: "hover:bg-white/10 p-0.5 rounded cursor-pointer",
            title: "Install XP Portfolio",
            children: /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5 text-yellow-200" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setShowVolume(!showVolume);
              setShowCalendar(false);
              setShowNetwork(false);
            },
            className: "hover:bg-white/10 p-0.5 rounded cursor-pointer",
            title: "Volume Control",
            children: soundMuted ? /* @__PURE__ */ jsx(VolumeX, { className: "w-3.5 h-3.5 text-red-300" }) : /* @__PURE__ */ jsx(Volume2, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setShowNetwork(!showNetwork);
              setShowCalendar(false);
              setShowVolume(false);
            },
            className: "hover:bg-white/10 p-0.5 rounded cursor-pointer",
            title: "Enterprise Network: Connected (Click for details)",
            children: /* @__PURE__ */ jsx(Wifi, { className: "w-3.5 h-3.5 text-emerald-300" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setShowCalendar(!showCalendar);
              setShowVolume(false);
              setShowNetwork(false);
            },
            className: "hover:bg-white/10 px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer font-sans text-xs font-semibold tracking-tight",
            title: "Click to view calendar",
            children: /* @__PURE__ */ jsx("span", { children: timeStr || "12:00 PM" })
          }
        )
      ] })
    ] })
  ] });
};
export {
  Taskbar
};
