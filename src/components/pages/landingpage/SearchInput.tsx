import { TextInput } from "@mantine/core";
import { MdSearch } from "react-icons/md";

export default function SearchInput() {
  return (
    <TextInput
      variant="unstyled"
      styles={{
        wrapper: {
          maxWidth: 250,
          border: "1px solid #84A98C",
          borderRadius: 24,
        },
        input: { color: "white" },
      }}
      placeholder="Abstarct Painting"
      icon={<MdSearch color="#84A98C" size={24} />}
      name="art search"
    />
  );
}
