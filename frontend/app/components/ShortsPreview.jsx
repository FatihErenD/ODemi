'use client';

import { useRouter } from 'next/navigation';
import "./style/shortpreview.css"

export default function ShortsPreview({ shorts }) {
  const router = useRouter();

  return (
    <div style={{ padding: '20px', margin: '10px 200px 10px 200px' }}>
      <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Brainrot Dersler</h2>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '30px'
      }}>
        {shorts.map((video, index) => (
          <div
            key={index}
            onClick={() => router.push(`/shorts?id=${video.id}`)} // 👈 dikkat!
            style={{
              minWidth: '120px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className='short-img'
            />
            <p className='short-title' >{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
