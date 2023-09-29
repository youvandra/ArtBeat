import { Box, Center, Loader, Stack, Text, useMantineTheme } from "@mantine/core";
import RectangleCircleShape from "../RectangleCircleShape/RectangleCircleShape";
import { useEffect, useState } from "react";
import { loadAuction } from "../../../../../utils/auction/services/blockchain";

const AuctionHeader = () => {
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
      setLoading(true);
    }
  };

  return (
    <Center mt={96} mb={10}>
      
        
      <Stack>
        <Box sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", right: 0, top: "-6rem" }}>
            <RectangleCircleShape />
          </Box>
          <Text
            size={48}
            sx={{
              fontFamily: theme.headings.fontFamily,
              color: "white",
              textAlign: "center",
            }}
          >
            <Box<"span">
              component="span"
              sx={{ color: theme.colors["ocean-blue"][1] }}
            >
              Live Auction
            </Box>{" "}
            on This Day
          </Text>
        </Box>
        {loading ? (
          <Center mt={"xl"}>
          </Center>
        ) : (
        <Text
                  size={50}
                  sx={{
                    fontFamily: theme.headings.fontFamily,
                    color: "white",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                {auction?.name}
                </Text>
        )}
          <br></br><br></br>
        </Stack>
    </Center>
  );
};


export default AuctionHeader;
