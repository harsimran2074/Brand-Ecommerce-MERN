import { createSlice } from "@reduxjs/toolkit"


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

export const  bagItemSlice = createSlice({
   name:"bagItems",
   initialState = data,
   reducers: {
      addToBag: (state,action) => {
         return [...state,action.payload]
      },
      removeFromCart : (state,action) => {
         return [ state.filter((item)=> (state.id !== action.payload))]
      }
   }
})

