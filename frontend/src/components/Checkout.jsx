import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaAddressCard, FaCity } from 'react-icons/fa';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", 
    "Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    console.log(user)

    //   useEffect(() => {
    //     dispatch(getCartItems(userId));
    //   }, [dispatch, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const orderDetails = {
            userId: user._id,
            customerName: formData.get('customerName'),
            customerContactNumber: formData.get('customerContactNumber'),
            address: `${formData.get('address')},${formData.get("city")},${formData.get("state")}`,
            pinCode: formData.get('pinCode'),
            products: cartItems,
        };
        try {
            const stripe = await loadStripe('pk_test_51PQ23NKhZAmovhQkSKdZwZLJ8t4f7QKqZZ9BLNfT86xtaPAEEp5ICEWuKa1JpEvTXK7lxuHb4sjUk2wZ6FAU0uOX00KiQ8o3k8');
            const body = orderDetails

            const response = await axios.post(`${import.meta.env.VITE_API_URI}/create-checkout-session`, body);
            const result = stripe.redirectToCheckout({
                sessionId: response.data.id
            });
            if (result.error) {
                console.log(error)
            }

        } catch (error) {
            console.log(error);
        }

    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="mb-4">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between p-2 border-b">
                        <div>{item.productName}</div>
                        <div>{item.quantity}</div>
                        <div>${item.productPrice}</div>
                    </div>
                ))}
                <div className="text-right font-bold mt-2">Total: ${totalAmount}</div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center border p-2 rounded">
        <FaUser className="mr-2" />
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          required
          className="flex-1 p-2 border rounded"
        />
      </div>
      <div className="flex items-center border p-2 rounded">
        <FaPhone className="mr-2" />
        <input
          type="text"
          name="customerContactNumber"
          placeholder="Customer Phone Number"
          required
          className="flex-1 p-2 border rounded"
        />
      </div>
      <div className="flex items-center border p-2 rounded">
        <FaAddressCard className="mr-2" />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          className="flex-1 p-2 border rounded"
        />
      </div>
      <div className="flex items-center border p-2 rounded">
        <FaCity className="mr-2" />
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          className="flex-1 p-2 border rounded"
        />
      </div>
      <div className="flex items-center border p-2 rounded">
        <FaCity className="mr-2" />
        <select
          name="state"
          required
          className="flex-1 p-2 border rounded"
          defaultValue=""
        >
          <option value="" disabled>Select State</option>
          {statesOfIndia.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center border p-2 rounded">
        <FaCity className="mr-2" />
        <input
          type="text"
          name="pinCode"
          placeholder="Pin Code"
          required
          className="flex-1 p-2 border rounded"
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </form>
        </div>
    );
};

export default Checkout;
