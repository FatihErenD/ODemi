import "./style/watchcontainer.css"
import VideoPlayer from "./VideoPlayer"
import Comment from "./Comment"
import { useRef, useEffect, useState } from "react"
import Lessons from "./Lessons"


export default function WatchContainer({ video }) {
    const [isCommenting, setIsCommenting] = useState(false);
    const inputRef = useRef();

    const [comments, setComments] = useState([
        {
            name: 'Ali',
            text: 'Harika anlatım!',
            date: '15/05/2025'
        },
        {
            name:'Yusuf Frontendoğulları',
            text: '🥷🏿',
            date: '18/05/2025'
        },
        {
            name:'Beton Buğra',
            text: 'Staj ver!',
            date: '19/05/2025'
        },
        {
            name:'Erol DB',
            text: '👍👍',
            date: '20/05/2025'
        }
    ])

    useEffect(() => {
        const username = localStorage.getItem('username');
      }, []);



    const lessons = [
        {
            ep: 1,
            title: 'JavaScript\'e Giriş',
            url: '/videos/react1.mp4'
        },
        {
            ep: 2,
            title: 'Böyle Dilin Ben...',
            url: '/videos/react1.mp4'
        },
    ]


    const handleComment = () => {
        const text = inputRef.current.value;
        if (text.trim() !== "") {
            const newComment = {
            name: 'user', /* Username yazdıracak */
            text: text.trim(),
            date: new Date().toLocaleDateString()
            };
            inputRef.current.value = ""
            setComments([newComment, ...comments])
            setIsCommenting(false);
        }
    }

    return (
        <div className="two-panel-container" >
                <div className="left-panel" >

                    <h1 > {video.title} </h1>
                    <h3> {lessons?.[video?.lesson_id - 1]?.title ?? ''} </h3>

                    <VideoPlayer video={video} />

                <div className="description" >
                    <h3>Ders Açıklaması</h3>
                    <p >{video.description}</p>
                </div>

                <div style={{ marginTop: '40px', color: 'var(--textColor)' }}>
                    <h3 className="commh3" >Yorumlar</h3>
                    <hr />

                    <div className="comm" >
                        <div style={{height: '5vh'}}>
                            <input ref={inputRef} type="text" placeholder="Yorum" onFocus={e => setIsCommenting(true)} onBlur={() => setTimeout(() => setIsCommenting(false), 200)} />
                        </div>
                        
                        <button className={`comm-button ${isCommenting ? 'show' : 'hide'}`} onClick={handleComment} >
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
                        title={lesson.title} isSelected={lesson.ep === video.lesson_id} />
                    ))}
                        
            </div>
        </div>
    )
}