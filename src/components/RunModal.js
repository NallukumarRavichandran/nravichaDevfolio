import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { sounds } from "../utils/audio";
const RunModal = ({ onClose, onOpenApp }) => {
  const [command, setCommand] = useState("explorer");
  const [errorMsg, setErrorMsg] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;
    sounds.playClick();
    switch (cmd) {
      case "explorer":
      case "mycomputer":
      case "thispc":
      case "files":
        onOpenApp("explorer");
        onClose();
        break;
      case "projects":
      case "portfolio":
        onOpenApp("projects");
        onClose();
        break;
      case "cmd":
      case "terminal":
      case "command":
        onOpenApp("cmd");
        onClose();
        break;
      case "calc":
      case "calculator":
        onOpenApp("calculator");
        onClose();
        break;
      case "notepad":
      case "resume":
      case "notes":
        onOpenApp("notepad");
        onClose();
        break;
      case "mspaint":
      case "paint":
      case "draw":
        onOpenApp("paint");
        onClose();
        break;
      case "ie":
      case "iexplore":
      case "chrome":
      case "browser":
      case "web":
        onOpenApp("ie");
        onClose();
        break;
      case "outlook":
      case "mail":
      case "email":
        onOpenApp("outlook");
        onClose();
        break;
      case "wmplayer":
      case "music":
      case "player":
        onOpenApp("mediaplayer");
        onClose();
        break;
      case "control":
      case "controlpanel":
      case "settings":
        onOpenApp("control");
        onClose();
        break;
      case "minesweeper":
      case "winmine":
      case "game":
        onOpenApp("minesweeper");
        onClose();
        break;
      case "github":
        window.open("https://github.com/NallukumarRavichandran", "_blank", "noopener,noreferrer");
        onClose();
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true", "_blank", "noopener,noreferrer");
        onClose();
        break;
      default:
        if (cmd.startsWith("http://") || cmd.startsWith("https://") || cmd.startsWith("www.") || cmd.includes(".org") || cmd.includes(".com") || cmd.includes(".io") || cmd.includes(".net") || cmd.includes(".edu") || cmd.includes(".gov")) {
          const url = cmd.startsWith("http://") || cmd.startsWith("https://") ? cmd : `https://${cmd}`;
          onOpenApp("ie", url);
          onClose();
        } else {
          setErrorMsg(`Windows cannot find '${command}'. Make sure you typed the name correctly, and then try again.`);
          sounds.playError();
        }
        break;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: (e) => e.stopPropagation(),
      className: "bg-[#ece9d8] border-2 border-[#0058e6] rounded shadow-2xl w-full max-w-sm flex flex-col font-sans select-none overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#0058e6] to-[#2b79f7] text-white px-2 py-1 font-bold text-xs flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { children: "\u{1F3C3}" }),
            /* @__PURE__ */ jsx("span", { children: "Run" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "w-4 h-4 bg-[#e81123] hover:bg-[#f1707a] text-white rounded text-[10px] flex items-center justify-center font-bold",
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-3 text-xs space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "\u{1F3C3}" }),
            /* @__PURE__ */ jsx("div", { className: "text-zinc-800 leading-snug", children: "Type the name of a program, folder, document, or Internet resource, and Windows will open it for you." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "font-semibold text-zinc-700 w-12 text-right", children: "Open:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: command,
                onChange: (e) => {
                  setCommand(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                },
                autoFocus: true,
                className: "flex-1 bg-white border border-zinc-500 rounded-xs px-2 py-1 text-xs outline-hidden shadow-inner"
              }
            )
          ] }),
          errorMsg && /* @__PURE__ */ jsx("div", { className: "p-2 bg-red-50 border border-red-300 text-red-700 rounded text-[11px] leading-snug", children: errorMsg }),
          /* @__PURE__ */ jsxs("div", { className: "bg-zinc-100 p-2 rounded border border-zinc-200 text-[10px] text-zinc-600 space-y-0.5", children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-zinc-700", children: "Quick suggestions:" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: ["explorer", "projects", "cmd", "calc", "notepad", "ie", "paint", "outlook", "music", "control", "github", "linkedin"].map((c) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setCommand(c),
                className: "px-1.5 py-0.5 bg-white border border-zinc-300 hover:bg-blue-50 hover:border-blue-400 rounded text-[10px] font-mono cursor-pointer",
                children: c
              },
              c
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 pt-2 border-t border-zinc-300", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "px-4 py-1 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 active:border-zinc-600 rounded font-semibold text-xs cursor-pointer shadow-xs",
                children: "OK"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "px-4 py-1 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 active:border-zinc-600 rounded font-semibold text-xs cursor-pointer shadow-xs",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
};
export {
  RunModal
};
