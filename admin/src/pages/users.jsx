import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { 
    FiUsers, 
    FiCheckCircle, 
    FiSearch, 
    FiMail, 
    FiCalendar, 
    FiCopy, 
    FiCheck, 
    FiRefreshCw, 
    FiAlertCircle, 
    FiX,
    FiHash
} from 'react-icons/fi'
import Loader from '../components/loader'

const Users = ({ token }) => {
    const [users, setUsers] = useState([])
    const [stats, setStats] = useState({ totalUsers: 0, paidOrdersCount: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [copiedId, setCopiedId] = useState(null)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const authToken = token || localStorage.getItem('adminToken')

    // Fetch registered users and stats from backend
    const fetchUsers = useCallback(async (showRefreshIndicator = false) => {
        if (!authToken) return

        try {
            if (showRefreshIndicator) {
                setIsRefreshing(true)
            } else {
                setLoading(true)
            }
            setError(null)

            const response = await axios.get(backendUrl + '/api/user/users', {
                headers: { token: authToken }
            })

            if (response.data.success) {
                const fetchedUsers = response.data.users || []
                setUsers(fetchedUsers)
                setStats({
                    totalUsers: response.data.totalUsers ?? fetchedUsers.length,
                    paidOrdersCount: response.data.paidOrdersCount ?? 0
                })
            } else {
                const message = response.data.message || response.data.msg || 'Failed to fetch registered users'
                setError(message)
                toast.error(message)
            }
        } catch (err) {
            console.error('[Admin Users - Fetch Error]:', err.message)
            const errMsg = err.response?.data?.message || err.response?.data?.msg || err.message
            setError(errMsg)
            toast.error(errMsg)
        } finally {
            setLoading(false)
            setIsRefreshing(false)
        }
    }, [authToken])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    // Copy Customer ID to clipboard
    const handleCopyId = (id) => {
        navigator.clipboard.writeText(id)
        setCopiedId(id)
        toast.info('Customer ID copied to clipboard', { autoClose: 1500 })
        setTimeout(() => {
            setCopiedId(null)
        }, 2000)
    }

    // Filter users by search term (name, email, or id)
    const filteredUsers = users.filter((user) => {
        if (!searchQuery.trim()) return true
        const query = searchQuery.toLowerCase().trim()
        const nameMatch = user.name ? user.name.toLowerCase().includes(query) : false
        const emailMatch = user.email ? user.email.toLowerCase().includes(query) : false
        const idMatch = user._id ? user._id.toLowerCase().includes(query) : false
        return nameMatch || emailMatch || idMatch
    })

    // Initials helper for user avatar
    const getInitials = (name) => {
        if (!name) return 'U'
        return name
            .trim()
            .split(/\s+/)
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
    }

    // Date formatting helper
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return 'N/A'
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        } catch {
            return 'N/A'
        }
    }

    return (
        <div className="flex flex-col w-full gap-5 sm:gap-6 py-2">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3 border-b border-gray-200">
                <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">Users Management</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        Overview of registered customers, account details, and payment metrics
                    </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => fetchUsers(true)}
                        disabled={loading || isRefreshing}
                        title="Refresh user data"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
                    >
                        <FiRefreshCw className={`text-xs ${isRefreshing ? 'animate-spin text-purple-600' : 'text-gray-500'}`} />
                        <span>Refresh</span>
                    </button>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200/80 rounded-full text-xs font-semibold shadow-2xs">
                        <FiUsers className="text-sm text-purple-600" />
                        <span>{stats.totalUsers} {stats.totalUsers === 1 ? 'User' : 'Users'}</span>
                    </div>
                </div>
            </div>

            {/* Dashboard Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* 1. Total Registered Users */}
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 flex items-center justify-between hover:border-purple-200 transition-all">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Total Registered Users
                        </span>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            {loading ? (
                                <span className="inline-block w-12 h-7 bg-gray-200 animate-pulse rounded" />
                            ) : (
                                stats.totalUsers
                            )}
                        </div>
                        <p className="text-xs text-purple-600 font-medium">
                            Registered MongoDB user accounts
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-2xs">
                        <FiUsers className="text-2xl" />
                    </div>
                </div>

                {/* 2. Successfully Paid Orders */}
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 flex items-center justify-between hover:border-emerald-200 transition-all">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Successfully Paid Orders
                        </span>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            {loading ? (
                                <span className="inline-block w-12 h-7 bg-gray-200 animate-pulse rounded" />
                            ) : (
                                stats.paidOrdersCount
                            )}
                        </div>
                        <p className="text-xs text-emerald-600 font-medium">
                            Orders with confirmed payment (payment: true)
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-2xs">
                        <FiCheckCircle className="text-2xl" />
                    </div>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                            <FiAlertCircle className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-rose-900">Unable to load users</h3>
                            <p className="text-xs text-rose-700 mt-0.5">{error}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => fetchUsers()}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Search Bar & User Count Bar */}
            {!error && !loading && users.length > 0 && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <FiSearch className="text-sm" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, or customer ID..."
                            className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl shadow-2xs placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                title="Clear search"
                            >
                                <FiX className="text-sm" />
                            </button>
                        )}
                    </div>
                    <div className="text-xs text-gray-500 font-medium self-end sm:self-center">
                        Showing <span className="font-semibold text-gray-800">{filteredUsers.length}</span> of{' '}
                        <span className="font-semibold text-gray-800">{users.length}</span> registered {users.length === 1 ? 'user' : 'users'}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            {loading ? (
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center py-20 px-4">
                    <Loader size="lg" text="Loading registered users..." color="purple" />
                </div>
            ) : users.length === 0 ? (
                /* Empty Database State */
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 shadow-xs">
                        <FiUsers className="text-xl sm:text-2xl" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">No Registered Users Yet</h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-sm mt-1">
                        When customers register for accounts on your store, their credentials and profiles will appear here.
                    </p>
                </div>
            ) : filteredUsers.length === 0 ? (
                /* Search Empty State */
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center py-14 px-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 mb-3">
                        <FiSearch className="text-xl" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800">No matching users found</h3>
                    <p className="text-xs text-gray-500 max-w-sm mt-1">
                        No customer accounts match your search query "{searchQuery}".
                    </p>
                    <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="mt-3.5 px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                /* Registered Users List Container */
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
                    {/* --- Desktop & Tablet Table View --- */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-gray-50/90 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <th className="py-3.5 px-5">Customer</th>
                                    <th className="py-3.5 px-5">Email Address</th>
                                    <th className="py-3.5 px-5">Customer ID</th>
                                    <th className="py-3.5 px-5">Registered Date</th>
                                    <th className="py-3.5 px-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => {
                                    const isCopied = copiedId === user._id
                                    return (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-purple-50/20 transition-colors duration-150"
                                        >
                                            {/* Customer Name & Avatar */}
                                            <td className="py-3.5 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200/80 shadow-2xs">
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {user.name}
                                                        </p>
                                                        <span className="text-[11px] text-gray-400 block font-normal">
                                                            Customer
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email Address */}
                                            <td className="py-3.5 px-5">
                                                <a
                                                    href={`mailto:${user.email}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-purple-700 hover:underline transition-colors"
                                                    title={`Send email to ${user.email}`}
                                                >
                                                    <FiMail className="text-gray-400 shrink-0 text-sm" />
                                                    <span>{user.email}</span>
                                                </a>
                                            </td>

                                            {/* Customer ID */}
                                            <td className="py-3.5 px-5">
                                                <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
                                                    <FiHash className="text-[11px] text-gray-400 shrink-0" />
                                                    <span className="font-mono text-xs text-gray-700 max-w-[130px] truncate" title={user._id}>
                                                        {user._id}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopyId(user._id)}
                                                        title="Copy Customer ID"
                                                        className="p-1 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer rounded"
                                                    >
                                                        {isCopied ? (
                                                            <FiCheck className="text-emerald-600 text-xs" />
                                                        ) : (
                                                            <FiCopy className="text-xs" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Registered Date */}
                                            <td className="py-3.5 px-5">
                                                <div className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                                                    <FiCalendar className="text-gray-400 text-xs shrink-0" />
                                                    <span>{formatDate(user.createdAt)}</span>
                                                </div>
                                            </td>

                                            {/* Account Status Badge */}
                                            <td className="py-3.5 px-5 text-right">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Mobile Card View (< md) --- */}
                    <div className="block md:hidden divide-y divide-gray-100">
                        {filteredUsers.map((user) => {
                            const isCopied = copiedId === user._id
                            return (
                                <div key={user._id} className="p-4 flex flex-col gap-3 hover:bg-purple-50/15 transition-colors">
                                    {/* Top Row: Avatar + Name + Status */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200/80 shadow-2xs">
                                                {getInitials(user.name)}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-800 truncate">
                                                    {user.name}
                                                </h3>
                                                <a
                                                    href={`mailto:${user.email}`}
                                                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-700 truncate"
                                                >
                                                    <FiMail className="text-gray-400 shrink-0 text-xs" />
                                                    <span className="truncate">{user.email}</span>
                                                </a>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Active
                                        </span>
                                    </div>

                                    {/* Bottom Row: Customer ID & Joined Date */}
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                                        <div className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-[11px] font-mono text-gray-700">
                                            <span className="max-w-[120px] truncate">{user._id}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleCopyId(user._id)}
                                                className="text-gray-400 hover:text-purple-600 p-0.5"
                                                title="Copy ID"
                                            >
                                                {isCopied ? <FiCheck className="text-emerald-600" /> : <FiCopy />}
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                                            <FiCalendar className="text-gray-400" />
                                            <span>{formatDate(user.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users
