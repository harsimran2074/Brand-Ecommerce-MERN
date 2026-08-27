import React from 'react'
import search_img from '../assets/search_icon.png'
import { useRef } from 'react'
const Search = ({ setSearch }) => {

  //    const inputeRef = useRef("");

  // const search = () => {
  //    setSearch(inputeRef.current.value);
  //    console.log(inputeRef.current.value);
  // }


  return (
    <>
      <div className='flex justify-center mx-5 mt-3'>
        <div className="flex items-center justify-center w-full max-w-md border border-gray-400 rounded-full px-4 py-2 bg-white focus-within:border-black transition">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none bg-transparent text-base text-gray-700 placeholder-gray-400 "

            onChange={(e) => setSearch(e.target.value)}
          />

          <button >
            <img
              src={search_img}
              alt="Search"
              className="w-5 h-5 object-contain cursor-pointer "
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default Search