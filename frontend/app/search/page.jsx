'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import RecVideos from '../components/RecVideos';


export default function Search() {
    const searchParams = useSearchParams();
    const searchText = searchParams.get("text");

    const [topBarVisible, setTopBarVisible] = useState(true);
    const [videos, setVideos] = useState([])

    useEffect(() => {
        if (!searchText) {
            setVideos([]);
            return;
        }

        const fetchSearchedCourses = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/course/search?search=${searchText}`,{ 
                    method: 'GET' 
                }
            );

            if (!res.ok) {
            console.log("Status kodu:", res.status);
            throw new Error("Yükleme başarısız");
            }

            const result = await res.json();

            setVideos(result);
        } catch (err) {
            console.error("Yükleme hatası:", err);
        }
    };

    fetchSearchedCourses();
  }, [searchText]);

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