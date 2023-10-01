import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { Styles } from "../const";
import { Text } from "@mantine/core";
import { truncate, useGlobalState } from "../utils/auction/store";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import WithAppshell from "../layout/WithAppshell";
import { claimPrize, loadAuctions, loadCollections, offerItemOnMarket } from "../utils/auction/services/blockchain";
import { toast } from "react-toastify";
import { showNotification } from "@mantine/notifications";
import theme from "../utils/theme";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  hero: {
    height: 300,
    backgroundImage: "url(/auction-banner.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(85%)",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
  },
  button: {
    backgroundColor: theme.colors["ocean-blue"][8],
    fontWeight: 400,
    ":hover": {
      backgroundColor: theme.colors["ocean-blue"][3],
    },
  },
  button1: {
    backgroundColor: "#034239",
    fontWeight: 400,
    ":hover": {
      backgroundColor: "#84A98C",
    },
  },
  heroText: {
    height: "100%",
    color: "white",
  },
  whiteContainer: {
    paddingTop: "5rem",
    paddingBottom: "5rem",
    backgroundColor: "white",
    minHeight: "100vh",
  },
  imageContainer: {
    maxWidth: 541,
    height: 409,
    backgroundColor: "#e1e1e1",
    img: {
      objectFit: "contain !important" as "contain",
    },
  },
  nextAuctionTitle: {
    borderBottom: "1px solid #e1e1e1",
    fontWeight: 400,
    [theme.fn.smallerThan("sm")]: {
      borderBottom: "1px solid #000",
    },
    span: {
      [theme.fn.largerThan("sm")]: {
        borderBottom: "1px solid #000",
      },
    },
    ".green": {
      color: theme.colors["ocean-blue"][3],
    },
  },
}));

const ListAuction = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [period, setPeriod] = useState('');
  const [biddable, setBiddable] = useState('');
  const [timeline, setTimeline] = useState('');
  const [tokenId, setTokenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAuctionsData();
  }, []);

  const loadAuctionsData = async () => {
    try {
      const result = await loadCollections();
      setAuctions(result);
      setLoading(false);
    } catch (error) {
      console.error('Error loading auctions:', error);
      setLoading(false);
    }
  };

  const openModal = (tokenId) => {
    setOpened(true);
    setTokenId(tokenId);
  };

  const closeModal = () => {
    setOpened(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!period || !biddable || !timeline) {
      return;
    }
    
    const params = {
      tokenId,
      biddable: biddable === 'true',
      sec: 0,
      min: 0,
      hour: 0,
      day: 0,
    };
  
    switch (timeline) {
      case 'sec':
        params.sec = Number(period);
        break;
      case 'min':
        params.min = Number(period);
        break;
      case 'hour':
        params.hour = Number(period);
        break;
      case 'day':
        params.day = Number(period);
        break;
      default:
        break;
    }
    setIsLoading(true);
    try {
      await new Promise<void>(async (resolve, reject) => {
        await offerItemOnMarket(params)
          .then(async () => {
            closeModal();
            resolve();
            showNotification({ message: "Offer NFT successfully" });
          })
          .catch(() => reject());
      });
    setTimeout(() => {
      setIsLoading(false);
      router.reload();
    }, 3000);
    } catch (error) {

    }
  
    closeModal();
  };

  return (
    <>
      <div className={classes.whiteContainer}>
        <Container size="xl">
          <Title className={classes.nextAuctionTitle} mt="5rem">
            <span>
              <span className="green">Auction Items </span>
            </span>
          </Title>
          {loading ? (
            <Center mt={"xl"}>
              <Loader />
            </Center>
          ) : (
            <SimpleGrid
              mt="xl"
              breakpoints={[
                {
                  maxWidth: "sm",
                  cols: 1,
                },
                {
                  maxWidth: "md",
                  cols: 2,
                },
                {
                  minWidth: "md",
                  cols: 3,
                },
              ]}
            >
              {auctions.map((auction, i) => (
                <Card key={i} withBorder>
                  <Image
                    src={auction.image}
                    width={270}
                    height={180}
                    mx="auto"
                  />
                  <Stack mt="md" spacing="md">
                    <Title size={20} weight={400} color="ocean-blue.4">
                      {auction.name}
                    </Title>
                    <Group>
                      <Text size={16}>{truncate(auction.owner, 4, 4, 11)}</Text>
                    </Group>
                    {auction.live && Date.now() < auction.duration ? (
                          <Button style={{ backgroundColor: theme.colors["ocean-blue"][3] }}>Auction Live</Button>
                        ) : (
                            <><Button onClick={() => openModal(auction.tokenId)} >
                          Offer Auction
                        </Button><Modal
                          opened={opened}
                          title="Offer Auction"
                          onClose={closeModal}
                          overlayOpacity={0.1}
                        >
                            <TextInput
                              label="Period"
                              placeholder="Enter period"
                              type="number"
                              min={1}
                              onChange={(e) => setPeriod(e.target.value)}
                              value={period} />
                            <Select
                              label="Timeline"
                              data={[
                                { value: 'sec', label: 'Seconds' },
                                { value: 'min', label: 'Minutes' },
                                { value: 'hour', label: 'Hours' },
                                { value: 'day', label: 'Days' },
                              ]}
                              onChange={(value) => setTimeline(value)} />
                            <Select
                              label="Biddable"
                              data={[
                                { value: 'true', label: 'Yes' },
                                { value: 'false', label: 'No' },
                              ]}
                              onChange={(value) => setBiddable(value)} />
                            <br />
                            <Button onClick={handleSubmit} disabled={isLoading}>
                              {isLoading ? 'Loading...' : 'Offer Item'}
                            </Button>
                          </Modal></>
                        )}
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </div>
    </>
  );
};

ListAuction.getLayout = (page: React.ReactNode) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default ListAuction;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session?.user?.role !== "admin") {
    return {
      redirect: { destination: "/", permanent: false },
      props: {},
    };
  }
  return { props: {} };
};
