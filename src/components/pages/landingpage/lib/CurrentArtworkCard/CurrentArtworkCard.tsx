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

const CurrentArtworkCard = ({ metadata, ...nft }: NFT) => {
  const theme = useMantineTheme();

  return (
    <Card
      sx={{
        width: 370,
        // height: 300,
      }}
    >
      <Card.Section>
        <Image
          src={metadata.image}
          height={235}
          sx={{
            // @ts-ignore
            img: {
              objectFit: "contain !important",
            },
          }}
        />
      </Card.Section>

      <Stack spacing={4} mt={4}>
        <Text
          size={20}
          sx={{
            maxWidth: 285,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            color: theme.colors["ocean-blue"][3],
            fontWeight: 700,
            fontFamily: theme.headings.fontFamily,
          }}
        >
          {metadata.title}
        </Text>

        <Text>Art by: {metadata.artist}</Text>
      </Stack>

      <Space h="xl"/>

      <Group position="apart">
        <Text weight={700}>{nft.price} BTT</Text>
        <Button>See Details</Button>
      </Group>
    </Card>
  );
};

export default CurrentArtworkCard;
