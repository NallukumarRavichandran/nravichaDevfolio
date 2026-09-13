import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  X,
  Home,
  Search,
  Star,
  Clock,
  Lock,
  ExternalLink,
  Plus,
  Check
} from "lucide-react";
import { sounds } from "../../utils/audio";
const DEFAULT_BOOKMARKS = [
  {
    id: "wikipedia",
    title: "Wikipedia (Mobile Encyclopedia)",
    url: "https://en.m.wikipedia.org",
    category: "Knowledge",
    description: "The Free Encyclopedia with millions of articles and zero iframe restrictions.",
    iconText: "\u{1F4D6}"
  },
  {
    id: "duckduckgo",
    title: "DuckDuckGo Search Engine",
    url: "https://duckduckgo.com",
    category: "Search",
    description: "Privacy-first web search engine for finding anything on the real internet.",
    iconText: "\u{1F986}"
  },
  {
    id: "hackernews",
    title: "Hacker News (Y Combinator)",
    url: "https://news.ycombinator.com",
    category: "Technology",
    description: "Real-time computer science, engineering, and startup discussions.",
    iconText: "\u{1F4F0}"
  },
  {
    id: "devdocs",
    title: "DevDocs API Documentation",
    url: "https://devdocs.io",
    category: "Developer",
    description: "Fast, offline-capable documentation for React, Java, TypeScript, and APIs.",
    iconText: "\u{1F4BB}"
  },
  {
    id: "osm",
    title: "OpenStreetMap Global Map",
    url: "https://www.openstreetmap.org/export/embed.html?bbox=-122.5%2C37.7%2C-122.3%2C37.9&layer=mapnik",
    category: "Maps",
    description: "Open-source interactive world map viewer.",
    iconText: "\u{1F5FA}\uFE0F"
  },
  {
    id: "archive",
    title: "Internet Archive Wayback Machine",
    url: "https://archive.org",
    category: "Archive",
    description: "Explore billions of saved web pages across digital history.",
    iconText: "\u{1F3DB}\uFE0F"
  },
  {
    id: "w3schools",
    title: "W3Schools Web Tutorials",
    url: "https://www.w3schools.com",
    category: "Developer",
    description: "HTML, CSS, JavaScript, and Java interactive programming tutorials.",
    iconText: "\u{1F393}"
  },
  {
    id: "codepen",
    title: "CodePen HTML5 Sandbox",
    url: "https://codepen.io/pen/",
    category: "Developer",
    description: "Live frontend coding playground and web canvas experimenter.",
    iconText: "\u270F\uFE0F"
  },
  {
    id: "github",
    title: "Nallukumar Ravichandran GitHub",
    url: "https://github.com/NallukumarRavichandran",
    category: "Portfolio",
    description: "Full stack Java & AI repositories, commits, and open-source packages.",
    iconText: "\u{1F419}"
  },
  {
    id: "linkedin",
    title: "Nallukumar Ravichandran LinkedIn",
    url: "https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true",
    category: "Portfolio",
    description: "Professional experience at Giritronics and American Express.",
    iconText: "\u{1F4BC}"
  },
  {
    id: "html5test",
    title: "HTML5 Browser Standards Test",
    url: "https://html5test.co",
    category: "Tools",
    description: "Verify browser engine capabilities and modern web standard compliance.",
    iconText: "\u26A1"
  },
  {
    id: "google",
    title: "Google Search Portal",
    url: "https://www.google.com",
    category: "Search",
    description: "World-wide search engine portal for queries and news.",
    iconText: "\u{1F50D}"
  }
];
const InternetExplorerApp = ({ initialUrl }) => {
  const [tabs, setTabs] = useState([
    {
      id: "tab-1",
      title: initialUrl ? getTitleFromUrl(initialUrl) : "MSN.com - Internet Explorer",
      url: initialUrl || "about:home",
      isLoading: false,
      history: [initialUrl || "about:home"],
      historyIndex: 0
    }
  ]);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [addressInput, setAddressInput] = useState(initialUrl || "about:home");
  const [bookmarks, setBookmarks] = useState(DEFAULT_BOOKMARKS);
  const [historyList, setHistoryList] = useState([
    {
      id: "h-1",
      title: "MSN.com - Internet Explorer Start Portal",
      url: "about:home",
      timestamp: "Just now"
    }
  ]);
  const [activeSidePanel, setActiveSidePanel] = useState("none");
  const [activeMenu, setActiveMenu] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [homeSearchQuery, setHomeSearchQuery] = useState("");
  const [homeSearchProvider, setHomeSearchProvider] = useState("duckduckgo");
  const [wikiQuery, setWikiQuery] = useState("World Wide Web");
  const [wikiResult, setWikiResult] = useState(null);
  const [wikiLoading, setWikiLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Done");
  const [loadingProgress, setLoadingProgress] = useState(100);
  const iframeRef = useRef(null);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  function getTitleFromUrl(url) {
    if (url === "about:home") return "MSN.com - Internet Explorer";
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "");
      return `${host} - Internet Explorer`;
    } catch {
      return `${url} - Internet Explorer`;
    }
  }
  useEffect(() => {
    if (activeTab) {
      setAddressInput(activeTab.url);
    }
  }, [activeTabId, activeTab?.url]);
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data || typeof event.data !== "object") return;
      if (event.data.type === "IE_PAGE_LOADED") {
        const loadedUrl = event.data.targetUrl || event.data.url;
        const pageTitle = event.data.title;
        if (loadedUrl) {
          setTabs(
            (prev) => prev.map(
              (t) => t.id === activeTabId ? {
                ...t,
                url: loadedUrl,
                title: pageTitle || getTitleFromUrl(loadedUrl),
                isLoading: false
              } : t
            )
          );
          setAddressInput(loadedUrl);
          setStatusMessage("Done");
          setLoadingProgress(100);
        }
      } else if (event.data.type === "IE_NAVIGATE") {
        if (event.data.url) {
          navigateTo(event.data.url);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [activeTabId]);
  useEffect(() => {
    fetchWikipediaSummary("World Wide Web");
  }, []);
  const fetchWikipediaSummary = async (topic) => {
    setWikiLoading(true);
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
      if (res.ok) {
        const data = await res.json();
        setWikiResult(data);
      }
    } catch {
    } finally {
      setWikiLoading(false);
    }
  };
  const navigateTo = (url) => {
    sounds.playClick();
    let finalUrl = url.trim();
    if (finalUrl !== "about:home") {
      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        if (finalUrl.includes(".") && !finalUrl.includes(" ")) {
          finalUrl = `https://${finalUrl}`;
        } else {
          finalUrl = `https://duckduckgo.com/?q=${encodeURIComponent(finalUrl)}`;
        }
      }
    }
    const title = getTitleFromUrl(finalUrl);
    setTabs(
      (prevTabs) => prevTabs.map((tab) => {
        if (tab.id === activeTabId) {
          const newHistory = [...tab.history.slice(0, tab.historyIndex + 1), finalUrl];
          return {
            ...tab,
            url: finalUrl,
            title,
            isLoading: finalUrl !== "about:home",
            history: newHistory,
            historyIndex: newHistory.length - 1
          };
        }
        return tab;
      })
    );
    setAddressInput(finalUrl);
    setStatusMessage(`Connecting to ${finalUrl}...`);
    setLoadingProgress(35);
    setHistoryList((prev) => [
      {
        id: Date.now().toString(),
        title,
        url: finalUrl,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      },
      ...prev.slice(0, 49)
    ]);
    setTimeout(() => {
      setLoadingProgress(80);
      setStatusMessage(`Transferring data from ${finalUrl}...`);
      setTimeout(() => {
        setTabs(
          (prev) => prev.map((t) => t.id === activeTabId ? { ...t, isLoading: false } : t)
        );
        setStatusMessage("Done");
        setLoadingProgress(100);
      }, 500);
    }, 400);
  };
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    navigateTo(addressInput);
  };
  const handleBack = () => {
    if (!activeTab || activeTab.historyIndex <= 0) return;
    sounds.playClick();
    const newIndex = activeTab.historyIndex - 1;
    const targetUrl = activeTab.history[newIndex];
    setTabs(
      (prev) => prev.map(
        (t) => t.id === activeTabId ? {
          ...t,
          url: targetUrl,
          title: getTitleFromUrl(targetUrl),
          historyIndex: newIndex
        } : t
      )
    );
    setAddressInput(targetUrl);
  };
  const handleForward = () => {
    if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;
    sounds.playClick();
    const newIndex = activeTab.historyIndex + 1;
    const targetUrl = activeTab.history[newIndex];
    setTabs(
      (prev) => prev.map(
        (t) => t.id === activeTabId ? {
          ...t,
          url: targetUrl,
          title: getTitleFromUrl(targetUrl),
          historyIndex: newIndex
        } : t
      )
    );
    setAddressInput(targetUrl);
  };
  const handleRefresh = () => {
    sounds.playClick();
    if (!activeTab) return;
    setStatusMessage(`Reloading ${activeTab.url}...`);
    setTabs(
      (prev) => prev.map((t) => t.id === activeTabId ? { ...t, isLoading: true } : t)
    );
    setTimeout(() => {
      setTabs(
        (prev) => prev.map((t) => t.id === activeTabId ? { ...t, isLoading: false } : t)
      );
      setStatusMessage("Done");
    }, 600);
  };
  const handleStop = () => {
    sounds.playClick();
    setTabs(
      (prev) => prev.map((t) => t.id === activeTabId ? { ...t, isLoading: false } : t)
    );
    setStatusMessage("Done");
    setLoadingProgress(100);
  };
  const handleHome = () => {
    navigateTo("about:home");
  };
  const handleNewTab = () => {
    sounds.playClick();
    const newTabId = `tab-${Date.now()}`;
    const newTab = {
      id: newTabId,
      title: "MSN.com - Internet Explorer",
      url: "about:home",
      isLoading: false,
      history: ["about:home"],
      historyIndex: 0
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTabId);
    setAddressInput("about:home");
  };
  const handleCloseTab = (id, e) => {
    e.stopPropagation();
    sounds.playClick();
    if (tabs.length === 1) {
      setTabs([
        {
          id: `tab-${Date.now()}`,
          title: "MSN.com - Internet Explorer",
          url: "about:home",
          isLoading: false,
          history: ["about:home"],
          historyIndex: 0
        }
      ]);
      setAddressInput("about:home");
      return;
    }
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
      setAddressInput(newTabs[newTabs.length - 1].url);
    }
  };
  const handleAddBookmark = () => {
    sounds.playClick();
    if (activeTab.url === "about:home") return;
    const exists = bookmarks.some((b) => b.url === activeTab.url);
    if (exists) return;
    const newBm = {
      id: Date.now().toString(),
      title: activeTab.title.replace(" - Internet Explorer", ""),
      url: activeTab.url,
      category: "Saved Favorites",
      description: `Saved from ${activeTab.url}`,
      iconText: "\u2B50"
    };
    setBookmarks((prev) => [newBm, ...prev]);
    setStatusMessage("Added to Favorites");
  };
  const openExternalWindow = (url) => {
    sounds.playClick();
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleCopyUrl = () => {
    sounds.playClick();
    navigator.clipboard.writeText(activeTab.url);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2e3);
  };
  const handleHomeSearch = (e) => {
    e.preventDefault();
    if (!homeSearchQuery.trim()) return;
    let searchUrl = "";
    const query = encodeURIComponent(homeSearchQuery.trim());
    switch (homeSearchProvider) {
      case "duckduckgo":
        searchUrl = `https://duckduckgo.com/?q=${query}`;
        break;
      case "google":
        searchUrl = `https://www.google.com/search?q=${query}`;
        break;
      case "bing":
        searchUrl = `https://www.bing.com/search?q=${query}`;
        break;
      case "wikipedia":
        searchUrl = `https://en.m.wikipedia.org/wiki/Special:Search?search=${query}`;
        break;
    }
    navigateTo(searchUrl);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => setActiveMenu(null),
      className: "flex flex-col h-full bg-[#ece9d8] text-zinc-900 font-sans select-none overflow-hidden text-xs",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] border-b border-zinc-300 px-2 py-0.5 flex items-center gap-3 text-zinc-800 text-[11px] relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === "file" ? null : "file");
                },
                className: `px-1.5 py-0.5 rounded cursor-pointer ${activeMenu === "file" ? "bg-[#0a246a] text-white" : "hover:bg-[#316ac5] hover:text-white"}`,
                children: "File"
              }
            ),
            activeMenu === "file" && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 mt-0.5 w-48 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleNewTab,
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "New Tab" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-zinc-400", children: "Ctrl+T" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => navigateTo("about:home"),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white",
                  children: "Open Homepage"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-zinc-200 my-1" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => window.print(),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "Print..." }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-zinc-400", children: "Ctrl+P" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleCopyUrl,
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white",
                  children: "Copy Address to Clipboard"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === "view" ? null : "view");
                },
                className: `px-1.5 py-0.5 rounded cursor-pointer ${activeMenu === "view" ? "bg-[#0a246a] text-white" : "hover:bg-[#316ac5] hover:text-white"}`,
                children: "View"
              }
            ),
            activeMenu === "view" && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 mt-0.5 w-44 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setZoomLevel((prev) => Math.min(prev + 25, 200)),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "Zoom In" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-zinc-400", children: "+25%" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setZoomLevel((prev) => Math.max(prev - 25, 50)),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "Zoom Out" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-zinc-400", children: "-25%" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setZoomLevel(100),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white",
                  children: "Actual Size (100%)"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-zinc-200 my-1" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleRefresh,
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white",
                  children: "Refresh Page (F5)"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === "favorites" ? null : "favorites");
                },
                className: `px-1.5 py-0.5 rounded cursor-pointer ${activeMenu === "favorites" ? "bg-[#0a246a] text-white" : "hover:bg-[#316ac5] hover:text-white"}`,
                children: "Favorites"
              }
            ),
            activeMenu === "favorites" && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 mt-0.5 w-56 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleAddBookmark,
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white font-semibold text-blue-700 hover:text-white flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 text-amber-500 fill-amber-400" }),
                    /* @__PURE__ */ jsx("span", { children: "Add to Favorites..." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-zinc-200 my-1" }),
              /* @__PURE__ */ jsx("div", { className: "px-3 py-0.5 text-[10px] text-zinc-400 uppercase font-bold", children: "Quick Links" }),
              bookmarks.slice(0, 8).map((b) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => navigateTo(b.url),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 truncate",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: b.iconText }),
                    /* @__PURE__ */ jsx("span", { className: "truncate", children: b.title })
                  ]
                },
                b.id
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === "tools" ? null : "tools");
                },
                className: `px-1.5 py-0.5 rounded cursor-pointer ${activeMenu === "tools" ? "bg-[#0a246a] text-white" : "hover:bg-[#316ac5] hover:text-white"}`,
                children: "Tools"
              }
            ),
            activeMenu === "tools" && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 mt-0.5 w-52 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => openExternalWindow(activeTab.url),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "Launch in Real Tab" }),
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 text-zinc-400" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setHistoryList([]);
                    setStatusMessage("History cleared");
                  },
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white",
                  children: "Clear Browsing History"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-zinc-200 my-1" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => navigateTo("https://html5test.co"),
                  className: "w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white",
                  children: "Test HTML5 Compliance"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === "help" ? null : "help");
                },
                className: `px-1.5 py-0.5 rounded cursor-pointer ${activeMenu === "help" ? "bg-[#0a246a] text-white" : "hover:bg-[#316ac5] hover:text-white"}`,
                children: "Help"
              }
            ),
            activeMenu === "help" && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 mt-0.5 w-60 bg-white border border-zinc-400 shadow-xl rounded p-2 z-50 text-zinc-900 space-y-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-xs text-blue-900 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-blue-600" }),
                /* @__PURE__ */ jsx("span", { children: "Internet Explorer 6.0 Real Browser" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-zinc-600 leading-snug", children: "Fully functional web browser capable of navigating live websites, searching DuckDuckGo/Google, browsing Wikipedia, and managing tabs and bookmarks." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-b from-[#f9f8f4] to-[#e4e1d3] border-b border-zinc-300 px-2 py-1 flex items-center justify-between gap-1 shadow-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleBack,
                disabled: !activeTab || activeTab.historyIndex <= 0,
                className: `flex items-center gap-1 px-2 py-1 rounded border ${!activeTab || activeTab.historyIndex <= 0 ? "opacity-40 cursor-not-allowed border-transparent text-zinc-400" : "hover:bg-[#d8e4f8] hover:border-[#7da2ce] border-transparent text-zinc-800 cursor-pointer active:scale-95"}`,
                title: "Back (Alt + Left Arrow)",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-xs hidden sm:inline", children: "Back" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleForward,
                disabled: !activeTab || activeTab.historyIndex >= activeTab.history.length - 1,
                className: `flex items-center gap-1 px-2 py-1 rounded border ${!activeTab || activeTab.historyIndex >= activeTab.history.length - 1 ? "opacity-40 cursor-not-allowed border-transparent text-zinc-400" : "hover:bg-[#d8e4f8] hover:border-[#7da2ce] border-transparent text-zinc-800 cursor-pointer active:scale-95"}`,
                title: "Forward (Alt + Right Arrow)",
                children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" }) })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "h-5 w-[1px] bg-zinc-300 mx-0.5" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleStop,
                className: "flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800 cursor-pointer",
                title: "Stop Loading",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }) }),
                  /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Stop" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleRefresh,
                className: "flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800 cursor-pointer",
                title: "Refresh Page",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx(RefreshCw, { className: `w-3.5 h-3.5 ${activeTab?.isLoading ? "animate-spin" : ""}` }) }),
                  /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Refresh" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleHome,
                className: "flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800 cursor-pointer",
                title: "Home Page",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx(Home, { className: "w-3.5 h-3.5" }) }),
                  /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Home" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "h-5 w-[1px] bg-zinc-300 mx-0.5" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  sounds.playClick();
                  setActiveSidePanel(activeSidePanel === "search" ? "none" : "search");
                },
                className: `flex items-center gap-1 px-2 py-1 rounded border ${activeSidePanel === "search" ? "bg-[#d8e4f8] border-[#7da2ce] font-bold text-blue-900 shadow-inner" : "border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800"} cursor-pointer`,
                title: "Toggle Web Search Sidebar",
                children: [
                  /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-blue-700" }),
                  /* @__PURE__ */ jsx("span", { children: "Search" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  sounds.playClick();
                  setActiveSidePanel(activeSidePanel === "favorites" ? "none" : "favorites");
                },
                className: `flex items-center gap-1 px-2 py-1 rounded border ${activeSidePanel === "favorites" ? "bg-[#d8e4f8] border-[#7da2ce] font-bold text-blue-900 shadow-inner" : "border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800"} cursor-pointer`,
                title: "Toggle Favorites Sidebar",
                children: [
                  /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-amber-500 fill-amber-400" }),
                  /* @__PURE__ */ jsx("span", { children: "Favorites" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  sounds.playClick();
                  setActiveSidePanel(activeSidePanel === "history" ? "none" : "history");
                },
                className: `flex items-center gap-1 px-2 py-1 rounded border ${activeSidePanel === "history" ? "bg-[#d8e4f8] border-[#7da2ce] font-bold text-blue-900 shadow-inner" : "border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800"} cursor-pointer`,
                title: "Toggle History Sidebar",
                children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-purple-700" }),
                  /* @__PURE__ */ jsx("span", { children: "History" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pr-1", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                onClick: () => openExternalWindow(activeTab.url),
                title: "Open Current Page in External Real Browser Tab",
                className: "w-7 h-7 rounded bg-white/70 hover:bg-white border border-zinc-400 flex items-center justify-center cursor-pointer shadow-xs group",
                children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" })
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-7 h-7 rounded border border-zinc-400 bg-gradient-to-br from-[#1b6eed] to-[#003399] flex items-center justify-center text-white shadow-inner select-none ${activeTab?.isLoading ? "animate-pulse ring-2 ring-yellow-400" : ""}`,
                title: "Windows Internet Explorer",
                children: /* @__PURE__ */ jsx(Globe, { className: `w-4 h-4 ${activeTab?.isLoading ? "animate-spin" : ""}` })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] border-b border-zinc-300 px-2 py-1 flex items-center gap-2 shadow-inner", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-zinc-700 shrink-0 text-xs", children: "Address" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleAddressSubmit, className: "flex-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white border border-zinc-500 rounded-xs px-2 py-1 flex items-center gap-1.5 shadow-inner focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400", children: [
              activeTab.url.startsWith("https://") ? /* @__PURE__ */ jsx("span", { title: "Secure HTTPS Connection", className: "shrink-0 flex items-center", children: /* @__PURE__ */ jsx(Lock, { className: "w-3.5 h-3.5 text-emerald-600" }) }) : /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-zinc-400 shrink-0" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: addressInput,
                  onChange: (e) => setAddressInput(e.target.value),
                  placeholder: "Enter a website URL (e.g. en.m.wikipedia.org) or search the web...",
                  className: "w-full text-xs text-zinc-900 outline-hidden bg-transparent font-sans"
                }
              ),
              addressInput && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setAddressInput(""),
                  className: "text-zinc-400 hover:text-zinc-600 px-1 cursor-pointer",
                  title: "Clear address bar",
                  children: "\u2715"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                className: "px-3 py-1 bg-gradient-to-b from-[#55ba54] to-[#2c8d2b] hover:from-[#62ce61] hover:to-[#339e32] active:from-[#2c8d2b] text-white rounded-xs border border-[#1e6f1d] flex items-center gap-1 font-bold text-xs cursor-pointer shadow-xs",
                title: "Go to URL",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Go" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 stroke-[3]" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleAddBookmark,
              className: "p-1 hover:bg-zinc-200 border border-zinc-400 rounded-xs cursor-pointer",
              title: "Add to Favorites",
              children: /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 text-amber-500 fill-amber-400" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#f0eee4] border-b border-zinc-300 px-2 py-0.5 flex items-center gap-1 overflow-x-auto text-[11px] text-zinc-700", children: [
          /* @__PURE__ */ jsx("span", { className: "text-zinc-400 font-semibold shrink-0 mr-1", children: "Links:" }),
          [
            { label: "MSN Portal", url: "about:home", icon: "\u{1F3E0}" },
            { label: "Wikipedia", url: "https://en.m.wikipedia.org", icon: "\u{1F4D6}" },
            { label: "DuckDuckGo", url: "https://duckduckgo.com", icon: "\u{1F986}" },
            { label: "Hacker News", url: "https://news.ycombinator.com", icon: "\u{1F4F0}" },
            { label: "DevDocs", url: "https://devdocs.io", icon: "\u{1F4BB}" },
            { label: "OpenStreetMap", url: "https://www.openstreetmap.org/export/embed.html?bbox=-122.5%2C37.7%2C-122.3%2C37.9&layer=mapnik", icon: "\u{1F5FA}\uFE0F" },
            { label: "Archive.org", url: "https://archive.org", icon: "\u{1F3DB}\uFE0F" },
            { label: "W3Schools", url: "https://www.w3schools.com", icon: "\u{1F393}" },
            { label: "GitHub", url: "https://github.com/NallukumarRavichandran", icon: "\u{1F419}" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true", icon: "\u{1F4BC}" }
          ].map((link) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => navigateTo(link.url),
              className: "px-2 py-0.5 hover:bg-white hover:border-zinc-300 rounded border border-transparent whitespace-nowrap cursor-pointer flex items-center gap-1 font-medium",
              children: [
                /* @__PURE__ */ jsx("span", { children: link.icon }),
                /* @__PURE__ */ jsx("span", { children: link.label })
              ]
            },
            link.label
          ))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#dcd9ce] border-b border-zinc-300 px-2 pt-1 flex items-center gap-1 overflow-x-auto", children: [
          tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => {
                  sounds.playClick();
                  setActiveTabId(tab.id);
                  setAddressInput(tab.url);
                },
                className: `max-w-[200px] min-w-[120px] px-2.5 py-1 rounded-t-md text-xs flex items-center justify-between gap-1.5 cursor-pointer border-t border-l border-r select-none transition ${isActive ? "bg-white border-zinc-400 text-zinc-900 font-bold shadow-xs relative top-[1px]" : "bg-[#d0cdc1] hover:bg-[#eae7dc] border-zinc-300 text-zinc-600"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 truncate", children: [
                    tab.isLoading ? /* @__PURE__ */ jsx(RefreshCw, { className: "w-3 h-3 animate-spin text-blue-600 shrink-0" }) : /* @__PURE__ */ jsx(Globe, { className: "w-3 h-3 text-blue-700 shrink-0" }),
                    /* @__PURE__ */ jsx("span", { className: "truncate", children: tab.title.replace(" - Internet Explorer", "") })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => handleCloseTab(tab.id, e),
                      className: "w-4 h-4 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-red-600 flex items-center justify-center text-[10px] shrink-0",
                      title: "Close tab",
                      children: "\u2715"
                    }
                  )
                ]
              },
              tab.id
            );
          }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleNewTab,
              className: "w-6 h-6 rounded-md hover:bg-white/80 border border-transparent hover:border-zinc-300 flex items-center justify-center text-zinc-700 cursor-pointer mb-0.5",
              title: "Open new tab (Ctrl+T)",
              children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex min-h-0 bg-white relative", children: [
          activeSidePanel !== "none" && /* @__PURE__ */ jsxs("div", { className: "w-64 bg-[#f0eee4] border-r border-zinc-300 flex flex-col shrink-0 z-10 shadow-md", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#e4e0d0] px-3 py-1.5 border-b border-zinc-300 flex items-center justify-between font-bold text-xs text-zinc-800", children: [
              /* @__PURE__ */ jsx("span", { className: "capitalize", children: activeSidePanel }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveSidePanel("none"),
                  className: "w-4 h-4 rounded hover:bg-zinc-300 text-zinc-600 flex items-center justify-center cursor-pointer",
                  children: "\u2715"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-2 space-y-2", children: [
              activeSidePanel === "search" && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[11px] text-zinc-600", children: "Search the web using DuckDuckGo, Google, or Wikipedia:" }),
                /* @__PURE__ */ jsxs(
                  "form",
                  {
                    onSubmit: (e) => {
                      e.preventDefault();
                      handleHomeSearch(e);
                    },
                    className: "space-y-2",
                    children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "Type search keywords...",
                          value: homeSearchQuery,
                          onChange: (e) => setHomeSearchQuery(e.target.value),
                          className: "w-full p-1.5 bg-white border border-zinc-400 rounded text-xs outline-hidden shadow-inner"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: homeSearchProvider,
                          onChange: (e) => setHomeSearchProvider(e.target.value),
                          className: "w-full p-1 bg-white border border-zinc-400 rounded text-xs",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "duckduckgo", children: "DuckDuckGo (Embed Friendly)" }),
                            /* @__PURE__ */ jsx("option", { value: "wikipedia", children: "Wikipedia Articles" }),
                            /* @__PURE__ */ jsx("option", { value: "google", children: "Google Web Search" }),
                            /* @__PURE__ */ jsx("option", { value: "bing", children: "Bing Search" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "submit",
                          className: "w-full py-1 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded font-bold text-xs cursor-pointer shadow-xs",
                          children: "Search"
                        }
                      )
                    ]
                  }
                )
              ] }),
              activeSidePanel === "favorites" && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-zinc-600 uppercase", children: "Your Favorites" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handleAddBookmark,
                      className: "text-blue-700 hover:underline text-[10px] font-semibold",
                      children: "+ Add current"
                    }
                  )
                ] }),
                bookmarks.map((b) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => navigateTo(b.url),
                    className: "p-2 bg-white hover:bg-blue-50 border border-zinc-200 rounded cursor-pointer group flex items-start gap-2 text-left",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-base shrink-0", children: b.iconText }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-900 group-hover:text-blue-700 truncate", children: b.title }),
                        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-zinc-500 truncate", children: b.url })
                      ] })
                    ]
                  },
                  b.id
                ))
              ] }),
              activeSidePanel === "history" && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-1 mb-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-zinc-600 uppercase", children: "Visited History" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setHistoryList([]),
                      className: "text-red-600 hover:underline text-[10px]",
                      children: "Clear"
                    }
                  )
                ] }),
                historyList.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-3 text-center text-zinc-400 text-xs", children: "No browsing history yet." }) : historyList.map((h) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => navigateTo(h.url),
                    className: "p-1.5 hover:bg-white rounded border border-transparent hover:border-zinc-200 cursor-pointer text-left",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-800 truncate", children: h.title }),
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] text-zinc-400", children: [
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: h.url }),
                        /* @__PURE__ */ jsx("span", { className: "shrink-0", children: h.timestamp })
                      ] })
                    ]
                  },
                  h.id
                ))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0 bg-white overflow-hidden relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#f8f9fa] border-b border-zinc-200 px-3 py-1 flex items-center justify-between text-xs shrink-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 truncate", children: [
                activeTab.url.startsWith("https://") ? /* @__PURE__ */ jsxs("span", { className: "px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Lock, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsx("span", { children: "HTTPS Secure" })
                ] }) : /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-600 text-[10px]", children: "Local Page" }),
                /* @__PURE__ */ jsx("span", { className: "text-zinc-600 font-mono text-[11px] truncate", children: activeTab.url })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleCopyUrl,
                    className: "px-2 py-0.5 rounded bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-700 text-[11px] flex items-center gap-1 cursor-pointer",
                    title: "Copy current URL",
                    children: copyFeedback ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-emerald-600" }),
                      /* @__PURE__ */ jsx("span", { className: "text-emerald-700 font-semibold", children: "Copied!" })
                    ] }) : /* @__PURE__ */ jsx("span", { children: "Copy Link" })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => openExternalWindow(activeTab.url),
                    className: "px-2.5 py-0.5 rounded bg-[#0058e6] hover:bg-[#0047b8] text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs",
                    title: "Open in your computer's real web browser",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: "Open in Real Tab" }),
                      /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto bg-white relative", children: [
              activeTab.url === "about:home" && /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-5xl mx-auto space-y-6 select-text", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#003399] via-[#0058e6] to-[#003399] text-white p-6 rounded-2xl shadow-lg border border-blue-400/40", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl shadow-inner", children: "\u{1F310}" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]", children: "Internet Explorer - World Wide Web Portal" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-100", children: "Search the live web, browse interactive encyclopedias, API docs, and portfolio repositories." })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxs("form", { onSubmit: handleHomeSearch, className: "mt-5 max-w-2xl", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex bg-white rounded-lg p-1 shadow-md border-2 border-amber-400", children: [
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: homeSearchProvider,
                          onChange: (e) => setHomeSearchProvider(e.target.value),
                          className: "bg-zinc-100 text-zinc-900 px-2 py-1.5 rounded-l text-xs font-semibold border-r border-zinc-300 outline-hidden",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "duckduckgo", children: "\u{1F986} DuckDuckGo" }),
                            /* @__PURE__ */ jsx("option", { value: "wikipedia", children: "\u{1F4D6} Wikipedia" }),
                            /* @__PURE__ */ jsx("option", { value: "google", children: "\u{1F50D} Google" }),
                            /* @__PURE__ */ jsx("option", { value: "bing", children: "\u{1F7E6} Bing" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "Search the real internet or type any URL...",
                          value: homeSearchQuery,
                          onChange: (e) => setHomeSearchQuery(e.target.value),
                          className: "flex-1 px-3 py-1.5 text-zinc-900 text-xs outline-hidden"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "submit",
                          className: "px-5 py-1.5 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded font-bold text-xs cursor-pointer active:scale-95 transition",
                          children: "Search Web \u2794"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 mt-2.5 text-[11px] text-blue-100", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: "Popular queries:" }),
                      ["Java Spring Boot", "React 19 Hooks", "ChromaDB RAG", "Microservices Architecture", "Nallukumar Ravichandran"].map((q) => /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setHomeSearchQuery(q);
                            navigateTo(`https://duckduckgo.com/?q=${encodeURIComponent(q)}`);
                          },
                          className: "hover:underline hover:text-white cursor-pointer bg-white/10 px-2 py-0.5 rounded",
                          children: q
                        },
                        q
                      ))
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2.5", children: [
                    /* @__PURE__ */ jsxs("h2", { className: "font-bold text-xs text-zinc-800 uppercase tracking-wider flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-amber-500 fill-amber-400" }),
                      /* @__PURE__ */ jsx("span", { children: "Speed Dial - Live Web Destinations" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] text-zinc-500", children: "Click to navigate directly inside browser" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: DEFAULT_BOOKMARKS.map((bm) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => navigateTo(bm.url),
                      className: "p-3 bg-white hover:bg-blue-50/60 border border-zinc-200 hover:border-blue-400 rounded-xl shadow-xs cursor-pointer transition group flex flex-col justify-between",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-2xl p-1 bg-zinc-50 rounded-lg group-hover:scale-110 transition-transform", children: bm.iconText }),
                          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-zinc-900 group-hover:text-blue-700 truncate", children: bm.title }),
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-blue-600 font-semibold uppercase", children: bm.category }),
                            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-snug", children: bm.description })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono", children: [
                          /* @__PURE__ */ jsx("span", { className: "truncate", children: bm.url.replace(/^https?:\/\//, "") }),
                          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" })
                        ] })
                      ]
                    },
                    bm.id
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "\u{1F4D6}" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h3", { className: "font-bold text-xs text-zinc-900", children: "Live Wikipedia Instant Article Reader" }),
                        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-zinc-500", children: "Fetches encyclopedic topics live through the official Wikipedia REST API." })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: wikiQuery,
                          onChange: (e) => setWikiQuery(e.target.value),
                          placeholder: "Article topic...",
                          className: "bg-white border border-zinc-300 px-2 py-1 rounded text-xs outline-hidden"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => fetchWikipediaSummary(wikiQuery),
                          disabled: wikiLoading,
                          className: "px-3 py-1 bg-zinc-800 hover:bg-black text-white rounded text-xs font-bold cursor-pointer",
                          children: wikiLoading ? "Fetching..." : "Read"
                        }
                      )
                    ] })
                  ] }),
                  wikiResult && /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start bg-white p-4 rounded-lg border border-zinc-200", children: [
                    wikiResult.thumbnail?.source && /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: wikiResult.thumbnail.source,
                        alt: wikiResult.title,
                        referrerPolicy: "no-referrer",
                        className: "w-28 h-28 object-cover rounded-md border border-zinc-200 shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 flex-1", children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-zinc-900", children: wikiResult.title }),
                      wikiResult.description && /* @__PURE__ */ jsx("div", { className: "text-[11px] text-blue-700 font-semibold", children: wikiResult.description }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-700 leading-relaxed", children: wikiResult.extract }),
                      /* @__PURE__ */ jsx("div", { className: "pt-2 flex gap-2", children: /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => navigateTo(`https://en.m.wikipedia.org/wiki/${encodeURIComponent(wikiResult.title)}`),
                          className: "px-3 py-1 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded text-xs font-bold cursor-pointer",
                          children: "Open Full Wikipedia Page \u2794"
                        }
                      ) })
                    ] })
                  ] })
                ] })
              ] }),
              activeTab.url !== "about:home" && /* @__PURE__ */ jsx(
                "iframe",
                {
                  ref: iframeRef,
                  src: `/api/proxy?url=${encodeURIComponent(activeTab.url)}`,
                  title: activeTab.title,
                  className: "w-full h-full border-0 bg-white",
                  style: { transform: `scale(${zoomLevel / 100})`, transformOrigin: "top left" },
                  sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation",
                  referrerPolicy: "no-referrer",
                  allow: "fullscreen; accelerometer; autoplay; camera; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  onLoad: () => {
                    setTabs(
                      (prev) => prev.map((t) => t.id === activeTabId ? { ...t, isLoading: false } : t)
                    );
                    setStatusMessage("Done");
                    setLoadingProgress(100);
                  }
                },
                activeTab.id + activeTab.url
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#ece9d8] border-t border-zinc-300 px-3 py-1 flex items-center justify-between text-[11px] text-zinc-700 select-none", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-blue-700 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: statusMessage }),
            activeTab?.isLoading && /* @__PURE__ */ jsx("div", { className: "w-24 h-2 bg-zinc-200 rounded-full overflow-hidden border border-zinc-400", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full bg-emerald-600 transition-all duration-300",
                style: { width: `${loadingProgress}%` }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 shrink-0 border-l border-zinc-300 pl-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Lock, { className: "w-3 h-3 text-emerald-600" }),
              /* @__PURE__ */ jsx("span", { children: "Internet | Protected Mode: On" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 border-l border-zinc-300 pl-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setZoomLevel((prev) => Math.max(prev - 25, 50)),
                  className: "hover:bg-zinc-200 px-1 rounded cursor-pointer",
                  title: "Zoom out",
                  children: "-"
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
                zoomLevel,
                "%"
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setZoomLevel((prev) => Math.min(prev + 25, 200)),
                  className: "hover:bg-zinc-200 px-1 rounded cursor-pointer",
                  title: "Zoom in",
                  children: "+"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
};
export {
  InternetExplorerApp
};
