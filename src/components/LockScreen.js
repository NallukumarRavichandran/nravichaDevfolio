import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { sounds } from "../utils/audio";
const LockScreen = ({ onUnlock, onTurnOff }) => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = /* @__PURE__ */ new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }));
      setDateStr(now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1e3);
    return () => clearInterval(interval);
  }, []);
  const handleUnlock = (e) => {
    if (e) e.preventDefault();
    sounds.playStartup();
    onUnlock();
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[10000] bg-gradient-to-b from-[#5a7edc] via-[#245edb] to-[#1f4fae] flex flex-col justify-between p-6 select-none font-sans text-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-blue-400/40 pb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-0.5 w-5 h-5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#e53935] rounded-xs" }),
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#43a047] rounded-xs" }),
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#1e88e5] rounded-xs" }),
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#fdd835] rounded-xs" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-lg tracking-wide", children: [
          "Microsoft Windows ",
          /* @__PURE__ */ jsx("span", { className: "text-amber-400 font-extrabold italic", children: "XP" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold font-mono", children: timeStr }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-blue-200", children: dateStr })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center max-w-md mx-auto w-full bg-[#3265c5] border-y-2 border-[#8ca8ed] p-6 shadow-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-[#dbe8f7] border-2 border-white flex items-center justify-center text-[#245edb] text-3xl font-bold mb-3 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#7890ad]", children: "NR" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]", children: "Nallukumar Ravichandran" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-200 mb-4 text-center", children: "Software Developer Engineer @ Giritronics \u2022 Ex-American Express" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleUnlock, className: "w-full space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              placeholder: "Enter password (or leave blank)...",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "flex-1 bg-white text-zinc-900 px-3 py-1.5 text-xs outline-hidden shadow-inner font-mono"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-4 py-1.5 bg-[#4c8435] hover:bg-[#5e9c42] text-white font-bold text-xs cursor-pointer shadow-md active:scale-95 transition",
              children: "Log On \u2794"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => handleUnlock(),
            className: "w-full text-center text-xs text-blue-200 hover:text-white hover:underline cursor-pointer pt-1",
            children: "Click here to unlock session instantly"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-t border-blue-400/40 pt-4 text-xs", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onTurnOff,
          className: "flex items-center gap-1.5 text-red-200 hover:text-white cursor-pointer px-3 py-1 rounded bg-white/10 hover:bg-red-600/60 transition",
          children: [
            /* @__PURE__ */ jsx("span", { children: "\u23FB" }),
            /* @__PURE__ */ jsx("span", { children: "Turn off computer" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "text-blue-200 text-[11px]", children: "Enterprise Java & Cloud Architecture Portfolio \u2022 Press Enter to log on" })
    ] })
  ] });
};
export {
  LockScreen
};
