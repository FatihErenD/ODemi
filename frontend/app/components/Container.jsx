import { useState, useEffect } from 'react';
import "./style/container.css";
import ChangePassword from './ChangePassword';

export default function Container({ username, setUsername }) {
    const [selected, setSelected] = useState(1);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('e-mail') || 'asdasd@example.com';
        setEmail(storedEmail);
    }, []);

    const deleteAcc = () => {
        // hesap silme işlemi yapılacaksa buraya
    };

    const renderContent = () => {
        switch (selected) {
            case 1:
                return (
                    <ChangePassword
                        type={true}
                        username={username}
                        setUsername={setUsername}
                    />
                );
            case 2:
                return (
                    <ChangePassword
                        type={false}
                        username={username}
                        setUsername={setUsername}
                    />
                );
            default:
                return <p> Hata! </p>;
        }
    };

    return (
        <div className='container'>
            <div className='side'>
                <h2>Kullanıcı Ayarları</h2>
                <button onClick={() => setSelected(1)}>
                    <span>Şifre Değiştir</span>
                </button>
                <button onClick={() => setSelected(2)}>
                    <span>Kullanıcı Adı Değiştir</span>
                </button>
                <button
                    onClick={deleteAcc}
                    style={{ backgroundColor: '#f83939', marginTop: '30px' }}
                >
                    <span>Hesabı Sil</span>
                </button>
            </div>
            {renderContent()}
        </div>
    );
}
