'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import '../input.css'

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    console.log({ username, password })
    // buraya fetch/post vs. ekleyebilirsin
  }

  return (
    <div>
      <div className="top-bar">
        <button onClick={e => console.log('bastı :)')} > {/* Ana sayfaya döndürecek */}
          <span className='top-bar-text' > ODemi </span>
        </button>
      </div>
      <div className="centerDIV">
        <h1
          style={{
            color: '#f1deef',
            fontWeight: 'bold',
            fontSize: '30px',
            margin: '20px',
            textAlign: 'center'
          }}
        >
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="logButton">
              Giriş
            </button>
          </div>
        </form>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px'
          }}
        >
          <span style={{ color: '#f1deef', fontSize: '10px' }}>
            Hesabınız yok mu?
          </span>
            <button className="textButton" onClick={e => router.push('./register')} >Kayıt Ol</button>
        </div>
      </div>
    </div>
  )
}
