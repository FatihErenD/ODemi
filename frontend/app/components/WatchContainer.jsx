import "./style/watchcontainer.css"
import VideoPlayer from "./VideoPlayer"
import Comment from "./Comment"
import { useRef, useEffect, useState } from "react"
import Lessons from "./Lessons"


export default function WatchContainer({ video, lessons, comments, handleComment }) {
    const [isCommenting, setIsCommenting] = useState(false);
    const inputRef = useRef();

    const handleClick = () => {
        const text = inputRef.current.value;
        if (text.trim() !== "") 
            handleComment(text);

        inputRef.current.value = ""
        setIsCommenting(false);
    } 

    return (
        <div className="two-panel-container" >
                <div className="left-panel" >

                    <h1 > {video.title} </h1>
                    <h3> {lessons?.[video?.ep - 1]?.title ?? ''} </h3>

                    <VideoPlayer video={video.url} />

                <div className="description" >
                    <h3>Ders Açıklaması</h3>
                    <p >{video.content}</p>
                </div>

                <div style={{ marginTop: '40px', color: 'var(--textColor)' }}>
                    <h3 className="commh3" >Yorumlar</h3>
                    <hr />

                    <div className="comm" >
                        <div style={{height: '5vh'}}>
                            <input ref={inputRef} type="text" placeholder="Yorum" onFocus={e => setIsCommenting(true)} onBlur={() => setTimeout(() => setIsCommenting(false), 200)} />
                        </div>
                        
                        <button className={`comm-button ${isCommenting ? 'show' : 'hide'}`} onClick={handleClick} >
                            Yorum Yap
                        </button>
                            
                    </div>

                    {comments.map((comment, index) => (
                        <Comment key={index} comment={comment} ></Comment>
                    ))}

                </div>
            </div>

            <div className="right-panel" >
                    <h3 > Kurs İçeriği </h3>
                    <hr></hr>

                    {lessons.map((lesson, index) => (
                        <Lessons key={index} id={video.course_id} ep={lesson.ep} 
                        title={lesson.title} isSelected={lesson.ep === video.ep} />
                    ))}
                        
            </div>
        </div>
    )
}