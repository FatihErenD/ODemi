import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

import "./style/slider.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function SlideComp() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const router = useRouter()

    return (
        <div className='slider-container' >
            <Slider {...settings} >
                <div className='slide' >
                    Renklere laf etme
                </div>
                <div className='slide' >
                    Test için böyle düzeltçem
                </div>
            </Slider>
         </div>
    );
}