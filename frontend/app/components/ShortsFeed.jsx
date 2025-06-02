export default function ShortsFeed({ shorts }) {
  if (!shorts || shorts.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Hiç kısa video bulunamadı.</div>;
  }

  const currentVideo = shorts[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div
        className="relative w-[360px] h-[640px] bg-black rounded-lg shadow-lg overflow-hidden"
      >
        {currentVideo.video_url && (
          <video
            src={currentVideo.video_url}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
