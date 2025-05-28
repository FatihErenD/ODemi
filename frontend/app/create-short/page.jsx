'use client'

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'

import "../components/style/shortpreview.css"
import "../components/style/editcourse.css"

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

export default function CreateShort() {
    const [title, setTitle] = useState('');
    const [topBarVisible, setTopBarVisible] = useState(true);
    const [query, setQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [isFocused, setFocus] = useState(false);
    const [thumbnail, setThumbnail] = useState('/thumbs/no_thumbnail_shorts.png');

    const descriptionRef = useRef();
    const fileInputRef = useRef();
    const videoFileInputRef = useRef();

    const router = useRouter();

    const allCategories = [
        { id: 1, name: 'React' },
        { id: 2, name: 'Next.js' },
        { id: 3, name: 'Pazarlama' },
        { id: 4, name: 'Matematik' },
        { id: 5, name: 'Veri Bilimi' },
        { id: 6, name: 'Yapay Zeka' },
        { id: 7, name: 'Siber Güvenlik' },
        { id: 8, name: 'Mobil Uygulama Geliştirme' },
        { id: 9, name: 'Web Geliştirme' },
        { id: 10, name: 'Oyun Tasarımı' },
        { id: 11, name: 'Veritabanı Yönetimi' },
        { id: 12, name: 'Makine Öğrenimi' },
        { id: 13, name: 'Programlama' },
        { id: 14, name: 'Tasarım' },
    ];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        const filteredOptions = allCategories.filter(cat =>
            cat.name.toLowerCase().includes(value.toLowerCase()) &&
            !selectedCategories.some(selected => selected.id === cat.id)
        );
        setFiltered(filteredOptions);
    };

    const handleSelect = (category) => {
        setSelectedCategories(prev => [...prev, category]);
        setQuery('');
        setFiltered([]);
    };

    const handleRemove = (category) => {
        setSelectedCategories(prev => prev.filter(c => c.id !== category.id));
    };


    const handleClick = () => {
        const description = descriptionRef.current.value
        const shortsId = 1 /* serverden çekilecek */

        router.push(`/shorts?id=${shortsId}`)
    }

    const handleThumbnailChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            console.log("Yüklenen dosya:", data.fileUrl);
            setThumbnail(data.fileUrl);
        } catch (err) {
            console.error("Yükleme hatası:", err);
        }
    }

    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />

            <div style={{ marginTop: '120px', marginLeft: '180px' }}>
                <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Short Oluştur</h1>
            </div>
        
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '50px' }}>
                <div style={{ width: '10vw', padding: '20px' }}>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '80vw', backgroundColor: '#404040', borderRadius: '10px', padding: '20px' }} >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '60vw', backgroundColor: '#404040', borderRadius: '10px', padding: '20px', color: '#fff' }}>
                        
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline'}} >
                            <h3 style={{fontSize: '18px', width: '8vw'}} > Short Başlığı: </h3>
                            <input type='text' className='logTextbox' style={{width: '23vw'}} onChange={e => setTitle(e.target.value)} value={title} ></input>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', height: '10vh', alignItems: 'baseline'}} >
                            <h3 style={{fontSize: '18px', width: '8vw'}} > Açıklama: </h3>
                            <textarea ref={descriptionRef} className='logTextbox' style={{
                                width: '23vw',
                                height: '100%',
                                resize: 'none',
                            }} />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline'}} >
                            <h3 style={{fontSize: '18px', width: '8vw'}} > Kategoriler: </h3>
                            <div style={{display: 'flex', flexDirection: 'column'}} >
                                <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '20px', height: '35px'}} >
                                    <input type='text' className='logTextbox' style={{width: '23vw', marginTop: 0}} value={query} 
                                        onChange={handleInputChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
                                    <div style={{display: 'flex', maxHeight: '136px', flexWrap: 'wrap', overflow: 'auto', maxWidth: '20vw', zIndex: '1001'}} >
                                        {selectedCategories.map((cat, index) => (
                                            <div key={index} className='category-div'>
                                                <span>{cat.name}</span>
                                                <span onClick={() => handleRemove(cat)} className='cat-span'>×</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>                            
                                <div style={{position: 'relative', maxHeight: '200px'}} >
                                <ul className='rec-cat-bar' style={{                
                                    maxHeight: isFocused && filtered.length > 0 ? '200px' : '0px',
                                    opacity: isFocused && filtered.length > 0 ? 1 : 0,
                                    pointerEvents: isFocused && filtered.length > 0 ? 'auto' : 'none'
                                }}>
                                    {filtered.map((cat, i) => (
                                        <li key={i}
                                            onMouseDown={() => handleSelect(cat)}
                                            className='rec-cat'
                                                style={{
                                                borderBottomLeftRadius: i !== filtered.length - 1 ? '0': '6px',
                                                borderBottomRightRadius: i !== filtered.length - 1 ? '0': '6px',
                                                borderBottom: i !== filtered.length - 1 ? '1px solid #eee' : 'none'
                                            }}
                                        >
                                            {cat.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline', marginTop: '20px'}} >
                        <h3 style={{fontSize: '18px', width: '8vw'}} > Thumbnail Resmi: </h3>
                        <input
                            type="file"
                            id="thumbnailInput"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => handleThumbnailChange(e)}
                            style={{ color: '#fff', display: 'none' }}
                        />
                        <label htmlFor="thumbnailInput" className='logButton' style={{width: '8vw', textAlign: 'center', padding: '5px'}} >
                            Thumbnail Seç
                        </label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline', marginTop: '20px'}} >
                        <h3 style={{fontSize: '18px', width: '8vw'}} > Video Yükle: </h3>
                        <input
                            type="file"
                            id="videoInput"
                            accept="video/*"
                            ref={videoFileInputRef}
                            onChange={(e) => handleThumbnailChange(e)}
                            style={{ color: '#fff', display: 'none' }}
                        />
                        <label htmlFor="videoInput" className='logButton' style={{width: '8vw', textAlign: 'center', padding: '5px'}} >
                            Video Seç
                        </label>
                    </div>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline', marginTop: '20px'}} >
                            <button className='logButton' style={{width: '10vw', height: '5vh', margin: 'auto 5vw'}} onClick={handleClick} > Shorts Yayınla </button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'var(--background)', width: '9vw', aspectRatio: '9/16', height: '16vw', margin: '30px 50px auto auto', borderRadius: '10px' }} >
                        <img
                            src={thumbnail}
                            draggable={false}
                            className='short-img'
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', margin: 0 }}
                        />
                        <div className='short-title'>
                            {title}
                        </div>
                    </div>
                </div>
                <div style={{ width: '10vw', padding: '20px'}}>
                </div>
            </div>
        </div>
    )
}