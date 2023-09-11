import { Avatar, Card, Group, Image, Text, ThemeIcon } from "@mantine/core";

import { HiOutlineCheckBadge } from "react-icons/hi2";

const CurrentArtworkCard = () => {
  return (
    <Card
      sx={{
        width: 370,
        height: 300,
      }}
    >
      <Card.Section>
        <Image src="/artwork.png" height={200} />
      </Card.Section>

      <Group mt="-1rem">
        <Avatar src={null} size={50} sx={{ borderRadius: 99999 }} />
        <Text>Rick Wright</Text>
        <HiOutlineCheckBadge size={30} color="#0DBBFC"/>
      </Group>
    </Card>
  );
};

export default CurrentArtworkCard;
