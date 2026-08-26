import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Product from './product'
const RelatedProduct = ({ category, subCategory }) => {

  const [product, setProduct] = useState([]);
  const products = useSelector((store) => store.allItemSlice)


  useEffect(() => {
    let productCopy = products.slice();
    productCopy = productCopy.filter((item) => item.category === category)
    productCopy = productCopy.filter((item) => item.subCategory === subCategory)
    setProduct(productCopy.slice(0, 5));
  }, [category, subCategory])
  return (
    <><h2 className="text-center mt-12 mb-8 text-2xl sm:text-3xl font-semibold border-t  border-gray-300 pt-8 mx-15">
  <span className="text-gray-600">Related </span>
  <span className="text-gray-900">Products</span>
</h2>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.map((item) => <Product key={item._id} item={item} />)}
        </div>
      </div>
    </>
  )
}

export default RelatedProduct