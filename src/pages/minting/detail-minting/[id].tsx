import { NextPageWithLayout } from "../../_app";

import WithAppshell from "../../../layout/WithAppshell";
import { Button, Container, createStyles } from "@mantine/core";
import { AiOutlineArrowLeft } from "react-icons/ai";
import MintingDetails from "../../../components/pages/minting/detail-minting/Details";
import ButtonBack from "../../../components/ButtonBack";

const useStyles = createStyles(() => ({
  container: {
    minHeight: "100vh",
  },
  buttonBack: {
    ":hover": {
      backgroundColor: "transparent",
    },
  },
}));

const DetailMinting = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Container mt="xl" size="xl">
        <ButtonBack href="/minting" />
      </Container>

      <MintingDetails />
    </div>
  );
};

const Page: NextPageWithLayout = () => {
  return <DetailMinting />;
};

Page.getLayout = (page) => <WithAppshell>{page}</WithAppshell>;

export default Page;
