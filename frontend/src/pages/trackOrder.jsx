import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiCreditCard,
  FiHash,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

const ORDER_STAGES = [
  { label: "Order Placed", Icon: FiShoppingBag },
  { label: "Packing", Icon: FiPackage },
  { label: "Shipped", Icon: FiTruck },
  { label: "Out for delivery", Icon: FiTruck },
  { label: "Delivered", Icon: FiCheckCircle },
];

const getCurrentStageIndex = (status) => {
  const normalizedStatus = status?.trim().replace(/\s+/g, " ").toLowerCase();
  const canonicalStatus = {
    processing: "packing",
    packaging: "packing",
  }[normalizedStatus] || normalizedStatus;
  const index = ORDER_STAGES.findIndex(
    ({ label }) => label.toLowerCase() === canonicalStatus
  );
  return index < 0 ? 0 : index;
};

const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString();
};

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchOrder = async () => {
      if (!orderId) {
        setError("Select an order from My Orders to view its details.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/order/userOrders`, {
          headers: { token },
        });

        if (!response.data.success || !Array.isArray(response.data.orders)) {
          throw new Error(response.data.message || response.data.msg || "Unable to load this order.");
        }

        const userOrder = response.data.orders.find(
          (userOrderItem) => userOrderItem._id === orderId
        );

        if (!userOrder) {
          throw new Error("This order was not found in your account.");
        }

        if (isCurrentRequest) {
          setOrder(userOrder);
        }
      } catch (fetchError) {
        console.error("[Track Order Page - Fetch Order Error]:", fetchError.message);
        if (isCurrentRequest) {
          setError(
            fetchError.response?.data?.message ||
              fetchError.response?.data?.msg ||
              fetchError.message
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      isCurrentRequest = false;
    };
  }, [backendUrl, orderId]);

  const currentStageIndex = getCurrentStageIndex(order?.status);
  const isPaid = order?.payment === true;

  return (
    <>
      <main className="min-h-[70vh] border-t border-gray-100 bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to My Orders
          </Link>
          <div className="mb-6 mt-5 sm:mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-600">
              Order updates
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Track your order
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              View your order details and follow its progress.
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm sm:p-8">
              Loading order details...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-white p-5 text-sm text-red-700 shadow-sm sm:p-6">
              {error}
            </div>
          ) : order ? (
            <div className="space-y-4 sm:space-y-6">
              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
                  <div className="flex min-w-0 items-start gap-3 p-4 sm:border-b sm:border-r sm:p-5 lg:border-b-0">
                    <FiHash className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="mt-1 break-all text-sm font-semibold text-gray-900">{order._id}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 sm:border-b sm:p-5 lg:border-b-0 lg:border-r">
                    <FiCalendar className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-gray-600">Order date</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 sm:border-r sm:p-5 lg:border-r-0">
                    <FiTruck className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Current status</p>
                      <p className="mt-1 break-words text-sm font-semibold text-gray-900">{order.status}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 sm:p-5 lg:border-r">
                    <FiCreditCard className={`mt-0.5 h-5 w-5 shrink-0 ${isPaid ? "text-emerald-700" : "text-amber-700"}`} aria-hidden="true" />
                    <div>
                      <p className="text-sm text-gray-600">Payment status</p>
                      <p className={`mt-1 text-sm font-semibold ${isPaid ? "text-emerald-700" : "text-amber-700"}`}>
                        {isPaid ? "Paid" : "Payment Pending"}
                      </p>
                      {order.paymentMethod && (
                        <p className="mt-1 break-words text-sm text-gray-600">Method: {order.paymentMethod}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 sm:border-t sm:p-5 lg:border-t-0 lg:border-r">
                    <FiPackage className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-gray-600">Total amount</p>
                      <p className="mt-1 text-base font-bold text-gray-900">₹{order.amount}</p>
                    </div>
                  </div>
                </div>
                {!isPaid && (
                  <p className="border-t border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-900 sm:px-5">
                    Complete payment to confirm your order.
                  </p>
                )}
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-6 flex items-start gap-3">
                  <FiTruck className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" aria-hidden="true" />
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Order progress</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {isPaid ? `Current status: ${order.status}` : "Awaiting payment confirmation"}
                    </p>
                  </div>
                </div>
                <div className="[--timeline-node:40px] [--timeline-row:80px] md:[--timeline-node:48px]">
                  <div className="md:hidden">
                    <ol className="flex flex-col">
                      {ORDER_STAGES.map(({ label, Icon }, index) => {
                        const isCurrent = isPaid && currentStageIndex === index;
                        const isComplete = isPaid && currentStageIndex > index;
                        const isReached = isCurrent || isComplete;
                        const isDelivered = isCurrent && index === ORDER_STAGES.length - 1;
                        const hasGreenConnector = isPaid && index < currentStageIndex;

                        return (
                          <li key={label} className="relative flex h-20 gap-4">
                            {index < ORDER_STAGES.length - 1 && (
                              <span
                                aria-hidden="true"
                                className={`absolute bottom-[calc(var(--timeline-node)/-2)] left-[calc(var(--timeline-node)/2-2px)] top-[calc(var(--timeline-node)/2)] z-10 w-1 ${
                                  hasGreenConnector ? "bg-emerald-600" : "bg-gray-300"
                                }`}
                              />
                            )}
                            <span
                              aria-hidden="true"
                              className={`relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white ${
                                isComplete
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : isDelivered
                                    ? "border-emerald-600 bg-emerald-600 text-white ring-4 ring-emerald-100"
                                  : isCurrent
                                    ? "border-emerald-600 text-emerald-700 ring-4 ring-emerald-100"
                                    : "border-gray-300 text-gray-500"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              {(isComplete || isDelivered) && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                                  <FiCheck className="h-3 w-3" aria-hidden="true" />
                                </span>
                              )}
                            </span>
                            <div className="min-w-0 py-2">
                              <p className={`break-words text-sm font-semibold ${isReached ? "text-gray-900" : "text-gray-600"}`}>
                                {label}
                              </p>
                              <p className={`mt-1 text-sm ${isCurrent ? "font-medium text-emerald-700" : isComplete ? "text-emerald-700" : "text-gray-600"}`}>
                                {isCurrent ? "Current status" : isComplete ? "Complete" : "Upcoming"}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <div className="hidden md:block">
                    <ol className="relative flex">
                      {ORDER_STAGES.map(({ label, Icon }, index) => {
                        const isCurrent = isPaid && currentStageIndex === index;
                        const isComplete = isPaid && currentStageIndex > index;
                        const isReached = isCurrent || isComplete;
                        const isDelivered = isCurrent && index === ORDER_STAGES.length - 1;
                        const hasGreenConnector = isPaid && index < currentStageIndex;

                        return (
                          <li key={label} className="relative flex min-w-0 flex-1 flex-col items-center px-1 text-center">
                            {index < ORDER_STAGES.length - 1 && (
                              <span
                                aria-hidden="true"
                                className={`absolute left-1/2 right-[-50%] top-[calc(var(--timeline-node)/2-2px)] z-10 h-1 ${
                                  hasGreenConnector ? "bg-emerald-600" : "bg-gray-300"
                                }`}
                              />
                            )}
                            <span
                              aria-hidden="true"
                              className={`relative z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white ${
                                isComplete
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : isDelivered
                                    ? "border-emerald-600 bg-emerald-600 text-white ring-4 ring-emerald-100"
                                  : isCurrent
                                    ? "border-emerald-600 text-emerald-700 ring-4 ring-emerald-100"
                                    : "border-gray-300 text-gray-500"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              {(isComplete || isDelivered) && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                                  <FiCheck className="h-3 w-3" aria-hidden="true" />
                                </span>
                              )}
                            </span>
                            <p className={`mt-3 max-w-full break-words text-sm font-semibold ${isReached ? "text-gray-900" : "text-gray-600"}`}>
                              {label}
                            </p>
                            <p className={`mt-1 text-sm ${isCurrent ? "font-medium text-emerald-700" : isComplete ? "text-emerald-700" : "text-gray-600"}`}>
                              {isCurrent ? "Current status" : isComplete ? "Complete" : "Upcoming"}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
                {!isPaid && (
                  <p className="mt-5 border-t border-gray-100 pt-4 text-sm leading-5 text-gray-600">
                    Order progress will update after payment is confirmed.
                  </p>
                )}
              </section>

              <div className={`grid grid-cols-1 items-start gap-4 ${order.address ? "md:grid-cols-2" : ""}`}>
                <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <div className="flex items-center gap-3">
                    <FiPackage className="h-5 w-5 shrink-0 text-gray-600" aria-hidden="true" />
                    <h2 className="text-base font-semibold text-gray-900">Items in this order</h2>
                  </div>
                  <ul className="mt-4 divide-y divide-gray-100">
                    {order.items?.map((item, index) => (
                      <li
                        key={`${order._id}-${index}`}
                        className="flex min-w-0 items-start gap-3 py-3"
                      >
                        <FiShoppingBag className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <p className="min-w-0 break-words text-sm font-medium text-gray-800">
                            {item.name || "Product"}
                            {item.size ? ` (${item.size})` : ""}
                          </p>
                          <p className="shrink-0 text-sm text-gray-700">Quantity: {item.quantity || 1}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {order.address && (
                  <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex items-center gap-3">
                      <FiMapPin className="h-5 w-5 shrink-0 text-gray-600" aria-hidden="true" />
                      <h2 className="text-base font-semibold text-gray-900">Delivery address</h2>
                    </div>
                    <address className="mt-4 break-words text-sm not-italic leading-6 text-gray-700">
                      {[order.address.firstName, order.address.lastName].filter(Boolean).join(" ")}
                      {order.address.street && <><br />{order.address.street}</>}
                      {[
                        order.address.city,
                        order.address.state,
                        order.address.pincode,
                      ].filter(Boolean).length > 0 && (
                        <>
                          <br />
                          {[
                            order.address.city,
                            order.address.state,
                            order.address.pincode,
                          ].filter(Boolean).join(", ")}
                        </>
                      )}
                      {order.address.phone && <><br />{order.address.phone}</>}
                    </address>
                  </section>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TrackOrder;
