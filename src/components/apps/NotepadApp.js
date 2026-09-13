import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { sounds } from "../../utils/audio";
const RESUME_TEXT = `================================================================================
NALLUKUMAR RAVICHANDRAN 
Software Engineer 
Email: kumar10naidu@gmail.com | Phone: +91 6369614270 
LinkedIn: https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true
GitHub: https://github.com/NallukumarRavichandran
Location: Chennai / Dindigul, Tamil Nadu, India
================================================================================

SUMMARY:
Java Full Stack Developer and Software Engineer currently contributing to Cloud & 
Infrastructure at American Express. Building and maintaining scalable enterprise 
services and collaborating with DevOps teams for CI/CD pipelines and production 
release management. Strong problem solver who actively participates in weekly 
LeetCode coding contests and consistently solves algorithmic challenges on 
LeetCode and CodeChef. Passionate about continuous learning, clean and secure 
code practices, and delivering efficient, enterprise grade applications.

WORK EXPERIENCE:
--------------------------------------------------------------------------------
1. Software Developer Engineer
   Giritronics, Chennai
   September 2026 - Present
   \u2022 Developed and maintained scalable backend services using Java Full Stack for web applications.
   \u2022 Built and supported REST APIs and backend logic for internal and client-facing applications.
   \u2022 Designed and developed full-stack websites using Java and integrated Windows/Android software solutions.
   \u2022 Detected, triaged, and fixed security vulnerabilities in production codebases to ensure application integrity.
   \u2022 Managed databases and handled complex data processing and integrity tasks.
   \u2022 Collaborated with DevOps teams to streamline CI/CD pipelines and manage cloud release deployments.
   \u2022 Wrote secure, production-ready code adhering to enterprise compliance standards.

2. Development Trainee - Cloud & Infrastructure
   American Express
   January 2026 - August 2026
   \u2022 Developing and maintaining scalable backend services using Java Full Stack.
   \u2022 Building and supporting REST APIs and backend logic for internal applications.
   \u2022 Detecting, triaging, and fixing security vulnerabilities in production codebases.
   \u2022 Working with databases and handling data processing and integrity tasks.
   \u2022 Collaborating with DevOps teams for CI/CD pipelines and cloud release deployments.
   \u2022 Writing secure, production-ready code adhering to enterprise compliance standards.

INTERNSHIP:
--------------------------------------------------------------------------------
Web Development Internship
ARSUS Solutions & Services Pvt Ltd, Coimbatore
April 2023 - May 2023
\u2022 Completed a Web Development internship at ARSUS Solutions & Services Pvt Ltd Coimbatore,
  gaining hands-on experience in building and maintaining web applications while
  demonstrating strong learning ability and commitment to project tasks.

SKILLS:
--------------------------------------------------------------------------------
\u2022 Programming Languages : Java, SQL, C#
\u2022 Tech Stacks           : HTML, Bootstrap, Hibernate, React, Node.js
\u2022 Database              : MySQL Workbench, PostgreSQL
\u2022 Tools                 : GIT, IntelliJ, Firebase, Visual Studio, Hugging Face, 
                          Ollama, Postman, JMeter, Antigravity
\u2022 Coursework            : OOPS, ASP .NET

PROJECTS:
--------------------------------------------------------------------------------
1. Generative AI Tutor & Adaptive Learning Platform | Intelligent 1-on-1 AI Tutoring System
   Link: https://aitutor.nallukumar.dev
   \u2022 Developed a production-grade AI Tutoring System implementing a robust
     Retrieval-Augmented Generation (RAG) pipeline to provide personalized, 24/7
     conversational learning support.
   \u2022 Engineered core RAG logic, text processing, and ChromaDB vector storage
     integration to enforce strict zero-hallucination guardrails and deliver
     accurate, context-aware responses.

2. Mind Buddy | Mental Health CBT Tracker Web App
   Link: http://nallukumar.dev/mind-buddy
   \u2022 Designed and developed a responsive single-page application focused on mental
     health tracking using Cognitive Behavioural Therapy (CBT) principles.
   \u2022 Implemented modular React components for dynamic UI rendering, utilized state
     management for real-time mood and thought tracking, and applied semantic HTML
     and modern CSS, ReactJS for accessibility and mobile-first responsiveness.

3. You-Clone | A Frontend-Only YouTube UI clone
   Link: http://youtube.com/clone/nallukumar
   \u2022 Developed a responsive, frontend-only clone of the YouTube interface to
     demonstrate UI/UX design skills and modern web development practices.
   \u2022 Built using HTML, CSS. The project replicates YouTube's layout, navigation,
     and interactive elements. Focused on perfect design, accessibility, and
     component reusability.

4. Hash-Forge | A Simple, Secure and Stylish Password Generator
   Link: https://hashforge.security/keygen
   \u2022 Hash Forge is a sleek and responsive web app that generates strong, random
     passwords with customizable options.
   \u2022 Designed to blend simplicity with security, this project showcases core
     front-end development skills using modern web technologies.

EDUCATION:
--------------------------------------------------------------------------------
\u2022 B.E Computer Science and Engineering
  PSNA College of Engineering and Technology, Dindigul
  2022 - 2025

\u2022 Diploma Graduation
  TKSPC Theni
  2019 - 2021

\u2022 SSLC
  JC Matric School Periyakulam
  2017 - 2018
================================================================================`;
const NotepadApp = () => {
  const [content, setContent] = useState(RESUME_TEXT);
  const [wordWrap, setWordWrap] = useState(true);
  const handleDownload = () => {
    sounds.playClick();
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "NALLUKUMAR_RAVICHANDRAN_Resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };
  const linesCount = content.split("\n").length;
  const charsCount = content.length;
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-h-0 bg-white font-sans text-xs select-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 px-2 py-1 bg-[#f0f0e8] border-b border-zinc-300 text-zinc-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer", children: [
        /* @__PURE__ */ jsx("span", { className: "hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded", children: "File" }),
        /* @__PURE__ */ jsxs("div", { className: "hidden group-hover:flex flex-col absolute top-full left-0 bg-[#f0f0e8] border border-zinc-400 shadow-md py-1 w-36 z-50", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                sounds.playClick();
                setContent("");
              },
              className: "text-left px-3 py-1 hover:bg-blue-600 hover:text-white",
              children: "New"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                sounds.playClick();
                setContent(RESUME_TEXT);
              },
              className: "text-left px-3 py-1 hover:bg-blue-600 hover:text-white",
              children: "Reset to Resume"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleDownload,
              className: "text-left px-3 py-1 hover:bg-blue-600 hover:text-white font-bold",
              children: "Save As .txt..."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer", children: [
        /* @__PURE__ */ jsx("span", { className: "hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded", children: "Format" }),
        /* @__PURE__ */ jsx("div", { className: "hidden group-hover:flex flex-col absolute top-full left-0 bg-[#f0f0e8] border border-zinc-400 shadow-md py-1 w-36 z-50", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setWordWrap(!wordWrap);
            },
            className: "text-left px-3 py-1 hover:bg-blue-600 hover:text-white flex justify-between",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Word Wrap" }),
              /* @__PURE__ */ jsx("span", { children: wordWrap ? "\u2713" : "" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleDownload,
          className: "hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded ml-auto text-blue-800 font-bold",
          children: "Export Resume (.txt)"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        value: content,
        onChange: (e) => setContent(e.target.value),
        spellCheck: false,
        className: `flex-1 p-3 outline-hidden border-none resize-none font-mono text-xs text-zinc-900 leading-relaxed ${wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"}`,
        style: { fontFamily: '"Lucida Console", "Courier New", monospace' }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "h-5 px-3 bg-[#f0f0e8] border-t border-zinc-300 flex justify-end items-center text-[10px] text-zinc-600 gap-6", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Lines: ",
        linesCount
      ] }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Characters: ",
        charsCount
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-mono", children: "UTF-8" })
    ] })
  ] });
};
export {
  NotepadApp
};
