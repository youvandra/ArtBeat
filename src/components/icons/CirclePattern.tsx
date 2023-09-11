import { Box, BoxProps } from "@mantine/core";

const CirclePattern = (props: BoxProps) => {
  return (
    <Box<"svg">
      component="svg"
      width="338"
      height="327"
      viewBox="0 0 338 327"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M218.672 1C313.266 1 336.867 117.836 336.867 212.43C336.867 276.559 282.8 326.428 218.672 326.428C122.713 326.428 1 308.388 1 212.43C1 93.9245 100.166 1 218.672 1Z"
        stroke="#EF4444"
      />
    </Box>
  );
};

export default CirclePattern;
