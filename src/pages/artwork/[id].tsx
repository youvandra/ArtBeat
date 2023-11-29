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
import { truncate } from "../../utils/auction/store";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../const";
import ABI from "../../utils/ABI/ABI.json"

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
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const tokenId = router.query.id;
  const [nft, setNft] = useState<NFT>(null);
  const { account } = useMetaMask();
  const [isLoading, setIsLoading] = useState(false);

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

  const downloadCertificate = (certificateUrl, certificateTitle) => {
    // Membuat permintaan unduhan menggunakan fetch
    fetch(certificateUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Membuat objek URL dari blob gambar
        const url = window.URL.createObjectURL(blob);
  
        // Membuat elemen <a> untuk mengunduh
        const link = document.createElement('a');
        link.href = url;
        link.download = `${certificateTitle}.png`; // Nama file yang akan diunduh
        link.click();
  
        // Membebaskan objek URL yang dibuat sebelumnya
        window.URL.revokeObjectURL(url);
      });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await buyNFT(nft); 
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false);
    }
  };


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
                      name='Artist'
                      artwokrsCount={nft.metadata.artist}
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
                    {nft.seller !== "0x42734AE1bB82821d4035069391ca09D94caA9ED1" ? (
                      <SimpleGrid mt={"xl"}>
                        <Property label="Owner" value={truncate(nft.seller, 5, 5, 15)} />
                      </SimpleGrid> 
                      ) : (
                        null
                      )}
                    {/* {nft.seller.toLowerCase() === account ? ( */}
                    <Text mt={"xl"} size={24} weight={"bold"}>
                          {parseFloat(nft.metadata.price).toFixed(0)} BTT
                    </Text>
                    {nft.seller !== "0x42734AE1bB82821d4035069391ca09D94caA9ED1" ? (
                        nft.seller.toLowerCase() === account ? (
                          <><Button
                          className={classes.buttonBuy}
                          radius="lg"
                          size="xl"
                          onClick={open}
                        >
                          Get certificate
                        </Button>
                        <Modal
                          opened={opened}
                          onClose={close}
                          title={`${nft.metadata.title} Certificate`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Image
                              alt={nft.metadata.title}
                              radius="md"
                              src={nft.metadata.certificate}
                            /><br></br>
                            <Button
                              className={classes.buttonBuy}
                              radius="lg"
                              size="md"
                              style={{ margin: 'auto' }}
                              onClick={() => downloadCertificate(nft.metadata.certificate, nft.metadata.title)}
                            >
                              Download Certificate
                            </Button>
                          </div>
                        </Modal>
                          </>
                        ) : (
                          <Button
                            className={classes.buttonBuy}
                            radius="lg"
                            size="xl"
                          >
                            Owned
                          </Button>
                        )
                      ) : (
                        <Button
                          className={classes.buttonBuy}
                          onClick={handleSubmit}
                          radius="lg"
                          size="xl"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Buying NFT...' : 'Buy now'}
                        </Button>
                      )}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
      <Box
          className={classes.recommendedArtworks}
          py={64}
          style={{
            borderRadius: "20px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
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
                    imageProps={{
                      src: props.metadata.image,
                      width: 250, 
                      height: 250,
                    }}
                    titleProps={{ text: props.metadata.title }}
                    avatarProps={{ sx: { display: "none" } }}
                    artistProps={{ text: `Art By: ${props.metadata.artist}` }}
                    priceProps={{ text: props.price }}
                    buttonProps={{ href: `/artwork/${props.tokenId}` }}
                  />
                ))}
              </SimpleGrid>
            )}
          </Container>
        </Box>

    </>
  );
};

Artwork.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

export default Artwork;
