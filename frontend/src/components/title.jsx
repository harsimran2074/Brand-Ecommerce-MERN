import React from 'react'

const Title = () => {
  return (
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
  )
}

export default Title