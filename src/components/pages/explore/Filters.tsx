import {
  Stack,
  Text,
  ColorSwatch,
  Group,
  Box,
  Divider,
  Avatar,
} from "@mantine/core";
import { trpc } from "../../../utils/trpc";

export default function Filters() {
  return (
    <Stack spacing={72} >
      <SelectedArtists />
      <SelectedMuseums />
    </Stack>
  );
}

function SelectedArtists() {
  const { data, isInitialLoading } = trpc.artist.getArtists.useQuery();
  if (isInitialLoading) {
    // Tampilkan pesan loading atau indikator loading
    return <p>Loading...</p>;
  }
  return (
    <Box >
      <Text size={"lg"} weight={500}>
        Artists <span style={{ color: "#0f6c57" }}>List</span>
      </Text>
      <Divider color={"#0f6c57"} />
      <Stack mt={"xl"}>
      {data.slice(0, 7).map((data) => (
          <SelectedCard
            body=""
            name={data.user.name}
            image={data.user.image}
          />
        ))}
      </Stack>
    </Box>
  );
}

function SelectedMuseums() {
  const { data, isInitialLoading } = trpc.museumRouter.getAll.useQuery();
  if (isInitialLoading) {
    // Tampilkan pesan loading atau indikator loading
    return <p>Loading...</p>;
  }
  return (
    <Box>
      <Text size={"lg"} weight={500}>
        Museums <span style={{ color: "#0f6c57" }}>List</span>
      </Text>
      <Divider color={"#0f6c57"} />
      <Stack mt={"xl"}>
      {data.slice(0, 7).map((data) => (
          <SelectedCard
            body=""
            name={data.name}
            image={data.image1}
          />
        ))}
      </Stack>
    </Box>
  );
}

function SelectedCard({
  image,
  name,
  body,
}: {
  image: string;
  name: string;
  body: string;
}) {
  return (
    <Group align={"start"} noWrap>
      <Avatar radius={999} size={48} src={image} />
      <Box>
        <Text size={"sm"} weight={500}>
          {name}
        </Text>
        <Text size={"sm"}>{body}</Text>
      </Box>
    </Group>
  );
}
