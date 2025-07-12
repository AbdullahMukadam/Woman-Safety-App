import React from 'react'
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className='w-full p-4 bg-black text-white rounded-lg mt-auto'>
      <div className='w-full h-fit'>
        <div className='w-full p-2'>
          <img className='h-8' src="/logo.svg" alt="Logo" />
          <h1 className='font-[300] text-[15px] md:text-[20px] md:font-normal md:w-[60%] mt-4'>
          Empowering Women with Advanced Safety Technology - Your Personal Guardian That Never Sleeps, Ensuring Youre Protected Wherever Life Takes You
          </h1>
        </div>
      </div>
      <div className='w-full p-2 flex flex-col md:flex-row md:gap-6'>
        <a className='text-gray-400 font-sans font-bold hover:text-white transition-colors duration-300' href="/testimonials">Testimonials</a>
        <a className='text-gray-400 font-sans font-bold hover:text-white transition-colors duration-300' href="/contactus">Contact Us</a>
      </div>
      <div className='w-full p-2 flex items-center justify-between md:w-[40%]'>
        <input 
          type="text" 
          className='w-[55%] border-2 border-white rounded-xl p-2 bg-black font-sans text-sm font-semibold focus:outline-none focus:border-gray-300' 
          placeholder='Subscribe to Our Newsletter' 
        />
        <button className='p-2 rounded-xl bg-white text-black w-[40%] font-semibold hover:bg-gray-200 transition-colors duration-300'>
          Subscribe
        </button>
      </div>
      <div className='w-full p-2 md:w-[15%] md:mt-2'>
        <h1 className='font-[300] text-center font-sm tracking-tighter'>Connect with us</h1>
        <div className='w-full p-2 flex items-center justify-center gap-4'>
          <FaInstagram className='w-5 h-5 md:w-7 md:h-7 hover:text-gray-400 cursor-pointer transition-colors duration-300' />
          <FaFacebook className='w-5 h-5 md:w-7 md:h-7 hover:text-gray-400 cursor-pointer transition-colors duration-300' />
          <FaLinkedin className='w-5 h-5 md:w-7 md:h-7 hover:text-gray-400 cursor-pointer transition-colors duration-300' />
          <FaTwitter className='w-5 h-5 md:w-7 md:h-7 hover:text-gray-400 cursor-pointer transition-colors duration-300' />
        </div>
      </div>
      <div className='w-full p-1 bg-white text-black rounded-lg flex items-center justify-between flex-col md:flex-row md:p-3 mt-4'>
        <div className='flex items-center justify-between gap-4'>
          <h3 className='text-[12px] font-[400] font-sans hover:text-gray-600 cursor-pointer'>Terms of Service</h3>
          <h3 className='text-[12px] font-[400] font-sans hover:text-gray-600 cursor-pointer'>Privacy Policy</h3>
          <h3 className='text-[12px] font-[400] font-sans hover:text-gray-600 cursor-pointer'>Disclaimer Policy</h3>
        </div>
        <p className='text-[12px] font-[400] font-sans mt-2 md:mt-0'>Copyright © 2024 I'M SAFE APP. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer