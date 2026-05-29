'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';

type BurstCard = {
  id: number;
  label: string;
  detail: string;
  tone: string;
};

type PopupCard = {
  id: number;
  title: string;
  detail: string;
  tone: string;
};

const consoleNoise = [
  'TypeError: the vibe object was undefined again',
  'RangeError: maximum mood exceeded',
  'ReferenceError: this panel escaped the grid',
  'Warning: hydration checksum drifted into fan fiction',
  'Error: click handler returned a theatrical collapse',
  'Uncaught (in promise): the button panicked quietly'
];

const fake500Reasons = [
  'Der Klick hat einen sehr ernst gemeinten, komplett erfundenen 500er ausgelöst.',
  'Server-Seite nicht betroffen, nur maximale Bildschirm-Drama-Disziplin.',
  'Das ist ein Bühnenfehler. Er sieht teuer aus, tut aber nichts.',
  'Die Seite hat sich kurz selbst für produktiv gehalten und musste korrigiert werden.'
];

const hydrationCopy = [
  'server: sauber',
  'client: leicht beleidigt',
  'checksum: drifted',
  'render: theatrical mismatch'
];

const burstLabels = ['spill', 'glitch', 'duplicate', 'echo', 'offset', 'desync'];
const burstDetails = [
  'Content ist hier zweimal auf dem Tisch gelandet.',
  'Dieses Fragment gehört sichtbar nicht hierher.',
  'Der Block wirkt, als hätte ihn jemand versehentlich kopiert.',
  'Layout und Inhalt sprechen nicht dieselbe Sprache.'
];

const rootLines = [
  'root@mach-keine-fehler:/srv/app# whoami',
  'root',
  'root@mach-keine-fehler:/srv/app# hostnamectl',
  'Static chaos server · kernel: theatrical · mode: fictional',
  'root@mach-keine-fehler:/srv/app# ls -la /etc /var/log',
  'drwxr-xr-x  3 root root 4096 ??? /etc/pretend',
  '-rw-r--r--  1 root root 8192 ??? /var/log/fake-errors.log',
  'root@mach-keine-fehler:/srv/app# tail -f /var/log/fake-errors.log',
  '[INFO] sudo granted by the meme department',
  '[WARN] all credentials shown below are fictional'
];

const popupTitles = ['root shell granted', 'permission drift', 'overlay stack overflow', 'ghost terminal', 'panic dialog'];
const popupDetails = [
  'Das Overlay sieht nach einem Serverfehler aus, ist aber nur Theater.',
  'Der Popup-Stack überlappt absichtlich andere UI-Elemente.',
  'Kein echter Zugriff, nur maximaler Admin-Look.',
  'Die Seite tut so, als wären jetzt wirklich Rechte eskaliert.'
];

function pick(seed: number, items: string[]) {
  return items[Math.abs(seed) % items.length];
}

function buildBurst(seed: number): BurstCard[] {
  return Array.from({ length: 6 }, (_, index) => {
    const next = seed + index * 19;
    return {
      id: next,
      label: `${pick(next, burstLabels)} ${String(index + 1).padStart(2, '0')}`,
      detail: pick(next + 7, burstDetails),
      tone: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(3deg)'
    };
  });
}

