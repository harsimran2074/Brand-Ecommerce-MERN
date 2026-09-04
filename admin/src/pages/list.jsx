import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { RiDeleteBin6Line } from "react-icons/ri"
import { HiOutlineSparkles } from "react-icons/hi2"
import { FiPackage, FiLayers, FiTag } from "react-icons/fi"
import DeletePopUp from '../components/deletePopUp'
import Loader from '../components/loader'

const List = ({ token }) => {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [deleteName, setDeleteName] = useState('')

    //fetch product
    const productList = async () => {
        try {
            setLoading(true)
            const response = await axios.get(backendUrl + "/api/product/get")

            if (!response.data.success) {
                toast.error(response.data.message || response.data.msg)
            }
            else {
                setList(response.data.products)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        productList()
    }, [])


    //delete product
    const deleteProduct = async (id) => {
        try {
            const response = await axios.post(
                backendUrl + "/api/product/delete/" + id,
                {},
                { headers: { token } }
            )
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.msg)
                await productList()
            }
            else {
                toast.error(response.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col w-full gap-5 sm:gap-6 py-2">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3 border-b border-gray-200">
                <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">All Products List</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage, monitor, and organize all published catalog items</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-200/80 rounded-full text-xs font-semibold shadow-2xs">
                        <FiPackage className="text-sm text-purple-600" />
                        <span>{list.length} {list.length === 1 ? 'Product' : 'Products'}</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            {loading ? (
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center py-20 px-4">
                    <Loader size="lg" text="Loading product inventory..." color="purple" />
                </div>
            ) : list.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">

                    {/* --- 1. DESKTOP & TABLET TABLE VIEW (Hidden on Mobile) --- */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-gray-50/90 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <th className="py-3.5 px-5 w-20">Image</th>
                                    <th className="py-3.5 px-4">Product Details</th>
                                    <th className="py-3.5 px-4">Category</th>
                                    <th className="py-3.5 px-4">Sizes</th>
                                    <th className="py-3.5 px-4">Price</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-5 text-right w-20">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {list.map((item) => {
                                    const isBestseller = item.bestseller === true || item.bestSeller === true || item.bestseller === 'true' || item.bestSeller === 'true'
                                    const displaySizes = Array.isArray(item.sizes)
                                        ? item.sizes
                                        : (typeof item.sizes === 'string' ? (() => { try { return JSON.parse(item.sizes) } catch { return [] } })() : [])

                                    return (
                                        <tr
                                            key={item._id}
                                            className="hover:bg-purple-50/25 transition-colors duration-150"
                                        >
                                            {/* Image */}
                                            <td className="py-3.5 px-5">
                                                <div className="relative w-14 h-14 rounded-xl border border-gray-200/90 bg-gray-50 overflow-hidden flex items-center justify-center p-1 shadow-2xs group">
                                                    {item.images && item.images[0] ? (
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <FiPackage className="text-gray-400 text-lg" />
                                                    )}
                                                    {item.images && item.images.length > 1 && (
                                                        <span className="absolute bottom-0.5 right-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-medium px-1 rounded">
                                                            +{item.images.length - 1}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Product Details */}
                                            <td className="py-3.5 px-4 max-w-[220px]">
                                                <p className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-purple-700 transition-colors">
                                                    {item.name}
                                                </p>
                                                {item.description && (
                                                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Category & Subcategory */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                                                        {item.category}
                                                    </span>
                                                    <span className="text-[11px] text-gray-500 pl-0.5">
                                                        {item.subcategory || item.subCategory || '-'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Sizes */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex flex-wrap items-center gap-1">
                                                    {displaySizes.length > 0 ? (
                                                        displaySizes.map((size, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200"
                                                            >
                                                                {size}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-gray-400">None</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Price */}
                                            <td className="py-3.5 px-4">
                                                <span className="text-sm font-bold text-gray-900">
                                                    ${item.price}
                                                </span>
                                            </td>

                                            {/* Bestseller Status */}
                                            <td className="py-3.5 px-4">
                                                {isBestseller ? (
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
                                                        <HiOutlineSparkles className="text-amber-500 text-xs" />
                                                        Bestseller
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400 font-normal">
                                                        Standard
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action Button */}
                                            <td className="py-3.5 px-5 text-right">
                                                <button
                                                    type="button"
                                                    title="Delete product"
                                                    onClick={() => {
                                                        setDeleteId(item._id);
                                                        setDeleteName(item.name);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 rounded-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-rose-200 shadow-2xs"
                                                >
                                                    <RiDeleteBin6Line className="text-base" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* --- 2. MOBILE CARD VIEW (Displayed on Small Screens < md) --- */}
                    <div className="block md:hidden divide-y divide-gray-100">
                        {list.map((item) => {
                            const isBestseller = item.bestseller === true || item.bestSeller === true || item.bestseller === 'true' || item.bestSeller === 'true'
                            const displaySizes = Array.isArray(item.sizes)
                                ? item.sizes
                                : (typeof item.sizes === 'string' ? (() => { try { return JSON.parse(item.sizes) } catch { return [] } })() : [])

                            return (
                                <div key={item._id} className="p-4 flex flex-col gap-3 hover:bg-purple-50/15 transition-colors">
                                    {/* Top row: Thumbnail + Details + Delete action */}
                                    <div className="flex items-start gap-3">
                                        {/* Image */}
                                        <div className="relative w-16 h-16 rounded-xl border border-gray-200/90 bg-gray-50 shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-2xs">
                                            {item.images && item.images[0] ? (
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <FiPackage className="text-gray-400 text-xl" />
                                            )}
                                            {item.images && item.images.length > 1 && (
                                                <span className="absolute bottom-0.5 right-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-medium px-1 rounded">
                                                    +{item.images.length - 1}
                                                </span>
                                            )}
                                        </div>

                                        {/* Name & Categories */}
                                        <div className="flex-1 min-w-0 pr-1">
                                            <h3 className="text-sm font-semibold text-gray-800 truncate">
                                                {item.name}
                                            </h3>
                                            {item.description && (
                                                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                                    {item.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                                                    {item.category}
                                                </span>
                                                {(item.subcategory || item.subCategory) && (
                                                    <span className="text-[10px] text-gray-500">
                                                        • {item.subcategory || item.subCategory}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Delete Action Button */}
                                        <button
                                            type="button"
                                            title="Delete product"
                                            onClick={() => {
                                                setDeleteId(item._id);
                                                setDeleteName(item.name);
                                                setShowDeleteModal(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 rounded-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-rose-200 shadow-2xs shrink-0"
                                        >
                                            <RiDeleteBin6Line className="text-lg" />
                                        </button>
                                    </div>

                                    {/* Middle row: Sizes chips */}
                                    {displaySizes.length > 0 && (
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="text-xs text-gray-400 font-medium">Sizes:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {displaySizes.map((size, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200"
                                                    >
                                                        {size}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Bottom row: Price & Status */}
                                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xs text-gray-400">Price:</span>
                                            <span className="text-base font-bold text-gray-900">${item.price}</span>
                                        </div>

                                        <div>
                                            {isBestseller ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
                                                    <HiOutlineSparkles className="text-amber-500 text-xs" />
                                                    Bestseller
                                                </span>
                                            ) : (
                                                <span className="text-[11px] text-gray-400">
                                                    Standard
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            ) : (
                /* Empty State View */
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 shadow-xs">
                        <FiLayers className="text-xl sm:text-2xl" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">No Products Available</h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-sm mt-1">
                        Your inventory list is currently empty. Use the "Add Item" page to create and publish your first product.
                    </p>
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            <DeletePopUp
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                    setDeleteName('');
                }}
                onConfirm={() => {
                    deleteProduct(deleteId);
                    setShowDeleteModal(false);
                    setDeleteId(null);
                    setDeleteName('');
                }}
                productName={deleteName}
            />
        </div>
    )
}

export default List