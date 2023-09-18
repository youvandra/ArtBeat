import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

import {
  Box,
  Center,
  Container,
  Grid,
  Pagination,
  createStyles,
} from "@mantine/core";
import UpsideFilter from "../../components/pages/minting/UpsideFilter";
import { Filter } from "../../components/pages/minting/lib/FilterChip";
import UnderconstructionComponent from "../../components/pages/UnderconsturctionComponent";
import MintingCards from "../../components/pages/minting/MintingCards";
import { MintingCardProps } from "../../components/pages/minting/lib/MintingCard";
import SideFilter from "../../components/pages/minting/SideFilter";

import WithAppshell from "../../layout/WithAppshell";
import { NFT } from "../../components/EventCard";
import { getAllNFTs } from "../../utils/getAllNFTs";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: "100vh",
  },
}));

const appliedFilters: Filter[] = [
  {
    id: 1,
    value: "Shoe",
  },
];

// const MINTING: MintingCardProps = {
//   id: 1,
//   price: "$2000",
//   title: "Compass Mega Mendung",
// };

// const MINTING_DATA = [...Array(10)].map((_, id) => ({ ...MINTING, id }));

const MintingPage = () => {
  const { classes } = useStyles();

  const [searchValue, setSearchValue] = useState("Compass Shoe");

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
    <Box sx={{ backgroundColor: "white" }}>
      <Container className={classes.container} size="xl">
        <UpsideFilter
          appliedFilters={appliedFilters}
          textInput={{
            value: searchValue,
            onChange: (e) => setSearchValue(() => e.target.value),
          }}
        />
        <Grid gutter="xl" mt="2rem">
          <Grid.Col md={8} order={2} orderMd={1}>
            <MintingCards mintingData={nfts} />
          </Grid.Col>
          <Grid.Col md={3} order={1} orderMd={2}>
            <SideFilter />
          </Grid.Col>
        </Grid>

        <Center py="xl">
          <Pagination color="ocean-blue.8" total={5} />
        </Center>
      </Container>
    </Box>
  );
};

const Page: NextPageWithLayout = () => {
  return <MintingPage />;
};

Page.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

export default Page;
