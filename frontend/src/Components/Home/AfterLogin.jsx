import React, { useContext, useEffect, useState } from 'react';
import SOSButton from '../SOSButton';
import { Plus, X, CircleX } from 'lucide-react';
import BottomNav from './BottomNav';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../../API/CustomApi';
import { Config } from '../../../API/Config';
import Loader from './Loader';
import axios from 'axios';
import { toast } from "react-toastify"

function AfterLogin() {
  const [showAddContact, setShowAddContact] = useState(false);
  const { handleSubmit, register } = useForm();
  const { user, setUser } = useContext(AuthContext);
  const [contactsdata, setContactsdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [MobileNo, setMobileNo] = useState([]);
  const [locationMethod, setLocationMethod] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    setContactsdata(Array.isArray(user?.contacts) ? user.contacts : []);
    setMobileNo(Array.isArray(user?.contacts) ? user.contacts : [])
  }, [user]);

  const Submit = async (formData) => {
    setShowLoader(true);
    try {
      const contactData = new FormData();
      contactData.append('photo', formData.photo[0]);
      contactData.append('name', formData.name);
      contactData.append('MobileNo', formData.MobileNo);
      contactData.append('userId', user._id);

      const { data: responseData } = await api.post(
        Config.ContactUrl,
        contactData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
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
    } finally {
      setShowLoader(false);
    }
  };

  const handleDelete = async (contactId) => {
    setShowLoader(true);
    try {
      const response = await api.delete(Config.DELETECONTACTUrl, {
        params: { userId: user._id, contactId },
      });

      if (response.status === 200) {
        console.log('Contact deleted successfully');
        setContactsdata((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactId)
        );
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    setContactsdata(Array.isArray(user?.contacts) ? user.contacts : []);
    setMobileNo(Array.isArray(user?.contacts) ? user.contacts : []);
  }, [user]);


  const getIPBasedLocation = async () => {
    try {

      let response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('First IP API failed');

      const data = await response.json();
      if (data.latitude && data.longitude) {
        return {
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: 50000,
          method: 'ipapi'
        };
      }


      response = await fetch('https://ipwho.is/');
      if (!response.ok) throw new Error('Second IP API failed');

      const fallbackData = await response.json();
      return {
        latitude: fallbackData.latitude,
        longitude: fallbackData.longitude,
        accuracy: 50000,
        method: 'ipwhois'
      };
    } catch (error) {
      console.error('IP geolocation failed:', error);
      throw new Error('Could not determine approximate location from IP');
    }
  };


  const getLocation = async () => {

    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            { enableHighAccuracy: true, timeout: 10000 }
          );
        });

        setLocationMethod('gps');
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          method: 'gps'
        };
      } catch (gpsError) {
        console.log('GPS failed, falling back to IP:', gpsError);
      }
    }


    try {
      const ipLocation = await getIPBasedLocation();
      setLocationMethod('ip');
      return ipLocation;
    } catch (ipError) {
      console.error('All location methods failed:', ipError);
      throw new Error('Could not determine your location');
    }
  };

  const handleSOS = async () => {
    setShowLoader(true);
    setLocationError(null);

    try {
      if (MobileNo.length === 0) {
        throw new Error('No emergency contacts available');
      }

      const location = await getLocation();
      console.log('Using location:', location);

      const response = await api.post(Config.EMERGENCYUrl, {
        contactNumbers: MobileNo.map(contact => contact.MobileNo),
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        }
      });


      toast.success(
        <div>
          <p>Emergency alert sent successfully!</p>
          <p className="text-sm mt-1">
            {location.method === 'gps' ? 'Using precise GPS location' :
              'Using approximate IP-based location'}
          </p>
        </div>
      );




    } catch (error) {
      console.error('SOS Error:', error);
      setLocationError(error.message);
      toast.error(
        <div>
          <p className="font-semibold">Emergency alert failed</p>
          <p>{error.message}</p>
          {error.message.includes('location') && (
            <p className="text-sm mt-1">Please check your internet connection</p>
          )}
        </div>,
        { autoClose: false }
      );
    } finally {
      setShowLoader(false);
    }
  };

  const testLocation = async () => {
    toast.info('Testing location access...');
    try {
      const location = await getLocation();
      toast.success(
        <div>
          <p>Location test successful!</p>
          <p className="text-sm mt-1">
            Method: {location.method.toUpperCase()}
            <br />
            Accuracy: ~{Math.round(location.accuracy / 1000)}km
          </p>
        </div>
      );
    } catch (error) {
      toast.error(`Location test failed: ${error.message}`);
    }
  };


  return (
    <div className="w-full p-2 bg-slate-50">

      {locationMethod && (
        <div className={`p-2 mb-2 text-center ${locationMethod === 'gps' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
          {locationMethod === 'gps' ? (
            'Using precise GPS location'
          ) : (
            'Using approximate IP-based location'
          )}
        </div>
      )}

      {locationError && (
        <div className="p-2 mb-2 bg-red-100 text-red-800 text-center">
          {locationError}
        </div>
      )}

      <div className="w-full h-[40vh] p-2 flex items-center justify-center " onClick={handleSOS}>
        <SOSButton />
      </div>
      <div className='w-full p-2 flex items-center justify-center'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            testLocation();
          }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
        >
          Test Location
        </button>
      </div>


      <div className="w-full p-4">
        <h1 className="text-gray-900 text-xl font-bold md:text-2xl">Emergency Contacts</h1>
        <div className="w-full flex flex-col gap-3 mt-4 md:flex-row md:flex-wrap md:justify-center md:items-center">
          {contactsdata.length > 0 ? (
            contactsdata.map((contact, index) => (
              <div
                key={index}
                className="w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md border flex items-center gap-4 md:w-[30%] justify-between md:gap-2"
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
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="w-10 h-10 rounded-lg border-none hover:text-red-400"
                >
                  <CircleX className="h-6 w-6" />
                </button>
              </div>
            ))
          ) : (
            <h1 className="text-gray-700 font-bold">No Contacts Found</h1>
          )}
        </div>
      </div>

      <div className="w-full p-4 flex items-center justify-center flex-col">
        <button
          className="text-red-400 font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg border hover:border-red-300"
          onClick={() => setShowAddContact(true)}
          disabled={contactsdata.length >= 3}
        >
          <Plus className="w-5 h-5" />
          Add New Contact
        </button>
        {contactsdata.length >= 3 && (
          <span className="text-red-700 text-center">
            You Can Add Maximum 3 Contacts
          </span>
        )}
      </div>

      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <Loader />
        </div>
      )}

      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
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
                  <label className="block text-sm font-medium">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
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
                  <label className="block text-sm font-medium">
                    Contact Number
                  </label>
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