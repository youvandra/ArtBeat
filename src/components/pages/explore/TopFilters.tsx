import { createStyles, Group, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { MdSearch } from "react-icons/md";

const useStyles = createStyles((t) => ({
  filters: {
    [t.fn.smallerThan("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
}));

export default function TopFilters({ onSearch }) {
  const { classes } = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: { target: { value: any; }; }) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };
  return (
    <Group className={classes.filters}>
      <CategorySelect />
      <TextInput
        value={searchTerm}
        onChange={handleSearchChange}
        radius={"md"}
        icon={<MdSearch color="#0f6c57" size={24} />}
        placeholder="Portrait Painting"
      />
    </Group>
  );
}

function SearchInput() {
  return (
    <TextInput
      styles={{ input: { border: "1px solid #0f6c57" } }}
      radius={"md"}
      icon={<MdSearch color="#0f6c57" size={24} />}
      placeholder="Portrait Painting"
    />
  );
}

function CategorySelect() {
  return (
    <Select
      styles={{ input: { border: "1px solid #0f6c57" } }}
      radius={"md"}
      data={["Painting", "Sculpture", "Photograph"]}
      placeholder="Category"
      rightSection={<BiChevronDown color="#0f6c57" size={24} />}
    />
  );
}
