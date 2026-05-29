'use client';

import { useMemo, useState } from 'react';

type SoundPreset = {
  name: string;
  description: string;
  pattern: number[];
};

const presets: SoundPreset[] = [
  {
    name: 'Glitch Ping',
    description: 'Kurzer, nervöser KI-Fehler mit hoher Selbstüberschätzung.',
    pattern: [680, 1240, 620]
  },
  {
    name: 'Prompt Panic',
    description: 'Flackernder Dreiklang für den Moment, in dem der Kontext kippt.',
    pattern: [220, 440, 176, 330]
  },
  {
    name: 'Deploy Fanfare',
    description: 'Zu triumphal für das, was gerade wirklich passiert.',
    pattern: [392, 523, 659, 784]
  },
  {
    name: 'Error Toast',
    description: 'Trocken, knapp und leicht beleidigt.',
    pattern: [180, 180, 140]
  }
];

function playTone(frequency: number, duration: number, startTime = 0) {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(frequency, context.currentTime + startTime);
  gain.gain.setValueAtTime(0.0001, context.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.03, context.currentTime + startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(context.currentTime + startTime);
  oscillator.stop(context.currentTime + startTime + duration + 0.02);

  oscillator.onended = () => {
    context.close().catch(() => undefined);
  };
}

export function MemeSoundboard() {
  const [status, setStatus] = useState('bereit');
  const [activePreset, setActivePreset] = useState<string>('');
  const [soundOn, setSoundOn] = useState(true);

  const activeLabel = useMemo(() => (activePreset ? `Aktiv: ${activePreset}` : 'Kein Preset gespielt'), [activePreset]);

  function trigger(preset: SoundPreset) {
    setActivePreset(preset.name);
    setStatus(preset.description);

    if (!soundOn) return;

    preset.pattern.forEach((frequency, index) => {
      playTone(frequency, index === preset.pattern.length - 1 ? 0.18 : 0.08, index * 0.1);
    });
  }

  return (
    <section className="panel panel--soundboard" aria-label="Soundboard">
      <div className="soundboard__top">
        <div>
          <p className="section-kicker">Soundboard</p>
          <h2>Der Moment, in dem der Prompt Geräusche macht.</h2>
        </div>
        <button type="button" className="toggle" onClick={() => setSoundOn((value) => !value)}>
          Audio {soundOn ? 'an' : 'aus'}
        </button>
      </div>

      <div className="soundboard__grid">
        {presets.map((preset) => (
          <button key={preset.name} type="button" className="sound-card" onClick={() => trigger(preset)}>
            <span className="sound-card__name">{preset.name}</span>
            <span className="sound-card__desc">{preset.description}</span>
          </button>
        ))}
      </div>

      <div className="soundboard__footer">
        <span>{activeLabel}</span>
        <strong>{status}</strong>
      </div>
    </section>
  );
}
