import { useRouter } from 'next/navigation';
import "./style/vidthumbnail.css"

export default function VidThumbnail({ id, thumbnail, title }) {
    const router = useRouter()

    return (
        <div
            key={id}
            onClick={() =>  router.push(`/watch?id=${id}`)}
            className='vid-thumb-div'
        >
            <img
              src={thumbnail}
              alt={title}
              className='vid-thumb-img'
            />
            <div className='vid-thumb-text'>
              {title}
            </div>
        </div>
    );
}