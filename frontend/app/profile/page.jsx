'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '../input.css'

export default function ProfilePage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Kullanıcı adını localStorage veya context’ten alıyoruz
  useEffect(() => {
    const storedUser = localStorage.getItem('username') || 'demoUser'
    setUsername(storedUser)
  }, [])

  const handleChangePassword = async e => {
    e.preventDefault()
    setMessage('')

    if (!newPassword || !confirmPassword) {
      setMessage('Lütfen tüm alanları doldurun.')
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage('Yeni şifre ile onay uyuşmuyor.')
      return
    }

    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:8080/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({currentPassword, newPassword})
      })

      if (!res.ok) {
        // 401 vs. 400 vs. 500 ayrımı yapmak isterseniz res.status’a bakabilirsiniz
        throw new Error('Mevcut şifreniz ile aynı şifreyi giremezsiniz')
      }

    } catch (err) {
      console.error(err)
      setError(err.message || 'Sunucu hatası.')
    }

    // TODO: Burada gerçek API çağrını yap
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {...})

    setMessage('Şifreniz başarıyla değiştirildi.')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
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
  )
}
