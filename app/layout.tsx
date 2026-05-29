import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mach keine Fehler',
  description: 'Eine absichtlich überdrehte Meme-Landingpage über KI-Fehler, Prompt-Panik und maximalen Vibe.',
  metadataBase: new URL('https://mach-keine-fehler.vercel.app'),
  openGraph: {
    title: 'Mach keine Fehler',
    description: 'Eine Vercel-kompatible Meme-Page über KI-Fehler, Prompt-Chaos und maximalen Vibe.',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mach keine Fehler - Meme-Preview für Discord'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mach keine Fehler',
    description: 'Eine Vercel-kompatible Meme-Page über KI-Fehler, Prompt-Chaos und maximalen Vibe.',
    images: ['/twitter-image']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
