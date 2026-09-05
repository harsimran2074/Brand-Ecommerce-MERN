import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Product from './product'
const RelatedProduct = ({ category, subCategory }) => {

  const [product, setProduct] = useState([]);
  const products = useSelector((store) => store.allItemSlice?.products || []);

  useEffect(() => {
    if (!Array.isArray(products)) return;
    let productCopy = products.slice();
    if (category) {
      productCopy = productCopy.filter((item) => item.category === category);
    }
    if (subCategory) {
      productCopy = productCopy.filter(
        (item) => (item.subCategory || item.subcategory) === subCategory
      );
    }
    setProduct(productCopy.slice(0, 5));
  }, [products, category, subCategory]);
  return (
    <>
      <h1 className={
        "text-3xl font-semibold text-gray-800 mb-4 ml-6 md:ml-20  lg:ml-30 mt-6 border-t border-gray-300 pt-6"
      }>Related Products</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.map((item) => <Product key={item._id} item={item} />)}
        </div>
      </div>
    </>
  )
}

export default RelatedProduct