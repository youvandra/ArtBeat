import { NextPageWithLayout } from "../_app";

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
  SimpleGrid,
  Stack,
  Title,
  createStyles,
} from "@mantine/core";
import UnderconstructionComponent from "../../components/pages/UnderconsturctionComponent";
import WithAppshell from "../../layout/WithAppshell";
import { Styles } from "../../const";
import { Text } from "@mantine/core";
import RightDetailAuction from "../../components/pages/auction/RightDetail";
import RecentArtworkCarousel from "../../components/pages/landingpage/lib/Carousel/RecentArtworkCarousel";
import { Carousel } from "@mantine/carousel";
import { AiOutlineArrowRight } from "react-icons/ai";
import { loadAuctions, loadAuction } from "../../utils/auction/services/blockchain";
import { useEffect, useState } from "react";
import { truncate } from "../../utils/auction/store";
import { NextLink } from "@mantine/next";
import { useParams } from "react-router-dom";
import router, { useRouter } from "next/router";
import RightDetailAuctionId from "../../components/pages/auction/RightDetailId";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = createStyles((theme) => ({
  hero: {
    height: 300 + Styles.PULL_IMG_COVER,
    backgroundImage: "url(/auction-banner.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(85%)",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
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

const NFTAuctionPage = () => {
  const router = useRouter(); // Dapatkan router
  const { tokenId } = router.query; // Dapatkan tokenId dari route
  const { classes } = useStyles();
  const [auctions, setAuctions] = useState([]);
  const [auction_hero, setAuctionHero] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuctionsData();
    loadAuctionsDataHero();
  }, [tokenId]);

  const loadAuctionsData = async () => {
    try {
      const result = await loadAuctions();
      setAuctions(result);
    } catch (error) {
      console.error('Error loading auctions:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadAuctionsDataHero = async () => {
    try {
      const result1 = await loadAuction(tokenId);
      setAuctionHero(result1);
    } catch (error) {
      console.error('Error loading auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className={classes.hero}>
        <Center className={classes.heroText}>
          <Stack align="center">
            <Title weight={400} size={64}>
              Live Auction
            </Title>
            <Text>Showing an ongoing and upcoming art auction</Text>
          </Stack>
        </Center>
      </div>
      <div className={classes.whiteContainer}>
        <Container size="xl">
          <SimpleGrid
            breakpoints={[
              { maxWidth: "md", cols: 1, spacing: "xl" },
              { minWidth: "md", cols: 2 },
            ]}
          >
            {loading ? (
              <Center mt={"xl"}>
                <Loader />
              </Center>
            ) : (
              <div>
                <div className={classes.imageContainer}>
                  {auction_hero && (
                    <Image
                      src={(auction_hero as any)?.image}
                      width="100%"
                      height={409}
                      alt="Auction Hero"
                    />
                  )}
                </div>
              </div>
            )}
            <RightDetailAuctionId />
          </SimpleGrid>

          <Title className={classes.nextAuctionTitle} mt="5rem">
            <span>
              <span className="green">Others </span>Auction Items
            </span>
          </Title>
          {loading ? (
            <p>Loading other auctions...</p>
          ) : auctions.length > 0 ? (
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
                    <Group position="apart">
                      <Text>{parseFloat(auction.price).toFixed(0)} BTT</Text>
                      <NextLink href={`/auction/${auction.tokenId}`} passHref>
                      <Button
                        color="ocean-blue"
                        rightIcon={<AiOutlineArrowRight />}
                      >
                        See Details
                      </Button>
                      </NextLink>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <p>No other auctions available.</p>
          )}
          <ToastContainer />
        </Container>
      </div>
    </>
  );
};

const Page: NextPageWithLayout = () => {
  return <NFTAuctionPage />;
};

Page.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default Page;