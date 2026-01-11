import React from "react";
import Advertisement from "./Advertisement/Advertisement";
import Banner from "./Banner/Banner";
import LatestTickets from "./LatestTickets/LatestTickets";
import PopularRoutes from "./PopularRoutes/PopularRoutes";
import BrandPromise from "./BrandPromise/BrandPromise";
import FinalCTA from "./FinalCTA/FinalCTA";
import NewsletterSignup from "./NewsletterSignup/NewsletterSignup";
import PlatformStatistics from "./PlatformStatistics/PlatformStatistics";
import Testimonials from "./Testimonials/Testimonials";
import TravelInspiration from "./TravelInspiration/TravelInspiration";
import VisualHighlight from "./VisualHighlight/VisualHighlight";
import TrustBadges from "./TrustBadges/TrustBadges";
import FAQ from "./FAQ/FAQ";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";
const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner />
      <Advertisement />
      <PopularRoutes />
      <BrandPromise />
      <LatestTickets />
      <TrustBadges />
      <VisualHighlight />
      <PlatformStatistics />
      <Testimonials />
      <TravelInspiration />
      <NewsletterSignup />
      <FAQ></FAQ>
      <FinalCTA />
    </div>
  );
};

export default Home;
