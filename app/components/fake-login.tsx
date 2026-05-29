'use client';

import { useMemo, useState, type FormEvent } from 'react';

type LeakCategory = 'users' | 'env' | 'logs' | 'payments' | 'admin';

type FakeUser = {
  name: string;
  handle: string;
  role: string;
  status: string;
};

type FakeDump = {
  users: FakeUser[];
  env: Array<{ key: string; value: string }>;
  logs: string[];
  payments: Array<{ ref: string; state: string; amount: string }>;
  admin: Array<{ action: string; target: string; note: string }>;
};

const correctLogin = {
  username: 'admin',
  password: 'passw0rd'
};

const userNames = ['Ada Promptson', 'Mika Bugman', 'Nova Syntax', 'Pax Render', 'Ivy Prompt', 'Zed Crash', 'Luna Cache', 'Neo Branch'];
const userHandles = ['@adapromptson', '@mikabugman', '@novasyntax', '@paxrender', '@ivyprompt', '@zedcrash', '@lunacache', '@neobranch'];
const userRoles = ['Lead Hallucination Engineer', 'Senior Stack Trace Poet', 'Design System Archaeologist', 'Cache Whisperer', 'Prompt Ops Intern', 'Build-Env Detective', 'Feature Flag Historian', 'Invisible Admin'];
const userStatuses = ['Zu selbstbewusst', 'Pending rollback', 'Forgot context', 'Successfully confused', 'Leaked fictional data', 'Held together by duct tape', 'In a very real mood', 'Unclear but loud'];

const envKeys = ['STRIPE_SECRET', 'SUPABASE_KEY', 'NEXT_PUBLIC_DEBUG', 'DATABASE_URL', 'ADMIN_TOKEN', 'REDIS_URL'];
const envValues = ['sk_test_***fake***', 'sb_demo_***fake***', 'true', 'postgres://fictional', 'tok_demo_***fake***', 'redis://imaginary'];

const logMessages = [
  'POST /login 401 -> user typed "admin", app answered with philosophy.',
  'GET /admin/export -> denied? maybe? who knows, this is a fake dump.',
  'Payment route retried itself for no good reason.',
  'DB pool reached maximum imaginary connections.',
  'Unhandled exception decorated the stack trace with confetti.'
];

const paymentStates = ['charged', 'pending', 'duplicate', 'refunded', 'ghosted'];
const paymentRefs = ['pay_demo_1A', 'pay_demo_2B', 'pay_demo_3C', 'pay_demo_4D', 'pay_demo_5E'];
const adminActions = ['delete_user', 'bulk_export', 'reset_password', 'escalate_role', 'invalidate_session'];
const adminTargets = ['all_users', 'alpha_testers', 'billing_queue', 'prod_readonly', 'shadow_admins'];

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeUser(index: number): FakeUser {
  return {
    name: pick(userNames),
    handle: pick(userHandles),
    role: pick(userRoles),
    status: pick(userStatuses) + ` #${index + 1}`
  };
}

function makeDump(): FakeDump {
  return {
    users: Array.from({ length: 5 }, (_, index) => makeUser(index)),
    env: Array.from({ length: 4 }, () => ({ key: pick(envKeys), value: pick(envValues) })),
    logs: Array.from({ length: 4 }, () => pick(logMessages)),
    payments: Array.from({ length: 4 }, () => ({ ref: pick(paymentRefs), state: pick(paymentStates), amount: `${Math.floor(8 + Math.random() * 290)}.00 EUR` })),
    admin: Array.from({ length: 4 }, () => ({ action: pick(adminActions), target: pick(adminTargets), note: 'Demo only, no real endpoint.' }))
  };
}

const categoryOrder: LeakCategory[] = ['users', 'env', 'logs', 'payments', 'admin'];

