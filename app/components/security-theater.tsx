'use client';

import { useMemo, useState } from 'react';

type ThreatCard = {
  id: number;
  title: string;
  kind: string;
  label: string;
  detail: string;
};

const initialThreats: ThreatCard[] = [
  {
    id: 1,
    title: 'Hard-coded frontend secrets',
    kind: 'Fake API key exposed',
    label: 'Simulated risk',
    detail: 'Nur Platzhalterwerte, keine echten Tokens, keine echte Infrastruktur.'
  },
  {
    id: 2,
    title: 'Inverted auth logic',
    kind: 'Users blocked, imposters allowed',
    label: 'Bad demo logic',
    detail: 'Die Karte zeigt nur die Idee eines verdrehten Flows, nicht die echte Implementierung.'
  },
  {
    id: 3,
    title: 'Open admin endpoints',
    kind: 'Bulk-action parody',
    label: 'Admin theater',
    detail: 'Es gibt keine echten Admin-Aktionen, nur eine überdrehte Warnkarte.'
  },
  {
    id: 4,
    title: 'No auth on signup/login',
    kind: 'Auth bypass joke',
    label: 'Mock access',
    detail: 'Der Flow ist bewusst unsinnig, aber komplett harmlos und fiktional.'
  },
  {
    id: 5,
    title: 'Missing row-level security',
    kind: 'Console script fantasy',
    label: 'Fake data leak',
    detail: 'Die angezeigten Datensätze sind komplett erfunden und nur für die Satire da.'
  },
  {
    id: 6,
    title: 'Unhandled runtime exceptions',
    kind: '500 panic loop',
    label: 'Simulated server crash',
    detail: 'Eine überspitzte Fehleranzeige ohne echten Absturz, damit die Demo stabil bleibt.'
  },
  {
    id: 7,
    title: 'Misconfigured env vars',
    kind: 'Missing production config',
    label: 'Config drama',
    detail: 'Hier wird nur so getan, als wäre eine Variable falsch gesetzt.'
  },
  {
    id: 8,
    title: 'Broken file paths',
    kind: 'Cannot find asset',
    label: 'Path confusion',
    detail: 'Der Pfadfehler ist ein Witz, kein echter Zugriff auf Dateien oder Assets.'
  },
  {
    id: 9,
    title: 'DB connection storm',
    kind: 'Too many connections',
    label: 'Connection theater',
    detail: 'Es gibt hier keine Live-DB, also auch keine echte Überlastung.'
  },
  {
    id: 10,
    title: 'Infinite loops',
    kind: 'CPU meltdown parody',
    label: 'Loop panic',
    detail: 'Die Animation stoppt sofort, statt irgendwo Ressourcen zu verbrennen.'
  },
  {
    id: 11,
    title: 'Memory leaks',
    kind: 'Process slowly melts',
    label: 'Memory drama',
    detail: 'Nur ein grafischer Effekt, kein langfristiger Speicherverbrauch.'
  },
  {
    id: 12,
    title: 'Concurrency issues',
    kind: 'Race condition sketch',
    label: 'Async confusion',
    detail: 'Die Seite simuliert nur konkurrierende Events, nicht echte Thread-Probleme.'
  },
  {
    id: 13,
    title: 'Data races',
    kind: 'Two operations, one state',
    label: 'State clash',
    detail: 'Nur eine satirische Darstellung von Konflikten beim gleichzeitigen Zugriff.'
  },
  {
    id: 14,
    title: 'Duplicate charge',
    kind: 'Double click panic',
    label: 'Payment parody',
    detail: 'Die Zahlungs-Action ist komplett fake und kann nichts abbuchen.'
  }
];

