import {
  Avatar,
  Box,
  createStyles,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { inferProcedureOutput } from "@trpc/server";
import React, { useEffect, useState } from "react";
import { IoMdColorPalette } from "react-icons/io";
import { AppRouter } from "../../../server/trpc/router/_app";
import { getAllNFTsById } from "../../../utils/getAllNFTsById";
import { NFT } from "../../EventCard";
import NFTCard from "../../nft/NFTCard";
import ArtworkCard from "../../ArtworkCard";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: 8,
    border: `1px solid ${theme.colors["ocean-blue"][0]}`,
    padding: 16,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
  museumSection: {
    [theme.fn.smallerThan("sm")]: {
      alignSelf: "center",
      width: "100%",
      maxWidth: "9000px",
    },

    maxWidth: 300,
    height: "100%",
  },
  artworksSection: {
    flexGrow: 1,
    [theme.fn.largerThan("sm")]: {
      paddingLeft: 16,
      borderLeft: `1px solid ${theme.colors["ocean-blue"][0]}`,
    },
    h3: {
      span: {
        color: theme.colors["ocean-blue"][3],
      },
    },
  },
}));

export default function MuseumCard({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Group py={"xl"} noWrap align={"stretch"} className={classes.container}>
      <MuseumSection data={data} />
      <ArtworkSection data={data} />
    </Group>
  );
}

function MuseumSection({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Stack className={classes.museumSection} align={"center"}>
      <Image src={data.mainImage} height={250} width={"100%"} radius="md" />
      <Text size={"xl"} align="center" weight={600}>
        {data.name}
      </Text>
      <Text align="center">{data.address}</Text>

      <Text variant="link" component={NextLink} href={`/museum/${data.id}`}>
        See Details
      </Text>
    </Stack>
  );
}

function ArtworkSection({ data }: Props) {
  const { classes } = useStyles();
  const [nfts, setNfts] = useState<NFT[]>([]);
  useEffect(() => {
    async function updateNFTs() {
      setNfts(await getAllNFTsById(data.tokenIds));
    }
    updateNFTs();
  }, []);
  return (
    <Box className={classes.artworksSection}>
      <Title order={3}>
        <span>Recent</span> Collections
      </Title>
      <SimpleGrid
        breakpoints={[
          { maxWidth: "md", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        {nfts.map((nft) => (
          <ArtworkCard
            key={nft.tokenId}
            imageProps={{ src: nft.metadata.image }}
            titleProps={{ text: nft.metadata.title }}
            avatarProps={{ sx: { display: "none" } }}
            artistProps={{ text: `Art By: ${nft.metadata.artist}` }}
            priceProps={{ sx: { display: "none" } }}
            buttonProps={{ sx: { display: "none" }, href: "/" }}
            {...nft}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

interface Props {
  data: inferProcedureOutput<AppRouter["museumRouter"]["getById"]>;
}
