import React from 'react'
import SOSButton from '../SOSButton'
import { Home, Map, MessageSquare, User, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

function AfterLogin() {
  return (
    <div className='w-full p-2 bg-slate-50'>
      <div className='w-full h-[40vh] p-2 flex items-center justify-center'>
        <SOSButton />
      </div>
      <div className='w-full p-4'>
        <h1 className='text-gray-900 text-2xl font-bold font-sans'>Emergency Contacts</h1>

        <div className='w-full flex flex-col gap-3 mt-4'>
          {/* Contact Card 1 */}
          <div className='w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-4'>
            <img
              className='w-16 h-16 rounded-full object-cover'
              src="/img1.png"
              alt="Contact"
            />
            <div className='flex flex-col justify-center'>
              <h2 className='text-gray-700 font-bold text-lg'>Abdullah</h2>
              <h3 className='text-gray-500 font-medium'>87692081538</h3>
            </div>
          </div>

          {/* Contact Card 2 */}
          <div className='w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-4'>
            <img
              className='w-16 h-16 rounded-full object-cover'
              src="/img1.png"
              alt="Contact"
            />
            <div className='flex flex-col justify-center'>
              <h2 className='text-gray-700 font-bold text-lg'>Abdullah</h2>
              <h3 className='text-gray-500 font-medium'>87692081538</h3>
            </div>
          </div>

          {/* Contact Card 3 */}
          <div className='w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-4'>
            <img
              className='w-16 h-16 rounded-full object-cover'
              src="/img1.png"
              alt="Contact"
            />
            <div className='flex flex-col justify-center'>
              <h2 className='text-gray-700 font-bold text-lg'>Abdullah</h2>
              <h3 className='text-gray-500 font-medium'>87692081538</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Button */}
      <div className='w-full p-4 flex items-center justify-center'>
        <button className='text-red-400 font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-all border-2 border-transparent hover:border-red-300'>
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Add New Contact
        </button>
      </div>

      {/* Navigation Bar */}
      <div className="w-full sticky bottom-0 z-20 bg-white shadow-lg">
        <div className="w-full border-2 border-red-300 rounded-lg p-4 flex items-center justify-between">
          <Link
            to={"/home"}
            className="flex items-center justify-center flex-col gap-2 hover:text-red-500 transition-colors"
          >
            <Home className="w-5 h-5 text-red-400" />
            <span className="font-medium text-sm text-gray-600">Home</span>
          </Link>

          <Link
            to={"/map"}
            className="flex items-center justify-center flex-col gap-2 hover:text-red-500 transition-colors"
          >
            <Map className="w-5 h-5 text-red-400" />
            <span className="font-medium text-sm text-gray-600">Map</span>
          </Link>

          <Link
            to={"/reviews"}
            className="flex items-center justify-center flex-col gap-2 hover:text-red-500 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-red-400" />
            <span className="font-medium text-sm text-gray-600">Reviews</span>
          </Link>

          <Link
            to={"/profilr"}
            className="flex items-center justify-center flex-col gap-2 hover:text-red-500 transition-colors"
          >
            <User className="w-5 h-5 text-red-400" />
            <span className="font-medium text-sm text-gray-600">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AfterLogin