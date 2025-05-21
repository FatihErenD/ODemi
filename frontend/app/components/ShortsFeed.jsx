'use client';

import { useEffect, useRef } from 'react';

export default function ShortsFeed({ videos }) {
  const videoRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;
        const rect = video.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isVisible) video.play();
        else video.pause();
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // ilk kontrol

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#000',
      }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          style={{
            height: '100vh',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '10px',
          }}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.videoUrl}
            muted
            controls
            playsInline
            style={{
              height: '100%',
              aspectRatio: '9 / 16',
              objectFit: 'contain', // 👈 videoyu kırpma, küçült
              borderRadius: '12px',
              backgroundColor: '#000',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          />

          {/* Sağda ikonlar */}
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: '30%',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              color: 'white',
              alignItems: 'center',
            }}
          >
            <button>👍</button>
            <span>105K</span>
            <button>👎</button>
            <button>💬</button>
            <button>🔗</button>
          </div>

          {/* Açıklama ve kanal bilgisi */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '20px',
              right: '20px',
              color: 'white',
              fontSize: '14px',
            }}
          >
            <p>
              @kanaladi <button style={{ marginLeft: '10px' }}>Takip Et</button>
            </p>
            <p>{video.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
