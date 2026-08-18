import React from 'react'

const BagSummery = () => {
  return (
   <>
   <div>
      <div className="w-full md:w-100 border border-gray-200 rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-6">Cart Total</h2>

  <div className="flex justify-between mb-3 text-gray-600">
    <span>Subtotal</span>
    <span>{}</span>
  </div>

  <div className="flex justify-between mb-4 text-gray-600">
    <span>Delivery</span>
    <span>₹50</span>
  </div>

  <div className="border-t pt-4 flex justify-between text-lg font-semibold">
    <span>Total</span>
    <span>₹2,048</span>
  </div>

  <button className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800">
    Proceed to Checkout
  </button>
</div>

   </div>
   </>
  )
}

export default BagSummery