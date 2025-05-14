'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import '../input.css'
import '../globals.css'

export default function WatchPage() {
  const router = useRouter()
  const videoRef = useRef(null)

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

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

        {/* Sol taraf - Video ve içerik */}
        <div style={{ flex: 3, padding: '40px', paddingTop: '20px' }}>
          <h1 style={{ color: 'var(--textColor)', fontSize: '24px', marginBottom: '10px' }}>
            JavaScript Temelleri
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
              <source src="/videos/javascript_intro.mp4" type="video/mp4" />
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
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Bu derste JavaScript'in temel sözdizimi, değişkenler ve veri tipleri örneklerle ele alınır.
              Kodlarla birlikte mantıksal yapı anlatılır.
            </p>
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

        {/* Sağ taraf - Önerilen Dersler */}
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
          {['Değişkenler', 'Fonksiyonlar', 'Koşullar', 'Döngüler', 'Array Metodları'].map((title, i) => (
            <div
              key={i}
              className="logButton"
              onClick={() => console.log(`${title} tıklandı`)}
              style={{
                marginBottom: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '13px'
              }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
