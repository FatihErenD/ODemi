import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style/sidebar.css';

export default function SideBar({ topOffset, shouldOpen, items = [] }) {
    const defaultItems = [
        { id: 1, label: "Profil", url: "/profile" },
        { id: 1, label: "Kategoriler", url: "/profile" },
        { id: 2, label: "Varsayılan 2", url: "/" },
    ];
    const list = items.length > 0 ? items : defaultItems;

    const [open, setOpen] = useState(shouldOpen);
    const router = useRouter();

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

            { list.map(item => (
                <button key={item.id} onClick={() => router.push(item.url)} >
                    <span > {item.label} </span>
                </button>
            ))}
        </div>
    );
}
