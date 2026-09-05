import React from 'react'
import { useSelector } from 'react-redux'
import Product from './product.jsx'
import Loader from './loader.jsx'
const Collection = () => {

  const data = useSelector((store) => store.allItemSlice.products)
  const loaderStatus = useSelector((store) => store.allItemSlice.loading)

  return (
    <>
      {loaderStatus ? <Loader text="Loading Products" /> : <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.filter((item) => item.bestSeller == true).map((item) => (
            <div key={item._id}>
              <Product item={item} />
            </div>
          ))}
        </div>
      </div>}
    </>
  )
}
export default Collection
