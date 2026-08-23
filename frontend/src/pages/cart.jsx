import React from "react";
import p_img1 from "../assets/p_img1.png";
import p_img2_1 from "../assets/p_img2_1.png";
import p_img3 from "../assets/p_img3.png";
import BagItem from "../components/BagItem";
import BagSummery from "../components/bagSummer";
import { useSelector } from "react-redux";
const Cart = () => {
  const data = useSelector((store) => store.bagItemSlice)
  return (
    <>
          <p className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-gray-600  ml-6 md:ml-20  lg:ml-30 mt-6  mb-6">Your Cart __</p>
      <div className="container mx-auto px-2 py-8 flex flex-col md:flex-row gap-6">
        <section>
          <div>
            {data?.map((data) => {
              return <BagItem key={data._id} data={data} />;
            })}
          </div>
        </section>

        <section>
        <BagSummery />
        </section>
      </div>
    </>
  );
};

export default Cart;
