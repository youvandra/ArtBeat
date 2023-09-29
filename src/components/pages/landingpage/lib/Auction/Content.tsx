import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getBidders, loadAuction } from "../../../../../utils/auction/services/blockchain";
import Countdown from "../../../Countdown"
import { NextLink } from "@mantine/next";
import { truncate } from "../../../../../utils/auction/store";

const AuctionContent = () => {
  const theme = useMantineTheme();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    loadAuctionsData();
  }, []);

  const loadAuctionsData = async () => {
    try {
      const result = await loadAuction(4); 
      setAuction(result);
      const result1 = await getBidders(4);
      setBidders(result1);
      setLoading(false);
    } catch (error) {
      console.error('Error loading auction:', error);
      setLoading(false);
    }
  };

  return (
    <Center>
      {loading ? (
        <Center mt={"xl"}>
          <Loader />
        </Center>
      ) : (
      <Stack>
        <Text
          size={32}
          sx={{
            fontFamily: theme.headings.fontFamily,
            fontWeight: 700,
            color: theme.colors["ocean-blue"][1],
          }}
        >
          <Box<"span"> component="span" sx={{  color: "white" }}>
            Current Bid :{" "}
          </Box>
        </Text>
        <Text 
              size={20}
              sx={{
                fontFamily: theme.headings.fontFamily,
                color: theme.colors["ocean-blue"][1],
                fontWeight: 400,
              }}>{auction.price} BTT</Text>
        <br></br>
        
        <Text
            size={32}
            sx={{
              fontFamily: theme.headings.fontFamily,
              fontWeight: 700,
              color: theme.colors["ocean-blue"][1],
            }}
          >
            <Box<"span"> component="span" sx={{ color: "white" }}>
              Top Bidder :{" "}
            </Box>
          </Text>
          {bidders.map((bidder) => (
          <Group>
            <Text
              size={20}
              sx={{
                fontFamily: theme.headings.fontFamily,
                color: "white",
                fontWeight: 400,
              }}
            >
              {truncate(bidder.bidder, 6, 6, 18)}
            </Text>
          </Group>
          ))}
        <br></br>
        <Text
          size={32}
          sx={{
            fontFamily: theme.headings.fontFamily,
            fontWeight: 700,
            color: "#EF4444",
          }}
        >
          <Box<"span"> component="span" sx={{ color: "white" }}>
            End In :{" "}
          </Box><br></br>
          <span style={{ fontSize: "20px" }}>
          {auction?.duration > Date.now() ? (
            <Countdown timestamp={auction?.duration} />
          ) : (
            '00:00:00'
          )}
          </span>
        </Text><br></br><br></br>
        <Center>
          <NextLink href={"/auction/4"}>
          <Button
            leftIcon={<FaBalanceScaleLeft />}
            size="md"
            sx={{
              color: theme.colors["ocean-blue"][3],
              width: 250,
              borderRadius: 20,
              marginTop: 10,
              fontFamily: theme.headings.fontFamily,
              fontWeight: 400,
            }}
          >
            Join Auction
          </Button>
          </NextLink>
        </Center>
      </Stack>
      )}
    </Center>
  );
};

export default AuctionContent;
