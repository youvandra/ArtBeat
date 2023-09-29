import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

import {
  Box,
  Center,
  Container,
  Grid,
  Pagination as MantinePagination,
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
import { Drop } from "../../components/nft/NFTExploreCard";
import { getAllDrops } from "../../utils/getAllDrop";

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

const ITEMS_PER_PAGE = 8; // Jumlah item per halaman

const MintingPage = () => {
  const { classes } = useStyles();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [nfts, setNfts] = useState<Drop[]>([]);

  useEffect(() => {
    getAllDrops()
      .then((n) => {
        setNfts(n);
      })
      .catch(() => {
        showNotification({
          message: "There was a problem fetching the NFTs",
          color: "red",
        });
      })
      .finally(() => {
      });
  }, []);

  // Menghitung indeks awal dan akhir untuk item yang ditampilkan pada halaman saat ini
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Menampilkan hanya item yang sesuai dengan halaman saat ini
  const itemsToDisplay = nfts.slice(startIndex, endIndex);

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container className={classes.container} size="xl">
        <UpsideFilter
          appliedFilters={appliedFilters}
          textInput={{
            value: searchValue,
            onChange: (e) => setSearchValue(e.target.value),
          }}
        />
        <Grid gutter="xl" mt="2rem">
          <Grid.Col md={8} order={2} orderMd={1}>
            <MintingCards mintingData={itemsToDisplay} />
          </Grid.Col>
          <Grid.Col md={3} order={1} orderMd={2}>
            <SideFilter />
          </Grid.Col>
        </Grid>

        <Center py="xl">
        <MantinePagination
          color="ocean-blue.8"
          total={Math.ceil(nfts.length / ITEMS_PER_PAGE)} // Total halaman yang tersedia
          page={currentPage}
          onChange={(newPage) => setCurrentPage(newPage)}
        />
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
