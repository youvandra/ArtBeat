import { useEffect, useState } from "react";

import { useMediaQuery } from "@mantine/hooks";
import {
  Box,
  Center,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";

import NFTExploreCard, { NFT } from "../../nft/NFTExploreCard";
import RecentArtworkCarousel from "./lib/Carousel/RecentArtworkCarousel";

import CirclePattern from "../../icons/CirclePattern";

import { getAllNFTs } from "../../../utils/getAllNFTs";

const nft: NFT = {
  tokenId: "random01",
  // @ts-ignore
  metadata: {
    artist: "random01",
    image: "https://placehold.co/253x258",
    title: "A Beautiful Art From Heaven",
    price: "$200000",
    year: "2022",
    description: "A painted compass shoe inspired by west java batik",
  },
  price: "$200000",
};

export const _nfts = [...Array(5)].map(() => nft);

export default function RecentArtwork() {
  const theme = useMantineTheme();
  const isGreaterThanTabletViewport = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px)`,
    true,
    { getInitialValueInEffect: false }
  );

  const [nfts, setNfts] = useState<NFT[]>(_nfts);
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
    <Container size="xl" my={96}>
      <Stack spacing={50}>
        <Group position="apart" sx={{ borderBottom: "1px solid white" }}>
          <Title size={36} order={2} sx={{ color: "white" }}>
            <Box<"span">
              component="span"
              sx={{
                color: theme.colors["ocean-blue"][1],
                position: "relative",
              }}
            >
              Special Artworks{" "}
              {isGreaterThanTabletViewport && (
                <Box
                  sx={{
                    position: "absolute",
                    width: "90%",
                    borderBottom: `1px solid ${theme.colors["ocean-blue"][1]}`,
                  }}
                />
              )}
            </Box>{" "}
            From Local Artist
          </Title>
          <Text
            component={NextLink}
            href="/explore"
            variant="link"
            sx={{
              fontFamily: theme.headings.fontFamily,
              color: theme.colors["ocean-blue"][1],
              fontSize: 28,
              position: "relative",
              zIndex: 2,
            }}
          >
            See All
          </Text>
        </Group>
        {isFetching ? (
          <Center mt={"xl"}>
            <Loader />
          </Center>
        ) : (
          <Box sx={{ position: "relative" }}>
            <CirclePattern
              sx={{ position: "absolute", right: 0, top: "-5rem" }}
            />
            <RecentArtworkCarousel>
              {nfts.reverse().map((nft, i) => (
                <Carousel.Slide key={i}>
                  <NFTExploreCard {...nft} />
                </Carousel.Slide>
              ))}
            </RecentArtworkCarousel>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
