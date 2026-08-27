import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BagSummery = ({ items = [] }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  
  const deliveryFee = subtotal === 0 ? 0 : 50;
  const Total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!items || items.length === 0) {
      toast.warn("Your cart is empty! Add items to continue.");
      return;
    }
    navigate('/place-order');
  };

  return (
    <>
      <div>
        <div className="w-full md:w-100 border border-gray-200 rounded-lg p-6 bg-white shadow-xs">
          <h2 className="text-xl font-semibold mb-6">Cart Total</h2>

          <div className="flex justify-between mb-3 text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Delivery</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{Total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition cursor-pointer font-medium"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default BagSummery;