import {
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";

import { MdOutlineVerified } from "react-icons/md";
import MintingIcon from "../../../../icons/MintingIcon";

const useStyles = createStyles((theme) => ({
  container: {
    color: "white",
  },
  description: {
    maxWidth: 449,
  },
  verifIcon: {
    color: theme.colors["ocean-blue"][1],
  },
  input: {
    display: "flex",
    flexWrap: "nowrap",
    button: {
      color: theme.colors["ocean-blue"][3]
    }
  },
}));

const MintingDetailLeft = () => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.container}>
      <Title>Painted Compass</Title>
      <Group>
        <Avatar radius="xl" />
        <Text>Christian Buehner</Text>
        <MdOutlineVerified className={classes.verifIcon} size={24} />
      </Group>
      <Text className={classes.description}>
        The Starry Night is an oil-on-canvas painting by the Dutch
        Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it
        depicts the view from the east-facing window of his asylum room at
        Saint-Rémy-de-Provence, just before sunrise, with the addition of an
        imaginary village.
      </Text>

      <Group>
        <Text>Price : </Text>
        <Space w="xl" />
        <Text color="ocean-blue.1">3000 BTT</Text>
      </Group>
      <Group>
        <Text>Stock : </Text>
        <Text color="red">100 item left</Text>
      </Group>

      <Box className={classes.input}>
        <TextInput icon={<MintingIcon />} placeholder="Quantity" />

        <Button ml="-2.5rem">Mint Now</Button>
      </Box>
    </Stack>
  );
};

export default MintingDetailLeft;
