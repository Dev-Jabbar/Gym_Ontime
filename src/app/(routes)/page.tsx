import Author from "@/components/Author";
import BookSession from "@/components/BookSession";

import Hero from "@/components/Hero";
import Footer from "@/components/layout/Footer";
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
        <Author />
        <WhatWeOffer />

        <Reviews />

        <BookSession />
        <Footer />

        {/**  <div className="md:px-16 px-4">
         
        </div>

       
        */}
      </div>
    </>
  );
};

export default Home;
