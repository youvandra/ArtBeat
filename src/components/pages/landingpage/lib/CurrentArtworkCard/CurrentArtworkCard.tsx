import {
  Button,
  Card,
  Group,
  Image,
  Space,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

// import { HiOutlineCheckBadge } from "react-icons/hi2";
import { NFT } from "../../../../EventCard";
import { Styles } from "../../../../../const";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NextLink } from "@mantine/next";

const CurrentArtworkCard = ({ metadata, ...nft }: NFT) => {
  const theme = useMantineTheme();

  return (
    <Card sx={{ width: 370 }} radius={10} shadow="xl">
      <Card.Section>
        <Image
          src={metadata.image}
          height={235}
          sx={{
            img: {
              objectFit: "contain",
              width: "100%",
              height: "100%", 
            },
          }}
        />
      </Card.Section>

      <Stack spacing={4} mt={4}>
        <Text
          size={20}
          sx={{
            ...Styles.TRUNCATE,
            maxWidth: 285,
            color: theme.colors["ocean-blue"][3],
            fontWeight: 700,
            fontFamily: theme.headings.fontFamily,
          }}
        >
          {metadata.title}
        </Text>

        <Text>Art by: {metadata.artist}</Text>
      </Stack>

      <Space h="xl" />

      <Group position="apart">
        <Text>{nft.price} BTT</Text>
        <Button
          component={NextLink}
          href={`/artwork/${nft.tokenId}`}
          variant="subtle"
          color="ocean-blue.3"
          rightIcon={<AiOutlineArrowRight />}
        >
          See Details
        </Button>
      </Group>
    </Card>

  );
};

export default CurrentArtworkCard;
