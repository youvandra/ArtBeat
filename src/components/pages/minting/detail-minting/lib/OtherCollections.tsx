import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { Box, Container, Title, createStyles } from "@mantine/core";

import { AiOutlineArrowRight } from "react-icons/ai";
import ArtworkCard from "../../../../ArtworkCard";
import { NFT } from "../../../../nft/NFTExploreCard";
import { getAllNFTsById } from "../../../../../utils/getAllNFTsById";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    minHeight: 500,
  },
  title: {
    borderBottom: `1px solid black`,
  },
}));

const ids = [{ id: 1 }, { id: 2 }, { id: 3 }];

const OtherCollections = () => {
  const { classes } = useStyles();

  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    async function updateNFTs() {
      setNfts(await getAllNFTsById(ids));
    }
    updateNFTs();
  }, []);

  return (
    <Box className={classes.container} mt="5rem" py="5rem">
      <Container pt="3rem" size="xl">
        <Title weight={400} color="ocean-blue.3" className={classes.title}>
          Christian Buehner
          <Box<"span"> component="span" ml="sm" sx={{ color: "black" }}>
            Other Collections
          </Box>
        </Title>

        <SimpleGrid
          mt="xl"
          breakpoints={[
            {
              maxWidth: "sm",
              cols: 1,
            },
            {
              maxWidth: "md",
              cols: 2,
            },
            {
              minWidth: "md",
              cols: 3,
            },
          ]}
        >
          {nfts.length > 0 ? (
            nfts.map((nft, i) => (
              <ArtworkCard
                key={1}
                titleProps={{ text: "Van Gogh Portrait" }}
                artistProps={{ text: "Christian Buehner" }}
                priceProps={{ text: "$500" }}
                buttonProps={{ href: "/minting" }}
                imageProps={{ src: nft.metadata.image }}
                {...nft}
              />
            ))
          ) : (
            <div></div>
          )}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OtherCollections;
