import { SimpleGrid } from "@mantine/core";

import MintingCard, { MintingCardProps } from "./lib/MintingCard";

type MintingCardsProps = {
  mintingData: MintingCardProps[];
};

const MintingCards = (props: MintingCardsProps) => {
  return (
    <SimpleGrid
      breakpoints={[
        {
          maxWidth: "sm",
          cols: 1,
        },
        {
          minWidth: "sm",
          cols: 2,
        },
        {
          minWidth: "md",
          cols: 3,
        },
      ]}
    >
      {props.mintingData.map((data) => (
        <MintingCard key={data.id} {...data} />
      ))}
    </SimpleGrid>
  );
};

export default MintingCards;
