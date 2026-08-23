import React from "react";
import { useState } from "react";
import dropdown from "../assets/dropdown_icon.png";
import Title from "./title";
const Filter = () => {
  const [showFilter, setFilter] = useState(false);
  const handleFilter = () => {
    if (showFilter == false) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };
  return (
    <>
      <aside className="w-full md:w-64 bg-white border border-gray-100 rounded-md  space-y-4">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800">
          <button onClick={handleFilter} className="flex items-center gap-2">
            FILTER
            <img
              src={dropdown}
              className={`h-4 transition-transform ${showFilter ? "rotate-90" : ""}`}
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
                />
                <span>Men</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  value="Women"
                  className="h-4 w-4 text-black border-gray-300 rounded"
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
                <label key={size} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="size"
                    value={size}
                    className="h-4 w-4 text-black border-gray-300 rounded"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>


    </>
  );
};

export default Filter;
