import { Container, Grid } from "@mantine/core";
import MintingDetailLeft from "./lib/DetailLeft";
import MintingDetailRight from "./lib/DetailRight";
import OtherCollections from "./lib/OtherCollections";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllDrops } from "../../../../utils/getAllDrop";
import { showNotification } from "@mantine/notifications";
import { Drop } from "../../../nft/NFTExploreCard";

const ITEMS_PER_PAGE = 8;

const MintingDetails = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const [currentPage, setCurrentPage] = useState(1);

  const [nfts, setNfts] = useState<Drop[]>([]);

  useEffect(() => {
    getAllDrops()
      .then((n) => {
        setNfts(n);
      })
      .catch(() => {
        showNotification({
          message: "There was a problem fetching the NFTs",
          color: "red",
        });
      })
      .finally(() => {
      });
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Menampilkan hanya item yang sesuai dengan halaman saat ini
  const itemsToDisplay = nfts.slice(startIndex, endIndex);
  return (
    <div>
      <Container mt="xl" size="xl">
        <Grid mt="xl">
          <Grid.Col md={6}>
            <MintingDetailLeft router={router} />
          </Grid.Col>
          <Grid.Col md={6}>
            <MintingDetailRight />
          </Grid.Col>
        </Grid>
      </Container>
      <OtherCollections mintingData={itemsToDisplay} />
    </div>
  );
};

export default MintingDetails;
