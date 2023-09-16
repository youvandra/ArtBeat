import { Container, Grid } from "@mantine/core";
import MintingDetailLeft from "./lib/DetailLeft";
import MintingDetailRight from "./lib/DetailRight";
import OtherCollections from "./lib/OtherCollections";

const MintingDetails = () => {
  return (
    <div>
      <Container mt="xl" size="xl">
        <Grid mt="xl">
          <Grid.Col md={6}>
            <MintingDetailLeft />
          </Grid.Col>
          <Grid.Col md={6}>
            <MintingDetailRight />
          </Grid.Col>
        </Grid>
      </Container>
      <OtherCollections />
    </div>
  );
};

export default MintingDetails;
