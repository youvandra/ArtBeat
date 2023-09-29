import { Image, Stack } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import RecentArtworkCarousel from "../../../landingpage/lib/Carousel/RecentArtworkCarousel";
import { ethers } from "ethers";
import { DROP_ADDRESS } from "../../../../../const";
import ABI from "../../../../../utils/ABI/ABI_Drop.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MintingDetailRight = () => {
  const router = useRouter();
  const [nftDrop, setNftDrop] = useState(null);
  const tokenId = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(DROP_ADDRESS, ABI, signer);
        const drop = await contract.nftDrops(tokenId);

        setNftDrop(drop);
      } catch (error) {
        console.error("Error fetching NFT Drop:", error);
      }
    };

    if (tokenId) {
      fetchData();
    }
  }, [tokenId]);
  console.log(tokenId)
  if (!nftDrop) {
    return <div>Loading...</div>;
  }

  return (
    <Stack>
      <Image
        radius="md"
        src={nftDrop.image1}
        width={542}
        height={409}
        alt="NFT Image"
        style={{ marginLeft: 'auto', marginRight: 45 }}
      />

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
          <Image radius="md" width={170} height={151} src={nftDrop.image2} />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image radius="md" width={170} height={151} src={nftDrop.image3} />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image radius="md" width={170} height={151} src={nftDrop.image4} />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image radius="md" width={170} height={151} src={nftDrop.image5} />
        </Carousel.Slide>
      </RecentArtworkCarousel>
    </Stack>
  );
};

export default MintingDetailRight;
