import React, { useEffect } from 'react'
import { RiDeleteBin6Line, RiCloseLine } from "react-icons/ri"
import { FiAlertTriangle } from "react-icons/fi"

const DeletePopUp = ({ isOpen, onClose, onConfirm, productName = '' }) => {

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl max-w-sm sm:max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 flex flex-col items-center text-center transition-all transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close 'X' Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Close modal"
                >
                    <RiCloseLine className="text-xl" />
                </button>

                {/* Icon Warning Badge */}
                <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shadow-2xs">
                    <FiAlertTriangle className="text-2xl text-rose-500" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight mb-2">
                    Delete Product
                </h3>

                {/* Body Message */}
                <p className="text-xs sm:text-sm text-gray-500 max-w-xs sm:max-w-sm mb-6 leading-relaxed">
                    Are you sure you want to delete {productName ? (
                        <span className="font-semibold text-gray-800">"{productName}"</span>
                    ) : (
                        'this product'
                    )}? This action cannot be undone.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 text-sm font-semibold transition-all duration-150 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-sm font-semibold transition-all duration-150 shadow-xs hover:shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <RiDeleteBin6Line className="text-base" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletePopUp
