import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Config } from '../../API/Config';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit } = useForm()
    const [errors, setErrors] = useState("");



    const Submit = async (data) => {
        setErrors("")
        try {
            const response = await axios.post(Config.LOGINUrl , {
                email: data.email,
                password: data.password
            })
            if (response) {
                console.log(response.data)
            }
        } catch (error) {
            setErrors(error.message)
        }


    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="mb-8 text-center">
                    <img className="h-12 mx-auto mb-4" src="/logo.svg" alt="Logo" />
                    <h1 className="text-2xl font-bold text-black mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Please enter your details to sign in</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(Submit)} className="bg-white rounded-lg border-2 border-dotted border-black p-6 space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:border-black transition-colors duration-300`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                {...register("password", {
                                    required: true,
                                    maxLength: 20
                                })}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:border-black transition-colors duration-300`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {errors && (
                            <p className="mt-1 text-sm text-red-500">{errors}</p>
                        )}
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a
                            href="/forgot-password"
                            className="text-sm text-gray-600 hover:text-black transition-colors duration-300"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-lg py-2.5 font-semibold hover:bg-gray-800 transition-colors duration-300"
                    >
                        Sign In
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a
                            href="/signup"
                            className="font-semibold text-black hover:underline"
                        >
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;