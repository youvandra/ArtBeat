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
            <Card key={i} withBorder>
              <Image
                src="https://www.placehold.co/270x180"
                width={270}
                height={180}
                mx="auto"
              />
              <Stack mt="md" spacing="md">
                <Title size={20} weight={400} color="ocean-blue.4">
                  Van Gogh Portrait
                </Title>
                <Group>
                  <Avatar radius="xl" />
                  <Text size={16}>Christian Buehner</Text>
                </Group>
                <Group position="apart">
                  <Text>Price : $500</Text>
                  <Button
                    variant="subtle"
                    color="ocean-blue"
                    rightIcon={<AiOutlineArrowRight />}
                  >
                    See Details
                  </Button>
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OtherCollections;
