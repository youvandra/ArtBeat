import {
  Box,
  createStyles,
  Text,
  Image,
  Title,
  Stack,
  SimpleGrid,
  Button,
  Center,
  Loader,
  Container,
  Grid,
} from "@mantine/core";
import { useRouter } from "next/router";

import NFTExploreCard, { NFT } from "../../components/nft/NFTExploreCard";
import ArtistCard from "../../components/pages/artwork/ArtistCard";
import Property from "../../components/pages/artwork/Property";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { getAllNFTs } from "../../utils/getAllNFTs";
import { getNFTbyId } from "../../utils/getNFTbyId";
import { buyNFT } from "../../utils/buyNFT";
import ButtonBack from "../../components/ButtonBack";
import { NextPageWithLayout } from "../_app";
import WithAppshell from "../../layout/WithAppshell";
import ArtworkCard from "../../components/ArtworkCard";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    color: "white",
  },
  imageContainer: {
    width: "100%",
    marginRight: "1rem",
    img: {
      maxWidth: 650,
      maxHeight: 450,
    },
  },
  mainContainer: {
    marginTop: "5rem",
  },
  detailsContainer: {
    maxWidth: 349,
    [theme.fn.largerThan("md")]: {
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
  buttonBuy: {
    fontFamily: theme.headings.fontFamily,
    maxWidth: 322,
    color: theme.colors["ocean-blue"][3],
  },
  recommendedArtworks: {
    minHeight: "100vh",
    backgroundColor: "white",
  },
  green: {
    color: theme.colors["ocean-blue"][4],
  },
}));

const Artwork: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const tokenId = router.query.id;
  const [nft, setNft] = useState<NFT>(null);

  useEffect(() => {
    tokenId &&
      getNFTbyId(tokenId)
        .then((n) => {
          setNft(n);
        })
        .catch(() => {
          showNotification({
            message: "there was a problem fetching the NFT",
            color: "red",
          });
        });
  }, [tokenId]);
  useEffect(() => {
    setIsFetching(true);
    getAllNFTs()
      .then((n) => {
        setNfts(n);
      })
      .catch(() => {
        showNotification({
          message: "there was a problem fetching the NFTs",
          color: "red",
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
  return (
    <>
      <Container size="xl">
        <Box pb={64} className={classes.container} mt="xl">
          <ButtonBack href="/" />
          {!nft && (
            <Center>
              <Loader />
            </Center>
          )}
          {nft && (
            <Box className={classes.mainContainer}>
              <Grid justify="space-between" align="center">
                <Grid.Col xs={12} md={6}>
                  <Stack className={classes.imageContainer} spacing={48}>
                    <Image
                      alt={nft.metadata.title}
                      radius={"md"}
                      src={nft.metadata.image}
                    />
                    <ArtistCard
                      name={nft.metadata.artist}
                      artwokrsCount={900}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                  <Stack className={classes.detailsContainer}>
                    <Title>{nft.metadata.title}</Title>
                    <Text>{nft.metadata.description}</Text>
                    <SimpleGrid mt={"xl"} cols={2}>
                      <Property label="Type" value={nft.metadata.type} />
                      <Property label="Dimentions" value={nft.metadata.size} />
                      <Property
                        label="Technique"
                        value={nft.metadata.technique}
                      />
                      <Property label="Year" value={nft.metadata.year} />
                    </SimpleGrid>
                    <Text mt={"xl"} size={24} weight={"bold"}>
                      ${nft.metadata.price} BTT
                    </Text>
                    <Button
                      className={classes.buttonBuy}
                      onClick={() => {
                        buyNFT(nft);
                      }}
                      radius="lg"
                      size="xl"
                    >
                      Buy now
                    </Button>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
      <Box className={classes.recommendedArtworks} py={64}>
        <Container size="xl">
          <Title size={36} order={2}>
            <span className={classes.green}>Recommended</span> Artworks
          </Title>
          {isFetching ? (
            <Center mt={"xl"}>
              <Loader />
            </Center>
          ) : (
            <SimpleGrid
              breakpoints={[
                { maxWidth: "lg", cols: 3 },
                { maxWidth: "md", cols: 2 },
                { maxWidth: "xs", cols: 1 },
              ]}
              spacing={"lg"}
              mt={"xl"}
              cols={4}
            >
              {nfts.map((props, i) => (
                <ArtworkCard
                  {...props}
                  key={i}
                  imageProps={{ src: props.metadata.image }}
                  titleProps={{ text: props.metadata.title }}
                  avatarProps={{ sx: { display: "none" } }}
                  artistProps={{ text: `Art By: ${props.metadata.artist}` }}
                  priceProps={{ text: props.price }}
                  buttonProps={{ href: `/artwork/${props.tokenId}` }}
                />
              ))}{" "}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </>
  );
};

Artwork.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

export default Artwork;
