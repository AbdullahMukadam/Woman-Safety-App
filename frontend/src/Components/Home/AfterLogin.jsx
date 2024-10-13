import React, { useContext, useState } from 'react'
import SOSButton from '../SOSButton'
import { Plus, X } from 'lucide-react'
import BottomNav from './BottomNav'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios'
import { Config } from '../../../API/Config'

function AfterLogin() {
  const [showAddContact, setShowAddContact] = useState(false);
  const { handleSubmit, register } = useForm();
  const { user } = useContext(AuthContext)

  const Submit = async (data) => {
    //console.log(data, user)
    const response = await axios.post(Config.ContactUrl, {
      photo: data.photo[0],
      name: data.name,
      MobileNo: data.MobileNo,
      userId: user.id
    })
    if (response) {
      console.log(response)
    }
  }

  return (
    <div className='w-full p-2 bg-slate-50'>
      <div className='w-full h-[40vh] p-2 flex items-center justify-center'>
        <SOSButton />
      </div>
      <div className='w-full p-4'>
        <h1 className='text-gray-900 text-2xl font-bold font-sans'>Emergency Contacts</h1>

        <div className='w-full flex flex-col gap-3 mt-4 md:flex-row md:flex-wrap md:justify-center md:items-center'>
          {/* Contact Card 1 */}
          <div className='w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-4 md:w-[30%]'>
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
          <div className='w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-4 md:w-[30%]'>
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
          <div className='w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-4 md:w-[30%]'>
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
        <button className='text-red-400 font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-all border-2 border-transparent hover:border-red-300' onClick={() => setShowAddContact(true)}>
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Add New Contact
        </button>
      </div>
      {showAddContact && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Contact</h2>
              <button
                onClick={() => setShowAddContact(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(Submit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <input
                  type="file"

                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg
                                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Add profile photo"
                  {...register("photo", {
                    required: true,
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"

                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg
                                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter the Name"
                  {...register("name", {
                    required: true
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"

                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg
                                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Contact Number"
                  {...register("MobileNo", {
                    required: true
                  })}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white
                                                 border border-gray-300 rounded-lg hover:bg-gray-50
                                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600
                                                 rounded-lg hover:bg-red-700 focus:outline-none 
                                                 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>}

      {/* Navigation Bar */}
      <BottomNav />
    </div>
  )
}

export default AfterLogin