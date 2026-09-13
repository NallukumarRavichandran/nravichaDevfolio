import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import {
  Folder,
  FileText,
  HardDrive,
  Globe,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Search,
  Grid,
  List,
  Monitor,
  Code2,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { sounds } from "../../utils/audio";
const FILE_SYSTEM = {
  "this-pc": [
    { id: "c-drive", name: "Local Disk (C:)", type: "drive", icon: "\u{1F4BD}", size: "384 GB free of 512 GB", description: "System volume containing Projects, Skills, and Core Documents" },
    { id: "d-drive", name: "Cloud & Work (D:)", type: "drive", icon: "\u2601\uFE0F", size: "180 GB free of 256 GB", description: "Enterprise Java Full Stack & Microservices Workspace" },
    { id: "e-drive", name: "Academic (E:)", type: "drive", icon: "\u{1F393}", size: "54 GB free of 64 GB", description: "Degree Credentials, Diplomas & Academic Transcripts" },
    { id: "floppy-a", name: "3\xBD Floppy (A:)", type: "drive", icon: "\u{1F4BE}", size: "1.44 MB", description: "Legacy boot diskette" }
  ],
  "c-drive": [
    { id: "projects-folder", name: "Projects", type: "folder", icon: "\u{1F4C1}", size: "4 items", dateModified: "Sep 04, 2026" },
    { id: "skills-folder", name: "Skills & Tech Stack", type: "folder", icon: "\u{1F4C1}", size: "8 items", dateModified: "Sep 03, 2026" },
    { id: "experience-folder", name: "Work Experience", type: "folder", icon: "\u{1F4C1}", size: "3 items", dateModified: "Sep 02, 2026" },
    { id: "education-folder", name: "Education", type: "folder", icon: "\u{1F4C1}", size: "3 items", dateModified: "Aug 28, 2026" },
    { id: "documents-folder", name: "Documents", type: "folder", icon: "\u{1F4C1}", size: "3 files", dateModified: "Sep 01, 2026" },
    {
      id: "resume-file",
      name: "Nallukumar_Resume.txt",
      type: "file",
      icon: "\u{1F4DD}",
      size: "9.4 KB",
      dateModified: "Sep 04, 2026",
      targetApp: "notepad",
      description: "Complete unabridged resume for Nallukumar Ravichandran"
    },
    {
      id: "github-shortcut",
      name: "GitHub Profile (Online).url",
      type: "link",
      icon: "\u{1F310}",
      size: "1 KB",
      externalUrl: "https://github.com/NallukumarRavichandran",
      description: "Real GitHub profile showcasing all open-source repositories"
    },
    {
      id: "linkedin-shortcut",
      name: "LinkedIn Profile (Online).url",
      type: "link",
      icon: "\u{1F4BC}",
      size: "1 KB",
      externalUrl: "https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true",
      description: "Real verified LinkedIn profile for networking and inquiries"
    }
  ],
  "projects-folder": [
    { id: "ai-tutor-proj", name: "Generative AI Tutor", type: "folder", icon: "\u{1F916}", size: "4 items", description: "Intelligent 1-on-1 AI Tutoring System with RAG & ChromaDB" },
    { id: "mind-buddy-proj", name: "Mind Buddy (CBT Tracker)", type: "folder", icon: "\u{1F9E0}", size: "3 items", description: "Cognitive Behavioral Therapy mood reframing web app" },
    { id: "you-clone-proj", name: "You-Clone Video Platform", type: "folder", icon: "\u{1F4FA}", size: "3 items", description: "Frontend YouTube UI clone with real interaction" },
    { id: "hash-forge-proj", name: "Hash-Forge Generator", type: "folder", icon: "\u{1F510}", size: "3 items", description: "High-entropy password & SHA-256 cryptographic generator" }
  ],
  "ai-tutor-proj": [
    {
      id: "ai-tutor-readme",
      name: "README.md",
      type: "file",
      icon: "\u{1F4C4}",
      size: "4.2 KB",
      dateModified: "2026-09-01",
      content: `# Generative AI Tutor & Adaptive Learning Platform
An intelligent 1-on-1 AI tutoring system engineered to make quality education personalized and accessible.

Key Capabilities:
\u2022 Built a Retrieval-Augmented Generation (RAG) pipeline with ChromaDB vector storage and semantic chunking.
\u2022 Enforced strict zero-hallucination guardrails and source attribution to guarantee factual responses.
\u2022 Developed adaptive learning paths that adjust question difficulty in real time based on learner mastery.
\u2022 Tech Stack: Python, FastAPI, ChromaDB, Hugging Face, Ollama, React, Vite.`
    },
    {
      id: "ai-tutor-demo",
      name: "Run Interactive RAG Tester.exe",
      type: "file",
      icon: "\u26A1",
      size: "Executable",
      targetApp: "ie",
      description: "Test live vector retrieval and hallucination guardrails in Internet Explorer"
    },
    {
      id: "ai-tutor-repo",
      name: "GitHub_Repository.url",
      type: "link",
      icon: "\u{1F310}",
      size: "1 KB",
      externalUrl: "https://github.com/NallukumarRavichandran",
      description: "Open source repository on GitHub"
    }
  ],
  "mind-buddy-proj": [
    {
      id: "mind-buddy-readme",
      name: "README.md",
      type: "file",
      icon: "\u{1F4C4}",
      size: "3.1 KB",
      dateModified: "2026-08-20",
      content: `# Mind Buddy - CBT Mental Health Tracker
A single-page React web application designed to help users identify and reframe cognitive distortions.

Highlights:
\u2022 Guided Cognitive Behavioral Therapy (CBT) logging interface with intuitive step-by-step prompts.
\u2022 Interactive mood tracking with localized data persistence.
\u2022 Clean, accessible, responsive design with soothing color palettes.
\u2022 Tech Stack: React, Tailwind CSS, TypeScript, Web Storage API.`
    },
    {
      id: "mind-buddy-demo",
      name: "Launch Mind Buddy App.exe",
      type: "file",
      icon: "\u{1F9E0}",
      size: "Executable",
      targetApp: "ie",
      description: "Launch the interactive Mind Buddy app inside Internet Explorer"
    },
    {
      id: "mind-buddy-repo",
      name: "GitHub_Repository.url",
      type: "link",
      icon: "\u{1F310}",
      size: "1 KB",
      externalUrl: "https://github.com/NallukumarRavichandran"
    }
  ],
  "you-clone-proj": [
    {
      id: "you-clone-readme",
      name: "README.md",
      type: "file",
      icon: "\u{1F4C4}",
      size: "2.5 KB",
      dateModified: "2026-07-15",
      content: `# You-Clone - Frontend YouTube UI Clone
Responsive video streaming interface mimicking the core YouTube viewing experience.

Features:
\u2022 Dynamic video recommendation feed with mock streaming players.
\u2022 Interactive commenting system with like/dislike counts and real-time state manipulation.
\u2022 Accessible navigation bar, sidebar drawer, and search bar.
\u2022 Tech Stack: HTML, CSS, JavaScript, React, Bootstrap.`
    },
    {
      id: "you-clone-demo",
      name: "Launch You-Clone Player.exe",
      type: "file",
      icon: "\u{1F4FA}",
      size: "Executable",
      targetApp: "ie"
    },
    {
      id: "you-clone-repo",
      name: "GitHub_Repository.url",
      type: "link",
      icon: "\u{1F310}",
      size: "1 KB",
      externalUrl: "https://github.com/NallukumarRavichandran"
    }
  ],
  "hash-forge-proj": [
    {
      id: "hash-forge-readme",
      name: "README.md",
      type: "file",
      icon: "\u{1F4C4}",
      size: "2.1 KB",
      dateModified: "2026-06-10",
      content: `# Hash-Forge - Password Generator & Cryptographic Inspector
Simple, secure, and stylish credential generator with real-time hash digests.

Highlights:
\u2022 High-entropy randomized string synthesizer with custom symbol/number toggles.
\u2022 Real-time cryptographic hashing (SHA-256, SHA-512, MD5).
\u2022 Instant one-click clipboard copy and entropy strength scoring.
\u2022 Tech Stack: JavaScript, Web Crypto API, React.`
    },
    {
      id: "hash-forge-demo",
      name: "Launch Hash-Forge Tool.exe",
      type: "file",
      icon: "\u{1F510}",
      size: "Executable",
      targetApp: "ie"
    },
    {
      id: "hash-forge-repo",
      name: "GitHub_Repository.url",
      type: "link",
      icon: "\u{1F310}",
      size: "1 KB",
      externalUrl: "https://github.com/NallukumarRavichandran"
    }
  ],
  "skills-folder": [
    {
      id: "skill-java",
      name: "Java_Full_Stack.sys",
      type: "file",
      icon: "\u2615",
      size: "Expert (95%)",
      dateModified: "Core, OOP, Collections, Multithreading, Streams, JVM"
    },
    {
      id: "skill-spring",
      name: "Spring_Boot_Microservices.dll",
      type: "file",
      icon: "\u{1F343}",
      size: "Advanced (93%)",
      dateModified: "Spring MVC, REST APIs, Hibernate ORM, Spring Security"
    },
    {
      id: "skill-sql",
      name: "PostgreSQL_MySQL.db",
      type: "file",
      icon: "\u{1F5C4}\uFE0F",
      size: "Advanced (90%)",
      dateModified: "ACID transactions, complex joins, indexing, Workbench"
    },
    {
      id: "skill-csharp",
      name: "CSharp_ASP_NET.dll",
      type: "file",
      icon: "\u{1F537}",
      size: "Proficient (86%)",
      dateModified: "C#, ASP .NET, Object Oriented Programming, Visual Studio"
    },
    {
      id: "skill-react",
      name: "React_NodeJS_Web.sys",
      type: "file",
      icon: "\u269B\uFE0F",
      size: "Advanced (89%)",
      dateModified: "React, TypeScript, JavaScript, HTML, Bootstrap, Tailwind"
    },
    {
      id: "skill-ai",
      name: "AI_Tools_VectorRAG.lib",
      type: "file",
      icon: "\u{1F9E0}",
      size: "Advanced (88%)",
      dateModified: "Hugging Face, Ollama, ChromaDB, Antigravity, Postman, JMeter"
    },
    {
      id: "skill-cicd",
      name: "CI_CD_Cloud_Triage.log",
      type: "file",
      icon: "\u2601\uFE0F",
      size: "Advanced (91%)",
      dateModified: "GIT, Docker, Jenkins, Security Vulnerability Triage, Release Audits"
    },
    {
      id: "skill-dsa",
      name: "LeetCode_Algorithmic.dat",
      type: "file",
      icon: "\u{1F3C6}",
      size: "Contest Master (92%)",
      dateModified: "Arrays, Dynamic Programming, Graphs, Heaps, O(1)/O(N) algorithms"
    }
  ],
  "experience-folder": [
    {
      id: "exp-giritronics",
      name: "1_Giritronics_SDE.txt",
      type: "file",
      icon: "\u{1F3E2}",
      size: "Current Role",
      dateModified: "Sep 2026 - Present",
      content: `Software Developer Engineer
Giritronics, Chennai | September 2026 - Present
\u2022 Developed and maintained scalable backend services using Java Full Stack for web applications.
\u2022 Built and supported REST APIs and backend logic for internal and client-facing applications.
\u2022 Designed and developed full-stack websites using Java and integrated Windows/Android software solutions.
\u2022 Detected, triaged, and fixed security vulnerabilities in production codebases to ensure application integrity.
\u2022 Managed databases and handled complex data processing and integrity tasks.
\u2022 Collaborated with DevOps teams to streamline CI/CD pipelines and manage cloud release deployments.`
    },
    {
      id: "exp-amex",
      name: "2_American_Express_Cloud_Infra.txt",
      type: "file",
      icon: "\u{1F4B3}",
      size: "Completed",
      dateModified: "Jan 2026 - Aug 2026",
      content: `Development Trainee - Cloud & Infrastructure
American Express | January 2026 - August 2026
\u2022 Developed and maintained scalable backend services using Java Full Stack.
\u2022 Built and supported REST APIs and backend logic for internal applications.
\u2022 Detected, triaged, and fixed security vulnerabilities in production codebases.
\u2022 Worked with databases and handled data processing and integrity tasks.
\u2022 Collaborated with DevOps teams for CI/CD pipelines and cloud release deployments.`
    },
    {
      id: "exp-arsus",
      name: "3_ARSUS_Web_Development_Internship.txt",
      type: "file",
      icon: "\u{1F4BB}",
      size: "Completed",
      dateModified: "Apr 2023 - May 2023",
      content: `Web Development Internship
ARSUS Solutions & Services Pvt Ltd, Coimbatore | April 2023 - May 2023
\u2022 Completed web development internship gaining hands-on experience in building and maintaining web applications.
\u2022 Demonstrated strong learning ability and commitment to project tasks in collaborative agile sprints.`
    }
  ],
  "education-folder": [
    {
      id: "edu-be",
      name: "BE_Computer_Science_PSNA.doc",
      type: "file",
      icon: "\u{1F393}",
      size: "Graduated 2025",
      dateModified: "2022 - 2025",
      content: `Bachelor of Engineering (B.E.) in Computer Science & Engineering
PSNA College of Engineering and Technology, Dindigul, Tamil Nadu
Duration: 2022 - 2025
Key Coursework: Object Oriented Programming (OOPS), Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering.`
    },
    {
      id: "edu-diploma",
      name: "Diploma_TKSPC_Theni.doc",
      type: "file",
      icon: "\u{1F4DC}",
      size: "Graduated 2021",
      dateModified: "2019 - 2021",
      content: `Diploma Graduation
TKSPC, Theni, Tamil Nadu
Duration: 2019 - 2021
Focus: Fundamentals of Computer Technology, Hardware & System Programming.`
    },
    {
      id: "edu-sslc",
      name: "SSLC_JC_Matric.doc",
      type: "file",
      icon: "\u{1F3EB}",
      size: "Graduated 2018",
      dateModified: "2017 - 2018",
      content: `Secondary School Leaving Certificate (SSLC)
JC Matric School, Periyakulam, Tamil Nadu
Duration: 2017 - 2018`
    }
  ],
  "documents-folder": [
    {
      id: "doc-resume",
      name: "Nallukumar_Ravichandran_Resume.txt",
      type: "file",
      icon: "\u{1F4DD}",
      size: "9.4 KB",
      targetApp: "notepad",
      description: "Official updated curriculum vitae"
    },
    {
      id: "doc-cover",
      name: "Professional_Statement_2026.txt",
      type: "file",
      icon: "\u{1F4C4}",
      size: "1.8 KB",
      content: `PROFESSIONAL STATEMENT:
Nallukumar Ravichandran
Passionate Java Full Stack Engineer with enterprise production experience at Giritronics and American Express (Cloud & Infrastructure).
Dedicated to writing clean, maintainable, high-performance software with zero critical vulnerabilities.
Active competitive coder on LeetCode solving complex problems in Dynamic Programming, Graphs, and Tree structures.`
    },
    {
      id: "doc-contact",
      name: "Contact_Card.vcf",
      type: "file",
      icon: "\u{1F4C7}",
      size: "0.8 KB",
      content: `BEGIN:VCARD
VERSION:3.0
FN:Nallukumar Ravichandran
TITLE:Software Developer Engineer
ORG:Giritronics | Ex-American Express
EMAIL:kumar10naidu@gmail.com
TEL:+91 6369614270
URL:https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true
URL:https://github.com/NallukumarRavichandran
ADR:;;Chennai / Dindigul;Tamil Nadu;;India
END:VCARD`
    }
  ],
  "d-drive": [
    { id: "amex-cloud-env", name: "Amex_Cloud_Infrastructure", type: "folder", icon: "\u{1F4C1}", size: "2 items", description: "Enterprise staging & microservice topologies" },
    { id: "giri-backend-env", name: "Giritronics_Enterprise_APIs", type: "folder", icon: "\u{1F4C1}", size: "2 items", description: "Production REST services and secure microservices" },
    {
      id: "devops-triage-log",
      name: "Release_Triage_Zero_Vulns.log",
      type: "file",
      icon: "\u{1F6E1}\uFE0F",
      size: "12 KB",
      content: `ENTERPRISE CI/CD PIPELINE AUDIT REPORT
Target: Production Cloud Cluster
Result: PASS (0 Critical Vulnerabilities)
Audited by: Nallukumar Ravichandran
Components: Spring Boot REST Endpoints, PostgreSQL Query Engine, Docker Container Registry.`
    }
  ],
  "e-drive": [
    {
      id: "be-degree-cert",
      name: "Degree_BE_Computer_Science_PSNA.cert",
      type: "file",
      icon: "\u{1F396}\uFE0F",
      size: "Verified Credential",
      content: `ACADEMIC DEGREE VERIFICATION:
Degree: Bachelor of Engineering (Computer Science & Engineering)
Institution: PSNA College of Engineering and Technology, Dindigul
Years: 2022 - 2025
Status: Successfully Awarded`
    },
    {
      id: "diploma-cert",
      name: "Diploma_TKSPC.cert",
      type: "file",
      icon: "\u{1F396}\uFE0F",
      size: "Verified Credential",
      content: `DIPLOMA VERIFICATION:
Institution: TKSPC Theni
Years: 2019 - 2021
Status: Successfully Graduated`
    }
  ]
};
const FileExplorerApp = ({ onOpenApp, onOpenNotepadWithText }) => {
  const [currentPath, setCurrentPath] = useState("this-pc");
  const [history, setHistory] = useState(["this-pc"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  const navigateTo = (pathKey) => {
    sounds.playClick();
    if (FILE_SYSTEM[pathKey]) {
      const nextHistory = history.slice(0, historyIndex + 1);
      nextHistory.push(pathKey);
      setHistory(nextHistory);
      setHistoryIndex(nextHistory.length - 1);
      setCurrentPath(pathKey);
      setSelectedItemId(null);
      setSearchQuery("");
    }
  };
  const handleBack = () => {
    if (historyIndex > 0) {
      sounds.playClick();
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setCurrentPath(history[prevIdx]);
      setSelectedItemId(null);
    }
  };
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      sounds.playClick();
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setCurrentPath(history[nextIdx]);
      setSelectedItemId(null);
    }
  };
  const handleUp = () => {
    sounds.playClick();
    if (currentPath === "this-pc") return;
    if (["c-drive", "d-drive", "e-drive", "floppy-a"].includes(currentPath)) {
      navigateTo("this-pc");
    } else if (["projects-folder", "skills-folder", "experience-folder", "education-folder", "documents-folder"].includes(currentPath)) {
      navigateTo("c-drive");
    } else if (["ai-tutor-proj", "mind-buddy-proj", "you-clone-proj", "hash-forge-proj"].includes(currentPath)) {
      navigateTo("projects-folder");
    } else {
      navigateTo("c-drive");
    }
  };
  const handleItemClick = (item) => {
    setSelectedItemId(item.id);
  };
  const handleItemDoubleClick = (item) => {
    sounds.playClick();
    if (item.type === "folder" || item.type === "drive") {
      navigateTo(item.id);
    } else if (item.type === "link" && item.externalUrl) {
      window.open(item.externalUrl, "_blank", "noopener,noreferrer");
    } else if (item.targetApp) {
      onOpenApp(item.targetApp);
    } else if (item.content) {
      if (onOpenNotepadWithText) {
        onOpenNotepadWithText(item.name, item.content);
      } else {
        setPreviewContent({ title: item.name, text: item.content });
      }
    }
  };
  const items = (FILE_SYSTEM[currentPath] || []).filter(
    (item) => searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  const formatPathDisplay = (key) => {
    switch (key) {
      case "this-pc":
        return "My Computer";
      case "c-drive":
        return "My Computer\\Local Disk (C:)";
      case "d-drive":
        return "My Computer\\Cloud & Work (D:)";
      case "e-drive":
        return "My Computer\\Academic (E:)";
      case "projects-folder":
        return "C:\\Projects";
      case "skills-folder":
        return "C:\\Skills & Tech Stack";
      case "experience-folder":
        return "C:\\Work Experience";
      case "education-folder":
        return "C:\\Education";
      case "documents-folder":
        return "C:\\Documents";
      case "ai-tutor-proj":
        return "C:\\Projects\\Generative AI Tutor";
      case "mind-buddy-proj":
        return "C:\\Projects\\Mind Buddy (CBT)";
      case "you-clone-proj":
        return "C:\\Projects\\You-Clone";
      case "hash-forge-proj":
        return "C:\\Projects\\Hash-Forge";
      default:
        return `C:\\${key}`;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-[#ece9d8] text-zinc-900 font-sans text-xs select-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] px-2 py-0.5 border-b border-zinc-300 flex items-center gap-4 text-[11px]", children: [
      /* @__PURE__ */ jsx("span", { className: "hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer", children: "File" }),
      /* @__PURE__ */ jsx("span", { className: "hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer", children: "Edit" }),
      /* @__PURE__ */ jsx("span", { className: "hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer", children: "View" }),
      /* @__PURE__ */ jsx("span", { className: "hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer", children: "Favorites" }),
      /* @__PURE__ */ jsx("span", { className: "hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer", children: "Tools" }),
      /* @__PURE__ */ jsx("span", { className: "hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer", children: "Help" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-b from-[#fbfbfb] to-[#ece9d8] p-1 border-b border-zinc-300 flex items-center gap-1", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleBack,
          disabled: historyIndex <= 0,
          className: "p-1 hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent rounded flex items-center gap-0.5 cursor-pointer",
          title: "Back",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 text-emerald-600" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold pr-1", children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleForward,
          disabled: historyIndex >= history.length - 1,
          className: "p-1 hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent rounded cursor-pointer",
          title: "Forward",
          children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-emerald-600" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleUp,
          disabled: currentPath === "this-pc",
          className: "p-1 hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent rounded cursor-pointer",
          title: "Up one folder level",
          children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4 text-amber-600" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-5 w-[1px] bg-zinc-300 mx-1" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigateTo("this-pc"),
          className: "px-2 py-1 hover:bg-white/60 rounded flex items-center gap-1 text-[11px] cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(HardDrive, { className: "w-3.5 h-3.5 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { children: "My Computer" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigateTo("projects-folder"),
          className: "px-2 py-1 hover:bg-white/60 rounded flex items-center gap-1 text-[11px] cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(Folder, { className: "w-3.5 h-3.5 text-yellow-600" }),
            /* @__PURE__ */ jsx("span", { children: "Projects" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigateTo("skills-folder"),
          className: "px-2 py-1 hover:bg-white/60 rounded flex items-center gap-1 text-[11px] cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(Code2, { className: "w-3.5 h-3.5 text-indigo-600" }),
            /* @__PURE__ */ jsx("span", { children: "Skills" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-5 w-[1px] bg-zinc-300 mx-1" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setViewMode("grid"),
            className: `p-1 rounded cursor-pointer ${viewMode === "grid" ? "bg-zinc-300 shadow-inner" : "hover:bg-white/60"}`,
            title: "Icons View",
            children: /* @__PURE__ */ jsx(Grid, { className: "w-3.5 h-3.5 text-zinc-700" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setViewMode("details"),
            className: `p-1 rounded cursor-pointer ${viewMode === "details" ? "bg-zinc-300 shadow-inner" : "hover:bg-white/60"}`,
            title: "Details View",
            children: /* @__PURE__ */ jsx(List, { className: "w-3.5 h-3.5 text-zinc-700" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] px-2 py-1 border-b border-zinc-300 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-zinc-600 font-semibold text-[11px] shrink-0", children: "Address" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white border border-zinc-400 rounded-xs px-2 py-0.5 flex items-center gap-1 text-xs shadow-inner", children: [
        /* @__PURE__ */ jsx("span", { className: "text-yellow-600", children: "\u{1F4C1}" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-zinc-800 text-[11px] truncate", children: formatPathDisplay(currentPath) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-48 bg-white border border-zinc-400 rounded-xs px-2 py-0.5 flex items-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5 text-zinc-400 shrink-0" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search folder...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full bg-transparent outline-hidden text-[11px]"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex min-h-0 bg-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-52 bg-gradient-to-b from-[#7ba2e7] to-[#6375d6] p-2 text-white flex flex-col gap-2 overflow-y-auto shrink-0 border-r border-blue-400 select-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/95 text-zinc-900 rounded-t-md overflow-hidden shadow-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#215dc6] to-[#3a7bf0] text-white font-bold p-1.5 text-[11px] flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "System Tasks" }),
            /* @__PURE__ */ jsx("span", { children: "\u25BE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-1.5 text-[11px]", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onOpenApp("notepad"),
                className: "w-full text-left text-blue-700 hover:underline flex items-center gap-1.5 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Open Resume in Notepad" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onOpenApp("ie"),
                className: "w-full text-left text-blue-700 hover:underline flex items-center gap-1.5 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Launch Web Portfolio" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onOpenApp("cmd"),
                className: "w-full text-left text-blue-700 hover:underline flex items-center gap-1.5 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx(Monitor, { className: "w-3.5 h-3.5 text-zinc-700" }),
                  /* @__PURE__ */ jsx("span", { children: "Command Prompt" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/95 text-zinc-900 rounded-t-md overflow-hidden shadow-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#215dc6] to-[#3a7bf0] text-white font-bold p-1.5 text-[11px] flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "Quick Places" }),
            /* @__PURE__ */ jsx("span", { children: "\u25BE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-1 text-[11px]", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateTo("this-pc"),
                className: `w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${currentPath === "this-pc" ? "bg-[#2f71cd] text-white" : "hover:bg-blue-50 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsx(HardDrive, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "My Computer" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateTo("projects-folder"),
                className: `w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${currentPath === "projects-folder" ? "bg-[#2f71cd] text-white" : "hover:bg-blue-50 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsx(Folder, { className: "w-3.5 h-3.5 text-amber-500" }),
                  /* @__PURE__ */ jsx("span", { children: "Projects" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateTo("skills-folder"),
                className: `w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${currentPath === "skills-folder" ? "bg-[#2f71cd] text-white" : "hover:bg-blue-50 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsx(Code2, { className: "w-3.5 h-3.5 text-indigo-500" }),
                  /* @__PURE__ */ jsx("span", { children: "Skills & Stack" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateTo("experience-folder"),
                className: `w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${currentPath === "experience-folder" ? "bg-[#2f71cd] text-white" : "hover:bg-blue-50 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsx(Briefcase, { className: "w-3.5 h-3.5 text-teal-500" }),
                  /* @__PURE__ */ jsx("span", { children: "Work Experience" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateTo("education-folder"),
                className: `w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${currentPath === "education-folder" ? "bg-[#2f71cd] text-white" : "hover:bg-blue-50 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsx(GraduationCap, { className: "w-3.5 h-3.5 text-purple-500" }),
                  /* @__PURE__ */ jsx("span", { children: "Education" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateTo("documents-folder"),
                className: `w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${currentPath === "documents-folder" ? "bg-[#2f71cd] text-white" : "hover:bg-blue-50 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-blue-500" }),
                  /* @__PURE__ */ jsx("span", { children: "Documents" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/95 text-zinc-900 rounded-t-md p-2 shadow-xs text-[10px] space-y-1 mt-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-zinc-800 uppercase tracking-wider text-[9px]", children: "Computer Details" }),
          /* @__PURE__ */ jsx("div", { children: "Owner: Nallukumar Ravichandran" }),
          /* @__PURE__ */ jsx("div", { children: "OS: Windows XP Pro SP3" }),
          /* @__PURE__ */ jsx("div", { children: "RAM: 16 GB DDR4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 p-3 overflow-y-auto bg-white", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-zinc-400 p-8", children: [
        /* @__PURE__ */ jsx("span", { className: "text-3xl mb-2", children: "\u{1F4C1}" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: "This folder is empty" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-500 mt-1", children: "Try searching for other terms or navigating up." })
      ] }) : viewMode === "grid" ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: items.map((item) => {
        const isSelected = selectedItemId === item.id;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => handleItemClick(item),
            onDoubleClick: () => handleItemDoubleClick(item),
            className: `p-2 rounded-sm border flex flex-col items-center text-center cursor-pointer transition select-none ${isSelected ? "bg-[#0a246a]/15 border-[#0a246a] ring-1 ring-[#0a246a]" : "border-transparent hover:bg-zinc-100"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-4xl mb-1.5 filter drop-shadow-xs", children: item.icon }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-zinc-900 break-all line-clamp-2 px-1", children: item.name }),
              item.size && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-zinc-500 mt-0.5", children: item.size }),
              item.description && /* @__PURE__ */ jsx("span", { className: "text-[9px] text-zinc-400 line-clamp-1 mt-0.5", children: item.description })
            ]
          },
          item.id
        );
      }) }) : /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-xs", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-zinc-200 text-zinc-500 font-bold bg-zinc-50", children: [
          /* @__PURE__ */ jsx("th", { className: "p-1.5", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "p-1.5", children: "Type" }),
          /* @__PURE__ */ jsx("th", { className: "p-1.5", children: "Size / Details" }),
          /* @__PURE__ */ jsx("th", { className: "p-1.5", children: "Date Modified" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: items.map((item) => {
          const isSelected = selectedItemId === item.id;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              onClick: () => handleItemClick(item),
              onDoubleClick: () => handleItemDoubleClick(item),
              className: `border-b border-zinc-100 cursor-pointer ${isSelected ? "bg-[#0a246a] text-white" : "hover:bg-blue-50 text-zinc-800"}`,
              children: [
                /* @__PURE__ */ jsxs("td", { className: "p-1.5 flex items-center gap-2 font-medium", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base", children: item.icon }),
                  /* @__PURE__ */ jsx("span", { children: item.name })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "p-1.5 capitalize", children: item.type }),
                /* @__PURE__ */ jsx("td", { className: "p-1.5", children: item.size || "-" }),
                /* @__PURE__ */ jsx("td", { className: "p-1.5", children: item.dateModified || "-" })
              ]
            },
            item.id
          );
        }) })
      ] }) }) })
    ] }),
    previewContent && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] border-2 border-[#0058e6] rounded shadow-2xl w-full max-w-lg flex flex-col max-h-[80vh]", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#0058e6] to-[#3a7bf0] text-white p-2 font-bold text-xs flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          previewContent.title,
          " - Document Viewer"
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setPreviewContent(null),
            className: "w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded text-xs flex items-center justify-center",
            children: "\u2715"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-3 overflow-y-auto flex-1 bg-white font-mono text-xs whitespace-pre-wrap text-zinc-800", children: previewContent.text }),
      /* @__PURE__ */ jsxs("div", { className: "p-2 border-t border-zinc-300 flex justify-end gap-2 bg-[#ece9d8]", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              if (onOpenNotepadWithText) {
                onOpenNotepadWithText(previewContent.title, previewContent.text);
              }
              setPreviewContent(null);
            },
            className: "px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-xs",
            children: "Edit in Notepad"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setPreviewContent(null),
            className: "px-3 py-1 bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-semibold rounded text-xs",
            children: "Close"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] px-3 py-1 border-t border-zinc-300 flex justify-between items-center text-[11px] text-zinc-600", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        items.length,
        " objects"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { children: "Local Intranet / My Computer" }),
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 inline-block" })
      ] })
    ] })
  ] });
};
export {
  FileExplorerApp
};
