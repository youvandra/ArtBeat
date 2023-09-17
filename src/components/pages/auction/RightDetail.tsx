import {
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors["ocean-blue"][8],
    fontWeight: 400,
    ":hover": {
      backgroundColor: theme.colors["ocean-blue"][3],
    },
  },
}));

const RightDetailAuction = () => {
  const { classes } = useStyles();

  return (
    <Stack>
      <Text>Current Bid:</Text>
      <Text weight={600} size={32} color="ocean-blue.4">
        4500$
      </Text>

      <Title size={48}>The Starry Night</Title>
      <Text sx={{ maxWidth: 449 }}>
        The Starry Night is an oil-on-canvas painting by the Dutch
        Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it
        depicts the view from the east-facing window of his asylum room at
        Saint-Rémy-de-Provence, just before sunrise, with the addition of an
        imaginary village.
      </Text>

      <Group>
        <Group>
          <Text>Starting Bid:</Text>
          <Text>$3500</Text>
        </Group>
        <Group>
          <Text>Minimum Next Bid:</Text>
          <Text>$100</Text>
        </Group>
      </Group>
      <Group>
        <Text>End in:</Text>
        <Text>$100</Text>
      </Group>

      <Group noWrap>
        <TextInput placeholder="Enter 4500$ or more" radius="md" />
        <Button ml="-2.5rem" className={classes.button}>
          Place a Bid
        </Button>
      </Group>
    </Stack>
  );
};

export default RightDetailAuction;
