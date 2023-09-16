import { useRouter } from "next/router";
import {
  Button,
  Card,
  Group,
  Image,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import MintingIcon from "../../../icons/MintingIcon";
import { Styles } from "../../../../const";

const useStyles = createStyles((theme) => ({
  card: {
    minHeight: 343,
  },
  cardImage: {
    img: {
      objectFit: "contain !important" as "contain",
    },
  },
  cardTitle: {
    ...Styles.TRUNCATE,
  },
  button: {
    color: theme.colors["ocean-blue"][3],
    fontWeight: 400,
  },
}));

export type MintingCardProps = {
  id: number;
  title: string;
  price: string;
};

const MintingCard = ({ title, price }: MintingCardProps) => {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <Card radius="md" p="sm" withBorder className={classes.card}>
      <Card.Section withBorder>
        <Image
          className={classes.cardImage}
          src="https://www.placehold.co/264x253"
          width="100%"
          height={253}
          radius="md"
        />
      </Card.Section>

      <Title
        mt="0.5rem"
        size={18}
        color="ocean-blue.2"
        weight={400}
        className={classes.cardTitle}
      >
        {title}
      </Title>

      <Group spacing="xl" noWrap>
        <div>
          <Text>Price</Text>
          <Text mt={2} color="straw.0">
            {price}
          </Text>
        </div>

        <Button
          className={classes.button}
          leftIcon={<MintingIcon />}
          radius="xl"
          fullWidth
          onClick={() =>
            router.push(
              "/minting/detail-minting/3493bb21-878e-4e19-adb7-a6622b1969c1"
            )
          }
        >
          Mint Now
        </Button>
      </Group>
    </Card>
  );
};

export default MintingCard;
