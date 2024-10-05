import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Config } from '../../API/Config';
import { useGoogleLogin } from "@react-oauth/google"
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState("");
    const {setAuth} = useContext(AuthContext)
    const {auth} = useContext(AuthContext)

    const Submit = async (data) => {
        setErrors("");
        try {
            if (data.password !== password) {
                setErrors("Password Doesn't match");
                return;
            }

            setIsLoading(true);
            const response = await axios.post(Config.SignUPUrl, {
                username: data.userName,
                email: data.email,
                password: data.password
            });

            if (response.data) {
                // Handle successful signup
                console.log("Signup successful:", response.data);
                setAuth(true)
                console.log("normal auth status :", auth)
                // Redirect or show success message
            }
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            setIsLoading(true);
            // Get user info from Google
            const userInfoResponse = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                }
            );

            const googleUser = userInfoResponse.data;

            // Send the Google user data to your backend
            const response = await axios.post(Config.GoogleSignUpUrl, {
                email: googleUser.email,
                googleId: googleUser.sub,
                name: googleUser.name,
                picture: googleUser.picture
            });

            if (response.data) {
                // Handle successful Google signup
                console.log("Google signup successful:", response.data);
                setAuth(true)
                console.log("google autn status : " , auth)
                // Store the token, redirect, etc.
            }
        } catch (error) {
            setErrors("Google signup failed: " + (error.response?.data?.message || error.message));
            console.error("Google signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: (error) => {
            console.error("Google login error:", error);
            setErrors("Google signup failed. Please try again.");
        },
        scope: "email profile",
    });

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
                    <button
                        type="button"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 hover:bg-gray-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => handleGoogleSignup()}
                    >
                        <img
                            src="/google.jfif"
                            alt="Google logo"
                            className="w-5 h-5"
                        />
                        {isLoading ? 'Loading...' : 'Sign up with Google'}
                    </button>

                    {errors && (
                        <div className="text-red-500 text-sm text-center">
                            {errors}
                        </div>
                    )}

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