import React from "react";
import Collection from "./collection";
import { NavLink } from "react-router-dom";
import Footer from "../components/footer";
import Benefits from "../components/benifits";
const Home = () => {
  return (
    <>
      <div>
        {/* //info container */}
        <div
          className="relative h-100 md:h-130 border-2 border-gray-300 rounded-lg overflow-hidden
    mx-3 sm:mx-6 md:mx-10 lg:mx-20"
        >
          <img
            src="./personal/hero2_hs.png"
            alt="hero-img"
            className="absolute inset-0 block w-full h-full object-cover object-center"
          />

          <div className="relative z-10 flex h-full items-center justify-center md:justify-start px-4 sm:px-8 md:px-12 lg:px-20 text-center md:text-left">
            <div className="text-white">
              <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl tracking-[0.25em] uppercase">
                Fashion
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none mt-2">
                Sale
              </h1>
              <br></br>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                20% OFF ALL JACKETS AND HATS
              </p>

              <button className="text-base sm:text-lg md:text-xl lg:text-2xl bg-white text-black py-2 px-4 sm:px-6 md:px-8 lg:px-10 md:mt-20 rounded-md">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        {/* collection container  */}
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-10 sm:mt-16 md:mt-20 gap-1 sm:gap-4 text-center">
            <span className="text-2xl sm:text-3xl md:text-4xl text-gray-600">
              Latest{" "}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl">
              Collection ___
            </span>
          </div>

          <p className="text-xl sm:text-xl md:text-xl lg:text-lg text-gray-600 mx-auto max-w-5xl px-3 sm:px-6 md:px-10 lg:px-20 text-center mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </div>

        <Collection />
        <Benefits />
        <Footer />
      </div>
    </>
  );
};

export default Home;
