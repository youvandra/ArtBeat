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
      <Text>Applied Filters: </Text>
      {chips.map((chip) => (
        <FilterChip
          key={chip.id}
          {...chip}
          onClick={() =>
            setChips((state) => state.filter((_chip) => _chip.id != chip.id))
          }
        />
      ))}
      <TextInput radius="xl" icon={<HiSearch />} {...props.textInput} />
    </Group>
  );
};

export default UpsideFilter;
