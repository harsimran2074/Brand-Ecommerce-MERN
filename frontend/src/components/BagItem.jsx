import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAPI, updateCart } from "../redux/slices";
import { RiDeleteBin6Line, RiTruckLine } from "react-icons/ri";

const BagItem = ({ data }) => {
  const products = useSelector((state) => state.allItemSlice.products);
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeFromCartAPI({ itemId: data._id, size: data.size }));
  };

  const handleDecreaseQuantity = () => {
    const currentQty = data?.quantity || 1;
    if (currentQty > 1) {
      dispatch(updateCart({ itemId: data._id, size: data.size, quantity: currentQty - 1 }));
    }
  };

  const handleIncreaseQuantity = () => {
    const currentQty = data?.quantity || 1;
    dispatch(updateCart({ itemId: data._id, size: data.size, quantity: currentQty + 1 }));
  };

  // finding product from all products list
  const product = products.find((item) => String(item._id) === String(data?._id));
  const productImages = product?.images || product?.image || data?.images || data?.image;
  const imageSrc = Array.isArray(productImages) ? productImages[0] : productImages;

  return (
    <div className="group bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 mb-4 shadow-xs hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
        {/* Left Section: Image and Product Details */}
        <div className="flex gap-3.5 sm:gap-5 w-full sm:w-auto items-center sm:items-start flex-1 min-w-0">
          {/* Product Image Container */}
          <div className="w-20 h-24 sm:w-28 sm:h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-1.5">
            <img
              src={imageSrc}
              alt={product?.name || data?.name || "Product"}
              className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate sm:line-clamp-2 leading-snug">
                {product?.name || data?.name}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-1.5 sm:mt-2">
                {data?.size && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200/60">
                    Size: <span className="font-semibold ml-1 text-gray-900">{data.size}</span>
                  </span>
                )}
                {product?.category && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium text-gray-500 bg-gray-50">
                    {product.category}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Price Display */}
            <div className="mt-2.5 sm:hidden flex items-baseline gap-1">
              <span className="text-base font-bold text-gray-900">₹{product?.price}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Quantity Controls, Price, and Remove Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
          {/* Quantity Stepper */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50/80 p-1 shadow-2xs">
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200/80 text-gray-600 hover:text-black hover:bg-gray-100 active:scale-95 transition-all text-xs font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
              disabled={(data?.quantity || 1) <= 1}
              onClick={handleDecreaseQuantity}
            >
              −
            </button>

            <span className="px-3 text-xs sm:text-sm font-semibold text-gray-800 min-w-6 text-center select-none">
              {data?.quantity || 1}
            </span>

            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200/80 text-gray-600 hover:text-black hover:bg-gray-100 active:scale-95 transition-all text-xs font-bold cursor-pointer"
              aria-label="Increase quantity"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>

          {/* Desktop Price & Delivery Estimate */}
          <div className="hidden sm:flex flex-col items-end min-w-28 text-right">
            <p className="text-lg font-bold text-gray-900">₹{product?.price}</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-500 font-medium">
              <RiTruckLine className="w-3.5 h-3.5 text-gray-400" />
              <span>Free Delivery</span>
            </div>
          </div>

          {/* Delete / Remove Button */}
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer"
            onClick={handleRemoveItem}
            title="Remove item"
            aria-label="Remove item"
          >
            <RiDeleteBin6Line size={20} className="transition-transform active:scale-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagItem;

