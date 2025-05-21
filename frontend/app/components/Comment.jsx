import "./style/comment.css"

export default function Comment({ comment }) {
    return (
        <div className="comment" >
            <h3 > {comment.name} </h3>
            <p> {comment.text} </p>
            <span> {comment.date} </span>
        </div>
    )
}