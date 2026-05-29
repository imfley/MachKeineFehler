import type { Metadata } from 'next';
import { SecurityTheater } from '../components/security-theater';

export const metadata: Metadata = {
  title: 'Security Theater',
  description: 'Eine sichere Demo-Seite, die alle gewünschten Fehler nur als fiktionale Karten simuliert.'
};

export default function SecurityTheaterPage() {
  return <SecurityTheater />;
}