export function ChaosEngine() {
  const [seed, setSeed] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [incident, setIncident] = useState<null | { title: string; detail: string }>(null);
  const [consoleCount, setConsoleCount] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [popups, setPopups] = useState<PopupCard[]>([]);

  useEffect(() => {
    setMounted(true);
    setSeed(Math.floor(Math.random() * 9000));

    const onScroll = () => {
      setScrollDepth(window.scrollY);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextSeed = seed + Math.floor(Math.random() * 11) + 1;
      setSeed(nextSeed);
      setConsoleCount((value) => value + 1);
      console.error(`[fake] ${pick(nextSeed, consoleNoise)}`);
      console.warn(`[warn] ${pick(nextSeed + 3, consoleNoise)}`);
      console.log(`[trace] ${pick(nextSeed + 5, consoleNoise)}`);

      if (Math.random() > 0.7) {
        setIncident({
          title: '500 Internal Server Error',
          detail: pick(nextSeed + 11, fake500Reasons)
        });
      }
    }, 3600);

    return () => window.clearInterval(timer);
  }, [seed]);

  useEffect(() => {
    if (!incident) return;
    const timeout = window.setTimeout(() => setIncident(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [incident]);

  useEffect(() => {
    if (!mounted) return;

    const timer = window.setInterval(() => {
      const popupSeed = seed + Math.floor(Math.random() * 97) + popups.length * 5;
      const popup: PopupCard = {
        id: popupSeed,
        title: pick(popupSeed, popupTitles),
        detail: pick(popupSeed + 5, popupDetails),
        tone: `${Math.max(8, Math.floor(Math.random() * 72))}%`
      };

      setPopups((current) => [...current.slice(-2), popup]);
    }, 5400);

    return () => window.clearInterval(timer);
  }, [mounted, popups.length, seed]);

  useEffect(() => {
    if (!popups.length) return;

    const timer = window.setTimeout(() => {
      setPopups((current) => current.slice(1));
    }, 3800);

    return () => window.clearTimeout(timer);
  }, [popups]);

  const burstCards = useMemo(() => buildBurst(seed || 13), [seed]);
  const parallaxOffset = Math.min(scrollDepth * 0.16, 120);
  const shellStyle: CSSProperties = {
    transform: `translate3d(0, ${parallaxOffset * 0.18}px, 0)`
  };
  const shellStyleAlt: CSSProperties = {
    transform: `translate3d(0, ${-parallaxOffset * 0.12}px, 0)`
  };

  function triggerIncident() {
    const nextSeed = seed + clickCount * 17 + 29;
    setClickCount((value) => value + 1);
    setSeed(nextSeed);
    setIncident({
      title: '500 Internal Server Error',
      detail: pick(nextSeed, fake500Reasons)
    });
    setPopups((current) => [
      ...current.slice(-2),
      {
        id: nextSeed + 1,
        title: pick(nextSeed + 11, popupTitles),
        detail: pick(nextSeed + 13, popupDetails),
        tone: '84%'
      },
      {
        id: nextSeed + 2,
        title: 'root session mirrored',
        detail: 'Die Oberfläche behauptet Zugriff, aber alles bleibt visuell.',
        tone: '68%'
      }
    ]);
    console.error(`[fake] ${pick(nextSeed, consoleNoise)}`);
    console.error(`[fake] ${pick(nextSeed + 2, consoleNoise)}`);
  }

  return (
    <section className="chaos-engine panel panel--wide" aria-label="Chaos engine">
      <div className="chaos-engine__top">
        <div>
          <p className="section-kicker">Runtime Chaos</p>
          <h2>Zwischendrin ist die Seite mehrfach in sich selbst ausgelaufen.</h2>
        </div>
        <div className="chaos-engine__stats">
          <span>console spam: {consoleCount}</span>
          <span>click incidents: {clickCount}</span>
          <span>hydration: {mounted ? 'drifting' : 'loading'}</span>
        </div>
      </div>

      <div className="chaos-engine__grid">
        <button type="button" className="chaos-engine__panic" onClick={triggerIncident}>
          <strong>Tap for fake 500</strong>
          <span>Jeder Klick kann den komplett erfundenen Fehlerbildschirm auslösen.</span>
        </button>

        <div className="chaos-engine__panel chaos-engine__panel--shell" style={shellStyle}>
          <p className="section-kicker">Root Console</p>
          <h3>Root access simulator</h3>
          <div className="chaos-engine__shell">
            {rootLines.map((line) => (
              <div className="chaos-engine__shell-line" key={line}>
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="chaos-engine__panel chaos-engine__panel--drift">
          <p className="section-kicker">Hydration Mirage</p>
          <h3>Hydration error simulator</h3>
          <div className="chaos-engine__drift-lines">
            {hydrationCopy.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <p>Server und Client erzählen absichtlich leicht unterschiedliche Geschichten.</p>
        </div>

        <div className="chaos-engine__panel chaos-engine__panel--spill" style={shellStyleAlt}>
          <p className="section-kicker">Content Spill</p>
          <div className="chaos-engine__burst-grid">
            {burstCards.map((card) => (
              <article className="chaos-engine__burst-card" key={card.id} style={{ transform: card.tone }}>
                <span>{card.label}</span>
                <strong>{card.detail}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="chaos-engine__footer">
        <div className="chaos-engine__log-line">[error] fake 500 on demand is still fake</div>
        <div className="chaos-engine__log-line">[warn] hydration drift is a costume, not a bug</div>
        <div className="chaos-engine__log-line">[trace] at chaosEngine (app/components/chaos-engine.tsx:1:1)</div>
      </div>

      <div className="chaos-engine__popup-stack" aria-live="polite">
        {popups.map((popup, index) => (
          <article
            className="chaos-engine__popup"
            key={popup.id}
            style={{
              transform: `translate3d(${index * 12}px, ${index * 18}px, 0) rotate(${index % 2 === 0 ? -2 : 2}deg)`,
              opacity: `${1 - index * 0.1}`
            }}
          >
            <span>{popup.tone}</span>
            <strong>{popup.title}</strong>
            <p>{popup.detail}</p>
          </article>
        ))}
      </div>

      {incident && (
        <div className="chaos-engine__overlay" role="alert" aria-live="assertive">
          <div className="chaos-engine__overlay-card">
            <span>HTTP/500</span>
            <strong>{incident.title}</strong>
            <p>{incident.detail}</p>
            <small>Fiktionaler Effekt nur für den Meme-Look.</small>
          </div>
        </div>
      )}
    </section>
  );
}