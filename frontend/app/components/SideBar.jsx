import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style/sidebar.css';

export default function SideBar({ topOffset, shouldOpen, items = [] }) {
    const [user, setUser] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const defaultItems = [
        { id: 2, label: "Profil", url: `/profile?username=${user}` },
        { id: 3, label: "Kurslarım", url: "/my-courses" },
        { id: 4, label: "Kurs Oluştur", url: "/create-course" },
        { id: 5, label: "Shorts Oluştur", url: "/create-short"}
    ];
    const list = items.length > 0 ? items : defaultItems;

    const [open, setOpen] = useState(shouldOpen);
    const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/me', {
          method: 'GET',
          credentials: 'include'
        });

        if (!res.ok) throw new Error("Unauthorized");

        const user = await res.json();
        setUser(user.username); // backend'de username dönüyorsan
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);


    useEffect(() => {
        const sidebarWidthPx = window.innerWidth * 0.25 + 20;

        function onMouseMove(e) {
            if (e.clientX <= 20 && e.clientY >= 60) {
                setOpen(true);
            } else if (e.clientX > sidebarWidthPx ||e.clientY < 30) {
                setOpen(false);
            }
        }

        window.addEventListener('mousemove', onMouseMove);

        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <div className={`sidebar ${open ? 'open' : ''}`} style={{ top: topOffset ? 60 : 0 }} >
            <h3 style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}> Menü </h3>

            { list.map((item, index) => (
                <button key={index} onClick={() => {
                    isAuthenticated &&
                    (router.push(item.url))}
                    }>
                    <span > {item.label} </span>
                </button>
            ))}
        </div>
    );
}
