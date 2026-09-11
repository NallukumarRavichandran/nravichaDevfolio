import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { sounds } from '../../utils/audio';

interface BrowserTab {
  id: string;
  title: string;
  url: string;
  isLoading: boolean;
  history: string[];
  historyIndex: number;
}

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  iconText: string;
}

interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  timestamp: string;
}

interface WikipediaSummary {
  title: string;
  description?: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls?: { desktop: { page: string } };
}

interface InternetExplorerAppProps {
  initialUrl?: string;
}

const DEFAULT_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'wikipedia',
    title: 'Wikipedia (Mobile Encyclopedia)',
    url: 'https://en.m.wikipedia.org',
    category: 'Knowledge',
    description: 'The Free Encyclopedia with millions of articles and zero iframe restrictions.',
    iconText: '📖'
  },
  {
    id: 'duckduckgo',
    title: 'DuckDuckGo Search Engine',
    url: 'https://duckduckgo.com',
    category: 'Search',
    description: 'Privacy-first web search engine for finding anything on the real internet.',
    iconText: '🦆'
  },
  {
    id: 'hackernews',
    title: 'Hacker News (Y Combinator)',
    url: 'https://news.ycombinator.com',
    category: 'Technology',
    description: 'Real-time computer science, engineering, and startup discussions.',
    iconText: '📰'
  },
  {
    id: 'devdocs',
    title: 'DevDocs API Documentation',
    url: 'https://devdocs.io',
    category: 'Developer',
    description: 'Fast, offline-capable documentation for React, Java, TypeScript, and APIs.',
    iconText: '💻'
  },
  {
    id: 'osm',
    title: 'OpenStreetMap Global Map',
    url: 'https://www.openstreetmap.org/export/embed.html?bbox=-122.5%2C37.7%2C-122.3%2C37.9&layer=mapnik',
    category: 'Maps',
    description: 'Open-source interactive world map viewer.',
    iconText: '🗺️'
  },
  {
    id: 'archive',
    title: 'Internet Archive Wayback Machine',
    url: 'https://archive.org',
    category: 'Archive',
    description: 'Explore billions of saved web pages across digital history.',
    iconText: '🏛️'
  },
  {
    id: 'w3schools',
    title: 'W3Schools Web Tutorials',
    url: 'https://www.w3schools.com',
    category: 'Developer',
    description: 'HTML, CSS, JavaScript, and Java interactive programming tutorials.',
    iconText: '🎓'
  },
  {
    id: 'codepen',
    title: 'CodePen HTML5 Sandbox',
    url: 'https://codepen.io/pen/',
    category: 'Developer',
    description: 'Live frontend coding playground and web canvas experimenter.',
    iconText: '✏️'
  },
  {
    id: 'github',
    title: 'Nallukumar Ravichandran GitHub',
    url: 'https://github.com/NallukumarRavichandran',
    category: 'Portfolio',
    description: 'Full stack Java & AI repositories, commits, and open-source packages.',
    iconText: '🐙'
  },
  {
    id: 'linkedin',
    title: 'Nallukumar Ravichandran LinkedIn',
    url: 'https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true',
    category: 'Portfolio',
    description: 'Professional experience at Giritronics and American Express.',
    iconText: '💼'
  },
  {
    id: 'html5test',
    title: 'HTML5 Browser Standards Test',
    url: 'https://html5test.co',
    category: 'Tools',
    description: 'Verify browser engine capabilities and modern web standard compliance.',
    iconText: '⚡'
  },
  {
    id: 'google',
    title: 'Google Search Portal',
    url: 'https://www.google.com',
    category: 'Search',
    description: 'World-wide search engine portal for queries and news.',
    iconText: '🔍'
  }
];



