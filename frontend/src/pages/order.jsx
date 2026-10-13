import Footer from "../components/footer";
// import { useMemo } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Orders = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [orderItems, setOrderItems] = useState([])

  const getOrders = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get(backendUrl + "/api/order/userOrders", {
        headers: { token }
      })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['orderId'] = order._id
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderItems(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error("[Orders Page - Fetch User Orders Error]:", error.message);
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>{orderItems.length === 0 ? <p className="flex justify-center items-center h-[70vh] text-gray-700 text-sm md:text-2xl">No orders yet </p> : <div>
      <div className="border-t pt-10 min-h-[70vh] px-4 sm:px-10 lg:px-24">
        <div className="mb-6">
          <p className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-700">
            My Orders <span className="text-gray-400 font-light">__</span>
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {orderItems?.map((item, index) => {
            const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;

            return (
              <div
                key={index}
                className="py-4 border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Product Info */}
                <div className="flex items-start gap-4 text-sm">
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-16 sm:w-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="sm:text-base font-medium text-gray-800">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg font-semibold">₹{item.price}</p>
                      <p>Quantity: {item.quantity || 1}</p>
                      <p>Size: {item.size || "M"}</p>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Status & Track Order Button */}
                <div className="md:w-1/2 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`min-w-2 h-2 rounded-full ${item.payment === true ? "bg-green-500" : "bg-amber-500"}`}></p>
                      <p className="text-sm md:text-base text-gray-600">
                        {item.payment === true ? "Paid / Order Confirmed" : "Payment Pending"}
                      </p>
                    </div>
                    {item.payment === false && (
                      <p className="mt-1 text-xs text-gray-500">
                        Complete payment to confirm your order.
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/trackOrder?orderId=${encodeURIComponent(item.orderId)}`}
                    className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm text-gray-700 hover:bg-black hover:text-white transition cursor-pointer"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>}
      <Footer />
    </>
  );
};

export default Orders;
