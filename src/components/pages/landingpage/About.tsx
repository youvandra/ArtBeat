import {
  Center,
  Container,
  createStyles,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { YOUTUBE_VIDEO } from "../../../const";

const useStyles = createStyles((t) => ({
  banner: {
    // width: "100%",
    // backgroundImage: "url('/landing-banner.jpg')",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    // backgroundPositionY: "50%",
    // position: "relative",
    color: "white",
  },
  iframe: {
    height: 327,
    width: "100%",
    [t.fn.smallerThan("xs")]: {
      width: "auto",
      height: "auto",
    },
  },
}));

export default function About() {
  const theme = useMantineTheme();

  const { classes } = useStyles();

  return (
    <Container size="xl" className={classes.banner} py={96}>
      <Stack spacing="xl">
        <Title size="64px">
          NFT Certificate for <br /> Artwork
        </Title>
        <SimpleGrid
          spacing="xl"
          breakpoints={[
            { maxWidth: "md", cols: 1 },
            { minWidth: "md", cols: 2 },
          ]}
        >
          <iframe className={classes.iframe} src={YOUTUBE_VIDEO} />
          <Stack spacing="md">
            <Text size={24} sx={{ maxWidth: 544 }}>
              ArtBeat uses blockchain technology and NFT to create the
              certificate of authenticity for artworks. Every certificates has
              been tokenized to prove the legitimacy of the art.
            </Text>
            <Center>
              <Text size={24} sx={{ maxWidth: 544 }}>
                NFTs, or Non-Fungible Tokens, are unique digital assets on a
                blockchain, proving ownership and authenticity of digital items
                like art or collectibles.
              </Text>
            </Center>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
