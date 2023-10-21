import Image from "next/image";

import { Box, Center, Loader, SimpleGrid, useMantineTheme } from "@mantine/core";

import AuctionHeader from "./lib/Auction/Header";
import AuctionContent from "./lib/Auction/Content";

import AuctionSample1 from "../../../../public/auction-sample-1.png";
import CircleCurlPattern from "../../icons/CircleCurlPattern";
import { useEffect, useState } from "react";
import { loadAuction } from "../../../utils/auction/services/blockchain";



const AuctionSection = () => {
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();
  useEffect(() => {
    loadAuctionsData();
  }, []);

  const loadAuctionsData = async () => {
    try {
      const result = await loadAuction(4); // Change the parameter to the auction ID you want to load
      setAuction(result);
      setLoading(false);
    } catch (error) {
      console.error('Error loading auction:', error);
      setLoading(true);
    }
  };
  return (
    <Box sx={{ position: "relative" }} mb="5rem">
      <AuctionHeader />
      <CircleCurlPattern sx={{ position: "absolute", bottom: 0 }} />
      {loading ? (
      <Center mt={"xl"}>
        <Loader />
      </Center>
    ) : (
      <Center >
        <SimpleGrid
          breakpoints={[
            {
              maxWidth: "md",
              cols: 1,
            },
            {
              minWidth: "md",
              cols: 2,
            },
          ]}
          
        >

          
            <img
              style={{
                border: "1px solid white",
                float: "left",
                marginRight: "70px", 
                borderRadius: "50px",
                boxShadow: "20px 20px 25px rgba(0, 0, 0, 0.2)",
              }}
              src={auction?.image}
              width={500}
              height={500}
              
            />
          <AuctionContent />
        </SimpleGrid>
      </Center>
    )}
    <br></br><br></br><br></br><br></br><br></br><br></br>
    </Box>
    
  );
};

export default AuctionSection;
