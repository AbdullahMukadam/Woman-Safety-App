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

function AfterLogin() {
  const [showAddContact, setShowAddContact] = useState(false);
  const { handleSubmit, register } = useForm();
  const { user, setUser } = useContext(AuthContext);
  const [contactsdata, setContactsdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [MobileNo, setMobileNo] = useState([])

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

  const checkLocationSupport = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return false;
    }
    return true;
  };

  const handleSOS = async () => {
    if (!checkLocationSupport()) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setShowLoader(true);
    try {
      // First check if we're in a secure context
      if (!window.isSecureContext && window.location.hostname !== 'localhost') {
        throw new Error('Geolocation requires HTTPS or localhost');
      }

      // Check and log permission status
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      console.log('Initial permission status:', permissionStatus.state);

      // If permission is denied, show instructions
      if (permissionStatus.state === 'denied') {
        alert('Please enable location access in your browser settings and try again');
        console.log('Please enable location in your browser settings:',
          '\nChrome: Settings > Privacy and security > Site Settings > Location',
          '\nFirefox: Settings > Privacy & Security > Permissions > Location',
          '\nSafari: Preferences > Privacy > Location Services');
        setShowLoader(false);
        return;
      }

      // Get position with timeout
      const position = await new Promise((resolve, reject) => {
        // Set a timeout for the geolocation request
        const timeoutId = setTimeout(() => {
          reject(new Error('Location request timed out'));
        }, 10000);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            clearTimeout(timeoutId);
            console.log('Position successfully received:', {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
            resolve(position);
          },
          (error) => {
            clearTimeout(timeoutId);
            console.log('Detailed error information:', {
              code: error.code,
              message: error.message,
              PERMISSION_DENIED: error.code === 1,
              POSITION_UNAVAILABLE: error.code === 2,
              TIMEOUT: error.code === 3
            });
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });

      const { latitude, longitude } = position.coords;

      // Prepare contact numbers
      const contactNumbers = MobileNo.map(contact => contact.MobileNo);

      // Log the data being sent
      console.log('Sending emergency data:', {
        contactNumbers,
        location: { latitude, longitude }
      });

      // Make API call
      const response = await api.post(Config.EMERGENCYUrl, {
        contactNumbers,
        location: { latitude, longitude }
      });

      if (response.status === 200) {
        console.log('Emergency alert sent successfully:', response.data);
        alert('Emergency alert sent successfully');
        console.log('SMS results:', response.data.results);
      }

    } catch (error) {
      console.error('Full error object:', error);

      let errorMessage = 'An unexpected error occurred';

      if (error.code === 1) {
        errorMessage = 'Location access was denied. Please enable location services and try again.';
      } else if (error.code === 2) {
        errorMessage = 'Location is currently unavailable. Please try again.';
      } else if (error.code === 3) {
        errorMessage = 'Location request timed out. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('Error message:', errorMessage);
      alert(errorMessage);
    } finally {
      setShowLoader(false);
    }
  };

  const testLocation = () => {
    let isHandled = false;  // Flag to prevent multiple callbacks
  
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser');
      return;
    }
  
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isHandled) return;
          isHandled = true;
  
          console.log('Location test successful:', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString()
          });
          alert('Location test successful! Check console for details.');
        },
        (error) => {
          if (isHandled) return;
          isHandled = true;
  
          console.error('Location test error:', {
            code: error.code,
            message: error.message,
            timestamp: new Date().toISOString()
          });
          alert(`Location test failed: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } catch (e) {
      console.error('Unexpected error during location test:', e);
    }
  };


  return (
    <div className="w-full p-2 bg-slate-50">
      <div className="w-full h-[40vh] p-2 flex items-center justify-center " onClick={handleSOS}>
        <SOSButton />
      </div>
      {/* <button onClick={testLocation} className="your-button-class">
        Test Location Access
      </button> */}

      <div className="w-full p-4">
        <h1 className="text-gray-900 text-2xl font-bold">Emergency Contacts</h1>
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
