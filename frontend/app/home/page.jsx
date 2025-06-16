'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import TopBar from '../components/TopBar';
import SlideComp from '../components/SlideComp';
import SideBar from '../components/SideBar';
import RecVideos from '../components/RecVideos';
import ShortsPreview from '../components/ShortsPreview';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [courses, setCourses] = useState([]);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [shorts, setShorts] = useState([]);
  const [recCourses, setRecCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCourses = await fetch('http://localhost:8080/api/course/all-courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!resCourses.ok) throw new Error(`Kurs verisi alınamadı: ${resCourses.status}`);

        const coursesData = await resCourses.json();
        setCourses(coursesData);

      } catch (error) {
        console.error('Kurs verisi hatası:', error);
      }

      try {
        const resShorts = await fetch('http://localhost:8080/api/shorts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!resShorts.ok) throw new Error(`Shorts verisi alınamadı: ${resShorts.status}`);

        const shortsData = await resShorts.json();
        setShorts(shortsData);

      } catch (error) {
        console.error('Shorts verisi hatası:', error);
      }

      try {
        const res = await fetch('http://localhost:8080/api/course/rec-courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (!res.ok) 
          throw new Error(`Kurs verisi alınamadı: ${res.status}`)

        const recVideos = await res.json()
        setRecCourses(recVideos)

      } catch(error) {
        console.log(`Kurs verisi alınamadı: ${res.status}`)
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <TopBar onVisibilityChange={setTopBarVisible} />
      <SideBar topOffset={topBarVisible} shouldOpen={true} />
      <SlideComp courses={recCourses} />

      <ShortsPreview shorts={shorts} />

      <RecVideos videos={courses} />
    </div>
  );
}
