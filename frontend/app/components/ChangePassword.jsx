import { useState, useEffect } from 'react'
import './style/changepassword.css'

export default function ChangePassword( {type, username} ) {
    const [isAuthenticated, setIsAuthenticated] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(token)
    }, [])
    
    // Kullanıcı adını localStorage veya context’ten alıyoruz
    
    
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

    const handleChangeUsername = async e => {
        e.preventDefault()
        setMessage('')
    
        if (!newPassword || !currentPassword) {
            setMessage('Lütfen tüm alanları doldurun.')
            return
        }
    
        const token = localStorage.getItem('token')
    
        try {
            const res = await fetch('http://localhost:8080/api/auth/change-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({currentPassword, newPassword})
            })
        
            if (!res.ok) {
                // 401 vs. 400 vs. 500 ayrımı yapmak isterseniz res.status’a bakabilirsiniz
                throw new Error('Mevcut kullanıcı adınız ile aynı giremezsiniz')
            }

            setMessage('Kullanıcı adınız başarıyla değiştirildi.')
        } catch (err) {
            console.error(err)
            setMessage('Sunucu hatası.')
        }
    
        // TODO: Burada gerçek API çağrını yap
        // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {...})
    
        setCurrentPassword('')
        setNewPassword('')
    }

    return (
        <div className='pass-container' >
            <h2> {type ? "Şifre Değiştir" : "Kullanıcı Adı Değiştir"} </h2>
            <div className='center' >
                <form onSubmit={type ? handleChangePassword : handleChangeUsername}>
                    <div>
                        <span style={type ? {} : {width: '180px', textAlign: 'right'}} > Şifreniz: </span>
                        <input
                            type="password"
                            placeholder="Şifreniz"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                        />
                    </div>  

                    <div>
                        <span style={type ? {} : {width: '180px'}} > {type  ? "Yeni Şifreniz:" : "Yeni Kullanıcı Adınız:"} </span>
                        <input
                        type={type ? "password" : "text"}
                        placeholder={type ? "Yeni Şifre" : "Yeni Kullanıcı Adı"}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        />  
                                
                    </div>

                    {type ? (
                        <div>
                            <span> Yeni Şifreniz: </span>
                                <input
                                    type="password"
                                    placeholder="Yeni Şifre (Tekrar)"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                        </div>
                    ) : null}
                    

                    {message && (
                        <div style={{
                            color: message.includes('başarı') ? 'lightgreen' : 'salmon',
                            margin: '10px 0'
                        }}>
                        {message}
                        </div>
                    )}

                    <button type="submit" >
                        {type ? "Şifreyi Değiştir" : "Kullanıcı Adı Değiştir"}
                    </button>
                </form>
            </div>
        </div>
    );
}