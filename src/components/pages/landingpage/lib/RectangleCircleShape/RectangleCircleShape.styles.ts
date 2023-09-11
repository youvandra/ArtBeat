import { createStyles } from "@mantine/core";

export default createStyles(() => ({
  rectangle: {
    border: "1px solid #fff",
    borderRadius: 100,
    width: 240,
    height: 390,
    position: "relative",
  },
  circle: {
    border: "1px solid #EF4444",
    borderRadius: "100%",
    width: 64,
    height: 64,
    position: "absolute",
    right: 0,
  },
}));
