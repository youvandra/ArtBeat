import { Carousel } from "@mantine/carousel";
import {
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { getAllNFTs } from "../../../utils/getAllNFTs";
import NFTExploreCard, { NFT } from "../../nft/NFTExploreCard";
import RecentArtworkCarousel from "./CustomCarousel";

const useStyles = createStyles((t) => ({
  container: { position: "relative" },
  filter: {
    position: "absolute",
    alignSelf: "center",
    [t.fn.smallerThan("md")]: {
      marginLeft: 16,
      marginRight: 16,
    },
  },
  filterContainer: {
    [t.fn.smallerThan("md")]: {
      flexDirection: "column",
      gap: 16,
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

export default function RecentArtwork() {
  const { classes } = useStyles();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getAllNFTs()
      .then((n) => {
        setNfts(n);
      })
      .catch(() => {
        showNotification({
          message: "there was a problem fetching the NFTs",
          color: "red",
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
  return (
    <Box py={96} px={"xl"} style={{ backgroundColor: "#354F52" }}>
      <Group position="apart" mb={36}>
        <Title color="white" size={36} order={2}>
          <span style={{ color: "#65E4A3" }}>Special Artworks</span> From Local
          Artist
        </Title>
        <Text
          sx={{ color: "#65E4A3", fontFamily: "Libre Baskerville" }}
          component={NextLink}
          href="/explore"
          variant="link"
        >
          See All
        </Text>
      </Group>
      {isFetching ? (
        <Center mt={"xl"}>
          <Loader />
        </Center>
      ) : (
        <RecentArtworkCarousel>
          {nfts.reverse().map((nft, i) => (
            <Carousel.Slide key={i}>
              <NFTExploreCard {...nft} />
            </Carousel.Slide>
          ))}
        </RecentArtworkCarousel>
      )}
    </Box>
  );
}
