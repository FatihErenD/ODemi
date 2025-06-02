import "./style/comment.css"

export default function Comment({ comment }) {
    return (
        <div className="comment" >
            <h3 > {comment.username} </h3>
            <p> {comment.content} </p>
            <span> {comment.createdAt} </span>
        </div>
    )
}