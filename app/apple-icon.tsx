import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 42,
          background: '#07070c',
          color: '#ffb703',
          position: 'relative',
          fontSize: 104,
          fontWeight: 900
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 16,
            borderRadius: 36,
            border: '6px solid rgba(255, 77, 141, 0.5)'
          }}
        />
        M
      </div>
    ),
    size
  );
}
