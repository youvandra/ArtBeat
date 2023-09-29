import {
  Button,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { loadAuction, getBidders, claimPrize, bidOnNFT } from "../../../utils/auction/services/blockchain";
import Countdown from "../Countdown";
import { useParams } from "react-router-dom";
import { truncate } from "../../../utils/auction/store";
import { toast } from "react-toastify";
import router, { useRouter } from "next/router";
import { NextLink } from "@mantine/next";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors["ocean-blue"][8],
    fontWeight: 400,
    ":hover": {
      backgroundColor: theme.colors["ocean-blue"][3],
    },
  },
  text: {
    
  }
}));

const RightDetailAuctionId = () => {
  const router = useRouter(); // Dapatkan router
  const { tokenId } = router.query; // Dapatkan tokenId dari route
  const { classes } = useStyles();
  const [auction, setAuction] = useState(null);
  const [bidders, setBidders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidPrice, setBidPrice] = useState("");

  useEffect(() => {
    // Memuat data lelang
    const loadAuctionData = async () => {
      try {
        const id = tokenId;
        let result1;

        if (tokenId) {
          result1 = await loadAuction(tokenId);
          setAuction(result1);
        } else {
          result1 = await loadAuction(id);
          setAuction(result1);
        }
      }catch (error) {
        console.error('Error loading auction:', error);
      }
    };

    // Memuat data bidders
    const loadBiddersData = async () => {
      try {
        const id = tokenId;
        let result1;

        if (tokenId) {
          result1 = await getBidders(tokenId);
          setBidders(result1);
        } else {
          result1 = await getBidders(id);
          setBidders(result1);
        }
      } catch (error) {
        console.error('Error loading bidders:', error);
      } finally {
        setLoading(false); // Set loading menjadi false setelah data dimuat (baik sukses atau gagal)
      }
    };
    // await bidOnNFT({ tokenId, price });
    // Memanggil fungsi memuat data saat komponen dimuat
    loadAuctionData();
    loadBiddersData();
  }, [tokenId]);

  if (loading) {
    return <Center mt={"xl"}><Loader /></Center>;
  }
console.log(tokenId)
  return (
    <Stack>
      {loading ? (
        <Stack>
          <Text>Current Bid:</Text>
          <Text weight={600} size={32} color="ocean-blue.4">
            4500 BTT
          </Text>
          <Title size={48}>The Starry Night</Title>
          <Text sx={{ maxWidth: 449 }}>
            The Starry Night is an oil-on-canvas painting by the Dutch
            Post-Impressionist painter Vincent van Gogh. Painted in June 1889,
            it depicts the view from the east-facing window of his asylum room
            at Saint-Rémy-de-Provence, just before sunrise, with the addition of
            an imaginary village.
          </Text>
          <Group>
            <Group>
              <Text>Starting Bid:</Text>
              <Text color="ocean-blue.3">3500 BTT</Text>
            </Group>
            <Group>
              <Text>Minimum Next Bid:</Text>
              <Text color="ocean-blue.3">100 BTT</Text>
            </Group>
          </Group>
          <Group>
            <Text>End in:</Text>
            <Text color="red">2 d 5 h 47 m </Text>
          </Group>
          <Group noWrap>
            <Button ml="-2.5rem" className={classes.button}>
              Place a Bid
            </Button>
          </Group>
        </Stack>
      ) : (
        <Stack>
          <Text>Current Bid:</Text>
          <Text weight={600} size={32} color="ocean-blue.4">
            {auction?.price} BTT
          </Text>
          <Title size={48}>{auction?.name}</Title>
          <Text sx={{ maxWidth: 449 }}>{auction?.description}</Text>
          
          <Group>
            <Text>End in:</Text>
            <Text color="red">
              {auction?.duration > Date.now() ? (
                <Countdown timestamp={auction?.duration} />
              ) : (
                "00:00:00"
              )}{" "}
            </Text>
          </Group>
          <Group noWrap>
          <TextInput 
          placeholder={`Place your best offer..   `} 
          radius="md" 
          value={bidPrice}
          onChange={(e) => setBidPrice(e.target.value)}/>
          <Button 
          ml="-2.5rem" 
          className={classes.button} 
          onClick={() => {bidOnNFT({ tokenId: tokenId, price: bidPrice }); // Memanggil fungsi bidOnNFT dengan data yang sesuai
          setBidPrice(""); // Mengosongkan input setelah penawaran
          }}>
            Place a Bid
          </Button>
          </Group>
          <Group>
            <Text>Top Bidder :</Text>
          </Group>
          {bidders.map((bidder) => (
            <Group>
            <Text sx={{ color: 'rgb(103, 228, 164)' }}>{truncate(bidder.bidder, 5, 5, 15)}</Text>
            <Text color="ocean-blue.3">{bidder.price} BTT</Text>
          </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default RightDetailAuctionId;
