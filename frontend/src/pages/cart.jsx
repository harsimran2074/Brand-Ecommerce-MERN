import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import BagItem from "../components/BagItem";
import BagSummery from "../components/bagSummer";
import { getCart } from "../redux/slices";
import Footer from "../components/footer";

const Cart = () => {


  const [cartData, setCartData] = useState([]);
  const products = useSelector((state) => state.allItemSlice.products);
  const cartItems = useSelector((state) => state.bagItemSlice.cartData);
  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <>
      <div className="border-t pt-8 min-h-[65vh] px-4 sm:px-10 lg:px-20">
        <p className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-700 mb-6">
          Your Cart <span className="text-gray-400 font-light">__</span>
        </p>

        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Your cart is currently empty</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              Looks like you haven't added anything to your cart yet. Explore our collection to find something you love.
            </p>
            <NavLink
              to="/collection"
              className="bg-black text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-150 active:scale-95"
            >
              Explore Collection
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            {/* Cart Items List */}
            <div className="w-full lg:flex-1">
              {cartData.map((item, index) => (
                <BagItem
                  key={`${item._id}-${item.size || 'default'}-${index}`}
                  data={item}
                />
              ))}
            </div>

            {/* Cart Summary Section */}
            <div className="w-full lg:w-96 shrink-0 sticky top-24">
              <BagSummery items={cartItems} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
