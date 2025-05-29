'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ShortsFeed from '../components/ShortsFeed';

export default function ShortsPage() {
  const searchParams = useSearchParams();
  const startId = parseInt(searchParams.get('id'));

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const allVideos = [
      {
        id: 101,
        title: 'Kısa Video 1 - React',
        videoUrl: '/videos/react1.mp4',
        thumbnail: '/thumbs/thumbnail1.png',
      },
      {
        id: 102,
        title: 'Kısa Video 2 - JS',
        videoUrl: '/videos/react1.mp4',
        thumbnail: '/thumbs/thumbnail2.png',
      },
      {
        id: 103,
        title: 'Kısa Video 3 - HTML',
        videoUrl: '/videos/react1.mp4',
        thumbnail: '/thumbs/thumbnail3.png',
      },
    ];

    if (startId) {
      const index = allVideos.findIndex((v) => v.id === startId);
      if (index !== -1) {
        const reordered = [...allVideos.slice(index), ...allVideos.slice(0, index)];
        setVideos(reordered);
        return;
      }

      // id sahte videolarda yoksa → backend'den çek
      fetch(`http://localhost:8080/api/shorts/${startId}`)
        .then((res) => res.json())
        .then((data) => {
          const reordered = [data, ...allVideos];
          setVideos(reordered);
        })
        .catch((err) => {
          console.error('Short fetch error:', err);
          setVideos(allVideos);
        });

      return;
    }

    setVideos(allVideos);
  }, [startId]);

  return <ShortsFeed videos={videos} />;
}
