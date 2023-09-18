import {
  Box,
  Center,
  Container,
  createStyles,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import EventCard from "../../components/EventCard";
import { trpc } from "../../utils/trpc";
import { NextPageWithLayout } from "../_app";
import WithAppshell from "../../layout/WithAppshell";
import { Styles } from "../../const";

const useStyles = createStyles((theme) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/event-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    display: "grid",
    placeItems: "center",
    color: "white",
    height: 594,
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
  },
  green: {
    color: theme.colors["ocean-blue"][3]
  }
}));

const Event: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.event.getAll.useQuery();
  if (isInitialLoading)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Events</Title>

            <Text>
              Showing a list of ongoing and upcoming exhibition events all over
              the world
            </Text>
          </Box>
        </Box>
        <Center py={96}>
          <Loader />
        </Center>
      </Box>
    );
  if (data)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Events</Title>

            <Text>
              Showing a list of ongoing and upcoming exhibition events all over
              the world
            </Text>
          </Box>
        </Box>

        <Box py="xl" sx={{ backgroundColor: "white" }}>
          <Container size="xl">
            <Title px={"xl"} py="xl" size={36} order={2}>
              <span className={classes.green}>Newest</span> Events
            </Title>
            <SimpleGrid
              mb={96}
              cols={4}
              breakpoints={[
                { maxWidth: "lg", cols: 3 },
                { maxWidth: "md", cols: 2 },
                { maxWidth: "xs", cols: 1 },
              ]}
              px={"xl"}
            >
              {data.map(
                ({ mainImage, name, date, ticketPrice, address, id }, i) => (
                  <EventCard
                    key={i}
                    price={ticketPrice}
                    details={`${date} | ${address}`}
                    image={mainImage}
                    name={name}
                    id={id}
                  />
                )
              )}
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    );
  return (
    <Box>
      <Box py={155} className={classes.banner}>
        <Box sx={{ textAlign: "center" }}>
          <Title size={48}>Events</Title>

          <Text>
            Showing a list of ongoing and upcoming exhibition events all over
            the world
          </Text>
        </Box>
      </Box>
      <Center py={96}>
        <Text weight={600} size={32}>
          There was a problem
        </Text>
      </Center>
    </Box>
  );
};

Event.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default Event;
