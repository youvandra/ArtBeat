import { Center, Stack, Text } from "@mantine/core";
import UnderconstructionIcon from "../icons/UnderconstructionIcon";

const UnderconstructionComponent = () => {
  return (
    <Center sx={{ minHeight: "100vh" }}>
      <Stack align="center">
        <UnderconstructionIcon />
        <Text size={30} color="white">
          This website is underconstruction
        </Text>
      </Stack>
    </Center>
  );
};

export default UnderconstructionComponent;
