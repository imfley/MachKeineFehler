import type { Metadata } from 'next';
import { AuthChaos } from '../components/auth-chaos';

export const metadata: Metadata = {
  title: 'Login / Register',
  description: 'Eine absichtlich schlechte Login- und Register-Seite mit randomisierten Bildern und rein fiktionaler UI.'
};

export default function LoginPage() {
  return <AuthChaos />;
}