export function FakeLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLeaking, setIsLeaking] = useState(false);
  const [activeCategory, setActiveCategory] = useState<LeakCategory>('users');
  const [dump, setDump] = useState<FakeDump>(() => makeDump());

  const matched = username.trim().toLowerCase() === correctLogin.username && password === correctLogin.password;

  const headline = useMemo(() => {
    if (!submitted) return 'Bitte absichtlich schlecht einloggen.';
    if (matched) return 'Zugang gewährt. Sehr verantwortungslos. Trotzdem nur Demo.';
    return 'Ups. Falscher Login. Jetzt kommt die völlig erfundene Leak-Konsole.';
  }, [matched, submitted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setIsLeaking(true);
    setDump(makeDump());
    setActiveCategory('users');
  }

  function resetForm() {
    setUsername('');
    setPassword('');
    setSubmitted(false);
    setIsLeaking(false);
    setDump(makeDump());
    setActiveCategory('users');
  }

  const categoryLabels: Record<LeakCategory, string> = {
    users: 'Users',
    env: 'Env',
    logs: 'Logs',
    payments: 'Payments',
    admin: 'Admin'
  };

  return (
    <main className="page-shell page-shell--subpage">
      <section className="hero hero--subpage">
        <div className="hero__copy">
          <p className="eyebrow">Bad UX / Demo Login / Fictional Data Only</p>
          <h1>
            Fake
            <span> Login</span>
          </h1>
          <p className="lead">
            Eine absichtlich peinliche Login-Seite, die bei falscher Eingabe nur randomisierte, fiktionale Demo-Daten ausgibt.
            Keine echten Accounts, kein echtes Leck, nur maximaler Meme-Overkill.
          </p>
          <div className="hero__actions">
            <button type="button" className="button button--secondary" onClick={resetForm}>
              Alles neu würfeln
            </button>
          </div>
        </div>

        <aside className="hero__panel">
          <div className="status-card status-card--glow">
            <span className="status-card__label">Status</span>
            <strong>{submitted ? (matched ? 'Admin-Modus' : 'Leak-Modus') : 'Wartet auf Chaos'}</strong>
            <p>{headline}</p>
          </div>
          <div className="status-card">
            <span className="status-card__label">Reality Check</span>
            <strong>100% erfunden</strong>
            <p>Jede Karte, jede Zeile und jeder Wert hier ist Demo-Theater.</p>
          </div>
        </aside>
      </section>

      <section className="grid grid--two">
        <article className="panel panel--login">
          <p className="section-kicker">Login</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                placeholder="z. B. admin"
              />
            </label>
            <label>
              <span>Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="z. B. passw0rd"
              />
            </label>
            <button type="submit" className="button button--primary">
              Login ausführen
            </button>
          </form>
          <p className="login-note">Tipp: Der falsche Login ist hier absichtlich lustiger als der richtige.</p>
        </article>

        <article className="panel panel--login-leak">
          <p className="section-kicker">Demo Leak</p>
          {!isLeaking ? (
            <div className="login-placeholder">
              <strong>Keine Daten geladen.</strong>
              <p>Fehlversuch nötig, um den randomisierten Demo-Dump zu zeigen.</p>
            </div>
          ) : matched ? (
            <div className="login-success">
              <strong>Welcome, admin.</strong>
              <p>Richtig erkannt, aber natürlich ist auch das nur eine Demo.</p>
            </div>
          ) : (
            <div className="leak-shell" aria-live="polite">
              <div className="leak-tabs">
                {categoryOrder.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`leak-tab ${activeCategory === category ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>

              <p className="leak-warning">[DEMO DUMP] Alles hier ist randomisiert, erfunden und absichtlich peinlich.</p>

              {activeCategory === 'users' && (
                <div className="leak-list">
                  {dump.users.map((user, index) => (
                    <div className="leak-row" key={`${user.handle}-${index}`}>
                      <span>{index + 1}</span>
                      <div>
                        <strong>{user.name}</strong>
                        <p>
                          {user.handle} · {user.role} · {user.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeCategory === 'env' && (
                <div className="leak-grid">
                  {dump.env.map((entry) => (
                    <div className="leak-chip" key={`${entry.key}-${entry.value}`}>
                      <span>{entry.key}</span>
                      <strong>{entry.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              {activeCategory === 'logs' && (
                <div className="leak-logs">
                  {dump.logs.map((line, index) => (
                    <p key={`${line}-${index}`}>
                      <span>0{index + 1}</span>
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {activeCategory === 'payments' && (
                <div className="leak-list">
                  {dump.payments.map((payment, index) => (
                    <div className="leak-row" key={`${payment.ref}-${index}`}>
                      <span>€</span>
                      <div>
                        <strong>{payment.ref}</strong>
                        <p>
                          {payment.state} · {payment.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeCategory === 'admin' && (
                <div className="leak-list">
                  {dump.admin.map((entry, index) => (
                    <div className="leak-row" key={`${entry.action}-${entry.target}-${index}`}>
                      <span>{index + 1}</span>
                      <div>
                        <strong>{entry.action}</strong>
                        <p>
                          {entry.target} · {entry.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </article>
      </section>

      <section className="panel panel--signal panel--wide">
        <div className="signal-grid">
          <div>
            <p className="section-kicker">Fake Leak Contract</p>
            <h2>Jeder Fehlversuch würfelt neue erfundene Nutzer, ENV-Werte, Logs und Admin-Karten.</h2>
          </div>
          <div className="signal-stats">
            <div>
              <span>Realitätsgrad</span>
              <strong>null</strong>
            </div>
            <div>
              <span>Peinlichkeit</span>
              <strong>maximal</strong>
            </div>
            <div>
              <span>Safety</span>
              <strong>klar markiert</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
