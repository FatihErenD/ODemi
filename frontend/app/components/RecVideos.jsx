import VidThumbnail from "./VidThumbnail"
import { useState, useEffect } from "react";
import "./style/recvideos.css"

export default function RecVideos({ videos, isOwner=false }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState(videos)
    const [categories, setCategories] = useState([])

    const handleCategoryChange = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((catId) => catId !== id)
                : [...prev, id]
        );
        console.log(id)
    };


    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredVideos(videos);
        } else {
            setFilteredVideos(
                videos.filter(video =>
                selectedCategories.includes(video.category_id)
                )
            );
        }
    }, [selectedCategories, videos]);

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
        
    })

    return (
        <div style={{display: 'flex', width: '100%', height: '100%'}} >
            <div style={{width: '20vw', minWidth: '16vw', marginTop: '80px', borderRight: '2px solid #404040'}} >
                <h3 style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', margin: '10px'}} > Kategoriler </h3>
                <hr style={{color: 'var(--textColor)', margin: '0 40px 20px 40px'}} />

                {categories.map((categorie, index) => (
                    <div className="cat-div" key={index} >
                        <label >
                            {categorie.name}
                            <input 
                                type="checkbox"
                                className="custom-checkbox"
                                onChange={() => handleCategoryChange(categorie.category_id)}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                ))}
                
            </div>
            <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px',
                        padding: '30px',
                        marginTop: "70px",
                        width: '100%'
                    }}>
                {filteredVideos.map((video, index) => (
                    <VidThumbnail key={index} courseId={video.course_id} lessonId={1} thumbnail={video.thumbnail} title={video.title} isOwner={isOwner} />
                ))}
            </div>
        </div>
    )
}