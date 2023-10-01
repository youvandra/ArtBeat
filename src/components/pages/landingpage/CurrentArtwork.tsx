import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Container,
  Divider,
  Loader,
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
    minHeight: 300,
  },
}));

const CurrentArtwork = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [nfts, setNfts] = useState<NFT[]>(_nfts);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    getAllNFTs()
      .then((n) => {
        setNfts(n);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(true);
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
        
          {isFetching? (
            <Center mt={"xl"}>
              <Loader />
            </Center>
          ) : (
          <RecentArtworkCarousel>
          {nfts.slice(0,10).map((nft, id) => (
            <Carousel.Slide key={id}>
              <CurrentArtworkCard {...nft} />
            </Carousel.Slide>
          ))}
          </RecentArtworkCarousel>
          )}
      </Container>
    </Box>
  );
};

export default CurrentArtwork;
