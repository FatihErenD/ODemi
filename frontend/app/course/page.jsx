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
    const [comments, setComments] = useState([
        {
            name: 'Ali',
            text: 'Harika anlatım!',
            date: '15/05/2025'
        },
        {
            name:'Yusuf Frontendoğulları',
            text: '🥷🏿',
            date: '18/05/2025'
        },
        {
            name:'Beton Buğra',
            text: 'Staj ver!',
            date: '19/05/2025'
        },
        {
            name:'Erol DB',
            text: '👍👍',
            date: '20/05/2025'
        }
    ])
    const [lessons, setLessons] = useState([
        {
            lesson_id: 1,
            title: 'Java'
        },
        {
            lesson_id: 2,
            title: 'Python'
        }
    ])
    const [categories, setCategories] = useState([
        {   
            category_id:1,
            name: 'Araba'
        },
        {
            category_id: 2,
            name: 'Ezme'
        },
        {
            category_id: 3,
            name: 'Çarpma'
        }
    ])

    const other_courses = [
    { course_id: 1, lesson_id: 1, category_id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 1, lesson_id: 2, category_id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 1, lesson_id: 3, category_id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 2, lesson_id: 1, category_id: 2, title: 'Next.js Başlangıç', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 3, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 4, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 5, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 6, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 7, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 8, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 9, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
    { course_id: 10, lesson_id: 1, category_id: 3, title: 'JWT Mantığı', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
  ];

    const searchParams = useSearchParams()
    const courseId = Number(searchParams.get('course_id'));

    useEffect(() => {
        const user = localStorage.getItem('username')
        setUsername(user);
        /* SİL BURAYI */
        setThumbnail("/thumbs/jumpscare.jpg")
        setTitle("Kınık")
        setDescription("Naber MÜDÜR!!!")
        setInstructorName("Zehra")

        if(!courseId) return;
        
        fetch(`http://localhost:8080/api/course/${courseId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        .then(res => {
            if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
                return res.json();
        })
        .then(data => {
            setTitle(data.title)
            setDescription(data.description)
            setInstructorName(data.instructorName)
            setThumbnail(data.thumbnail)
            // burada enrolled kısmınıda döndür
        }
        )
    }, [courseId]);


    const handleEnroll = async () => {
        const username = localStorage.getItem('username')
        try {
            const res = await fetch(`http://localhost:8080/api/enroll?username=${username}&course_id=${courseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const text = await res.text(); 

        } catch (error) {
            console.log('saassa');
        }
        
    };

    const handleComment = () => {
        const text = inputRef.current.value;
        if (text.trim() !== "") {
            const newComment = {
            name: 'user', /* Username yazdıracak */
            text: text.trim(),
            date: '26-05-2025'
            };
            inputRef.current.value = ""
            setComments([newComment, ...comments])
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
                            <div key={index} className="course-lesson" onClick={() => router.push(`/watch?course_id=${courseId}&lesson_id=${lesson.lesson_id}`)} > 
                                <span> <strong> Bölüm {lesson.lesson_id}: </strong> {lesson.title} </span> 
                            </div>
                        ))}
                    </div>

                    <div className="course-lessons" >
                        <h1 style={{margin: '10px auto 10px 20px', width: '40px', fontWeight: 'bold', fontSize: '20px'}} > Yorumlar: </h1>
                        <hr></hr>
                        {username === instructorName ? (null) : (
                            <div className="comm" >
                                <div style={{height: '5vh'}}>
                                    <input ref={inputRef} type="text" placeholder="Yorum" onFocus={e => setIsCommenting(true)} 
                                    onBlur={() => setTimeout(() => setIsCommenting(false), 200)} style={{width: '65vw'}} />
                                </div>
                                
                                <button className={`comm-button ${isCommenting ? 'show' : 'hide'}`} onClick={handleComment} >
                                    Yorum Yap
                                </button>
                            </div>
                        )}
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
                        <RecVideos videos={other_courses} showCategories={false} />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
