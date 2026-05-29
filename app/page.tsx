import { MemeConsole } from './components/meme-console';
import { MemeSoundboard } from './components/meme-soundboard';
import { AmbientBackground } from './components/ambient-background';

const promptFails = [
  'Vergisst Kontext und halluziniert Selbstvertrauen',
  'Erfindet Paketnamen mit der Energie eines schlechten Praktikanten',
  'Schreibt JSX mit fehlenden Klammern und sagt trotzdem: fertig',
  'Macht aus einer einfachen Anforderung eine 800-Zeilen-Odyssee',
  'Ignoriert das Designsystem und erfindet eine neue Religion'
];

const antiPatterns = [
  'Zu viel Magie, zu wenig Absicht',
  'Naming wie ein Zufallszahlengenerator in der Pause',
  'Kein State-Management, nur Hoffnung',
  'Responsive? Nur wenn der Zufall mitspielt',
  'Semantik auf Urlaub, div-Suppe im Dauereinsatz'
];

const promptFrames = [
  'Mach eine Chaos-Page, aber bitte mit maximalem Vibe und null Scham.',
  'Code soll wunderschön aussehen und gleichzeitig mehrere klassische KI-Fehler nachspielen.',
  'Vercel-kompatibel, deploybar, laut, verspielt, leicht absurd.'
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hydration-banner" aria-label="Hydration failure notice">
        <div>
          <strong>Hydration failed.</strong>
          <span>Client state drifted into a prettier lie. Refreshing may worsen the vibe.</span>
        </div>
        <div className="hydration-banner__meta">
          <span>status: unstable</span>
          <span>render: desynced</span>
        </div>
      </section>

      <AmbientBackground />
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Prompt-Alarm / Vercel-Ready / Broken-By-Design</p>
          <h1>
            Mach
            <span> keine Fehler</span>
          </h1>
          <p className="lead">
            Eine absichtlich überdrehte Chaos-Page, die sich anfühlt wie ein
            Prompt, der zu viel will und trotzdem zu selbstbewusst antwortet.
          </p>

          <div className="hero__chips" aria-label="Prompt-Tags">
            <span>maximal vibecoded</span>
            <span>deploybar auf Vercel</span>
            <span>absichtlich chaotisch</span>
          </div>

          <div className="hero__actions">
            <a href="#fehler" className="button button--primary">
              Fehler katalogisieren
            </a>
            <a href="#prompt" className="button button--secondary">
              Prompt lesen
            </a>
            <a href="/fails" className="button button--secondary">
              Fehler Hall of Fame
            </a>
            <a href="/login" className="button button--secondary">
              Fake Login
            </a>
            <a href="/security-theater" className="button button--secondary">
              Security Theater
            </a>
          </div>
        </div>

        <aside className="hero__panel" aria-label="Status">
          <div className="status-card status-card--glow">
            <span className="status-card__label">Confidence</span>
            <strong>127%</strong>
            <p>Zu hoch, um korrekt zu sein.</p>
          </div>
          <div className="status-card status-card--tilt">
            <span className="status-card__label">Error Budget</span>
            <strong>∞</strong>
            <p>Wurde bereits in der Idee verbrannt.</p>
          </div>
        </aside>
      </section>

      <MemeConsole />
      <MemeSoundboard />

      <section className="marquee" aria-label="Laufband">
        <div className="marquee__track">
          <span>Mach keine Fehler</span>
          <span>Mach keine Fehler</span>
          <span>Mach keine Fehler</span>
          <span>Mach keine Fehler</span>
          <span>Mach keine Fehler</span>
          <span>Mach keine Fehler</span>
        </div>
      </section>

      <section className="grid grid--two" id="fehler">
        <article className="panel panel--large">
          <p className="section-kicker">Bekannte KI-Fehler</p>
          <ul className="list list--doom">
            {promptFails.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel panel--stacked">
          <p className="section-kicker">Anti-Patterns</p>
          <div className="stacked-cards">
            {antiPatterns.map((item, index) => (
              <div className="stacked-card" key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid grid--split" id="prompt">
        <article className="panel panel--prompt">
          <p className="section-kicker">Prompt-Blueprint</p>
          <div className="prompt-box">
            {promptFrames.map((frame) => (
              <p key={frame}>{frame}</p>
            ))}
          </div>
        </article>

        <article className="panel panel--signal">
          <p className="section-kicker">Signal vs. Rauschen</p>
          <div className="meter">
            <div className="meter__row">
              <span>Absicht</span>
              <div><i className="meter__fill meter__fill--82" /></div>
            </div>
            <div className="meter__row">
              <span>Chaos</span>
              <div><i className="meter__fill meter__fill--97" /></div>
            </div>
            <div className="meter__row">
              <span>Vibe</span>
              <div><i className="meter__fill meter__fill--100" /></div>
            </div>
          </div>
        </article>
      </section>

      <section className="panel panel--signal panel--wide" aria-label="Readout">
        <div className="signal-grid">
          <div>
            <p className="section-kicker">Live-Readout</p>
            <h2 className="signal-title">Das ist nicht nur eine Seite, das ist ein höflicher Kontrollverlust.</h2>
          </div>
          <div className="signal-stats">
            <div>
              <span>Render-Drama</span>
              <strong>hoch</strong>
            </div>
            <div>
              <span>Deploy-Risiko</span>
              <strong>niedrig</strong>
            </div>
            <div>
              <span>Chaos-Dichte</span>
              <strong>maximal</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="build-log-overlay" aria-label="Build log overlay">
        <div className="build-log-overlay__window">
          <div className="build-log-overlay__top">
            <strong>build: failed with style</strong>
            <span>overlay://compiler</span>
          </div>
          <div className="build-log-overlay__body">
            <p>[warn] hydration checksum drifted from 9b2 to 9f7</p>
            <p>[error] fake bundle emitted 3 impossible warnings</p>
            <p>[info] hot reload reapplied the same mistake</p>
            <p>[trace] at renderChaos (app/page.tsx:14:3)</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>
          Ein Projekt von Claude, Gemini und co. - Mentalle unterstuetzzung von{' '}
          <a href="https://imfley.de" target="_blank" rel="noreferrer noopener">
            ImFley
          </a>{' '}
          und{' '}
          <a href="https://meimine.online" target="_blank" rel="noreferrer noopener">
            meimine.
          </a>
        </p>
      </footer>
    </main>
  );
}
