'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Mode = 'login' | 'register';

const envBlueprint = [
  ['NEXT_PUBLIC_MODE', 'volatile'],
  ['AUTH_SECRET', '***fake***'],
  ['DATABASE_URL', 'postgres://fictional'],
  ['NEXT_PUBLIC_DEBUG', 'true'],
  ['SESSION_TTL', '03:17'],
  ['FEATURE_FLAG_CLIP', 'on'],
  ['API_GATE', 'undefined']
] as const;

const scriptFailures = [
  'TypeError: layout.shift is not a function',
  'ReferenceError: deployMood is not defined',
  'RangeError: maximum chaos exceeded',
  'SyntaxError: unexpected token “vibe”',
  'UnhandledPromiseRejection: the button refused the click',
  'Invariant violated: this panel already escaped the grid',
  'Error: failed to load imaginary config from /dev/null'
];

const scriptContexts = [
  'at renderPortal (auth-chaos.tsx:42:13)',
  'at mountShell (auth-chaos.tsx:87:5)',
  'at submitDeadEnd (auth-chaos.tsx:109:11)',
  'at retryChaos (auth-chaos.tsx:133:9)',
  'at Object.<anonymous> (app/page.tsx:61:3)'
];

const failureStates = [
  'recovered with more noise',
  'logged and ignored',
  'replayed on every interaction',
  'collapsed into a prettier mess',
  'persisted nowhere useful'
];

const serviceWorkerErrors = [
  'ServiceWorkerError: cache put rejected for /fictional-shell.js',
  'Uncaught DOMException: Failed to execute CacheStorage.open',
  'Warning: navigation preload returned stale nonsense',
  'QuotaExceededError: the browser rejected another fake asset',
  'SW update skipped: version mismatch with imaginary scope',
  'FetchEvent failed: offline fallback could not resolve itself'
];

const labels = {
  login: 'Login',
  register: 'Register'
} as const;

function makeSvg(seed: number, tone: string, accent: string) {
  const rotate = (seed * 37) % 360;
  const skew = (seed * 11) % 18 - 9;
  const left = (seed * 29) % 100;
  const top = (seed * 17) % 100;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${tone}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="640" height="640" fill="#0b0d18" />
      <circle cx="${120 + left}" cy="${140 + top}" r="120" fill="url(#g)" opacity="0.85" />
      <rect x="${80 + skew}" y="${210 + skew}" width="${280 - skew}" height="${180 + skew}" rx="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" stroke-width="4" transform="rotate(${rotate} 320 320)" />
      <path d="M40 520 L260 340 L380 440 L600 240" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" opacity="0.88" />
      <text x="48" y="586" fill="rgba(255,255,255,0.8)" font-family="Arial Black, sans-serif" font-size="34" letter-spacing="6">${seed.toString(16).slice(-4).toUpperCase()}</text>
    </svg>
  `)}`;
}

function pick(seed: number, pool: readonly string[]) {
  return pool[seed % pool.length];
}

