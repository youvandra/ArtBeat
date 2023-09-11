import { Box, Center, Stack, Text, useMantineTheme } from "@mantine/core";
import RectangleCircleShape from "../RectangleCircleShape/RectangleCircleShape";

const AuctionHeader = () => {
  const theme = useMantineTheme();

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
        <Text
          size={36}
          sx={{
            fontFamily: theme.headings.fontFamily,
            color: "white",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Greek Face Sculptures, a Masterpiece <br /> by Jack Finnigan
        </Text>
      </Stack>
    </Center>
  );
};

export default AuctionHeader;
