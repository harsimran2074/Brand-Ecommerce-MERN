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
      <div className="container mx-auto px-2 py-8 flex flex-col lg:flex-row gap-6">
        <section>
          <div>
            {data?.map((item, index) => {
              return (
                <BagItem
                  key={`${item._id}-${item.size || 'default'}-${index}`}
                  data={item}
                />
              );
            })}
          </div>
        </section>

        <section>
        <BagSummery items={data}/>
        </section>
      </div>
    </>
  );
};

export default Cart;