function shuffle(items: ThreatCard[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getCardVariant(id: number) {
  return `theater-card--v${((id - 1) % 14) + 1}`;
}

export function SecurityTheater() {
  const [cards, setCards] = useState(initialThreats);
  const [selected, setSelected] = useState<ThreatCard | null>(null);
  const [mode, setMode] = useState<'calm' | 'dramatic'>('calm');

  const summary = useMemo(() => {
    if (!selected) {
      return 'Alle Risiken sind hier nur als Show konstruiert, nicht als echte Warnung aus deinem Code.';
    }

    return `${selected.title} ist nur eine fiktionale Demo-Karte mit ${selected.kind.toLowerCase()}.`;
  }, [selected]);

  function reroll() {
    setCards(shuffle(initialThreats));
    setSelected(null);
    setMode((value) => (value === 'calm' ? 'dramatic' : 'calm'));
  }

  return (
    <main className="page-shell page-shell--subpage">
      <section className="hero hero--subpage">
        <div className="hero__copy">
          <p className="eyebrow">Security Theater / Everything Fake / Demo Only</p>
          <h1>
            Fehler
            <span> Simulator</span>
          </h1>
          <p className="lead">
            Diese Seite spielt alle gewünschten Fehler nur als sichere, absichtlich überdrehte Show durch.
            Keine echten Secrets, keine echten Admins, keine echten Datenleaks.
          </p>
          <div className="hero__actions">
            <button type="button" className="security-button security-button--reroll" onClick={reroll}>
              Demo neu mischen
            </button>
            <a href="/" className="security-button security-button--home">
              Zurück zur Startseite
            </a>
          </div>
        </div>

        <aside className="hero__panel">
          <div className="status-card status-card--glow">
            <span className="status-card__label">Mode</span>
            <strong>{mode === 'calm' ? 'Controlled satire' : 'Maximum panic'}</strong>
            <p>{summary}</p>
          </div>
          <div className="status-card">
            <span className="status-card__label">Safety</span>
            <strong>100% fiktional</strong>
            <p>Alles hier ist Mock-UI, keine realen Endpoints, keine sensiblen Daten.</p>
          </div>
        </aside>
      </section>

      <section className="panel panel--theater">
        <div className="theater__header">
          <div>
            <p className="section-kicker">Error Catalog</p>
            <h2>Alle typischen Fehler als harmlose Karten, damit der Witz sichtbar bleibt.</h2>
          </div>
          <div className="theater__legend">
            <span>tap to inspect</span>
            <span>fake only</span>
          </div>
        </div>

        <div className="theater-grid">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`theater-card ${getCardVariant(card.id)} ${selected?.id === card.id ? 'is-active' : ''}`}
              onClick={() => setSelected(card)}
            >
              <span className="theater-card__index">0{card.id}</span>
              <strong>{card.title}</strong>
              <em>{card.kind}</em>
              <p>{card.label}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid--two">
        <article className="panel panel--theater-detail">
          <p className="section-kicker">Selected demo</p>
          {selected ? (
            <>
              <h2>{selected.title}</h2>
              <p>{selected.detail}</p>
              <p className="theater-note">
                Die Karte simuliert nur, wie dieser Fehler aussehen könnte. Sie zeigt nichts ECHTES aus deinem System.
              </p>
            </>
          ) : (
            <>
              <h2>Choose a card</h2>
              <p>Wähle einen der Demo-Fehler aus, um die passende Fake-Erklärung zu sehen.</p>
            </>
          )}
        </article>

        <article className="panel panel--theater-detail panel--theater-summary">
          <p className="section-kicker">Why this is safe</p>
          <div className="stacked-cards">
            <div className="stacked-card">
              <span>01</span>
              <p>Keine realen API-Keys oder produktiven Geheimnisse im Browser.</p>
            </div>
            <div className="stacked-card">
              <span>02</span>
              <p>Keine echten Admin-Endpunkte, nur eine Demo-Show mit Karten.</p>
            </div>
            <div className="stacked-card">
              <span>03</span>
              <p>Keine echten Datenleaks, nur erfundene Beispiele und Warntexte.</p>
            </div>
            <div className="stacked-card">
              <span>04</span>
              <p>Keine Payment-Operationen, nur ein frei erfundenes Duplicate-Charge-Overlay.</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
