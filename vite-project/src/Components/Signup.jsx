import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { image } from '../Utils/images';
import { useUserAuth } from './UserContext';
import axios from 'axios'; // Import axios

const SignInRegister = () => {
    const { handleLogin } = useUserAuth();
    const [isSignIn, setIsSignIn] = useState(true);
    const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '' });
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e, setData, data) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    //handling signup
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post("http://localhost:3700/auth/register", signUpData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setSignUpData({ username: '', email: '', password: '' });
            setSuccessMessage('Registration successful! Please sign in.');
            setIsSignIn(true); // Switch to sign-in mode
        } catch (error) {
            setErrorMessage(error.response?.data.message || "Registration failed.");
        }
    };


    //handling signin
    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post("http://localhost:3700/auth/login", signInData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            handleLogin(response.data.token, response.data.email, response.data.username);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('username', response.data.username);
            setSignInData({ email: '', password: '' });
            setSuccessMessage('Login successful!');
        } catch (error) {
            setErrorMessage(error.response?.data.message || "Invalid credentials.");
        }
    };

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 relative">
            <div className="bg-white p-8 mt-10 mb-16 rounded-lg shadow-lg w-full max-w-xs relative">
                <div className="flex flex-col items-center">
                    <img src={image[1].logo} className="w-32 h-24 lg:w-40 lg:h-28" alt="YouTube logo" />
                    <h2 className="text-2xl font-bold text-center mb-6">{isSignIn ? 'Sign In' : 'Register'}</h2>
                </div>

                <form onSubmit={isSignIn ? handleSignInSubmit : handleSignUpSubmit}>
                    {!isSignIn && (
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <span className="p-2 text-gray-500">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={signUpData.username}
                                    onChange={(e) => handleChange(e, setSignUpData, signUpData)}
                                    placeholder="Username"
                                    className="p-2 w-full border-none focus:ring-0"
                                    required
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <span className="p-2 text-gray-500">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={isSignIn ? signInData.email : signUpData.email}
                                onChange={(e) => handleChange(e, isSignIn ? setSignInData : setSignUpData, isSignIn ? signInData : signUpData)}
                                placeholder="Email"
                                className="p-2 w-full border-none focus:ring-0"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <span className="p-2 text-gray-500">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={isSignIn ? signInData.password : signUpData.password}
                                onChange={(e) => handleChange(e, isSignIn ? setSignInData : setSignUpData, isSignIn ? signInData : signUpData)}
                                placeholder="Password"
                                className="p-2 w-full border-none focus:ring-0"
                                required
                            />
                        </div>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        {isSignIn ? 'Sign In' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    {isSignIn ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={toggleForm} className="text-blue-600 hover:underline">
                        {isSignIn ? 'Register here' : 'Sign in here'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignInRegister;
