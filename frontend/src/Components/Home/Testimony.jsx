import TestimonialCard from "../TestimonyCard";
import React from "react";

function Testimony() {
    const testimonials = [
        {
            name: 'Alice Dorman',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.'
        },
        {
            name: 'John Smith',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.'
        },
        {
            name: 'Emma Wilson',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.'
        },
        {
            name: 'Michael Brown',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.'
        }
    ];

    return (
        <section className='w-full rounded-xl bg-gradient-to-r from-violet-200 to-pink-200 mb-8'>
            <div className='w-full relative py-12'>
                <div className='w-full p-6 z-10 relative'>
                    <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>What Our Clients Say</h1>
                    <div className='flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center md:items-stretch'>
                        {testimonials.map((testimonial, index) => (
                            <React.Fragment key={index}>
                                {(index === 0 || window.innerWidth >= 768) && (
                                    <TestimonialCard
                                        name={testimonial.name}
                                        content={testimonial.content}
                                    />
                                    
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <img 
                    className='w-full h-full object-cover absolute top-0 left-0 opacity-0 md:opacity-10 transition-opacity duration-300' 
                    src="/background.svg" 
                    alt="Background pattern" 
                />
            </div>
        </section>
    );
}

export default Testimony;