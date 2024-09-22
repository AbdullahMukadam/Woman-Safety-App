import React from 'react'

function HeroSection() {
    return (
        <div className='w-full p-3'>
            <div className='w-full p-1 flex flex-col text-center'>
                <div className='w-full p-1 flex items-center justify-center text-center'>
                    <h1 className='text-[#FE7678] font-sans text-4xl font-bold tracking-wide'>One Brand</h1>
                    <img className='h-11 ml-3' src="/star.svg" alt="" />
                </div>

                <div className='w-full p-1 flex items-center'>
                    <img className='h-8 mr-1' src="/Union-1.svg" alt="" />
                    <h2 className='text-[#FE7678] font-sans text-4xl font-bold tracking-wide'>Two Solutions</h2>
                </div>

            </div>
            <div className='w-full p-1 text-center'>
                <h1 className='font-[300] '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure hic aliquid a! Alias libero eaque ab, voluptatem aut esse nemo, illo, sunt fugit repudiandae molestias.</h1>
                <div className='w-full p-1'>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection