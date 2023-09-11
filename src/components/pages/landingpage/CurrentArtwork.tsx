import {
  Box,
  Center,
  Container,
  Divider,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import RecentArtworkCarousel from "./lib/Carousel/RecentArtworkCarousel";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import CurrentArtworkCard from "./lib/CurrentArtworkCard/CurrentArtworkCard";

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
          {[...Array(5)].map((_, id) => (
            <Carousel.Slide key={id}>
              <CurrentArtworkCard />
            </Carousel.Slide>
          ))}
        </RecentArtworkCarousel>
      </Container>
    </Box>
  );
};

export default CurrentArtwork;
