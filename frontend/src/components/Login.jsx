import React, { useEffect, useState } from 'react';
import Vector from "../assets/4957136.jpg";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({});
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

    useEffect(() => {
        if (auth) {
            setPopupMessage('Login successfully');
            setTimeout(() => {
                navigate("/");
            }, 1000); // Navigate after 1 second to show the message
        } else if (error) {
            setPopupMessage('Incorrect data');
        }
    }, [auth, error, navigate]);

    return (
        <div className='min-h-screen flex justify-center items-center p-4'>
            <div className='bg-white w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-xl'>
                <div className='md:w-1/2'>
                    <img src={Vector} alt="Login Vector" className='w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none' />
                </div>
                <div className='md:w-1/2 flex justify-center'>
                    <div className='w-full p-4 md:p-8 flex flex-col justify-center'>
                        <h1 className='text-center text-2xl font-semibold mb-4'>Welcome Back! Login</h1>
                        <form onSubmit={handleSubmit} className='w-full'>
                            <div className='my-4 w-full'>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        placeholder='Email'
                                        required
                                        className='block p-2 my-2 outline-none border rounded w-full'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        placeholder='Password'
                                        required
                                        className='block p-2 outline-none border rounded w-full'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-full'>
                                    <button
                                        type='submit'
                                        className='p-2 bg-blue-600 w-full active:bg-blue-800 rounded text-white py-1 my-4'
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className='text-center'>
                            <p className='text-gray-600'>
                                Don't have an account?{' '}
                                <Link to="/signup" className='text-blue-600 hover:underline'>
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                        {popupMessage && (
                            <div className='fixed top-0 left-0 right-0 flex justify-center mt-4'>
                                <div className='bg-white p-4 rounded shadow-lg text-center w-4/5 md:w-1/3'>
                                    <p className='text-lg font-semibold'>{popupMessage}</p>
                                    <button onClick={() => setPopupMessage('')} className='mt-4 p-2 bg-blue-600 text-white rounded'>
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
