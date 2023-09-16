import { useState } from "react";
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

const MINTING: MintingCardProps = {
  id: 1,
  price: "$2000",
  title: "Compass Mega Mendung",
};

const MINTING_DATA = [...Array(10)].map((_, id) => ({ ...MINTING, id }));

const MintingPage = () => {
  const { classes } = useStyles();

  const [searchValue, setSearchValue] = useState("Compass Shoe");

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
          <Grid.Col md={8}>
            <MintingCards mintingData={MINTING_DATA} />
          </Grid.Col>
          <Grid.Col md={3}>
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
  if (process.env.NODE_ENV == "development") {
    return <MintingPage />;
  }

  return <UnderconstructionComponent />;
};

Page.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

export default Page;
