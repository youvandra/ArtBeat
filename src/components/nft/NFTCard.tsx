import { Avatar, Card, Group, Image, Text, Title } from "@mantine/core";
import { MdVerified } from "react-icons/md";
import { NFT } from "./NFTExploreCard";
import { NextLink } from "@mantine/next";

export default function NFTCard({ metadata, tokenId }: NFT) {
  const maxLength = 17; // Jumlah huruf maksimal yang diinginkan

// Memotong judul jika melebihi maxLength
  const truncatedTitle = metadata.title.length > maxLength
    ? `${metadata.title.slice(0, maxLength)}...`
    : metadata.title;
  return (
    <Card shadow="sm" p="sm" radius="md">
      <Card.Section>
        <NextLink href={`/artwork/${tokenId}`}>
          <Image src={metadata.image} height={160} />
        </NextLink>
      </Card.Section>
      <Title mt={"xl"} color="ocean-blue.3" order={3}>
        {truncatedTitle}
      </Title>
      <Group spacing={"xs"} mt={"xs"}>

        <Text size={"sm"}>Art by:</Text>
        <Group spacing={"xs"}>
          <Avatar src={metadata.image} radius={999} size={24} />{" "}
          <Text size={"sm"}>{metadata.artist}</Text>{" "}
          <MdVerified color="#0DBBFC" />
        </Group>
      </Group>
    </Card>
  );
}