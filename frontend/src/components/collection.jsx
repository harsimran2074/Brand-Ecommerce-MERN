import React from 'react'
import { useSelector } from 'react-redux'
import { products } from '../assets/assets.js'
import Product from './product.jsx'
const Collection = () => {

const data = useSelector((store)=>store.allItemSlice)
    //  const data = products

  return <>


  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.filter((item) => item.bestseller === true).map((item) => (
        <div key={item._id}>
          <Product item={item} />
        </div>
      ))}
    </div>
  </div>
  </>
}
export default Collection
