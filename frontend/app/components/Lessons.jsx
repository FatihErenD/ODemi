import "./style/lessons.css"

export default function Lessons({ ep, title, isSelected, handleChangeLesson }) {

    

    return (
        <div className="lesson" >
            
                {isSelected ? (
                    <button className="selected" >
                        <span style={{color: "var(--background)"}} > <strong> Bölüm {ep}: </strong> {title} </span>
                    </button>
                ) : (
                    <button onClick={handleChangeLesson} >
                        <span> <strong> Bölüm {ep}: </strong> {title} </span>
                    </button>
                )}

        </div>
    )
}