import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { sounds } from "../utils/audio";
const ClippyAssistant = ({ onOpenApp, onOpenProperties }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTip, setCurrentTip] = useState(
    "Hi there! I'm Clippy, your Windows XP guide. It looks like you're exploring Nallukumar's portfolio. How can I help you today?"
  );
  const tips = [
    {
      label: "View Real GitHub & Repositories",
      action: () => {
        sounds.playClick();
        window.open("https://github.com/NallukumarRavichandran", "_blank", "noopener,noreferrer");
        setCurrentTip("I opened Nallukumar's real GitHub profile in a new tab! You can explore the Generative AI Tutor, Mind Buddy, You-Clone, and Hash-Forge repositories.");
      }
    },
    {
      label: "Explore Drives & Documents (My Computer)",
      action: () => {
        sounds.playClick();
        onOpenApp("explorer");
        setCurrentTip("I opened File Explorer! You can explore Local Disk (C:), Cloud Drive (D:), Projects, Skills, and academic records.");
      }
    },
    {
      label: "Browse Featured Projects Showcase",
      action: () => {
        sounds.playClick();
        onOpenApp("projects");
        setCurrentTip("I opened the Featured Projects showcase! Discover AI Tutor, Mind Buddy, You-Clone, and Hash-Forge with live demo links.");
      }
    },
    {
      label: "View Real LinkedIn Profile",
      action: () => {
        sounds.playClick();
        window.open("https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true", "_blank", "noopener,noreferrer");
        setCurrentTip("I opened Nallukumar's verified LinkedIn profile in a new tab! Feel free to connect or send a message.");
      }
    },
    {
      label: "Test Generative AI Tutor (RAG)",
      action: () => {
        sounds.playClick();
        onOpenApp("ie");
        setCurrentTip("I opened Internet Explorer! Check out the Generative AI Tutor tab to test vector retrieval with ChromaDB and strict zero-hallucination guardrails.");
      }
    },
    {
      label: "Explore Giritronics & Amex Experience",
      action: () => {
        sounds.playClick();
        onOpenApp("ie");
        setCurrentTip("I opened the Cloud & DevOps Simulator in Internet Explorer for you! Check out the microservice request flow and security scans.");
      }
    },
    {
      label: "View Developer Resume in Notepad",
      action: () => {
        sounds.playClick();
        onOpenApp("notepad");
        setCurrentTip("I opened Nallukumar's complete updated resume in Notepad. You can also export it as a .txt file!");
      }
    },
    {
      label: "Listen to Lo-Fi Coding Beats",
      action: () => {
        sounds.playClick();
        onOpenApp("mediaplayer");
        setCurrentTip("Windows Media Player 9 is now playing! Enjoy the retro audio synthesizer and canvas visualizer.");
      }
    },
    {
      label: "Send Direct Email to Nallu",
      action: () => {
        sounds.playClick();
        onOpenApp("outlook");
        setCurrentTip("Outlook Express is ready for your message to kumar10naidu@gmail.com (+91 6369614270)!");
      }
    },
    {
      label: "Change Desktop Wallpaper",
      action: () => {
        sounds.playClick();
        onOpenProperties();
        setCurrentTip("Pick from Bliss, Royale Energy Blue, Autumn Sun, or Luna Silver in Display Properties!");
      }
    }
  ];
  if (!isOpen) {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          sounds.playClick();
          setIsOpen(true);
        },
        className: "fixed bottom-10 right-4 z-[9900] bg-[#ffffd0] hover:bg-yellow-100 border-2 border-zinc-700 rounded-full p-2 shadow-lg flex items-center gap-1.5 text-xs font-bold text-zinc-900 cursor-pointer animate-bounce",
        title: "Ask Clippy",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", children: "\u{1F4CE}" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] pr-1", children: "Need help?" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-10 right-4 z-[9900] flex flex-col items-end max-w-xs font-sans select-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[#ffffcc] border-2 border-zinc-800 rounded-lg p-3 shadow-2xl relative mb-2 text-xs text-zinc-900 leading-relaxed border-b-3 border-r-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            setIsOpen(false);
          },
          className: "absolute top-1.5 right-1.5 text-zinc-600 hover:text-black",
          title: "Dismiss Clippy",
          children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "font-medium pr-4 mb-2.5", children: currentTip }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1 pt-1 border-t border-yellow-300", children: tips.map((t, idx) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: t.action,
          className: "w-full text-left px-2 py-1 bg-yellow-50 hover:bg-yellow-200/80 rounded flex items-center justify-between text-[11px] font-semibold text-blue-900 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "\u2022 ",
              t.label
            ] }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 text-blue-700" })
          ]
        },
        idx
      )) }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#ffffcc]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 pr-6 cursor-pointer", onClick: () => sounds.playClick(), children: /* @__PURE__ */ jsx("div", { className: "w-12 h-14 relative flex items-center justify-center filter drop-shadow-md hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 120", className: "w-full h-full", children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M 35 110 L 35 35 A 20 20 0 0 1 75 35 L 75 90 A 15 15 0 0 1 45 90 L 45 45 A 10 10 0 0 1 65 45 L 65 85",
          fill: "none",
          stroke: "#718096",
          strokeWidth: "9",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M 35 110 L 35 35 A 20 20 0 0 1 75 35 L 75 90 A 15 15 0 0 1 45 90 L 45 45 A 10 10 0 0 1 65 45 L 65 85",
          fill: "none",
          stroke: "#cbd5e0",
          strokeWidth: "5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx("circle", { cx: "50", cy: "40", r: "8", fill: "white", stroke: "#2d3748", strokeWidth: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "52", cy: "40", r: "4", fill: "black" }),
      /* @__PURE__ */ jsx("circle", { cx: "68", cy: "40", r: "8", fill: "white", stroke: "#2d3748", strokeWidth: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "70", cy: "40", r: "4", fill: "black" }),
      /* @__PURE__ */ jsx("path", { d: "M 44 30 Q 50 25 56 30", fill: "none", stroke: "#1a202c", strokeWidth: "2", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M 62 30 Q 68 25 74 30", fill: "none", stroke: "#1a202c", strokeWidth: "2", strokeLinecap: "round" })
    ] }) }) })
  ] });
};
export {
  ClippyAssistant
};
