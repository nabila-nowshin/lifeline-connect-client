import React from "react";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import ContactUs from "../components/ContactUs";
import Steps from "../components/Steps";
import Statistics from "../components/Statistics";
import WhoCanDonate from "../components/WhoCanDonate";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <Steps></Steps>
      <Statistics></Statistics>
      <WhoCanDonate></WhoCanDonate>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
