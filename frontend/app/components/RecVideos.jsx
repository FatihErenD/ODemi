import VidThumbnail from "./VidThumbnail"

export default function RecVideos({ videos }) {
    return (
        <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px',
                        padding: '30px',
                        marginTop: "70px"
                    }}>
            {videos.map(video => (
                <VidThumbnail key={video.id} id={video.id} thumbnail={video.thumbnail} title={video.title} />
            ))}
        </div>
    )
}