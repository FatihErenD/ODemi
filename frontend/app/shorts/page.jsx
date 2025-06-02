'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ShortsFeed from '../components/ShortsFeed';

export default function ShortsPage() {
  const searchParams = useSearchParams();
  const shortId = parseInt(searchParams.get('id'));

  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resShorts = await fetch('http://localhost:8080/api/shorts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!resShorts.ok) throw new Error(`Shorts verisi alınamadı: ${resShorts.status}`);

        const shortsData = await resShorts.json();
        setShorts(shortsData);

      } catch (error) {
        console.error('Shorts verisi hatası:', error);
      }

      if (shortId) {
        fetch(`http://localhost:8080/api/shorts/${shortId}`)
          .then((res) => res.json())
          .then((data) => {
            const reordered = [data, ...shorts];
            setShorts(reordered);
          })
          .catch((err) => {
            console.error('Short fetch error:', err);
          });

        return;
      }
    };

    fetchData();
  }, [shortId]);

  return <ShortsFeed shorts={shorts} />;
}
