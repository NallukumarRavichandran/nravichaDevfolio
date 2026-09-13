import { jsx, jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { Minus, Square, Copy, X } from "lucide-react";
import { sounds } from "../utils/audio";
import { XP } from "../constants";
const WindowFrame = ({
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
  const handleMouseDown = (e) => {
    if (win.isMaximized) return;
    onFocus();
    dragOffset.current = {
      x: e.clientX - win.x,
      y: e.clientY - win.y
    };
    const handleMouseMove = (ev) => {
      const newX = Math.max(0, Math.min(window.innerWidth - 100, ev.clientX - dragOffset.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, ev.clientY - dragOffset.current.y));
      onUpdatePosition(newX, newY);
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    onFocus();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = win.width;
    const startH = win.height;
    const handleMouseMove = (ev) => {
      const nextW = Math.max(320, startW + (ev.clientX - startX));
      const nextH = Math.max(220, startH + (ev.clientY - startY));
      onUpdateSize(nextW, nextH);
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  if (!win.isOpen || win.isMinimized) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseDown: onFocus,
      className: `xp-window fixed flex flex-col rounded-t-md overflow-hidden transition-all ${win.isMaximized ? "top-0 left-0 w-full h-[calc(100vh-30px)] rounded-none" : ""} ${isActive ? "border-[2px] border-[#0058e6]" : "border-[2px] border-[#6b82a3]"}`,
      style: win.isMaximized ? { zIndex: win.zIndex } : {
        left: `${win.x}px`,
        top: `${win.y}px`,
        width: `${win.width}px`,
        height: `${win.height}px`,
        zIndex: win.zIndex
      },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            onMouseDown: handleMouseDown,
            onDoubleClick: () => {
              sounds.playClick();
              onToggleMaximize();
            },
            className: `h-6 px-1.5 flex items-center justify-between select-none cursor-grab active:cursor-grabbing ${isActive ? "xp-titlebar-active" : "xp-titlebar-inactive"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-bold text-xs text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] truncate", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: win.icon }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: win.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0 ml-2", onMouseDown: (e) => e.stopPropagation(), children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      sounds.playClick();
                      onMinimize();
                    },
                    className: "w-5 h-5 bg-[#0058e6] hover:bg-[#1a6cf0] border border-t-[#5999ff] border-l-[#5999ff] border-b-[#00348a] border-r-[#00348a] rounded-xs flex items-center justify-center text-white shadow-xs",
                    title: "Minimize",
                    children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3 stroke-[3]" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      sounds.playClick();
                      onToggleMaximize();
                    },
                    className: "w-5 h-5 bg-[#0058e6] hover:bg-[#1a6cf0] border border-t-[#5999ff] border-l-[#5999ff] border-b-[#00348a] border-r-[#00348a] rounded-xs flex items-center justify-center text-white shadow-xs",
                    title: win.isMaximized ? "Restore Down" : "Maximize",
                    children: win.isMaximized ? /* @__PURE__ */ jsx(Copy, { className: "w-2.5 h-2.5 stroke-[2.5]" }) : /* @__PURE__ */ jsx(Square, { className: "w-2.5 h-2.5 stroke-[2.5]" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      sounds.playClick();
                      onClose();
                    },
                    className: "w-5 h-5 bg-[#d93426] hover:bg-[#f04335] border border-t-[#ff7a6e] border-l-[#ff7a6e] border-b-[#8f190e] border-r-[#8f190e] rounded-xs flex items-center justify-center text-white shadow-xs ml-0.5",
                    title: "Close",
                    children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5 stroke-[3]" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex-1 flex flex-col min-h-0 overflow-hidden relative",
            style: { backgroundColor: XP.windowSurface },
            children: [
              children,
              !win.isMaximized && /* @__PURE__ */ jsx(
                "div",
                {
                  onMouseDown: handleResizeMouseDown,
                  className: "absolute bottom-0 right-0 w-3.5 h-3.5 cursor-se-resize flex items-end justify-end p-0.5 z-50 opacity-40 hover:opacity-100",
                  title: "Resize",
                  children: /* @__PURE__ */ jsx("svg", { width: "8", height: "8", viewBox: "0 0 8 8", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M7 1L1 7M7 4L4 7M7 7", stroke: "#4a5568", strokeWidth: "1.5", strokeLinecap: "round" }) })
                }
              )
            ]
          }
        )
      ]
    }
  );
};
export {
  WindowFrame
};
