'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async e => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error('Kimlik doğrulama başarısız.')
      }

      const { username: returnedUsername } = await res.json()

      localStorage.setItem('username', username)
      router.push('/')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Sunucu hatası.')
    }
  }

  return (
    <div>
     <div className="top-bar">
        <button onClick={e => router.push('./home')} style={{ cursor: 'pointer' }}>
          <span className='top-bar-text'> ODemi </span>
        </button>
      </div>
      <div className="centerDIV">
        <h1 style={{
          fontWeight: 'bold',
          fontSize: '30px',
          margin: '20px',
          textAlign: 'center'
        }}>
          Giriş Yap
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="E-posta"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="logTextbox"
          />
          <br />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="logTextbox"
          />
          <br />

          {error && (
            <div style={{ color: 'salmon', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="logButton">Giriş</button>
          </div>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px'
        }}>
          <span style={{ fontSize: '10px' }}>Hesabınız yok mu?</span>
          <button className="textButton" onClick={e => router.push('./register')}>
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  )
}
