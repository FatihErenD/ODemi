import { useState } from 'react';
import "./style/container.css"
import ChangePassword from './ChangePassword';

export default function Container() {
    const [selected, setSelected] = useState(0)

    const renderContent = () => {
        switch (selected) {
            case 0:
                return <ChangePassword />
            case 1:
                return <p>İçerik B</p>;
            case 2:
                return <p>İçerik C</p>;
            default:
                return <p>Bir içerik seçin</p>;
        }
    };

    const deleteAcc = () => {
        /* hesap sil */
    }

    return (
        <div className='container'>
            <div className='side'>
                <h2> Kullanıcı Ayarları </h2>
                <button onClick={() => setSelected(0)}> 
                    <span>
                        Şifre Değiştir
                    </span>
                </button>
                <button onClick={() => setSelected(1)} > 
                    <span>
                        Kullanıcı Adı Değiştir
                    </span>
                </button>
                <button onClick={() => setSelected(2)} > 
                    <span>
                        Öğretmenlik Talep Et
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