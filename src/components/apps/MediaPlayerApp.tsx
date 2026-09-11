import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { AudioTrack } from '../../types';
import { sounds } from '../../utils/audio';

const TRACKS: AudioTrack[] = [
  {
    id: 't1',
    title: 'Amex Cloud Infrastructure Beats',
    artist: 'Nallukumar R',
    album: 'Enterprise Code Vol. 1',
    duration: 135,
    bpm: 90,
    chords: [261.63, 329.63, 392.00, 523.25, 440.0, 349.23]
  },
  {
    id: 't2',
    title: 'LeetCode Weekly Contest Rush',
    artist: 'Java Algo Engine',
    album: 'O(1) Memory Tunes',
    duration: 160,
    bpm: 120,
    chords: [330.0, 392.0, 493.88, 587.33, 659.25]
  },
  {
    id: 't3',
    title: 'Spring Boot & PostgreSQL Ambient',
    artist: 'DevOps Trainee',
    album: 'Late Night Production Releases',
    duration: 180,
    bpm: 80,
    chords: [220.0, 277.18, 329.63, 440.0]
  },
  {
    id: 't4',
    title: 'Windows XP Bliss Nostalgia',
    artist: 'Luna Sound System',
    album: 'Redmond Memories 2001',
    duration: 145,
    bpm: 75,
    chords: [311.13, 392.0, 466.16, 622.25]
  }
];

