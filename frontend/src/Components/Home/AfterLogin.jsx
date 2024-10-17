import React, { useContext, useEffect, useState } from 'react';
import SOSButton from '../SOSButton';
import { Plus, X } from 'lucide-react';
import BottomNav from './BottomNav';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { Config } from '../../../API/Config';
import api from '../../../API/CustomApi';

function AfterLogin() {
  const [showAddContact, setShowAddContact] = useState(false);
  const { handleSubmit, register } = useForm();
  const { user, setUser } = useContext(AuthContext);
  const [contactsdata, setContactsdata] = useState([]);

  useEffect(() => {
    setContactsdata(Array.isArray(user?.contacts) ? user.contacts : []);
  }, [user]);

  const Submit = async (formData) => {
    try {
      console.log(formData);


      const contactData = new FormData();
      contactData.append('photo', formData.photo[0]);
      contactData.append('name', formData.name);
      contactData.append('MobileNo', formData.MobileNo);
      contactData.append('userId', user._id);

      const { data: responseData } = await api.post(
        Config.ContactUrl,
        contactData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file upload
          },
        }
      );

      if (responseData) {
        const newContact = responseData.contact;
        setUser((prevUser) => ({
          ...prevUser,
          contacts: [...(prevUser.contacts || []), newContact],
        }));
        setShowAddContact(false);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };


  return (
    <div className="w-full p-2 bg-slate-50">
      <div className="w-full h-[40vh] p-2 flex items-center justify-center">
        <SOSButton />
      </div>
      <div className="w-full p-4">
        <h1 className="text-gray-900 text-2xl font-bold">Emergency Contacts</h1>
        <div className="w-full flex flex-col gap-3 mt-4 md:flex-row md:flex-wrap md:justify-center md:items-center">
          {contactsdata.length > 0 ? (
            contactsdata.map((contact, index) => (
              <div
                key={index}
                className="w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md border flex items-center gap-4 md:w-[30%]"
              >
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={contact.photo}
                  alt="Contact"
                />
                <div>
                  <h2 className="text-gray-700 font-bold">{contact.name}</h2>
                  <h3 className="text-gray-500">{contact.MobileNo}</h3>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-gray-700 font-bold">No Contacts Found</h1>
          )}
        </div>
      </div>

      <div className="w-full p-4 flex items-center justify-center">
        <button
          className="text-red-400 font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg border hover:border-red-300"
          onClick={() => setShowAddContact(true)}
        >
          <Plus className="w-5 h-5" />
          Add New Contact
        </button>
      </div>

      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Add New Contact</h2>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(Submit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium">Profile Photo</label>
                  <input
                    type="file"
                    accept='image/png, image/jpg, image/jpeg, image/webp'
                    className="block w-full px-3 py-2 border rounded-lg"
                    {...register('photo', { required: true })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border rounded-lg"
                    {...register('name', { required: true })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Contact Number</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border rounded-lg"
                    {...register('MobileNo', { required: true })}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddContact(false)}
                    className="px-4 py-2 text-sm border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default AfterLogin;
