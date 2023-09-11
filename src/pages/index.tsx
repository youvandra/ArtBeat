import React from "react";
import About from "../components/pages/landingpage/About";
import ArtisitsSection from "../components/pages/landingpage/ArtisitsSection";
import Hero from "../components/pages/landingpage/Hero";
// import MuseumSection from "../components/pages/landingpage/MuseumSection";
import RecentArtwork from "../components/pages/landingpage/RecentArtwork";
import AuctionSection from "../components/pages/landingpage/AuctionSection";
import CurrentArtwork from "../components/pages/landingpage/CurrentArtwork";

export default function Landingpage() {
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
}
