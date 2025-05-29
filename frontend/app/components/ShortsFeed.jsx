export default function ShortsFeed({ videos }) {
  if (!videos || videos.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Hiç kısa video bulunamadı.</div>;
  }

  const currentVideo = videos[0]; // sadece ilk video

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div
        className="relative w-[360px] h-[640px] bg-black rounded-lg shadow-lg overflow-hidden"
      >
        {currentVideo.videoUrl && (
          <video
            src={currentVideo.videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
