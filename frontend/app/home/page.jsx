'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../input.css';

import TopBar from '../components/TopBar';
import SlideComp from '../components/SlideComp';
import SideBar from '../components/SideBar';
import RecVideos from '../components/RecVideos';
import ShortsPreview from '../components/ShortsPreview';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);

  const videos = [
    { id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 2, title: 'Next.js Başlangıç', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 4, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 5, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 6, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 7, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 8, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 9, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { id: 10, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
  ];

  const shorts = [
    {
      id: 101,
      title: 'brainrot ders 1',
      thumbnail: '/thumbs/thumbnail1.png',
      videoUrl: '/videos/react1.mp4',
    },
    {
      id: 102,
      title: 'brainrot ders 2',
      thumbnail: '/thumbs/thumbnail2.png',
      videoUrl: '/videos/react1.mp4',
    },
    {
      id: 103,
      title: 'brainrot3 ders 3',
      thumbnail: '/thumbs/thumbnail3.png',
      videoUrl: '/videos/react1.mp4',
    },
  ];


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token);
  }, []);

  return (
    <div>
      <TopBar onVisibilityChange={setTopBarVisible} />
      <SideBar topOffset={topBarVisible} shouldOpen={true} />
      <SlideComp />

      <ShortsPreview shorts={shorts} />

      <RecVideos videos={videos} />
    </div>
  );
}
