import {
  Avatar,
  Box,
  createStyles,
  Group,
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

const useStyles = createStyles((t) => ({
  container: {
    borderRadius: 8,
    border: `1px solid ${t.colors["ocean-blue"][3]}`,
    padding: 16,
    [t.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
  artistSection: {
    [t.fn.smallerThan("sm")]: {
      alignSelf: "center",
    },

    maxWidth: 300,
    height: "100%",
  },
  artwokrsSection: {
    flexGrow: 1,
    [t.fn.largerThan("sm")]: {
      paddingLeft: 16,
      borderLeft: `1px solid ${t.colors["ocean-blue"][3]}`,
    },
  },
  green: {
    color: t.colors["ocean-blue"][3],
  },
}));

export default function ArtistCard({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Group py={"xl"} noWrap align={"stretch"} className={classes.container}>
      <ArtistSection data={data} />
      <ArtworkSection data={data} />
    </Group>
  );
}

function ArtistSection({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Stack className={classes.artistSection} align="center">
      <Avatar src={data.user.image} size={180} radius={999} />
      <Text size="xl" weight={600} align="center">
        {data.user.name}
      </Text>
      <Text align="center">{data.description.length > 100 ? data.description.slice(0, 100) + '...' : data.description}</Text>
      <Group mt="xl" color="#111" spacing="xs" align="center">
        <IoMdColorPalette size={24} />
        <Text weight={500}>
          {data.tokenIds ? `${data.tokenIds.length} Artworks` : 'Loading...'}
        </Text>
      </Group>
      <Text
        variant="link"
        component={NextLink}
        href={`/artist/${data.id}`}
        align="center"
        color="#007BFF" 
      >
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
    <Box className={classes.artwokrsSection}>
      <Title order={3}>
        <span className={classes.green}>Recent</span> Artworks
      </Title>
      <SimpleGrid
        spacing="xl" // Atur jarak antar elemen sesuai kebutuhan
        mt="xl"
        breakpoints={[
          { maxWidth: "lg", cols: 2 }, // Ketika layar berukuran 'lg', tampilkan 2 kolom
          { maxWidth: "md", cols: 1 }, // Ketika layar berukuran 'md', tampilkan 1 kolom
        ]}
        sx={{ width: "100%" }}
        cols={3} // Secara default, tampilkan 3 kolom
      >
        {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} {...nft} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

interface Props {
  data: inferProcedureOutput<AppRouter["artist"]["getArtists"]>[number];
}
