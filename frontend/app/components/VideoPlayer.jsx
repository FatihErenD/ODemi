import { useRef } from 'react';
import "./style/videoplayer.css"

export default function VideoPlayer( {video} ) {
  const videoRef = useRef(null);

    return (
        <div className="wrapper" >
            {video ? (
            <video
                ref={videoRef}
                controls
            >
                <source src={video.url} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
            </video>
            ) : null }
        </div>
    )
}