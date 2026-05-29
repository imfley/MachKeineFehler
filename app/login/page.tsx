import type { Metadata } from 'next';
import { FakeLogin } from '../components/fake-login';

export const metadata: Metadata = {
  title: 'Fake Login',
  description: 'Eine absichtlich schlechte Demo-Login-Seite, die nur fiktionale Testdaten anzeigt.'
};

export default function LoginPage() {
  return <FakeLogin />;
}
