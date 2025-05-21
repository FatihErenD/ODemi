import VidThumbnail from "./VidThumbnail"
import { useState } from "react";
import "./style/recvideos.css"

export default function RecVideos({ videos }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (id) => {
        setSelectedCategories((prev) =>
        prev.includes(id)
            ? prev.filter((catId) => catId !== id)
            : [...prev, id]
        );
        console.log(id)
    };

    const categories = [
        {
            id: 1,
            name: "React"
        },
        {
            id: 2,
            name: "Python"
        }
    ]

    return (
        <div style={{display: 'flex', width: '100%', height: '100%'}} >
            <div style={{width: '20%', marginTop: '80px', borderRight: '2px solid #404040'}} >
                <h3 style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', margin: '10px'}} > Kategoriler </h3>
                <hr style={{color: 'var(--textColor)', margin: '0 40px 20px 40px'}} />

                {categories.map((categorie, index) => (
                    <div className="cat-div" key={index} >
                        <label >
                            {categorie.name}
                            <input 
                                type="checkbox"
                                className="custom-checkbox"
                                onChange={() => handleCategoryChange(categorie.id)}
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
                {videos.map(video => (
                    <VidThumbnail key={video.id} id={video.id} thumbnail={video.thumbnail} title={video.title} />
                ))}
            </div>
        </div>
    )
}