'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import "../components/style/vidthumbnail.css"


export default function CourseCreate() {
    const [categories, setCategories] = useState([]);
    const [topBarVisible, setTopBarVisible] = useState(true);
    const [query, setQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [isFocused, setFocus] = useState(false);
    const [thumbnail, setThumbnail] = useState('/thumbs/no_thumbnail.png');
    const [title, setTitle] = useState('');

    const descriptionRef = useRef();
    const fileInputRef = useRef();

    

    const router = useRouter();

    useEffect(() => {

        fetch('http://localhost:8080/api/course/all-categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (!res.ok) throw new Error(`Hata: ${res.status}`)
            return res.json()
        })
        .then(data => setCategories(data))
        .catch(err => console.error(err))
        
    },[])


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        const filteredOptions = categories.filter(cat =>
            cat.name.toLowerCase().includes(value.toLowerCase()) &&
            !selectedCategories.some(selected => selected.category_id === cat.category_id)
        );
        setFiltered(filteredOptions);
        selectedCategories.map(c => console.log(c));
    };

    const handleSelect = (category) => {
        setSelectedCategories(prev => [...prev, category]);
        setQuery('');
        setFiltered([]);
    };

    const handleRemove = (category) => {
        setSelectedCategories(prev => prev.filter(c => c.category_id !== category.category_id));
    };


    const handleClick = (e) => {

        e.preventDefault()

        const description = descriptionRef.current.value
        const token = localStorage.getItem('token');

        const file = fileInputRef.current.files[0];

        const dataFrame = new FormData();
        dataFrame.append('file', file);
        dataFrame.append("title", title);
        dataFrame.append("description", description);
        selectedCategories.forEach(cat => dataFrame.append("categories", cat.category_id)); // Dizi olarak gönder
        
        fetch('http://localhost:8080/api/course/add-course', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`},
        body: dataFrame
        })
        .then(res => {
            if (!res.ok) throw new Error(`Hata: ${res.status}`)
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => console.error(err))
  }


//        router.push(`/edit-course?course_id=${courseId}`)

    const handleThumbnailChange = async (e) => {
        const file = fileInputRef.current.files[0];
        if (!file) return;

        

        const localUrl = URL.createObjectURL(file);
        setThumbnail(localUrl);
    }



    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />

            <div style={{ marginTop: '120px', marginLeft: '180px' }}>
                <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Kurs Oluştur</h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '50px' }}>
                <div style={{ width: '10vw', padding: '20px' }}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '80vw', backgroundColor: '#404040', borderRadius: '10px', padding: '20px' }} >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '60vw', backgroundColor: '#404040', borderRadius: '10px', padding: '20px', color: '#fff' }}>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline'}} >
                            <h3 style={{fontSize: '18px', width: '8vw'}} > Kurs Başlığı: </h3>
                            <input type='text' className='logTextbox' style={{width: '23vw'}} onChange={e => setTitle(e.target.value)} ></input>
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
                                    <div style={{display: 'flex', height: '35px'}} >
                                        {selectedCategories.map((cat, index) => (
                                            <div key={index} style={{
                                                backgroundColor: '#242424',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                borderRadius: '20px'
                                            }}>
                                                <span>{cat.name}</span>
                                                <span onClick={() => handleRemove(cat)} style={{
                                                    marginLeft: '8px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold'
                                                }}>×</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>                            
                                <div style={{position: 'relative', maxHeight: '200px'}} >
                                        <ul style={{
                                            listStyle: 'none',
                                            margin: 0,
                                            padding: '5px',
                                            border: '1px solid #ccc',
                                            borderRadius: '6px',
                                            backgroundColor: '#242424',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                            position: 'absolute',
                                            width: '23vw',
                                            zIndex: 1000,
                                            scrollbarWidth: 'none',

                                            maxHeight: isFocused && filtered.length > 0 ? '200px' : '0px',
                                            opacity: isFocused && filtered.length > 0 ? 1 : 0,
                                            overflow: 'auto',
                                            transition: 'max-height 1s ease-out, opacity 0.3s ease',
                                            pointerEvents: isFocused && filtered.length > 0 ? 'auto' : 'none'
                                        }}>
                                        {filtered.map((cat, i) => (
                                            <li key={i}
                                            onMouseDown={() => handleSelect(cat)}
                                            style={{
                                                padding: '8px 12px',
                                                cursor: 'pointer',
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
                            <button className='logButton' style={{width: '10vw', height: '5vh', margin: 'auto 5vw'}} onClick={(e) => handleClick(e)} > Kursu Yayınla </button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'var(--background)', width: '16vw', aspectRatio: '16/9', height: '9vw', margin: '30px 50px auto auto', borderRadius: '10px' }} >
                        <img
                            src={thumbnail}
                            draggable={false}
                            className='vid-thumb-img'
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                        />
                        <div className='vid-thumb-text'>
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