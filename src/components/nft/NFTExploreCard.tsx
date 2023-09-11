import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Image,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

import MintingIcon from "../icons/MintingIcon";

export default function NFTExploreCard({ metadata, price, tokenId }: NFT) {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="md"
      p="lg"
      radius="md"
      sx={{
        width: 290,
        minHeight: 450,
        background: "transparent",
        border: "1px solid white",
      }}
    >
      <Card.Section sx={{ padding: "1rem" }}>
        <Image src={metadata.image} />
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
          {metadata.title}
        </Text>
      </Box>
      <Group mt="xl">
        <Stack
          spacing="xs"
          sx={{ color: "white", fontFamily: theme.headings.fontFamily }}
        >
          <Text>Price</Text>
          <Text sx={{ color: theme.colors.straw[0] }}>{price}</Text>
        </Stack>
        {/* <Space w="md" /> */}

        <Divider orientation="vertical" />
        <Text
          sx={{
            maxWidth: 144,
            fontSize: 16,
            color: "white",
            fontFamily: theme.headings.fontFamily,
          }}
          lineClamp={3}
        >
          {metadata.description}
        </Text>
      </Group>

      <Center mt="xl">
        <Button
          leftIcon={<MintingIcon />}
          variant="filled"
          sx={{ fontFamily: theme.headings.fontFamily, color: theme.colors["ocean-blue"][3] }}
          
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
}

export interface NFT {
  price: any;
  tokenId: any;
  seller: any;
  owner: any;
  metadata: NFTMetadata;
}
