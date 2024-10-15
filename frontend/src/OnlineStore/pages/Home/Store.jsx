import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Notification from '../../components/Notification'; // Import the Notification component

function Store({ cart, setCart }) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null); // State to control notification visibility

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5555/store-items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    if (item.qty > 0) {
      const itemInCart = cart?.find((cartItem) => cartItem._id === item._id);

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
          setNotification(`Cannot add more than ${item.qty} of ${item.name} to the cart.`);
        }
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    } else {
      setNotification('This item is out of stock.');
    }
  };

  const handleCloseNotification = () => {
    setNotification(null); // Close the notification
  };

  return (
    <div className="container1 mx-auto px-4 py-6">
      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to Online Store</h1>
        <div className="flex space-x-4">
          <Link to="/CardManagementPage" className="btn btn-secondary flex items-center">
            Manage Cards
          </Link>
          <Link to="/cart" className="btn btn-secondary flex items-center">
            Cart
          </Link>
          <Link to="/my-orders" className="btn btn-secondary flex items-center">
            My Orders
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search items by name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className={`rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 
              ${item.qty === 0 ? 'bg-red-300' : 'bg-white'}`} // Conditional class for background color
          >
            <Link to={`/store-items/${item._id}`}>
              <img src={`data:image/jpeg;base64,${item.photo}`} alt={item.name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
              <h5 className="text-lg font-semibold text-gray-500">{item.name}</h5>
              <p className="text-gray-500"><strong>RS: {item.price.toFixed(2)}</strong></p>
              <p className="text-gray-600">Available: {item.qty}</p>
              <button
                className={`mt-2 w-full p-2 rounded-md transition duration-200 
                  ${item.qty === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                onClick={() => handleAddToCart(item)}
                disabled={item.qty === 0} // Disable button for out-of-stock items
              >
                {item.qty === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
