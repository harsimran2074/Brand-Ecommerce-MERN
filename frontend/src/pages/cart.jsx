import React from "react";
import p_img1 from "../assets/p_img1.png";
import p_img2_1 from "../assets/p_img2_1.png";
import p_img3 from "../assets/p_img3.png";
import BagItem from "../components/BagItem";
import BagSummery from "../components/bagSummer";
const Cart = () => {
  const data = [
    {
      _id: "aaaaa",
      name: "Women Round Neck Cotton Top",
      description:
        "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 100,
      image: [p_img1],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      date: 1716634345448,
      bestseller: true,
    },
    {
      _id: "aaaab",
      name: "Men Round Neck Pure Cotton T-shirt",
      description:
        "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 200,
      image: [p_img2_1],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["M", "L", "XL"],
      date: 1716621345448,
      bestseller: true,
    },
    {
      _id: "aaaac",
      name: "Girls Round Neck Cotton Top",
      description:
        "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 220,
      image: [p_img3],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "L", "XL"],
      date: 1716234545448,
      bestseller: true,
    },
  ];
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
