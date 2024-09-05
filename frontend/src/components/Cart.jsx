import React from 'react';
import Navbar from '../sharedComp/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { remove, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { role, auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(cartItems);

    const handleRemove = (id) => {
        dispatch(remove({ _id: id })); // Ensure the payload is an object with _id property
    };

    const handleIncrease = (id) => {
        dispatch(increaseQuantity({ _id: id })); // Ensure the payload is an object with _id property
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity({ _id: id })); // Ensure the payload is an object with _id property
    };

    const totalSum = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    const handleCheckout = async () => {
        if (auth) {
            if (role === "admin") {
                return alert("Please Login with admin account");
            }
            navigate("/checkout");
        } else {
            alert("Please login first");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <img src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg" alt="Empty Cart" className="mx-auto mb-4 w-1/2" />
                        <h2 className="text-2xl font-semibold">Your cart is empty!</h2>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-4">
                            {cartItems.map((item, i) => (
                                <div key={i} className="flex items-center space-x-4 bg-white shadow-md rounded p-4">
                                    <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`} alt={item.productName} className='w-1/4 rounded' />
                                    <div className="flex flex-1 justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-semibold">{item.productName}</h2>
                                            <p className="text-gray-600">{item.productDesc}</p>
                                            <p className="text-gray-600">Category: {item.productCategory}</p>
                                            <p className="text-lg font-bold">Price: ${item.productPrice}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button onClick={() => handleDecrease(item._id)} className="px-2 bg-gray-300 rounded">-</button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button onClick={() => handleIncrease(item._id)} className="px-2 bg-gray-300 rounded">+</button>
                                        </div>
                                        <button onClick={() => handleRemove(item._id)} className="mt-2 p-2 py-1 bg-red-500 text-white rounded shadow">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-4 bg-white shadow-md rounded flex justify-between">
                            <h2 className="text-2xl font-bold">Total: ${totalSum.toFixed(2)}</h2>
                            <button className='p-2 py-1 bg-red-500 text-white rounded shadow' onClick={handleCheckout}>Checkout</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
