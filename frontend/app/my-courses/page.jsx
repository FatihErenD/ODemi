'use client';

import { useEffect, useState } from 'react';
import '../input.css';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import RecVideos from '../components/RecVideos';

export default function MyCoursesPage() {
  // 1) State’ler
  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [isAuth, setIsAuth]     = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Önce giriş yapmalısınız.');
      setLoading(false);
      return;
    }
    setIsAuth(true);

    fetch('http://localhost:8080/api/course/my-courses', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
        return res.json();
      })
      .then(data => setCourses(data))
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Yükleniyor...</p>;
  }
  if (error) {
    return <p style={{ color: 'salmon', padding: 20 }}>{error}</p>;
  }
  if (!isAuth) {
    return <p style={{ padding: 20 }}>Giriş yapılmamış.</p>;
  }

  return (
    <div>
      <TopBar />
      <SideBar shouldOpen={true} />

      <h1 style={{ padding: '20px 20px 0' }}>Kurslarım</h1>
      {courses.length === 0
        ? <p style={{ padding: 20 }}>Henüz kurs kaydınız yok.</p>
        : <RecVideos videos={courses} />
      }
    </div>
  );
}
