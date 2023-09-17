import {
  Box,
  createStyles,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Loader,
  Center,
} from "@mantine/core";
import NFTExploreCard, { NFT } from "../components/nft/NFTExploreCard";
import AppliedFilters from "../components/pages/explore/AppliedFilters";
import Filters from "../components/pages/explore/Filters";
import Pagination from "../components/pages/explore/Pagination";
import TopFilters from "../components/pages/explore/TopFilters";
import { NextPageWithLayout } from "./_app";

import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { getAllNFTs } from "../utils/getAllNFTs";
import WithAppshell from "../layout/WithAppshell";
import { Styles } from "../const";

const useStyles = createStyles((t) => ({
  wrapper: {
    backgroundColor: "white",
  },
  banner: {
    width: "100%",
    backgroundImage: "url('/explore-banner.jpg')",
    height: 594,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
    filter: "brightness(80%)",
  },
  filtersContainer: {
    borderLeft: "1px solid #875A28",
    width: 300,
    height: "100%",
    [t.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

function Explore() {
  const { classes } = useStyles();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);
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
    <Box className={classes.wrapper} mb={96}>
      <Box className={classes.banner} />
      <Group noWrap spacing={"xl"} px={"xl"} align={"start"}>
        <Stack spacing={"xl"} mt={"xl"} style={{ flexGrow: 1 }}>
          <TopFilters />
          <AppliedFilters />
          {isFetching ? (
            <Center mt={"md"}>
              <Loader />
            </Center>
          ) : (
            <SimpleGrid
              mt={"md"}
              spacing={"xl"}
              sx={{ width: "full" }}
              cols={3}
              breakpoints={[
                { maxWidth: "sm", cols: 2 },
                { maxWidth: "xs", cols: 1 },
                { minWidth: "xl", cols: 4 },
              ]}
            >
              {nfts.map((props, i) => (
                <NFTExploreCard {...props} key={i} />
              ))}
            </SimpleGrid>
          )}

          <Box mt={"xl"} sx={{ alignSelf: "end" }}>
            <Pagination active={1} pageCount={9} />
          </Box>
        </Stack>
        <Stack
          pb={48}
          px={"xl"}
          align={"center"}
          className={classes.filtersContainer}
        >
          <Space mt="xl" />
          <Filters />
        </Stack>
      </Group>
    </Box>
  );
}

const Page: NextPageWithLayout = () => {
  return <Explore />;
};

Page.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default Page;
