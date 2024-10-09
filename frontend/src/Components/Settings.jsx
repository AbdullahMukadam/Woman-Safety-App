import {
    ChevronLeft,
    User,
    Mail,
    Phone,
    Bell,
    Lock,
    Moon,
    Languages,
    HelpCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'
import SettingsSection from './SettingsSection'
import ToggleItem from './ToggleItem'
import { useState } from 'react'

// API functions
const updateUserField = async (field, value) => {
    try {
        const response = await fetch('/api/user/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                field,
                value
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error updating user field:', error);
        return { success: false, error: error.message };
    }
};

function Settings() {
    // User data state
    const [username, setUsername] = useState("John Doe")
    const [userEmail, setUserEmail] = useState("john.doe@example.com")
    const [phoneNumber, setPhoneNumber] = useState("+1 234 567 8900")
    const [language, setLanguage] = useState("English")

    // Loading states
    const [loadingStates, setLoadingStates] = useState({
        username: false,
        email: false,
        phone: false,
        language: false
    })

    // Error states
    const [errorStates, setErrorStates] = useState({
        username: '',
        email: '',
        phone: '',
        language: ''
    })

    // Generic handler for updating user fields
    const handleFieldUpdate = async (field, value, localStateSetter) => {
        // Update loading state
        setLoadingStates(prev => ({ ...prev, [field]: true }))
        // Clear previous error
        setErrorStates(prev => ({ ...prev, [field]: '' }))

        const { success, error } = await updateUserField(field, value)

        if (success) {
            // Update local state
            localStateSetter(value)
        } else {
            // Set error state
            setErrorStates(prev => ({ 
                ...prev, 
                [field]: error || 'An error occurred while updating. Please try again.'
            }))
            // You might want to show a toast notification here
        }

        // Clear loading state
        setLoadingStates(prev => ({ ...prev, [field]: false }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
                    <Link to="/profile" className="text-gray-500 hover:text-gray-700">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-4 space-y-6">
                {/* Account Settings */}
                <SettingsSection title="Account Settings">
                    <MenuItem
                        icon={User}
                        label="Username"
                        initialValue={username}
                        onUpdate={(value) => handleFieldUpdate('username', value, setUsername)}
                        isLoading={loadingStates.username}
                        error={errorStates.username}
                    />
                    <MenuItem
                        icon={Mail}
                        label="Email"
                        initialValue={userEmail}
                        onUpdate={(value) => handleFieldUpdate('email', value, setUserEmail)}
                        isLoading={loadingStates.email}
                        error={errorStates.email}
                        validation={(value) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            return emailRegex.test(value) ? '' : 'Please enter a valid email address';
                        }}
                    />
                    <MenuItem
                        icon={Phone}
                        label="Phone Number"
                        initialValue={phoneNumber}
                        onUpdate={(value) => handleFieldUpdate('phone', value, setPhoneNumber)}
                        isLoading={loadingStates.phone}
                        error={errorStates.phone}
                        validation={(value) => {
                            const phoneRegex = /^\+?[\d\s-]{10,}$/;
                            return phoneRegex.test(value) ? '' : 'Please enter a valid phone number';
                        }}
                    />
                    <MenuItem
                        icon={Lock}
                        label="Change Password"
                        onUpdate={() => {
                            // Navigate to password change page
                            console.log('Navigating to password change page');
                        }}
                    />
                </SettingsSection>

                <SettingsSection title="Notifications">
                    <ToggleItem
                        icon={Bell}
                        label="Push Notifications"
                        enabled={true}
                        onToggle={(enabled) => {
                            console.log('Push notifications:', enabled)
                            // Add your push notifications toggle logic here
                        }}
                    />
                    <ToggleItem
                        icon={Bell}
                        label="Email Notifications"
                        enabled={false}
                        onToggle={(enabled) => {
                            console.log('Email notifications:', enabled)
                            // Add your email notifications toggle logic here
                        }}
                    />
                </SettingsSection>

                {/* Preferences */}
                <SettingsSection title="Preferences">
                    <ToggleItem
                        icon={Moon}
                        label="Dark Mode"
                        enabled={false}
                        onToggle={(enabled) => {
                            console.log('Dark mode:', enabled)
                            // Add your dark mode toggle logic here
                        }}
                    />
                    <MenuItem
                        icon={Languages}
                        label="Language"
                        initialValue={language}
                        onUpdate={setLanguage}
                    />
                </SettingsSection>

                {/* Help & Support */}
                <SettingsSection title="Help & Support">
                    <MenuItem
                        icon={HelpCircle}
                        label="FAQs"
                        onUpdate={() => {
                            console.log('Navigating to FAQs page')
                            // Add your FAQ navigation logic here
                        }}
                    />
                    <MenuItem
                        icon={HelpCircle}
                        label="Contact Support"
                        onUpdate={() => {
                            console.log('Navigating to Support page')
                            // Add your support navigation logic here
                        }}
                    />
                </SettingsSection>

                {/* Version Info */}
                <div className="text-center text-sm text-gray-400">
                    Version 1.0.0
                </div>
            </div>
        </div>
    )
}

export default Settings