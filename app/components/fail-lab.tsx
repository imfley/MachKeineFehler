'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const failProfiles = [
  'Halluzinierter API-Name',
  'UX mit heiligem Divider-Fetisch',
  'Markdown in einer JSON-Antwort',
  'State-Explosion ohne Grund',
  'Designsystem ignoriert und trotzdem stolz'
];

const failureReasons = [
  'Der Prompt war schon zu lang, bevor die erste Zeile Code entstand.',
  'Die Variable wurde dreimal umbenannt und kein Name war richtig.',
  'Die Lösung funktioniert nur in der Fantasie der generierten README.',
  'Responsive Design endete bei einem sehr entschlossenen Breakpoint.',
  'Alles ist ein Button, bis jemand darauf klickt.'
];

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function FailLab() {
  const [current, setCurrent] = useState(() => ({
    profile: pick(failProfiles),
    reason: pick(failureReasons)
  }));

  const stats = useMemo(
    () => [
      { label: 'Fehler-Scham', value: '0%' },
      { label: 'Confidence', value: 'zu hoch' },
      { label: 'Rollback-Mood', value: 'sofort' }
    ],
    []
  );

  function reroll() {
    setCurrent({
      profile: pick(failProfiles),
      reason: pick(failureReasons)
    });
  }

  return (
    <main className="page-shell page-shell--subpage">
      <section className="hero hero--subpage">
        <div className="hero__copy">
          <p className="eyebrow">Subpage / Hall of Shame / Prompt Autopsy</p>
          <h1>
            Fehler
            <span> Hall of Fame</span>
          </h1>
          <p className="lead">
            Eine zweite Seite für alle Momente, in denen KI-Code so tut, als sei er fertig,
            während die eigentliche Arbeit gerade erst anfängt.
          </p>
          <div className="hero__actions">
            <button type="button" className="button button--primary" onClick={reroll}>
              Nächsten Fail ziehen
            </button>
            <Link href="/" className="button button--secondary">
              Zurück zur Meme-Page
            </Link>
          </div>
        </div>

        <aside className="hero__panel">
          <div className="status-card status-card--glow">
            <span className="status-card__label">Aktueller Fail</span>
            <strong>{current.profile}</strong>
            <p>{current.reason}</p>
          </div>
          <div className="status-card">
            <span className="status-card__label">Diagnose</span>
            <strong>Promptspezifischer Kontrollverlust</strong>
            <p>Die Lösung ist technisch okay, aber emotional sehr laut.</p>
          </div>
        </aside>
      </section>

      <section className="grid grid--two">
        <article className="panel">
          <p className="section-kicker">Erkennungsmerkmale</p>
          <ul className="list list--doom">
            {failProfiles.map((profile) => (
              <li key={profile}>{profile}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="section-kicker">Sofortmaßnahmen</p>
          <div className="stacked-cards">
            {failureReasons.map((reason, index) => (
              <div className="stacked-card" key={reason}>
                <span>0{index + 1}</span>
                <p>{reason}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel panel--lab">
        <div className="signal-grid">
          <div>
            <p className="section-kicker">Fail-Radar</p>
            <h2>Dieses Projekt macht genau die Fehler, über die es Witze macht. Absichtlich.</h2>
          </div>
          <div className="signal-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
