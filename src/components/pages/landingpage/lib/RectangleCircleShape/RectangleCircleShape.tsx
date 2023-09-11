import { Box, DefaultProps } from "@mantine/core";
import useStyles from "./RectangleCircleShape.styles";

interface RectangleCircleShapeProps extends DefaultProps {}

const RectangleCircleShape = (props: RectangleCircleShapeProps) => {
  const { classes, cx } = useStyles();

  return (
    <Box className={classes.rectangle} {...props}>
      <Box className={classes.circle} />
    </Box>
  );
};

export default RectangleCircleShape;
