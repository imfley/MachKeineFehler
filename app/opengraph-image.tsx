import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          color: '#f7f1e8',
          background:
            'radial-gradient(circle at top left, rgba(255, 77, 141, 0.45), transparent 30%), radial-gradient(circle at top right, rgba(103, 232, 249, 0.28), transparent 28%), linear-gradient(135deg, #050508 0%, #0a0b14 38%, #07070c 100%)'
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '999px',
              background: '#ffb703',
              boxShadow: '0 0 24px rgba(255, 183, 3, 0.45)'
            }}
          />
          <span
            style={{
              fontSize: 28,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(247, 241, 232, 0.75)'
            }}
          >
            Prompt-Alarm / Broken-By-Design
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '860px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 104,
              lineHeight: 0.9,
              fontWeight: 900,
              letterSpacing: '-0.07em'
            }}
          >
            Mach
            <span style={{ color: '#ffb703' }}> keine Fehler</span>
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: 'rgba(247, 241, 232, 0.88)',
              maxWidth: '760px'
            }}
          >
            Eine absichtlich überdrehte Chaos-Page über KI-Fehler, Prompt-Chaos und maximalen Vibe.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Vercel-ready', 'absichtlich chaotisch', 'discord-proof'].map((label) => (
              <span
                key={label}
                style={{
                  padding: '12px 16px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: 24,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                {label}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(247, 241, 232, 0.7)'
            }}
          >
            mach-keine-fehler.vercel.app
          </div>
        </div>
      </div>
    ),
    size
  );
}
