import React, { useState } from "react";
import {
  Box,
  Center,
  Container,
  createStyles,
  Divider,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import ArtistCard from "../../components/pages/artist/ArtistCard";
import WithAppshell from "../../layout/WithAppshell";
import { trpc } from "../../utils/trpc";
import { Styles } from "../../const";
import { MdSearch } from "react-icons/md";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    height: 400,
    backgroundImage: "url('/artist-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    display: "grid",
    placeItems: "center",
    color: "white",
  },
  search: {
    width: "100%",
    maxWidth: 495,
    input: {
      backgroundColor: "transparent",
      color: "white",
    },
  },
}));

const Artist = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.artist.getArtists.useQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtists = data
    ? data.filter((artist) =>
        artist.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Box
      sx={{
        marginTop: `-${Styles.PULL_IMG_COVER}px`,
        backgroundColor: "white",
      }}
    >
      <Box py={155} className={classes.banner}>
        <Box sx={{ textAlign: "center" }}>
          <Stack spacing={16 * 4} sx={{ textAlign: "center" }}>
            <div>
              <Title size={48}>Artists</Title>
              <Text>Showing a list of talented artists all over the world</Text>
            </div>
            <Center>
              <TextInput
                icon={<MdSearch />}
                radius="xl"
                className={classes.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Center>
          </Stack>
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
        ) : (
          <Stack mt={32} spacing={48} mb={96} px={"xl"}>
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} data={artist} />
            ))}
          </Stack>
        )}
      </Container>
      <br></br>
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
