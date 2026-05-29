import type { Metadata } from 'next';
import Link from 'next/link';
import { FailLab } from '../components/fail-lab';

export const metadata: Metadata = {
  title: 'Fehler Hall of Fame',
  description: 'Die zweite Chaos-Seite für die besten und schlimmsten KI-generierten Fehler.'
};

export default function FailsPage() {
  return (
    <>
      <FailLab />
      <div className="subpage-footer-link">
        <Link href="/" className="button button--secondary">
          Zurück zur Startseite
        </Link>
      </div>
    </>
  );
}
