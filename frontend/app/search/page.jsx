'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import RecVideos from '../components/RecVideos';


export default function Search() {
    const searchParams = useSearchParams();
    const searchText = searchParams.get("text");

    const [topBarVisible, setTopBarVisible] = useState(true);

    const videos = [
        { id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
        { id: 2, title: 'Next.js Başlangıç', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' }
    ]

    return (
        <div >
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />
            <div style={{top: '60px', height: '100%'}} >
                <h1 style={{color: 'white', margin: '100px 0 0 150px', fontSize: '25px', fontWeight: 'bold'}} > {searchText} için arama sonuçları: </h1>
                <RecVideos videos={videos} />
            </div>
        </div>
    )
}