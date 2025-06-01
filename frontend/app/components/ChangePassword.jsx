import { useState, useEffect } from 'react';
import './style/changepassword.css';

export default function ChangePassword({ type, username, setUsername }) {
    const [isAuthenticated, setIsAuthenticated] = useState('');
    const [newValue, setNewValue] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token);
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');

        if (!newValue || !currentPassword || (!type && newValue === username)) {
            setMessage(type ? 'Lütfen tüm alanları doldurun.' : 'Yeni kullanıcı adı eskisiyle aynı olamaz.');
            return;
        }

        if (type && newValue !== confirmPassword) {
            setMessage('Yeni şifre ile onay uyuşmuyor.');
            return;
        }

        const endpoint = type
            ? 'http://localhost:8080/api/auth/change-password'
            : 'http://localhost:8080/api/user/update-username';

        const payload = type
            ? { currentPassword, newPassword: newValue }
            : { oldUsername: username, newUsername: newValue };

        const method = type ? 'POST' : 'PUT';

        try {
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isAuthenticated}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Hata:", res.status, errorText);
                throw new Error('İşlem başarısız.');
            }

            setMessage(type
                ? 'Şifreniz başarıyla değiştirildi.'
                : 'Kullanıcı adınız başarıyla değiştirildi.');

            if (!type) {
                localStorage.setItem('username', newValue);
                setUsername(newValue);
            }

        } catch (err) {
            console.error(err);
            setMessage('Sunucu hatası veya geçersiz bilgi.');
        }

        setCurrentPassword('');
        setNewValue('');
        setConfirmPassword('');
    };

    return (
        <div className='pass-container'>
            <h2>{type ? "Şifre Değiştir" : "Kullanıcı Adı Değiştir"}</h2>
            <div className='center'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Şifreniz:</label>
                        <input
                            type="password"
                            placeholder="Şifreniz"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>{type ? "Yeni Şifreniz:" : "Yeni Kullanıcı Adınız:"}</label>
                        <input
                            type={type ? "password" : "text"}
                            placeholder={type ? "Yeni Şifre" : "Yeni Kullanıcı Adı"}
                            value={newValue}
                            onChange={e => setNewValue(e.target.value)}
                            required
                        />
                    </div>

                    {type && (
                        <div>
                            <label>Yeni Şifre (Tekrar):</label>
                            <input
                                type="password"
                                placeholder="Yeni Şifre (Tekrar)"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {message && (
                        <div style={{
                            color: message.includes('başarı') ? 'lightgreen' : 'salmon',
                            marginTop: '10px',
                            fontWeight: 'bold'
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
