import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'

// Reusable Smooth Animated Dropdown Component
const CustomDropdown = ({ label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="flex-1 relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 select-none">
                {label}
            </label>

            {/* Dropdown Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-sm bg-white transition-all duration-200 cursor-pointer select-none ${isOpen
                    ? 'border-purple-600 ring-2 ring-purple-100 text-gray-900 shadow-xs'
                    : 'border-gray-300 text-gray-800 hover:border-gray-400'
                    }`}
            >
                <span className="font-normal">{value}</span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180 text-purple-600' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Smooth Animated Options Menu */}
            <div
                className={`absolute left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl shadow-purple-500/10 p-1.5 z-40 transition-all duration-200 ease-out origin-top transform ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0 visible pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                    }`}
            >
                {options.map((option) => {
                    const isSelected = option === value
                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onChange(option)
                                setIsOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-lg text-left transition-all duration-150 cursor-pointer ${isSelected
                                ? 'bg-purple-50 text-purple-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span>{option}</span>
                            {isSelected && (
                                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}



export default CustomDropdown;