import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ShieldCheck, Cpu, Volume2, Award, Sliders } from "lucide-react";
import { sounds } from "../../utils/audio";
const ControlPanelApp = () => {
  const [activeView, setActiveView] = useState("category");
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);
  const skills = [
    { name: "Java (OOP, Multithreading, Streams, JVM)", level: 95, color: "bg-red-500" },
    { name: "Spring Boot, Microservices & Hibernate ORM", level: 93, color: "bg-emerald-500" },
    { name: "SQL, PostgreSQL & MySQL Workbench", level: 90, color: "bg-blue-500" },
    { name: "LeetCode & Algorithmic Problem Solving", level: 92, color: "bg-amber-500" },
    { name: "C# & ASP .NET / Windows Systems", level: 86, color: "bg-purple-500" },
    { name: "React, Node.js, HTML & Bootstrap", level: 89, color: "bg-cyan-500" },
    { name: "AI & Tools: Hugging Face, Ollama, Antigravity, Postman, JMeter", level: 88, color: "bg-indigo-500" },
    { name: "CI/CD Pipelines, Git, Docker & Release Triage", level: 91, color: "bg-teal-500" }
  ];
  const toggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sounds.playStartup();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-h-0 bg-[#f0f0e8] text-xs font-sans select-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[#eaeae2] border-b border-zinc-300 px-3 py-1.5 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-bold text-zinc-800", children: [
        /* @__PURE__ */ jsx(Sliders, { className: "w-4 h-4 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { children: "Control Panel" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setActiveView("category");
            },
            className: `px-2.5 py-0.5 rounded border ${activeView === "category" ? "bg-white border-zinc-400 font-bold text-blue-900" : "hover:bg-zinc-200"}`,
            children: "Skills & Security"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setActiveView("specs");
            },
            className: `px-2.5 py-0.5 rounded border ${activeView === "specs" ? "bg-white border-zinc-400 font-bold text-blue-900" : "hover:bg-zinc-200"}`,
            children: "System Specifications"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4", children: activeView === "category" ? /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 border border-emerald-300 rounded-lg p-3 flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "w-8 h-8 text-emerald-600 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-emerald-950 text-sm", children: "Enterprise Security Status: OPTIMAL" }),
          /* @__PURE__ */ jsx("p", { className: "text-zinc-600 text-xs mt-0.5", children: "American Express Cloud & Infrastructure release compliance verified. Zero critical vulnerabilities detected." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-4 text-[11px] text-emerald-800 font-semibold", children: [
            /* @__PURE__ */ jsx("span", { children: "\u2713 SonarQube Code Gate Passed" }),
            /* @__PURE__ */ jsx("span", { children: "\u2713 OWASP Top 10 Sanitized" }),
            /* @__PURE__ */ jsx("span", { children: "\u2713 ACID Transaction Integrity" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-zinc-300 rounded-lg p-4 shadow-xs", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-zinc-900 text-sm mb-3 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Award, { className: "w-4 h-4 text-amber-500" }),
          "Technical Competencies & Mastery Index"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: skills.map((s) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs font-semibold text-zinc-700 mb-1", children: [
            /* @__PURE__ */ jsx("span", { children: s.name }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-zinc-500", children: [
              s.level,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-3 bg-zinc-200 rounded-full overflow-hidden border border-zinc-300", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `h-full ${s.color} transition-all duration-500 rounded-full`,
              style: { width: `${s.level}%` }
            }
          ) })
        ] }, s.name)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-zinc-300 rounded-lg p-4 shadow-xs flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Volume2, { className: "w-6 h-6 text-sky-600" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-zinc-800", children: "Windows XP Procedural Audio Engine" }),
            /* @__PURE__ */ jsx("div", { className: "text-zinc-500 text-[11px]", children: "Web Audio API real-time synthesis of startup chimes, clicks, chords, and media" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleSound,
            className: `px-3 py-1.5 rounded font-bold text-xs border shadow-xs cursor-pointer ${soundEnabled ? "bg-emerald-600 text-white border-emerald-700" : "bg-zinc-200 text-zinc-600 border-zinc-400"}`,
            children: soundEnabled ? "Sound Enabled \u2713" : "Sound Muted"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white border border-zinc-300 rounded-lg p-5 max-w-xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 border-b pb-3", children: [
        /* @__PURE__ */ jsx(Cpu, { className: "w-8 h-8 text-blue-600" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-zinc-900", children: "NalluOS Professional (SP3)" }),
          /* @__PURE__ */ jsx("p", { className: "text-zinc-500 text-xs", children: "Based on Windows XP Home & Professional Architecture" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-zinc-500 block text-[10px] uppercase", children: "Registered To:" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-900 font-bold", children: "Nallukumar Ravichandran" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-600 block text-[11px]", children: "Software Developer Engineer @ Giritronics" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-500 block text-[10px]", children: "Ex-American Express (Cloud & Infrastructure)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-zinc-500 block text-[10px] uppercase", children: "Computer Name:" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-zinc-900 font-bold", children: "NALLU-DEV-STATION" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-600 block text-[11px]", children: "Workgroup: ENTERPRISE_JAVA" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t pt-3 space-y-2", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-zinc-800", children: "System Hardware Specifications:" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-zinc-600", children: [
          /* @__PURE__ */ jsx("li", { children: "\u2022 Processor: High-Throughput Java 21 LTS JVM Core Engine" }),
          /* @__PURE__ */ jsx("li", { children: "\u2022 Memory: 64-bit Non-Blocking Heap with G1 Garbage Collector" }),
          /* @__PURE__ */ jsx("li", { children: "\u2022 Storage: Enterprise PostgreSQL Cluster with ACID Replication" }),
          /* @__PURE__ */ jsx("li", { children: "\u2022 Audio: Web Audio API Procedural Synthesizer (0 External Dependencies)" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  ControlPanelApp
};
