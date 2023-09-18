import {
  Box,
  Center,
  Container,
  createStyles,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import ArtistCard from "../../components/pages/artist/ArtistCard";
import MuseumCard from "../../components/pages/museum/MuseumCard";
import UnderconstructionComponent from "../../components/pages/UnderconsturctionComponent";
import { NextPageWithLayout } from "../_app";
import { trpc } from "../../utils/trpc";
import WithAppshell from "../../layout/WithAppshell";
import { Styles } from "../../const";
import { MdSearch } from "react-icons/md";
// import CreateDummy from "../../utils/CreateDummy";

const useStyles = createStyles(() => ({
  banner: {
    width: "100%",
    height: 594 + Styles.PULL_IMG_COVER,
    backgroundImage: "url('/artists-section-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    display: "grid",
    placeItems: "center",
    color: "white",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
  },
  search: {
    width: "100%",
    maxWidth: 495,
    input: {
      backgroundColor: "transparent",
      color: "white",
    },
  },
  museumList: {
    paddingTop: "5rem",
    paddingBottom: "5rem",
    backgroundColor: "white",
    minHeight: "100vh",
  },
}));

// const museums = CreateDummy.museums();

function Museum() {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.museumRouter.getAll.useQuery();
  if (isInitialLoading)
    return (
      <Box>
        <Box className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Museums</Title>

            <Text>
              Showing a list of museums that own various magnificent art
              collections made by very talented artists
            </Text>
          </Box>
        </Box>
        <Center py={196}>
          <Loader />
        </Center>
      </Box>
    );
  if (data)
    return (
      <Box>
        <Box className={classes.banner}>
          <Stack spacing={16 * 4} sx={{ textAlign: "center" }}>
            <div>
              <Title size={48}>Museums</Title>

              <Text sx={{ maxWidth: 499 }}>
                Showing a list of museums that own various magnificent art
                collections made by very talented artists
              </Text>
            </div>

            <Center>
              <TextInput
                icon={<MdSearch />}
                radius="xl"
                className={classes.search}
              />
            </Center>
          </Stack>
        </Box>

        <div className={classes.museumList}>
          <Container size="xl">
            <Title
              sx={(theme) => ({
                borderBottom: "1px solid #e1e1e1",
                [theme.fn.smallerThan("md")]: {
                  borderBottom: "1px solid #000",
                },
              })}
              weight={400}
              size={36}
              order={2}
            >
              <Box
                component="span"
                sx={(theme) => ({
                  [theme.fn.largerThan("md")]: {
                    borderBottom: "1px solid #000",
                    paddingBottom: 3,
                  },
                })}
              >
                <Box<"span">
                  component="span"
                  sx={(theme) => ({
                    color: theme.colors["ocean-blue"][3],
                  })}
                >
                  Museums
                </Box>{" "}
                List
              </Box>
            </Title>
            <Stack mt={32} spacing={48} mb={96} px={"xl"}>
              {data.map((data) => (
                <MuseumCard key={data.id} data={data} />
              ))}
            </Stack>
          </Container>
        </div>
      </Box>
    );
}

const Page: NextPageWithLayout = () => {
  return <Museum />;
};

Page.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default Page;
