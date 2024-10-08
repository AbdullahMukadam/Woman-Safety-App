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




function Settings() {
    const userEmail = "john.doe@example.com"
    const username = "John Doe"
    const phoneNumber = "+1 234 567 8900"

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
                        value={username}
                        onClick={() => {/* Handle username change */ }}
                    />
                    <MenuItem
                        icon={Mail}
                        label="Email"
                        value={userEmail}
                        onClick={() => {/* Handle email change */ }}
                    />
                    <MenuItem
                        icon={Phone}
                        label="Phone Number"
                        value={phoneNumber}
                        onClick={() => {/* Handle phone change */ }}
                    />
                    <MenuItem
                        icon={Lock}
                        label="Change Password"
                        onClick={() => {/* Handle password change */ }}
                    />
                </SettingsSection>

                {/* Notifications */}
                <SettingsSection title="Notifications">
                    <ToggleItem
                        icon={Bell}
                        label="Push Notifications"
                        enabled={true}
                        onToggle={() => {/* Handle toggle */ }}
                    />
                    <ToggleItem
                        icon={Bell}
                        label="Email Notifications"
                        enabled={false}
                        onToggle={() => {/* Handle toggle */ }}
                    />
                </SettingsSection>

                {/* Preferences */}
                <SettingsSection title="Preferences">
                    <ToggleItem
                        icon={Moon}
                        label="Dark Mode"
                        enabled={false}
                        onToggle={() => {/* Handle toggle */ }}
                    />
                    <MenuItem
                        icon={Languages}
                        label="Language"
                        value="English"
                        onClick={() => {/* Handle language change */ }}
                    />
                </SettingsSection>

                {/* Help & Support */}
                <SettingsSection title="Help & Support">
                    <MenuItem
                        icon={HelpCircle}
                        label="FAQs"
                        onClick={() => {/* Handle FAQ navigation */ }}
                    />
                    <MenuItem
                        icon={HelpCircle}
                        label="Contact Support"
                        onClick={() => {/* Handle support contact */ }}
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