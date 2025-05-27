'use client';

import { useRouter } from 'next/navigation';
import "./style/shortpreview.css"

export default function ShortsPreview({ shorts, isOwner=false }) {
  const router = useRouter();

  return (
    <div style={{ padding: '20px', margin: '10px 200px 10px 200px' }}>
      {isOwner ? null : <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Brainrot Dersler</h2> }
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '30px'
      }}>
        {shorts.map((video, index) => (
          <div
            key={index}
            onClick={() => router.push(`/shorts?id=${video.id}`)}
            className='short-img-div'
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className='short-img'
            />
            {isOwner ? (<img
                          src="/icons/edit-icon.png"
                          alt="Edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/shorts/edit?id=${video.id}`);
                          }} 
                          className='shorts-edit-icon'
                          />) : null}
            <p className='short-title' >{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
