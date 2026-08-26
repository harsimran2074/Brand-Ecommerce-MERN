import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RelatedProduct from "../components/relatedProduct.jsx";
import star from "../assets/star_icon.png";
import Footer from "../components/footer.jsx";
import { addToBag } from "../redux/slices.jsx";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();

  const data = useSelector((store) => store.allItemSlice);
  const Item = data.find((item) => item._id === productId);

  const [selectedSize, setSelectedSize] = useState("");
  const [image, setImage] = useState(Item?.image?.[0] || "");

  // Set first product image when Item becomes available
  useEffect(() => {
    if (Item?.image?.[0]) {
      setImage(Item.image[0]);
    }
  }, [Item]);

  // Product not found
  if (!Item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Item not found</p>
      </div>
    );
  }
  const Images = Item.image;

//Add to cart
const dispatch = useDispatch();

const handleAddToCart = () => {
  if(!selectedSize){
    toast.error("Please select a size");
    return;
  }
 const cartItemDetail = { _id:Item._id,name:Item.name, image:Item.image[0], price:Item.price, quantity:1 , size:selectedSize };
  dispatch(addToBag(cartItemDetail));
  console.log(cartItemDetail);
}

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* ================= IMAGE GALLERY ================= */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div
              className="
                flex md:flex-col
                gap-3
                overflow-x-auto md:overflow-x-visible
                md:w-20
                shrink-0
                pb-1 md:pb-0
              "
            >
              {Images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setImage(img)}
                  className={`
                    w-16 h-20
                    sm:w-20 sm:h-24
                    md:w-20 md:h-24
                    shrink-0
                    overflow-hidden
                    rounded-md
                    border-2
                    transition-all duration-200
                    ${image === img ? "border-gray-400" : "border-transparent "}
                  `}
                >
                  {image && (
                    <img
                      src={img}
                      alt={`${Item.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-50 rounded-md overflow-hidden">
              <div className="flex-1 bg-gray-50 rounded-md overflow-hidden">
                <img
                  src={image}
                  alt={Item.name}
                  className="w-full h-auto max-h-162.5 object-contain"
                />
              </div>
            </div>
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-3">
              T-Shirt
            </p>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-gray-900">
              {Item.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <img
                    key={item}
                    src={star}
                    alt="star"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                ))}
              </div>

              <span className="text-xs sm:text-sm text-gray-500">
                (200 Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 sm:mt-3">
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                ${Item.price}
              </p>
            </div>

            <div className="border-t border-gray-200 my-3" />

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-7">
              {Item.description}
            </p>

            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Select Size
                </h3>

                <button
                  type="button"
                  className="text-xs text-gray-500 underline hover:text-black"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {Item.sizes.map((size) => (
                  <label
                    key={size}
                    className={`
                      min-w-6 h-10 sm:h-10
                      px-4 sm:px-5
                      flex items-center justify-center
                      border rounded-md
                      text-sm font-medium
                      cursor-pointer
                      transition-all duration-200
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-black"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="hidden"
                    />

                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Add To Cart */}
            <button
              type="button"
              className="
                mt-8
                w-50
                bg-black
                text-white
                py-4
                text-sm
                font-medium
                uppercase
                tracking-wider
                 active:bg-gray-700
                transition
              " onClick={()=> handleAddToCart()}
            >
              Add to Cart
            </button>

            {/* Benefits */}
            <div className="mt-6 space-y-3 text-sm text-gray-500">
              <p>✓ Secure payment</p>
              <p>✓ Fast delivery</p>
              <p>✓ Easy returns</p>
            </div>
          </div>
        </div>
      </div>

      <RelatedProduct category={Item.category} subCategory={Item.subCategory} />

      <Footer />
    </>
  );
};

export default ProductDetail;
