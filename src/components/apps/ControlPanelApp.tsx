import React, { useState } from 'react';
import { ShieldCheck, Cpu, Volume2, Award, Sliders } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const ControlPanelApp: React.FC = () => {
  const [activeView, setActiveView] = useState<'category' | 'specs'>('category');
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);

  const skills = [
    { name: 'Java (OOP, Multithreading, Streams, JVM)', level: 95, color: 'bg-red-500' },
    { name: 'Spring Boot, Microservices & Hibernate ORM', level: 93, color: 'bg-emerald-500' },
    { name: 'SQL, PostgreSQL & MySQL Workbench', level: 90, color: 'bg-blue-500' },
    { name: 'LeetCode & Algorithmic Problem Solving', level: 92, color: 'bg-amber-500' },
    { name: 'C# & ASP .NET / Windows Systems', level: 86, color: 'bg-purple-500' },
    { name: 'React, Node.js, HTML & Bootstrap', level: 89, color: 'bg-cyan-500' },
    { name: 'AI & Tools: Hugging Face, Ollama, Antigravity, Postman, JMeter', level: 88, color: 'bg-indigo-500' },
    { name: 'CI/CD Pipelines, Git, Docker & Release Triage', level: 91, color: 'bg-teal-500' }
  ];

  const toggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sounds.playStartup();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f0f0e8] text-xs font-sans select-none">
      {/* View Switcher Bar */}
      <div className="bg-[#eaeae2] border-b border-zinc-300 px-3 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-zinc-800">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span>Control Panel</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => { sounds.playClick(); setActiveView('category'); }}
            className={`px-2.5 py-0.5 rounded border ${
              activeView === 'category' ? 'bg-white border-zinc-400 font-bold text-blue-900' : 'hover:bg-zinc-200'
            }`}
          >
            Skills & Security
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveView('specs'); }}
            className={`px-2.5 py-0.5 rounded border ${
              activeView === 'specs' ? 'bg-white border-zinc-400 font-bold text-blue-900' : 'hover:bg-zinc-200'
            }`}
          >
            System Specifications
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeView === 'category' ? (
          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Security Status Banner */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 flex items-start gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-950 text-sm">Enterprise Security Status: OPTIMAL</h4>
                <p className="text-zinc-600 text-xs mt-0.5">
                  American Express Cloud & Infrastructure release compliance verified. Zero critical vulnerabilities detected.
                </p>
                <div className="mt-2 flex gap-4 text-[11px] text-emerald-800 font-semibold">
                  <span>✓ SonarQube Code Gate Passed</span>
                  <span>✓ OWASP Top 10 Sanitized</span>
                  <span>✓ ACID Transaction Integrity</span>
                </div>
              </div>
            </div>

            {/* Technical Skills Meter */}
            <div className="bg-white border border-zinc-300 rounded-lg p-4 shadow-xs">
              <h3 className="font-bold text-zinc-900 text-sm mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Technical Competencies & Mastery Index
              </h3>

              <div className="space-y-3">
                {skills.map(s => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1">
                      <span>{s.name}</span>
                      <span className="font-mono text-zinc-500">{s.level}%</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden border border-zinc-300">
                      <div
                        className={`h-full ${s.color} transition-all duration-500 rounded-full`}
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sound & Audio Config */}
            <div className="bg-white border border-zinc-300 rounded-lg p-4 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-sky-600" />
                <div>
                  <div className="font-bold text-zinc-800">Windows XP Procedural Audio Engine</div>
                  <div className="text-zinc-500 text-[11px]">
                    Web Audio API real-time synthesis of startup chimes, clicks, chords, and media
                  </div>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`px-3 py-1.5 rounded font-bold text-xs border shadow-xs cursor-pointer ${
                  soundEnabled
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-zinc-200 text-zinc-600 border-zinc-400'
                }`}
              >
                {soundEnabled ? 'Sound Enabled ✓' : 'Sound Muted'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-zinc-300 rounded-lg p-5 max-w-xl mx-auto space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
              <Cpu className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900">NalluOS Professional (SP3)</h3>
                <p className="text-zinc-500 text-xs">Based on Windows XP Home & Professional Architecture</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-zinc-500 block text-[10px] uppercase">Registered To:</span>
                <span className="text-zinc-900 font-bold">Nallukumar Ravichandran</span>
                <span className="text-zinc-600 block text-[11px]">Software Developer Engineer @ Giritronics</span>
                <span className="text-zinc-500 block text-[10px]">Ex-American Express (Cloud & Infrastructure)</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-zinc-500 block text-[10px] uppercase">Computer Name:</span>
                <span className="font-mono text-zinc-900 font-bold">NALLU-DEV-STATION</span>
                <span className="text-zinc-600 block text-[11px]">Workgroup: ENTERPRISE_JAVA</span>
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
              <h4 className="font-bold text-zinc-800">System Hardware Specifications:</h4>
              <ul className="space-y-1 text-zinc-600">
                <li>• Processor: High-Throughput Java 21 LTS JVM Core Engine</li>
                <li>• Memory: 64-bit Non-Blocking Heap with G1 Garbage Collector</li>
                <li>• Storage: Enterprise PostgreSQL Cluster with ACID Replication</li>
                <li>• Audio: Web Audio API Procedural Synthesizer (0 External Dependencies)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
