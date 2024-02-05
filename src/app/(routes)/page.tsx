import Author from "@/components/Author";
import BookSession from "@/components/BookSession";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";

import WhatWeOffer from "@/components/WhatWeOffer";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="md:px-16 px-4 py-16 pt-32 bg-black  ">
          <Hero />
        </div>

        <div className="md:px-16 px-4">
          <Author />
          <WhatWeOffer />
        </div>

        <Reviews />

        <BookSession />
        <Footer />
      </div>
    </>
  );
};

export default Home;
