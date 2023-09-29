import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IoMdColorPalette } from "react-icons/io";
import { NextLink } from "@mantine/next";
import NFTCard from "../components/nft/NFTCard";
import { NFT } from "../components/nft/NFTExploreCard";
import { getMyNFTs } from "../utils/getMyNFTs";
import { showNotification } from "@mantine/notifications";
import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";
import WithAppshell from "../layout/WithAppshell";
import { Styles } from "../const";
import { MdLocalShipping } from "react-icons/md";
import { useMetaMask  } from "metamask-react";
import { truncate } from "../utils/auction/store";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/profile-banner.png')",
    height: 281,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
  },
  container: {
    flexWrap: "nowrap",
    [t.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },
  detailsWrapper: {
    [t.fn.smallerThan("md")]: {
      alignSelf: "center",
    },
  },
  detailsContainer: {
    width: 300,
    [t.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  collection: {
    flexGrow: 1,
    [t.fn.smallerThan("md")]: {
      alignSelf: "stretch",
      textAlign: "center",
    },
  },
  green: {
    color: t.colors["ocean-blue"][3],
  },
}));

function Profile() {
  const { classes } = useStyles();
  const { data } = trpc.auth.getSession.useQuery();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { account } = useMetaMask();
  

  useEffect(() => {
    setIsFetching(true);
    getMyNFTs()
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
    <Box mb={96} sx={{ backgroundColor: "white" }}>
      <Box className={classes.banner} />
      <Container size="xl">
        <Group
          className={classes.container}
          spacing={48}
          mt={24}
          align={"start"}
          px={"xl"}
        >
          <Stack className={classes.detailsWrapper} mt={-124} pb="xl">
            <Paper p={24} radius={"lg"} shadow={"md"}>
              <Stack
                className={classes.detailsContainer}
                mb={"xl"}
                spacing={"xs"}
                align={"center"}
              >
                <Avatar radius={999} src={data?.user?.image} size={140} />
                <Title size={15} mt={"sm"} order={2} color="ocean-blue.3">
                {truncate(account, 5, 5, 15)}
                </Title>

                <Title color={"#111"} mt={"xl"} order={4}>
                  Total Collection
                </Title>
                <Group sx={{ color: "#111" }} spacing={"xs"} align={"center"}>
                  <IoMdColorPalette size={24} />
                  <Text weight={500}>
                    {nfts.length} Artwork{nfts.length > 1 ? "s" : ""}
                  </Text>
                </Group>
              </Stack>
            </Paper>
            <Button
              component={NextLink}
              href="/requestshipping"
              color="ocean-blue"
              leftIcon={<MdLocalShipping />}
            >
              Request to Ship Your Art{" "}
            </Button>
          </Stack>

          <Stack className={classes.collection}>
            <Title color="ocean-blue.3" order={1}>
              My <span style={{ color: "#111" }}>collections</span>
            </Title>
            {isFetching ? (
              <Center mt={"md"}>
                <Loader />
              </Center>
            ) : (
              <SimpleGrid
                mt={"xl"}
                sx={{ width: "full" }}
                cols={3}
                spacing="xl"
                breakpoints={[
                  { maxWidth: "lg", cols: 2 },
                  { maxWidth: "md", cols: 3 },
                  { maxWidth: "sm", cols: 2 },
                  { maxWidth: "xs", cols: 1 },
                ]}
              >
                {nfts.map((props, i) => (
                  <NFTCard key={i} {...props} />
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Group>
      </Container>
      <br></br>
    </Box>
    
  );
}
const Page: NextPageWithLayout = () => {
  return <Profile />;
};

Page.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default Page;
