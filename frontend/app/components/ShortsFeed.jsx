'use client';

import { useEffect, useRef } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

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
        background: 'var(--background)',
      }}
    >
      <TopBar />
      <SideBar topOffset={true} shouldOpen={false} />
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
          <div style={{
                height: '85%',
                aspectRatio: '9 / 16',
                borderRadius: '12px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
              }} >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.videoUrl}
              muted
              controls
              playsInline
              style={{
                height: '100%',
                aspectRatio: '9 / 16',
                objectFit: 'contain',
                borderRadius: '12px',
                backgroundColor: '#000',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
              }}
            />
            <div>
              <h3 style={{margin: '10px 0 0 10px', fontSize: '18px'}} >
                @kanaladi <button style={{ marginLeft: '10px' }}>Takip Et</button>
              </h3>
              <p style={{margin: '5px 0 0 10px'}} >{video.title}</p>
            </div>
            
          </div>

          {/* Sağda ikonlar */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              margin: '0 auto 0 27%',
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
        </div>
      ))}
    </div>
  );
}
