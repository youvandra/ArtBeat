import {
  Box,
  createStyles,
  Group,
  Text,
  Image,
  Title,
  SimpleGrid,
  Stack,
  Center,
  Loader,
  Container,
} from "@mantine/core";
import { inferProcedureOutput } from "@trpc/server";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaAddressBook, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

import { MdArrowBack } from "react-icons/md";
import { NFT } from "../../components/EventCard";

import NFTExploreCard from "../../components/nft/NFTExploreCard";
import ButtonBack from "../../components/ButtonBack";
import { getAllNFTsById } from "../../utils/getAllNFTsById";
import { AppRouter } from "../../server/trpc/router/_app";
import { trpc } from "../../utils/trpc";
import { NextPageWithLayout } from "../_app";
import WithAppshell from "../../layout/WithAppshell";
import ArtworkCard from "../../components/ArtworkCard";
// import CreateDummy from "../../utils/CreateDummy";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    color: "white",
  },
  imageContainer: {
    width: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)",
    gap: 16,
    [theme.fn.smallerThan("md")]: { display: "flex", flexDirection: "column" },
  },
  img1: {
    gridArea: "1 / 1 / 9 / 6",
  },
  img2: {
    gridArea: " 5 / 6 / 9 / 9",
  },
  img3: {
    gridArea: "1 / 6 / 5 / 9",
  },
  overviewContainer: {
    backgroundColor: "white",
  },
  collectionsContainer: {
    backgroundColor: "white",
  },
  green: {
    color: theme.colors["ocean-blue"][3],
  },
}));

// const museums = CreateDummy.museums(1);
// const museum = museums[0];

function Museum() {
  const { classes } = useStyles();
  const router = useRouter();
  const id = String(router.query.id);
  const { data, isInitialLoading } = trpc.museumRouter.getById.useQuery({ id });

  if (isInitialLoading)
    return (
      <Box className={classes.container}>
        <Center py={196}>
          <Loader size={"xl"} />
        </Center>
      </Box>
    );

  if (data)
    return (
      <>
        <Container size="xl">
          <Box px={"xl"} mt="xl" pt="xl" pb={64} className={classes.container}>
            <ButtonBack href="/museum" />
            <Title mt={"xl"}>{data.name}</Title>
            <Box className={classes.grid} mt={"xl"}>
              <Image
                height={420}
                className={classes.img1}
                radius={"md"}
                src={data.mainImage}
              />

              <Image
                className={classes.img2}
                height={210 - 8}
                radius={"md"}
                src={data.image1}
              />
              <Image
                className={classes.img3}
                height={210 - 8}
                radius={"md"}
                src={data.image2}
              />
            </Box>
          </Box>
        </Container>
        <Overview data={data} />
        <RecommendedEvents data={data} />
      </>
    );
  return (
    <Box className={classes.container}>
      <Center py={196}>
        <Text weight={600} size={32} color={"red"}>
          There was a problem
        </Text>
      </Center>
    </Box>
  );
}

function Overview({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Box pt={64} px={"xl"} className={classes.overviewContainer}>
      <Container size="xl">
        <Title size={36} order={2}>
          <span className={classes.green}>Overview</span>
        </Title>
        <Stack>
          <Text mt={"md"} weight={500} size={"lg"}>
            {data.description}
          </Text>
          <Group noWrap mt={48}>
            <FaMapMarkerAlt color="#111" size={24} />{" "}
            <Text color="#111" weight={600} size={"lg"}>
              {data.address}
            </Text>
          </Group>
          <Group noWrap>
            <FaAddressBook color="#111" size={24} />{" "}
            <Text color="#111" weight={600} size={"lg"}>
              {data.phone}
            </Text>
          </Group>
          <Group noWrap>
            <FaGlobe color="#111" size={24} />{" "}
            <Text color="#111" weight={600} size={"lg"}>
              {data.website}
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}

function RecommendedEvents({ data }: Props) {
  const { classes } = useStyles();

  const [nfts, setNfts] = useState<NFT[]>([]);
  useEffect(() => {
    async function updateNFTs() {
      setNfts(await getAllNFTsById(data.tokenIds));
    }
    updateNFTs();
  }, []);
  return (
    <Box className={classes.collectionsContainer} py={64} px={"xl"}>
      <Container size="xl">
        <Title size={36} order={2}>
          <span className={classes.green}>Museum</span> Collections
        </Title>
        <SimpleGrid
          mt={"xl"}
          cols={3}
          breakpoints={[
            { maxWidth: "lg", cols: 3 },
            { maxWidth: "md", cols: 2 },
            { maxWidth: "xs", cols: 1 },
          ]}
        >
          {nfts.map((nft) => (
            <ArtworkCard
              key={nft.tokenId}
              titleProps={{ text: nft.metadata.title }}
              artistProps={{ text: nft.metadata.artist }}
              priceProps={{ text: nft.price }}
              {...nft}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

interface Props {
  data: inferProcedureOutput<AppRouter["museumRouter"]["getById"]>;
}

const Page: NextPageWithLayout = () => {
  return <Museum />;
};

Page.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

export default Page;
