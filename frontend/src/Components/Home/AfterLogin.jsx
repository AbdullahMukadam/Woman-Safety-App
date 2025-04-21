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

  // Helper function for getting position with promise
  const getPositionPromise = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // Detect browser name for specific instructions
  const detectBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('chrome') > -1) return 'chrome';
    if (userAgent.indexOf('firefox') > -1) return 'firefox';
    if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) return 'safari';
    if (userAgent.indexOf('edge') > -1) return 'edge';

    return 'unknown';
  };

  // Get browser-specific instructions
  const getLocationInstructions = () => {
    const browser = detectBrowser();

    switch (browser) {
      case 'chrome':
        return 'Chrome: Settings > Privacy & Security > Site Settings > Location';
      case 'firefox':
        return 'Firefox: Settings > Privacy & Security > Permissions > Location';
      case 'safari':
        return 'Safari: Settings > Privacy > Location Services';
      case 'edge':
        return 'Edge: Settings > Cookies and site permissions > Location';
      default:
        return 'Browser settings > Privacy/Security > Location permissions';
    }
  };

  const handleSOS = async () => {
    if (!checkLocationSupport()) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setShowLoader(true);
    console.log("Starting SOS sequence...");

    let position = null;
    let permissionGranted = false;

    try {
      // Check for secure context
      if (!window.isSecureContext && window.location.hostname !== 'localhost') {
        toast.error('For security reasons, location access requires HTTPS');
        throw new Error('Geolocation requires HTTPS or localhost');
      }

      // Check permission status
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        console.log("Permission API says:", permissionStatus.state);
        permissionGranted = permissionStatus.state === 'granted';

        if (permissionStatus.state === 'denied') {
          setLocationDenied(true);
          const instructions = getLocationInstructions();
          toast.error(
            `Location access is denied. Please enable location in your browser settings: ${instructions}`,
            { autoClose: false }
          );
          throw new Error('Location permission denied');
        }
      } catch (permError) {
        console.log("Permission API error:", permError);
        // Continue anyway as some browsers don't support the permissions API
      }

      // First try high accuracy
      try {
        console.log("Requesting position with high accuracy...");
        position = await getPositionPromise({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
        console.log("Position received, accuracy:", position.coords.accuracy);
      } catch (highAccError) {
        console.error("High accuracy position error:", highAccError);

        // If permission denied, handle specially
        if (highAccError.code === 1) {
          setLocationDenied(true);
          const instructions = getLocationInstructions();
          toast.error(
            `Location access denied despite permission API. Please check ${instructions}`,
            { autoClose: false }
          );
          throw highAccError;
        }

        // Otherwise try with low accuracy
        console.log("Trying with low accuracy...");
        try {
          position = await getPositionPromise({
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0
          });
          console.log("Low accuracy position received, accuracy:", position.coords.accuracy);
        } catch (lowAccError) {
          console.error("Both location methods failed");
          throw highAccError; // Throw original error
        }
      }

      // Check if accuracy is too low
      if (position && position.coords.accuracy > 100000) {
        console.warn("Very low accuracy:", position.coords.accuracy);

        if (window.confirm(
          "Your location accuracy is very low (approximate location only). " +
          "This could be because precise location is disabled. " +
          "Click OK to continue with approximate location, or Cancel to fix settings and try again."
        )) {
          console.log("User accepted low accuracy");
          // Continue with low accuracy
        } else {
          throw new Error("User rejected low accuracy location");
        }
      }

      // We have a usable position
      if (position) {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`Using location: ${latitude}, ${longitude} (accuracy: ${accuracy}m)`);

        // Send emergency alert
        const contactNumbers = MobileNo.map(contact => contact.MobileNo);

        if (contactNumbers.length === 0) {
          toast.warning("No emergency contacts found. Please add contacts first.");
          throw new Error("No emergency contacts");
        }

        const response = await api.post(Config.EMERGENCYUrl, {
          contactNumbers,
          location: { latitude, longitude }
        });

        if (response.status === 200) {
          toast.success("Emergency alert sent successfully!");
          console.log('SMS results:', response.data.results);
        }
      }
    } catch (error) {
      console.error("Final error:", error);

      // Handle specific error codes
      if (error.code === 1) {
        const instructions = getLocationInstructions();
        alert(`Location permission denied. Please enable location access:\n\n${instructions}\n\nAfter changing settings, refresh this page.`);
        setLocationDenied(true);
      } else if (error.code === 2) {
        toast.error("Could not determine your location. Please try again in an open area.");
      } else if (error.code === 3) {
        toast.error("Location request timed out. Please try again.");
      } else {
        toast.error(`Error: ${error.message || "Unknown error occurred"}`);
      }
    } finally {
      setShowLoader(false);
    }
  };

  // Test location function
  const testLocation = () => {
    if (!checkLocationSupport()) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    toast.info("Testing location access...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        if (accuracy > 100000) {
          toast.warning(`Location test: Got very low accuracy (${Math.round(accuracy / 1000)} km)`);
        } else if (accuracy > 10000) {
          toast.warning(`Location test: Got moderate accuracy (${Math.round(accuracy / 1000)} km)`);
        } else {
          toast.success(`Location test successful! Accuracy: ${Math.round(accuracy)} meters`);
        }

        console.log('Location test details:', {
          latitude, longitude, accuracy,
          timestamp: new Date(position.timestamp).toISOString()
        });
      },
      (error) => {
        console.error('Location test error:', error);

        if (error.code === 1) {
          toast.error('Location access denied in test');
          setLocationDenied(true);
        } else if (error.code === 2) {
          toast.error('Location unavailable in test');
        } else if (error.code === 3) {
          toast.error('Location test timed out');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="w-full p-2 bg-slate-50">
      {locationDenied && (
        <div className="w-full p-4 bg-red-100 border-l-4 border-red-500 text-red-700 mb-4">
          <h3 className="font-bold">Location Access Denied</h3>
          <p className="mb-2">This app needs location access to send your coordinates during emergencies.</p>
          <p className="text-sm font-bold">How to enable location:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Chrome: Settings → Privacy and security → Site Settings → Location</li>
            <li>Firefox: Settings → Privacy & Security → Permissions → Location</li>
            <li>Safari: Preferences → Privacy → Location Services</li>
            <li>Mobile: Check your device settings for app permissions</li>
          </ul>
          <p className="mt-2 text-sm">After enabling, refresh this page and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-1 bg-red-600 text-white text-sm rounded"
          >
            Refresh Page
          </button>
        </div>
      )}

      <div className="w-full h-[40vh] p-2 flex items-center justify-center flex-col" onClick={handleSOS}>
        <SOSButton />
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent's onClick
            testLocation();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
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