export const InternetExplorerApp: React.FC<InternetExplorerAppProps> = ({ initialUrl }) => {
  // Tabs State
  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: 'tab-1',
      title: initialUrl ? getTitleFromUrl(initialUrl) : 'MSN.com - Internet Explorer',
      url: initialUrl || 'about:home',
      isLoading: false,
      history: [initialUrl || 'about:home'],
      historyIndex: 0
    }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');

  // Address Bar URL Input
  const [addressInput, setAddressInput] = useState<string>(initialUrl || 'about:home');

  // Bookmarks & History State
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(DEFAULT_BOOKMARKS);
  const [historyList, setHistoryList] = useState<HistoryEntry[]>([
    {
      id: 'h-1',
      title: 'MSN.com - Internet Explorer Start Portal',
      url: 'about:home',
      timestamp: 'Just now'
    }
  ]);

  // UI Panels
  const [activeSidePanel, setActiveSidePanel] = useState<'none' | 'search' | 'favorites' | 'history'>('none');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Home Portal Search State
  const [homeSearchQuery, setHomeSearchQuery] = useState('');
  const [homeSearchProvider, setHomeSearchProvider] = useState<'duckduckgo' | 'google' | 'bing' | 'wikipedia'>('duckduckgo');

  // Wikipedia Live Article Reader on Portal
  const [wikiQuery, setWikiQuery] = useState('World Wide Web');
  const [wikiResult, setWikiResult] = useState<WikipediaSummary | null>(null);
  const [wikiLoading, setWikiLoading] = useState(false);

  // Status Bar State
  const [statusMessage, setStatusMessage] = useState('Done');
  const [loadingProgress, setLoadingProgress] = useState(100);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  // Helper: derive title from URL
  function getTitleFromUrl(url: string): string {
    if (url === 'about:home') return 'MSN.com - Internet Explorer';
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, '');
      return `${host} - Internet Explorer`;
    } catch {
      return `${url} - Internet Explorer`;
    }
  }

  // Sync address input when active tab changes
  useEffect(() => {
    if (activeTab) {
      setAddressInput(activeTab.url);
    }
  }, [activeTabId, activeTab?.url]);

  // Listen to postMessages from proxied iframe for live navigation & document titles
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'IE_PAGE_LOADED') {
        const loadedUrl = event.data.targetUrl || event.data.url;
        const pageTitle = event.data.title;
        if (loadedUrl) {
          setTabs(prev =>
            prev.map(t =>
              t.id === activeTabId
                ? {
                    ...t,
                    url: loadedUrl,
                    title: pageTitle || getTitleFromUrl(loadedUrl),
                    isLoading: false
                  }
                : t
            )
          );
          setAddressInput(loadedUrl);
          setStatusMessage('Done');
          setLoadingProgress(100);
        }
      } else if (event.data.type === 'IE_NAVIGATE') {
        if (event.data.url) {
          navigateTo(event.data.url);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeTabId]);

  // Load Wikipedia topic on homepage
  useEffect(() => {
    fetchWikipediaSummary('World Wide Web');
  }, []);

  const fetchWikipediaSummary = async (topic: string) => {
    setWikiLoading(true);
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
      if (res.ok) {
        const data: WikipediaSummary = await res.json();
        setWikiResult(data);
      }
    } catch {
      // Fallback
    } finally {
      setWikiLoading(false);
    }
  };

  // Navigate Active Tab to a specific URL
  const navigateTo = (url: string) => {
    sounds.playClick();
    let finalUrl = url.trim();

    if (finalUrl !== 'about:home') {
      // Smart search detection: if no protocol and contains spaces or no dots, search via DuckDuckGo
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        if (finalUrl.includes('.') && !finalUrl.includes(' ')) {
          finalUrl = `https://${finalUrl}`;
        } else {
          finalUrl = `https://duckduckgo.com/?q=${encodeURIComponent(finalUrl)}`;
        }
      }
    }

    const title = getTitleFromUrl(finalUrl);

    // Update Tab
    setTabs(prevTabs =>
      prevTabs.map(tab => {
        if (tab.id === activeTabId) {
          const newHistory = [...tab.history.slice(0, tab.historyIndex + 1), finalUrl];
          return {
            ...tab,
            url: finalUrl,
            title,
            isLoading: finalUrl !== 'about:home',
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

    // Record in History
    setHistoryList(prev => [
      {
        id: Date.now().toString(),
        title,
        url: finalUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev.slice(0, 49)
    ]);

    // Simulate completion
    setTimeout(() => {
      setLoadingProgress(80);
      setStatusMessage(`Transferring data from ${finalUrl}...`);
      setTimeout(() => {
        setTabs(prev =>
          prev.map(t => (t.id === activeTabId ? { ...t, isLoading: false } : t))
        );
        setStatusMessage('Done');
        setLoadingProgress(100);
      }, 500);
    }, 400);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(addressInput);
  };

  // History Navigation: Back
  const handleBack = () => {
    if (!activeTab || activeTab.historyIndex <= 0) return;
    sounds.playClick();
    const newIndex = activeTab.historyIndex - 1;
    const targetUrl = activeTab.history[newIndex];
    setTabs(prev =>
      prev.map(t =>
        t.id === activeTabId
          ? {
              ...t,
              url: targetUrl,
              title: getTitleFromUrl(targetUrl),
              historyIndex: newIndex
            }
          : t
      )
    );
    setAddressInput(targetUrl);
  };

  // History Navigation: Forward
  const handleForward = () => {
    if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;
    sounds.playClick();
    const newIndex = activeTab.historyIndex + 1;
    const targetUrl = activeTab.history[newIndex];
    setTabs(prev =>
      prev.map(t =>
        t.id === activeTabId
          ? {
              ...t,
              url: targetUrl,
              title: getTitleFromUrl(targetUrl),
              historyIndex: newIndex
            }
          : t
      )
    );
    setAddressInput(targetUrl);
  };

  // Refresh
  const handleRefresh = () => {
    sounds.playClick();
    if (!activeTab) return;
    setStatusMessage(`Reloading ${activeTab.url}...`);
    setTabs(prev =>
      prev.map(t => (t.id === activeTabId ? { ...t, isLoading: true } : t))
    );
    setTimeout(() => {
      setTabs(prev =>
        prev.map(t => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
      setStatusMessage('Done');
    }, 600);
  };

  // Stop loading
  const handleStop = () => {
    sounds.playClick();
    setTabs(prev =>
      prev.map(t => (t.id === activeTabId ? { ...t, isLoading: false } : t))
    );
    setStatusMessage('Done');
    setLoadingProgress(100);
  };

  // Home button
  const handleHome = () => {
    navigateTo('about:home');
  };

  // Tabs Management: New Tab
  const handleNewTab = () => {
    sounds.playClick();
    const newTabId = `tab-${Date.now()}`;
    const newTab: BrowserTab = {
      id: newTabId,
      title: 'MSN.com - Internet Explorer',
      url: 'about:home',
      isLoading: false,
      history: ['about:home'],
      historyIndex: 0
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTabId);
    setAddressInput('about:home');
  };

  // Tabs Management: Close Tab
  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (tabs.length === 1) {
      // If closing the last tab, reset it to about:home
      setTabs([
        {
          id: `tab-${Date.now()}`,
          title: 'MSN.com - Internet Explorer',
          url: 'about:home',
          isLoading: false,
          history: ['about:home'],
          historyIndex: 0
        }
      ]);
      setAddressInput('about:home');
      return;
    }

    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
      setAddressInput(newTabs[newTabs.length - 1].url);
    }
  };

  // Add Current Page to Bookmarks
  const handleAddBookmark = () => {
    sounds.playClick();
    if (activeTab.url === 'about:home') return;
    const exists = bookmarks.some(b => b.url === activeTab.url);
    if (exists) return;

    const newBm: BookmarkItem = {
      id: Date.now().toString(),
      title: activeTab.title.replace(' - Internet Explorer', ''),
      url: activeTab.url,
      category: 'Saved Favorites',
      description: `Saved from ${activeTab.url}`,
      iconText: '⭐'
    };
    setBookmarks(prev => [newBm, ...prev]);
    setStatusMessage('Added to Favorites');
  };

  // Open URL directly in user's real browser window
  const openExternalWindow = (url: string) => {
    sounds.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Copy URL to Clipboard
  const handleCopyUrl = () => {
    sounds.playClick();
    navigator.clipboard.writeText(activeTab.url);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };



  // Home Portal Search Submission
  const handleHomeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeSearchQuery.trim()) return;

    let searchUrl = '';
    const query = encodeURIComponent(homeSearchQuery.trim());
    switch (homeSearchProvider) {
      case 'duckduckgo':
        searchUrl = `https://duckduckgo.com/?q=${query}`;
        break;
      case 'google':
        searchUrl = `https://www.google.com/search?q=${query}`;
        break;
      case 'bing':
        searchUrl = `https://www.bing.com/search?q=${query}`;
        break;
      case 'wikipedia':
        searchUrl = `https://en.m.wikipedia.org/wiki/Special:Search?search=${query}`;
        break;
    }
    navigateTo(searchUrl);
  };

  return (
    <div
      onClick={() => setActiveMenu(null)}
      className="flex flex-col h-full bg-[#ece9d8] text-zinc-900 font-sans select-none overflow-hidden text-xs"
    >
      {/* 1. Classic Windows XP Menu Bar */}
      <div className="bg-[#ece9d8] border-b border-zinc-300 px-2 py-0.5 flex items-center gap-3 text-zinc-800 text-[11px] relative">
        {/* File Menu */}
        <div className="relative">
          <button
            onClick={e => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'file' ? null : 'file');
            }}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${
              activeMenu === 'file' ? 'bg-[#0a246a] text-white' : 'hover:bg-[#316ac5] hover:text-white'
            }`}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="absolute top-full left-0 mt-0.5 w-48 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900">
              <button
                onClick={handleNewTab}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between"
              >
                <span>New Tab</span>
                <span className="text-[10px] text-zinc-400">Ctrl+T</span>
              </button>
              <button
                onClick={() => navigateTo('about:home')}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white"
              >
                Open Homepage
              </button>
              <div className="h-[1px] bg-zinc-200 my-1" />
              <button
                onClick={() => window.print()}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between"
              >
                <span>Print...</span>
                <span className="text-[10px] text-zinc-400">Ctrl+P</span>
              </button>
              <button
                onClick={handleCopyUrl}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white"
              >
                Copy Address to Clipboard
              </button>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="relative">
          <button
            onClick={e => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'view' ? null : 'view');
            }}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${
              activeMenu === 'view' ? 'bg-[#0a246a] text-white' : 'hover:bg-[#316ac5] hover:text-white'
            }`}
          >
            View
          </button>
          {activeMenu === 'view' && (
            <div className="absolute top-full left-0 mt-0.5 w-44 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 25, 200))}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between"
              >
                <span>Zoom In</span>
                <span className="text-[10px] text-zinc-400">+25%</span>
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 25, 50))}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between"
              >
                <span>Zoom Out</span>
                <span className="text-[10px] text-zinc-400">-25%</span>
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white"
              >
                Actual Size (100%)
              </button>
              <div className="h-[1px] bg-zinc-200 my-1" />
              <button
                onClick={handleRefresh}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white"
              >
                Refresh Page (F5)
              </button>
            </div>
          )}
        </div>

        {/* Favorites Menu */}
        <div className="relative">
          <button
            onClick={e => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'favorites' ? null : 'favorites');
            }}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${
              activeMenu === 'favorites' ? 'bg-[#0a246a] text-white' : 'hover:bg-[#316ac5] hover:text-white'
            }`}
          >
            Favorites
          </button>
          {activeMenu === 'favorites' && (
            <div className="absolute top-full left-0 mt-0.5 w-56 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900">
              <button
                onClick={handleAddBookmark}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white font-semibold text-blue-700 hover:text-white flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Add to Favorites...</span>
              </button>
              <div className="h-[1px] bg-zinc-200 my-1" />
              <div className="px-3 py-0.5 text-[10px] text-zinc-400 uppercase font-bold">Quick Links</div>
              {bookmarks.slice(0, 8).map(b => (
                <button
                  key={b.id}
                  onClick={() => navigateTo(b.url)}
                  className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center gap-2 truncate"
                >
                  <span>{b.iconText}</span>
                  <span className="truncate">{b.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tools Menu */}
        <div className="relative">
          <button
            onClick={e => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'tools' ? null : 'tools');
            }}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${
              activeMenu === 'tools' ? 'bg-[#0a246a] text-white' : 'hover:bg-[#316ac5] hover:text-white'
            }`}
          >
            Tools
          </button>
          {activeMenu === 'tools' && (
            <div className="absolute top-full left-0 mt-0.5 w-52 bg-white border border-zinc-400 shadow-xl rounded py-1 z-50 text-zinc-900">
              <button
                onClick={() => openExternalWindow(activeTab.url)}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white flex items-center justify-between"
              >
                <span>Launch in Real Tab</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </button>
              <button
                onClick={() => {
                  setHistoryList([]);
                  setStatusMessage('History cleared');
                }}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white"
              >
                Clear Browsing History
              </button>
              <div className="h-[1px] bg-zinc-200 my-1" />
              <button
                onClick={() => navigateTo('https://html5test.co')}
                className="w-full text-left px-3 py-1 hover:bg-[#0a246a] hover:text-white"
              >
                Test HTML5 Compliance
              </button>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <button
            onClick={e => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'help' ? null : 'help');
            }}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${
              activeMenu === 'help' ? 'bg-[#0a246a] text-white' : 'hover:bg-[#316ac5] hover:text-white'
            }`}
          >
            Help
          </button>
          {activeMenu === 'help' && (
            <div className="absolute top-full left-0 mt-0.5 w-60 bg-white border border-zinc-400 shadow-xl rounded p-2 z-50 text-zinc-900 space-y-1">
              <div className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Internet Explorer 6.0 Real Browser</span>
              </div>
              <p className="text-[11px] text-zinc-600 leading-snug">
                Fully functional web browser capable of navigating live websites, searching DuckDuckGo/Google, browsing Wikipedia, and managing tabs and bookmarks.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Standard Buttons Toolbar */}
      <div className="bg-gradient-to-b from-[#f9f8f4] to-[#e4e1d3] border-b border-zinc-300 px-2 py-1 flex items-center justify-between gap-1 shadow-xs">
        <div className="flex items-center gap-1">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={!activeTab || activeTab.historyIndex <= 0}
            className={`flex items-center gap-1 px-2 py-1 rounded border ${
              !activeTab || activeTab.historyIndex <= 0
                ? 'opacity-40 cursor-not-allowed border-transparent text-zinc-400'
                : 'hover:bg-[#d8e4f8] hover:border-[#7da2ce] border-transparent text-zinc-800 cursor-pointer active:scale-95'
            }`}
            title="Back (Alt + Left Arrow)"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-xs hidden sm:inline">Back</span>
          </button>

          {/* Forward Button */}
          <button
            onClick={handleForward}
            disabled={!activeTab || activeTab.historyIndex >= activeTab.history.length - 1}
            className={`flex items-center gap-1 px-2 py-1 rounded border ${
              !activeTab || activeTab.historyIndex >= activeTab.history.length - 1
                ? 'opacity-40 cursor-not-allowed border-transparent text-zinc-400'
                : 'hover:bg-[#d8e4f8] hover:border-[#7da2ce] border-transparent text-zinc-800 cursor-pointer active:scale-95'
            }`}
            title="Forward (Alt + Right Arrow)"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <div className="h-5 w-[1px] bg-zinc-300 mx-0.5" />

          {/* Stop Button */}
          <button
            onClick={handleStop}
            className="flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800 cursor-pointer"
            title="Stop Loading"
          >
            <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
              <X className="w-3.5 h-3.5" />
            </div>
            <span className="hidden md:inline">Stop</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800 cursor-pointer"
            title="Refresh Page"
          >
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <RefreshCw className={`w-3.5 h-3.5 ${activeTab?.isLoading ? 'animate-spin' : ''}`} />
            </div>
            <span className="hidden md:inline">Refresh</span>
          </button>

          {/* Home Button */}
          <button
            onClick={handleHome}
            className="flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800 cursor-pointer"
            title="Home Page"
          >
            <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <Home className="w-3.5 h-3.5" />
            </div>
            <span className="hidden md:inline">Home</span>
          </button>

          <div className="h-5 w-[1px] bg-zinc-300 mx-0.5" />

          {/* Search Drawer Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setActiveSidePanel(activeSidePanel === 'search' ? 'none' : 'search');
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded border ${
              activeSidePanel === 'search'
                ? 'bg-[#d8e4f8] border-[#7da2ce] font-bold text-blue-900 shadow-inner'
                : 'border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800'
            } cursor-pointer`}
            title="Toggle Web Search Sidebar"
          >
            <Search className="w-4 h-4 text-blue-700" />
            <span>Search</span>
          </button>

          {/* Favorites Drawer Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setActiveSidePanel(activeSidePanel === 'favorites' ? 'none' : 'favorites');
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded border ${
              activeSidePanel === 'favorites'
                ? 'bg-[#d8e4f8] border-[#7da2ce] font-bold text-blue-900 shadow-inner'
                : 'border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800'
            } cursor-pointer`}
            title="Toggle Favorites Sidebar"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Favorites</span>
          </button>

          {/* History Drawer Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setActiveSidePanel(activeSidePanel === 'history' ? 'none' : 'history');
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded border ${
              activeSidePanel === 'history'
                ? 'bg-[#d8e4f8] border-[#7da2ce] font-bold text-blue-900 shadow-inner'
                : 'border-transparent hover:bg-[#d8e4f8] hover:border-[#7da2ce] text-zinc-800'
            } cursor-pointer`}
            title="Toggle History Sidebar"
          >
            <Clock className="w-4 h-4 text-purple-700" />
            <span>History</span>
          </button>
        </div>

        {/* Right Corner: Animated Windows XP / IE Spinning Throbber */}
        <div className="flex items-center gap-2 pr-1">
          <div
            onClick={() => openExternalWindow(activeTab.url)}
            title="Open Current Page in External Real Browser Tab"
            className="w-7 h-7 rounded bg-white/70 hover:bg-white border border-zinc-400 flex items-center justify-center cursor-pointer shadow-xs group"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>

          <div
            className={`w-7 h-7 rounded border border-zinc-400 bg-gradient-to-br from-[#1b6eed] to-[#003399] flex items-center justify-center text-white shadow-inner select-none ${
              activeTab?.isLoading ? 'animate-pulse ring-2 ring-yellow-400' : ''
            }`}
            title="Windows Internet Explorer"
          >
            <Globe className={`w-4 h-4 ${activeTab?.isLoading ? 'animate-spin' : ''}`} />
          </div>
        </div>
      </div>

      {/* 3. Address Bar with Favicon & Go Button */}
      <div className="bg-[#ece9d8] border-b border-zinc-300 px-2 py-1 flex items-center gap-2 shadow-inner">
        <span className="font-semibold text-zinc-700 shrink-0 text-xs">Address</span>

        <form onSubmit={handleAddressSubmit} className="flex-1 flex items-center gap-1">
          <div className="flex-1 bg-white border border-zinc-500 rounded-xs px-2 py-1 flex items-center gap-1.5 shadow-inner focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400">
            {/* Protocol Lock indicator */}
            {activeTab.url.startsWith('https://') ? (
              <span title="Secure HTTPS Connection" className="shrink-0 flex items-center">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
              </span>
            ) : (
              <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            )}

            <input
              type="text"
              value={addressInput}
              onChange={e => setAddressInput(e.target.value)}
              placeholder="Enter a website URL (e.g. en.m.wikipedia.org) or search the web..."
              className="w-full text-xs text-zinc-900 outline-hidden bg-transparent font-sans"
            />

            {addressInput && (
              <button
                type="button"
                onClick={() => setAddressInput('')}
                className="text-zinc-400 hover:text-zinc-600 px-1 cursor-pointer"
                title="Clear address bar"
              >
                ✕
              </button>
            )}
          </div>

          {/* Authentic Windows XP Green "Go" Button */}
          <button
            type="submit"
            className="px-3 py-1 bg-gradient-to-b from-[#55ba54] to-[#2c8d2b] hover:from-[#62ce61] hover:to-[#339e32] active:from-[#2c8d2b] text-white rounded-xs border border-[#1e6f1d] flex items-center gap-1 font-bold text-xs cursor-pointer shadow-xs"
            title="Go to URL"
          >
            <span>Go</span>
            <ArrowRight className="w-3 h-3 stroke-[3]" />
          </button>
        </form>

        {/* Add Bookmark button */}
        <button
          onClick={handleAddBookmark}
          className="p-1 hover:bg-zinc-200 border border-zinc-400 rounded-xs cursor-pointer"
          title="Add to Favorites"
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
        </button>
      </div>

      {/* 4. Quick Links Bar */}
      <div className="bg-[#f0eee4] border-b border-zinc-300 px-2 py-0.5 flex items-center gap-1 overflow-x-auto text-[11px] text-zinc-700">
        <span className="text-zinc-400 font-semibold shrink-0 mr-1">Links:</span>
        {[
          { label: 'MSN Portal', url: 'about:home', icon: '🏠' },
          { label: 'Wikipedia', url: 'https://en.m.wikipedia.org', icon: '📖' },
          { label: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: '🦆' },
          { label: 'Hacker News', url: 'https://news.ycombinator.com', icon: '📰' },
          { label: 'DevDocs', url: 'https://devdocs.io', icon: '💻' },
          { label: 'OpenStreetMap', url: 'https://www.openstreetmap.org/export/embed.html?bbox=-122.5%2C37.7%2C-122.3%2C37.9&layer=mapnik', icon: '🗺️' },
          { label: 'Archive.org', url: 'https://archive.org', icon: '🏛️' },
          { label: 'W3Schools', url: 'https://www.w3schools.com', icon: '🎓' },
          { label: 'GitHub', url: 'https://github.com/NallukumarRavichandran', icon: '🐙' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true', icon: '💼' }
        ].map(link => (
          <button
            key={link.label}
            onClick={() => navigateTo(link.url)}
            className="px-2 py-0.5 hover:bg-white hover:border-zinc-300 rounded border border-transparent whitespace-nowrap cursor-pointer flex items-center gap-1 font-medium"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </button>
        ))}
      </div>

      {/* 5. Modern Browser Tabs Strip */}
      <div className="bg-[#dcd9ce] border-b border-zinc-300 px-2 pt-1 flex items-center gap-1 overflow-x-auto">
        {tabs.map(tab => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTabId(tab.id);
                setAddressInput(tab.url);
              }}
              className={`max-w-[200px] min-w-[120px] px-2.5 py-1 rounded-t-md text-xs flex items-center justify-between gap-1.5 cursor-pointer border-t border-l border-r select-none transition ${
                isActive
                  ? 'bg-white border-zinc-400 text-zinc-900 font-bold shadow-xs relative top-[1px]'
                  : 'bg-[#d0cdc1] hover:bg-[#eae7dc] border-zinc-300 text-zinc-600'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                {tab.isLoading ? (
                  <RefreshCw className="w-3 h-3 animate-spin text-blue-600 shrink-0" />
                ) : (
                  <Globe className="w-3 h-3 text-blue-700 shrink-0" />
                )}
                <span className="truncate">{tab.title.replace(' - Internet Explorer', '')}</span>
              </div>

              <button
                onClick={e => handleCloseTab(tab.id, e)}
                className="w-4 h-4 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-red-600 flex items-center justify-center text-[10px] shrink-0"
                title="Close tab"
              >
                ✕
              </button>
            </div>
          );
        })}

        {/* New Tab Button */}
        <button
          onClick={handleNewTab}
          className="w-6 h-6 rounded-md hover:bg-white/80 border border-transparent hover:border-zinc-300 flex items-center justify-center text-zinc-700 cursor-pointer mb-0.5"
          title="Open new tab (Ctrl+T)"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Main Web Workspace + Flyout Sidebars */}
      <div className="flex-1 flex min-h-0 bg-white relative">
        {/* Left Side Panel: Search / Favorites / History */}
        {activeSidePanel !== 'none' && (
          <div className="w-64 bg-[#f0eee4] border-r border-zinc-300 flex flex-col shrink-0 z-10 shadow-md">
            {/* Panel Header */}
            <div className="bg-[#e4e0d0] px-3 py-1.5 border-b border-zinc-300 flex items-center justify-between font-bold text-xs text-zinc-800">
              <span className="capitalize">{activeSidePanel}</span>
              <button
                onClick={() => setActiveSidePanel('none')}
                className="w-4 h-4 rounded hover:bg-zinc-300 text-zinc-600 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {activeSidePanel === 'search' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-zinc-600">
                    Search the web using DuckDuckGo, Google, or Wikipedia:
                  </div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleHomeSearch(e);
                    }}
                    className="space-y-2"
                  >
                    <input
                      type="text"
                      placeholder="Type search keywords..."
                      value={homeSearchQuery}
                      onChange={e => setHomeSearchQuery(e.target.value)}
                      className="w-full p-1.5 bg-white border border-zinc-400 rounded text-xs outline-hidden shadow-inner"
                    />
                    <select
                      value={homeSearchProvider}
                      onChange={e => setHomeSearchProvider(e.target.value as any)}
                      className="w-full p-1 bg-white border border-zinc-400 rounded text-xs"
                    >
                      <option value="duckduckgo">DuckDuckGo (Embed Friendly)</option>
                      <option value="wikipedia">Wikipedia Articles</option>
                      <option value="google">Google Web Search</option>
                      <option value="bing">Bing Search</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full py-1 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded font-bold text-xs cursor-pointer shadow-xs"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}

              {activeSidePanel === 'favorites' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold text-zinc-600 uppercase">Your Favorites</span>
                    <button
                      onClick={handleAddBookmark}
                      className="text-blue-700 hover:underline text-[10px] font-semibold"
                    >
                      + Add current
                    </button>
                  </div>
                  {bookmarks.map(b => (
                    <div
                      key={b.id}
                      onClick={() => navigateTo(b.url)}
                      className="p-2 bg-white hover:bg-blue-50 border border-zinc-200 rounded cursor-pointer group flex items-start gap-2 text-left"
                    >
                      <span className="text-base shrink-0">{b.iconText}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-zinc-900 group-hover:text-blue-700 truncate">
                          {b.title}
                        </div>
                        <div className="text-[10px] text-zinc-500 truncate">{b.url}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSidePanel === 'history' && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center px-1 mb-1">
                    <span className="text-[11px] font-bold text-zinc-600 uppercase">Visited History</span>
                    <button
                      onClick={() => setHistoryList([])}
                      className="text-red-600 hover:underline text-[10px]"
                    >
                      Clear
                    </button>
                  </div>
                  {historyList.length === 0 ? (
                    <div className="p-3 text-center text-zinc-400 text-xs">No browsing history yet.</div>
                  ) : (
                    historyList.map(h => (
                      <div
                        key={h.id}
                        onClick={() => navigateTo(h.url)}
                        className="p-1.5 hover:bg-white rounded border border-transparent hover:border-zinc-200 cursor-pointer text-left"
                      >
                        <div className="font-bold text-xs text-zinc-800 truncate">{h.title}</div>
                        <div className="flex justify-between text-[10px] text-zinc-400">
                          <span className="truncate">{h.url}</span>
                          <span className="shrink-0">{h.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden relative">
          {/* Secondary Browser Web Info Bar */}
          <div className="bg-[#f8f9fa] border-b border-zinc-200 px-3 py-1 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 truncate">
              {activeTab.url.startsWith('https://') ? (
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>HTTPS Secure</span>
                </span>
              ) : (
                <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-600 text-[10px]">
                  Local Page
                </span>
              )}
              <span className="text-zinc-600 font-mono text-[11px] truncate">{activeTab.url}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Copy URL button */}
              <button
                onClick={handleCopyUrl}
                className="px-2 py-0.5 rounded bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-700 text-[11px] flex items-center gap-1 cursor-pointer"
                title="Copy current URL"
              >
                {copyFeedback ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <span>Copy Link</span>
                )}
              </button>

              {/* Open in Real Browser Tab */}
              <button
                onClick={() => openExternalWindow(activeTab.url)}
                className="px-2.5 py-0.5 rounded bg-[#0058e6] hover:bg-[#0047b8] text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                title="Open in your computer's real web browser"
              >
                <span>Open in Real Tab</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Web View Rendering */}
          <div className="flex-1 overflow-auto bg-white relative">
            {/* A. HOMEPAGE PORTAL (about:home) */}
            {activeTab.url === 'about:home' && (
              <div className="p-6 max-w-5xl mx-auto space-y-6 select-text">
                {/* Hero Start Banner */}
                <div className="bg-gradient-to-r from-[#003399] via-[#0058e6] to-[#003399] text-white p-6 rounded-2xl shadow-lg border border-blue-400/40">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl shadow-inner">
                        🌐
                      </div>
                      <div>
                        <h1 className="text-lg font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          Internet Explorer - World Wide Web Portal
                        </h1>
                        <p className="text-xs text-blue-100">
                          Search the live web, browse interactive encyclopedias, API docs, and portfolio repositories.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Real Web Search Engine Form */}
                  <form onSubmit={handleHomeSearch} className="mt-5 max-w-2xl">
                    <div className="flex bg-white rounded-lg p-1 shadow-md border-2 border-amber-400">
                      <select
                        value={homeSearchProvider}
                        onChange={e => setHomeSearchProvider(e.target.value as any)}
                        className="bg-zinc-100 text-zinc-900 px-2 py-1.5 rounded-l text-xs font-semibold border-r border-zinc-300 outline-hidden"
                      >
                        <option value="duckduckgo">🦆 DuckDuckGo</option>
                        <option value="wikipedia">📖 Wikipedia</option>
                        <option value="google">🔍 Google</option>
                        <option value="bing">🟦 Bing</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Search the real internet or type any URL..."
                        value={homeSearchQuery}
                        onChange={e => setHomeSearchQuery(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-zinc-900 text-xs outline-hidden"
                      />

                      <button
                        type="submit"
                        className="px-5 py-1.5 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded font-bold text-xs cursor-pointer active:scale-95 transition"
                      >
                        Search Web ➔
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2.5 text-[11px] text-blue-100">
                      <span className="font-semibold text-white">Popular queries:</span>
                      {['Java Spring Boot', 'React 19 Hooks', 'ChromaDB RAG', 'Microservices Architecture', 'Nallukumar Ravichandran'].map(q => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => {
                            setHomeSearchQuery(q);
                            navigateTo(`https://duckduckgo.com/?q=${encodeURIComponent(q)}`);
                          }}
                          className="hover:underline hover:text-white cursor-pointer bg-white/10 px-2 py-0.5 rounded"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </form>
                </div>

                {/* Speed Dial / Featured Live Sites */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h2 className="font-bold text-xs text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>Speed Dial - Live Web Destinations</span>
                    </h2>
                    <span className="text-[11px] text-zinc-500">Click to navigate directly inside browser</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {DEFAULT_BOOKMARKS.map(bm => (
                      <div
                        key={bm.id}
                        onClick={() => navigateTo(bm.url)}
                        className="p-3 bg-white hover:bg-blue-50/60 border border-zinc-200 hover:border-blue-400 rounded-xl shadow-xs cursor-pointer transition group flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-2xl p-1 bg-zinc-50 rounded-lg group-hover:scale-110 transition-transform">
                            {bm.iconText}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-xs text-zinc-900 group-hover:text-blue-700 truncate">
                              {bm.title}
                            </div>
                            <span className="text-[10px] text-blue-600 font-semibold uppercase">{bm.category}</span>
                            <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-snug">
                              {bm.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                          <span className="truncate">{bm.url.replace(/^https?:\/\//, '')}</span>
                          <ArrowRight className="w-3 h-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Wikipedia Instant Article Reader */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📖</span>
                      <div>
                        <h3 className="font-bold text-xs text-zinc-900">Live Wikipedia Instant Article Reader</h3>
                        <p className="text-[11px] text-zinc-500">
                          Fetches encyclopedic topics live through the official Wikipedia REST API.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={wikiQuery}
                        onChange={e => setWikiQuery(e.target.value)}
                        placeholder="Article topic..."
                        className="bg-white border border-zinc-300 px-2 py-1 rounded text-xs outline-hidden"
                      />
                      <button
                        onClick={() => fetchWikipediaSummary(wikiQuery)}
                        disabled={wikiLoading}
                        className="px-3 py-1 bg-zinc-800 hover:bg-black text-white rounded text-xs font-bold cursor-pointer"
                      >
                        {wikiLoading ? 'Fetching...' : 'Read'}
                      </button>
                    </div>
                  </div>

                  {wikiResult && (
                    <div className="flex flex-col md:flex-row gap-4 items-start bg-white p-4 rounded-lg border border-zinc-200">
                      {wikiResult.thumbnail?.source && (
                        <img
                          src={wikiResult.thumbnail.source}
                          alt={wikiResult.title}
                          referrerPolicy="no-referrer"
                          className="w-28 h-28 object-cover rounded-md border border-zinc-200 shrink-0"
                        />
                      )}
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-bold text-sm text-zinc-900">{wikiResult.title}</h4>
                        {wikiResult.description && (
                          <div className="text-[11px] text-blue-700 font-semibold">{wikiResult.description}</div>
                        )}
                        <p className="text-xs text-zinc-700 leading-relaxed">{wikiResult.extract}</p>
                        <div className="pt-2 flex gap-2">
                          <button
                            onClick={() => navigateTo(`https://en.m.wikipedia.org/wiki/${encodeURIComponent(wikiResult.title)}`)}
                            className="px-3 py-1 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded text-xs font-bold cursor-pointer"
                          >
                            Open Full Wikipedia Page ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REAL LIVE EMBEDDED WEB BROWSER POWERED BY PROXY */}
            {activeTab.url !== 'about:home' && (
              <iframe
                ref={iframeRef}
                key={activeTab.id + activeTab.url}
                src={`/api/proxy?url=${encodeURIComponent(activeTab.url)}`}
                title={activeTab.title}
                className="w-full h-full border-0 bg-white"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
                referrerPolicy="no-referrer"
                allow="fullscreen; accelerometer; autoplay; camera; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onLoad={() => {
                  setTabs(prev =>
                    prev.map(t => (t.id === activeTabId ? { ...t, isLoading: false } : t))
                  );
                  setStatusMessage('Done');
                  setLoadingProgress(100);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* 7. Classic Windows XP Status Bar */}
      <div className="bg-[#ece9d8] border-t border-zinc-300 px-3 py-1 flex items-center justify-between text-[11px] text-zinc-700 select-none">
        {/* Left: Loading status & Progress Bar */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Globe className="w-3.5 h-3.5 text-blue-700 shrink-0" />
          <span className="truncate">{statusMessage}</span>
          {activeTab?.isLoading && (
            <div className="w-24 h-2 bg-zinc-200 rounded-full overflow-hidden border border-zinc-400">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Right: Internet Zone, Security, Zoom */}
        <div className="flex items-center gap-3 shrink-0 border-l border-zinc-300 pl-3">
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Internet | Protected Mode: On</span>
          </div>

          <div className="flex items-center gap-1 border-l border-zinc-300 pl-2">
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 25, 50))}
              className="hover:bg-zinc-200 px-1 rounded cursor-pointer"
              title="Zoom out"
            >
              -
            </button>
            <span className="font-mono">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 25, 200))}
              className="hover:bg-zinc-200 px-1 rounded cursor-pointer"
              title="Zoom in"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
