import { Box, BoxProps } from "@mantine/core";

const CircleCurlPattern = (props: BoxProps) => {
  return (
    <Box<"svg">
      component="svg"
      width="318"
      height="423"
      viewBox="0 0 318 423"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.3426 7.31978C135.355 0.734228 185.008 -6.73765 224.825 19.1378C272.658 50.2221 320.654 98.8128 316.78 155.771C312.975 211.728 244.377 232.828 207.425 274.985C165.201 323.155 150.571 401.338 88.3426 416.381C19.0928 433.12 -71.1968 412.798 -106.555 350.884C-140.999 290.571 -80.9504 222.156 -60.4871 155.771C-48.9691 118.405 -42.3044 80.2816 -14.6336 52.6811C12.9834 25.1344 49.7335 12.7281 88.3426 7.31978Z"
        stroke="#EF4444"
      />
    </Box>
  );
};

export default CircleCurlPattern;
