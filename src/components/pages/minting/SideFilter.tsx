import { ChangeEvent, useState } from "react";
import {
  Accordion,
  Card,
  Checkbox,
  NumberInput,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    minHeight: 342,
    [theme.fn.largerThan("md")]: {
      maxWidth: 263,
    },
  },
  checkbox: {
    div: {
      color: theme.colors["ocean-blue"][8],
    },
  },
  accordionItem: {
    borderBottom: "none",
  },
  input: {
    color: theme.colors["ocean-blue"][0],
    ".mantine-emotion-Input-rightSection": {
      display: "none",
    },
    label: {
      fontWeight: 400,
    },
  },
}));

const checkboxes = [
  { id: 1, label: "Shirt", checked: false },
  { id: 2, label: "Shoe", checked: true },
];

const SideFilter = () => {
  const { classes } = useStyles();

  const [_checkboxes, _setCheckboxes] = useState(checkboxes);

  const toggleCheck = (id: number) => {
    _setCheckboxes((prevCheckboxes) => {
      const index = prevCheckboxes.findIndex((checkbox) => checkbox.id === id);

      if (index !== -1) {
        return [
          ...prevCheckboxes.slice(0, index),
          { ...prevCheckboxes[index], checked: !prevCheckboxes[index].checked },
          ...prevCheckboxes.slice(index + 1),
        ];
      }

      return prevCheckboxes;
    });
  };

  return (
    <Card className={classes.card} withBorder>
      <Stack className={classes.checkbox}>
        <Stack>
          <Text>Category</Text>
          {_checkboxes.map(({ id, ...checkbox }) => (
            <Checkbox
              key={id}
              {...checkbox}
              ml="2rem"
              checked={checkbox.checked}
              onChange={() => toggleCheck(id)}
            />
          ))}
        </Stack>
        <Accordion defaultValue="price">
          <Accordion.Item className={classes.accordionItem} value="price">
            <Accordion.Control>Price</Accordion.Control>
            <Accordion.Panel>
              <NumberInput
                ml="2rem"
                className={classes.input}
                label="From"
                type="number"
                placeholder="120000"
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
              <NumberInput
                ml="2rem"
                className={classes.input}
                label="To"
                type="number"
                placeholder="330000"
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Card>
  );
};

export default SideFilter;
