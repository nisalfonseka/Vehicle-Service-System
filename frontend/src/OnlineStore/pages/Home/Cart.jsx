import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

function Cart({ cart, setCart }) {
  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem._id !== item._id));
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      handleRemoveFromCart(item);
    } else if (newQuantity <= item.qty) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } else {
      alert(`Cannot add more than ${item.qty} of ${item.name} to the cart.`);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container1 mx-auto p-6">
  {/* Title */}
  <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Your Shopping Cart</h2>
  
  {/* Cart Content */}
  {cart.length === 0 ? (
    <p className="text-gray-600 text-center">Your cart is empty.</p>
  ) : (
    <div>
      {/* Cart Items */}
      {cart.map((item) => (
        <div key={item._id} className="flex items-start bg-white shadow-lg rounded-lg p-4 mb-4 transition-transform transform hover:scale-105">
          {/* Item Image */}
          <div className="w-1/4">
            <img src={`data:image/jpeg;base64,${item.photo}`} className="w-full h-auto rounded-lg" alt={item.name} />
          </div>

          {/* Item Details */}
          <div className="w-1/2 px-4">
            <h5 className="text-lg font-semibold text-gray-900">{item.name}</h5>
            <h5 className="text-gray-800">
              <strong>LKR: {item.price.toFixed(2)}</strong>
            </h5>
            <h5 className="text-gray-500">Available: {item.qty}</h5>
          </div>

          {/* Quantity Control and Remove Button */}
          <div className="w-1/4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400 transition duration-200"
                onClick={() => handleQuantityChange(item, -1)}
              >
                -
              </button>
              <span className="mx-3 text-lg font-semibold text-gray-700">{item.quantity}</span>
              <button
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400 transition duration-200"
                onClick={() => handleQuantityChange(item, 1)}
              >
                +
              </button>
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
              onClick={() => handleRemoveFromCart(item)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}

      {/* Total and Checkout */}
      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <h4 className="text-xl font-bold text-gray-900">Total: LKR: {getTotalPrice()}</h4>
        <Link
          to="/checkout"
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-200"
        >
          Checkout
        </Link>
      </div>

      {/* Discount Button */}
      <div className="flex flex-col items-center mt-6">
        
      </div>
    </div>
  )}

  {/* Continue Shopping Button */}
  <div className="flex flex-col items-center mt-6">
    <Link
      to="/store"
      className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition duration-200 mb-4"
    >
      Continue Shopping
    </Link>
  </div>
</div>

  );
}

export default Cart;
