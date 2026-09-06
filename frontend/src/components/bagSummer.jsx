import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectBagSummary } from '../redux/slices';

const BagSummery = () => {

  const { subtotal, deliveryFee, total } = useSelector(selectBagSummary);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!subtotal) {
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
            <span>₹{total}</span>
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
