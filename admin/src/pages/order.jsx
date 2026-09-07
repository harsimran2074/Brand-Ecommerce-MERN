import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = () => {
    const [orderData, setOrderData] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const token = localStorage.getItem("token")
    const showOrders = async () => {

        try {
            const res = await axios.get(backendUrl + "/api/order/list", { headers: { token } })
            if (res.data.success) {
                setOrderData(res.data.allorders)
                console.log(res);
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        showOrders()
    }, [])


    return (
        <>
            <p>orders</p>
        </>

    )
}

export default Order