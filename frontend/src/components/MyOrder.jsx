import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByUserId, deleteOrderById } from '../redux/slices/orderSlice';

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUserId(user._id));
    }
  }, [dispatch, user]);

  const handleCancelOrder = (orderId) => {
    dispatch(deleteOrderById(orderId));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">My Orders</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && orders?.length === 0 && <p>No orders found.</p>}
      {status === 'succeeded' && orders?.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="font-bold mb-2 text-lg sm:text-xl">Order ID: {order._id}</h3>
              <div className="text-sm sm:text-base space-y-2">
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Contact Number:</strong> {order.customerContactNumber}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Pin Code:</strong> {order.pinCode}</p>
              </div>
              <div className="mt-4 space-y-2">
                {order.product && Array.isArray(order.product) ? (
                  order.product.map((product, index) => (
                    <div key={index} className="border-t pt-2">
                      <p><strong>Product Name:</strong> {product.productName}</p>
                      <p><strong>Product Price:</strong> ₹{product.productPrice}</p>
                      <p><strong>Description:</strong> {product.ProductDesc}</p>
                      <p><strong>Category:</strong> {product.ProductCategory}</p>
                    </div>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </div>
              <div className="text-sm sm:text-base mt-4 space-y-2">
                <p><strong>Transaction ID:</strong> {order.transactionId}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="w-full sm:w-auto bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
