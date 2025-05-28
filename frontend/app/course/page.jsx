'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import '../components/style/CoursePage.css';

export default function CoursePage() {
    const [topBarVisible, setTopBarVisible] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const searchParams = useSearchParams()
    const courseId = Number(searchParams.get('course_id'));

    useEffect(() => {

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


    return (
        <div className="page-wrapper">
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />

            <div className="course-layout">
                <div className="left-content">
                    <img className="course-main-image" src={thumbnail} alt="Kurs Resmi" />
                    <h1 className="course-title"> {title} </h1>
                    <p className="course-description">{description}</p>

                    <div className="course-lessons">
                        <div className="lesson">ders 1 java</div>
                        <div className="lesson">ders 2 python</div>
                        <div className="lesson">ders 3 c</div>
                        <div className="lesson">ders 4 c#</div>
                    </div>

                    <div className="comments-section">
                        <h2>Yorumlar</h2>
                        <div className="comment">Kullanıcı1: Harika bir kurs!</div>
                        <div className="comment">Kullanıcı2: Çok bilgilendiriciydi.</div>
                    </div>
                </div>

                <div className="right-sidebar">
                    <img className="instructor-photo" src="/images/instructor.jpg" alt="Kurs veren kişinin resmi" />
                    <p className="instructor-name"> {instructorName} </p>
                    <button className="enroll-button" onClick={handleEnroll}>KAYIT OL</button>
                </div>
            </div>
        </div>
    );
}
