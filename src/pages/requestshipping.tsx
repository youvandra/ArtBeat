import {
    Box,
    Button,
    Center,
    Container,
    createStyles,
    Group,
    Image,
    Input,
    Loader,
    Overlay,
    Paper,
    PasswordInput,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
  } from "@mantine/core";
  import { GetServerSideProps } from "next";
  import { getServerAuthSession } from "../server/common/get-server-auth-session";
  import WithAppshell from "../layout/WithAppshell";
  import { Styles } from "../const";
  import { ReactNode, useEffect, useState } from "react";
  import { useMetaMask } from "metamask-react";
import { getMyNFTs } from "../utils/getMyNFTs";
import { showNotification } from "@mantine/notifications";
import { trpc } from "../utils/trpc";
import { NFT } from "../components/EventCard";
  
  const useStyles = createStyles((t) => ({
    banner: {
      width: "100%",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1566054757965-8c4085344c96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80')",
      height: 350,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "50%",
      position: "relative",
      marginTop: `-${Styles.PULL_IMG_COVER}px`,
    },
    container: {
      maxWidth: 700,
      width: 700,
      [t.fn.smallerThan("md")]: {
        width: "100%",
        marginLeft: 16,
        marginRight: 16,
      },
      marginTop: t.spacing.xl * 2,
      zIndex: 1,
    },
  }));
  
  const RequestShip = () => {
    const { classes } = useStyles();
    const { data } = trpc.auth.getSession.useQuery();
    const [nfts, setNfts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const { account } = useMetaMask();
    
  useEffect(() => {
    setIsFetching(true);
    getMyNFTs()
      .then((n) => {
        setNfts(n);
      })
      .catch(() => {
        showNotification({
          message: "there was a problem fetching the NFTs",
          color: "red",
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

    return (
      <Box sx={{ backgroundColor: "white" }} mb={96}>
        <Box className={classes.banner}>
          <Overlay color={"#111"} zIndex={1} opacity={0.75} />
        </Box>
  
        <Box>
          <Box mt={-200}>
            <Center>
              <Stack
                sx={{ color: "white", zIndex: 1 }}
                align={"center"}
                justify={"center"}
              >
                <Title>Request Shipping</Title>
              </Stack>
            </Center>
            <Center>
              <Paper className={classes.container} shadow={"lg"} radius="lg">
                <Container p={24}>
                  <form 
                  >
                    <Stack spacing={"xl"}>
                      <TextInput
                        type="text"
                        size="md"
                        label="Wallet Address"
                        required
                        disabled
                        value={account}
                      />
                      <TextInput
                        type="text"
                        size="md"
                        label="Art Name"
                        required
                      />

                      <TextInput
                        type="text"
                        size="md"
                        label="NFT Token"
                        required
                      />

                      <TextInput
                        type="text"
                        size="md"
                        label="Recipient Name"
                        required
                      />
                      <Textarea
                        size="md"
                        label="Shipping Address"
                        minRows={3}
                        required
                      />
  
                      <Button
                        mt={"xl"}
                        type="submit"
                        color={"brand"}
                      >
                        Request Shipping
                      </Button>
                    </Stack>
                  </form>
                </Container>
              </Paper>
            </Center>
          </Box>
        </Box>
      </Box>
    );
  };
  
  RequestShip.getLayout = (page: React.ReactNode) => (
    <WithAppshell headerTransparent>{page}</WithAppshell>
  );
  
  export default RequestShip;
  
  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    //if not admin redirect
    // @ts-ignore
    if (session?.user?.role !== "admin")
      return {
        redirect: { destination: "/", permanent: false },
        props: {},
      };
    return { props: {} };
  };
  