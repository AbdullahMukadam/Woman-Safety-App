import React, { useState } from 'react';

function Navbar() {
    const [isOpen, setOpen] = useState(false);

    const handleNavbar = () => {
        setOpen(!isOpen);
    };

    return (
        <nav className="relative w-full bg-white">
            <div className='w-full p-3 flex items-center justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_4px_17px] sticky top-0 z-[100]'>
                <div className='w-[40%] p-2'>
                    <img className='h-9' src="/logo.svg" alt="Logo" />
                </div>
                
                <div className='hidden w-[30%] p-2 md:flex items-center gap-8'>
                    <a className='text-gray-400 font-mono font-bold hover:text-black transition-colors duration-300' href="/testimonials">Testimonials</a>
                    <a className='text-gray-400 font-mono font-bold hover:text-black transition-colors duration-300' href="/contactus">Contact Us</a>
                </div>
                
                <div className=' w-[30%] p-2 flex items-center justify-end'>
                    <button className='hidden md:block px-6 py-2 text-white bg-black rounded-lg font-bold font-mono hover:bg-gray-800 transition-colors duration-300'>
                        Get Started
                    </button>

                    <button
                        className="relative w-10 h-10 focus:outline-none md:hidden"
                        onClick={handleNavbar}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                            <span
                                className={`absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${
                                    isOpen ? 'rotate-45 delay-200' : '-translate-y-1.5'
                                }`}
                            ></span>
                            <span
                                className={`absolute h-0.5 bg-black transform transition-all duration-200 ease-in-out ${
                                    isOpen ? 'w-0 opacity-50' : 'w-6 delay-200 opacity-100'
                                }`}
                            ></span>
                            <span
                                className={`absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${
                                    isOpen ? '-rotate-45 delay-200' : 'translate-y-1.5'
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>
            </div>

            <div className={`absolute w-full bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
            }`}>
                <div className='flex flex-col space-y-4 p-4'>
                    <a className='text-gray-400 font-mono font-bold hover:text-black transition-colors duration-300' href="/testimonials">
                        Testimonials
                    </a>
                    <a className='text-gray-400 font-mono font-bold hover:text-black transition-colors duration-300' href="/contactus">
                        Contact Us
                    </a>
                    <a className='text-gray-400 font-mono font-bold hover:text-black transition-colors duration-300' href="/testimony">
                        Testimony
                    </a>
                    <button className='w-full py-2 text-white bg-black rounded-lg font-bold font-mono hover:bg-gray-800 transition-colors duration-300'>
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;