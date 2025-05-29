'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import './profile.css'
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import RecVideos from '../components/RecVideos'
import ShortsPreview from '../components/ShortsPreview'

export default function ProfilePage() {
    const fileInputRef = useRef(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const usernameParam = searchParams.get('username')

    const [avatar, setAvatar] = useState('/profilepics/profilepic1.png')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [topBarVisible, setTopBarVisible] = useState(true)
    const [user, setUser] = useState(null)
    const [shorts, setShorts] = useState([])

    useEffect(() => {
        if (!usernameParam) return;

        fetch(`http://localhost:8080/api/users/profile?username=${usernameParam}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setAvatar(data.avatarUrl || '/profilepics/profilepic1.png') // DÜZENLENDİ
                setShorts(data.shorts || [])
            })
            .catch(err => {
                console.error('Kullanıcı verisi alınamadı:', err)
                setUser(null)
            })
    }, [usernameParam])

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

    if (!user) {
        return <p style={{ color: 'white', padding: '20px' }}>Kullanıcı yükleniyor...</p>
    }

    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />
            <div className="profile-container">
                <div className="profile left-panel">
                    <div className='avatar-edit-div' >
                        <img
                          className="avatar"
                          src={avatar}
                          alt="avatar"
                          draggable={false}
                        />

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
                    <button className="edit-btn" onClick={() => router.push('/edit-profile')}>Edit profile</button>
                    {false ? (<button className="edit-btn">Takip Et</button>) : (<button className="edit-btn">Takipten Çık</button>)}
                    <p className="follow-info">{user.followers || 0} Takipçi</p>
                </div>

                <div >
                    <div className="courses-header">
                        <h3>Kurslar</h3>
                    </div>
                    <ShortsPreview shorts={shorts} isOwner={true} />
                    <RecVideos key={user.username} videos={user.courses || []} isOwner={true} /> {/* DÜZENLENDİ */}
                </div>
            </div>
        </div>
    )
}
