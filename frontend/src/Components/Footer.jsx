import React from 'react'

function Footer() {
  return (
    <footer className='w-full p-4 bg-black text-white rounded-lg'>
      <div className='w-full h-fit'>
        <div className='w-full p-2'>
          <img src="/logo.svg" alt="" />
          <h1 className='font-[300] text-[15px] md:text-[20px] md:font-normal md:w-[60%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, laudantium mollitia qui facere ipsum error maiores ipsam itaque illum expedita.</h1>
        </div>
      </div>
      <div className='w-full p-2 flex flex-col md:flex-row md:gap-2'>
      <a className='text-gray-400 font-sans font-bold hover:text-white transition ease-in 1s' href="/testimonals">Testimonals</a>
      <a className='text-gray-400 font-sans font-bold hover:text-white transition ease-in 1s' href="/contactus">Contact Us</a>
      </div>
    </footer>
  )
}

export default Footer