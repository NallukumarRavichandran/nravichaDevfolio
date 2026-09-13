import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import {
  Globe,
  Mail,
  Music,
  FileText,
  LayoutGrid,
  Calculator,
  Bomb,
  Terminal,
  Folder,
  ShieldCheck,
  Image,
  LogOut,
  Power,
  ChevronRight,
  Sliders,
  ExternalLink,
  Search,
  HardDrive,
  Code2,
  Sparkles
} from "lucide-react";
import { sounds } from "../utils/audio";
const ALL_PROGRAMS_LIST = [
  { id: "ie", name: "Internet Explorer", subtitle: "Web Portfolio & Live Interactive Demos", icon: Globe, category: "Internet" },
  { id: "explorer", name: "My Computer (File Explorer)", subtitle: "Browse drives, files & credentials", icon: HardDrive, category: "System" },
  { id: "projects", name: "Featured Projects Showcase", subtitle: "AI Tutor, Mind Buddy, You-Clone, Hash-Forge", icon: Sparkles, category: "Portfolio" },
  { id: "outlook", name: "Outlook Express", subtitle: "Email kumar10naidu@gmail.com", icon: Mail, category: "Internet" },
  { id: "mediaplayer", name: "Windows Media Player 9", subtitle: "Interactive Synthesized Lo-Fi Music", icon: Music, category: "Media" },
  { id: "notepad", name: "Notepad", subtitle: "Nallukumar_R_Resume.txt", icon: FileText, category: "Accessories" },
  { id: "calculator", name: "Calculator", subtitle: "Standard & Scientific Operations", icon: Calculator, category: "Accessories" },
  { id: "paint", name: "Paint", subtitle: "Draw, sketch & export artwork", icon: LayoutGrid, category: "Accessories" },
  { id: "minesweeper", name: "Minesweeper", subtitle: "Classic Windows Puzzle Game", icon: Bomb, category: "Games" },
  { id: "cmd", name: "Command Prompt", subtitle: "Interactive CLI terminal with commands", icon: Terminal, category: "System" },
  { id: "control", name: "Control Panel", subtitle: "System Specs, Themes & Skills", icon: Sliders, category: "System" }
];
const StartMenu = ({
  onClose,
  onOpenApp,
  onOpenProperties,
  onOpenRun,
  onTurnOff,
  onLogOff
}) => {
  const [allProgramsOpen, setAllProgramsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleLaunch = (id) => {
    sounds.playClick();
    onOpenApp(id);
    onClose();
  };
  const filteredPrograms = searchQuery ? ALL_PROGRAMS_LIST.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredPrograms.length > 0) {
      handleLaunch(filteredPrograms[0].id);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: (e) => e.stopPropagation(),
      className: "fixed bottom-[30px] left-0 z-[9995] w-96 max-w-[95vw] bg-white shadow-2xl border-2 border-[#0058e6] flex flex-col font-sans select-none overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-b from-[#3d95ff] via-[#0058e6] to-[#245edb] p-2.5 flex items-center gap-3 border-b border-blue-400", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#dbe8f7] border-2 border-white flex items-center justify-center text-[#245edb] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#7890ad] font-bold text-base", children: "NR" }),
          /* @__PURE__ */ jsxs("div", { className: "text-white flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] truncate", children: "Nallukumar Ravichandran" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-blue-100 truncate", children: "Software Developer Engineer @ Giritronics \u2022 Ex-Amex" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "bg-[#d3e5fa] px-2 py-1.5 border-b border-blue-200 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5 absolute left-2 top-2 text-zinc-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Type here to search apps, files, or tools...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full pl-7 pr-2 py-1 bg-white border border-zinc-500 text-xs outline-hidden text-zinc-900 focus:border-blue-500 shadow-inner"
              }
            )
          ] }),
          searchQuery && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchQuery(""),
              className: "text-[11px] text-blue-800 hover:underline px-1",
              children: "Clear"
            }
          )
        ] }),
        searchQuery ? /* @__PURE__ */ jsxs("div", { className: "p-2 min-h-[360px] max-h-[420px] overflow-y-auto bg-white", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-zinc-500 uppercase px-2 mb-1.5", children: [
            "Search Results (",
            filteredPrograms.length,
            ")"
          ] }),
          filteredPrograms.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-4 text-center text-zinc-500 text-xs", children: [
            'No matching programs or commands found for "',
            searchQuery,
            '".'
          ] }) : filteredPrograms.map((p) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleLaunch(p.id),
              className: "w-full text-left p-2 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group mb-1 border border-transparent hover:border-blue-300 transition",
              children: [
                /* @__PURE__ */ jsx(p.icon, { className: "h-5 w-5 shrink-0 text-[#245edb] group-hover:text-white" }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-900 group-hover:text-white truncate", children: p.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-zinc-500 group-hover:text-blue-100 truncate", children: p.subtitle })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 group-hover:bg-white/20 text-zinc-600 group-hover:text-white", children: p.category })
              ]
            },
            p.id
          ))
        ] }) : (
          /* Standard Two Column Body */
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 min-h-[360px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-1/2 p-2 bg-white flex flex-col justify-between border-r border-zinc-200", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("ie"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-transparent group-hover:text-white shrink-0", children: /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "truncate", children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-900 group-hover:text-white", children: "Internet Explorer" }),
                        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-zinc-500 group-hover:text-blue-100 truncate", children: "Portfolio & Live Demos" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("projects"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded flex items-center justify-center bg-amber-50 text-amber-600 group-hover:bg-transparent group-hover:text-white shrink-0", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "truncate", children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-900 group-hover:text-white", children: "Featured Projects" }),
                        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-zinc-500 group-hover:text-blue-100 truncate", children: "AI Tutor, Mind Buddy..." })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("outlook"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-transparent group-hover:text-white shrink-0", children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "truncate", children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-900 group-hover:text-white", children: "Outlook Express" }),
                        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-zinc-500 group-hover:text-blue-100", children: "Send direct message" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("mediaplayer"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2.5 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded flex items-center justify-center bg-cyan-50 text-cyan-600 group-hover:bg-transparent group-hover:text-white shrink-0", children: /* @__PURE__ */ jsx(Music, { className: "w-4 h-4" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "truncate", children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-900 group-hover:text-white", children: "Media Player 9" }),
                        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-zinc-500 group-hover:text-blue-100", children: "Lo-Fi Synth Tracks" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-zinc-200 my-1" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("notepad"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-blue-600 group-hover:text-white shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-800 group-hover:text-white font-medium", children: "Resume (Notepad)" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("calculator"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4 text-amber-600 group-hover:text-white shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-800 group-hover:text-white font-medium", children: "Calculator" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("paint"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx(LayoutGrid, { className: "w-4 h-4 text-purple-600 group-hover:text-white shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-800 group-hover:text-white font-medium", children: "Paint" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("minesweeper"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx(Bomb, { className: "w-4 h-4 text-red-600 group-hover:text-white shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-800 group-hover:text-white font-medium", children: "Minesweeper" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleLaunch("cmd"),
                    className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx(Terminal, { className: "w-4 h-4 text-zinc-800 group-hover:text-white shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-800 group-hover:text-white font-medium", children: "Command Prompt" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-t border-zinc-200 pt-1 mt-1 relative", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      sounds.playClick();
                      setAllProgramsOpen(!allProgramsOpen);
                    },
                    className: "w-full p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center justify-between font-bold text-xs text-zinc-900 group cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: "All Programs" }),
                      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-green-600 group-hover:text-white" })
                    ]
                  }
                ),
                allProgramsOpen && /* @__PURE__ */ jsxs("div", { className: "absolute left-full bottom-0 w-56 bg-white border border-zinc-400 shadow-2xl rounded py-1 z-50", children: [
                  /* @__PURE__ */ jsx("div", { className: "px-3 py-1 font-bold text-[10px] text-zinc-400 uppercase", children: "Core Applications" }),
                  ALL_PROGRAMS_LIST.map((item) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => handleLaunch(item.id),
                      className: "w-full text-left px-3 py-1.5 hover:bg-[#0a246a] hover:text-white text-xs flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4 shrink-0 text-[#245edb]" }),
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: item.name })
                      ]
                    },
                    item.id
                  ))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-1/2 p-2 bg-[#d3e5fa] space-y-1 text-zinc-800", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleLaunch("explorer"),
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group",
                  children: [
                    /* @__PURE__ */ jsx(HardDrive, { className: "w-4 h-4 text-blue-700 group-hover:text-white" }),
                    /* @__PURE__ */ jsx("span", { children: "My Computer" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleLaunch("notepad"),
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group",
                  children: [
                    /* @__PURE__ */ jsx(Folder, { className: "w-4 h-4 text-amber-600 group-hover:text-white" }),
                    /* @__PURE__ */ jsx("span", { children: "My Documents" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleLaunch("projects"),
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group",
                  children: [
                    /* @__PURE__ */ jsx(Code2, { className: "w-4 h-4 text-indigo-700 group-hover:text-white" }),
                    /* @__PURE__ */ jsx("span", { children: "My Projects" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleLaunch("control"),
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group",
                  children: [
                    /* @__PURE__ */ jsx(Sliders, { className: "w-4 h-4 text-blue-700 group-hover:text-white" }),
                    /* @__PURE__ */ jsx("span", { children: "Control Panel" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    sounds.playClick();
                    onOpenProperties();
                    onClose();
                  },
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer font-bold text-xs group",
                  children: [
                    /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 text-sky-600 group-hover:text-white" }),
                    /* @__PURE__ */ jsx("span", { children: "Display Properties" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-blue-200 my-1.5" }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://github.com/NallukumarRavichandran",
                  target: "_blank",
                  rel: "noreferrer",
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center justify-between cursor-pointer text-xs group",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-zinc-900 group-hover:text-white", children: "GitHub Profile \u2197" }),
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 text-zinc-500 group-hover:text-white" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true",
                  target: "_blank",
                  rel: "noreferrer",
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center justify-between cursor-pointer text-xs group",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-zinc-900 group-hover:text-white", children: "LinkedIn Profile \u2197" }),
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 text-blue-600 group-hover:text-white" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-blue-200 my-1.5" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleLaunch("control"),
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer text-xs group",
                  children: [
                    /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-600 group-hover:text-white" }),
                    /* @__PURE__ */ jsx("span", { children: "Security Center" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    sounds.playClick();
                    onOpenRun();
                    onClose();
                  },
                  className: "w-full text-left p-1.5 hover:bg-[#2f71cd] hover:text-white rounded flex items-center gap-2 cursor-pointer text-xs group font-semibold text-zinc-900",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm", children: "\u{1F3C3}" }),
                    /* @__PURE__ */ jsx("span", { children: "Run..." })
                  ]
                }
              )
            ] })
          ] })
        ),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-b from-[#3d95ff] via-[#0058e6] to-[#245edb] p-2 flex justify-end gap-3 text-white text-xs border-t border-blue-400", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                sounds.playClick();
                onLogOff();
                onClose();
              },
              className: "flex items-center gap-1.5 px-2 py-1 hover:bg-white/20 rounded font-bold cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center", children: /* @__PURE__ */ jsx(LogOut, { className: "w-3 h-3 text-white" }) }),
                /* @__PURE__ */ jsx("span", { children: "Log Off" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                sounds.playClick();
                onTurnOff();
                onClose();
              },
              className: "flex items-center gap-1.5 px-2 py-1 hover:bg-white/20 rounded font-bold cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-red-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(Power, { className: "w-3 h-3 text-white" }) }),
                /* @__PURE__ */ jsx("span", { children: "Turn Off" })
              ]
            }
          )
        ] })
      ]
    }
  );
};
export {
  StartMenu
};
