import { TextInput, useMantineTheme } from "@mantine/core";
import { MdSearch } from "react-icons/md";

export default function SearchInput() {
  const theme = useMantineTheme();

  return (
    <TextInput
      variant="unstyled"
      styles={{
        wrapper: {
          maxWidth: 250,
          border: `1px solid ${theme.colors["ocean-blue"][0]}`,
          borderRadius: 24,
        },
        input: {
          color: "white",
          fontWeight: 500,
        },
      }}
      placeholder="Abstract Painting"
      icon={
        <MdSearch
          color="white"
          size={24}
          fill={theme.colors["ocean-blue"][0]}
        />
      }
      name="art search"
    />
  );
}
