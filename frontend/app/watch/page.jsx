'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import WatchContainer from '../components/WatchContainer';


export default function WatchPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [topBarVisible, setTopBarVisible] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams()
    const videoRef = useRef(null);

    const courseId = Number(searchParams.get('course_id'));
    const lessonId = Number(searchParams.get('lesson_id'));

    const videoList = [
        {
        course_id: 1,
        lesson_id: 1,
        title: 'JavaScript Temelleri',
        url: '/videos/react1.mp4',
        description: 'Bu derste JavaScript\'in temel sözdizimi, değişkenler ve veri tipleri örneklerle ele alınır.'
        },
        {
        course_id: 1,
        lesson_id: 2,
        title: 'JavaScript Garip Dil',
        url: '/videos/react1.mp4',
        description: '🥷🏿👍'
        },
        {
        course_id: 1,
        lesson_id: 3,
        title: 'JavaScript Garip Dil 2',
        url: '/videos/react1.mp4',
        description: '🥷🏿👍'
        },
        {
        course_id: 2,
        lesson_id: 1,
        title: 'Fonksiyonlar',
        url: '/videos/react1.mp4',
        description: 'Bu derste fonksiyonların tanımı ve kullanımı anlatılır.'
        }
    ];

  const video = videoList.find(v => (v.course_id === courseId && v.lesson_id === lessonId));

  useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token);
    }, []);


  if (!video) return <div>Video yükleniyor...</div>;

  return (
    <div >
      <TopBar onVisibilityChange={setTopBarVisible} />
      <SideBar topOffset={topBarVisible} shouldOpen={false} />
      <WatchContainer key={`${courseId}-${lessonId}`} video={video} />
        
    </div>
  );
}