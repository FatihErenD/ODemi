import { useRouter } from 'next/navigation';
import "./style/vidthumbnail.css"

export default function VidThumbnail({ courseId, lessonId, thumbnail, title }) {
    const router = useRouter()

    return (
        <div
            key={courseId}
            onClick={() =>  router.push(`/watch?course_id=${courseId}&lesson_id=${lessonId}`)}
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