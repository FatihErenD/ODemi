'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import '../input.css'

import TopBar from '../components/TopBar'
import VidThumbnail from '../components/VidThumbnail'
import SlideComp from '../components/SlideComp'
import SideBar from '../components/SideBar'

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState('')
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token);  // Token varsa true, yoksa false
      }, []);


    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />

            <SideBar topOffset={topBarVisible} shouldOpen={true} />

            <SlideComp />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                padding: '30px',
                marginTop: "70px"
            }}>
            {videos.map(video => (
                <VidThumbnail key={video.id} id={video.id} thumbnail={video.thumbnail} title={video.title} />
            ))}
            </div>
        </div>
    )
}
