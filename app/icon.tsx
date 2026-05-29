import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#07070c',
          color: '#f7f1e8',
          position: 'relative',
          fontSize: 42,
          fontWeight: 900
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 6,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #ffb703, #ff4d8d 55%, #67e8f9)',
            opacity: 0.14
          }}
        />
        M
      </div>
    ),
    size
  );
}
