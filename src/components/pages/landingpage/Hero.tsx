import {
  Image,
  createStyles,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Box,
  Space,
  Container,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import SearchInput from "./SearchInput";
import RectangleCircleShape from "./lib/RectangleCircleShape/RectangleCircleShape";

const useStyles = createStyles((theme) => ({
  container: {
    color: "white",
    position: "relative",
    paddingTop: '10rem',
    paddingBottom: 155,
    display: "flex",
    [theme.fn.largerThan("md")]: {
      display: "grid",
      // gridColumn: "1f 1fr",
      paddingTop: 64 + 155,
    },
  },
  onbig: {
    [theme.fn.smallerThan("md")]: { display: "none" },
  },
  heading: {
    fontSize: 64,
    [theme.fn.smallerThan("md")]: { fontSize: 58 },
  },
}));

export default function Hero() {
  const { classes } = useStyles();
  return (
    <Container size="xl">
      <SimpleGrid className={classes.container} cols={2}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Stack
            align="start"
            spacing="xl"
            sx={{ zIndex: 2, position: "relative" }}
          >
            <Title className={classes.heading}>
              Local Artwork, <br />
              Globe Inspiring
            </Title>
            <Stack spacing="sm">
              <Text size={"md"} sx={{ maxWidth: 418 }}>
                Curated art marketplace that helps you discover and buy
                authentic artworks also helping to advance small businesses
              </Text>{" "}
              <Text
                variant="link"
                sx={{ color: "white" }}
                mt={"md"}
                weight={500}
                href={"/explore"}
                component={NextLink}
              >
                More Arts
              </Text>
            </Stack>
            <Space mt={"lg"} />
            <SearchInput />
          </Stack>
          <Box
            sx={{
              position: "absolute",
              top: -80,
              right: 50,
              zIndex: 1,
            }}
          >
            <RectangleCircleShape />
          </Box>
        </Box>

        <Box
          sx={{
            placeSelf: "center",
            marginTop: -50,
          }}
          className={classes.onbig}
        >
          <Image src="/ab2.png" />
        </Box>
      </SimpleGrid>
    </Container>
  );
}
