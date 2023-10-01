// Import yang dibutuhkan

import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Overlay,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { ethers } from "ethers";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import ABI from "../utils/ABI/ABI_Ticket.json";
import { NextPageWithLayout } from "./_app";
import WithAppshell from "../layout/WithAppshell";
import { Styles } from "../const";
import { TICKET_ADDRESS } from "../const";
const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1566054757965-8c4085344c96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80')",
    height: 350,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    position: "relative",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
  },
  container: {
    maxWidth: 700,
    width: 700,
    [t.fn.smallerThan("md")]: {
      width: "100%",
      marginLeft: 16,
      marginRight: 16,
    },
    marginTop: t.spacing.xl * 2,
    zIndex: 1,
  },
}));

const PostTicket: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      address: "",
      description: "",
      date: "",
      time: "",
      mainImage: "",
      image1: "",
      image2: "",
      ticketPrice: "0",
      totalTickets: "",
    },
  });

  async function createEvent() {
    try {
      // Set up Ethereum provider dan signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Kontrak TicketArtbeat
      const contract = new ethers.Contract(
        TICKET_ADDRESS, // Gantilah dengan alamat kontrak yang sesuai
        ABI, // Gantilah dengan ABI yang sesuai
        signer
      );

      // Mendapatkan nilai dari form
      const id = form.values.id;
      const name = form.values.name;
      const address = form.values.address;
      const description = form.values.description;
      const date = form.values.date;
      const time = form.values.time;
      const mainImage = form.values.mainImage;
      const image1 = form.values.image1;
      const image2 = form.values.image2;
      const ticketPrice = ethers.utils.parseUnits(
        form.values.ticketPrice,
        "ether"
      );
      const totalTickets = form.values.totalTickets;

      // Panggil fungsi createEvent pada kontrak TicketArtbeat
      const transaction = await contract.createTicket(
        id,
        name,
        address,
        description,
        date,
        time,
        mainImage,
        image1,
        image2,
        ticketPrice,
        totalTickets,
      );
      await transaction.wait();

      showNotification({
        color: "green",
        message: "Successfully created the event!",
      });
    } catch (e) {
      showNotification({
        color: "red",
        message: "Error creating the event: " + e.message,
      });
    }
  }

  return (
    <Box sx={{ backgroundColor: "white" }} mb={96}>
      <Box className={classes.banner}>
        <Overlay color={"#111"} zIndex={1} opacity={0.75} />
      </Box>

      <Box>
        <Box mt={-200}>
          <Center>
            <Stack
              sx={{ color: "white", zIndex: 1 }}
              align={"center"}
              justify={"center"}
            >
              <Title>Create Event</Title>
            </Stack>
          </Center>
          <Center>
            <Paper className={classes.container} shadow={"lg"} radius="lg">
              <Container p={24}>
                <form
                  onSubmit={form.onSubmit(() => {
                    setIsLoading(true);
                    createEvent().finally(() => {
                      setIsLoading(false);
                    });
                  })}
                >
                  <Stack spacing={"xl"}>
                    <TextInput
                      required
                      {...form.getInputProps("id")}
                      type="text"
                      size="md"
                      label="Event ID"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("name")}
                      type="text"
                      size="md"
                      label="Event Name"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("address")}
                      type="text"
                      size="md"
                      label="Address"
                    />
                    <Textarea
                      required
                      {...form.getInputProps("description")}
                      size="md"
                      label="Description"
                      minRows={3}
                    />
                    <TextInput
                      required
                      {...form.getInputProps("date")}
                      type="text"
                      size="md"
                      label="Date"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("time")}
                      type="text"
                      size="md"
                      label="Time"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("mainImage")}
                      type="text"
                      size="md"
                      label="image1"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("image1")}
                      type="text"
                      size="md"
                      label="image2"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("image2")}
                      type="text"
                      size="md"
                      label="image3"
                    />

                    <TextInput
                      required
                      {...form.getInputProps("ticketPrice")}
                      type="text"
                      size="md"
                      label="Price"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("totalTickets")}
                      type="text"
                      size="md"
                      label="Total Tickets"
                    />

                    <Button
                      mt={"xl"}
                      loading={isLoading}
                      type="submit"
                      color={"brand"}
                    >
                      Create Event
                    </Button>
                  </Stack>
                </form>
              </Container>
            </Paper>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

PostTicket.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default PostTicket;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  // Jika bukan admin, arahkan ke halaman lain atau lakukan tindakan lain
  if (session?.user?.role !== "admin") {
    return {
      redirect: { destination: "/", permanent: false },
      props: {},
    };
  }
  return { props: {} };
};
