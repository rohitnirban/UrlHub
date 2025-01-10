'use client'

import React from 'react';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { StarIcon } from 'lucide-react';

const Testimonial = () => {

    const testimonialData = [
        {
            id: 1,
            stars: 5,
            text: "This site is awesome! It turns those crazy long links into short, easy ones. And the best part? It tracks everything! Super handy if you want to know who's checking out your stuff.",
            author: "Chitwan rana",
            // avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
        },
        {
            id: 2,
            stars: 5,
            text: "If you're tired of sharing those never-ending web links, check out this site. It shortens them and lets you see who's clicking. Seriously, it's like magic for the internet.",
            author: "Abhilaksh",
            // avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
        },
        {
            id: 3,
            stars: 5,
            text: "I stumbled upon this cool website - it shortens your links and lets you spy on them. Not in a creepy way, though. It's just perfect for seeing what people are digging on your corner of the web!",
            author: "Prashant Rajput",
            // avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
        },
    ];

    return (
        <div className="container mx-auto px-6 py-8 md:py-16">
            {/* <div className="max-w-screen-xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col items-center"> */}
                <h2 className="text-center font-extrabold text-4xl md:text-4xl tracking-tight text-black mb-16">
                    Reviews
                </h2>
                <div className="w-full flex justify-center text-center">
                    <Swiper
                        modules={[Autoplay, A11y]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay
                    >
                        {testimonialData.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <figure className="max-w-screen-md mx-auto flex flex-col justify-center items-center">
                                    <div className="flex items-center mb-4 text-blue-700">
                                        {[...Array(testimonial.stars)].map((_, i) => (
                                            <StarIcon key={i} className='fill-blue-700' />
                                        ))}
                                    </div>
                                    <blockquote>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {testimonial.text}
                                        </p>
                                    </blockquote>
                                    <figcaption className="flex items-center mt-6 space-x-3">
                                        {/* <img
                                            className="w-6 h-6 rounded-full"
                                            src={testimonial.avatar}
                                            alt="profile picture"
                                        /> */}
                                        <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                                            <cite className="pr-3 font-medium text-gray-900 ">
                                                &rarr; {testimonial.author}
                                            </cite>
                                        </div>
                                    </figcaption>
                                </figure>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            {/* </div> */}
        </div>
    );
};

export default Testimonial;
