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
        <Text>{nft.price}</Text>
        <Button
          variant="outline"
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
