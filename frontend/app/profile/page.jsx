'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '../input.css'
import TopBar from '../components/TopBar'
import Container from '../components/Container'
import ProfileInfo from '../components/ProfileInfo'
import SideBar from '../components/SideBar'

export default function ProfilePage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState('')
    const [topBarVisible, setTopBarVisible] = useState(true);



    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <div>
            <TopBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />
            <ProfileInfo username={username} ></ProfileInfo>
            <Container />
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
