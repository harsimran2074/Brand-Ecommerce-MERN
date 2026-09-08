import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import { FiPackage, FiShoppingBag, FiCalendar, FiCreditCard, FiPhone, FiMapPin } from 'react-icons/fi'
import Loader from '../components/loader'

const Order = ({ token }) => {
    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(true)

    const authToken = token || localStorage.getItem("adminToken")

    // Fetch all orders from backend
    const showOrders = async () => {
        if (!authToken) return

        try {
            setLoading(true)
            const res = await axios.get(backendUrl + "/api/order/list", {
                headers: { token: authToken }
            })

            if (res.data.success) {
                // Reverse to show latest orders first
                setOrderData(res.data.allorders.reverse())
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Update order status
    const statusHandler = async (event, orderId) => {
        try {
            const res = await axios.post(
                backendUrl + "/api/order/status",
                { orderId, status: event.target.value },
                { headers: { token: authToken } }
            )

            if (res.data.success) {
                toast.success("Order status updated")
                await showOrders()
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    useEffect(() => {
        showOrders()
    }, [authToken])

    return (
        <div className="flex flex-col w-full gap-5 sm:gap-6 py-2">

            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3 border-b border-gray-200">
                <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">Orders Management</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View customer orders and update delivery status</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200/80 rounded-full text-xs font-semibold shadow-2xs">
                        <FiShoppingBag className="text-sm text-purple-600" />
                        <span>{orderData.length} {orderData.length === 1 ? 'Order' : 'Orders'}</span>
                    </div>
                </div>
            </div>

            {/* Orders Content */}
            {loading ? (
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center py-20 px-4">
                    <Loader size="lg" text="Loading customer orders..." color="purple" />
                </div>
            ) : orderData.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {orderData.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[60px_2fr_1fr_1fr_1.2fr] gap-4 sm:gap-6 items-start hover:border-purple-200 transition-all"
                        >
                            {/* 1. Parcel Icon */}
                            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                                <img
                                    src={assets.parcel_icon}
                                    alt="Parcel Icon"
                                    className="w-7 h-7 object-contain"
                                />
                            </div>

                            {/* 2. Order Items & Customer Address */}
                            <div className="space-y-3">
                                {/* Items list */}
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1">
                                        Ordered Items
                                    </p>
                                    <div className="text-sm font-medium text-gray-800 leading-relaxed">
                                        {order.items.map((item, index) => (
                                            <span key={index}>
                                                {item.name} × {item.quantity}{" "}
                                                <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-1.5 py-0.5 rounded mr-1">
                                                    {item.size}
                                                </span>
                                                {index !== order.items.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="pt-2 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                                    <p className="font-semibold text-gray-900 text-sm">
                                        {order.address.firstName + " " + order.address.lastName}
                                    </p>
                                    <div className="flex items-start gap-1 text-gray-500">
                                        <FiMapPin className="text-gray-400 mt-0.5 shrink-0" />
                                        <span>
                                            {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <FiPhone className="text-gray-400 shrink-0" />
                                        <span>{order.address.phone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Order Meta Info */}
                            <div className="space-y-2 text-xs text-gray-600">
                                <div>
                                    <span className="text-gray-400 block text-[11px]">Total Items:</span>
                                    <span className="font-semibold text-gray-800 text-sm">{order.items.length}</span>
                                </div>

                                <div>
                                    <span className="text-gray-400 block text-[11px]">Payment Method:</span>
                                    <span className="inline-flex items-center gap-1 font-medium text-gray-700 mt-0.5">
                                        <FiCreditCard className="text-gray-400" />
                                        {order.paymentMethod}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-gray-400 block text-[11px]">Payment Status:</span>
                                    <span
                                        className={`inline-block px-2 py-0.5 mt-0.5 rounded-md text-[11px] font-semibold ${order.payment
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : "bg-amber-50 text-amber-700 border border-amber-200"
                                            }`}
                                    >
                                        {order.payment ? "Paid" : "Pending"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 text-gray-400 text-[11px] pt-1">
                                    <FiCalendar />
                                    <span>{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* 4. Total Amount */}
                            <div>
                                <span className="text-gray-400 block text-xs">Total Amount</span>
                                <span className="text-lg sm:text-xl font-bold text-gray-900 mt-1 block">
                                    ₹{order.amount}
                                </span>
                            </div>

                            {/* 5. Status Select Dropdown */}
                            <div className="w-full">
                                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                                    Order Status
                                </label>
                                <select
                                    onChange={(event) => statusHandler(event, order._id)}
                                    value={order.status}
                                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50/50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all cursor-pointer"
                                >
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty state */
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 shadow-xs">
                        <FiPackage className="text-xl sm:text-2xl" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">No Orders Placed Yet</h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-sm mt-1">
                        When customers place orders on your store, they will appear here for processing and fulfillment.
                    </p>
                </div>
            )}

        </div>
    )
}

export default Order