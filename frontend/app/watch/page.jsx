'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import WatchContainer from '../components/WatchContainer';


export default function WatchPage() {
    const [topBarVisible, setTopBarVisible] = useState(true);
    const [lessons, setLessons] = useState([]);
    const [video, setVideo] = useState([]);

    const searchParams = useSearchParams();

    const courseId = Number(searchParams.get('course_id'));
    const lessonId = Number(searchParams.get('lesson_id'));


  useEffect(() => {
    const getLessons = async() => {
      try {
            const res = await fetch(`http://localhost:8080/api/lesson?course_id=${courseId}`, {
                  method: 'GET',
                  credentials: 'include',
                });

            if (!res.ok) {
              throw new Error('Yetkisiz veya sunucu hatası');
            }

            const response = await res.json(); 

            setLessons(response);
            
            const found = response.find(l => l.ep === lessonId); // ✅ Doğrudan güncel veriyi kullan
            if (found) {
              setVideo({
                ep: found.ep,
                title: found.title,
                url: found.video,
                content: found.content
              });
            }


        } catch (error) {
            console.log('saassa');
        }
    }

    getLessons()
  }, []);


  if (!video) return <div>Video yükleniyor...</div>;

  return (
    <div >
      <TopBar onVisibilityChange={setTopBarVisible} />
      <SideBar topOffset={topBarVisible} shouldOpen={false} />
      <WatchContainer key={`${courseId}-${lessonId}`} video={video} lessons={lessons} />
        
    </div>
  );
}