import { Image, Stack } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import RecentArtworkCarousel from "../../../landingpage/lib/Carousel/RecentArtworkCarousel";

const MintingDetailRight = () => {
  return (
    <Stack>
      <Image radius="md" src="/detail-minting-1.jpg" />

      <RecentArtworkCarousel
        withIndicators={false}
        slidesToScroll={1}
        align="start"
        breakpoints={[
          { maxWidth: "md", slideSize: 120, slideGap: "xs" },
          { minWidth: "md", slideGap: "xl", slideSize: 170 },
        ]}
      >
        <Carousel.Slide>
          <Image
            radius="md"
            width={170}
            height={151}
            src="/detail-minting-2.jpg"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            radius="md"
            width={170}
            height={151}
            src="/detail-minting-3.jpg"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            radius="md"
            width={170}
            height={151}
            src="/detail-minting-2.jpg"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            radius="md"
            width={170}
            height={151}
            src="/detail-minting-3.jpg"
          />
        </Carousel.Slide>
      </RecentArtworkCarousel>
    </Stack>
  );
};

export default MintingDetailRight;
