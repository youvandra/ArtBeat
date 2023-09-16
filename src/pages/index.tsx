import React from "react";
import { NextPageWithLayout } from "./_app";

import About from "../components/pages/landingpage/About";
// import ArtisitsSection from "../components/pages/landingpage/ArtisitsSection";
import Hero from "../components/pages/landingpage/Hero";
// import MuseumSection from "../components/pages/landingpage/MuseumSection";
import RecentArtwork from "../components/pages/landingpage/RecentArtwork";
import AuctionSection from "../components/pages/landingpage/AuctionSection";
import CurrentArtwork from "../components/pages/landingpage/CurrentArtwork";
import UnderconstructionComponent from "../components/pages/UnderconsturctionComponent";

import WithAppshell from "../layout/WithAppshell";

const Landingpage: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
      <RecentArtwork />
      <About />
      <AuctionSection />
      {/* <MuseumSection /> */}
      {/* <ArtisitsSection /> */}
      <CurrentArtwork />
    </>
  );
};

// Landingpage.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

// export default Landingpage;

const Page = () => {
  if (process.env.NODE_ENV == "development") {
    return <Landingpage />;
  }
  
  return <UnderconstructionComponent />;
};

Page.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

export default Page;
