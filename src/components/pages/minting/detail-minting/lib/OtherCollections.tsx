import {
  Avatar,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { Box, Container, Title, createStyles } from "@mantine/core";

import { AiOutlineArrowRight } from "react-icons/ai";
import ArtworkCard from "../../../../ArtworkCard";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    minHeight: 500,
  },
  title: {
    borderBottom: `1px solid black`,
  },
}));

const OtherCollections = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container} mt="5rem" py="5rem">
      <Container pt="3rem" size="xl">
        <Title weight={400} color="ocean-blue.3" className={classes.title}>
          Christian Buehner
          <Box<"span"> component="span" ml="sm" sx={{ color: "black" }}>
            Other Collections
          </Box>
        </Title>

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
          {[...Array(5)].map((_, i) => (
            <ArtworkCard
              key={1}
              titleProps={{ text: "Van Gogh Portrait" }}
              artistProps={{ text: "Christian Buehner" }}
              priceProps={{ text: "$500" }}
              buttonProps={{ href: "/minting" }}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OtherCollections;
