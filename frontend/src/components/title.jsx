

import React from "react";

const Title = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mt-14 sm:mt-20 md:mt-24">
        {/* Heading */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-sm sm:text-base md:text-lg tracking-[0.25em] text-gray-500">
            OUR
          </span>

          <span className="h-px w-8 sm:w-12 bg-gray-400" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900">
            BEST SELLERS
          </h2>

          <span className="h-px w-8 sm:w-12 bg-gray-400" />
        </div>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-center text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
          Discover the pieces our customers love the most — thoughtfully
          selected for quality, style, and everyday wear.
        </p>

        {/* Decorative line */}
        <div className="mt-6 h-1 w-10 rounded-full bg-gray-900" />
      </div>
    </section>
  );
};

export default Title;

