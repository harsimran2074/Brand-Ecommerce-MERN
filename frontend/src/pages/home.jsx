import React from "react";
import Collection from "../components/collection";
import { NavLink } from "react-router-dom";
import Footer from "../components/footer";
import Benefits from "../components/benifits";
import Hero from "../components/hero";
import Title from "../components/title";
const Home = () => {
  return (
    <>
      <div>
        <Hero />
        <Title />
        <Collection />
        <Benefits />
        <Footer />
      </div>
    </>
  );
};

export default Home;
