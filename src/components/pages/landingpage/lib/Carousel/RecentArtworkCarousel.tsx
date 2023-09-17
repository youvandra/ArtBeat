import { useMantineTheme } from "@mantine/core";

import { Carousel, CarouselProps } from "@mantine/carousel";

import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function RecentArtworkCarousel({
  children,
  styles,
  ...props
}: {
  children: React.ReactNode;
} & CarouselProps) {
  const theme = useMantineTheme();

  return (
    <Carousel
      controlsOffset="xs"
      slideSize="60"
      slideGap={90}
      controlSize={40}
      slidesToScroll={2}
      styles={{
        control: {
          border: "none",
          backgroundColor: theme.colors["ocean-blue"][1],
          "&[data-inactive]": {
            backgroundColor: "transparent",
            border: `1px solid ${theme.colors["ocean-blue"][1]}`,
            color: theme.colors["ocean-blue"][1],
          },
        },
        indicators: {
          bottom: "-2.5rem",
        },
        indicator: {
          width: 10,
          height: 10,
        },
        viewport: {
          width: "calc(100% - 8rem)",
          margin: "0 auto",
        },
        ...styles,
      }}
      align="start"
      nextControlIcon={<MdArrowForward size="1.25em" />}
      previousControlIcon={<MdArrowBack size="1.25em" />}
      // loop
      withIndicators
      dragFree
      {...props}
    >
      {children}
    </Carousel>
  );
}
