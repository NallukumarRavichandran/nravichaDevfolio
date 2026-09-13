import { jsx, jsxs } from "react/jsx-runtime";
import { RefreshCw, LayoutGrid, Image, Trash2, FileText, ShieldCheck, HardDrive, Sparkles } from "lucide-react";
import { sounds } from "../utils/audio";
const DesktopContextMenu = ({
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
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 320);
  const handleClick = (action) => {
    sounds.playClick();
    action();
    onClose();
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: (e) => e.stopPropagation(),
      className: "fixed z-[9999] w-52 bg-[#f5f5f0] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 shadow-xl rounded-xs py-1 text-xs text-zinc-900 select-none font-sans",
      style: { left: `${adjustedX}px`, top: `${adjustedY}px` },
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(onRefresh),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5 text-zinc-600" }),
              /* @__PURE__ */ jsx("span", { children: "Refresh Desktop" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-zinc-300 my-1 mx-1" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(() => onOpenApp("explorer")),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(HardDrive, { className: "w-3.5 h-3.5 text-blue-600" }),
              /* @__PURE__ */ jsx("span", { children: "Open File Explorer" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(() => onOpenApp("projects")),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }),
              /* @__PURE__ */ jsx("span", { children: "Featured Projects" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(onNewNote),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-blue-600" }),
              /* @__PURE__ */ jsx("span", { children: "New Text Document (Resume)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(() => onOpenApp("paint")),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(LayoutGrid, { className: "w-3.5 h-3.5 text-purple-600" }),
              /* @__PURE__ */ jsx("span", { children: "Open Paint.exe" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(onEmptyRecycle),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5 text-cyan-700" }),
              /* @__PURE__ */ jsx("span", { children: "Empty Recycle Bin" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-zinc-300 my-1 mx-1" }),
        onOpenRun && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(onOpenRun),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "\u{1F3C3}" }),
              /* @__PURE__ */ jsx("span", { children: "Run Command..." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(() => onOpenApp("control")),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600" }),
              /* @__PURE__ */ jsx("span", { children: "Security & Skills" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleClick(onOpenProperties),
            className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 font-bold cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(Image, { className: "w-3.5 h-3.5 text-sky-600" }),
              /* @__PURE__ */ jsx("span", { children: "Properties" })
            ]
          }
        )
      ]
    }
  );
};
export {
  DesktopContextMenu
};
