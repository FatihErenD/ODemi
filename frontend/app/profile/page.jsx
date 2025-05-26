'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './profile.css'
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import RecVideos from '../components/RecVideos'
import ShortsPreview from '../components/ShortsPreview'

export default function ProfilePage() {
    const [username, setUsername] = useState('')
    const fileInputRef = useRef(null)
    const [avatar, setAvatar] = useState('/profilepics/profilepic1.png')
    const [isAuthenticated, setIsAuthenticated] = useState('')
    const [topBarVisible, setTopBarVisible] = useState(true)

    const router = useRouter()

    const user = {
        avatar_url: avatar,
        name: 'Fatih',
        username: 'FatihErenD',
        followers: 3,
        following: 3,
        courses: [
            { course_id: 1, lesson_id: 1, category_id: 1, title: 'React Dersi 1', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
            { course_id: 2, lesson_id: 1, category_id: 2, title: 'Next.js Başlangıç', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' },
            { course_id: 3, lesson_id: 1, category_id: 1, title: 'React Dersi 2', thumbnail: '/thumbs/react1.png', videoUrl: '/videos/react1.mp4' }
        ],
    };

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
        }
    ]

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
        setAvatar(event.target.result);
        };
        reader.readAsDataURL(file);
    };


    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />
            <div className="profile-container">
                <div className="profile left-panel">
                    <div className='avatar-edit-div' >
                        <img className="avatar" src={user.avatar_url} alt="avatar" draggable={false} />
                        <img className="avatar-edit" src={'/icons/edit-icon.png'} draggable={false} onClick={handleEditClick} />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>

                    <h2>{user.username}</h2>
                    {/* Aynı kullanıcı ise */ <button className="edit-btn" onClick={() => router.push('/edit-profile')} >Edit profile</button>}
                    {/* Aynı kullanıcı değilse */ false ? (<button className="edit-btn">Takip Et</button>) : (<button className="edit-btn">Takipten Çık</button>)}
                    <p className="follow-info">{user.followers} Takipçi</p>
                </div>

                <div >
                    <div className="courses-header">
                        <h3>Kurslar</h3>
                    </div>
                    <ShortsPreview shorts={shorts} isOwner={true} />
                    <RecVideos key={user.username} videos={user.courses} isOwner={true} />

                </div>
            </div>
        </div>
        
    )
}
