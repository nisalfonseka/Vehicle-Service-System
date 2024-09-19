import React from 'react';
import { Link } from 'react-router-dom';

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

  console.log('Cart items:', cart);

  return (
    <div className="container mx-auto p-4" >
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4">
              <div className="w-1/4">
                <img src={item.photo} className="w-full h-auto rounded-lg" alt={item.name} />
              </div>
              <div className="w-1/2 px-4">
                <h5 className="text-lg font-semibold">{item.name}</h5>
                <p className="text-gray-800"><strong>LKR: {item.price.toFixed(2)}</strong></p>
              </div>
              <div className="w-1/4 flex items-center justify-center">
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400"
                  onClick={() => handleQuantityChange(item, -1)}
                >
                  -
                </button>
                <span className="mx-3 text-lg font-semibold">{item.quantity}</span>
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400"
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </button>
              </div>
              <div className="w-1/4 flex flex-col items-center justify-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </button>
                <p className="mt-2 text-gray-800"><strong>Subtotal: LKR: {(item.price * item.quantity).toFixed(2)}</strong></p>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h4 className="text-xl font-bold">Total: LKR: {getTotalPrice()}</h4>
            <Link to="/checkout" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600" style={{ textDecoration: 'none' }}>
              Checkout
            </Link>
          </div>
        </div>
      )}
      <div className="mt-6 text-center">
        <Link to="/store" className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600" style={{ textDecoration: 'none' }}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Cart;
