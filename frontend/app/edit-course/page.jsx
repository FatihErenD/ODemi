'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import "../components/style/vidthumbnail.css"
import "../components/style/editcourse.css"


export default function EditCourse() {
    const searchParams = useSearchParams();
    const course_id = searchParams.get("course_id");

    const [topBarVisible, setTopBarVisible] = useState(true);
    const [thumbnail, setThumbnail] = useState('/thumbs/no_thumbnail.png');
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [isFocused, setFocus] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [message, setMessage] = useState(' ');
    const [course, setCourse] = useState();
    const[allCategories, setAllCategories] = useState([]);

    const descriptionRef = useRef();
    const fileInputRef = useRef();
    const newEpisodeTitleRef = useRef();
    const newEpisodeDescriptionRef = useRef();
    const newEpisodeFileRef = useRef();

    const [sections, setSections] = useState([
        { ep: 1, title: 'Giriş ve Tanıtım' },
        { ep: 2, title: 'Temel Kavramlar' },
        { ep: 3, title: 'Uygulamalı Örnekler' }
    ]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [courseRes, lessonsRes, categoriesRes, allCategoriesRes] = await Promise.all([
                    fetch(`http://localhost:8080/api/course/${course_id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }),
                    fetch(`http://localhost:8080/api/lesson?course_id=${course_id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }),
                    fetch(`http://localhost:8080/api/course/categories?course_id=${course_id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }),
                    fetch(`http://localhost:8080/api/course/all-categories`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    })
                ]);

                // Hata kontrolü
                if (!courseRes.ok) throw new Error(`Course hatası: ${courseRes.status}`);
                if (!lessonsRes.ok) throw new Error(`Lessons hatası: ${lessonsRes.status}`);
                if (!categoriesRes.ok) throw new Error(`Categories hatası: ${categoriesRes.status}`);
                if (!allCategoriesRes.ok) throw new Error(`All categories hatası: ${allCategoriesRes.status}`);

                const [courseData, lessonsData, categoriesData, allCategoriesData] = await Promise.all([
                    courseRes.json(),
                    lessonsRes.json(),
                    categoriesRes.json(),
                    allCategoriesRes.json()
                ]);

                // State güncellemeleri
                setCourse(courseData);
                setSections(lessonsData);
                setCategories(categoriesData);
                setAllCategories(allCategoriesData);

                setTitle(course.title)
                setThumbnail(course.thumbnail)
                descriptionRef.current.value = course.description
            } catch (err) {
                console.error("Veri çekme hatası:", err);
            } 
        };

        fetchAllData();
    }, [course_id]);


    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            setThumbnail(previewUrl);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        const filteredOptions = allCategories.filter(cat =>
            cat.name.toLowerCase().includes(value.toLowerCase()) &&
            !categories.some(selected => selected.id === cat.category_id)
        );
        setFiltered(filteredOptions);
    };

    const handleSelect = (category) => {
        setCategories(prev => [...prev, category]);
        setQuery('');
        setFiltered([]);
    };

    const handleRemove = (category) => {
        setCategories(prev => prev.filter(c => c.id !== category.id));
    };

    const handleDeleteSection = (id) => {
        const confirmed = window.confirm("Bu bölümü silmek istediğinize emin misiniz?");
        if (confirmed)
            setSections(prev => prev.filter(sec => sec.ep !== id));
    };

    const handleUploadEpisode = async () => {
        const title = newEpisodeTitleRef.current.value.trim();
        const description = newEpisodeDescriptionRef.current.value.trim();
        const file = newEpisodeFileRef.current.files[0];

        if (!title || !description || !file) {
            alert("Lütfen tüm alanları doldurun ve bir video seçin.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', description);
        formData.append('course_id', course_id);
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8080/api/lesson/add-lesson', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (!res.ok) {
                console.log(res.status)
                throw new Error("Yükleme başarısız");
            }

            const data = await res.json();
            console.log("Yüklenen bölüm:", data);
            alert("Video başarıyla yüklendi!");

            newEpisodeTitleRef.current.value = "";
            newEpisodeDescriptionRef.current.value = "";
            newEpisodeFileRef.current.value = "";

            setSections(prev => [
                ...prev,
                {
                    ep: prev.length,
                    title: title
                }
            ]);

        } catch (err) {
            console.error("Yükleme hatası:", err);
            alert("Bir hata oluştu.");
        }
    };


    const handleUpdate = () => {

    }


    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />

            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '120px' }}>
                <div style={{ width: '10vw', padding: '20px' }}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '80vw', backgroundColor: '#404040', borderRadius: '10px', padding: '20px' }} >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '60vw', backgroundColor: '#404040', borderRadius: '10px', padding: '20px', color: '#fff' }}>
                        
                        {/* Başlık Kısmı */}
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline'}} >
                            <h3 style={{fontSize: '18px', width: '10vw'}} > Kurs Başlığı: </h3>
                            <input type='text' className='logTextbox' style={{width: '23vw'}} value={title} onChange={e => setTitle(e.target.value)} ></input>
                        </div>

                        {/* Açıklama Kısmı */}
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', height: '10vh', alignItems: 'baseline'}} >
                            <h3 style={{fontSize: '18px', width: '10vw'}} > Açıklama: </h3>
                            <textarea ref={descriptionRef} className='logTextbox' style={{
                                width: '23vw',
                                height: '100%',
                                resize: 'none',
                            }} />
                        </div>

                        {/* Kategori Kısmı */}
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline'}} >
                            <h3 style={{fontSize: '18px', width: '10vw'}} > Kategoriler: </h3>
                            <div style={{display: 'flex', flexDirection: 'column'}} >
                                <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '20px', height: '35px'}} >
                                    <input type='text' className='logTextbox' style={{width: '23vw', marginTop: 0}} value={query} 
                                        onChange={handleInputChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
                                    <div style={{display: 'flex', maxHeight: '136px', flexWrap: 'wrap', overflow: 'auto', maxWidth: '20vw', zIndex: '1001'}} >
                                        {categories.map((cat, index) => (
                                            <div key={index} className='category-div' >
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

                        {/* Thumbnail Ayarlama Kısmı */}
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline', marginTop: '20px'}} >
                            <h3 style={{fontSize: '18px', width: '10vw'}} > Thumbnail Değiştir: </h3>
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

                        {/* Bölümler Kısmı */}
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline', marginTop: '20px'}} >
                            <h3 style={{fontSize: '18px', width: '10vw'}} > Bölümler: </h3>
                            <div style={{
                                    maxHeight: '20vh',
                                    overflowY: 'auto',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    width: '30vw',
                                    padding: '5px',
                                    backgroundColor: 'var(--background)'
                                }}
                            >
                                {sections.map((section, index) => (
                                    <div key={section.ep} className='ep-div' >
                                        <span style={{ fontWeight: 'bold' }}>
                                            Bölüm {index + 1}:
                                        </span>
                                        <input
                                            type="text"
                                            value={section.title}
                                            onChange={(e) => {
                                                const updated = [...sections];
                                                updated[index].title = e.target.value;
                                                setSections(updated);
                                            }}
                                            className='ep-input'
                                        />

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/oqeixref.json"
                                                trigger="hover"
                                                colors="primary:#ff2e2e"
                                                onClick={() => handleDeleteSection(section.ep)} >
                                            </lord-icon>
                                        </div>
                                    </div>
                                ))}
                                <div className='ep-div'>
                                    <span style={{ fontWeight: 'bold' }}>
                                        Bölüm Ekle:
                                    </span>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                                        <input
                                            type="text"
                                            placeholder="Bölüm Adı"
                                            ref={newEpisodeTitleRef}
                                            className="ep-input"
                                        />
                                        <textarea
                                            type="text"
                                            placeholder="Açıklama"
                                            ref={newEpisodeDescriptionRef}
                                            className="ep-input"
                                            style={{
                                                resize: 'none',
                                                height: '80px'
                                            }}
                                        />
                                    </div>

                                    <input
                                        type="file"
                                        id="newEpisode"
                                        accept="video/*"
                                        ref={newEpisodeFileRef}
                                        style={{ display: 'none' }}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                                        <label htmlFor="newEpisode" className="logButton" style={{ cursor: 'pointer', textAlign: 'center' }}>
                                            Video Seç
                                        </label>

                                        <button onClick={handleUploadEpisode} className='logButton' style={{ cursor: 'pointer', textAlign: 'center' }} >
                                            Bölümü Yayınla
                                        </button>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>

                        {/* Güncelleme Kısmı */}
                        <span style={{margin: 'auto auto auto 8.7vw', textAlign: 'center'}} > {message} </span>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'baseline'}} >
                            
                            <button className='logButton' style={{width: '10vw', height: '5vh', margin: 'auto 5vw'}} onClick={handleUpdate} > 
                                Kursu Güncelle 
                            </button>
                        </div>

                    </div>

                    {/* Video Thumbnail Kısmı */}
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