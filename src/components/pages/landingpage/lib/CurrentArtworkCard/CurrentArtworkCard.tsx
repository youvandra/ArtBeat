import { Avatar, Card, Group, Image, Text, ThemeIcon } from "@mantine/core";

import { HiOutlineCheckBadge } from "react-icons/hi2";
import { NFT } from "../../../../EventCard";

const CurrentArtworkCard = ({ metadata, ...nft }: NFT) => {
  return (
    <Card
      sx={{
        width: 370,
        height: 300,
      }}
    >
      <Card.Section>
        <Image
          src={metadata.image}
          height={235}
          sx={{ objectFit: "contain" }}
        />
      </Card.Section>

      <Group mt="-1rem">
        <Avatar src={null} size={50} sx={{ borderRadius: 99999 }} />
        <Text
          sx={{
            maxWidth: 200,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {metadata.artist}
        </Text>
        <HiOutlineCheckBadge size={30} color="#0DBBFC" />
      </Group>
    </Card>
  );
};

export default CurrentArtworkCard;
