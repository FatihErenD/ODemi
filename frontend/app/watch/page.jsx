'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import '../input.css'

export default function WatchPage() {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);

  // Video listesi
  const videoList = [
    {
      id: '1',
      title: 'JavaScript Temelleri',
      url: '/videos/javascript_intro.mp4',
      description: 'Bu derste JavaScript\'in temel sözdizimi, değişkenler ve veri tipleri örneklerle ele alınır.'
    },
    {
      id: '2',
      title: 'Fonksiyonlar',
      url: '/videos/functions.mp4',
      description: 'Bu derste fonksiyonların tanımı ve kullanımı anlatılır.'
    },
  ];

  useEffect(() => {
    // `router.isReady` ile `query`'nin hazır olup olmadığını kontrol ediyoruz
    if (!router.isReady) return; // router henüz hazır değilse bekle

    const { id } = router.query;
    console.log('Router query id:', id); // Test amaçlı id'yi logla

    if (id) {
      const foundVideo = videoList.find(v => v.id === id);
      if (foundVideo) {
        console.log('Found video:', foundVideo); // Test amaçlı video bilgilerini logla
        setVideo(foundVideo);
      } else {
        console.log('Video bulunamadı!'); // Eğer video bulunmazsa logla
      }
    }
  }, [router.isReady, router.query]); // router.query'yi izliyoruz

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Eğer video verisi henüz gelmediyse (null) 'yükleniyor' mesajı göster
  if (!video) return <div>Video yükleniyor...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '60px' }}>
      {/* Üst Bar */}
      <div className="top-bar">
        <button onClick={() => router.push('/')}>
          <span className="top-bar-text">ODemi</span>
        </button>
      </div>

      {/* İçerik Alanı */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sol taraf - Video */}
        <div style={{ flex: 3, padding: '40px', paddingTop: '20px' }}>
          <h1 style={{ color: 'var(--textColor)', fontSize: '24px', marginBottom: '10px' }}>
            {video.title}
          </h1>

          <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
            <video
              ref={videoRef}
              controls
              style={{
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#000',
                maxHeight: '500px'
              }}
            >
              <source src={video.url} type="video/mp4" />
              Tarayıcınız video etiketini desteklemiyor.
            </video>
            <button
              onClick={handleFullscreen}
              className="logButton"
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: 'auto',
                padding: '6px 12px',
                fontSize: '12px'
              }}
            >
              Tam Ekran
            </button>
          </div>

          <div style={{ marginTop: '30px', color: 'var(--textColor)' }}>
            <h3>Ders Açıklaması</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{video.description}</p>
          </div>

          <div style={{ marginTop: '40px', color: 'var(--textColor)' }}>
            <h3>Yorumlar</h3>
            <div style={{
              backgroundColor: 'var(--colorForTextBack)',
              borderRadius: '10px',
              padding: '15px',
              marginTop: '10px'
            }}>
              <p><b>Ali:</b> Harika anlatım!</p>
              <p><b>Esra:</b> Devamı ne zaman gelecek?</p>
            </div>
          </div>
        </div>

        {/* Sağ taraf - Diğer videolar */}
        <div
          style={{
            flex: 1,
            padding: '30px 20px',
            backgroundColor: 'var(--colorForBar)',
            borderLeft: '2px solid var(--colorForTextBack)',
            maxHeight: '100vh',
            overflowY: 'auto'
          }}
        >
          <h3 style={{ color: 'var(--textColor)', marginBottom: '15px' }}>Diğer Dersler</h3>
          {videoList.filter(v => v.id !== video.id).map((v, i) => (
            <div
              key={v.id}
              className="logButton"
              onClick={() => router.push(`/watch?id=${v.id}`)}
              style={{
                marginBottom: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '13px'
              }}
            >
              {v.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
