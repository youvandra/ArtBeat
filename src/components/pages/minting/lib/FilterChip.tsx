import { Group, Text, createStyles } from "@mantine/core";

import { IoMdClose } from "react-icons/io";

const useStyles = createStyles((theme) => ({
  container: {
    padding: "5px",
    border: `1px solid ${theme.colors["ocean-blue"][0]}`,
    borderRadius: 10,
  },
  icon: {
    cursor: "pointer",
  },
}));

export type Filter = {
  id: number;
  value: string;
};

type FilterChipProps = {
  onClick: () => void;
} & Filter;

const FilterChip = (props: FilterChipProps) => {
  const { classes } = useStyles();

  return (
    <Group className={classes.container} spacing="lg">
      <Text size={14}>{props.value}</Text>
      <IoMdClose className={classes.icon} onClick={props.onClick} />
    </Group>
  );
};

export default FilterChip;
