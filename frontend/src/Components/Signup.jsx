import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Config } from '../../API/Config';
import { Button } from "@/components/ui/button";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("")
    const { register, handleSubmit } = useForm()
    const [errors, setErrors] = useState("");

    const Submit = async (data) => {
        setErrors("")
        try {          
            if (data.password !== password) {
                setErrors("Password Doesn't match")
            } else {
                const response = await axios.post(Config.SignUPUrl, {
                    username: data.userName,
                    email: data.email,
                    password: data.password
                })
                if (response) {
                    console.log(response.data)
                }
            }
        } catch (error) {
            setErrors(error.message)
        }
    };

    const handleGoogleSignup = () => {
        // Implement Google OAuth login logic here
        console.log("Google signup clicked");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="mb-8 text-center">
                    <img className="h-12 mx-auto mb-4" src="/logo.svg" alt="Logo" />
                    <h1 className="text-2xl font-bold text-black mb-2">Create an Account</h1>
                    <p className="text-gray-600">Join us to stay safe and connected</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit(Submit)} className="bg-white rounded-lg border-2 border-dotted border-black p-6 space-y-4">
                    {/* Google Sign Up Button */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 hover:bg-gray-50"
                        onClick={handleGoogleSignup}
                    >
                        <img 
                            src="/api/placeholder/20/20"
                            alt="Google logo"
                            className="w-5 h-5"
                        />
                        Sign up with Google
                    </Button>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className='w-full'>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            className={`w-full px-3 py-2 rounded-lg border ${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors duration-300`}
                            {...register("userName", {
                                required: "Username is Required",
                                maxLength: 20
                            })}
                            placeholder="Enter Your Username"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full px-3 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors duration-300`}
                            placeholder="john.doe@example.com"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className={`w-full px-3 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors duration-300`}
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: true,
                                        maxLength: 20
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-3 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors duration-300`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            {errors && (
                                <p className="mt-1 text-sm text-red-500">{errors}</p>
                            )}
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                            I agree to the{' '}
                            <a href="/terms" className="text-black hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-black hover:underline">Privacy Policy</a>
                        </label>
                    </div>
                    {errors.agreeToTerms && (
                        <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-lg py-2.5 font-semibold hover:bg-gray-800 transition-colors duration-300"
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="font-semibold text-black hover:underline"
                        >
                            Sign in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;