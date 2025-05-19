'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import TopBar from '../components/TopBar';
import '../input.css'
import SideBar from '../components/SideBar';
import WatchContainer from '../components/WatchContainer';


export default function WatchPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [topBarVisible, setTopBarVisible] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams()
    const videoRef = useRef(null);

    const videoList = [
        {
        id: '1',
        title: 'JavaScript Temelleri',
        url: '/videos/react1.mp4',
        description: 'Bu derste JavaScript\'in temel sözdizimi, değişkenler ve veri tipleri örneklerle ele alınır.'
        },
        {
        id: '2',
        title: 'Fonksiyonlar',
        url: '/videos/react1.mp4',
        description: 'Bu derste fonksiyonların tanımı ve kullanımı anlatılır.'
        },
    ];

  const video = videoList.find(v => v.id === searchParams.get("id"));

  useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token);
    }, []);


  if (!video) return <div>Video yükleniyor...</div>;

  return (
    <div >
      <TopBar onVisibilityChange={setTopBarVisible} />
      <SideBar topOffset={topBarVisible} shouldOpen={false} />
      <WatchContainer />
        
    </div>
  );
}