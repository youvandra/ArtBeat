import {
  Box,
  Button,
  Center,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { loadAuction } from "../../../../../utils/auction/services/blockchain";
import Countdown from "../../../Countdown"
import { NextLink } from "@mantine/next";

const AuctionContent = () => {
  const theme = useMantineTheme();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuctionsData();
  }, []);

  const loadAuctionsData = async () => {
    try {
      const result = await loadAuction(4); // Change the parameter to the auction ID you want to load
      setAuction(result);
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
            color: "white",
            fontWeight: 400,
          }}
        >
          Express Emotions
        </Text><br></br>
        <Text
          size={32}
          sx={{
            fontFamily: theme.headings.fontFamily,
            fontWeight: 700,
            color: theme.colors["ocean-blue"][1],
          }}
        >
          <Box<"span"> component="span" sx={{ color: "white" }}>
            Current Bid :{" "}
          </Box>
          {auction?.price} BTT
        </Text><br></br>
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
          {auction?.duration > Date.now() ? (
            <Countdown timestamp={auction?.duration} />
          ) : (
            '00:00:00'
          )}
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
