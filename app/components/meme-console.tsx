'use client';

import { useEffect, useMemo, useState } from 'react';

type Feedback = {
  label: string;
  value: string;
};

const promptVariants = [
  'Baue eine Chaos-Landingpage, die bewusst wie ein KI-Fail aussieht, aber elegant bleibt. mach keine fehler',
  'Erzeuge maximalen Vibe, harte Kontraste und eine leichte Krise in der Typografie. mach keine fehler',
  'Schreibe so, als ob der Prompt mit 12 Tabs, drei Emotionen und null Geduld geliefert wurde. mach keine fehler'
];

const feedbackRows: Feedback[] = [
  { label: 'Halluzination', value: '92%' },
  { label: 'Selbstvertrauen', value: '137%' },
  { label: 'Semantik', value: 'fragil' },
  { label: 'Vibe', value: 'kontrolliert eskaliert' }
];

function beep(frequency: number, duration = 0.08) {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sawtooth';
  oscillator.frequency.value = frequency;
  gain.gain.value = 0.03;

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);

  oscillator.onended = () => {
    context.close().catch(() => undefined);
  };
}

export function MemeConsole() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [glitch, setGlitch] = useState(0);
  const [copied, setCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [status, setStatus] = useState('bereit zum Übertreiben 😈');

  const prompt = promptVariants[promptIndex];

  const dialStyle = useMemo(
    () => ({
      transform: `rotate(${glitch * 1.9}deg) translateY(${Math.min(glitch, 4)}px)`,
      filter: `hue-rotate(${glitch * 18}deg) saturate(${1 + glitch * 0.08})`
    }),
    [glitch]
  );

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function triggerSound(frequency: number) {
    if (!soundOn) return;
    beep(frequency);
  }

  function randomizePrompt() {
    const nextIndex = (promptIndex + 1) % promptVariants.length;
    setPromptIndex(nextIndex);
    setGlitch((value) => (value + 1) % 6);
    setStatus('Prompt rotiert, Chaos steigt 🤯');
    triggerSound(240 + nextIndex * 80);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setStatus('Prompt kopiert, direkt einsetzbar 📋✨');
      triggerSound(520);
    } catch {
      setStatus('Clipboard hat sich geweigert, weiterleben zu dürfen 💀📎');
      triggerSound(150);
    }
  }

  function unleashChaos() {
    setGlitch((value) => (value + 2) % 8);
    setStatus('Chaos-Level angehoben 🔥🌀');
    triggerSound(180);
  }

  return (
    <section className="console panel panel--console" aria-label="Interaktive Konsole">
      <div className="console__top">
        <div>
          <p className="section-kicker">Live-Prompt-Console 💬</p>
          <h2>Fehler? Wir nennen das jetzt Creative Overflow 😵‍💫.</h2>
        </div>
        <button type="button" className="toggle" onClick={() => setSoundOn((value) => !value)}>
          Sound {soundOn ? 'an' : 'aus'}
        </button>
      </div>

      <div className="console__body" style={dialStyle}>
        <div className="console__screen">
          <span className="console__badge">prompt://mach-keine-fehler ✨</span>
          <p>{prompt}</p>
          <div className="console__state">{status}</div>
        </div>

        <div className="console__actions">
          <button type="button" className="button button--primary" onClick={randomizePrompt}>
            Prompt rotieren 🌀
          </button>
          <button type="button" className="button button--secondary" onClick={copyPrompt}>
            {copied ? 'Kopiert ✅' : 'Prompt kopieren 📋'}
          </button>
          <button type="button" className="button button--secondary button--danger" onClick={unleashChaos}>
            Chaos entfesseln 💥
          </button>
        </div>
      </div>

      <div className="console__feedback">
        {feedbackRows.map((row) => (
          <div className="feedback-card" key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
