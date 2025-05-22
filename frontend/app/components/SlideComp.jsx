import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

import "./style/slider.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function SlideComp({ video }) {
    const videos = [
        {
            id: 1,
            url: '/thumbs/jumpscare.jpg',
            title: 'Kınık',
            descr: 'Bu kursta nasıl yayalara çarpabileceğinizi ustasından öğreneceksiniz!'
        },
        {
            id: 2,
            url: '/thumbs/jumpscare.jpg',
            title: 'Kınık',
            descr: 'Bu kursta nasıl yayalara çarpabileceğinizi ustasından öğreneceksiniz!'
        }   
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const router = useRouter()

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
        `;
        e.currentTarget.querySelector('img').style.boxShadow = `0px 20px 40px rgba(0,0,0,0.5)`;
    }

    const handleOnMouseLeave = (e) => {
        const img = e.currentTarget.querySelector('img');
        img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        img.style.boxShadow = `0px 10px 20px rgba(0,0,0,0.3)`;
    }

    return (
        <div className='slider-container' >
            <Slider {...settings} >
                {videos.map((video, index) => (
                    <div className='slide' key={index} >
                        <div style={{width: '100%', height: '100%', display: 'flex'}} >
                            <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
                                onMouseMove={handleOnMouseMove}
                                onMouseLeave={handleOnMouseLeave}>
                                <img src={video.url} />
                            </div>
                            <div style={{ width: '50%', height: '100%' }} >
                                <h3> {video.title} </h3>
                                <span> {video.descr} </span>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </Slider>
         </div>
    );
}