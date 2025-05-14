'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import '../input.css'

export default function Home() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const videos = [
        { id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
        { id: 2, title: 'Next.js Başlangıç', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
        { id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
      ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token);  // Token varsa true, yoksa false
      }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <div>
        <div className="top-bar">
            <button onClick={e => console.log('bastı :)')}
                  style={{ cursor: 'pointer' }}>
                <span className="top-bar-text">ODemi</span>
            </button>
            <div style={{ marginLeft: "auto", marginRight: "50px", display: "flex", gap: "10px" }}>
                {!isAuthenticated ?  (
                <>
                    <button className="signIn-OutButton" onClick={() => router.push('./login')}   style={{ cursor: 'pointer' }}>Giriş Yap</button>
                    <button className="signIn-OutButton" onClick={() => router.push('./register')}   style={{ cursor: 'pointer' }}>Kayıt Ol</button>
                </>
                ) : (
                    <>
                    <button onClick={() => router.push('/profile')}   style={{ cursor: 'pointer' }}>Profil</button>
                    <button onClick={handleLogout}   style={{ cursor: 'pointer' }}>Çıkış Yap</button>
                    </>
                )
                }
            </div>  
        </div>
        <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '30px',
        marginTop: "70px"
      }}>
        {videos.map(video => (
          <div
            key={video.id}
            onClick={() => router.push(`/watch?id=${video.id}`)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>
              {video.title}
            </div>
          </div>
        ))}
      </div>
          </div>
    )
}
