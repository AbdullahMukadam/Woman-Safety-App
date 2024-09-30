import React from 'react'

function Testimony() {
    return (
        <div className='w-full rounded-xl'>
            <div className='w-full relative'>
                <div className='absolute w-full p-3 z-10 flex flex-col gap-3 md:flex-row flex-wrap items-center justify-center'>
                    <div className='w-full h-[40vh] p-1 bg-white rounded-lg border-2 border-dotted border-black md:h-[45vh] md:w-[45%]'>
                        <div className='w-full p-2'>
                            <img className='h-6' src="/logo.svg" alt="" />
                        </div>
                        <h1 className='h-[70%] font-semibold text-[15px] text-wrap text-center border-b-[1px] border-black flex items-center justify-center'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.
                        </h1>
                        <div className='w-full p-1'>
                            <h1 className='font-bold text-xl'>Alice Dorman</h1>
                        </div>
                        
                    </div>
                    <div className='w-full p-1 bg-white rounded-lg border-2 border-dotted border-black h-[40vh] md:h-[45vh] md:w-[45%] hidden md:block'>
                        <div className='w-full p-2'>
                            <img className='h-6' src="/logo.svg" alt="" />
                        </div>
                        <h1 className='h-[70%] font-semibold text-wrap text-center border-b-[1px] border-black flex items-center justify-center text-[15px]'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.
                        </h1>
                        <div className='w-full p-1'>
                            <h1 className='font-bold text-xl'>Alice Dorman</h1>
                        </div>                        
                    </div>
                    <div className='w-full p-1 bg-white rounded-lg border-2 border-dotted border-black h-[40vh] md:h-[45vh] md:w-[45%] hidden md:block'>
                        <div className='w-full p-2'>
                            <img className='h-6' src="/logo.svg" alt="" />
                        </div>
                        <h1 className='h-[70%] font-semibold text-wrap text-center border-b-[1px] border-black flex items-center justify-center text-[15px]'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.
                        </h1>
                        <div className='w-full p-1'>
                            <h1 className='font-bold text-xl'>Alice Dorman</h1>
                        </div>                        
                    </div>
                    <div className='w-full p-1 bg-white rounded-lg border-2 border-dotted border-black h-[40vh] md:h-[45vh] md:w-[45%] hidden md:block'>
                        <div className='w-full p-2'>
                            <img className='h-6' src="/logo.svg" alt="" />
                        </div>
                        <h1 className='h-[70%] font-semibold text-wrap text-center border-b-[1px] border-black flex items-center justify-center text-[15px]'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae magni deleniti, quos temporibus repudiandae cupiditate minus autem repellat quasi omnis praesentium harum laborum, animi voluptatibus totam.
                        </h1>
                        <div className='w-full p-1'>
                            <h1 className='font-bold text-xl'>Alice Dorman</h1>
                        </div>                        
                    </div>
                </div>
                <img className='w-full h-fit min-h-full object-cover relative opacity-0 md:opacity-100' src="/background.svg" alt="" />
            </div>
        </div>
    )
}



export default Testimony