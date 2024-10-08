import { Home, Map, MessageSquare, User, Edit, LogOut, Star, Settings } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from './Home/BottomNav';

const ProfileSection = ({ title, children }) => (
  <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <h2 className="font-semibold text-gray-700 p-4 border-b border-gray-100">{title}</h2>
    {children}
  </div>
)

const ReviewCard = ({ location, title, review }) => (
  <div className="p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
    <div className="flex items-center flex-col justify-between gap-4 mb-3">
      <span className="font-bold text-gray-900 text-lg">Location: {location}</span>
      <span className="text-md text-gray-800 whitespace-nowrap">Title: {title}</span>
    </div>

    <p className="text-gray-600 leading-relaxed">
      {review}
    </p>
  </div>
)



function Profile() {
  const navigate = useNavigate();
  const reviews = [
    {
      location: "Near Panjiri Mohalla, Mirkarwada Ratnagiri",
      title: "Bad Experience",
      review: "Very helpful and responsive during the emergency situation. Highly recommended!"
    },
    {
      location: "Near Panjiri Mohalla, Mirkarwada Ratnagiri",
      title: "Bad Experience",
      review: "Very helpful and responsive during the emergency situation. Highly recommended!"
    },
    {
      location: "Near Panjiri Mohalla, Mirkarwada Ratnagiri",
      title: "Bad Experience",
      review: "Very helpful and responsive during the emergency situation. Highly recommended!"
    }
  ];
  const handleSettings = ()=>{
    navigate("/settings")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* User Info Section */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative">
          <div className="relative">
            <img
              src="/img1.png"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-red-400 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-gray-500">john.doe@example.com</p>
          </div>
          <div className='absolute top-1 right-1'>
            <button className="absolute top-0 right-0 p-1.5 rounded-full  hover:bg-red-500 transition-colors" onClick={handleSettings}>
              <Settings className="w-5 h-5" onClick={handleSettings}/>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <ProfileSection title="Recent Reviews">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </ProfileSection>

        {/* Logout Button */}
        <button className="w-full bg-red-50 text-red-500 font-semibold py-4 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Navigation Bar */}
      <div className="w-full bg-white shadow-top p-2">
        <BottomNav />
      </div>
    </div>
  )
}

export default Profile