export function AuthChaos() {
  const [mode, setMode] = useState<Mode>('login');
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 9000));
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('bereit zum Umkippen');
  const [autoShuffle, setAutoShuffle] = useState(true);

  useEffect(() => {
    if (!autoShuffle) return;

    const timer = window.setInterval(() => {
      setSeed((value) => value + 1);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [autoShuffle]);

  const cards = useMemo(() => {
    const tones = ['#ff4d8d', '#67e8f9', '#ffb703', '#8b5cf6', '#22c55e', '#f97316'];
    const accents = ['#f7f1e8', '#0f172a', '#ec4899', '#14b8a6', '#facc15', '#e2e8f0'];

    return Array.from({ length: 6 }, (_, index) => {
      const cardSeed = seed + index * 13;
      return {
        id: cardSeed,
        src: makeSvg(cardSeed, pick(cardSeed, tones), pick(cardSeed + 3, accents)),
        title: pick(cardSeed, ['fractured profile', 'ghost account', 'floating alias', 'broken identity', 'rendered shadow', 'fake persona']),
        tag: pick(cardSeed + 7, ['.env spill', 'dead-end auth', 'layout mismatch', 'random preview', 'no backend', 'demo only'])
      };
    });
  }, [seed]);

  const envRows = useMemo(
    () => envBlueprint.map(([key, value], index) => ({ key, value: index % 2 === 0 ? value : `${value}-${(seed + index).toString(16).slice(-3)}` })),
    [seed]
  );

  const failureFeed = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => {
        const failureSeed = seed + index * 5;

        return {
          id: failureSeed,
          message: pick(failureSeed, scriptFailures),
          context: pick(failureSeed + 4, scriptContexts),
          state: pick(failureSeed + 9, failureStates)
        };
      }),
    [seed]
  );

  const swFeed = useMemo(
    () =>
      Array.from({ length: 4 }, (_, index) => {
        const swSeed = seed + 70 + index * 11;

        return {
          id: swSeed,
          message: pick(swSeed, serviceWorkerErrors),
          context: pick(swSeed + 5, scriptContexts),
          state: pick(swSeed + 8, failureStates)
        };
      }),
    [seed]
  );

  function reshuffle() {
    setSeed((value) => value + 9);
    setMode((current) => (current === 'login' ? 'register' : 'login'));
    setStatus('Route neu verteilt. Nichts wurde gespeichert.');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSeed((value) => value + 17);
    setStatus(
      mode === 'login'
        ? 'Login accepted by a failing phantom script.'
        : 'Register written to a dead-end buffer and never flushed.'
    );
  }

  return (
    <main className="page-shell page-shell--subpage auth-chaos">
      <section className="hero hero--subpage auth-chaos__hero">
        <div className="hero__copy auth-chaos__copy">
          <p className="eyebrow">Dead-End Auth / Random Images / Broken Layout</p>
          <h1>
            Access
            <span> Portal</span>
          </h1>
          <p className="lead">
            Login und Register existieren hier nur als visuelles Theater. Die Felder sehen wichtig aus,
            speichern aber nichts und führen nirgendwohin.
          </p>

          <div className="hero__actions auth-chaos__controls">
            <button type="button" className="button button--secondary" onClick={() => setMode('login')}>
              {labels.login}
            </button>
            <button type="button" className="button button--secondary" onClick={() => setMode('register')}>
              {labels.register}
            </button>
            <button type="button" className="button button--primary" onClick={reshuffle}>
              Layout zerlegen
            </button>
            <button type="button" className="button button--secondary" onClick={() => setAutoShuffle((value) => !value)}>
              Auto-{autoShuffle ? 'aus' : 'an'}
            </button>
          </div>
        </div>

        <aside className="hero__panel auth-chaos__status">
          <div className="status-card status-card--glow">
            <span className="status-card__label">Mode</span>
            <strong>{mode === 'login' ? 'Login Fragment' : 'Register Fragment'}</strong>
            <p>{status}</p>
          </div>
          <div className="status-card status-card--tilt">
            <span className="status-card__label">Render Seed</span>
            <strong>{seed}</strong>
            <p>Der Seed verschiebt sich absichtlich und sorgt für kleine Layout-Dellen.</p>
          </div>
        </aside>
      </section>

      <section className="grid grid--two auth-chaos__grid">
        <article className="panel panel--login auth-chaos__form-panel">
          <p className="section-kicker">{mode === 'login' ? 'Login' : 'Register'}</p>
          <form className="auth-chaos__form" onSubmit={handleSubmit}>
            <label>
              <span>Username</span>
              <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="random.alias" />
            </label>

            {mode === 'register' && (
              <label>
                <span>Email</span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@fictional.dev" />
              </label>
            )}

            <label>
              <span>Password</span>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="••••••••" />
            </label>

            <label>
              <span>{mode === 'login' ? 'Invite Code' : 'Referral Code'}</span>
              <input placeholder={mode === 'login' ? 'nope-404' : 'share-me-not'} />
            </label>

            <button type="submit" className="button button--primary">
              {mode === 'login' ? 'Login ausführen' : 'Register ausführen'}
            </button>
          </form>

          <p className="login-note">Der Flow sieht ernst aus, speichert aber exakt nichts.</p>
        </article>

        <article className="panel panel--login-leak auth-chaos__gallery-panel">
          <p className="section-kicker">Generated Images</p>
          <div className="auth-chaos__gallery">
            {cards.map((card, index) => (
              <figure className={`auth-chaos__card ${index % 2 === 0 ? 'auth-chaos__card--tilt' : ''}`} key={card.id}>
                <img src={card.src} alt="" loading="lazy" />
                <figcaption>
                  <strong>{card.title}</strong>
                  <span>{card.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </article>
      </section>

      <section className="grid grid--two auth-chaos__grid">
        <article className="panel panel--signal auth-chaos__env-panel">
          <p className="section-kicker">.env Spill</p>
          <div className="auth-chaos__env-grid">
            {envRows.map((entry) => (
              <div className="auth-chaos__env-row" key={entry.key}>
                <span>{entry.key}</span>
                <strong>{entry.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel panel--signal auth-chaos__note-panel">
          <p className="section-kicker">Dead Ends</p>
          <div className="stacked-cards">
            <div className="stacked-card">
              <span>01</span>
              <p>Kein submit triggert einen echten Account-Flow.</p>
            </div>
            <div className="stacked-card">
              <span>02</span>
              <p>Die Bilder werden im Browser generiert und ändern sich mit dem Seed.</p>
            </div>
            <div className="stacked-card">
              <span>03</span>
              <p>Ein bisschen Hydration-Drift ist hier Teil der Show.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="panel panel--console auth-chaos__script-panel">
        <div className="console__top auth-chaos__script-top">
          <div>
            <p className="section-kicker">Script Failures</p>
            <h2>Die Seite tut jetzt so, als ob ihre Scripts regelmäßig aufgeben.</h2>
          </div>
          <button type="button" className="toggle" onClick={reshuffle}>
            Re-run failures
          </button>
        </div>

        <div className="auth-chaos__script-feed">
          {failureFeed.map((item, index) => (
            <article className="auth-chaos__error-card" key={item.id}>
              <div className="auth-chaos__error-head">
                <span>0{index + 1}</span>
                <strong>{item.message}</strong>
              </div>
              <code>{item.context}</code>
              <p>{item.state}</p>
            </article>
          ))}
        </div>

        <div className="auth-chaos__stack">
          <div className="auth-chaos__stack-line">npm run fail:seed --mode={mode}</div>
          <div className="auth-chaos__stack-line">next dev // silent panic // hot reload drama</div>
          <div className="auth-chaos__stack-line">console.error('intentional failure injected');</div>
        </div>
      </section>

      <section className="panel panel--console auth-chaos__script-panel auth-chaos__sw-panel">
        <div className="console__top auth-chaos__script-top">
          <div>
            <p className="section-kicker">Service Worker Errors</p>
            <h2>The offline layer is also pretending to fail.</h2>
          </div>
          <button type="button" className="toggle" onClick={() => setSeed((value) => value + 3)}>
            Refresh scope
          </button>
        </div>

        <div className="auth-chaos__script-feed auth-chaos__sw-feed">
          {swFeed.map((item, index) => (
            <article className="auth-chaos__error-card auth-chaos__error-card--sw" key={item.id}>
              <div className="auth-chaos__error-head">
                <span>SW{index + 1}</span>
                <strong>{item.message}</strong>
              </div>
              <code>{item.context}</code>
              <p>{item.state}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}