import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X, Check, Monitor } from "lucide-react";
import { WALLPAPERS } from "../data/wallpapers";
import { sounds } from "../utils/audio";
const DisplayPropertiesModal = ({
  currentWallpaper,
  onSelectWallpaper,
  onClose
}) => {
  const [selected, setSelected] = useState(currentWallpaper);
  const [activeTab, setActiveTab] = useState("desktop");
  const handleApply = () => {
    sounds.playClick();
    onSelectWallpaper(selected);
  };
  const handleOk = () => {
    sounds.playClick();
    onSelectWallpaper(selected);
    onClose();
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9990] flex items-center justify-center bg-black/30 select-none", children: /* @__PURE__ */ jsxs("div", { className: "w-[430px] max-w-[95vw] bg-[#f0f0e8] border-[2px] border-[#0058e6] shadow-2xl flex flex-col font-sans text-xs", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#0058e6] via-[#2d8eff] to-[#0058e6] p-1.5 flex justify-between items-center text-white font-bold", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 pl-1", children: [
        /* @__PURE__ */ jsx(Monitor, { className: "w-3.5 h-3.5 text-sky-200" }),
        /* @__PURE__ */ jsx("span", { children: "Display Properties" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            onClose();
          },
          className: "w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded border border-red-700 shadow-sm",
          children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5 stroke-[3]" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1 border-b border-zinc-300 px-2 pt-2 bg-[#eaeae2] text-zinc-800", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            setActiveTab("desktop");
          },
          className: `px-3 py-1.5 rounded-t-md font-bold text-xs border-t border-l border-r ${activeTab === "desktop" ? "bg-[#f0f0e8] border-zinc-400 border-b-transparent -mb-[1px]" : "bg-[#dadad0] border-transparent hover:bg-zinc-200"}`,
          children: "Desktop"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            setActiveTab("appearance");
          },
          className: `px-3 py-1.5 rounded-t-md font-bold text-xs border-t border-l border-r ${activeTab === "appearance" ? "bg-[#f0f0e8] border-zinc-400 border-b-transparent -mb-[1px]" : "bg-[#dadad0] border-transparent hover:bg-zinc-200"}`,
          children: "Appearance"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            setActiveTab("settings");
          },
          className: `px-3 py-1.5 rounded-t-md font-bold text-xs border-t border-l border-r ${activeTab === "settings" ? "bg-[#f0f0e8] border-zinc-400 border-b-transparent -mb-[1px]" : "bg-[#dadad0] border-transparent hover:bg-zinc-200"}`,
          children: "Settings"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 flex-1 bg-[#f0f0e8] space-y-3", children: [
      activeTab === "desktop" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-48 h-36 bg-[#4a4f55] rounded-xl p-2.5 shadow-md flex flex-col items-center justify-between border-2 border-zinc-600", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-full h-24 rounded-md border-2 border-zinc-800 overflow-hidden shadow-inner flex items-center justify-center relative",
              style: {
                ...selected.style,
                backgroundSize: "cover",
                backgroundPosition: "center"
              },
              children: /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]", children: "NalluOS XP" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-12 h-2.5 bg-zinc-500 rounded-b-xs border border-zinc-700 -mb-1" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold text-zinc-700 mb-1", children: "Background:" }),
          /* @__PURE__ */ jsx("div", { className: "bg-white border border-zinc-400 rounded p-1 max-h-32 overflow-y-auto space-y-0.5", children: WALLPAPERS.map((wp) => {
            const isPicked = selected.id === wp.id;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  sounds.playClick();
                  setSelected(wp);
                },
                className: `w-full text-left px-2 py-1 rounded flex items-center justify-between cursor-pointer ${isPicked ? "bg-[#0a246a] text-white font-bold" : "hover:bg-zinc-100 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-4 h-3 rounded-xs border border-zinc-400 shrink-0",
                        style: { background: wp.thumbnailGradient }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "truncate", children: wp.name })
                  ] }),
                  isPicked && /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" })
                ]
              },
              wp.id
            );
          }) })
        ] })
      ] }),
      activeTab === "appearance" && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-zinc-600", children: "Choose the style for windows, buttons, and menus:" }),
        /* @__PURE__ */ jsxs("div", { className: "border border-zinc-300 bg-white p-3 rounded space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "font-bold text-zinc-700", children: "Windows and buttons:" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 p-1.5 bg-zinc-100 border border-zinc-300 rounded font-bold text-blue-900", children: "Windows XP style (Luna)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "font-bold text-zinc-700", children: "Color scheme:" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 p-1.5 bg-zinc-100 border border-zinc-300 rounded font-semibold text-zinc-800", children: "Default (Blue)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "font-bold text-zinc-700", children: "Font size:" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 p-1.5 bg-zinc-100 border border-zinc-300 rounded font-semibold text-zinc-800", children: "Normal (Tahoma 11pt)" })
          ] })
        ] })
      ] }),
      activeTab === "settings" && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs("div", { className: "border border-zinc-300 bg-white p-3 rounded", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-zinc-800 mb-2", children: "Display Mode" }),
        /* @__PURE__ */ jsx("p", { className: "text-zinc-600 leading-relaxed", children: "Screen resolution is auto-adaptive to your viewport. Supports 4K, retina desktop monitors, tablet landscape, and responsive mobile displays." }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-[10px] text-zinc-500 font-mono", children: "Color Quality: Highest (32 bit) \u2022 Refresh Rate: 60Hz - 144Hz" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#eaeae2] p-2.5 border-t border-zinc-300 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleOk,
          className: "px-4 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800",
          children: "OK"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            onClose();
          },
          className: "px-4 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleApply,
          className: "px-4 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800",
          children: "Apply"
        }
      )
    ] })
  ] }) });
};
export {
  DisplayPropertiesModal
};
