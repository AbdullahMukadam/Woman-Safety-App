import React from 'react'
import Testimony from './Testimony'
import Footer from '../Footer'

function HeroSection() {
    return (
        <div className='w-full p-3'>
            <div className='w-full p-1 flex flex-col text-center md:flex-row md:justify-center md:items-center md:gap-2'>
                <div className='w-full p-1 flex items-center justify-center text-center md:w-fit'>
                    <h1 className='text-[#FE7678] font-sans text-4xl font-bold tracking-wide md:text-7xl'>One Brand</h1>
                    <img className='h-11 ml-3 md:hidden' src="/star.svg" alt="" />
                </div>

                <div className='w-full p-1 flex items-center text-center justify-center md:w-fit'>
                    <img className='h-8 mr-1 md:h-12' src="/Union-1.svg" alt="" />
                    <h2 className='text-[#FE7678] font-sans text-4xl font-bold tracking-wide md:text-7xl'>Two Solutions</h2>
                    <img className='hidden h-12 ml-3 md:block' src="/star.svg" alt="" />
                </div>

            </div>
            <div className='w-full p-1 text-center flex flex-col items-center mt-2 md:flex-row md:w-[95%]'>
                <h1 className='font-[300] mb-2 md:font-[350]'>Empowering Women with Advanced Safety Technology - Your Personal Guardian That Never Sleeps, Ensuring Youre Protected Wherever Life Takes You.</h1>
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
            <div className='w-full p-1 md:flex flex-row items-center'>
                <div className=' relative w-full p-1 mt-3 md:w-[49%]'>
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

                <div className=' relative w-full p-1 mt-3 md:w-[49%]'>
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
                    <img className="w-full object-contain object-center shadow-[0px_0px_14px_1px_#1a202c] rounded-[10%] relative" src="/img5.png" alt="" />

                </div>
            </div>
            <div className='w-full p-2 text-center mt-3 flex items-center justify-center flex-col md:h-[60vh]'>
                <h1 className="text-center font-medium text-2xl relative inline-block font-sans md:text-5xl">
                    <span className="relative z-10">{`It's not just products`}</span>
                    <span className="absolute left-0 top-1/2 w-[120%] h-0.5 md:h-1 bg-red-400 -translate-x-[10%] md:decoration-4"></span>
                </h1>

                <h1 className='text-center font-medium text-gray-700 text-2xl mt-3 md:text-5xl m-2 md:leading-normal'>It's our commitment <br></br>to meaningful solutions.</h1>
            </div>
            <div className='w-full p-1' id='testimony'>
                <Testimony />
            </div>
            
        </div>
    )
}

export default HeroSection