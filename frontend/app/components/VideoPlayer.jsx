import { useRef } from 'react';
import ReactPlayer from 'react-player';
import "./style/videoplayer.css"

export default function VideoPlayer( {video} ) {
  const videoRef = useRef(null);

    return (
        <div className="wrapper" >
            {video ? (
                <ReactPlayer
                url={video.url}
                controls
                width="100%"
                height="100%"
                />
            ) : null}
        </div>
    )
}