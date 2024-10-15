import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemDetails({ cart, setCart }) {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/store-items/${itemId}`);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItem();
    }, [itemId]);

    const handleAddToCart = () => {
        if (item.qty > 0) {
            const itemInCart = cart.find((cartItem) => cartItem._id === item._id);

            if (itemInCart) {
                if (itemInCart.quantity < item.qty) {
                    setCart(
                        cart.map((cartItem) =>
                            cartItem._id === item._id
                                ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
                                : cartItem
                        )
                    );
                } else {
                    alert(`Cannot add more than ${item.qty} of ${item.name} to the cart.`);
                }
            } else {
                setCart([...cart, { ...item, quantity: 1 }]);
            }
        } else {
            alert('Item is out of stock');
        }
    };

    return (
        <div className="container1 mx-auto p-4">
            <button
                        className="btn btn-secondary mb-4"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
            {item ? (
                <div>
                    
                    <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={`data:image/jpeg;base64,${item.photo}`}
                            alt={item.name}
                            className="w-full lg:w-1/2 h-auto object-cover object-center p-4"
                            style={{ maxHeight: '700px' }} // Adjust as needed
                        />
                        <div className="p-6 lg:w-1/2">
                            <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                            <p className="text-lg font-bold text-gray-800 mb-2">
                                Price: RS {item.price.toFixed(2)}
                            </p>
                            <p className="text-md text-gray-600 mb-4">
                                Available Quantity: {item.qty}
                            </p>
                            <p className="text-md text-gray-600 mb-4">
                                Description: {item.description}
                            </p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">Loading item details...</p>
            )}
        </div>
    );
}

export default ItemDetails;
