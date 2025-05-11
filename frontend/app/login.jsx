'use client'

import { useState } from "react";
import './input.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    console.log(username);
    console.log(password);
  }

  return (
    <div>
        <div className="top-bar">
            ODemi
        </div>
        <div className="centerDIV">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 style={{ 
                    color: "#f1deef", 
                    fontWeight: "bold", 
                    fontSize: "30px",
                    margin: "20px"
                    }}> Giriş Yap
                </h1>
            </div>
            <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="loginbox"
                className="logTextbox"
            />
            <br />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="passbox"
                className="logTextbox"
            />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={handleLogin} className="logButton">Giriş</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                <span style={{ color: "#f1deef", fontSize: "10px" }}>Hesabınız yok mu?</span>
                <button className="textButton">Kayıt Ol</button>
            </div>
                
        </div>
    </div>
  );
}