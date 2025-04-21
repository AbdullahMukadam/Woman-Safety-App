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

  /* const checkLocationSupport = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return false;
    }
    return true;
  }; */

  const handleSOS = async () => {
    // Clear any previous error states
    setShowLoader(true);
    console.log("Starting SOS sequence...");

    try {
      // First, check permission explicitly before proceeding
      console.log("Checking geolocation permission...");
      let permissionStatus;

      try {
        permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        console.log("Permission status:", permissionStatus.state);
      } catch (permError) {
        console.error("Error checking permission:", permError);
        // Some browsers might not support permissions API
      }

      // Only explicitly block if we're certain permission is denied
      if (permissionStatus && permissionStatus.state === 'denied') {
        console.log("Permission explicitly denied");
        alert("Location access is denied. Please enable location in your browser settings.");
        setShowLoader(false);
        return;
      }

      // Try getting location regardless of what the permission API says
      console.log("Requesting current position...");
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log("Position obtained with accuracy:", pos.coords.accuracy, "meters");
            resolve(pos);
          },
          (err) => {
            console.error("Geolocation error code:", err.code, "message:", err.message);
            reject(err);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });

      // If we get here, we successfully got location
      const { latitude, longitude, accuracy } = position.coords;
      console.log(`Location: ${latitude}, ${longitude} (accuracy: ${accuracy}m)`);

      // Check accuracy but don't prevent sending alert
      if (accuracy > 100000) {
        console.warn("Low accuracy warning:", accuracy);
        toast("Warning: Your location accuracy is very low. Emergency contacts will receive approximate location only.");
      } else if (accuracy > 10000) {
        console.warn("Moderate accuracy warning:", accuracy);
        toast("Your location accuracy is moderate. For better results, try moving outdoors.");
      }

      // Send emergency alert regardless of accuracy
      const contactNumbers = MobileNo.map(contact => contact.MobileNo);
      console.log("Sending emergency alert to:", contactNumbers);

      const response = await api.post(Config.EMERGENCYUrl, {
        contactNumbers,
        location: { latitude, longitude }
      });

      if (response.status === 200) {
        toast("Emergency alert sent successfully!");
      }

    } catch (error) {
      console.error("Full error details:", error);

      // Simplify error handling
      if (error.code === 1) {
        toast("Location permission denied. Please enable location access in your browser settings.");
      } else if (error.code === 2) {
        toast("Location unavailable. Please try again in a different area.");
      } else if (error.code === 3) {
        toast("Location request timed out. Please try again.");
      } else {
        toast(`Error: ${error.message || "Unknown error occurred"}`);
      }
    } finally {
      setShowLoader(false);
    }
  };

  const testLocation = () => {
    let isHandled = false;

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
