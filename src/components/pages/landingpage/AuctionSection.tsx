import Image from "next/image";

import { Box, Center, SimpleGrid } from "@mantine/core";

import AuctionHeader from "./lib/Auction/Header";
import AuctionContent from "./lib/Auction/Content";

import AuctionSample1 from "../../../../public/auction-sample-1.png";
import CircleCurlPattern from "../../icons/CircleCurlPattern";

const AuctionSection = () => {
  return (
    <Box sx={{ position: "relative" }} mb="5rem">
      <AuctionHeader />

      <CircleCurlPattern sx={{ position: "absolute", bottom: 0 }} />

      <Center>
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
          <Image
            src={AuctionSample1.src}
            width={405}
            height={416}
            objectFit="contain"
          />
          <AuctionContent />
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default AuctionSection;
