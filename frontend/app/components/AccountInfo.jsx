import "./style/accountinfo.css"

export default function AccountInfo({ username, email }) {

    return (
        <div className='info' >
            <div className="center" >
                <p><strong>Kullanıcı Adı:</strong> {username}</p>
                <p><strong>Şifre:</strong> {'********'}</p>
                <p><strong>E-Mail:</strong> {email.slice(0, 3) + "*****"} </p>
            </div>
        </div>
    )
}