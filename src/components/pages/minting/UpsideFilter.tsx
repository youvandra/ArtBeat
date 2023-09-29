import { useState } from "react";
import { Group, Text, TextInput, TextInputProps } from "@mantine/core";
import FilterChip, { Filter } from "./lib/FilterChip";

import { HiSearch } from "react-icons/hi";

type UpsideFilterProps = {
  appliedFilters: Filter[];
  textInput?: TextInputProps;
};

const UpsideFilter = (props: UpsideFilterProps) => {
  const [chips, setChips] = useState(props.appliedFilters);

  return (
    <Group
      sx={{
        paddingTop: "3rem",
      }}
    >
      <TextInput placeholder="Search.."radius="xl" icon={<HiSearch />} {...props.textInput} />
    </Group>
  );
};

export default UpsideFilter;
