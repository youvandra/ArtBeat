import { Avatar, Group, Stack, Text } from "@mantine/core";

export default function ArtistCard({
  name,
  artwokrsCount,
}: {
  name: string;
  artwokrsCount: string;
}) {
  return (
    <Group align={"center"}>
      <Stack spacing={0}>
        <Text size={"xl"}weight={"bold"}>{name}</Text>
        <Text size={"xl"}>{artwokrsCount}</Text>
      </Stack>
    </Group>
  );
}
