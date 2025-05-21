'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import '../input.css';

import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SlideComp from '../components/SlideComp'; // İstersen bu kaldırılabilir
import RecVideos from '../components/RecVideos';

export default function MyCoursesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token);

    // Geçici sahte veri (ileride API bağlanacak)
    const courses = [
      { id: 1, title: 'Benim React Kursum', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
      { id: 2, title: 'Benim Next.js Kursum', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    ];

    setMyCourses(courses);
  }, []);

  return (
    <div>
      <TopBar onVisibilityChange={setTopBarVisible} />

      <SideBar topOffset={topBarVisible} shouldOpen={true} />

      <h1 style={{ padding: '20px' }}>Kurslarım</h1>

      <RecVideos videos={myCourses} />
    </div>
  );
}
