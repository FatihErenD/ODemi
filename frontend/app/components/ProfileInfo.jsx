import "./style/profileinfo.css"

export default function ProfileInfo({ username }) {

    return (
        <div className='topbar'>
            <h1 className="header" > Profil </h1>
            <div style={{marginRight: '70vw'}}>
                <p><strong>Kullanıcı Adı:</strong> {username}</p>
                <p><strong>Şifre:</strong> {'********'}</p>
            </div>
        </div>
    );
}