import {
  Box,
  createStyles,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Loader,
  Center,
  TextInput,
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
import ArtworkCard from "../components/ArtworkCard";
import { MdSearch } from "react-icons/md";

const useStyles = createStyles((t) => ({
  wrapper: {
    backgroundColor: "white",
  },
  banner: {
    width: "100%",
    backgroundImage: "url('/explore-banner.jpg')",
    height: 100,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
    filter: "brightness(80%)",
  },
  filtersContainer: {
    borderLeft: "1px solid #0f6c57",
    width: 300,
    height: "100%",
    [t.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  filters: {
    [t.fn.smallerThan("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
}));
function Explore() {
  const { classes } = useStyles();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const itemsPerPage = 12;
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    setIsFetching(true);
    getAllNFTs()
      .then((n) => {
        setNfts(n);
      })
      .catch(() => {
        showNotification({
          message: 'There was a problem fetching the NFTs',
          color: 'red',
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [currentPage]);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNFTs = nfts.slice(startIndex, endIndex);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNFTs = currentNFTs.filter((nft) =>
    nft.metadata.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={classes.wrapper} mb={96} >
      <Box className={classes.banner} />
      <Group noWrap spacing={"xl"} px={"xl"} align={"start"} >
        <Stack spacing={"xl"} mt={"xl"} style={{ flexGrow: 1 }}>
        <Group className={classes.filters}>
        <TextInput
          radius={"md"}
          icon={<MdSearch color="#0f6c57" size={24} />}
          placeholder="Portrait Painting"
          onChange={handleSearch}
        />
        </Group>
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
              {filteredNFTs.map((props, i) => (
                <ArtworkCard
                  imageProps={{ src: props.metadata.image }}
                  titleProps={{ text: props.metadata.title }}
                  avatarProps={{ sx: { display: "none" } }}
                  artistProps={{ text: `Art By: ${props.metadata.artist}` }}
                  priceProps={{ text: props.price }}
                  buttonProps={{ href: `/artwork/${props.tokenId}` }}
                  {...props}
                  key={i}
                />
              ))}
            </SimpleGrid>
          )}

          <Box mt={"xl"} sx={{ alignSelf: "end" }}>
          <Pagination
          active={currentPage}
          pageCount={Math.ceil(nfts.length / itemsPerPage)}
          onPageChange={onPageChange}
        />
          </Box>
        </Stack>
        <Stack
          pb={48}
          px={"xl"}
          align={"center"}
          className={classes.filtersContainer}
          
        >
          <Space />
          <Filters />
        </Stack>
      </Group>
      <br></br>
    </Box>
  );
}

const Page: NextPageWithLayout = () => {
  return <Explore />;
}

Page.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default Page;