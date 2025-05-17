import { useState, useEffect } from 'react'
import './style/changepassword.css'

export default function ChangePassword() {
    const [isAuthenticated, setIsAuthenticated] = useState('')
    const [username, setUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(token)
    }, [])
    
    // Kullanıcı adını localStorage veya context’ten alıyoruz
    useEffect(() => {
        const storedUser = localStorage.getItem('username') || 'demoUser'
        setUsername(storedUser)
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token);  // Token varsa true, yoksa false
    }, []);
    
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

            setMessage('Şifreniz başarıyla değiştirildi.')
        } catch (err) {
            console.error(err)
            setMessage('Sunucu hatası.')
        }
    
        // TODO: Burada gerçek API çağrını yap
        // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {...})
    
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    return (
        <div className='pass-container' >
            <h2> Şifre Değiştir </h2>
            <div className='center' >
                <form onSubmit={handleChangePassword}>
                    <div>
                        <span> Şifreniz: </span>
                        <input
                            type="password"
                            placeholder="Şifreniz"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                        />
                    </div>  

                    <div>
                        <span> Yeni Şifreniz: </span>
                        <div className='anidiv' >
<input
                            type="password"
                            placeholder="Yeni Şifre"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />  
                        </div>
                                
                    </div>

                    <div>
                        <span> Yeni Şifreniz: </span>
                        <input
                            type="password"
                            placeholder="Yeni Şifre (Tekrar)"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {message && (
                        <div style={{
                            color: message.includes('başarı') ? 'lightgreen' : 'salmon',
                            margin: '10px 0'
                        }}>
                        {message}
                        </div>
                    )}

                    <button type="submit" >
                        Şifreyi Değiştir
                    </button>
                </form>
            </div>
        </div>
    );
}