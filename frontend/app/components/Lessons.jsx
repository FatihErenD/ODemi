import "./style/lessons.css"

import { useRouter } from 'next/navigation';

export default function Lessons({ id, ep, title, isSelected }) {
    const router = useRouter();


    return (
        <div className="lesson" >
            
                {isSelected ? (
                    <button className="selected" >
                        <span style={{color: "var(--background)"}} > <strong> Bölüm {ep}: </strong> {title} </span>
                    </button>
                ) : (
                    <button onClick={() => router.push(`/watch?course_id=${id}&lesson_id=${ep}`)} >
                        <span> <strong> Bölüm {ep}: </strong> {title} </span>
                    </button>
                )}

        </div>
    )
}