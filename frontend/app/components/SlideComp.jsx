import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

import "./style/slider.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TrackImage from './TrackImage';


export default function SlideComp({ courses }) {
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
                {courses.map((course, index) => (
                    <div className='slide' key={index} >
                        <div style={{width: '100%', height: '100%', display: 'flex'}} >
                            <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => router.push(`/course?course_id=${course.course_id}`)} >
                                <TrackImage url={course.url} />
                            </div>
                            <div style={{ width: '50%', height: '100%' }} >
                                <h3 onClick={() => router.push(`/course?course_id=${course.course_id}`)} > {course.title} </h3>
                                <span> {course.descr} </span>
                            </div>
                        </div>

                    </div>
                ))}
            </Slider>
         </div>
    );
}
