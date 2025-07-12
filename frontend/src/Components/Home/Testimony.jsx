import TestimonialCard from "../TestimonyCard";
import React from "react";

function Testimony() {
    const testimonials = [
        {
            name: 'Alice Dorman',
            content: 'This platform has completely transformed how we manage our business. The intuitive interface and powerful features have saved us countless hours.'
        },
        {
            name: 'John Smith',
            content: 'Outstanding service and support! The team went above and beyond to ensure our success. Highly recommend to anyone looking for quality solutions.'
        },
        {
            name: 'Emma Wilson',
            content: 'The results speak for themselves. We\'ve seen a 300% increase in efficiency since implementing this solution. Game-changer for our workflow.'
        },
        {
            name: 'Michael Brown',
            content: 'Exceptional quality and reliability. The attention to detail and customer-focused approach makes this stand out from the competition.'
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