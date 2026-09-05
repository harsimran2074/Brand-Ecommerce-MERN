import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import dropdown from "../assets/dropdown_icon.png";
import { assets } from "../assets/assets.js";

import Product from "../components/product.jsx";
import Search from "../components/search.jsx";
import Footer from "../components/footer.jsx";


const AllCollection = () => {
  const data = useSelector((store) => store.allItemSlice.products);

  const [showFilter, setFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [priceSort, setPriceSort] = useState("relevant");
  const [search, setSearch] = useState("");

  //checking wheather category exist or not in the array
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  //checking wheather size exist or not in the array
  const toggleSize = (e) => {
    if (size.includes(e.target.value)) {
      setSize((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSize((prev) => [...prev, e.target.value]);
    }
  };


  const applyFilter = () => {
    let productCopy = data.slice();

    //category filter

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    //size filter

    if (size.length > 0) {
      productCopy = productCopy.filter((item) =>
        item.sizes.some((s) => size.includes(s)),
      );
    }

    //sort filter

    switch (priceSort) {
      case "High-Low":

        setFilterProduct(productCopy.sort((a, b) => (b.price - a.price)));
        break;

      case "Low-High":

        setFilterProduct(productCopy.sort((a, b) => (a.price - b.price)));
        break;

      default:
        setFilterProduct(productCopy);
        break;
    }

    //search filer

    if (search) {
      console.log(search);
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilterProduct(productCopy);

  };

  useEffect(() => {
    applyFilter();
  }, [category, size, priceSort, search, data]);

  //UI thing
  const handleFilter = () => {
    if (showFilter == false) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };


  return (
    <>
      <Search setSearch={setSearch} />
      <main className="container mx-auto px-2 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 ml-5 mb-6">
          <section className="max-w-2xl">
            <nav className="text-sm text-gray-500 mb-2">
              <NavLink to="/" className="hover:underline text-lg lg:text-2xl ">
                Home
              </NavLink>
              <span className="mx-2 text-gray-400         text-lg lg:text-2xl">
                /
              </span>
              <NavLink
                to="/collection"
                className="text-gray-700  text-lg lg:text-2xl"
              >
                Collection
              </NavLink>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
              SHOP ALL
            </h1>
            <p className="mt-3 text-gray-600">
              Browse our complete collection of premium clothes — curated picks
              for every season.
            </p>
          </section>

          <div className="hidden md:block w-1/3">
            <img
              src={assets.contact_img}
              alt="Shop hero"
              className="w-full h-48 lg:h-56 object-cover rounded-md shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6 container mx-auto px-4 pb-12">

          {/* filter */}

          <aside className="w-full md:w-64 bg-white border border-gray-100 rounded-md  space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800">
              <button
                onClick={handleFilter}
                className="flex items-center gap-2"
              >
                FILTER
                <img
                  src={dropdown}
                  className={`h-4 transition-transform ${showFilter ? "rotate-90" : ""} md:hidden`}
                />
              </button>
            </h2>

            <div className={`space-y-3 ${showFilter ? "" : "hidden"} sm:block`}>
              <div className="border border-gray-300 rounded-sm p-3">
                <h3 className="text-xs font-bold uppercase text-gray-700 mb-2">
                  Categories
                </h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="Men"
                      className="h-4 w-4 text-black border-gray-300 rounded"
                      onClick={toggleCategory}
                    />
                    <span>Men</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="Women"
                      className="h-4 w-4 text-black border-gray-300 rounded"
                      onClick={toggleCategory}
                    />
                    <span>Women</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-300 rounded-sm p-3">
                <h3 className="text-xs font-bold uppercase text-gray-700 mb-2">
                  Sizes
                </h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <label
                      key={size}
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="size"
                        value={size}
                        className="h-4 w-4 text-black border-gray-300 rounded"
                        onClick={toggleSize}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* //product maping */}

          <section className="flex-1">

            {/* //Product sorting */}

            <div className="flex justify-end mb-4">
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 bg-white"
              >
                <option value="relevant" onChange={(e) => setPriceSort(e.target.value)}>Sort by : Relevant</option>
                <option value="Low-High" onChange={(e) => setPriceSort(e.target.value)}>Price: Low to High</option>
                <option value="High-Low" onChange={(e) => setPriceSort(e.target.value)}>Price: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filterProduct?.map((item) => (
                <div key={item._id}>
                  <Product item={item} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AllCollection;
