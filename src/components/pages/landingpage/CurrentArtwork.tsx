import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Container,
  Divider,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Carousel } from "@mantine/carousel";
import RecentArtworkCarousel from "./lib/Carousel/RecentArtworkCarousel";
import CurrentArtworkCard from "./lib/CurrentArtworkCard/CurrentArtworkCard";
import { NFT } from "../../nft/NFTExploreCard";
import { _nfts } from "./RecentArtwork";
import { getAllNFTs } from "../../../utils/getAllNFTs";

const useStyles = createStyles((theme) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/artists-section-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
    color: "white",
    minHeight: 720,
  },
}));

const CurrentArtwork = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

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
    <Box mt={96} className={classes.banner} py="5rem">
      <Container size={1760}>
        <Center mb="2rem">
          <Title weight={400} size={48}>
            Current{" "}
            <span style={{ color: theme.colors["ocean-blue"][3] }}>
              Artwork
            </span>
          </Title>
        </Center>
        <Divider mb={60} />
        <RecentArtworkCarousel>
          {nfts.map((nft, id) => (
            <Carousel.Slide key={id}>
              <CurrentArtworkCard {...nft} />
            </Carousel.Slide>
          ))}
        </RecentArtworkCarousel>
      </Container>
    </Box>
  );
};

export default CurrentArtwork;
