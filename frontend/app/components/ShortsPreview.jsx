'use client';

import { useRouter } from 'next/navigation';

export default function ShortsPreview({ shorts }) {
  const router = useRouter();

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'white', marginBottom: '10px' }}>Brainrot Dersler</h2>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '10px'
      }}>
        {shorts.map((video) => (
          <div
            key={video.id}
            onClick={() => router.push(`/shorts?id=${video.id}`)} // 👈 dikkat!
            style={{
              minWidth: '120px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{
                width: '120px',
                height: '210px',
                borderRadius: '8px',
                objectFit: 'cover',
                marginBottom: '5px'
              }}
            />
            <p style={{ color: 'white', fontSize: '14px' }}>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
