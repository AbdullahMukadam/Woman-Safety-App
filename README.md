Overview:
The Women's Safety Web App is a full-stack platform designed to provide real-time protection and support to individuals during emergency situations. Built with a mission to enhance safety, the application empowers users to send SOS alerts, live locations, manage emergency contacts, and review safe or unsafe areas based on personal experiences.

📚 Key Features

1. 🚨 Emergency SOS Alerts
Users can quickly trigger an SOS button to send real-time alerts.

Instantly shares the current location with registered emergency contacts.

Ensures immediate help is notified in dangerous situations.

2. 📍 Location Tracking
Integrated with Leaflet.js to provide live map tracking.

Users can monitor their real-time location within the application.

3. 🔒 User Authentication
Secure authentication system using JWT Tokens.

Support for Google Sign-In via Clerk/Auth0 integration.

Ensures only verified users can access sensitive features.

4. 📂 Cloud Storage for Images
Users can upload profile photos and emergency contact images using Multer and Cloudinary.

Cloud storage ensures images are safely managed and accessible from anywhere.

5. 👥 Emergency Contacts Management
Users can add, edit, or delete trusted contacts.

Contacts are stored securely and linked to the user's account.

A maximum limit (e.g., 3 contacts) ensures simplicity during emergencies.

6. 📝 Review and Rate Locations
Community-driven feature to share reviews about the safety of public places.

Helps others identify safe zones and potential risk areas based on user feedback.

Locations and reviews are stored securely in the database.

7. 📧 Real-time Notifications
Users and emergency contacts receive real-time notifications during critical activities like sending an SOS or updating location.

⚙️ How It Works (User Flow)

Sign Up / Login:
Users authenticate using email/password or Google account.

Set Up Profile:
Users upload their profile photo and add emergency contacts.

Home Dashboard:
A visible SOS Button is present for quick emergency response.

Send SOS:
On clicking, location and alert messages are sent to emergency contacts.

Track Location:
The map updates the user's live position using geolocation APIs.

Review Areas:
After visiting a location, users can leave reviews marking it safe/unsafe.

Logout or Manage Settings:
Users can securely log out, update their profile, or manage their contacts.

📈 Impact and Importance

Promotes women’s empowerment by giving them direct tools for their safety.

Builds a community-driven safety network through review sharing.

Supports faster emergency response by integrating real-time location services.

Creates awareness and helps authorities identify high-risk areas.

Addresses social responsibility through tech-driven solutions.

🚀 Future Enhancements (Optional Ideas)

Integration of emergency calling directly from the web app.

AI-based threat detection by analyzing unsafe locations' patterns.

Offline SOS mode (store alert and send once internet reconnects).

Push notifications for immediate alerts even if app is minimized.

📜 Conclusion

The Women's Safety Web App is a purposeful, tech-driven initiative that blends real-time location tracking, secure communications, and community-driven insights to foster a safer environment. With an intuitive interface and scalable design, it represents a modern step toward leveraging technology for public welfare and safety.  
