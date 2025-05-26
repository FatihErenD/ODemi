'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './profile.css'
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import RecVideos from '../components/RecVideos'

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
            <div className="github-container">
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
                    <RecVideos key={user.username} videos={user.courses} />


                </div>
            </div>
        </div>
        
    )
}
/*
<div className="centerDIV" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h1 style={{ color: '#f1deef', marginBottom: 20 }}>Profilim</h1>

            <div style={{ marginBottom: 30 }}>
                <p><strong>Kullanıcı Adı:</strong> {username}</p>
                <p><strong>Şifre:</strong> {'********'}</p>
            </div>

            <hr style={{ margin: '20px 0' }} />

            <h2 style={{ color: '#f1deef', marginBottom: 10 }}>Şifre Değiştir</h2>
            <form onSubmit={handleChangePassword}>

                <input
                    type="password"
                    placeholder="Şifreniz"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="logTextbox"
                />
                <br/>
                <input
                    type="password"
                    placeholder="Yeni Şifre"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="logTextbox"
                />
                <br />
                <input
                    type="password"
                    placeholder="Yeni Şifre (Tekrar)"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="logTextbox"
                />
                <br />

                {message && (
                    <div style={{
                        color: message.includes('başarı') ? 'lightgreen' : 'salmon',
                        margin: '10px 0'
                    }}>
                    {message}
                </div>
                )}

                <button type="submit" className="logButton">
                    Şifreyi Güncelle
                </button>
            </form>

            <button
                onClick={handleLogout}
                className="logButton"
                style={{ marginTop: 30, background: '#e74c3c' }}
            >
                Çıkış Yap
            </button>
        </div>
        */
