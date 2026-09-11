import React, { useState } from 'react';
import {
  ExternalLink,
  Code2,
  CheckCircle,
  Play,
  Search
} from 'lucide-react';
import { sounds } from '../../utils/audio';

interface ProjectsAppProps {
  onOpenApp: (appId: string) => void;
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'fullstack' | 'security' | 'frontend';
  categoryLabel: string;
  icon: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  demoAppId: string;
  status: 'Production Ready' | 'Active Development' | 'Open Source';
  metrics?: { label: string; value: string }[];
}

const PROJECTS: ProjectData[] = [
  {
    id: 'ai-tutor',
    title: 'Generative AI Tutor & Adaptive Learning Platform',
    subtitle: 'Intelligent 1-on-1 AI Tutoring System with RAG Pipeline & ChromaDB',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    icon: '🤖',
    status: 'Production Ready',
    description:
      'An intelligent 1-on-1 AI tutoring system engineered to make quality education personalized and accessible through Retrieval-Augmented Generation (RAG) and zero-hallucination guardrails.',
    highlights: [
      'Built a Retrieval-Augmented Generation (RAG) pipeline with ChromaDB vector storage and semantic chunking.',
      'Enforced strict zero-hallucination guardrails and source attribution to guarantee factual responses.',
      'Developed adaptive learning paths that adjust question difficulty in real time based on learner mastery.',
      'Configured local LLM execution via Ollama and Hugging Face embeddings for high-throughput privacy-first inference.'
    ],
    techStack: ['Python', 'FastAPI', 'ChromaDB', 'Hugging Face', 'Ollama', 'React', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/NallukumarRavichandran',
    demoAppId: 'ie',
    metrics: [
      { label: 'Retrieval Latency', value: '< 240ms' },
      { label: 'Factual Accuracy', value: '99.4%' },
      { label: 'Chunk Overlap', value: '15% Cosine' }
    ]
  },
  {
    id: 'mind-buddy',
    title: 'Mind Buddy - CBT Mental Health & Thought Reframer',
    subtitle: 'Cognitive Behavioral Therapy Mood Logging & Distortion Reframing Web App',
    category: 'fullstack',
    categoryLabel: 'Healthcare & Full Stack',
    icon: '🧠',
    status: 'Production Ready',
    description:
      'A single-page React web application designed to help users identify and reframe cognitive distortions through clinically grounded Cognitive Behavioral Therapy techniques.',
    highlights: [
      'Guided Cognitive Behavioral Therapy (CBT) logging interface with intuitive step-by-step prompts.',
      'Interactive mood tracking with localized data persistence across user sessions.',
      'Clean, accessible, responsive design with soothing color palettes and WCAG AA contrast compliance.',
      'Integrated real-time distortion categorizer (All-or-Nothing, Catastrophizing, Overgeneralization).'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Storage API', 'Heroicons', 'Vite'],
    githubUrl: 'https://github.com/NallukumarRavichandran',
    demoAppId: 'ie',
    metrics: [
      { label: 'Persistence', value: 'Local State' },
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Distortion Models', value: '8 Types' }
    ]
  },
  {
    id: 'you-clone',
    title: 'You-Clone - Interactive Video Streaming Platform',
    subtitle: 'High-Fidelity Frontend YouTube UI Clone with Real-Time Interactivity',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    icon: '📺',
    status: 'Open Source',
    description:
      'A responsive video streaming interface mimicking the YouTube viewing experience with interactive comments, real-time like counters, and seamless drawer navigation.',
    highlights: [
      'Dynamic video recommendation feed with responsive thumbnail grid and playback previews.',
      'Interactive commenting system allowing users to post comments, upvote, and delete in real time.',
      'Accessible navigation bar, collapsible sidebar drawer, and dynamic category chip filtering.',
      'Mobile-first layout adapting smoothly from handheld devices to ultra-wide displays.'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'Vite'],
    githubUrl: 'https://github.com/NallukumarRavichandran',
    demoAppId: 'ie',
    metrics: [
      { label: 'Responsiveness', value: '100% Fluid' },
      { label: 'Interactions', value: 'Comments & Likes' },
      { label: 'Architecture', value: 'Component-Based' }
    ]
  },
  {
    id: 'hash-forge',
    title: 'Hash-Forge - Enterprise Cryptographic Key & Password Generator',
    subtitle: 'High-Entropy Randomized String Synthesizer & Cryptographic Digest Inspector',
    category: 'security',
    categoryLabel: 'Security & Cryptography',
    icon: '🔐',
    status: 'Production Ready',
    description:
      'A simple, secure, and stylish credential generator with real-time cryptographic hash digests (SHA-256, SHA-512, MD5) and password strength scoring.',
    highlights: [
      'High-entropy randomized string synthesizer with custom symbol, digit, uppercase, and lowercase toggles.',
      'Real-time cryptographic hashing using the browser-native Web Crypto API (SHA-256 & SHA-512).',
      'Instant one-click clipboard copy, entropy bit calculation, and crack-time estimations.',
      'Strict zero-network exfiltration guarantee: all secrets are generated entirely in-memory.'
    ],
    techStack: ['JavaScript', 'Web Crypto API', 'React', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/NallukumarRavichandran',
    demoAppId: 'ie',
    metrics: [
      { label: 'Max Entropy', value: '128 bits' },
      { label: 'Hash Algorithms', value: 'SHA-256 / 512' },
      { label: 'Zero Leak', value: '100% In-Memory' }
    ]
  }
];

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ onOpenApp }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectId, setActiveProjectId] = useState<string>('ai-tutor');

  const filteredProjects = PROJECTS.filter(proj => {
    const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];

  const handleLaunchDemo = (appId: string) => {
    sounds.playClick();
    onOpenApp(appId);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] text-zinc-900 font-sans select-none overflow-hidden">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#0058e6] via-[#1b6eed] to-[#0058e6] text-white p-3 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center text-xl shadow-inner">
            🚀
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              Featured Software Engineering Projects
            </h1>
            <p className="text-[11px] text-blue-100">
              Developed by Nallukumar Ravichandran | Java Full Stack • Cloud & AI Systems
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-2 py-1 bg-white/10 hover:bg-white/20 focus:bg-white focus:text-zinc-900 text-white placeholder-blue-200 focus:placeholder-zinc-400 rounded text-xs outline-hidden transition border border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="bg-white border-b border-zinc-200 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-xs">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'ai', label: 'AI & Machine Learning' },
          { id: 'fullstack', label: 'Full Stack & Health' },
          { id: 'frontend', label: 'Frontend UI' },
          { id: 'security', label: 'Security & Crypto' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition cursor-pointer text-[11px] whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-[#0058e6] text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Two-Column View: Left List + Right Detail */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#f4f5f7]">
        {/* Project Selector Sidebar */}
        <div className="w-full md:w-80 border-r border-zinc-200 bg-white overflow-y-auto p-2 space-y-2 shrink-0">
          {filteredProjects.map(proj => {
            const isSelected = proj.id === activeProjectId;
            return (
              <div
                key={proj.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveProjectId(proj.id);
                }}
                className={`p-3 rounded-lg border text-left cursor-pointer transition select-none ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-500 shadow-xs'
                    : 'bg-white hover:bg-zinc-50 border-zinc-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl">{proj.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs text-zinc-900 truncate">{proj.title}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider block mt-0.5">
                      {proj.categoryLabel}
                    </span>
                    <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1 leading-snug">
                      {proj.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Full Details Pane */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50/40 to-white p-4 rounded-xl border border-blue-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl filter drop-shadow-xs">{activeProject.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-base text-zinc-900">{activeProject.title}</h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {activeProject.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5">{activeProject.subtitle}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleLaunchDemo(activeProject.demoAppId)}
                  className="px-3.5 py-1.5 bg-[#0058e6] hover:bg-[#0047b8] text-white rounded-md font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-transform"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Test in Browser ↗</span>
                </button>
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Metrics Strip */}
          {activeProject.metrics && (
            <div className="grid grid-cols-3 gap-3">
              {activeProject.metrics.map((m, idx) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-center">
                  <div className="text-xs font-bold text-blue-700">{m.value}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Deep Overview */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-xs text-zinc-800 uppercase tracking-wider">Project Architecture Overview</h3>
            <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-200">
              {activeProject.description}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs text-zinc-800 uppercase tracking-wider">Key Technical Highlights</h3>
            <div className="grid gap-2">
              {activeProject.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-800 bg-white p-2.5 rounded-md border border-zinc-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs text-zinc-800 uppercase tracking-wider">Technologies & Frameworks</h3>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.techStack.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-md text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="bg-[#ece9d8] px-3 py-1 border-t border-zinc-300 text-[11px] text-zinc-600 flex justify-between items-center">
        <span>Showing {filteredProjects.length} featured engineering projects</span>
        <button
          onClick={() => window.open('https://github.com/NallukumarRavichandran', '_blank', 'noopener,noreferrer')}
          className="text-blue-700 hover:underline flex items-center gap-1 font-semibold"
        >
          <span>Explore all repos on github.com/NallukumarRavichandran</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
