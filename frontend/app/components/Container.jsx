import { useState, useEffect } from 'react';
import "./style/container.css"
import ChangePassword from './ChangePassword';
import AccountInfo from './AccountInfo';

export default function Container() {
    const [selected, setSelected] = useState(1)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    

    useEffect(() => {
        const storedUser = localStorage.getItem('username') || 'demoUser'
        setUsername(storedUser)
        setEmail('asdasd@example.com' || localStorage.getItem('e-mail'))
    }, [])

    const renderContent = () => {
        switch (selected) {
            case 1:
                return <ChangePassword type={true} username={username} />
            case 2:
                return <ChangePassword type={false} username={username} />
            default:
                return <p> Hata! </p>;
        }
    };

    const deleteAcc = () => {
        /* hesap sil */
    }

    return (
        <div className='container'>
            <div className='side'>
                <h2> Kullanıcı Ayarları </h2>
                <button onClick={() => setSelected(1)}> 
                    <span>
                        Şifre Değiştir
                    </span>
                </button>
                <button onClick={() => setSelected(2)} > 
                    <span>
                        Kullanıcı Adı Değiştir
                    </span>
                </button>
                <button onClick={() => deleteAcc} style={{ backgroundColor: '#f83939', marginTop: '30px' }} > 
                    <span >
                        Hesabı Sil
                    </span>
                </button>
            </div>
            {renderContent()}
            
        </div>
    );
}