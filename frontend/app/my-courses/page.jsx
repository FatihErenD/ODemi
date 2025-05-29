'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import RecVideos from '../components/RecVideos';

export default function MyCoursesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/course/my-courses', {
          method: 'GET',
          credentials: 'include', // 🔐 Cookie gönderilsin
        });

        if (!res.ok) {
          throw new Error('Yetkisiz veya sunucu hatası');
        }

        const data = await res.json();
        setMyCourses(data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Kurslar alınamadı:', err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);


  return (
    <div>
      <TopBar onVisibilityChange={setTopBarVisible} />

      <SideBar topOffset={topBarVisible} shouldOpen={false} />

      <h1 style={{ padding: '20px' }}>Kurslarım</h1>

      <RecVideos videos={myCourses} />
    </div>
  );
}
