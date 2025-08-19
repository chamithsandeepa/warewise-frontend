import React from "react";
import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import BestSeller from "../Components/BestSeller";
import Policy from "../Components/Policy";
import NewsLetterBox from "../Components/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
