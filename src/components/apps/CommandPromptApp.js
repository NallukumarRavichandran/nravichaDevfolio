import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { sounds } from "../../utils/audio";
const CommandPromptApp = ({ onTriggerBSOD, onOpenApp }) => {
  const [history, setHistory] = useState([
    { text: "Microsoft(R) Windows DOS", type: "system" },
    { text: "(C)Copyright Microsoft Corp 1981-2001.", type: "system" },
    { text: "Nallukumar R - Java Full Stack Developer & Trainee @ American Express", type: "system" },
    { text: 'Type "help" to view available terminal commands.', type: "output" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isMatrixActive]);
  const handleCommand = (e) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;
    sounds.playClick();
    const cmd = rawCmd.toLowerCase();
    const newHistory = [...history, { text: `C:\\Users\\Nallukumar> ${rawCmd}`, type: "cmd" }];
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);
    setInputVal("");
    switch (cmd) {
      case "help":
        newHistory.push({
          text: `AVAILABLE COMMANDS:
  help        - Show this reference menu
  about       - Overview of Nallukumar Ravichandran
  experience  - Giritronics, American Express & ARSUS details
  skills      - Technical skills, languages, frameworks & tools
  projects    - Generative AI Tutor, Mind Buddy, You-Clone & Hash-Forge
  education   - PSNA College of Engineering, TKSPC & JC Matric
  leetcode    - Run simulated algorithm analysis & execution
  contact     - Display direct email, phone, and verified LinkedIn/GitHub links
  matrix      - Toggle green Matrix digital rain
  calc        - Open Calculator.exe
  music       - Open Windows Media Player
  paint       - Open Paint.exe
  bsod        - Trigger Windows XP Blue Screen of Death
  cls / clear - Clear the terminal screen
  whoami      - Print current system user`,
          type: "output"
        });
        break;
      case "about":
        newHistory.push({
          text: `NALLUKUMAR RAVICHANDRAN
Position: Software Developer Engineer at Giritronics | Ex-American Express (Cloud & Infrastructure)
Email: kumar10naidu@gmail.com | Phone: +91 6369614270
LinkedIn: https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true
GitHub: https://github.com/NallukumarRavichandran
Focus: Java Full Stack Development, REST APIs, Microservices, Spring Boot,
       PostgreSQL database optimization, Cloud CI/CD Pipelines, and LeetCode.`,
          type: "output"
        });
        break;
      case "skills":
        newHistory.push({
          text: `TECHNICAL PROFICIENCY MATRIX:
  \u2022 Programming Languages: Java, SQL, C#
  \u2022 Tech Stacks: HTML, Bootstrap, Hibernate, React, Node.js
  \u2022 Databases: MySQL Workbench, PostgreSQL (ACID transactions, indexing)
  \u2022 Tools: GIT, IntelliJ, Firebase, Visual Studio, Hugging Face, Ollama, Postman, JMeter, Antigravity
  \u2022 Coursework: OOPS, ASP .NET
  \u2022 Algorithmic: Arrays, Dynamic Programming, Graphs, Heaps, O(1)/O(N) optimizations`,
          type: "success"
        });
        break;
      case "amex":
      case "experience":
        newHistory.push({
          text: `PROFESSIONAL WORK EXPERIENCE:

1. Software Developer Engineer | Giritronics, Chennai (Sep 2026 - Present)
   \u2022 Developed and maintained scalable backend services using Java Full Stack for web applications.
   \u2022 Built and supported REST APIs and backend logic for internal and client-facing applications.
   \u2022 Designed full-stack websites using Java and integrated Windows/Android solutions.
   \u2022 Detected, triaged, and fixed security vulnerabilities in production codebases.
   \u2022 Managed databases and complex data processing/integrity tasks.
   \u2022 Streamlined CI/CD pipelines and managed cloud release deployments.

2. Development Trainee - Cloud & Infrastructure | American Express (Jan 2026 - Aug 2026)
   \u2022 Developed and maintained scalable backend services using Java Full Stack.
   \u2022 Built and supported REST APIs for internal applications with zero critical vulnerabilities.
   \u2022 Triaged security audits and collaborated with DevOps teams for cloud release deployments.

3. Web Development Intern | ARSUS Solutions & Services Pvt Ltd (Apr 2023 - May 2023)
   \u2022 Hands-on experience building and maintaining web applications in collaborative agile teams.`,
          type: "output"
        });
        break;
      case "education":
        newHistory.push({
          text: `ACADEMIC CREDENTIALS:
  \u2022 B.E. Computer Science & Engineering | PSNA College of Engineering & Technology, Dindigul (2022 - 2025)
  \u2022 Diploma Graduation | TKSPC Theni (2019 - 2021)
  \u2022 SSLC | JC Matric School Periyakulam (2017 - 2018)`,
          type: "output"
        });
        break;
      case "projects":
        newHistory.push({
          text: `FEATURED PRODUCTION PROJECTS:
1. Generative AI Tutor & Adaptive Learning Platform | Intelligent 1-on-1 AI Tutoring System
   \u2022 RAG pipeline with ChromaDB vector storage & zero-hallucination guardrails.
2. Mind Buddy | Mental Health CBT Tracker Web App
   \u2022 Single-page React application for real-time mood logging and cognitive distortion reframing.
3. You-Clone | Frontend-Only YouTube UI Clone
   \u2022 Responsive video streaming interface with comments, likes, and accessible design.
4. Hash-Forge | Simple, Secure and Stylish Password Generator
   \u2022 High-entropy randomized string synthesizer with SHA-256 and SHA-512 cryptographic checks.`,
          type: "output"
        });
        break;
      case "leetcode":
        newHistory.push({
          text: `[ALGO BENCHMARK] Initializing LeetCode Solver: 2-Sum & Graph Cycle Detection...
[INFO] Input: Array of 1,000,000 nodes
[INFO] Applying HashMap two-pass complementary lookup...
[SUCCESS] Target sum located at indices [3421, 98124] in 1.4ms!
[COMPLEXITY] Time: O(N) Linear | Space: O(N) Auxiliary
[STATUS] All 42/42 test cases accepted. Memory usage beats 97.4% of Java submissions.`,
          type: "success"
        });
        break;
      case "contact":
        newHistory.push({
          text: `CONTACT & VERIFIED PROFESSIONAL LINKS:
  \u2022 Email: kumar10naidu@gmail.com
  \u2022 Phone: +91 6369614270
  \u2022 LinkedIn: https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true
  \u2022 GitHub: https://github.com/NallukumarRavichandran
  \u2022 Location: Chennai / Dindigul, Tamil Nadu, India`,
          type: "output"
        });
        break;
      case "matrix":
        setIsMatrixActive(!isMatrixActive);
        newHistory.push({
          text: isMatrixActive ? "Matrix simulation terminated." : "Matrix digital rain initialized...",
          type: "system"
        });
        break;
      case "calc":
        onOpenApp("calculator");
        newHistory.push({ text: "Launching Calculator.exe...", type: "output" });
        break;
      case "music":
      case "wmp":
        onOpenApp("mediaplayer");
        newHistory.push({ text: "Launching Windows Media Player...", type: "output" });
        break;
      case "paint":
        onOpenApp("paint");
        newHistory.push({ text: "Launching Paint.exe...", type: "output" });
        break;
      case "bsod":
      case "crash":
        onTriggerBSOD();
        return;
      case "clear":
      case "cls":
        setHistory([]);
        return;
      case "whoami":
        newHistory.push({ text: "nalluos\\administrator (Nallukumar R)", type: "output" });
        break;
      case "date":
      case "time":
        newHistory.push({ text: `Current System Time: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, type: "output" });
        break;
      default:
        sounds.playError();
        newHistory.push({
          text: `'${rawCmd}' is not recognized as an internal or external command. Type 'help' for command list.`,
          type: "error"
        });
    }
    setHistory(newHistory);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? commandHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal("");
        }
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => inputRef.current?.focus(),
      className: "flex-1 bg-black text-[#00ff66] font-mono text-xs p-3 overflow-y-auto flex flex-col min-h-0 select-text",
      style: { fontFamily: '"Lucida Console", "Courier New", monospace' },
      children: [
        isMatrixActive && /* @__PURE__ */ jsxs("div", { className: "text-emerald-500/80 mb-2 whitespace-pre text-[10px] leading-3 overflow-hidden select-none animate-pulse", children: [
          `01001010 01100001 01110110 01100001 00100000 01010011 01110000 01110010 01101001 01101110 01100111 00100000 01000010 01101111 01101111 01110100
`,
          `N A L L U K U M A R \u2022 A M E X \u2022 C L O U D \u2022 I N F R A S T R U C T U R E \u2022 J A V A \u2022 P O S T G R E S Q L
`
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: history.map((line, idx) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `whitespace-pre-wrap leading-relaxed ${line.type === "error" ? "text-red-400" : line.type === "cmd" ? "text-white font-bold" : line.type === "success" ? "text-yellow-300" : line.type === "system" ? "text-zinc-400" : "text-emerald-400"}`,
            children: line.text
          },
          idx
        )) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleCommand, className: "flex items-center gap-1 mt-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white font-bold shrink-0", children: "C:\\Users\\Nallukumar>" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              type: "text",
              value: inputVal,
              onChange: (e) => setInputVal(e.target.value),
              onKeyDown: handleKeyDown,
              autoFocus: true,
              className: "flex-1 bg-transparent text-white outline-hidden font-mono text-xs border-none p-0 focus:ring-0"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { ref: bottomRef })
      ]
    }
  );
};
export {
  CommandPromptApp
};
