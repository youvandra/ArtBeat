import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Container,
  createStyles,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import EventCard from "../../components/EventCard";
import { trpc } from "../../utils/trpc";
import { NextPageWithLayout } from "../_app";
import WithAppshell from "../../layout/WithAppshell";
import { Styles } from "../../const";
import { MdSearch } from "react-icons/md";
import { ethers, utils } from "ethers";
import { TICKET_ADDRESS } from "../../const";
import ABI from "../../utils/ABI/ABI_Ticket.json";

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
    height: 500,
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
  green: {
    color: theme.colors["ocean-blue"][3],
  },
}));

const Event: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.event.getAll.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketInfos, setTicketInfos] = useState([]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
        TICKET_ADDRESS, ABI, signer
      );
      const totalAllTickets = await contract.getTicketCount();
      const ticketDataArray = [];
        for (let i = 0; i < totalAllTickets; i++) { // ARRAY EVENT
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
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <div>
              <Title size={48}>Events</Title>

              <Text>
                Showing a list of ongoing and upcoming exhibition events all over
                the world
              </Text>
            </div>
          </Box>
        </Box>
        <Center py={96}>
          <Loader />
        </Center>
      </Box>
    );

  return (
    <Box>
      <Box py={155} className={classes.banner}>
        <Stack spacing={16 * 4} sx={{ textAlign: "center" }}>
          <div>
            <Title size={48}>Events</Title>
            <Text>
              Showing a list of ongoing and upcoming exhibition events all over
              the world
            </Text>
          </div>
          <Center>
            <TextInput
              icon={<MdSearch />}
              radius="xl"
              className={classes.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events"
            />
          </Center>
        </Stack>
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
            {ticketInfos
              .filter((ticketInfo) =>
                ticketInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((ticketInfo, i) => (
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
    </Box>
  );
};

Event.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default Event;
