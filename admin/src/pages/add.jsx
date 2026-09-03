import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import CustomDropdown from '../components/reusableDropdown'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    const categoryOptions = ['Men', 'Women', 'Kids']
    const subCategoryOptions = ['Topwear', 'Bottomwear', 'Winterwear']
    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL']

    const handleSizeToggle = (size) => {
        setSizes((prev) =>
            prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
        )
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // Logic will be added here

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("category", category)
        formData.append("subCategory", subCategory)
        formData.append("bestseller", bestseller)
        formData.append("sizes", JSON.stringify(sizes))

        image1 && formData.append("image1", image1)
        image2 && formData.append("image2", image2)
        image3 && formData.append("image3", image3)
        image4 && formData.append("image4", image4)




        try {
            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
            console.log(response);
            if (!response.data.success) {
                toast.error('Failed to add product' + response.data.message)
            }
            else {
                toast.success('Product Added Successfully')
            }
        }
        catch (error) {
            console.log(error.response);
            toast.error(error.response.data.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-5 py-2">
            {/* Page Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Add New Product</h1>
                <p className="text-sm text-gray-500 mt-0.5">Fill in the details to publish a new item</p>
            </div>

            {/* Upload Images */}
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images <span className="text-gray-400 font-normal">(Up to 4)</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                    {/* Image 1 */}
                    <label htmlFor="image1" className="cursor-pointer group">
                        <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-xl border-2 border-dashed border-gray-300 group-hover:border-purple-500 bg-white flex items-center justify-center p-2 overflow-hidden transition-all duration-200 shadow-xs">
                            <img
                                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                                alt="Upload slot 1"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <input
                            onChange={(e) => setImage1(e.target.files[0])}
                            type="file"
                            id="image1"
                            accept="image/*"
                            hidden
                        />
                    </label>

                    {/* Image 2 */}
                    <label htmlFor="image2" className="cursor-pointer group">
                        <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-xl border-2 border-dashed border-gray-300 group-hover:border-purple-500 bg-white flex items-center justify-center p-2 overflow-hidden transition-all duration-200 shadow-xs">
                            <img
                                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                                alt="Upload slot 2"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <input
                            onChange={(e) => setImage2(e.target.files[0])}
                            type="file"
                            id="image2"
                            accept="image/*"
                            hidden
                        />
                    </label>

                    {/* Image 3 */}
                    <label htmlFor="image3" className="cursor-pointer group">
                        <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-xl border-2 border-dashed border-gray-300 group-hover:border-purple-500 bg-white flex items-center justify-center p-2 overflow-hidden transition-all duration-200 shadow-xs">
                            <img
                                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                                alt="Upload slot 3"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <input
                            onChange={(e) => setImage3(e.target.files[0])}
                            type="file"
                            id="image3"
                            accept="image/*"
                            hidden
                        />
                    </label>

                    {/* Image 4 */}
                    <label htmlFor="image4" className="cursor-pointer group">
                        <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-xl border-2 border-dashed border-gray-300 group-hover:border-purple-500 bg-white flex items-center justify-center p-2 overflow-hidden transition-all duration-200 shadow-xs">
                            <img
                                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                                alt="Upload slot 4"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <input
                            onChange={(e) => setImage4(e.target.files[0])}
                            type="file"
                            id="image4"
                            accept="image/*"
                            hidden
                        />
                    </label>
                </div>
            </div>

            {/* Product Name */}
            <div className="w-full max-w-[520px]">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Name
                </label>
                <input
                    type="text"
                    placeholder="e.g. Men Round Neck Pure Cotton T-shirt"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                />
            </div>

            {/* Product Description */}
            <div className="w-full max-w-[520px]">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Description
                </label>
                <textarea
                    rows={4}
                    placeholder="Write product details, material, fit, and key features..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-200 resize-none"
                />
            </div>

            {/* Category, Subcategory & Price */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[520px]">
                {/* Category Custom Dropdown */}
                <CustomDropdown
                    label="Category"
                    value={category}
                    onChange={setCategory}
                    options={categoryOptions}
                />

                {/* Sub Category Custom Dropdown */}
                <CustomDropdown
                    label="Sub Category"
                    value={subCategory}
                    onChange={setSubCategory}
                    options={subCategoryOptions}
                />

                {/* Price */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Price (₹)
                    </label>
                    <input
                        type="number"
                        placeholder="25"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                    />
                </div>
            </div>

            {/* Product Sizes */}
            <div className="w-full max-w-[520px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes
                </label>
                <div className="flex gap-2.5 flex-wrap">
                    {availableSizes.map((size) => {
                        const isSelected = sizes.includes(size)
                        return (
                            <button
                                key={size}
                                type="button"
                                onClick={() => handleSizeToggle(size)}
                                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${isSelected
                                    ? 'bg-purple-50 text-purple-700 border-purple-500 shadow-xs'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                            >
                                {size}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Bestseller Checkbox */}
            <div className="flex items-center gap-2.5 mt-1 cursor-pointer select-none">
                <input
                    type="checkbox"
                    id="bestseller"
                    checked={bestseller}
                    onChange={() => setBestseller((prev) => !prev)}
                    className="w-4 h-4 accent-purple-600 rounded border-gray-300 cursor-pointer"
                />
                <label htmlFor="bestseller" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Add to Bestseller
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-3 px-8 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-sm shadow-purple-200 cursor-pointer uppercase tracking-wider"
            >
                Add Product
            </button>
        </form>
    )
}

export default Add