import React from 'react'
import add from '../assets/add_icon.png'
import list from '../assets/order_icon.png'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className="w-[18%] min-h-screen border-r border-gray-200">
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <NavLink 
                    to="/add" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-md transition-all duration-200 cursor-pointer ${
                            isActive 
                                ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
                        }`
                    }
                >
                    <img src={add} alt="add" className="w-5 h-5" />
                    <p className="hidden md:block">Add Item</p>
                </NavLink>

                <NavLink 
                    to="/list" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-md transition-all duration-200 cursor-pointer ${
                            isActive 
                                ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
                        }`
                    }
                >
                    <img src={list} alt="list" className="w-5 h-5" />
                    <p className="hidden md:block">List Items</p>
                </NavLink>

                <NavLink 
                    to="/order" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-md transition-all duration-200 cursor-pointer ${
                            isActive 
                                ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
                        }`
                    }
                >
                    <img src={list} alt="orders" className="w-5 h-5" />
                    <p className="hidden md:block">Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar
