

export default function TrackImage({ url, classname }) {

    const handleOnMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 30;
        const rotateY = (x - centerX) / 30;

        e.currentTarget.querySelector('img').style.transform = `
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale(1.05)
        `;
        e.currentTarget.querySelector('img').style.boxShadow = `0px 20px 40px rgba(0,0,0,0.5)`;
    }

    const handleOnMouseLeave = (e) => {
        const img = e.currentTarget.querySelector('img');
        img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        img.style.boxShadow = `0px 10px 20px rgba(0,0,0,0.3)`;
    }

    return (
        <div style={{ width: '1000%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
            onMouseMove={handleOnMouseMove}
            onMouseLeave={handleOnMouseLeave}>
            <img className={classname && classname} src={url} style={{
                transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
                aspectRatio: '16/9'}} />
        </div>
    )
}