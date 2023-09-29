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
import { Drop, NFT } from "../../../nft/NFTExploreCard";
import { ethers } from "ethers";

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

export type MintingCardProps = Drop;

const MintingCard = ({ tokenId,
  name,
  artistName,
  description,
  totalSupply,
  pricePerNft,
  tokenURI,
  image1,
  image2,
  image3,
  image4,
  image5, }: MintingCardProps) => {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <Card radius="md" p="sm" withBorder className={classes.card}>
      <Card.Section withBorder>
        <Image
          className={classes.cardImage}
          src={image1 || "https://www.placehold.co/264x253"}
          width="100%"
          height={253}
          radius="md"
        />
      </Card.Section>

      <Title
        mt="0.5rem"
        size={15}
        color="ocean-blue.2"
        weight={400}
        className={classes.cardTitle}
      >
        {name}
      </Title>

      <Group spacing="md" >
          <Text>Price : </Text>
          <Text mt={2} color="straw.0">
            {ethers.utils.formatEther(pricePerNft)} BTT
          </Text>

        <Button
          className={classes.button}
          leftIcon={<MintingIcon />}
          radius="xl"
          fullWidth
          onClick={() => router.push(`/minting/detail-minting/${tokenId}`)}
        >
          Mint Now
        </Button>
      </Group>
    </Card>
  );
};

export default MintingCard;
