'use client'

import { useState } from 'react'
import '../input.css'    // login.jsx'le aynı stil
import Link from 'next/link'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = e => {
    e.preventDefault()
    console.log({ username, email, password })
    // fetch('/api/register', { ... }) vs.
    // yönlendirme:
    // window.location.href = '/login'
  }

  return (
    <div>
      <div className="top-bar">ODemi</div>
      <div className="centerDIV">
        <h1 style={{ color: '#f1deef', fontSize: '30px', fontWeight: 'bold', margin: '20px', textAlign: 'center' }}>
          Kayıt Ol
        </h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="logTextbox"
          />
          <br/>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="logTextbox"
          />
          <br/>
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="logTextbox"
          />
          <br/>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="logButton">Kayıt Ol</button>
          </div>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <span style={{ color: '#f1deef', fontSize: '10px' }}>Zaten hesabın var mı?</span>
          <Link href="/login">
            <button className="textButton">Giriş Yap</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