export const MediaPlayerApp: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(12);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [visMode, setVisMode] = useState<'bars' | 'wave'>('bars');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const track = TRACKS[currentTrackIndex];

  // Synthesize musical tones periodically while playing
  useEffect(() => {
    let noteTimer: NodeJS.Timeout;
    if (isPlaying && !isMuted) {
      noteTimer = setInterval(() => {
        const chord = track.chords[Math.floor(Math.random() * track.chords.length)];
        const effectiveVol = (volume / 100) * 0.08;
        sounds.playNote(chord, 0.45, 'sine', effectiveVol);
      }, (60 / track.bpm) * 1000);
    }
    return () => clearInterval(noteTimer);
  }, [isPlaying, isMuted, track, volume]);

  // Track playback time counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(t => {
          if (t >= track.duration) {
            // Next track
            setCurrentTrackIndex(i => (i + 1) % TRACKS.length);
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, track.duration]);

  // Canvas Audio Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.fillStyle = '#060d1b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        phase += 0.08;

        if (visMode === 'bars') {
          const numBars = 24;
          const barWidth = canvas.width / numBars - 2;
          for (let i = 0; i < numBars; i++) {
            // Simulated frequency height
            const h1 = Math.sin(phase + i * 0.4) * 0.5 + 0.5;
            const h2 = Math.cos(phase * 1.5 + i * 0.3) * 0.5 + 0.5;
            const barHeight = Math.max(8, (h1 * 0.6 + h2 * 0.4) * (canvas.height - 20));

            // Retro green-yellow-red equalizer gradient
            const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
            grad.addColorStop(0, '#00d04b');
            grad.addColorStop(0.65, '#d4c700');
            grad.addColorStop(1, '#ff3b30');

            ctx.fillStyle = grad;
            ctx.fillRect(i * (barWidth + 2) + 2, canvas.height - barHeight - 6, barWidth, barHeight);

            // Peak cap
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(i * (barWidth + 2) + 2, canvas.height - barHeight - 9, barWidth, 2);
          }
        } else {
          // Oscilloscope wave
          ctx.beginPath();
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2.5;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f0ff';

          for (let x = 0; x < canvas.width; x++) {
            const y =
              canvas.height / 2 +
              Math.sin(x * 0.05 + phase * 2) * 22 * Math.sin(phase) +
              Math.cos(x * 0.02 - phase) * 12;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      } else {
        // Idle line
        ctx.strokeStyle = '#1a365d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        ctx.fillStyle = '#718096';
        ctx.font = '11px Tahoma, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Windows Media Player - Ready', canvas.width / 2, canvas.height / 2 - 10);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, visMode]);

  const togglePlay = () => {
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    sounds.playClick();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const nextTrack = () => {
    sounds.playClick();
    setCurrentTrackIndex(i => (i + 1) % TRACKS.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    sounds.playClick();
    setCurrentTrackIndex(i => (i - 1 + TRACKS.length) % TRACKS.length);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0c1626] text-white font-sans select-none">
      {/* Top Menu Bar */}
      <div className="bg-[#12223b] border-b border-[#213a60] px-3 py-1 text-xs text-blue-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Disc className={`w-4 h-4 text-cyan-400 ${isPlaying ? 'animate-spin' : ''}`} />
          <span className="font-bold text-white">Windows Media Player</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setVisMode(visMode === 'bars' ? 'wave' : 'bars')}
            className="text-[10px] bg-[#1a3356] hover:bg-[#254674] px-2 py-0.5 rounded border border-[#31588c] text-cyan-200"
          >
            Visualizer: {visMode === 'bars' ? 'Equalizer Bars' : 'Oscilloscope'}
          </button>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="p-3 flex flex-col items-center justify-center relative">
        <canvas
          ref={canvasRef}
          width={480}
          height={170}
          className="rounded-md border-2 border-[#1e3b68] shadow-2xl max-w-full bg-[#060d1b]"
        />

        {/* Floating track tag overlay */}
        <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded border border-blue-500/30 text-xs">
          <div className="font-bold text-cyan-300 truncate max-w-[280px]">{track.title}</div>
          <div className="text-[10px] text-zinc-400">{track.artist} • {track.album}</div>
        </div>
      </div>

      {/* Track progress slider */}
      <div className="px-4 py-1 flex items-center gap-2 text-xs text-blue-200">
        <span className="font-mono text-[10px] w-8 text-right">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={track.duration}
          value={currentTime}
          onChange={e => setCurrentTime(parseInt(e.target.value))}
          className="flex-1 accent-cyan-400 cursor-pointer h-1.5"
        />
        <span className="font-mono text-[10px] w-8">{formatTime(track.duration)}</span>
      </div>

      {/* Media Player Controls (Sleek XP styling) */}
      <div className="bg-gradient-to-b from-[#182e4e] to-[#0c1626] border-t border-[#2a4d7d] p-3 flex items-center justify-between gap-4">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevTrack}
            className="w-8 h-8 rounded-full bg-gradient-to-b from-[#2a4d7d] to-[#12223b] border border-[#4271b0] flex items-center justify-center hover:brightness-110 active:scale-95 shadow"
            title="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5 text-cyan-200" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#0088ff] to-[#004bb3] border-2 border-cyan-300 flex items-center justify-center hover:brightness-110 active:scale-95 shadow-lg"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white fill-white" />
            ) : (
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            )}
          </button>

          <button
            onClick={handleStop}
            className="w-8 h-8 rounded-full bg-gradient-to-b from-[#2a4d7d] to-[#12223b] border border-[#4271b0] flex items-center justify-center hover:brightness-110 active:scale-95 shadow"
            title="Stop"
          >
            <Square className="w-3.5 h-3.5 text-cyan-200 fill-cyan-200" />
          </button>

          <button
            onClick={nextTrack}
            className="w-8 h-8 rounded-full bg-gradient-to-b from-[#2a4d7d] to-[#12223b] border border-[#4271b0] flex items-center justify-center hover:brightness-110 active:scale-95 shadow"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5 text-cyan-200" />
          </button>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-cyan-300 hover:text-white"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={e => {
              setVolume(parseInt(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 accent-cyan-400 cursor-pointer h-1.5"
          />
        </div>
      </div>

      {/* Playlist Tray */}
      <div className="flex-1 overflow-y-auto bg-[#08101d] border-t border-[#1a3152] p-2 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-2 py-1 flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5" />
          Now Playing Playlist
        </div>
        {TRACKS.map((t, idx) => {
          const isSelected = idx === currentTrackIndex;
          return (
            <button
              key={t.id}
              onClick={() => {
                sounds.playClick();
                setCurrentTrackIndex(idx);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between text-xs cursor-pointer ${
                isSelected
                  ? 'bg-blue-900/60 border border-cyan-500/50 text-cyan-200 font-bold'
                  : 'hover:bg-[#12223b] text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[10px] opacity-70">{idx + 1}.</span>
                <span className="truncate">{t.title}</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 shrink-0">
                {formatTime(t.duration)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
