import {
  Box,
  createStyles,
  Group,
  Text,
  Image,
  Title,
  SimpleGrid,
  Stack,
  TextInput,
  Button,
  Center,
  Loader,
  Container,
} from "@mantine/core";
import { inferProcedureOutput } from "@trpc/server";
import { useRouter } from "next/router";
import { BiBorderRadius } from "react-icons/bi";
import {
  FaClock,
  FaMapMarker,
  FaMapMarkerAlt,
  FaMapPin,
  FaTicketAlt,
} from "react-icons/fa";

import { MdArrowBack } from "react-icons/md";

import EventCard from "../../components/EventCard";
import { AppRouter } from "../../server/trpc/router/_app";
import { trpc } from "../../utils/trpc";
import ButtonBack from "../../components/ButtonBack";
import { NextPageWithLayout } from "../_app";
import WithAppshell from "../../layout/WithAppshell";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    color: "white",
  },
  imageContainer: {
    width: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)",
    gap: 16,
    [theme.fn.smallerThan("md")]: { display: "flex", flexDirection: "column" },
  },
  img1: {
    gridArea: "1 / 1 / 9 / 6",
  },
  img2: {
    gridArea: " 5 / 6 / 9 / 9",
  },
  img3: {
    gridArea: "1 / 6 / 5 / 9",
  },
  overview: {
    backgroundColor: "white",
  },
  overviewContainer: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing.xl,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  ticket: {
    border: `1px solid ${theme.colors["ocean-blue"][3]}`,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    minWidth: 300,
    textAlign: "center",
    height: "min-content",
  },
  green: {
    color: theme.colors["ocean-blue"][3],
  },
}));

const EventDetail: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const id = String(router.query.id);
  const { data, isInitialLoading } = trpc.event.getById.useQuery({ id });
  if (isInitialLoading)
    return (
      <Box pb={64} pt={20} className={classes.container}>
        <ButtonBack href="/event" />
        <Center my={96}>
          <Loader />
        </Center>
      </Box>
    );
  if (data)
    return (
      <>
        <Container size="xl">
          <Box pb={64} pt={20} className={classes.container}>
            <ButtonBack href="/event" />
            <Title mt={"xl"}>{data.name}</Title>
            <Box className={classes.grid} mt={"xl"}>
              <Image
                height={420}
                className={classes.img1}
                radius={"md"}
                src={data.mainImage}
              />

              <Image
                className={classes.img2}
                height={210 - 8}
                radius={"md"}
                src={data.image1}
              />

              <Image
                className={classes.img3}
                height={210 - 8}
                radius={"md"}
                src={data.image2}
              />
            </Box>
          </Box>
        </Container>
        <Overview data={data} />
        <RecommendedEvents />
      </>
    );
  return (
    <Box pb={64} pt={20} className={classes.container}>
      <ButtonBack href="/event" />
      <Center my={96}>
        <Text weight={600} size={32}>
          There was a problem
        </Text>
      </Center>
    </Box>
  );
};

function Overview({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Box py={64} className={classes.overview}>
      <Container size="xl">
        <Title size={36} order={2}>
          <span className={classes.green}>Overview</span>
        </Title>
        <Box mt={48} className={classes.overviewContainer}>
          <Stack>
            <Group noWrap align={"start"}>
              <FaMapMarkerAlt color="#111" size={24} />{" "}
              <Text color="#111" weight={600} size={"lg"}>
                {data.address}
              </Text>
            </Group>
            <Group noWrap align={"start"}>
              <FaClock color="#111" size={24} />{" "}
              <Stack spacing={0}>
                <Text color="#111" weight={600} size={"lg"}>
                  {data.date}
                </Text>
                <Text size={"md"} color={"dimmed"}>
                  {data.time}
                </Text>
              </Stack>
            </Group>
            <Text mt={"md"} weight={500} size={"lg"}>
              {data.description}
            </Text>
          </Stack>
          <Stack className={classes.ticket}>
            <Title color="ocean-blue.3" order={2}>
              Get Your Ticket
            </Title>
            <TextInput
              placeholder="Tickets Quantity"
              icon={<FaTicketAlt size={24} fill={classes.green} />}
              radius={"md"}
              mt={"xl"}
              type={"number"}
            />
            <Button radius={"md"}>Buy Ticket</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function RecommendedEvents() {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.event.getAll.useQuery();
  if (isInitialLoading)
    return (
      <Box py={64} px={"xl"}>
        <Title size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Recommended</span> Events
        </Title>
        <Center py={96}>
          <Loader />
        </Center>
      </Box>
    );

  if (data)
    return (
      <Box className={classes.overview} py={64} px={"xl"}>
        <Container size="xl">
          <Title size={36} order={2}>
            <span className={classes.green}>Recommended</span> Events
          </Title>
          <SimpleGrid
            mt={"xl"}
            cols={4}
            breakpoints={[
              { maxWidth: "lg", cols: 3 },
              { maxWidth: "md", cols: 2 },
              { maxWidth: "xs", cols: 1 },
            ]}
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
    );
  return (
    <Box py={64} px={"xl"}>
      <Container size="xl">
        <Title size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Recommended</span> Events
        </Title>
        <Center py={96}>
          <Text weight={600} size={32}>
            There was a problem
          </Text>
        </Center>
      </Container>
    </Box>
  );
}

EventDetail.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

interface Props {
  data: inferProcedureOutput<AppRouter["event"]["getById"]>;
}

export default EventDetail;
