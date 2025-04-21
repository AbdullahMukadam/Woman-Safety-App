import { useContext, useEffect, useState } from 'react';
import SOSButton from '../SOSButton';
import { Plus, X, CircleX } from 'lucide-react';
import BottomNav from './BottomNav';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../../API/CustomApi';
import { Config } from '../../../API/Config';
import Loader from './Loader';
import { toast } from 'react-toastify';

function AfterLogin() {
  const [showAddContact, setShowAddContact] = useState(false);
  const { handleSubmit, register } = useForm();
  const { user, setUser } = useContext(AuthContext);
  const [contactsdata, setContactsdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [MobileNo, setMobileNo] = useState([]);
  const [locationDenied, setLocationDenied] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    setContactsdata(Array.isArray(user?.contacts) ? user.contacts : []);
    setMobileNo(Array.isArray(user?.contacts) ? user.contacts : []);
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
        toast.success('Contact added successfully!');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Failed to add contact. Please try again.');
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
        setContactsdata((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactId)
        );
        toast.success('Contact deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact. Please try again.');
    } finally {
      setShowLoader(false);
    }
  };

  const checkLocationSupport = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return false;
    }
    return true;
  };

  const getChromeLocationInstructions = () => {
    return (
      <div>
        <p className="font-bold">Chrome Location Settings:</p>
        <ol className="list-decimal pl-5">
          <li>Click the lock icon in the address bar</li>
          <li>Select Site settings</li>
          <li>Scroll to Location</li>
          <li>Change to Allow</li>
          <li>Refresh this page</li>
        </ol>
        <p className="mt-2">Alternatively: Chrome Settings → Privacy and security → Site Settings → Location</p>
      </div>
    );
  };

  const getPositionWithTimeout = (options) => {
    return new Promise((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        reject(new Error('Location request timed out'));
      }, options.timeout || 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutTimer);
          resolve(position);
        },
        (error) => {
          clearTimeout(timeoutTimer);
          reject(error);
        },
        options
      );
    });
  };

  const handleSOS = async () => {
    if (!checkLocationSupport()) return;

    setShowLoader(true);
    setLocationError(null);
    setLocationDenied(false);

    try {
      // Check if we're in production and using HTTPS
      if (window.location.protocol !== 'https:') {
        throw new Error('Location access requires HTTPS in production');
      }

      // First try high accuracy with short timeout
      let position;
      try {
        position = await getPositionWithTimeout({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
        console.log('High accuracy position:', position);
      } catch (highAccuracyError) {
        console.log('Falling back to standard accuracy');
        position = await getPositionWithTimeout({
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 30000
        });
      }

      const { latitude, longitude, accuracy } = position.coords;
      console.log(`Location obtained - Lat: ${latitude}, Long: ${longitude}, Accuracy: ${accuracy}m`);

      if (accuracy > 10000) { // 10km accuracy threshold
        const confirm = window.confirm(
          `Your location accuracy is only about ${Math.round(accuracy / 1000)} km. Continue anyway?`
        );
        if (!confirm) {
          throw new Error('User declined low accuracy location');
        }
      }

      if (MobileNo.length === 0) {
        throw new Error('No emergency contacts available');
      }

      const response = await api.post(Config.EMERGENCYUrl, {
        contactNumbers: MobileNo.map(contact => contact.MobileNo),
        location: { latitude, longitude }
      });

      toast.success('Emergency alert sent successfully!');
      console.log('Emergency response:', response.data);

    } catch (error) {
      console.error('SOS Error:', error);
      setLocationError(error.message);

      if (error.code === 1 || error.message.includes('denied')) {
        setLocationDenied(true);
        toast.error(
          <div>
            <p>Location access was denied. Please enable it:</p>
            {getChromeLocationInstructions()}
          </div>,
          { autoClose: false }
        );
      } else if (error.code === 2 || error.message.includes('unavailable')) {
        toast.error('Location unavailable. Please check your network connection and try again.');
      } else if (error.code === 3 || error.message.includes('time')) {
        toast.error('Location request timed out. Please try again in an area with better signal.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setShowLoader(false);
    }
  };

  const testLocation = () => {
    if (!checkLocationSupport()) return;

    toast.info('Testing location access...', { autoClose: 3000 });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const accuracyKm = Math.round(accuracy / 1000);

        console.log('Test location result:', {
          latitude,
          longitude,
          accuracy,
          timestamp: new Date(position.timestamp)
        });

        if (accuracy < 100) {
          toast.success(`Location test successful! Accuracy: ${accuracy}m`);
        } else if (accuracy < 1000) {
          toast.warning(`Location test: Moderate accuracy (${accuracy}m)`);
        } else {
          toast.warning(`Location test: Low accuracy (${accuracyKm} km)`);
        }
      },
      (error) => {
        console.error('Location test error:', error);
        if (error.code === 1) {
          setLocationDenied(true);
          toast.error(
            <div>
              <p>Location access denied in test. Please enable it:</p>
              {getChromeLocationInstructions()}
            </div>,
            { autoClose: false }
          );
        } else if (error.code === 2) {
          toast.error('Location unavailable during test. Are you offline?');
        } else if (error.code === 3) {
          toast.error('Location test timed out. Please try again.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="w-full p-2 bg-slate-50 min-h-screen">
      {locationDenied && (
        <div className="w-full p-4 bg-red-100 border-l-4 border-red-500 text-red-700 mb-4">
          <h3 className="font-bold">Location Access Required</h3>
          {getChromeLocationInstructions()}
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Refresh After Changing Settings
          </button>
        </div>
      )}

      {locationError && !locationDenied && (
        <div className="w-full p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-4">
          <h3 className="font-bold">Location Error</h3>
          <p>{locationError}</p>
          <button
            onClick={testLocation}
            className="mt-2 px-4 py-1 bg-yellow-600 text-white rounded text-sm"
          >
            Test Again
          </button>
        </div>
      )}

      <div className="w-full h-[40vh] p-2 flex items-center justify-center flex-col">
        <div onClick={handleSOS} className="cursor-pointer">
          <SOSButton />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            testLocation();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
        >
          Test Location Access
        </button>
      </div>

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
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-gray-700 font-bold truncate">{contact.name}</h2>
                  <h3 className="text-gray-500 truncate">{contact.MobileNo}</h3>
                </div>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="w-10 h-10 rounded-lg border-none hover:text-red-400 transition-colors"
                  aria-label="Delete contact"
                >
                  <CircleX className="h-6 w-6" />
                </button>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8">
              <h1 className="text-gray-700 font-bold">No Contacts Found</h1>
              <p className="text-gray-500 mt-2">Add emergency contacts to use the SOS feature</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full p-4 flex items-center justify-center flex-col">
        <button
          className={`text-red-400 font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg border hover:border-red-300 transition-colors ${contactsdata.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => setShowAddContact(true)}
          disabled={contactsdata.length >= 3}
        >
          <Plus className="w-5 h-5" />
          Add New Contact
        </button>
        {contactsdata.length >= 3 && (
          <span className="text-red-700 text-center mt-2">
            You can add maximum 3 contacts
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
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Add New Contact</h2>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(Submit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    {...register('photo', { required: true })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('name', { required: true })}
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('MobileNo', {
                      required: true,
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Please enter a valid phone number"
                      }
                    })}
                    placeholder="Phone number"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddContact(false)}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {showLoader ? 'Adding...' : 'Add Contact'}
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