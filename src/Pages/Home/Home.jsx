import React from "react";
import Advertisement from "./Advertisement/Advertisement";
import Banner from "./Banner/Banner";
import LatestTickets from "./LatestTickets/LatestTickets";
import PopularRoutes from "./PopularRoutes/PopularRoutes";
import StartJourney from "./StartJourney/StartJourney";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Advertisement></Advertisement>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <StartJourney></StartJourney> 

    </div>
  );
};

export default Home;
