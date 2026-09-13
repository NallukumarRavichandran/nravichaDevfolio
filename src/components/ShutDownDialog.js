import { jsx, jsxs } from "react/jsx-runtime";
const ShutDownDialog = ({
  onClose,
  onTurnOff,
  onRestart,
  onLock
}) => {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: (e) => e.stopPropagation(),
      className: "bg-[#003399] border-2 border-white rounded-t-xl rounded-b-md shadow-2xl w-full max-w-sm flex flex-col font-sans select-none overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#0058e6] via-[#2b79f7] to-[#0058e6] text-white px-3 py-2 font-bold text-sm flex items-center justify-between border-b border-blue-300", children: [
          /* @__PURE__ */ jsx("span", { children: "Shut Down Windows" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-0.5 w-3 h-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#e53935]" }),
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#43a047]" }),
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#1e88e5]" }),
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#fdd835]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#003399] p-6 flex items-center justify-around text-white", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onLock,
              className: "flex flex-col items-center gap-2 group cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-[#cc9900] hover:bg-[#e6ac00] border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsx("span", { className: "text-xl", children: "\u{1F319}" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", children: "Stand By / Lock" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onTurnOff,
              className: "flex flex-col items-center gap-2 group cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-[#cc0000] hover:bg-[#e60000] border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsx("span", { className: "text-xl", children: "\u23FB" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", children: "Turn Off" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onRestart,
              className: "flex flex-col items-center gap-2 group cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-[#009933] hover:bg-[#00b33c] border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsx("span", { className: "text-xl", children: "\u{1F504}" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", children: "Restart" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#002266] px-4 py-2 flex justify-end border-t border-blue-900", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "px-4 py-1 bg-white hover:bg-zinc-100 text-zinc-900 rounded font-semibold text-xs cursor-pointer shadow-xs",
            children: "Cancel"
          }
        ) })
      ]
    }
  ) });
};
export {
  ShutDownDialog
};
