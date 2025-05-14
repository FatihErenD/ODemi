// Server Component — async fonksiyon, searchParams parametresiyle videoId alır

import ClientWatchPage from './ClientWatchPage'  // Client component'i ayırdık, aşağıda detay

export default async function WatchPage({ searchParams }) {
  const videoId = searchParams.id

  // Bu component server component, sadece parametreyi client komponentine geçirir
  return <ClientWatchPage videoId={videoId} />
}