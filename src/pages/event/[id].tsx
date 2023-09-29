import React, { useState, useEffect } from "react";
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
import {
  FaClock,
  FaMapMarker,
  FaMapMarkerAlt,
  FaMapPin,
  FaTicketAlt,
} from "react-icons/fa";
import ABI from "../../utils/ABI/ABI_Ticket.json";
import { ethers, utils } from "ethers";
import EventCard from "../../components/EventCard";
import { AppRouter } from "../../server/trpc/router/_app";
import { trpc } from "../../utils/trpc";
import ButtonBack from "../../components/ButtonBack";
import WithAppshell from "../../layout/WithAppshell";
import { TICKET_ADDRESS } from "../../const";
import { NextPageWithLayout } from "../_app";
import { showNotification } from "@mantine/notifications";

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
  const { isInitialLoading } = trpc.event.getById.useQuery({ id });
  const [numberOfTickets, setNumberOfTickets] = useState(0);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          TICKET_ADDRESS,
          ABI,
          signer
        );

        const ticketData = await contract.getTicketInfo(id);
        setTicketData(ticketData);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchTicketData();
  }, [id]);

  const buyTicket = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TICKET_ADDRESS,
        ABI,
        signer
      );

      const ticketPriceInEther = parseFloat(ethers.utils.formatEther(ticketData.price));

      // Lakukan perkalian dengan numberOfTickets
      const totalTicketPrice = ticketPriceInEther * numberOfTickets;

      const transaction = await contract.purchaseTicket(id, numberOfTickets, {
        value: ethers.utils.parseEther(
          (totalTicketPrice).toString()
        ),
      });

      await transaction.wait();
      showNotification({ message: "Ticket purchased successfully!", autoClose: 5000 });
      console.log("Tiket berhasil dibeli!");

      
    } catch (error) {
      if (numberOfTickets > ticketData.totalTickets){
        showNotification({message: "Ticket purchase exceeds available quantity.", autoClose: 5000, color: "red"});
      }else {
        showNotification({message: "Ticket sold out!", autoClose: 5000, color: "red"})
      }
    }
  };

  if (isInitialLoading)
    return (
      <Box pb={64} pt={20} className={classes.container}>
        <ButtonBack href="/event" />
        <Center my={96}>
          <Loader />
        </Center>
      </Box>
    );

  if (ticketData)
    return (
      <>
        <Container size="xl">
          <Box pb={64} pt={20} className={classes.container}>
            <ButtonBack href="/event" />
            <Title mt={"xl"}>{ticketData.name}</Title>
            <Box className={classes.grid} mt={"xl"}>
              <Image
                height={420}
                className={classes.img1}
                radius={"md"}
                src={ticketData.mainImage}
              />

              <Image
                className={classes.img2}
                height={210 - 8}
                radius={"md"}
                src={ticketData.image1}
              />

              <Image
                className={classes.img3}
                height={210 - 8}
                radius={"md"}
                src={ticketData.image2}
              />
            </Box>
          </Box>
        </Container>
        <Overview
          data={ticketData}
          buyTicket={buyTicket}
          numberOfTickets={numberOfTickets}
          setNumberOfTickets={setNumberOfTickets}
        />
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

function Overview({
  data,
  buyTicket,
  numberOfTickets,
  setNumberOfTickets,
}) {
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
                {data.venueAddress}
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
            <Text size="sm" color="dimmed">
              Remaining Tickets: {data.totalTickets.toString()}
            </Text>
            <TextInput
              placeholder="Tickets Quantity"
              icon={<FaTicketAlt size={24} fill={classes.green} />}
              radius={"md"}
              mt={"xl"}
              type={"number"}
              value={numberOfTickets}
              onChange={(event) =>
                setNumberOfTickets(parseInt(event.target.value, 10))
              }
            />
            <Button radius={"md"} onClick={buyTicket}>
              Buy Ticket
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function RecommendedEvents() {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.event.getAll.useQuery();
  const [ticketInfos, setTicketInfos] = useState([]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
        TICKET_ADDRESS, ABI, signer
      );
      const ticketDataArray = [];
        for (let i = 0; i < 1; i++) { // ARRAY EVENT
          const ticketData = await contract.getTicketInfo(i);
          ticketDataArray.push(ticketData);
        }

        setTicketInfos(ticketDataArray);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchTicketData();
  }, []);
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

  if (ticketInfos)
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
            {ticketInfos.map
              ((ticketInfo, i) => (
                <EventCard
                  key={i}
                  price={parseFloat(utils.formatUnits(ticketInfo.price, 'ether'))}
                  details={`${ticketInfo.date} | ${ticketInfo.venueAddress}`}
                  image={ticketInfo.mainImage}
                  name={ticketInfo.name}
                  id={(i).toString()}
                />
              ))}
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

export default EventDetail;
