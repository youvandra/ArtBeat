import {
  Box,
  Button,
  Center,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { FaBalanceScaleLeft } from "react-icons/fa";

const AuctionContent = () => {
  const theme = useMantineTheme();

  return (
    <Center>
      <Stack>
        <Text
          size={32}
          sx={{
            fontFamily: theme.headings.fontFamily,
            color: "white",
            fontWeight: 400,
          }}
        >
          Sep 2-3 | 12 PM BST
        </Text>
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
          2550 BTTC
        </Text>
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
          </Box>
          3 D 4 H 45 M
        </Text>
        <Center>
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
        </Center>
      </Stack>
    </Center>
  );
};

export default AuctionContent;
