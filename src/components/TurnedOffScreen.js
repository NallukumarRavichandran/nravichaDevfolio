import { jsx, jsxs } from "react/jsx-runtime";
import { sounds } from "../utils/audio";
const TurnedOffScreen = ({ onPowerOn }) => {
  const handleTurnOn = () => {
    sounds.playStartup();
    onPowerOn();
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[10001] bg-black text-amber-500 font-sans flex flex-col items-center justify-center p-8 select-none text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "text-4xl filter drop-shadow-md", children: "\u{1F4BB}" }),
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-amber-400 tracking-wide font-mono", children: "It is now safe to turn off your computer." }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-500 font-mono", children: "All services and background workers have safely unmounted." }),
    /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleTurnOn,
        className: "px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-full shadow-lg flex items-center gap-2 mx-auto cursor-pointer active:scale-95 transition-all",
        children: [
          /* @__PURE__ */ jsx("span", { children: "\u23FB" }),
          /* @__PURE__ */ jsx("span", { children: "Power On System" })
        ]
      }
    ) })
  ] }) });
};
export {
  TurnedOffScreen
};
