'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TopBar({ onVisibilityChange }) {
  const [visible, setVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // boolean olarak ayarlanır
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      if (typeof onVisibilityChange === 'function') {
        onVisibilityChange(visible);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, onVisibilityChange, visible]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  const handleSearch = () => {
    const token = localStorage.getItem('token');
    // Arama işlemi burada yapılabilir (searchRef.current.value)
    const search = searchRef.current.value.trim();
    if (search !== '') {
      searchRef.current.value = ''
      router.push(`/search?text=${search}`)
    }
    
  };

  return (
    <div className={`top-bar ${visible ? 'show' : 'hide'}`}>
      <button onClick={() => router.push('/home')}>
        <span className="top-bar-text">ODemi</span>
      </button>

      <div style={{ flex: 1 }} />
      <div className="search-bar">
        <input type="text" placeholder="Ara" ref={searchRef} />
        <button onClick={handleSearch}>
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/hoetzosy.json"
            trigger="hover"
            colors="primary:#5d1b63"
            style={{ width: '30px', height: '30px' }}
          ></lord-icon>
        </button>
      </div>
      <div style={{ flex: 1 }} />

      <div style={{ marginLeft: 'auto', marginRight: '50px', display: 'flex', gap: '10px' }}>
        {!isAuthenticated ? (
          <>
            <button className="signIn-OutButton" onClick={() => router.push('/login')}>
              Giriş Yap
            </button>
            <button className="signIn-OutButton" onClick={() => router.push('/register')}>
              Kayıt Ol
            </button>
          </>
        ) : (
          <>
            <button className="signIn-OutButton" onClick={() => router.push('/my-courses')}>
              Kurslarım
            </button>
            <button className="signIn-OutButton" onClick={() => router.push('/profile')}>
              Profil
            </button>
            <button className="signIn-OutButton" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </>
        )}
      </div>
    </div>
  );
}
