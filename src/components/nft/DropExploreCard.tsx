import {
  Box,
  Button,
  Card,
  CardProps,
  Center,
  Divider,
  Group,
  Image,
  Space,
  Stack,
  Text,
  TextProps,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

import MintingIcon from "../icons/MintingIcon";
import { ethers } from "ethers";

const useStyles = createStyles((theme) => ({
  card: {
    width: 290,
    minHeight: 450,
    background: "transparent",
    border: "1px solid white",
  },
  description: {
    maxWidth: 120,
    fontSize: 17,
    color: "white",
    fontFamily: theme.headings.fontFamily,
  },
  price: { color: "white", fontFamily: theme.headings.fontFamily },
}));

export type DropCardProps = Drop;

export default function NFTExploreCard({ tokenId,
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
    image5, }: DropCardProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Card
      shadow="md"
      p="lg"
      radius="md"
      className={classes.card}
    >
      <Card.Section sx={{ padding: "1rem" }}>
        <Image src={image1} width={257} height={179} />
      </Card.Section>

      <Box>
        <Text
          color={theme.colors["ocean-blue"][1]}
          size={18}
          sx={{
            fontFamily: theme.headings.fontFamily,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: 248,
          }}
        >
          {name}
        </Text>
      </Box>
      <Group mt="xl">
        <Stack spacing="xs" className={classes.price}>
          <Text>Price</Text>
          <Text sx={{ color: theme.colors.straw[0] }}>{ethers.utils.formatUnits(pricePerNft)} BTT</Text>
        </Stack>
        {/* <Space w="md" /> */}

        <Divider orientation="vertical" />
        <Text
          className={classes.description}
          lineClamp={3}
        >
          {description}
        </Text>
      </Group>

      <Center mt="xl">
        <Button
          component={NextLink}
          href={`/minting/detail-minting/${tokenId}`}
          leftIcon={<MintingIcon />}
          variant="filled"
          sx={{
            fontFamily: theme.headings.fontFamily,
            color: theme.colors["ocean-blue"][3],
          }}
        >
          Mint Now
        </Button>
      </Center>
    </Card>
  );
}

export interface NFTMetadata {
  title: string;
  artist: string;
  year: string;
  technique: string;
  size: string;
  type: string;
  edition: string;
  condition: string;
  frame: string;
  status: string;
  description: string;
  image: string;
  price: string;
  certificate: string;
}

export interface NFT {
  price: any;
  tokenId: any;
  seller: any;
  owner: any;
  metadata: NFTMetadata;
}

export interface Event {
  id: string;
  name: string;
  address: string;
  description: string;
  date: string;
  time: string;
  mainImage: string;
  image1: string;
  image2: string;
  ticketPrice: any;
  totalTickets: any;
}


export interface Drop {
  tokenId: any;
  name: any;
  artistName: any;
  description: any;
  totalSupply: any;
  pricePerNft: any;
  tokenURI: any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
}