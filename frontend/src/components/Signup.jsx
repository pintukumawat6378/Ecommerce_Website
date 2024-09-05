import React, { useState } from 'react';
import Vector from "../assets/4957136.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("contactNumber", formData.contactNumber);
        data.append("userImage", formData.userImage);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/users/signup`, data);
            if (response.status === 201) {
                setSuccessMessage("Successfully signed up!");
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center p-4'>
            <div className='bg-white w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-xl'>
                <div className='md:w-1/2'>
                    <img src={Vector} alt="" className='w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none' />
                </div>
                <div className='md:w-1/2 flex justify-center'>
                    <div className='w-full p-4 md:p-8 flex flex-col justify-center'>
                        {successMessage && (
                            <div className='bg-green-100 text-green-700 border border-green-400 p-4 rounded mb-4 text-center'>
                                {successMessage}
                            </div>
                        )}
                        <h1 className='text-center text-2xl font-semibold mb-4'>Welcome! Signup</h1>
                        <form onSubmit={handleSubmit} className='w-full'>
                            <div className='my-5 w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <div>
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" name='firstName' required placeholder='First Name' className='block p-2 my-2 outline-none border rounded w-full' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" name='lastName' required placeholder='Last Name' className='block p-2 my-2 outline-none border rounded w-full' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name='email' required placeholder='Email' className='block p-2 my-2 outline-none border rounded w-full' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name='password' required placeholder='Password' className='block p-2 outline-none border rounded my-2 w-full' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="contactNumber">Contact No.</label>
                                    <input type="number" name='contactNumber' required placeholder='Contact No.' className='block p-2 outline-none border rounded my-2 w-full' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="userImage">Profile Pic</label>
                                    <input type="file" name='userImage' className='block p-2 text-xs outline-none border rounded my-2 w-full' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='w-full'>
                                <button type='submit' className='p-2 bg-blue-600 w-full active:bg-blue-800 rounded text-white py-1 my-4'>Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
