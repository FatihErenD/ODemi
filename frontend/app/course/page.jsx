'use client'

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'

import '../components/style/CoursePage.css';
import '../components/style/watchcontainer.css';

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import ProgressBar from '../components/ProgressBar';
import Comment from "../components/Comment"
import TrackImage from '../components/TrackImage';
import RecVideos from '../components/RecVideos';

export default function CoursePage() {
    const router = useRouter();

    const inputRef = useRef();

    const [topBarVisible, setTopBarVisible] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [username, setUsername] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);
    const [comments, setComments] = useState([])
    const [lessons, setLessons] = useState([])
    const [categories, setCategories] = useState([])
    const [otherCourses, setOtherCourses] = useState([])


    const searchParams = useSearchParams()
    const courseId = Number(searchParams.get('course_id'));

    const fetchComments = async () => {
        try {
            const resComments = await fetch(`http://localhost:8080/api/comment/comments?course_id=${courseId}`, {
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
        const user = localStorage.getItem('username');
        setUsername(user);

        if (!courseId) return;

        const fetchCourseData = async () => {
            try {
                const [courseRes, categoryRes, lessonRes] = await Promise.all([
                    fetch(`http://localhost:8080/api/course/${courseId}`),
                    fetch(`http://localhost:8080/api/course/categories?course_id=${courseId}`),
                    fetch(`http://localhost:8080/api/lesson?course_id=${courseId}`)
                ]);

                if (!courseRes.ok) throw new Error(`Kurs verisi alınamadı: ${courseRes.status}`);
                if (!categoryRes.ok) throw new Error(`Kategori verisi alınamadı: ${categoryRes.status}`);
                if (!lessonRes.ok) throw new Error(`Kategori verisi alınamadı: ${lessonRes.status}`)

                const courseData = await courseRes.json();
                const categoryData = await categoryRes.json();
                const lessonData = await lessonRes.json();

                // Backend'den gelen veri üzerinden state'leri set et
                setTitle(courseData.title || "Başlık yok");
                setDescription(courseData.description || "Açıklama yok");
                setInstructorName(courseData.instructorName || "Eğitmen yok");
                setThumbnail(courseData.thumbnail || "/thumbs/default.jpg");
                setCategories(categoryData || []);
                setLessons(lessonData);

                // Eğer kurs verisinde "enrolled" gibi bir alan varsa:
                // setEnrolled(courseData.enrolled);

                const otherRes = await fetch(`http://localhost:8080/api/course/courses?username=${instructorName}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                });

                if (!otherRes.ok) throw new Error(`Diğer kurs verisi alınamadı: ${otherRes.status}`)

                const otherData = await otherRes.json()

                setOtherCourses(otherData)

            } catch (err) {
                console.error("Veriler alınırken hata oluştu:", err);
            }
        };

        fetchCourseData();
        fetchComments();
    }, [courseId]);

    const handleEnroll = async () => {
        const username = localStorage.getItem('username')
        try {
            const res = await fetch(`http://localhost:8080/api/enroll?username=${username}&course_id=${courseId}`, {
                method: 'POST',
                credentials: 'include',
                });

            if (!res.ok) {
            throw new Error('Yetkisiz veya sunucu hatası');
            }

                const text = await res.text(); 

        } catch (error) {
            console.log('saassa');
        }
        
    };

    const handleComment = async() => {
        const text = inputRef.current.value;
        if (text.trim() !== "") {
            const payload = {
            content: text.trim(),
            courseId: courseId
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
                inputRef.current.value = ""
                setIsCommenting(false);
        }
    }


    return (
        <div className="page-wrapper">
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />

            <div className="course-layout">
                <div className="left-content">
                    <div className='course-image-div' >
                            <TrackImage classname={"course-main-image"} url={thumbnail} />

                        <div className='course-info-div' >
                            <h1 className="course-title"> {title} </h1>
                            <div style={{margin: '0 auto 0 auto'}} >
                                <span style={{color: 'color-mix(in srgb, var(--background) 50%, #fff)'}} > 15 bölüm </span>
                            </div>
                            <div style={{margin: '0 auto 10px auto', fontWeight: 'bold'}} >
                                <h3>Kategoriler:</h3>
                            </div>
                            <div style={{display: 'flex', maxHeight: '136px', flexWrap: 'wrap', overflow: 'auto', maxWidth: '20vw', zIndex: '1001', gap: '10px', marginBottom: '40px'}} >
                                {categories.map((cat, index) => (
                                    <div key={index} className='course-category-div' >
                                        <span>{cat.name}</span>
                                    </div>
                                ))}
                            </div>

                            {isEnrolled ? (
                                <div className='progressbar-div' >
                                    <h2 style={{fontWeight: 'bold'}} > İlerlemeniz: </h2>
                                    <ProgressBar completed={30} />
                                </div>

                            ) : <button className="enroll-button" onClick={handleEnroll}>Kayıt Ol</button> }

                        </div>
                    </div>

                    <h2 style={{margin: '30px auto 20px 20px', fontSize: '25px', fontWeight: 'bold'}} > Açıklama: </h2>
                    <p className="course-description">{description}</p>

                    <div className="course-lessons">
                        <h1 style={{margin: '10px auto 10px 20px', width: '40px', fontWeight: 'bold', fontSize: '20px'}} > Bölümler: </h1>
                        <hr></hr>
                        {lessons.map((lesson, index) => (
                            <div key={index} className="course-lesson" onClick={() => router.push(`/watch?course_id=${courseId}&lesson_id=${lesson.ep}`)} > 
                                <span> <strong> Bölüm {lesson.ep}: </strong> {lesson.title} </span> 
                            </div>
                        ))}
                    </div>

                    <div className="course-lessons" >
                        <h1 style={{margin: '10px auto 10px 20px', width: '40px', fontWeight: 'bold', fontSize: '20px'}} > Yorumlar: </h1>
                        <hr></hr>
                        <div className="comm" >
                            <div style={{height: '5vh'}}>
                                <input ref={inputRef} type="text" placeholder="Yorum" onFocus={e => setIsCommenting(true)} 
                                onBlur={() => setTimeout(() => setIsCommenting(false), 200)} style={{width: '65vw'}} />
                            </div>
                                
                            <button className={`comm-button ${isCommenting ? 'show' : 'hide'}`} onClick={handleComment} >
                                Yorum Yap
                            </button>
                        </div>
                        {comments.map((comment, index) => (
                            <Comment key={index} comment={comment} />
                        ))}
                    </div>
                </div>

                <div className="right-sidebar">
                    <div className='instructor-photo-div' >
                        <img className="instructor-photo" src="/profilepics/profilepic2.png" />
                    </div>

                    <h2 > {instructorName} </h2>
                    <button className="enroll-button" onClick={() => router.push(`/profile?username=${instructorName}`)} >Profili Görüntüle</button>
                    <h2 style={{margin: '50px auto auto auto', fontSize: '18px', fontWeight: 'bold'}} > Diğer Kurslar: </h2>
                    <div style={{marginRight: '5px'}} >
                        <RecVideos videos={otherCourses} showCategories={false} />
                    </div>

                </div>
            </div>
        </div>
    );
}
