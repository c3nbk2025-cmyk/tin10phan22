// A simple synthesizer to avoid external asset dependencies
export const playSound = (type: 'correct' | 'wrong' | 'click' | 'win' | 'spin') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'correct') {
      // High pitched pleasant ding
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'wrong') {
      // Low pitched buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'click') {
      // Short blip
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'win') {
      // Major arpeggio
      playNote(ctx, 440, now, 0.2); // A4
      playNote(ctx, 554, now + 0.2, 0.2); // C#5
      playNote(ctx, 659, now + 0.4, 0.4); // E5
    } else if (type === 'spin') {
      // Rapid clicking for wheel
       osc.type = 'square';
       osc.frequency.setValueAtTime(200, now);
       gain.gain.setValueAtTime(0.1, now);
       gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
       osc.start(now);
       osc.stop(now + 0.05);
    }

  } catch (e) {
    console.error("Audio play failed", e);
  }
};

const playNote = (ctx: AudioContext, freq: number, startTime: number, duration: number) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.2, startTime);
  gain.gain.linearRampToValueAtTime(0.01, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}
