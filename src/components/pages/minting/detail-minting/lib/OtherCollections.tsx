import { useEffect, useState } from "react";
import { SimpleGrid } from "@mantine/core";
import { Box, Container, Title, createStyles } from "@mantine/core";
import MintingCard, { MintingCardProps } from "../../lib/MintingCard";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    minHeight: 500,
  },
  title: {
    borderBottom: `1px solid black`,
  },
}));

type MintingCardsProps = {
  mintingData: MintingCardProps[];
};

const OtherCollections  = (props: MintingCardsProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container} mt="5rem" py="5rem">
      <Container pt="3rem" size="xl">
        <Title weight={400} color="ocean-blue.5" className={classes.title}>
          Other
          <Box<"span"> component="span" ml="sm" sx={{ color: "black" }}>
             Collections
          </Box>
        </Title>

        <SimpleGrid
          mt="md"
          breakpoints={[
            {
              maxWidth: "sm",
              cols: 1,
            },
            {
              maxWidth: "sm",
              cols: 2,
            },
            {
              minWidth: "sm",
              cols: 3,
            },
          ]}
        >
          {props.mintingData && props.mintingData.map((data) => (
            <MintingCard key={data.tokenId} {...data} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OtherCollections;
