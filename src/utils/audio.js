class SoundSystem {
  ctx = null;
  enabled = true;
  getContext() {
    if (!this.enabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }
  // Windows XP iconic startup chime simulation
  // Chords: Eb3 -> Bb3 -> Eb4 -> G4 -> Ab4 -> Eb5 shimmer
  playStartup() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [
      { freq: 155.56, time: 0, duration: 2.2, gain: 0.25 },
      // Eb3
      { freq: 233.08, time: 0.15, duration: 2, gain: 0.2 },
      // Bb3
      { freq: 311.13, time: 0.35, duration: 2.2, gain: 0.22 },
      // Eb4
      { freq: 392, time: 0.55, duration: 2, gain: 0.18 },
      // G4
      { freq: 415.3, time: 0.75, duration: 2.5, gain: 0.2 },
      // Ab4
      { freq: 622.25, time: 0.95, duration: 3, gain: 0.15 },
      // Eb5
      { freq: 932.33, time: 1.15, duration: 2.8, gain: 0.08 }
      // Bb5 shimmer
    ];
    notes.forEach(({ freq, time, duration, gain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + time);
      gainNode.gain.setValueAtTime(1e-3, now + time);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + time + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(1e-4, now + time + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now + time);
      osc.stop(now + time + duration);
    });
  }
  // Windows XP Shutdown sound: descending peaceful bells
  playShutdown() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [
      { freq: 622.25, time: 0, duration: 0.8 },
      // Eb5
      { freq: 466.16, time: 0.2, duration: 0.8 },
      // Bb4
      { freq: 415.3, time: 0.45, duration: 0.9 },
      // Ab4
      { freq: 311.13, time: 0.7, duration: 1.4 }
      // Eb4
    ];
    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + time);
      gainNode.gain.setValueAtTime(1e-3, now + time);
      gainNode.gain.exponentialRampToValueAtTime(0.2, now + time + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(1e-4, now + time + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now + time);
      osc.stop(now + time + duration);
    });
  }
  // Click / Button navigation sound
  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(1e-4, now + 0.04);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }
  // Windows Error Chord / Ding
  playError() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [180, 220, 270];
    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(1e-3, now + 0.35);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    });
  }
  // Notification Ding (Windows XP Exclamation)
  playExclamation() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(1e-4, now + 0.4);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }
  // Recycle Bin Crumple / Empty sound
  playRecycle() {
    const ctx = this.getContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 3;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  }
  // Play a simple musical tone (used by Media Player synth)
  playNote(frequency, duration = 0.4, type = "sine", volume = 0.1) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    gainNode.gain.setValueAtTime(1e-3, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(1e-4, now + duration);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }
}
const sounds = new SoundSystem();
export {
  sounds
};
