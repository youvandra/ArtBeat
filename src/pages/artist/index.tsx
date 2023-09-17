import {
  Box,
  Center,
  Container,
  createStyles,
  Divider,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import ArtistCard from "../../components/pages/artist/ArtistCard";
import WithAppshell from "../../layout/WithAppshell";
import { trpc } from "../../utils/trpc";
import { Styles } from "../../const";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    height: 594 + Styles.PULL_IMG_COVER,
    backgroundImage: "url('/artist-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    display: "grid",
    placeItems: "center",
    color: "white",
  },
}));

const Artist = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.artist.getArtists.useQuery();

  return (
    <Box
      sx={{
        marginTop: `-${Styles.PULL_IMG_COVER}px`,
        backgroundColor: "white",
      }}
    >
      <Box py={155} className={classes.banner}>
        <Box sx={{ textAlign: "center" }}>
          <Title size={48}>Artists</Title>

          <Text>Showing a list of talented artists all over the world</Text>
        </Box>
      </Box>

      <Container size="xl">
        <Title
          my={"xl"}
          size={36}
          order={2}
          sx={{ borderBottom: "1px solid black", maxWidth: "max-content" }}
        >
          <span style={{ color: theme.colors["ocean-blue"][3] }}>Artist</span>{" "}
          List
        </Title>
        <Divider sx={{ marginTop: "-1.5rem" }} />
        {isInitialLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : data ? (
          <Stack mt={32} spacing={48} mb={96} px={"xl"}>
            {data.map((artist) => (
              <ArtistCard key={artist.id} data={artist} />
            ))}
          </Stack>
        ) : null}
      </Container>
    </Box>
  );
};

const Page = () => {
  return <Artist />;
};

Page.getLayout = (page) => (
  <WithAppshell headerTransparent={true}>{page}</WithAppshell>
);

export default Page;
