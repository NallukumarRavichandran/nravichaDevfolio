import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Terminal,
  Settings,
  Globe,
  RefreshCw,
  X,
  Minus,
  Maximize2,
  User,
  Cpu,
  Mail,
  Code,
  Database,
  ShieldAlert,
  HelpCircle,
  Volume2,
  Wifi,
  Trash2,
  Palette,
  Check,
  Heart,
  Play,
  Pause,
  ThumbsUp,
  Sparkles
} from 'lucide-react';

// --- Types & Interfaces ---
interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CBTEntry {
  id: string;
  mood: string;
  moodEmoji: string;
  thought: string;
  reframed: string;
  date: string;
}

interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  likes: number;
  comments: { user: string; text: string; date: string }[];
}

interface MineCell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export default function App() {
  // --- Core State ---
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'resume',
      title: 'Resume.txt - Notepad',
      icon: 'notepad',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 40,
      y: 40,
      width: 650,
      height: 480
    },
    {
      id: 'ie',
      title: 'Internet Explorer - Web Projects',
      icon: 'ie',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 80,
      y: 80,
      width: 850,
      height: 520
    },
    {
      id: 'control',
      title: 'Control Panel - Skills & Info',
      icon: 'control',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 120,
      y: 120,
      width: 680,
      height: 450
    },
    {
      id: 'cmd',
      title: 'Command Prompt - LeetCode Arena',
      icon: 'cmd',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 160,
      y: 60,
      width: 640,
      height: 400
    },
    {
      id: 'mines',
      title: 'Minesweeper',
      icon: 'mines',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 200,
      y: 100,
      width: 320,
      height: 420
    },
    {
      id: 'paint',
      title: 'Paint.exe - Digital Canvas',
      icon: 'paint',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 150,
      y: 150,
      width: 620,
      height: 460
    },
    {
      id: 'mycomputer',
      title: 'My Computer - System Properties',
      icon: 'mycomputer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 60,
      y: 160,
      width: 550,
      height: 420
    }
  ]);

  const [activeWindowId, setActiveWindowId] = useState<string>('resume');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(70);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [shutDownScreen, setShutDownScreen] = useState<boolean>(false);
  const [shutDownStage, setShutDownStage] = useState<'none' | 'grayscale' | 'off'>('none');
  const [clippySpeech, setClippySpeech] = useState<string>(
    "Hi there! I'm Clippy, your friendly developer companion. Double-click any desktop icon or open 'Resume.txt' to discover Nallukumar's work at American Express!"
  );
  const [clippyVisible, setClippyVisible] = useState(true);

  // Dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [windowStart, setWindowStart] = useState({ x: 0, y: 0 });

  // Mobile detection for auto-maximize
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Clock ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setSystemTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Clippy Hints System ---
  useEffect(() => {
    const hints = [
      "Did you know? Nallukumar is a Developer Trainee in Cloud & Infrastructure at American Express!",
      "Try launching 'Minesweeper' from the desktop or the start menu for a fully working classic game!",
      "Open 'Command Prompt' and type 'leetcode' to see a live Java algorithmic challenge solver!",
      "In 'Internet Explorer', you can use 'Hash-Forge' to generate actual passwords or 'Mind Buddy' to log your mood!",
      "Under 'Control Panel', double-click on skills to read how Nallukumar applies them in enterprise codebases.",
      "Check out Nallukumar's education in Computer Science at PSNA College of Engineering and Technology (CGPA 7.23).",
      "You can draw right inside Paint.exe! Select your brush color and sketch your ideas."
    ];
    const interval = setInterval(() => {
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      setClippySpeech(randomHint);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // --- Window Actions ---
  const openWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          const defaultMaximized = isMobile;
          return { ...w, isOpen: true, isMinimized: false, isMaximized: defaultMaximized ? true : w.isMaximized };
        }
        return w;
      })
    );
    bringToFront(id);
    setStartMenuOpen(false);

    // Update Clippy based on what window was opened
    if (id === 'mines') setClippySpeech("Minesweeper! Can you clear all 10 mines? Right-click to flag them!");
    if (id === 'cmd') setClippySpeech("The Command Prompt! Type 'help' to see available terminal commands.");
    if (id === 'ie') setClippySpeech("Welcome to Internet Explorer! Explore Nallukumar's working portfolio projects here.");
    if (id === 'paint') setClippySpeech("Unleash your creativity in Paint! Draw anything you like.");
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isOpen: false } : w)));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
  };

  const toggleMaximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const bringToFront = (id: string) => {
    setActiveWindowId(id);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(w => (w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w));
    });
  };

  // --- Dragging Logic ---
  const handleHeaderMouseDown = (id: string, e: React.MouseEvent) => {
    const win = windows.find(w => w.id === id);
    if (!win || win.isMaximized || isMobile) return;

    setDraggingId(id);
    setDragStart({ x: e.clientX, y: e.clientY });
    setWindowStart({ x: win.x, y: win.y });
    bringToFront(id);
  };

  const handleDesktopMouseMove = (e: React.MouseEvent) => {
    if (!draggingId) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setWindows(prev =>
      prev.map(w => {
        if (w.id === draggingId) {
          return {
            ...w,
            x: windowStart.x + dx,
            y: Math.max(0, windowStart.y + dy) // prevent dragging above header area
          };
        }
        return w;
      })
    );
  };

  const handleDesktopMouseUp = () => {
    setDraggingId(null);
  };

  // --- Sub-Application States & Logic ---

  // 1. Internet Explorer (IE) Sub-Tabs
  const [ieTab, setIeTab] = useState<'mindbuddy' | 'youclone' | 'hashforge'>('mindbuddy');
  const [ieUrl, setIeUrl] = useState('http://nallukumar.dev/mind-buddy');

  const changeIeTab = (tab: 'mindbuddy' | 'youclone' | 'hashforge') => {
    setIeTab(tab);
    if (tab === 'mindbuddy') setIeUrl('http://nallukumar.dev/mind-buddy');
    if (tab === 'youclone') setIeUrl('http://youtube.com/clone/nallukumar');
    if (tab === 'hashforge') setIeUrl('https://hashforge.security');
  };

  // A. Mind Buddy State
  const [cbtEntries, setCbtEntries] = useState<CBTEntry[]>([
    {
      id: '1',
      mood: 'Anxious',
      moodEmoji: '😰',
      thought: 'This American Express enterprise cloud release might have unexpected security vulnerabilities.',
      reframed: 'We conduct rigorous triaging, follow strict enterprise standards, and use security scanning tools. The code is secure and compliant.',
      date: 'Jan 28, 2026'
    },
    {
      id: '2',
      mood: 'Stressed',
      moodEmoji: '😫',
      thought: 'LeetCode Weekly Contest is today and I might fail the hard problem.',
      reframed: 'Participating is about continuous learning and problem-solving growth. Every challenge solved improves my architectural logic.',
      date: 'Jan 24, 2026'
    }
  ]);
  const [newMood, setNewMood] = useState('Happy');
  const [newMoodEmoji, setNewMoodEmoji] = useState('😊');
  const [newThought, setNewThought] = useState('');
  const [newReframed, setNewReframed] = useState('');

  const handleAddCbt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThought || !newReframed) return;
    const entry: CBTEntry = {
      id: Date.now().toString(),
      mood: newMood,
      moodEmoji: newMoodEmoji,
      thought: newThought,
      reframed: newReframed,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setCbtEntries([entry, ...cbtEntries]);
    setNewThought('');
    setNewReframed('');
  };

  // B. You-Clone State
  const [ytVideos, setYtVideos] = useState<YouTubeVideo[]>([
    {
      id: 'v1',
      title: 'Building Enterprise Java Backend Services at American Express',
      channel: 'AmexTrainee',
      views: '1.2M views',
      time: '3 weeks ago',
      likes: 12450,
      comments: [
        { user: 'CloudArchitect', text: 'This pipeline setup is perfectly aligned with cloud release management standards!', date: '2 days ago' },
        { user: 'JavaNinja', text: 'Awesome explanation of secure Spring Boot microservices.', date: '1 day ago' }
      ]
    },
    {
      id: 'v2',
      title: 'Weekly LeetCode Coding Contest - Hard Problem Walkthrough',
      channel: 'KumarCoder',
      views: '450K views',
      time: '5 days ago',
      likes: 8300,
      comments: [
        { user: 'AlgorithmMaster', text: 'That HashMap trick for O(n) time is clean!', date: '3 days ago' }
      ]
    },
    {
      id: 'v3',
      title: 'Introduction to Ethical Hacking & Secure Code Compliance',
      channel: 'CyberNallu',
      views: '820K views',
      time: '1 month ago',
      likes: 18200,
      comments: [
        { user: 'EthicalHacker99', text: 'Securing production codebases against vulnerabilities is critical. Keep it up!', date: '2 weeks ago' }
      ]
    }
  ]);
  const [selectedYtVideo, setSelectedYtVideo] = useState<YouTubeVideo | null>(null);
  const [ytCommentText, setYtCommentText] = useState('');
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying && videoProgress < 100) {
      interval = setInterval(() => {
        setVideoProgress(p => (p >= 100 ? 100 : p + 2));
      }, 300);
    } else if (videoProgress >= 100) {
      setIsVideoPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, videoProgress]);

  const playVideo = (video: YouTubeVideo) => {
    setSelectedYtVideo(video);
    setVideoProgress(0);
    setIsVideoPlaying(true);
  };

  const handleYtLike = () => {
    if (!selectedYtVideo) return;
    setYtVideos(prev =>
      prev.map(v => (v.id === selectedYtVideo.id ? { ...v, likes: v.likes + 1 } : v))
    );
    setSelectedYtVideo(prev => (prev ? { ...prev, likes: prev.likes + 1 } : null));
  };

  const handleYtComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ytCommentText || !selectedYtVideo) return;
    const comment = {
      user: 'GuestViewer',
      text: ytCommentText,
      date: 'Just now'
    };
    setYtVideos(prev =>
      prev.map(v => (v.id === selectedYtVideo.id ? { ...v, comments: [comment, ...v.comments] } : v))
    );
    setSelectedYtVideo(prev => (prev ? { ...prev, comments: [comment, ...prev.comments] } : null));
    setYtCommentText('');
  };

  // C. Hash-Forge State
  const [pwdLength, setPwdLength] = useState(14);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPwd, setGeneratedPwd] = useState('NalluSecure123!');
  const [pwdCopied, setPwdCopied] = useState(false);

  const generatePassword = () => {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numChars = '0123456789';
    const symChars = '!@#$%^&*()_+~|}{[]:;?><,./-=';

    let pool = lowerChars;
    if (includeUpper) pool += upperChars;
    if (includeNumbers) pool += numChars;
    if (includeSymbols) pool += symChars;

    let res = '';
    for (let i = 0; i < pwdLength; i++) {
      res += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setGeneratedPwd(res);
    setPwdCopied(false);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPwd);
    setPwdCopied(true);
    setTimeout(() => setPwdCopied(false), 2000);
  };

  // 2. Command Prompt State & Logic
  const [cmdInput, setCmdInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([
    'Microsoft Windows XP [Version 5.1.2600]',
    '(C) Copyright 1985-2001 Microsoft Corp.',
    '',
    "Welcome to Nallukumar's Interactive Terminal.",
    "Type 'help' to see all available commands.",
    "Type 'leetcode' to see a live Java algorithmic challenge solver!",
    ''
  ]);
  const [cmdIsRunning, setCmdIsRunning] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cmdHistory]);

  const handleCmdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = cmdInput.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...cmdHistory, `C:\\Documents and Settings\\Nallukumar> ${cmdInput}`];

    if (command === 'help') {
      newHistory.push(
        'Available Commands:',
        '  help         - Displays list of commands',
        '  about        - Short biography of Nallukumar',
        '  skills       - Show core backend & full-stack skills',
        '  leetcode     - Run animated weekly contest algorithm solver',
        '  amex         - Cloud & Infra Developer Trainee insights',
        '  contact      - Professional social accounts and contacts',
        '  clear        - Clear terminal history',
        '  system       - System statistics'
      );
    } else if (command === 'about') {
      newHistory.push(
        'BIOGRAPHY:',
        'Nallukumar R is a Java Full Stack Developer and Software Engineer currently',
        'contributing to Cloud & Infrastructure at American Express. He holds a B.E in Computer',
        'Science & Engineering from PSNA College of Engineering and Technology.',
        'He is passionate about clean, secure code, database management, and active problem-solving.'
      );
    } else if (command === 'skills') {
      newHistory.push(
        'SKILLS DIRECTORY:',
        '  [Languages]   Java, Python, SQL, C#, JS',
        '  [Frameworks]  React, HTML, Bootstrap, Hibernate',
        '  [Databases]   MySQL Workbench, PostgreSQL',
        '  [DevOps/Tools] Git, IntelliJ, Firebase, Visual Studio',
        '  [Focus Areas] Cyber Security, Ethical Hacking, OOPS, Secure Coding'
      );
    } else if (command === 'clear') {
      setCmdHistory([]);
      setCmdInput('');
      return;
    } else if (command === 'amex') {
      newHistory.push(
        'AMERICAN EXPRESS WORK PROFILE (January 2026 - Present):',
        'Role: Developer Trainee - Cloud & Infrastructure',
        'Key Responsibilities:',
        '  - Developing & maintaining scalable enterprise services with Java Full Stack.',
        '  - Building REST APIs & microservices backends.',
        '  - Identifying & fixing security vulnerabilities in enterprise code.',
        '  - Managing PostgreSQL data integrity & database queries.',
        '  - Working on CI/CD pipelines & production release management.'
      );
    } else if (command === 'contact') {
      newHistory.push(
        'CONTACT INFO:',
        '  - Email:     kumar10naidu@gmail.com',
        '  - Phone:     +91 6369614270',
        '  - LinkedIn:  linkedin.com/in/nallukumar',
        '  - GitHub:    github.com/nallukumar'
      );
    } else if (command === 'system') {
      newHistory.push(
        'SYSTEM STATUS:',
        '  - OS:         NalluOS Enterprise Edition 2026',
        '  - CPU:        Java Virtual Machine (Multi-threaded)',
        '  - Memory:     6369 MB Ram (Enterprise Active)',
        '  - Security:   Active Vulnerability Scanning Enabled',
        '  - Connection: 1.0 Gbps (DevOps Secure Tunnel)'
      );
    } else if (command === 'leetcode') {
      setCmdIsRunning(true);
      setCmdHistory(newHistory);
      setCmdInput('');
      simulateLeetCodeSolver();
      return;
    } else {
      newHistory.push(`'${command}' is not recognized as an internal or external command, operable program or batch file. Type 'help' for suggestions.`);
    }

    setCmdHistory(newHistory);
    setCmdInput('');
  };

  const simulateLeetCodeSolver = () => {
    const frames = [
      'Initializing LeetCode Java Compiler...',
      'Compiling: Solution.java...',
      'Problem: Two Sum (O(n) time complexity approach)',
      'Input: nums = [2, 11, 7, 15], target = 9',
      'Creating HashMap<Integer, Integer> map = new HashMap<>();',
      'Step 1: i = 0, num = 2. Complement = 9 - 2 = 7.',
      '  - Complement (7) not in map. Inserting (2, 0).',
      'Step 2: i = 1, num = 11. Complement = 9 - 11 = -2.',
      '  - Complement (-2) not in map. Inserting (11, 1).',
      'Step 3: i = 2, num = 7. Complement = 9 - 7 = 2.',
      '  - Complement (2) FOUND in map at index 0!',
      'Solution Found: returning indices [0, 2]!',
      'Tests Passed: 350 / 350.',
      'Time: 1ms (Beats 99.8% of Java submissions).',
      'Space Complexity: O(n).',
      'Rank Updated! Consistently participating in Weekly Contests.',
      'SUCCESS!'
    ];

    let currentFrame = 0;
    const interval = setInterval(() => {
      if (currentFrame < frames.length) {
        setCmdHistory(prev => [...prev, frames[currentFrame]]);
        currentFrame++;
      } else {
        clearInterval(interval);
        setCmdIsRunning(false);
      }
    }, 450);
  };

  // 3. Minesweeper State & Logic
  const [minesGrid, setMinesGrid] = useState<MineCell[][]>([]);
  const [minesState, setMinesState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [minesRemaining, setMinesRemaining] = useState(10);
  const [minesTimer, setMinesTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (minesState === 'playing') {
      interval = setInterval(() => {
        setMinesTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [minesState]);

  const initMinesweeper = () => {
    const size = 8;
    const numMines = 10;
    const grid: MineCell[][] = Array(size)
      .fill(null)
      .map((_, y) =>
        Array(size)
          .fill(null)
          .map((_, x) => ({
            x,
            y,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0
          }))
      );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const rx = Math.floor(Math.random() * size);
      const ry = Math.floor(Math.random() * size);
      if (!grid[ry][rx].isMine) {
        grid[ry][rx].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x].isMine) continue;
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < size && nx >= 0 && nx < size) {
              if (grid[ny][nx].isMine) count++;
            }
          }
        }
        grid[y][x].neighborMines = count;
      }
    }

    setMinesGrid(grid);
    setMinesState('playing');
    setMinesRemaining(numMines);
    setMinesTimer(0);
  };

  useEffect(() => {
    initMinesweeper();
  }, []);

  const revealCell = (x: number, y: number) => {
    if (minesState === 'lost' || minesState === 'won') return;
    const cell = minesGrid[y][x];
    if (cell.isRevealed || cell.isFlagged) return;

    const newGrid = [...minesGrid.map(row => [...row])];

    if (cell.isMine) {
      // Game Over!
      newGrid.forEach(row =>
        row.forEach(c => {
          if (c.isMine) c.isRevealed = true;
        })
      );
      setMinesGrid(newGrid);
      setMinesState('lost');
      return;
    }

    const floodFill = (cx: number, cy: number) => {
      const c = newGrid[cy][cx];
      if (c.isRevealed || c.isFlagged) return;
      c.isRevealed = true;
      if (c.neighborMines === 0 && !c.isMine) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = cy + dy;
            const nx = cx + dx;
            if (ny >= 0 && ny < 8 && nx >= 0 && nx < 8) {
              floodFill(nx, ny);
            }
          }
        }
      }
    };

    floodFill(x, y);

    // Check Win
    let unrevealedSafe = 0;
    newGrid.forEach(row =>
      row.forEach(c => {
        if (!c.isMine && !c.isRevealed) unrevealedSafe++;
      })
    );

    setMinesGrid(newGrid);
    if (unrevealedSafe === 0) {
      setMinesState('won');
    }
  };

  const flagCell = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (minesState === 'lost' || minesState === 'won') return;
    const cell = minesGrid[y][x];
    if (cell.isRevealed) return;

    const newGrid = [...minesGrid.map(row => [...row])];
    newGrid[y][x].isFlagged = !newGrid[y][x].isFlagged;

    setMinesGrid(newGrid);
    setMinesRemaining(r => r + (newGrid[y][x].isFlagged ? -1 : 1));
  };

  // 4. Paint State & Logic
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paintColor, setPaintColor] = useState('black');
  const [paintBrushSize, setPaintBrushSize] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (windows.find(w => w.id === 'paint')?.isOpen) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, [windows.find(w => w.id === 'paint')?.isOpen]);

  const handlePaintStart = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = paintColor;
    ctx.lineWidth = paintBrushSize;
    ctx.lineCap = 'round';
    setIsDrawing(true);
  };

  const handlePaintMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePaintEnd = () => {
    setIsDrawing(false);
  };

  const clearPaint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  // --- Start Shut Down sequence ---
  const handleShutDown = () => {
    setStartMenuOpen(false);
    setShutDownScreen(true);
    setShutDownStage('grayscale');
    setTimeout(() => {
      setShutDownStage('off');
    }, 3000);
  };

  const cancelShutDown = () => {
    setShutDownScreen(false);
    setShutDownStage('none');
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden font-sans transition-all duration-1000 ${
        shutDownStage === 'grayscale' ? 'filter grayscale contrast-125 brightness-75' : ''
      } ${shutDownStage === 'off' ? 'bg-black pointer-events-none' : ''}`}
      style={{
        backgroundImage: 'url("/images/bliss.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#004E98',
        fontFamily: 'Tahoma, Arial, sans-serif'
      }}
      onMouseMove={handleDesktopMouseMove}
      onMouseUp={handleDesktopMouseUp}
    >
      {/* Off state overlay */}
      {shutDownStage === 'off' && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-zinc-600">
          <div className="text-xl md:text-2xl font-bold tracking-widest text-[#df7b00] mb-4">
            It is now safe to turn off your computer.
          </div>
          <button
            onClick={() => {
              setShutDownStage('none');
              setShutDownScreen(false);
            }}
            className="pointer-events-auto px-4 py-2 border border-zinc-700 bg-zinc-900 text-zinc-300 rounded hover:bg-zinc-800 text-sm font-semibold transition"
          >
            Restart NalluOS
          </button>
        </div>
      )}

      {/* Shutdown confirmation dialog */}
      {shutDownScreen && shutDownStage === 'grayscale' && (
        <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="w-[380px] bg-gradient-to-r from-[#0058e6] via-[#2d8eff] to-[#0058e6] rounded-t-lg p-1 shadow-2xl border-2 border-amber-400">
            <div className="flex items-center justify-between text-white font-bold text-sm px-2 py-1">
              <span>Shut Down Computer</span>
              <button onClick={cancelShutDown} className="bg-red-500 hover:bg-red-600 p-0.5 rounded border border-red-700">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="bg-[#f0f0e8] p-4 text-[#333] text-sm flex flex-col items-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-b from-red-500 to-red-700 p-2.5 rounded-full text-white shadow-md border border-red-800">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-base text-blue-900">Are you sure you want to shut down?</p>
                  <p className="text-zinc-600 mt-1">This will log you out of Nallukumar's developer environment.</p>
                </div>
              </div>
              <div className="flex gap-4 w-full justify-end">
                <button
                  onClick={() => setShutDownStage('off')}
                  className="px-4 py-1.5 bg-[#eaeae2] hover:bg-[#d8d8d0] border-t border-l border-white border-b-2 border-r-2 border-zinc-600 font-semibold rounded text-xs text-red-700"
                >
                  Shut Down
                </button>
                <button
                  onClick={cancelShutDown}
                  className="px-4 py-1.5 bg-[#eaeae2] hover:bg-[#d8d8d0] border-t border-l border-white border-b-2 border-r-2 border-zinc-600 font-semibold rounded text-xs text-zinc-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Desktop Icon Grid --- */}
      <div className="grid grid-flow-row auto-rows-max grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-6 p-4 md:p-6 w-full md:w-32 max-h-[85vh] absolute left-0 top-0 select-none">
        {/* Resume Shortcut */}
        <button
          onDoubleClick={() => openWindow('resume')}
          onClick={() => isMobile && openWindow('resume')}
          className="flex flex-col items-center justify-center text-center p-2 rounded-md hover:bg-white/15 focus:bg-white/20 active:bg-white/25 border border-transparent focus:border-dotted focus:border-white/40 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center shadow-sm relative overflow-hidden mb-1">
            <FileText className="w-9 h-9 text-blue-100 group-hover:scale-105 transition-transform" />
            <span className="absolute bottom-1 right-1 text-[10px] font-bold bg-amber-500 text-white px-0.5 rounded">TXT</span>
          </div>
          <span className="text-white text-xs font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
            Resume.txt
          </span>
        </button>

        {/* Internet Explorer Shortcut */}
        <button
          onDoubleClick={() => openWindow('ie')}
          onClick={() => isMobile && openWindow('ie')}
          className="flex flex-col items-center justify-center text-center p-2 rounded-md hover:bg-white/15 focus:bg-white/20 border border-transparent focus:border-dotted focus:border-white/40 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center relative mb-1">
            <div className="absolute inset-0 bg-blue-600/30 rounded-full blur-xs" />
            <Globe className="w-10 h-10 text-cyan-300 group-hover:scale-105 transition-transform drop-shadow" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
            Web Projects
          </span>
        </button>

        {/* LeetCode Command Prompt Shortcut */}
        <button
          onDoubleClick={() => openWindow('cmd')}
          onClick={() => isMobile && openWindow('cmd')}
          className="flex flex-col items-center justify-center text-center p-2 rounded-md hover:bg-white/15 focus:bg-white/20 border border-transparent focus:border-dotted focus:border-white/40 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-black border border-zinc-600 rounded-md flex items-center justify-center mb-1">
            <Terminal className="w-8 h-8 text-emerald-400 group-hover:scale-105 transition-transform" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
            LeetCode CMD
          </span>
        </button>

        {/* Skills & Control Panel */}
        <button
          onDoubleClick={() => openWindow('control')}
          onClick={() => isMobile && openWindow('control')}
          className="flex flex-col items-center justify-center text-center p-2 rounded-md hover:bg-white/15 focus:bg-white/20 border border-transparent focus:border-dotted focus:border-white/40 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-zinc-300 border-2 border-outset border-white rounded-md flex items-center justify-center mb-1 shadow-md">
            <Settings className="w-8 h-8 text-blue-700 group-hover:scale-105 transition-transform" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
            Control Panel
          </span>
        </button>

        {/* Minesweeper Shortcut */}
        <button
          onDoubleClick={() => openWindow('mines')}
          onClick={() => isMobile && openWindow('mines')}
          className="flex flex-col items-center justify-center text-center p-2 rounded-md hover:bg-white/15 focus:bg-white/20 border border-transparent focus:border-dotted focus:border-white/40 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-[#c0c0c0] border-2 border-outset rounded-md flex items-center justify-center mb-1 shadow-md">
            <span className="text-2xl group-hover:scale-110 transition-transform">💣</span>
          </div>
          <span className="text-white text-xs font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
            Mines.exe
          </span>
        </button>

        {/* Paint Shortcut */}
        <button
          onDoubleClick={() => openWindow('paint')}
          onClick={() => isMobile && openWindow('paint')}
          className="flex flex-col items-center justify-center text-center p-2 rounded-md hover:bg-white/15 focus:bg-white/20 border border-transparent focus:border-dotted focus:border-white/40 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-[#0058e6] to-[#eaeae2] border border-zinc-400 rounded-md flex items-center justify-center mb-1 shadow-sm">
            <Palette className="w-8 h-8 text-amber-500 group-hover:scale-105 transition-transform" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
            Paint.exe
          </span>
        </button>

        {/* Recycle Bin */}
        <button
          onDoubleClick={() => {
            alert("Bugs Recycle Bin: Contains 143 unresolved memory leaks and legacy PHP scripts. Successfully emptied! 🧹");
          }}
          onClick={() => {
            if (isMobile) alert("Bugs Recycle Bin: Contains 143 unresolved memory leaks and legacy PHP scripts. Successfully emptied! 🧹");
          }}
          className="flex flex-col items-center justify-center text-center p-2 rounded-md hover:bg-white/15 focus:bg-white/20 border border-transparent focus:border-dotted focus:border-white/40 cursor-pointer group"
        >
          <Trash2 className="w-10 h-10 text-cyan-200 group-hover:scale-105 transition-transform drop-shadow" />
          <span className="text-white text-xs font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
            Recycle Bin
          </span>
        </button>
      </div>

      {/* --- Windows Container --- */}
      <div className="absolute inset-0 pt-4 px-12 md:pl-36 pb-12 select-text pointer-events-none">
        {windows
          .filter(w => w.isOpen)
          .sort((a, b) => a.zIndex - b.zIndex)
          .map(w => {
            const isActive = activeWindowId === w.id;
            return (
              <div
                key={w.id}
                style={{
                  zIndex: w.zIndex,
                  transform: w.isMaximized || isMobile
                    ? 'translate(0px, 0px)'
                    : `translate(${w.x}px, ${w.y}px)`,
                  width: w.isMaximized || isMobile ? '100%' : `${w.width}px`,
                  height: w.isMaximized || isMobile ? 'calc(100vh - 40px)' : `${w.height}px`,
                  position: 'absolute',
                  top: w.isMaximized || isMobile ? 0 : undefined,
                  left: w.isMaximized || isMobile ? 0 : undefined
                }}
                className={`flex flex-col bg-[#f0f0e8] border-[3px] rounded-t-lg shadow-2xl pointer-events-auto transition-shadow duration-150 ${
                  w.isMinimized ? 'hidden' : ''
                } ${
                  isActive
                    ? 'border-[#0058e6] shadow-blue-500/10'
                    : 'border-[#7b9ed6] shadow-black/15'
                }`}
                onClick={() => bringToFront(w.id)}
              >
                {/* Window Header */}
                <div
                  onMouseDown={e => handleHeaderMouseDown(w.id, e)}
                  onDoubleClick={() => toggleMaximizeWindow(w.id)}
                  className={`flex items-center justify-between p-1 select-none cursor-move ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0058e6] via-[#2d8eff] to-[#0058e6]'
                      : 'bg-gradient-to-r from-[#7b9ed6] via-[#9dbbe7] to-[#7b9ed6]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 px-1">
                    {w.icon === 'notepad' && <FileText className="w-4 h-4 text-white" />}
                    {w.icon === 'ie' && <Globe className="w-4 h-4 text-white" />}
                    {w.icon === 'control' && <Settings className="w-4 h-4 text-white" />}
                    {w.icon === 'cmd' && <Terminal className="w-4 h-4 text-white" />}
                    {w.icon === 'mines' && <span className="text-xs">💣</span>}
                    {w.icon === 'paint' && <Palette className="w-4 h-4 text-white" />}
                    {w.icon === 'mycomputer' && <Cpu className="w-4 h-4 text-white" />}
                    <span className="text-white text-xs font-bold font-sans drop-shadow-sm truncate max-w-[200px] md:max-w-none">
                      {w.title}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {/* Minimize Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        minimizeWindow(w.id);
                      }}
                      className="w-5 h-5 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white rounded border border-blue-800 shadow-sm active:bg-blue-700"
                    >
                      <Minus className="w-3 h-3 stroke-[3]" />
                    </button>
                    {/* Maximize Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleMaximizeWindow(w.id);
                      }}
                      className="w-5 h-5 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white rounded border border-blue-800 shadow-sm active:bg-blue-700"
                    >
                      <Maximize2 className="w-2.5 h-2.5 stroke-[3]" />
                    </button>
                    {/* Close Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        closeWindow(w.id);
                      }}
                      className="w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-400 text-white rounded border border-red-700 shadow-sm active:bg-red-600 font-bold"
                    >
                      <X className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* Window Body */}
                <div className="flex-1 overflow-auto flex flex-col min-h-0 bg-[#f0f0e8]">
                  {/* --- NOTEPAD / RESUME --- */}
                  {w.id === 'resume' && (
                    <div className="flex-1 flex flex-col min-h-0">
                      {/* Menu Bar */}
                      <div className="flex gap-4 border-b border-zinc-300 px-2 py-0.5 text-xs text-black bg-[#f0f0e8] select-none">
                        <span className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded cursor-pointer">File</span>
                        <span className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded cursor-pointer">Edit</span>
                        <span className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded cursor-pointer">Format</span>
                        <span className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded cursor-pointer">View</span>
                        <span className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded cursor-pointer">Help</span>
                      </div>
                      <div className="flex-1 bg-white p-4 font-mono text-xs md:text-sm text-zinc-900 overflow-y-auto leading-relaxed border-t border-zinc-400">
                        <div className="border-b border-zinc-200 pb-3 mb-3">
                          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-blue-900">NALLUKUMAR R</h1>
                          <p className="text-zinc-600 font-sans mt-1 text-xs font-semibold">Software Engineer</p>
                          <p className="text-zinc-500 text-xs mt-0.5 font-sans">
                            kumar10naidu@gmail.com | +91 6369614270 | Tamil Nadu, India
                          </p>
                        </div>

                        <div className="mb-4">
                          <p className="text-blue-800 font-bold border-b border-blue-100 pb-0.5 mb-1 text-sm uppercase">SUMMARY</p>
                          <p className="text-zinc-700 text-xs md:text-sm">
                            Java Full Stack Developer and Software Engineer currently contributing to Cloud & Infrastructure at
                            <strong className="text-zinc-900"> American Express</strong>. Building and maintaining scalable enterprise services and collaborating with DevOps teams for CI/CD pipelines and production release management. Strong problem solver who actively participates in weekly LeetCode coding contests and consistently solves algorithmic challenges. Passionate about continuous learning, clean and secure code practices, and delivering efficient, enterprise-grade applications.
                          </p>
                        </div>

                        <div className="mb-4">
                          <p className="text-blue-800 font-bold border-b border-blue-100 pb-0.5 mb-1 text-sm uppercase">WORK EXPERIENCE</p>
                          <div className="mb-2">
                            <div className="flex flex-col md:flex-row justify-between font-bold text-zinc-800 text-xs md:text-sm">
                              <span>Developer Trainee - Cloud & Infrastructure</span>
                              <span className="text-zinc-500 font-normal md:font-bold">Jan 2026 - Present</span>
                            </div>
                            <div className="text-blue-900 font-bold text-xs">American Express</div>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-zinc-700 text-xs md:text-sm">
                              <li>Developing and maintaining scalable backend services using Java Full Stack.</li>
                              <li>Building and supporting REST APIs and backend logic for internal applications.</li>
                              <li>Detecting, triaging, and fixing security vulnerabilities in production codebases.</li>
                              <li>Working with databases (PostgreSQL, MySQL) handling data processing and integrity.</li>
                              <li>Collaborating with DevOps teams for CI/CD pipelines and cloud release deployments.</li>
                              <li>Writing secure, production-ready code adhering to enterprise compliance standards.</li>
                            </ul>
                          </div>

                          <div>
                            <div className="flex flex-col md:flex-row justify-between font-bold text-zinc-800 text-xs md:text-sm">
                              <span>Web Development Internship</span>
                              <span className="text-zinc-500 font-normal md:font-bold">Apr 2023 - May 2023</span>
                            </div>
                            <div className="text-blue-900 font-bold text-xs">ARSUS Solutions & Services Pvt Ltd, Coimbatore</div>
                            <ul className="list-disc pl-5 mt-1 text-zinc-700 text-xs md:text-sm">
                              <li>Gained hands-on experience in building and maintaining web applications.</li>
                              <li>Demonstrated strong learning ability and commitment to project tasks under sprint deadlines.</li>
                            </ul>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-blue-800 font-bold border-b border-blue-100 pb-0.5 mb-1 text-sm uppercase">EDUCATION</p>
                          <div className="space-y-2 text-xs md:text-sm">
                            <div>
                              <div className="flex justify-between font-bold text-zinc-800">
                                <span>B.E Computer Science and Engineering</span>
                                <span className="text-zinc-500">2022 - 2025</span>
                              </div>
                              <div className="text-zinc-600">PSNA College of Engineering and Technology, Dindigul</div>
                              <div className="text-blue-900 font-bold">CGPA: 7.23</div>
                            </div>
                            <div>
                              <div className="flex justify-between font-bold text-zinc-800">
                                <span>Diploma Graduation</span>
                                <span className="text-zinc-500">2019 - 2021</span>
                              </div>
                              <div className="text-zinc-600">TKSPC Theni</div>
                            </div>
                            <div>
                              <div className="flex justify-between font-bold text-zinc-800">
                                <span>SSLC</span>
                                <span className="text-zinc-500">2017 - 2018</span>
                              </div>
                              <div className="text-zinc-600">JC Matric School Periyakulam</div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center pt-2 select-none">
                          <button
                            onClick={() => {
                              alert("Saving 'Resume.txt' to cloud database... Status: Succeeded!");
                            }}
                            className="px-4 py-1.5 bg-[#eaeae2] hover:bg-[#d8d8d0] border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800 shadow"
                          >
                            Save Resume To Local Memory
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- INTERNET EXPLORER --- */}
                  {w.id === 'ie' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#f0f0e8]">
                      {/* Browser Toolbar */}
                      <div className="flex items-center gap-2 border-b border-zinc-300 p-1.5 bg-[#eaeae2] text-xs text-zinc-700 select-none flex-wrap">
                        <button
                          onClick={() => changeIeTab('mindbuddy')}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded border ${
                            ieTab === 'mindbuddy'
                              ? 'bg-white border-zinc-400 font-bold text-blue-900'
                              : 'border-transparent hover:bg-zinc-200'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5 text-red-500" />
                          Mind Buddy
                        </button>
                        <button
                          onClick={() => changeIeTab('youclone')}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded border ${
                            ieTab === 'youclone'
                              ? 'bg-white border-zinc-400 font-bold text-blue-900'
                              : 'border-transparent hover:bg-zinc-200'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 text-red-600" />
                          You-Clone
                        </button>
                        <button
                          onClick={() => changeIeTab('hashforge')}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded border ${
                            ieTab === 'hashforge'
                              ? 'bg-white border-zinc-400 font-bold text-blue-900'
                              : 'border-transparent hover:bg-zinc-200'
                          }`}
                        >
                          <span className="text-amber-500 font-bold">🔒</span>
                          Hash-Forge
                        </button>
                      </div>

                      {/* Address Bar */}
                      <div className="flex items-center gap-1 border-b border-zinc-300 p-1.5 bg-[#f0f0e8] text-xs">
                        <span className="text-zinc-500 font-semibold pl-1">Address:</span>
                        <div className="flex-1 flex items-center bg-white border border-zinc-400 rounded px-2 py-0.5 shadow-inner">
                          <Globe className="w-3.5 h-3.5 text-sky-600 mr-1.5" />
                          <span className="text-zinc-800 font-mono w-full truncate">{ieUrl}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (ieTab === 'hashforge') generatePassword();
                          }}
                          className="p-1 bg-[#eaeae2] hover:bg-zinc-200 border border-zinc-400 rounded shadow-sm"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Tab Contents */}
                      <div className="flex-1 overflow-y-auto bg-white p-4">
                        {/* A. MIND BUDDY */}
                        {ieTab === 'mindbuddy' && (
                          <div className="max-w-2xl mx-auto">
                            <div className="flex items-center justify-between border-b pb-2 mb-4">
                              <div>
                                <h2 className="text-xl font-bold text-[#4c8435] flex items-center gap-2">
                                  <Sparkles className="w-6 h-6 text-emerald-500" /> Mind Buddy
                                </h2>
                                <p className="text-xs text-zinc-500">Mental Health CBT (Cognitive Behavioral Therapy) Tracker</p>
                              </div>
                              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-bold">
                                Live Tracker
                              </span>
                            </div>

                            <form onSubmit={handleAddCbt} className="bg-zinc-50 p-4 border rounded-md mb-6 shadow-xs">
                              <h3 className="font-bold text-zinc-800 text-sm mb-3">Refuse Negative Thoughts & Reframer</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-xs font-bold text-zinc-600 mb-1">Select Your Current Mood</label>
                                  <div className="flex gap-2 flex-wrap">
                                    {[
                                      { mood: 'Happy', emoji: '😊' },
                                      { mood: 'Anxious', emoji: '😰' },
                                      { mood: 'Stressed', emoji: '😫' },
                                      { mood: 'Calm', emoji: '😌' },
                                      { mood: 'Sad', emoji: '😢' }
                                    ].map(m => (
                                      <button
                                        type="button"
                                        key={m.mood}
                                        onClick={() => {
                                          setNewMood(m.mood);
                                          setNewMoodEmoji(m.emoji);
                                        }}
                                        className={`px-3 py-1 text-xs rounded border transition font-semibold flex items-center gap-1 cursor-pointer ${
                                          newMood === m.mood
                                            ? 'bg-[#4c8435] text-white border-emerald-700'
                                            : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                                        }`}
                                      >
                                        <span>{m.emoji}</span>
                                        <span>{m.mood}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <label className="block text-xs font-bold text-zinc-600 mb-1">Negative or Unhelpful Thought</label>
                                <input
                                  type="text"
                                  value={newThought}
                                  onChange={e => setNewThought(e.target.value)}
                                  placeholder="e.g. 'I don't think I can finish the Java backend services API under time pressure.'"
                                  className="w-full text-xs p-2 border rounded focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                                />
                              </div>

                              <div className="mb-4">
                                <label className="block text-xs font-bold text-zinc-600 mb-1">Reframed, Constructive Alternative Thought (CBT)</label>
                                <textarea
                                  value={newReframed}
                                  onChange={e => setNewReframed(e.target.value)}
                                  placeholder="e.g. 'I can break down the task, utilize my skills in Java/SQL, and ask the American Express cloud team for feedback.'"
                                  className="w-full text-xs p-2 border rounded focus:ring-1 focus:ring-emerald-500 focus:outline-hidden h-20 resize-none"
                                />
                              </div>

                              <button
                                type="submit"
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded shadow-xs"
                              >
                                Log Thought & Reframing
                              </button>
                            </form>

                            <h3 className="font-bold text-zinc-800 text-sm mb-3">Logged Thoughts History</h3>
                            <div className="space-y-3">
                              {cbtEntries.map(entry => (
                                <div key={entry.id} className="border border-zinc-200 rounded-md p-3 hover:shadow-xs transition">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">{entry.moodEmoji}</span>
                                      <span className="text-xs font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full">
                                        {entry.mood}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-zinc-400">{entry.date}</span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                    <div className="bg-red-50 p-2.5 rounded border border-red-100">
                                      <span className="font-bold text-red-700 block mb-1">Automatic Negative Thought:</span>
                                      <p className="text-zinc-700 italic">"{entry.thought}"</p>
                                    </div>
                                    <div className="bg-emerald-50 p-2.5 rounded border border-emerald-100">
                                      <span className="font-bold text-emerald-700 block mb-1">CBT Restructuring:</span>
                                      <p className="text-zinc-700 font-medium">"{entry.reframed}"</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* B. YOU-CLONE */}
                        {ieTab === 'youclone' && (
                          <div>
                            {/* Selected Video Player View */}
                            {selectedYtVideo ? (
                              <div className="max-w-2xl mx-auto bg-zinc-50 p-4 border rounded-lg mb-6">
                                <button
                                  onClick={() => setSelectedYtVideo(null)}
                                  className="mb-3 text-xs text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  ← Back to Feed
                                </button>
                                <div className="aspect-video bg-black rounded-lg relative overflow-hidden mb-3 flex items-center justify-center">
                                  {/* Simulated video playback or loading */}
                                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
                                    {videoProgress < 100 ? (
                                      <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2" />
                                        <p className="text-xs text-zinc-400">Loading {videoProgress}%</p>
                                      </div>
                                    ) : (
                                      <div className="text-center p-6">
                                        <Check className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                                        <p className="text-sm font-bold text-zinc-200">Video Finished Successfully!</p>
                                        <p className="text-xs text-zinc-400 mt-1">Nallukumar's developer trajectory complete.</p>
                                      </div>
                                    )}

                                    {/* Control Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 flex items-center gap-3">
                                      <button
                                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                                        className="text-white hover:text-red-500 transition"
                                      >
                                        {isVideoPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                                      </button>
                                      <div className="flex-1 bg-zinc-700 h-1 rounded overflow-hidden">
                                        <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${videoProgress}%` }} />
                                      </div>
                                      <span className="text-[10px] text-zinc-400">{videoProgress}%</span>
                                    </div>
                                  </div>
                                </div>

                                <h3 className="text-base font-bold text-zinc-900 mb-1">{selectedYtVideo.title}</h3>
                                <div className="flex justify-between items-center border-b pb-3 mb-3 text-xs">
                                  <div>
                                    <span className="font-bold text-zinc-700">{selectedYtVideo.channel}</span>
                                    <span className="text-zinc-500 ml-2">{selectedYtVideo.views} • {selectedYtVideo.time}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={handleYtLike}
                                      className="flex items-center gap-1 px-3 py-1 bg-zinc-200 hover:bg-zinc-300 rounded font-semibold text-zinc-700"
                                    >
                                      <ThumbsUp className="w-3.5 h-3.5" />
                                      <span>{selectedYtVideo.likes}</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Comments Section */}
                                <div>
                                  <h4 className="font-bold text-zinc-800 text-xs mb-2">Comments ({selectedYtVideo.comments.length})</h4>
                                  <form onSubmit={handleYtComment} className="flex gap-2 mb-4">
                                    <input
                                      type="text"
                                      value={ytCommentText}
                                      onChange={e => setYtCommentText(e.target.value)}
                                      placeholder="Add a public comment..."
                                      className="flex-1 text-xs p-2 border rounded"
                                    />
                                    <button
                                      type="submit"
                                      className="px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded"
                                    >
                                      Comment
                                    </button>
                                  </form>

                                  <div className="space-y-3">
                                    {selectedYtVideo.comments.map((comment, index) => (
                                      <div key={index} className="text-xs border-b pb-2">
                                        <div className="flex justify-between font-bold text-zinc-700 mb-0.5">
                                          <span>@{comment.user}</span>
                                          <span className="text-zinc-400 font-normal text-[10px]">{comment.date}</span>
                                        </div>
                                        <p className="text-zinc-600">{comment.text}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-1.5 border-b pb-2">
                                  <Play className="w-5 h-5 fill-red-600" /> You-Clone Media Feed
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {ytVideos.map(video => (
                                    <div
                                      key={video.id}
                                      onClick={() => playVideo(video)}
                                      className="border rounded-md overflow-hidden hover:shadow-md cursor-pointer transition bg-zinc-50"
                                    >
                                      <div className="aspect-video bg-zinc-800 relative flex items-center justify-center">
                                        <Play className="w-10 h-10 text-white/80" />
                                        <span className="absolute bottom-1.5 right-1.5 bg-black text-white text-[10px] px-1 rounded">
                                          10:00
                                        </span>
                                      </div>
                                      <div className="p-3 text-xs">
                                        <h3 className="font-bold text-zinc-800 line-clamp-2 leading-snug mb-1.5">
                                          {video.title}
                                        </h3>
                                        <p className="text-zinc-500 font-semibold">{video.channel}</p>
                                        <p className="text-zinc-400 text-[10px] mt-0.5">
                                          {video.views} • {video.time}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* C. HASH-FORGE */}
                        {ieTab === 'hashforge' && (
                          <div className="max-w-md mx-auto border border-zinc-200 rounded-lg shadow-sm p-5 bg-zinc-50">
                            <div className="text-center mb-6">
                              <span className="text-4xl">🔐</span>
                              <h2 className="text-xl font-bold text-zinc-800 mt-2">Hash-Forge</h2>
                              <p className="text-xs text-zinc-500">Sleek, Simple & Secure Password Generator</p>
                            </div>

                            {/* Output Box */}
                            <div className="flex items-center gap-2 bg-white border border-zinc-300 rounded p-2.5 mb-4 shadow-inner">
                              <span className="font-mono text-sm font-bold text-zinc-800 flex-1 break-all select-all">
                                {generatedPwd}
                              </span>
                              <button
                                onClick={copyPassword}
                                className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition ${
                                  pwdCopied ? 'bg-emerald-500 text-white' : 'bg-[#eaeae2] hover:bg-zinc-200 text-zinc-700'
                                }`}
                              >
                                {pwdCopied ? 'Copied!' : 'Copy'}
                              </button>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 text-xs text-zinc-700">
                              <div>
                                <div className="flex justify-between font-semibold mb-1">
                                  <span>Password Length:</span>
                                  <span className="font-bold text-amber-600">{pwdLength}</span>
                                </div>
                                <input
                                  type="range"
                                  min="8"
                                  max="32"
                                  value={pwdLength}
                                  onChange={e => setPwdLength(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-pointer"
                                />
                              </div>

                              <div className="grid grid-cols-1 gap-2 border-t pt-3">
                                <label className="flex items-center gap-2 cursor-pointer font-medium">
                                  <input
                                    type="checkbox"
                                    checked={includeUpper}
                                    onChange={e => setIncludeUpper(e.target.checked)}
                                    className="accent-amber-500"
                                  />
                                  Include Uppercase Letters (A-Z)
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer font-medium">
                                  <input
                                    type="checkbox"
                                    checked={includeNumbers}
                                    onChange={e => setIncludeNumbers(e.target.checked)}
                                    className="accent-amber-500"
                                  />
                                  Include Numbers (0-9)
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer font-medium">
                                  <input
                                    type="checkbox"
                                    checked={includeSymbols}
                                    onChange={e => setIncludeSymbols(e.target.checked)}
                                    className="accent-amber-500"
                                  />
                                  Include Secure Symbols (!@#$)
                                </label>
                              </div>

                              <button
                                onClick={generatePassword}
                                className="w-full mt-4 py-2 bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded shadow-sm cursor-pointer"
                              >
                                Forge Strong Password
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- CONTROL PANEL / SKILLS --- */}
                  {w.id === 'control' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#f0f0e8]">
                      {/* Control Panel Header */}
                      <div className="bg-[#eaeae2] p-3 border-b border-zinc-300 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="w-6 h-6 text-blue-800" />
                          <div>
                            <h2 className="text-sm font-bold text-zinc-800">Control Panel</h2>
                            <p className="text-[10px] text-zinc-500">Customize and view Nallukumar's developer skills and configurations.</p>
                          </div>
                        </div>
                      </div>

                      {/* Main Grid */}
                      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Skills category */}
                        <div className="border border-zinc-300 bg-white rounded-md p-3.5 shadow-xs">
                          <div className="flex items-center gap-2 mb-2 border-b pb-1.5">
                            <Code className="w-5 h-5 text-blue-700" />
                            <h3 className="font-bold text-zinc-800 text-xs">Core Programming Languages</h3>
                          </div>
                          <div className="space-y-2">
                            {[
                              { lang: 'Java (Spring Boot, Hibernate)', val: 95 },
                              { lang: 'Python', val: 80 },
                              { lang: 'SQL', val: 90 },
                              { lang: 'JS / TS (React)', val: 85 }
                            ].map(x => (
                              <div key={x.lang} className="text-xs">
                                <div className="flex justify-between mb-0.5 font-medium text-zinc-700">
                                  <span>{x.lang}</span>
                                  <span>{x.val}%</span>
                                </div>
                                <div className="w-full bg-zinc-100 h-3 border border-zinc-300 p-0.5 rounded shadow-inner flex">
                                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-xs" style={{ width: `${x.val}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Database category */}
                        <div className="border border-zinc-300 bg-white rounded-md p-3.5 shadow-xs">
                          <div className="flex items-center gap-2 mb-2 border-b pb-1.5">
                            <Database className="w-5 h-5 text-indigo-700" />
                            <h3 className="font-bold text-zinc-800 text-xs">Databases & Tools</h3>
                          </div>
                          <div className="space-y-2">
                            {[
                              { lang: 'MySQL Workbench', val: 85 },
                              { lang: 'PostgreSQL', val: 90 },
                              { lang: 'Git & Enterprise CI/CD', val: 85 },
                              { lang: 'IntelliJ / VS Code', val: 95 }
                            ].map(x => (
                              <div key={x.lang} className="text-xs">
                                <div className="flex justify-between mb-0.5 font-medium text-zinc-700">
                                  <span>{x.lang}</span>
                                  <span>{x.val}%</span>
                                </div>
                                <div className="w-full bg-zinc-100 h-3 border border-zinc-300 p-0.5 rounded shadow-inner flex">
                                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full rounded-xs" style={{ width: `${x.val}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Focus / Coursework category */}
                        <div className="border border-zinc-300 bg-white rounded-md p-3.5 shadow-xs">
                          <div className="flex items-center gap-2 mb-2 border-b pb-1.5">
                            <ShieldAlert className="w-5 h-5 text-emerald-700" />
                            <h3 className="font-bold text-zinc-800 text-xs">Security & Coursework</h3>
                          </div>
                          <div className="space-y-1 text-xs text-zinc-600 font-semibold list-none">
                            <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded border border-emerald-100 mb-1.5 text-emerald-800">
                              <Check className="w-4 h-4" />
                              <span>Cyber Security & Threat Analysis</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded border border-emerald-100 mb-1.5 text-emerald-800">
                              <Check className="w-4 h-4" />
                              <span>Ethical Hacking Coursework</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded border border-emerald-100 mb-1.5 text-emerald-800">
                              <Check className="w-4 h-4" />
                              <span>Object-Oriented Programming (OOPS)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded border border-emerald-100 text-emerald-800">
                              <Check className="w-4 h-4" />
                              <span>Secure Code Compliance (AMEX Standards)</span>
                            </div>
                          </div>
                        </div>

                        {/* User Accounts category */}
                        <div className="border border-zinc-300 bg-white rounded-md p-3.5 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2 border-b pb-1.5">
                              <User className="w-5 h-5 text-blue-600" />
                              <h3 className="font-bold text-zinc-800 text-xs">Administrator Info</h3>
                            </div>
                            <div className="flex gap-3 items-center">
                              <div className="w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-lg flex items-center justify-center border border-blue-700 shadow-md">
                                NR
                              </div>
                              <div className="text-xs">
                                <p className="font-bold text-zinc-800">NALLUKUMAR R</p>
                                <p className="text-zinc-500 font-medium">System Developer Administrator</p>
                                <p className="text-[10px] text-zinc-400">American Express Trainee</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right mt-3">
                            <button
                              onClick={() => {
                                alert("Vulnerability Scan Status: 0 Threats found. Nallukumar's developer environment is clean and safe!");
                              }}
                              className="px-3 py-1.5 bg-[#eaeae2] hover:bg-[#d8d8d0] border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800 shadow"
                            >
                              Scan Vulnerabilities
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- COMMAND PROMPT / LEETCODE --- */}
                  {w.id === 'cmd' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-black text-emerald-400 font-mono text-xs md:text-sm p-4 overflow-y-auto">
                      <div className="flex-1 space-y-1">
                        {cmdHistory.map((line, i) => (
                          <div key={i} className="whitespace-pre-wrap leading-relaxed">{line}</div>
                        ))}
                        {cmdIsRunning && (
                          <div className="flex items-center gap-1.5">
                            <div className="animate-pulse bg-emerald-400 h-4 w-1.5" />
                            <span>Compiling algos...</span>
                          </div>
                        )}
                        <div ref={terminalBottomRef} />
                      </div>

                      {!cmdIsRunning && (
                        <form onSubmit={handleCmdSubmit} className="flex gap-1 items-center border-t border-zinc-800 pt-2.5 mt-2">
                          <span className="text-zinc-400 shrink-0 select-none">C:\Documents and Settings\Nallukumar&gt;</span>
                          <input
                            type="text"
                            value={cmdInput}
                            onChange={e => setCmdInput(e.target.value)}
                            className="flex-1 bg-transparent text-emerald-400 border-none outline-hidden p-0 font-mono text-xs md:text-sm"
                            placeholder="Type 'help' or 'leetcode'..."
                            autoFocus
                          />
                        </form>
                      )}
                    </div>
                  )}

                  {/* --- MINESWEEPER --- */}
                  {w.id === 'mines' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#bdbdbd] p-3 text-black font-sans select-none border-t border-white">
                      {/* Game Header */}
                      <div className="flex justify-between items-center bg-[#bdbdbd] border-b-2 border-zinc-500 pb-3 mb-3">
                        <div className="bg-black text-red-500 font-mono text-xl px-2.5 py-0.5 rounded border border-zinc-600 w-14 text-center">
                          {minesRemaining.toString().padStart(3, '0')}
                        </div>

                        <button
                          onClick={initMinesweeper}
                          className="w-10 h-10 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-zinc-600 bg-[#bdbdbd] flex items-center justify-center text-xl hover:bg-zinc-200 shadow-sm active:border-t-2 active:border-l-2 active:border-zinc-600"
                        >
                          {minesState === 'won' ? '😎' : minesState === 'lost' ? '😵' : '😊'}
                        </button>

                        <div className="bg-black text-red-500 font-mono text-xl px-2.5 py-0.5 rounded border border-zinc-600 w-14 text-center">
                          {minesTimer.toString().padStart(3, '0')}
                        </div>
                      </div>

                      {/* Mines Grid */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="grid grid-cols-8 gap-[1px] border-4 border-t-zinc-600 border-l-zinc-600 border-b-white border-r-white bg-zinc-600 p-[1px]">
                          {minesGrid.map((row, y) =>
                            row.map((cell, x) => {
                              const isRevealed = cell.isRevealed;
                              const isFlagged = cell.isFlagged;
                              const isMine = cell.isMine;

                              return (
                                <button
                                  key={`${x}-${y}`}
                                  onClick={() => revealCell(x, y)}
                                  onContextMenu={e => flagCell(e, x, y)}
                                  className={`w-8 h-8 flex items-center justify-center font-bold text-xs md:text-sm select-none border-t-2 border-l-2 ${
                                    isRevealed
                                      ? 'bg-[#bdbdbd] border-zinc-400 border-t border-l'
                                      : 'bg-[#bdbdbd] border-white border-b-2 border-r-2 border-zinc-600 active:border-t-2 active:border-l-2 active:border-zinc-400'
                                  }`}
                                >
                                  {isRevealed ? (
                                    isMine ? (
                                      '💣'
                                    ) : cell.neighborMines > 0 ? (
                                      <span
                                        className={
                                          cell.neighborMines === 1
                                            ? 'text-blue-700'
                                            : cell.neighborMines === 2
                                            ? 'text-emerald-700'
                                            : cell.neighborMines === 3
                                            ? 'text-red-700'
                                            : 'text-purple-800'
                                        }
                                      >
                                        {cell.neighborMines}
                                      </span>
                                    ) : (
                                      ''
                                    )
                                  ) : isFlagged ? (
                                    '🚩'
                                  ) : (
                                    ''
                                  )}
                                </button>
                              );
                            })
                          )}
                        </div>
                      </div>

                      {/* Instructions */}
                      <p className="text-[10px] text-zinc-600 text-center mt-3 leading-tight">
                        Left-Click: Sweep • Right-Click / Hold: Flag 🚩
                      </p>
                    </div>
                  )}

                  {/* --- PAINT --- */}
                  {w.id === 'paint' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#f0f0e8] select-none">
                      {/* Tool selection bar */}
                      <div className="flex gap-3 items-center border-b border-zinc-300 p-2 bg-[#eaeae2] text-xs">
                        <button
                          onClick={clearPaint}
                          className="px-2.5 py-1 bg-white border border-zinc-400 hover:bg-zinc-100 rounded text-[10px] font-bold cursor-pointer"
                        >
                          Clear Canvas
                        </button>

                        <div className="h-4 border-r border-zinc-400" />

                        {/* Brush width slider */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-zinc-600">Brush Size:</span>
                          <input
                            type="range"
                            min="1"
                            max="12"
                            value={paintBrushSize}
                            onChange={e => setPaintBrushSize(parseInt(e.target.value))}
                            className="w-20 accent-blue-600 cursor-pointer h-1"
                          />
                        </div>

                        <div className="h-4 border-r border-zinc-400" />

                        {/* Palette selections */}
                        <div className="flex gap-1">
                          {['black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'white'].map(color => (
                            <button
                              key={color}
                              onClick={() => setPaintColor(color)}
                              className={`w-4 h-4 rounded border cursor-pointer ${
                                paintColor === color ? 'ring-2 ring-blue-600 border-white' : 'border-zinc-400'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Main Canvas Area */}
                      <div className="flex-1 bg-white p-3.5 flex items-center justify-center overflow-auto">
                        <canvas
                          ref={canvasRef}
                          width={520}
                          height={320}
                          onMouseDown={handlePaintStart}
                          onMouseMove={handlePaintMove}
                          onMouseUp={handlePaintEnd}
                          onMouseLeave={handlePaintEnd}
                          className="border border-zinc-400 shadow-inner bg-white max-w-full"
                          style={{ cursor: 'crosshair' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* --- MY COMPUTER --- */}
                  {w.id === 'mycomputer' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-[#f0f0e8] p-4 text-xs text-zinc-800">
                      <div className="flex gap-4 border-b border-zinc-300 pb-4 mb-4 items-center">
                        <div className="w-16 h-16 bg-[#bdbdbd] border-2 border-outset rounded-md flex items-center justify-center shadow-md">
                          <Cpu className="w-10 h-10 text-blue-700" />
                        </div>
                        <div>
                          <h2 className="text-sm font-bold text-blue-900">Nallukumar R's System Properties</h2>
                          <p className="text-zinc-500 font-medium">Software Engineer & Java Full Stack Developer Trainee</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Operating System: NalluOS Home Edition (2026)</p>
                        </div>
                      </div>

                      {/* Technical specifications */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto">
                        <div className="border border-zinc-300 bg-white p-3 rounded-md shadow-xs">
                          <h3 className="font-bold text-zinc-700 border-b pb-1 mb-2">System Specs</h3>
                          <ul className="space-y-1.5 text-zinc-600 font-semibold list-disc pl-4">
                            <li>CPU: Java virtual engine v17</li>
                            <li>Ram: +91 6369614270 (Active Stack)</li>
                            <li>Database Connection: PostgreSQL (Enabled)</li>
                            <li>Vulnerability Scanner: Cyber Security Active</li>
                          </ul>
                        </div>

                        <div className="border border-zinc-300 bg-white p-3 rounded-md shadow-xs flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-zinc-700 border-b pb-1 mb-2">Connect Directly</h3>
                            <ul className="space-y-1.5 font-bold">
                              <li>
                                <a
                                  href="mailto:kumar10naidu@gmail.com"
                                  className="flex items-center gap-1.5 text-blue-700 hover:underline"
                                >
                                  <Mail className="w-4 h-4" /> Email: kumar10naidu@gmail.com
                                </a>
                              </li>
                              <li>
                                <a
                                  href="https://linkedin.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-blue-700 hover:underline"
                                >
                                  <span className="w-4 h-4 inline-flex items-center justify-center bg-blue-700 text-white rounded text-[10px] font-bold">in</span> LinkedIn
                                </a>
                              </li>
                              <li>
                                <a
                                  href="https://github.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-blue-700 hover:underline"
                                >
                                  <span className="w-4 h-4 inline-flex items-center justify-center bg-zinc-900 text-white rounded text-[10px] font-bold">git</span> GitHub
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className="text-right mt-2">
                            <span className="text-[10px] text-zinc-400 italic">Built with React + Tailwind 2026</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* --- Floating Animated Clippy Assistant --- */}
      {clippyVisible && (
        <div className="fixed bottom-16 right-4 md:right-8 z-[9000] select-none pointer-events-auto flex flex-col items-end max-w-[280px]">
          {/* Clippy speech bubble */}
          <div className="bg-[#ffffe1] border-2 border-black rounded-lg p-3 text-xs text-[#333] shadow-lg relative mb-2">
            <div className="absolute right-6 -bottom-2 w-3.5 h-3.5 bg-[#ffffe1] border-r-2 border-b-2 border-black rotate-45" />
            <p className="font-medium leading-relaxed">{clippySpeech}</p>
            <button
              onClick={() => setClippyVisible(false)}
              className="absolute top-1 right-1 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulated Paperclip (Clippy) character using SVGs & styles */}
          <div
            onClick={() => {
              setClippySpeech("What can I help you discover today? Double-click on 'Web Projects' to see fully interactive web apps!");
            }}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
          >
            <div className="w-14 h-20 bg-zinc-200 border-2 border-zinc-700 rounded-full relative shadow-md flex items-center justify-center p-1.5">
              {/* Eyes */}
              <div className="absolute top-4 left-3 w-3 h-3 bg-white border border-black rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" />
              </div>
              <div className="absolute top-4 right-3 w-3 h-3 bg-white border border-black rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" />
              </div>
              {/* Mouth */}
              <div className="w-3.5 h-1.5 border-b-2 border-black rounded-full mt-3.5" />
              {/* Paperclip inner loop */}
              <div className="absolute top-1 w-8 h-16 border border-zinc-400 rounded-full pointer-events-none" />
            </div>
            <span className="text-[10px] font-bold text-yellow-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] mt-1">
              Click Clippy
            </span>
          </div>
        </div>
      )}

      {/* --- START MENU --- */}
      {startMenuOpen && (
        <div className="absolute bottom-10 left-0 w-[380px] max-w-[95vw] bg-white border-2 border-blue-600 rounded-t-lg shadow-2xl z-[9500] select-none">
          {/* Start Menu Header */}
          <div className="bg-gradient-to-r from-[#0058e6] via-[#2d8eff] to-[#0058e6] p-3 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-base flex items-center justify-center border border-blue-700 shadow">
              NR
            </div>
            <div>
              <h2 className="text-sm font-bold truncate">Nallukumar R</h2>
              <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Software Engineer</p>
            </div>
          </div>

          {/* Start Menu Content */}
          <div className="grid grid-cols-5 bg-[#f0f0e8] min-h-[300px]">
            {/* Left programs pane */}
            <div className="col-span-3 bg-white p-2 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-zinc-400 px-2 block py-0.5 uppercase tracking-wide">Internet & Productivity</span>
              <button
                onClick={() => openWindow('ie')}
                className="w-full text-left flex items-center gap-2 p-1.5 hover:bg-blue-600 hover:text-white rounded transition group cursor-pointer"
              >
                <Globe className="w-5 h-5 text-sky-600 group-hover:text-white" />
                <div>
                  <div className="font-bold">Internet Explorer</div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-blue-100">Web Projects & Live Apps</div>
                </div>
              </button>

              <button
                onClick={() => openWindow('resume')}
                className="w-full text-left flex items-center gap-2 p-1.5 hover:bg-blue-600 hover:text-white rounded transition group cursor-pointer"
              >
                <FileText className="w-5 h-5 text-blue-700 group-hover:text-white" />
                <div>
                  <div className="font-bold">Notepad</div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-blue-100">Resume & Experience</div>
                </div>
              </button>

              <button
                onClick={() => openWindow('cmd')}
                className="w-full text-left flex items-center gap-2 p-1.5 hover:bg-blue-600 hover:text-white rounded transition group cursor-pointer"
              >
                <Terminal className="w-5 h-5 text-zinc-700 group-hover:text-white" />
                <div>
                  <div className="font-bold">Command Prompt</div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-blue-100">LeetCode Contest Solver</div>
                </div>
              </button>

              <span className="text-[10px] font-bold text-zinc-400 px-2 block py-0.5 border-t mt-1 pt-1 uppercase tracking-wide">Leisure & Fun</span>
              <button
                onClick={() => openWindow('mines')}
                className="w-full text-left flex items-center gap-2 p-1.5 hover:bg-blue-600 hover:text-white rounded transition group cursor-pointer"
              >
                <span className="text-base">💣</span>
                <div>
                  <div className="font-bold">Minesweeper</div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-blue-100">Play Classic Sweeper</div>
                </div>
              </button>

              <button
                onClick={() => openWindow('paint')}
                className="w-full text-left flex items-center gap-2 p-1.5 hover:bg-blue-600 hover:text-white rounded transition group cursor-pointer"
              >
                <Palette className="w-5 h-5 text-amber-500 group-hover:text-white" />
                <div>
                  <div className="font-bold">Paint.exe</div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-blue-100">Digital Sketches & Drawing</div>
                </div>
              </button>
            </div>

            {/* Right system settings pane */}
            <div className="col-span-2 bg-[#d8d8d0] p-2 border-l border-zinc-300 space-y-2 text-[11px]">
              <button
                onClick={() => openWindow('mycomputer')}
                className="w-full text-left flex items-center gap-2 p-1 hover:bg-blue-600 hover:text-white rounded transition cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-blue-700" />
                <span className="font-bold">My Computer</span>
              </button>

              <button
                onClick={() => openWindow('control')}
                className="w-full text-left flex items-center gap-2 p-1 hover:bg-blue-600 hover:text-white rounded transition cursor-pointer"
              >
                <Settings className="w-4 h-4 text-zinc-600" />
                <span className="font-bold">Control Panel</span>
              </button>

              <div className="border-t border-zinc-400 my-2" />

              <div className="px-1 py-0.5 space-y-1.5">
                <a
                  href="mailto:kumar10naidu@gmail.com"
                  className="flex items-center gap-1.5 text-zinc-700 font-bold hover:underline"
                >
                  ✉ Email
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-700 font-bold hover:underline"
                >
                  💼 LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-700 font-bold hover:underline"
                >
                  🐙 GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Start Menu Footer */}
          <div className="bg-[#4c8435] p-2 text-white flex justify-end gap-2 text-xs rounded-b-sm">
            <button
              onClick={() => {
                alert("Logged off successfully from NalluOS.");
              }}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 border border-red-800 rounded font-bold cursor-pointer"
            >
              <span>Log Off</span>
            </button>
            <button
              onClick={handleShutDown}
              className="flex items-center gap-1 px-3 py-1 bg-amber-600 hover:bg-amber-700 border border-amber-800 rounded font-bold cursor-pointer"
            >
              <span>Turn Off</span>
            </button>
          </div>
        </div>
      )}

      {/* --- TASKBAR --- */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-[#245dd7] via-[#0042d3] to-[#245dd7] flex items-center justify-between z-[9800] select-none border-t border-blue-900 shadow-md">
        <div className="flex items-center h-full flex-1">
          {/* Start Button */}
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`h-full px-4 flex items-center gap-1.5 bg-gradient-to-b from-[#3c933c] via-[#5ea65e] to-[#3c933c] hover:from-[#4caf50] hover:to-[#388e3c] border-r-2 border-emerald-950 rounded-r-lg shadow-md cursor-pointer transition active:scale-[0.98] ${
              startMenuOpen ? 'brightness-90' : ''
            }`}
          >
            {/* Retro Green Flag Logo */}
            <div className="grid grid-cols-2 gap-[1px] w-3 h-3.5 rotate-6">
              <div className="bg-red-500 rounded-tl-xs" />
              <div className="bg-blue-500 rounded-tr-xs" />
              <div className="bg-yellow-500 rounded-bl-xs" />
              <div className="bg-emerald-500 rounded-br-xs" />
            </div>
            <span className="text-white font-bold italic tracking-wide text-sm font-sans drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              start
            </span>
          </button>

          {/* Active Window tabs */}
          <div className="flex items-center gap-1.5 px-3 overflow-x-auto h-full flex-1 min-w-0">
            {windows
              .filter(w => w.isOpen)
              .map(w => {
                const isActive = activeWindowId === w.id && !w.isMinimized;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      if (isActive) {
                        minimizeWindow(w.id);
                      } else {
                        bringToFront(w.id);
                      }
                    }}
                    className={`h-[30px] px-2.5 rounded flex items-center gap-1.5 text-xs text-white max-w-[150px] shrink-0 font-medium cursor-pointer transition border border-sky-900 ${
                      isActive
                        ? 'bg-gradient-to-b from-[#1c3f9e] to-[#2a59cc] border-t-2 border-t-blue-400'
                        : 'bg-gradient-to-b from-[#3a75e0] to-[#245dd7] hover:bg-blue-500'
                    }`}
                  >
                    {w.icon === 'notepad' && <FileText className="w-3.5 h-3.5 text-blue-100" />}
                    {w.icon === 'ie' && <Globe className="w-3.5 h-3.5 text-cyan-200" />}
                    {w.icon === 'control' && <Settings className="w-3.5 h-3.5 text-zinc-300" />}
                    {w.icon === 'cmd' && <Terminal className="w-3.5 h-3.5 text-emerald-400" />}
                    {w.icon === 'mines' && <span className="text-[10px]">💣</span>}
                    {w.icon === 'paint' && <Palette className="w-3.5 h-3.5 text-amber-300" />}
                    {w.icon === 'mycomputer' && <Cpu className="w-3.5 h-3.5 text-sky-200" />}
                    <span className="truncate">{w.title.split(' - ')[0]}</span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* System Tray */}
        <div className="bg-[#0996f8] border-l-2 border-blue-400 h-full px-3 flex items-center gap-3.5 text-white shadow-inner shrink-0 relative">
          {/* Clippy Toggle */}
          <button
            onClick={() => setClippyVisible(!clippyVisible)}
            className="hover:bg-blue-600 p-1 rounded transition text-blue-100"
            title="Toggle Clippy Assistant"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Volume Icon with Slider popup */}
          <div className="relative">
            <button
              onClick={() => setVolumeOpen(!volumeOpen)}
              className="hover:bg-blue-600 p-1 rounded transition text-blue-100"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            {volumeOpen && (
              <div className="absolute bottom-11 -left-4 bg-[#f0f0e8] border-2 border-blue-600 rounded p-2 text-black w-12 flex flex-col items-center gap-2 shadow-2xl z-[9900]">
                <span className="text-[10px] font-bold">{volumeLevel}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volumeLevel}
                  onChange={e => setVolumeLevel(parseInt(e.target.value))}
                  className="h-16 accent-blue-600 cursor-pointer"
                  style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                />
              </div>
            )}
          </div>

          {/* Network Status popup */}
          <div className="relative">
            <button
              onClick={() => setNetworkOpen(!networkOpen)}
              className="hover:bg-blue-600 p-1 rounded transition text-blue-100"
            >
              <Wifi className="w-4 h-4" />
            </button>
            {networkOpen && (
              <div className="absolute bottom-11 -left-20 bg-[#f0f0e8] border-2 border-blue-600 rounded p-3 text-black text-[10px] w-36 shadow-2xl z-[9900]">
                <p className="font-bold border-b pb-1 text-blue-800">Connection Status</p>
                <p className="font-semibold text-zinc-700 mt-1.5">Speed: 1.0 Gbps</p>
                <p className="font-semibold text-zinc-700 mt-1">Status: Fully Secure</p>
                <p className="font-semibold text-zinc-700 mt-1">DevOps Tunnel Active</p>
              </div>
            )}
          </div>

          {/* Clock */}
          <span className="text-xs font-bold tracking-tight font-sans pl-1 select-none">
            {systemTime}
          </span>
        </div>
      </div>
    </div>
  );
}
