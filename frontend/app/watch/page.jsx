'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import WatchContainer from '../components/WatchContainer';


export default function WatchPage() {
    const [topBarVisible, setTopBarVisible] = useState(true);
    const [lessons, setLessons] = useState([]);
    const [video, setVideo] = useState([]);
    const [comments, setComments] = useState([]);

    const searchParams = useSearchParams();

    const courseId = Number(searchParams.get('course_id'));
    const lessonId = Number(searchParams.get('lesson_id'));


  const fetchComments = async () => {
    try {
          const resComments = await fetch(`http://localhost:8080/api/comment/comments?course_id=${courseId}&lesson_id=${lessonId}`, {
            method: 'GET'
          });

          if (!resComments.ok) {
            throw new Error('Yetkisiz veya sunucu hatası (comments)');
          }

          const commentsData = await resComments.json();
          setComments(commentsData);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  }

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const resLessons = await fetch(`http://localhost:8080/api/lesson?course_id=${courseId}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!resLessons.ok) {
          throw new Error('Yetkisiz veya sunucu hatası (lessons)');
        }

        const lessonsData = await resLessons.json();
        setLessons(lessonsData);

        const found = lessonsData.find(l => l.ep === lessonId);
        if (found) {
          setVideo({
            ep: found.ep,
            title: found.title,
            url: found.video,
            content: found.content
          });
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
  };

  fetchLessons();
  fetchComments();
}, []);


const handleComment = async (text) => {
      const payload = {
        content: text.trim(),
        courseId: courseId,
        lessonId: lessonId
      };

      try {
        const res = await fetch("http://localhost:8080/api/comment/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error("Yorum gönderilemedi.");
        }

        fetchComments()

      } catch (error) {
        console.error("Yorum gönderme hatası:", error);
      }
  };

  if (!video) return <div>Video yükleniyor...</div>;

  return (
    <div >
      <TopBar onVisibilityChange={setTopBarVisible} />
      <SideBar topOffset={topBarVisible} shouldOpen={false} />
      <WatchContainer key={`${courseId}-${lessonId}`} video={video} lessons={lessons} comments={comments} handleComment={handleComment} />
        
    </div>
  );
}