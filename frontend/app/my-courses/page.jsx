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
    if (true) { // test için
      const courses = [
        { course_id: 1, lesson_id: 1, category_id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
        { course_id: 2, lesson_id: 1, category_id: 2, title: 'Next.js Başlangıç', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' }
      ];
      setMyCourses(courses);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/course/my-courses', {
      headers: {
        Authorization: Bearer ${token}
      }
    })
    .then(res => setCourses(res.data))
    .catch(err => setError(err.response?.statusText || err.message))
    .finally(() => setLoading(false));
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