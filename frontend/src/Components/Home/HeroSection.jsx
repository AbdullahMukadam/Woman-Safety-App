import React from 'react'

function HeroSection() {
    return (
        <div className='w-full p-3'>
            <div className='w-full p-1 flex flex-col text-center'>
                <div className='w-full p-1 flex items-center justify-center text-center'>
                    <h1 className='text-[#FE7678] font-sans text-4xl font-bold tracking-wide'>One Brand</h1>
                    <img className='h-11 ml-3' src="/star.svg" alt="" />
                </div>

                <div className='w-full p-1 flex items-center text-center justify-center'>
                    <img className='h-8 mr-1' src="/Union-1.svg" alt="" />
                    <h2 className='text-[#FE7678] font-sans text-4xl font-bold tracking-wide'>Two Solutions</h2>
                </div>

            </div>
            <div className='w-full p-1 text-center flex flex-col items-center mt-2'>
                <h1 className='font-[300] mb-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure hic aliquid a! Alias libero eaque ab, voluptatem aut esse nemo, illo, sunt fugit repudiandae molestias.</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex -space-x-4">
                        <div className="w-12 h-12 rounded-full bg-pink-500 border-2 border-white overflow-hidden">
                            <img src="/img1.png" alt="Profile 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-white overflow-hidden">
                            <img src="/img2.png" alt="Profile 2" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white overflow-hidden">
                            <img src="/img3.png" alt="Profile 3" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            <div className=' relative w-full p-1 mt-3'>
                <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-black z-10 rounded-[10%] opacity-80 m-3">
                    <div className='w-full p-8 flex gap-3 items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-6 w-6">
                            <circle cx="12" cy="12" r="11" fill="white" />
                            <circle cx="12" cy="12" r="11" fill="none" stroke="black" strokeWidth="1" />
                            <g transform="scale(0.75) translate(4 4)">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </g>
                        </svg>
                        <h1 className='font-sans text-sm text-white'>Learn More</h1>
                    </div>
                </div>
                <img className="w-full object-contain object-center shadow-[0px_0px_14px_1px_#1a202c] rounded-[10%] relative" src="/img4.png" alt="" />

            </div>



        </div>
    )
}

export default HeroSection