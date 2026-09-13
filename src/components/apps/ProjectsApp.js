import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import {
  ExternalLink,
  Code2,
  CheckCircle,
  Play,
  Search
} from "lucide-react";
import { sounds } from "../../utils/audio";
const PROJECTS = [
  {
    id: "ai-tutor",
    title: "Generative AI Tutor & Adaptive Learning Platform",
    subtitle: "Intelligent 1-on-1 AI Tutoring System with RAG Pipeline & ChromaDB",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    icon: "\u{1F916}",
    status: "Production Ready",
    description: "An intelligent 1-on-1 AI tutoring system engineered to make quality education personalized and accessible through Retrieval-Augmented Generation (RAG) and zero-hallucination guardrails.",
    highlights: [
      "Built a Retrieval-Augmented Generation (RAG) pipeline with ChromaDB vector storage and semantic chunking.",
      "Enforced strict zero-hallucination guardrails and source attribution to guarantee factual responses.",
      "Developed adaptive learning paths that adjust question difficulty in real time based on learner mastery.",
      "Configured local LLM execution via Ollama and Hugging Face embeddings for high-throughput privacy-first inference."
    ],
    techStack: ["Python", "FastAPI", "ChromaDB", "Hugging Face", "Ollama", "React", "Vite", "Tailwind CSS"],
    githubUrl: "https://github.com/NallukumarRavichandran",
    demoAppId: "ie",
    metrics: [
      { label: "Retrieval Latency", value: "< 240ms" },
      { label: "Factual Accuracy", value: "99.4%" },
      { label: "Chunk Overlap", value: "15% Cosine" }
    ]
  },
  {
    id: "mind-buddy",
    title: "Mind Buddy - CBT Mental Health & Thought Reframer",
    subtitle: "Cognitive Behavioral Therapy Mood Logging & Distortion Reframing Web App",
    category: "fullstack",
    categoryLabel: "Healthcare & Full Stack",
    icon: "\u{1F9E0}",
    status: "Production Ready",
    description: "A single-page React web application designed to help users identify and reframe cognitive distortions through clinically grounded Cognitive Behavioral Therapy techniques.",
    highlights: [
      "Guided Cognitive Behavioral Therapy (CBT) logging interface with intuitive step-by-step prompts.",
      "Interactive mood tracking with localized data persistence across user sessions.",
      "Clean, accessible, responsive design with soothing color palettes and WCAG AA contrast compliance.",
      "Integrated real-time distortion categorizer (All-or-Nothing, Catastrophizing, Overgeneralization)."
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Web Storage API", "Heroicons", "Vite"],
    githubUrl: "https://github.com/NallukumarRavichandran",
    demoAppId: "ie",
    metrics: [
      { label: "Persistence", value: "Local State" },
      { label: "Lighthouse Score", value: "98/100" },
      { label: "Distortion Models", value: "8 Types" }
    ]
  },
  {
    id: "you-clone",
    title: "You-Clone - Interactive Video Streaming Platform",
    subtitle: "High-Fidelity Frontend YouTube UI Clone with Real-Time Interactivity",
    category: "frontend",
    categoryLabel: "Frontend Engineering",
    icon: "\u{1F4FA}",
    status: "Open Source",
    description: "A responsive video streaming interface mimicking the YouTube viewing experience with interactive comments, real-time like counters, and seamless drawer navigation.",
    highlights: [
      "Dynamic video recommendation feed with responsive thumbnail grid and playback previews.",
      "Interactive commenting system allowing users to post comments, upvote, and delete in real time.",
      "Accessible navigation bar, collapsible sidebar drawer, and dynamic category chip filtering.",
      "Mobile-first layout adapting smoothly from handheld devices to ultra-wide displays."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Vite"],
    githubUrl: "https://github.com/NallukumarRavichandran",
    demoAppId: "ie",
    metrics: [
      { label: "Responsiveness", value: "100% Fluid" },
      { label: "Interactions", value: "Comments & Likes" },
      { label: "Architecture", value: "Component-Based" }
    ]
  },
  {
    id: "hash-forge",
    title: "Hash-Forge - Enterprise Cryptographic Key & Password Generator",
    subtitle: "High-Entropy Randomized String Synthesizer & Cryptographic Digest Inspector",
    category: "security",
    categoryLabel: "Security & Cryptography",
    icon: "\u{1F510}",
    status: "Production Ready",
    description: "A simple, secure, and stylish credential generator with real-time cryptographic hash digests (SHA-256, SHA-512, MD5) and password strength scoring.",
    highlights: [
      "High-entropy randomized string synthesizer with custom symbol, digit, uppercase, and lowercase toggles.",
      "Real-time cryptographic hashing using the browser-native Web Crypto API (SHA-256 & SHA-512).",
      "Instant one-click clipboard copy, entropy bit calculation, and crack-time estimations.",
      "Strict zero-network exfiltration guarantee: all secrets are generated entirely in-memory."
    ],
    techStack: ["JavaScript", "Web Crypto API", "React", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/NallukumarRavichandran",
    demoAppId: "ie",
    metrics: [
      { label: "Max Entropy", value: "128 bits" },
      { label: "Hash Algorithms", value: "SHA-256 / 512" },
      { label: "Zero Leak", value: "100% In-Memory" }
    ]
  }
];
const ProjectsApp = ({ onOpenApp }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectId, setActiveProjectId] = useState("ai-tutor");
  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || proj.description.toLowerCase().includes(searchQuery.toLowerCase()) || proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];
  const handleLaunchDemo = (appId) => {
    sounds.playClick();
    onOpenApp(appId);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-[#f0f2f5] text-zinc-900 font-sans select-none overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#0058e6] via-[#1b6eed] to-[#0058e6] text-white p-3 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center text-xl shadow-inner", children: "\u{1F680}" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "font-bold text-sm leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]", children: "Featured Software Engineering Projects" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-blue-100", children: "Developed by Nallukumar Ravichandran | Java Full Stack \u2022 Cloud & AI Systems" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative flex-1 sm:w-48", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5 absolute left-2 top-2 text-zinc-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search projects...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full pl-7 pr-2 py-1 bg-white/10 hover:bg-white/20 focus:bg-white focus:text-zinc-900 text-white placeholder-blue-200 focus:placeholder-zinc-400 rounded text-xs outline-hidden transition border border-white/20"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-zinc-200 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-xs", children: [
      { id: "all", label: "All Projects" },
      { id: "ai", label: "AI & Machine Learning" },
      { id: "fullstack", label: "Full Stack & Health" },
      { id: "frontend", label: "Frontend UI" },
      { id: "security", label: "Security & Crypto" }
    ].map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          sounds.playClick();
          setSelectedCategory(cat.id);
        },
        className: `px-3 py-1 rounded-full font-semibold transition cursor-pointer text-[11px] whitespace-nowrap ${selectedCategory === cat.id ? "bg-[#0058e6] text-white shadow-xs" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`,
        children: cat.label
      },
      cat.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col md:flex-row min-h-0 bg-[#f4f5f7]", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full md:w-80 border-r border-zinc-200 bg-white overflow-y-auto p-2 space-y-2 shrink-0", children: filteredProjects.map((proj) => {
        const isSelected = proj.id === activeProjectId;
        return /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => {
              sounds.playClick();
              setActiveProjectId(proj.id);
            },
            className: `p-3 rounded-lg border text-left cursor-pointer transition select-none ${isSelected ? "bg-blue-50/80 border-blue-500 ring-1 ring-blue-500 shadow-xs" : "bg-white hover:bg-zinc-50 border-zinc-200"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl", children: proj.icon }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-1", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-xs text-zinc-900 truncate", children: proj.title }) }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-blue-600 uppercase tracking-wider block mt-0.5", children: proj.categoryLabel }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-zinc-600 line-clamp-2 mt-1 leading-snug", children: proj.subtitle })
              ] })
            ] })
          },
          proj.id
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-white", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-50 via-indigo-50/40 to-white p-4 rounded-xl border border-blue-200 shadow-xs", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl filter drop-shadow-xs", children: activeProject.icon }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("h2", { className: "font-bold text-base text-zinc-900", children: activeProject.title }),
                /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300", children: activeProject.status })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-600 mt-0.5", children: activeProject.subtitle })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleLaunchDemo(activeProject.demoAppId),
                className: "px-3.5 py-1.5 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded-md font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-transform",
                children: [
                  /* @__PURE__ */ jsx(Play, { className: "w-3.5 h-3.5 fill-current" }),
                  /* @__PURE__ */ jsx("span", { children: "Test in Browser \u2197" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: activeProject.githubUrl,
                target: "_blank",
                rel: "noreferrer",
                className: "px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx(Code2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "GitHub Repo" })
                ]
              }
            )
          ] })
        ] }) }),
        activeProject.metrics && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: activeProject.metrics.map((m, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-blue-700", children: m.value }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-zinc-500 mt-0.5", children: m.label })
        ] }, idx)) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xs text-zinc-800 uppercase tracking-wider", children: "Project Architecture Overview" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-200", children: activeProject.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xs text-zinc-800 uppercase tracking-wider", children: "Key Technical Highlights" }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: activeProject.highlights.map((h, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-xs text-zinc-800 bg-white p-2.5 rounded-md border border-zinc-200", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: h })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xs text-zinc-800 uppercase tracking-wider", children: "Technologies & Frameworks" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: activeProject.techStack.map((tech) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-md text-xs font-semibold",
              children: tech
            },
            tech
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] px-3 py-1 border-t border-zinc-300 text-[11px] text-zinc-600 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Showing ",
        filteredProjects.length,
        " featured engineering projects"
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => window.open("https://github.com/NallukumarRavichandran", "_blank", "noopener,noreferrer"),
          className: "text-blue-700 hover:underline flex items-center gap-1 font-semibold",
          children: [
            /* @__PURE__ */ jsx("span", { children: "Explore all repos on github.com/NallukumarRavichandran" }),
            /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
          ]
        }
      )
    ] })
  ] });
};
export {
  ProjectsApp
};
