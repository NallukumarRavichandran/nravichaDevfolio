import React, { useState } from 'react';
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
} from 'lucide-react';
import { sounds } from '../../utils/audio';

interface FileExplorerAppProps {
  onOpenApp: (appId: string) => void;
  onOpenNotepadWithText?: (title: string, text: string) => void;
}

interface ExplorerItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'drive' | 'link';
  icon: string;
  size?: string;
  dateModified?: string;
  extension?: string;
  description?: string;
  targetApp?: string;
  externalUrl?: string;
  content?: string;
}

const FILE_SYSTEM: Record<string, ExplorerItem[]> = {
  'this-pc': [
    { id: 'c-drive', name: 'Local Disk (C:)', type: 'drive', icon: '💽', size: '384 GB free of 512 GB', description: 'System volume containing Projects, Skills, and Core Documents' },
    { id: 'd-drive', name: 'Cloud & Work (D:)', type: 'drive', icon: '☁️', size: '180 GB free of 256 GB', description: 'Enterprise Java Full Stack & Microservices Workspace' },
    { id: 'e-drive', name: 'Academic (E:)', type: 'drive', icon: '🎓', size: '54 GB free of 64 GB', description: 'Degree Credentials, Diplomas & Academic Transcripts' },
    { id: 'floppy-a', name: '3½ Floppy (A:)', type: 'drive', icon: '💾', size: '1.44 MB', description: 'Legacy boot diskette' }
  ],
  'c-drive': [
    { id: 'projects-folder', name: 'Projects', type: 'folder', icon: '📁', size: '4 items', dateModified: 'Sep 04, 2026' },
    { id: 'skills-folder', name: 'Skills & Tech Stack', type: 'folder', icon: '📁', size: '8 items', dateModified: 'Sep 03, 2026' },
    { id: 'experience-folder', name: 'Work Experience', type: 'folder', icon: '📁', size: '3 items', dateModified: 'Sep 02, 2026' },
    { id: 'education-folder', name: 'Education', type: 'folder', icon: '📁', size: '3 items', dateModified: 'Aug 28, 2026' },
    { id: 'documents-folder', name: 'Documents', type: 'folder', icon: '📁', size: '3 files', dateModified: 'Sep 01, 2026' },
    {
      id: 'resume-file',
      name: 'Nallukumar_Resume.txt',
      type: 'file',
      icon: '📝',
      size: '9.4 KB',
      dateModified: 'Sep 04, 2026',
      targetApp: 'notepad',
      description: 'Complete unabridged resume for Nallukumar Ravichandran'
    },
    {
      id: 'github-shortcut',
      name: 'GitHub Profile (Online).url',
      type: 'link',
      icon: '🌐',
      size: '1 KB',
      externalUrl: 'https://github.com/NallukumarRavichandran',
      description: 'Real GitHub profile showcasing all open-source repositories'
    },
    {
      id: 'linkedin-shortcut',
      name: 'LinkedIn Profile (Online).url',
      type: 'link',
      icon: '💼',
      size: '1 KB',
      externalUrl: 'https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true',
      description: 'Real verified LinkedIn profile for networking and inquiries'
    }
  ],
  'projects-folder': [
    { id: 'ai-tutor-proj', name: 'Generative AI Tutor', type: 'folder', icon: '🤖', size: '4 items', description: 'Intelligent 1-on-1 AI Tutoring System with RAG & ChromaDB' },
    { id: 'mind-buddy-proj', name: 'Mind Buddy (CBT Tracker)', type: 'folder', icon: '🧠', size: '3 items', description: 'Cognitive Behavioral Therapy mood reframing web app' },
    { id: 'you-clone-proj', name: 'You-Clone Video Platform', type: 'folder', icon: '📺', size: '3 items', description: 'Frontend YouTube UI clone with real interaction' },
    { id: 'hash-forge-proj', name: 'Hash-Forge Generator', type: 'folder', icon: '🔐', size: '3 items', description: 'High-entropy password & SHA-256 cryptographic generator' }
  ],
  'ai-tutor-proj': [
    {
      id: 'ai-tutor-readme',
      name: 'README.md',
      type: 'file',
      icon: '📄',
      size: '4.2 KB',
      dateModified: '2026-09-01',
      content: `# Generative AI Tutor & Adaptive Learning Platform
An intelligent 1-on-1 AI tutoring system engineered to make quality education personalized and accessible.

Key Capabilities:
• Built a Retrieval-Augmented Generation (RAG) pipeline with ChromaDB vector storage and semantic chunking.
• Enforced strict zero-hallucination guardrails and source attribution to guarantee factual responses.
• Developed adaptive learning paths that adjust question difficulty in real time based on learner mastery.
• Tech Stack: Python, FastAPI, ChromaDB, Hugging Face, Ollama, React, Vite.`
    },
    {
      id: 'ai-tutor-demo',
      name: 'Run Interactive RAG Tester.exe',
      type: 'file',
      icon: '⚡',
      size: 'Executable',
      targetApp: 'ie',
      description: 'Test live vector retrieval and hallucination guardrails in Internet Explorer'
    },
    {
      id: 'ai-tutor-repo',
      name: 'GitHub_Repository.url',
      type: 'link',
      icon: '🌐',
      size: '1 KB',
      externalUrl: 'https://github.com/NallukumarRavichandran',
      description: 'Open source repository on GitHub'
    }
  ],
  'mind-buddy-proj': [
    {
      id: 'mind-buddy-readme',
      name: 'README.md',
      type: 'file',
      icon: '📄',
      size: '3.1 KB',
      dateModified: '2026-08-20',
      content: `# Mind Buddy - CBT Mental Health Tracker
A single-page React web application designed to help users identify and reframe cognitive distortions.

Highlights:
• Guided Cognitive Behavioral Therapy (CBT) logging interface with intuitive step-by-step prompts.
• Interactive mood tracking with localized data persistence.
• Clean, accessible, responsive design with soothing color palettes.
• Tech Stack: React, Tailwind CSS, TypeScript, Web Storage API.`
    },
    {
      id: 'mind-buddy-demo',
      name: 'Launch Mind Buddy App.exe',
      type: 'file',
      icon: '🧠',
      size: 'Executable',
      targetApp: 'ie',
      description: 'Launch the interactive Mind Buddy app inside Internet Explorer'
    },
    {
      id: 'mind-buddy-repo',
      name: 'GitHub_Repository.url',
      type: 'link',
      icon: '🌐',
      size: '1 KB',
      externalUrl: 'https://github.com/NallukumarRavichandran'
    }
  ],
  'you-clone-proj': [
    {
      id: 'you-clone-readme',
      name: 'README.md',
      type: 'file',
      icon: '📄',
      size: '2.5 KB',
      dateModified: '2026-07-15',
      content: `# You-Clone - Frontend YouTube UI Clone
Responsive video streaming interface mimicking the core YouTube viewing experience.

Features:
• Dynamic video recommendation feed with mock streaming players.
• Interactive commenting system with like/dislike counts and real-time state manipulation.
• Accessible navigation bar, sidebar drawer, and search bar.
• Tech Stack: HTML, CSS, JavaScript, React, Bootstrap.`
    },
    {
      id: 'you-clone-demo',
      name: 'Launch You-Clone Player.exe',
      type: 'file',
      icon: '📺',
      size: 'Executable',
      targetApp: 'ie'
    },
    {
      id: 'you-clone-repo',
      name: 'GitHub_Repository.url',
      type: 'link',
      icon: '🌐',
      size: '1 KB',
      externalUrl: 'https://github.com/NallukumarRavichandran'
    }
  ],
  'hash-forge-proj': [
    {
      id: 'hash-forge-readme',
      name: 'README.md',
      type: 'file',
      icon: '📄',
      size: '2.1 KB',
      dateModified: '2026-06-10',
      content: `# Hash-Forge - Password Generator & Cryptographic Inspector
Simple, secure, and stylish credential generator with real-time hash digests.

Highlights:
• High-entropy randomized string synthesizer with custom symbol/number toggles.
• Real-time cryptographic hashing (SHA-256, SHA-512, MD5).
• Instant one-click clipboard copy and entropy strength scoring.
• Tech Stack: JavaScript, Web Crypto API, React.`
    },
    {
      id: 'hash-forge-demo',
      name: 'Launch Hash-Forge Tool.exe',
      type: 'file',
      icon: '🔐',
      size: 'Executable',
      targetApp: 'ie'
    },
    {
      id: 'hash-forge-repo',
      name: 'GitHub_Repository.url',
      type: 'link',
      icon: '🌐',
      size: '1 KB',
      externalUrl: 'https://github.com/NallukumarRavichandran'
    }
  ],
  'skills-folder': [
    {
      id: 'skill-java',
      name: 'Java_Full_Stack.sys',
      type: 'file',
      icon: '☕',
      size: 'Expert (95%)',
      dateModified: 'Core, OOP, Collections, Multithreading, Streams, JVM'
    },
    {
      id: 'skill-spring',
      name: 'Spring_Boot_Microservices.dll',
      type: 'file',
      icon: '🍃',
      size: 'Advanced (93%)',
      dateModified: 'Spring MVC, REST APIs, Hibernate ORM, Spring Security'
    },
    {
      id: 'skill-sql',
      name: 'PostgreSQL_MySQL.db',
      type: 'file',
      icon: '🗄️',
      size: 'Advanced (90%)',
      dateModified: 'ACID transactions, complex joins, indexing, Workbench'
    },
    {
      id: 'skill-csharp',
      name: 'CSharp_ASP_NET.dll',
      type: 'file',
      icon: '🔷',
      size: 'Proficient (86%)',
      dateModified: 'C#, ASP .NET, Object Oriented Programming, Visual Studio'
    },
    {
      id: 'skill-react',
      name: 'React_NodeJS_Web.sys',
      type: 'file',
      icon: '⚛️',
      size: 'Advanced (89%)',
      dateModified: 'React, TypeScript, JavaScript, HTML, Bootstrap, Tailwind'
    },
    {
      id: 'skill-ai',
      name: 'AI_Tools_VectorRAG.lib',
      type: 'file',
      icon: '🧠',
      size: 'Advanced (88%)',
      dateModified: 'Hugging Face, Ollama, ChromaDB, Antigravity, Postman, JMeter'
    },
    {
      id: 'skill-cicd',
      name: 'CI_CD_Cloud_Triage.log',
      type: 'file',
      icon: '☁️',
      size: 'Advanced (91%)',
      dateModified: 'GIT, Docker, Jenkins, Security Vulnerability Triage, Release Audits'
    },
    {
      id: 'skill-dsa',
      name: 'LeetCode_Algorithmic.dat',
      type: 'file',
      icon: '🏆',
      size: 'Contest Master (92%)',
      dateModified: 'Arrays, Dynamic Programming, Graphs, Heaps, O(1)/O(N) algorithms'
    }
  ],
  'experience-folder': [
    {
      id: 'exp-giritronics',
      name: '1_Giritronics_SDE.txt',
      type: 'file',
      icon: '🏢',
      size: 'Current Role',
      dateModified: 'Sep 2026 - Present',
      content: `Software Developer Engineer
Giritronics, Chennai | September 2026 - Present
• Developed and maintained scalable backend services using Java Full Stack for web applications.
• Built and supported REST APIs and backend logic for internal and client-facing applications.
• Designed and developed full-stack websites using Java and integrated Windows/Android software solutions.
• Detected, triaged, and fixed security vulnerabilities in production codebases to ensure application integrity.
• Managed databases and handled complex data processing and integrity tasks.
• Collaborated with DevOps teams to streamline CI/CD pipelines and manage cloud release deployments.`
    },
    {
      id: 'exp-amex',
      name: '2_American_Express_Cloud_Infra.txt',
      type: 'file',
      icon: '💳',
      size: 'Completed',
      dateModified: 'Jan 2026 - Aug 2026',
      content: `Development Trainee - Cloud & Infrastructure
American Express | January 2026 - August 2026
• Developed and maintained scalable backend services using Java Full Stack.
• Built and supported REST APIs and backend logic for internal applications.
• Detected, triaged, and fixed security vulnerabilities in production codebases.
• Worked with databases and handled data processing and integrity tasks.
• Collaborated with DevOps teams for CI/CD pipelines and cloud release deployments.`
    },
    {
      id: 'exp-arsus',
      name: '3_ARSUS_Web_Development_Internship.txt',
      type: 'file',
      icon: '💻',
      size: 'Completed',
      dateModified: 'Apr 2023 - May 2023',
      content: `Web Development Internship
ARSUS Solutions & Services Pvt Ltd, Coimbatore | April 2023 - May 2023
• Completed web development internship gaining hands-on experience in building and maintaining web applications.
• Demonstrated strong learning ability and commitment to project tasks in collaborative agile sprints.`
    }
  ],
  'education-folder': [
    {
      id: 'edu-be',
      name: 'BE_Computer_Science_PSNA.doc',
      type: 'file',
      icon: '🎓',
      size: 'Graduated 2025',
      dateModified: '2022 - 2025',
      content: `Bachelor of Engineering (B.E.) in Computer Science & Engineering
PSNA College of Engineering and Technology, Dindigul, Tamil Nadu
Duration: 2022 - 2025
Key Coursework: Object Oriented Programming (OOPS), Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering.`
    },
    {
      id: 'edu-diploma',
      name: 'Diploma_TKSPC_Theni.doc',
      type: 'file',
      icon: '📜',
      size: 'Graduated 2021',
      dateModified: '2019 - 2021',
      content: `Diploma Graduation
TKSPC, Theni, Tamil Nadu
Duration: 2019 - 2021
Focus: Fundamentals of Computer Technology, Hardware & System Programming.`
    },
    {
      id: 'edu-sslc',
      name: 'SSLC_JC_Matric.doc',
      type: 'file',
      icon: '🏫',
      size: 'Graduated 2018',
      dateModified: '2017 - 2018',
      content: `Secondary School Leaving Certificate (SSLC)
JC Matric School, Periyakulam, Tamil Nadu
Duration: 2017 - 2018`
    }
  ],
  'documents-folder': [
    {
      id: 'doc-resume',
      name: 'Nallukumar_Ravichandran_Resume.txt',
      type: 'file',
      icon: '📝',
      size: '9.4 KB',
      targetApp: 'notepad',
      description: 'Official updated curriculum vitae'
    },
    {
      id: 'doc-cover',
      name: 'Professional_Statement_2026.txt',
      type: 'file',
      icon: '📄',
      size: '1.8 KB',
      content: `PROFESSIONAL STATEMENT:
Nallukumar Ravichandran
Passionate Java Full Stack Engineer with enterprise production experience at Giritronics and American Express (Cloud & Infrastructure).
Dedicated to writing clean, maintainable, high-performance software with zero critical vulnerabilities.
Active competitive coder on LeetCode solving complex problems in Dynamic Programming, Graphs, and Tree structures.`
    },
    {
      id: 'doc-contact',
      name: 'Contact_Card.vcf',
      type: 'file',
      icon: '📇',
      size: '0.8 KB',
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
  'd-drive': [
    { id: 'amex-cloud-env', name: 'Amex_Cloud_Infrastructure', type: 'folder', icon: '📁', size: '2 items', description: 'Enterprise staging & microservice topologies' },
    { id: 'giri-backend-env', name: 'Giritronics_Enterprise_APIs', type: 'folder', icon: '📁', size: '2 items', description: 'Production REST services and secure microservices' },
    {
      id: 'devops-triage-log',
      name: 'Release_Triage_Zero_Vulns.log',
      type: 'file',
      icon: '🛡️',
      size: '12 KB',
      content: `ENTERPRISE CI/CD PIPELINE AUDIT REPORT
Target: Production Cloud Cluster
Result: PASS (0 Critical Vulnerabilities)
Audited by: Nallukumar Ravichandran
Components: Spring Boot REST Endpoints, PostgreSQL Query Engine, Docker Container Registry.`
    }
  ],
  'e-drive': [
    {
      id: 'be-degree-cert',
      name: 'Degree_BE_Computer_Science_PSNA.cert',
      type: 'file',
      icon: '🎖️',
      size: 'Verified Credential',
      content: `ACADEMIC DEGREE VERIFICATION:
Degree: Bachelor of Engineering (Computer Science & Engineering)
Institution: PSNA College of Engineering and Technology, Dindigul
Years: 2022 - 2025
Status: Successfully Awarded`
    },
    {
      id: 'diploma-cert',
      name: 'Diploma_TKSPC.cert',
      type: 'file',
      icon: '🎖️',
      size: 'Verified Credential',
      content: `DIPLOMA VERIFICATION:
Institution: TKSPC Theni
Years: 2019 - 2021
Status: Successfully Graduated`
    }
  ]
};

export const FileExplorerApp: React.FC<FileExplorerAppProps> = ({ onOpenApp, onOpenNotepadWithText }) => {
  const [currentPath, setCurrentPath] = useState<string>('this-pc');
  const [history, setHistory] = useState<string[]>(['this-pc']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'details'>('grid');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<{ title: string; text: string } | null>(null);

  const navigateTo = (pathKey: string) => {
    sounds.playClick();
    if (FILE_SYSTEM[pathKey]) {
      const nextHistory = history.slice(0, historyIndex + 1);
      nextHistory.push(pathKey);
      setHistory(nextHistory);
      setHistoryIndex(nextHistory.length - 1);
      setCurrentPath(pathKey);
      setSelectedItemId(null);
      setSearchQuery('');
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
    if (currentPath === 'this-pc') return;
    if (['c-drive', 'd-drive', 'e-drive', 'floppy-a'].includes(currentPath)) {
      navigateTo('this-pc');
    } else if (['projects-folder', 'skills-folder', 'experience-folder', 'education-folder', 'documents-folder'].includes(currentPath)) {
      navigateTo('c-drive');
    } else if (['ai-tutor-proj', 'mind-buddy-proj', 'you-clone-proj', 'hash-forge-proj'].includes(currentPath)) {
      navigateTo('projects-folder');
    } else {
      navigateTo('c-drive');
    }
  };

  const handleItemClick = (item: ExplorerItem) => {
    setSelectedItemId(item.id);
  };

  const handleItemDoubleClick = (item: ExplorerItem) => {
    sounds.playClick();
    if (item.type === 'folder' || item.type === 'drive') {
      navigateTo(item.id);
    } else if (item.type === 'link' && item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
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

  const items = (FILE_SYSTEM[currentPath] || []).filter(item =>
    searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const formatPathDisplay = (key: string) => {
    switch (key) {
      case 'this-pc':
        return 'My Computer';
      case 'c-drive':
        return 'My Computer\\Local Disk (C:)';
      case 'd-drive':
        return 'My Computer\\Cloud & Work (D:)';
      case 'e-drive':
        return 'My Computer\\Academic (E:)';
      case 'projects-folder':
        return 'C:\\Projects';
      case 'skills-folder':
        return 'C:\\Skills & Tech Stack';
      case 'experience-folder':
        return 'C:\\Work Experience';
      case 'education-folder':
        return 'C:\\Education';
      case 'documents-folder':
        return 'C:\\Documents';
      case 'ai-tutor-proj':
        return 'C:\\Projects\\Generative AI Tutor';
      case 'mind-buddy-proj':
        return 'C:\\Projects\\Mind Buddy (CBT)';
      case 'you-clone-proj':
        return 'C:\\Projects\\You-Clone';
      case 'hash-forge-proj':
        return 'C:\\Projects\\Hash-Forge';
      default:
        return `C:\\${key}`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-zinc-900 font-sans text-xs select-none">
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] px-2 py-0.5 border-b border-zinc-300 flex items-center gap-4 text-[11px]">
        <span className="hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">File</span>
        <span className="hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Edit</span>
        <span className="hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">View</span>
        <span className="hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Favorites</span>
        <span className="hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Tools</span>
        <span className="hover:bg-[#2f71cd] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      <div className="bg-gradient-to-b from-[#fbfbfb] to-[#ece9d8] p-1 border-b border-zinc-300 flex items-center gap-1">
        <button
          onClick={handleBack}
          disabled={historyIndex <= 0}
          className="p-1 hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent rounded flex items-center gap-0.5 cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] font-semibold pr-1">Back</span>
        </button>
        <button
          onClick={handleForward}
          disabled={historyIndex >= history.length - 1}
          className="p-1 hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent rounded cursor-pointer"
          title="Forward"
        >
          <ArrowRight className="w-4 h-4 text-emerald-600" />
        </button>
        <button
          onClick={handleUp}
          disabled={currentPath === 'this-pc'}
          className="p-1 hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent rounded cursor-pointer"
          title="Up one folder level"
        >
          <ArrowUp className="w-4 h-4 text-amber-600" />
        </button>

        <div className="h-5 w-[1px] bg-zinc-300 mx-1" />

        <button
          onClick={() => navigateTo('this-pc')}
          className="px-2 py-1 hover:bg-white/60 rounded flex items-center gap-1 text-[11px] cursor-pointer"
        >
          <HardDrive className="w-3.5 h-3.5 text-blue-600" />
          <span>My Computer</span>
        </button>

        <button
          onClick={() => navigateTo('projects-folder')}
          className="px-2 py-1 hover:bg-white/60 rounded flex items-center gap-1 text-[11px] cursor-pointer"
        >
          <Folder className="w-3.5 h-3.5 text-yellow-600" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => navigateTo('skills-folder')}
          className="px-2 py-1 hover:bg-white/60 rounded flex items-center gap-1 text-[11px] cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Skills</span>
        </button>

        <div className="h-5 w-[1px] bg-zinc-300 mx-1" />

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-zinc-300 shadow-inner' : 'hover:bg-white/60'}`}
            title="Icons View"
          >
            <Grid className="w-3.5 h-3.5 text-zinc-700" />
          </button>
          <button
            onClick={() => setViewMode('details')}
            className={`p-1 rounded cursor-pointer ${viewMode === 'details' ? 'bg-zinc-300 shadow-inner' : 'hover:bg-white/60'}`}
            title="Details View"
          >
            <List className="w-3.5 h-3.5 text-zinc-700" />
          </button>
        </div>
      </div>

      {/* Address & Search Bar */}
      <div className="bg-[#ece9d8] px-2 py-1 border-b border-zinc-300 flex items-center gap-2">
        <span className="text-zinc-600 font-semibold text-[11px] shrink-0">Address</span>
        <div className="flex-1 bg-white border border-zinc-400 rounded-xs px-2 py-0.5 flex items-center gap-1 text-xs shadow-inner">
          <span className="text-yellow-600">📁</span>
          <span className="font-mono text-zinc-800 text-[11px] truncate">{formatPathDisplay(currentPath)}</span>
        </div>
        <div className="w-48 bg-white border border-zinc-400 rounded-xs px-2 py-0.5 flex items-center gap-1 text-xs">
          <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search folder..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-hidden text-[11px]"
          />
        </div>
      </div>

      {/* Main Workspace: Left Sidebar + File Grid */}
      <div className="flex-1 flex min-h-0 bg-white">
        {/* Left Side Tasks & Places Pane */}
        <div className="w-52 bg-gradient-to-b from-[#7ba2e7] to-[#6375d6] p-2 text-white flex flex-col gap-2 overflow-y-auto shrink-0 border-r border-blue-400 select-none">
          {/* System Tasks */}
          <div className="bg-white/95 text-zinc-900 rounded-t-md overflow-hidden shadow-xs">
            <div className="bg-gradient-to-r from-[#215dc6] to-[#3a7bf0] text-white font-bold p-1.5 text-[11px] flex items-center justify-between">
              <span>System Tasks</span>
              <span>▾</span>
            </div>
            <div className="p-2 space-y-1.5 text-[11px]">
              <button
                onClick={() => onOpenApp('notepad')}
                className="w-full text-left text-blue-700 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Open Resume in Notepad</span>
              </button>
              <button
                onClick={() => onOpenApp('ie')}
                className="w-full text-left text-blue-700 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Launch Web Portfolio</span>
              </button>
              <button
                onClick={() => onOpenApp('cmd')}
                className="w-full text-left text-blue-700 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Monitor className="w-3.5 h-3.5 text-zinc-700" />
                <span>Command Prompt</span>
              </button>
            </div>
          </div>

          {/* Other Places Tree */}
          <div className="bg-white/95 text-zinc-900 rounded-t-md overflow-hidden shadow-xs">
            <div className="bg-gradient-to-r from-[#215dc6] to-[#3a7bf0] text-white font-bold p-1.5 text-[11px] flex items-center justify-between">
              <span>Quick Places</span>
              <span>▾</span>
            </div>
            <div className="p-2 space-y-1 text-[11px]">
              <button
                onClick={() => navigateTo('this-pc')}
                className={`w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${
                  currentPath === 'this-pc' ? 'bg-[#2f71cd] text-white' : 'hover:bg-blue-50 text-zinc-800'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>My Computer</span>
              </button>
              <button
                onClick={() => navigateTo('projects-folder')}
                className={`w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${
                  currentPath === 'projects-folder' ? 'bg-[#2f71cd] text-white' : 'hover:bg-blue-50 text-zinc-800'
                }`}
              >
                <Folder className="w-3.5 h-3.5 text-amber-500" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => navigateTo('skills-folder')}
                className={`w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${
                  currentPath === 'skills-folder' ? 'bg-[#2f71cd] text-white' : 'hover:bg-blue-50 text-zinc-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Skills & Stack</span>
              </button>
              <button
                onClick={() => navigateTo('experience-folder')}
                className={`w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${
                  currentPath === 'experience-folder' ? 'bg-[#2f71cd] text-white' : 'hover:bg-blue-50 text-zinc-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-teal-500" />
                <span>Work Experience</span>
              </button>
              <button
                onClick={() => navigateTo('education-folder')}
                className={`w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${
                  currentPath === 'education-folder' ? 'bg-[#2f71cd] text-white' : 'hover:bg-blue-50 text-zinc-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
                <span>Education</span>
              </button>
              <button
                onClick={() => navigateTo('documents-folder')}
                className={`w-full text-left p-1 rounded flex items-center gap-1.5 cursor-pointer ${
                  currentPath === 'documents-folder' ? 'bg-[#2f71cd] text-white' : 'hover:bg-blue-50 text-zinc-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Documents</span>
              </button>
            </div>
          </div>

          {/* Details Box */}
          <div className="bg-white/95 text-zinc-900 rounded-t-md p-2 shadow-xs text-[10px] space-y-1 mt-auto">
            <div className="font-bold text-zinc-800 uppercase tracking-wider text-[9px]">Computer Details</div>
            <div>Owner: Nallukumar Ravichandran</div>
            <div>OS: Windows XP Pro SP3</div>
            <div>RAM: 16 GB DDR4</div>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 p-3 overflow-y-auto bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 p-8">
              <span className="text-3xl mb-2">📁</span>
              <p className="font-semibold text-sm">This folder is empty</p>
              <p className="text-xs text-zinc-500 mt-1">Try searching for other terms or navigating up.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map(item => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    className={`p-2 rounded-sm border flex flex-col items-center text-center cursor-pointer transition select-none ${
                      isSelected
                        ? 'bg-[#0a246a]/15 border-[#0a246a] ring-1 ring-[#0a246a]'
                        : 'border-transparent hover:bg-zinc-100'
                    }`}
                  >
                    <div className="text-4xl mb-1.5 filter drop-shadow-xs">{item.icon}</div>
                    <span className="font-medium text-xs text-zinc-900 break-all line-clamp-2 px-1">
                      {item.name}
                    </span>
                    {item.size && (
                      <span className="text-[10px] text-zinc-500 mt-0.5">{item.size}</span>
                    )}
                    {item.description && (
                      <span className="text-[9px] text-zinc-400 line-clamp-1 mt-0.5">{item.description}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500 font-bold bg-zinc-50">
                    <th className="p-1.5">Name</th>
                    <th className="p-1.5">Type</th>
                    <th className="p-1.5">Size / Details</th>
                    <th className="p-1.5">Date Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const isSelected = selectedItemId === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        onDoubleClick={() => handleItemDoubleClick(item)}
                        className={`border-b border-zinc-100 cursor-pointer ${
                          isSelected ? 'bg-[#0a246a] text-white' : 'hover:bg-blue-50 text-zinc-800'
                        }`}
                      >
                        <td className="p-1.5 flex items-center gap-2 font-medium">
                          <span className="text-base">{item.icon}</span>
                          <span>{item.name}</span>
                        </td>
                        <td className="p-1.5 capitalize">{item.type}</td>
                        <td className="p-1.5">{item.size || '-'}</td>
                        <td className="p-1.5">{item.dateModified || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* File Preview Modal (for quick text inspection) */}
      {previewContent && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-[#ece9d8] border-2 border-[#0058e6] rounded shadow-2xl w-full max-w-lg flex flex-col max-h-[80vh]">
            <div className="bg-gradient-to-r from-[#0058e6] to-[#3a7bf0] text-white p-2 font-bold text-xs flex justify-between items-center">
              <span>{previewContent.title} - Document Viewer</span>
              <button
                onClick={() => setPreviewContent(null)}
                className="w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-3 overflow-y-auto flex-1 bg-white font-mono text-xs whitespace-pre-wrap text-zinc-800">
              {previewContent.text}
            </div>
            <div className="p-2 border-t border-zinc-300 flex justify-end gap-2 bg-[#ece9d8]">
              <button
                onClick={() => {
                  if (onOpenNotepadWithText) {
                    onOpenNotepadWithText(previewContent.title, previewContent.text);
                  }
                  setPreviewContent(null);
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-xs"
              >
                Edit in Notepad
              </button>
              <button
                onClick={() => setPreviewContent(null)}
                className="px-3 py-1 bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-semibold rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="bg-[#ece9d8] px-3 py-1 border-t border-zinc-300 flex justify-between items-center text-[11px] text-zinc-600">
        <div>{items.length} objects</div>
        <div className="flex items-center gap-2">
          <span>Local Intranet / My Computer</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        </div>
      </div>
    </div>
  );
};
