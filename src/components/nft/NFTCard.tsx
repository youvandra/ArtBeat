import { Avatar, Card, Group, Image, Text, Title } from "@mantine/core";
import { MdVerified } from "react-icons/md";
import { NFT } from "./NFTExploreCard";
import { NextLink } from "@mantine/next";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";

export default function NFTCard({ metadata, tokenId, data }: NFT & Props) {
  const maxLength = 17; 
  const truncatedTitle = (metadata.title && metadata.title.length > maxLength)
  ? `${metadata.title.slice(0, maxLength)}...`
  : metadata.title;
  return (
    <Card shadow="lg" p="sm" radius="md">
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
          <Avatar src={data?.user.image} radius={999} size={24} />{" "}
          <Text size={"sm"}>{metadata.artist.length > 14
    ? metadata.artist.slice(0, 14) + "..."
    : metadata.artist}</Text>{" "}
          <MdVerified color="#0DBBFC" />
        </Group>
      </Group>
    </Card>
  );
}

interface Props {
  data: inferProcedureOutput<AppRouter["artist"]["getArtists"]>[number];
}


