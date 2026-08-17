import React from "react";
import about_img from "../assets/about_img.png";
import Footer from "../components/footer";
const About = () => {
  return (
    <>
    <main className="container mx-auto p-6">
      <div className="mb-4 w-full h-30  bg-gray-200 border border-gray-300 rounded-md p-4">
        <h1 className="text-5xl font-bold mb-4">ABOUT US ___</h1>
        <p className="text-xs pt-2 ">Proud of Where We Come From</p>
      </div>
      <section className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={about_img}
          alt="About us"
          className="w-full md:w-1/2 object-cover rounded-md shadow-sm"
        />
        <div className="md:flex-1 text-gray-700">
          <h1 className="text-3xl font-bold mb-4">Our Story</h1>
          <p>
            We started with a simple idea: clothing can be more than just
            fashion—it can be a way to express who you are and where you come
            from. Our T-shirts are inspired by Kamboj culture, identity, and the
            pride that connects our community. We wanted to create something
            that today's youth could wear every day while still carrying a
            connection to their roots.
          </p>

          <h1 className="text-3xl font-bold mb-4 mt-8">More Than a T-Shirt</h1>
          <p>
            Every design we create represents something meaningful to us. From
            Kamboj-inspired prints to modern streetwear styles, our T-shirts are
            made for those who are proud of their identity and want to express
            it confidently.It's not just about what you wear; it's about what
            you represent.{" "}
          </p>
        </div>
      </section>
      
      <section className="mt-10 mb-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-base sm:text-2xl font-bold ">Why choose us ____</h2>
            <p className="text-gray-600 mt-2 max-w-xl">Quality products, thoughtful design, and service you can trust — tailored for everyday life.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex gap-6 p-6 bg-white border border-gray-400 rounded-lg shadow-sm hover:shadow-md transition">
            <div className=" h-16 w-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">QA</div>
            <div>
              <h3 className="text-xl font-semibold">Quality Assurance</h3>
              <p className="text-base text-gray-600 mt-2">We carefully select and vet every product to meet strict quality standards.</p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-white border border-gray-400 rounded-lg shadow-sm hover:shadow-md transition">
            <div className=" h-16 w-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">CV</div>
            <div>
              <h3 className="text-xl font-semibold">Convenience</h3>
              <p className="text-base text-gray-600 mt-2">A smooth checkout and easy returns make shopping with us effortless.</p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-white border border-gray-400 rounded-lg shadow-sm hover:shadow-md transition">
            <div className=" h-16 w-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">CS</div>
            <div>
              <h3 className="text-xl font-semibold">Exceptional Support</h3>
              <p className="text-base text-gray-600 mt-2">Our team is ready to help — fast, friendly, and helpful support whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
      <Footer/>
      </>
  );
};

export default About;
