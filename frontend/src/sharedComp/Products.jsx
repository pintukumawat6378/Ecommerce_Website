import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/slices/cartSlice';
import { fetchProducts, STATUES } from '../redux/slices/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CircleImages from './CircleImages';

const Products = () => {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleClick = (data) => {
        dispatch(add(data));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.productCategory === selectedCategory)
        : products;

    if (status === STATUES.LOADING) {
        return (
            <div className='text-3xl text-blue-800 font-bold flex justify-center h-screen'>
                <FontAwesomeIcon icon={faSpinner} spin size="10x" />
            </div>
        );
    }

    return (
        <div 
            className="bg-cover bg-center min-h-screen" 
            style={{ backgroundImage: "url('https://st4.depositphotos.com/1015390/38880/i/450/depositphotos_388808316-stock-photo-wavy-abstract-smooth-colors-background.jpg')" }}
        >
            <CircleImages onCategorySelect={handleCategorySelect} />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
                {filteredProducts?.map((item) => (
                    <div key={item.id} className='bg-white shadow rounded p-4 flex flex-col items-center'>
                        <img 
                            src={`${import.meta.env.VITE_API_URI}/${item.productImage}`} 
                            alt="" 
                            className='w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]' 
                        />
                        <h4 className='font-serif text-lg sm:text-xl'>{item.productName}</h4>
                        <p className='font-bold'>₹ {item.productPrice}</p>
                        <p className='text-sm sm:text-base'>{item.productDesc}</p>
                        <button 
                            onClick={() => { handleClick(item) }} 
                            className='p-2 mt-2 bg-orange-500 text-white rounded shadow'
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
