import { useRouter } from 'next/navigation';
import "./style/vidthumbnail.css"

export default function VidThumbnail({ courseId, thumbnail, title, isOwner=false }) {
    const router = useRouter()

    return (
        <div
            key={courseId}
            onClick={() => router.push(`/course?course_id=${courseId}`)}
            className='vid-thumb-div'
        >
            <img
              src={thumbnail}
              alt={title}
              className='vid-thumb-img'
            />
            {isOwner ? (<img
                          src="/icons/edit-icon.png"
                          alt="Edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/edit-course?id=${courseId}`);
                          }} 
                          className='video-edit-icon'
                          />) : null}
            <div className='vid-thumb-text'>
              {title}
            </div>
        </div>
    );
}