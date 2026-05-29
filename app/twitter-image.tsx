import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '56px',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #07070c 0%, #121527 45%, #07070c 100%)',
          color: '#f7f1e8'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            borderRadius: '40px',
            padding: '48px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background:
              'radial-gradient(circle at top left, rgba(255, 183, 3, 0.22), transparent 28%), radial-gradient(circle at bottom right, rgba(255, 77, 141, 0.2), transparent 30%), rgba(255, 255, 255, 0.04)'
          }}
        >
          <div
            style={{
              fontSize: 30,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(247, 241, 232, 0.72)'
            }}
          >
            Mach keine Fehler
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 0.92,
              fontWeight: 900,
              letterSpacing: '-0.08em',
              maxWidth: '900px'
            }}
          >
            KI-Prompt-Chaos mit maximalem Vibe und absichtlichem Chaos.
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: 'rgba(247, 241, 232, 0.86)',
              maxWidth: '820px'
            }}
          >
            Perfekt für Twitter/X-Vorschau mit großem Titel, klarer Beschreibung und Preview-Image.
          </div>
        </div>
      </div>
    ),
    size
  );
}
