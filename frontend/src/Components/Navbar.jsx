import React from 'react'

function Navbar() {
    return (
        <div className='w-full p-3 flex items-center justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_4px_17px]'>
            <div className='w-[40%] p-2'>
                <img className='h-9' src="/logo.svg" alt="" />
            </div>
            <div className='w-[30%] p-2 flex items-center gap-8'>
                <a className='text-gray-400 font-mono font-bold hover:text-black transition ease-in 1s' href="/testimonals">Testimonals</a>
                <a className='text-gray-400 font-mono font-bold hover:text-black transition ease-in 1s' href="/contactus">Contact Us</a>
            </div>
            <div className='w-[30%] p-2 flex items-center justify-end'>
                <button className='pt-2 pb-2 pr-6 pl-6 text-white bg-black rounded-lg font-bold font-mono'>Get Started</button>
            </div>
        </div>
    )
}

export default Navbar