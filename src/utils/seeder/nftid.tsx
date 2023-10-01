import {
    Avatar,
    Box,
    Button,
    Card,
    Center,
    Container,
    Group,
    Image,
    SimpleGrid,
    Stack,
    Title,
    createStyles,
  } from "@mantine/core";
  import { Styles } from "../../const";
  import { Text } from "@mantine/core";
  import { Carousel } from "@mantine/carousel";
  import { AiOutlineArrowRight } from "react-icons/ai";
  import { useGlobalState } from "../../utils/auction/store";
  import { useState } from "react";
  import { GetServerSideProps } from "next";
  import { getServerAuthSession } from "../../server/common/get-server-auth-session";
  import WithAppshell from "../../layout/WithAppshell";
  import RightDetailAuction from "../../components/pages/auction/RightDetail";
  import RecentArtworkCarousel from "../../components/pages/landingpage/lib/Carousel/RecentArtworkCarousel";
  
  const useStyles = createStyles((theme) => ({
    hero: {
      height: 594 + Styles.PULL_IMG_COVER,
      backgroundImage: "url(/auction-banner.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(85%)",
      marginTop: `-${Styles.PULL_IMG_COVER}px`,
    },
    heroText: {
      height: "100%",
      color: "white",
    },
    whiteContainer: {
      paddingTop: "5rem",
      paddingBottom: "5rem",
      backgroundColor: "white",
      minHeight: "100vh",
    },
    imageContainer: {
      maxWidth: 541,
      height: 409,
      backgroundColor: "#e1e1e1",
      img: {
        objectFit: "contain !important" as "contain",
      },
    },
    nextAuctionTitle: {
      borderBottom: "1px solid #e1e1e1",
      fontWeight: 400,
      [theme.fn.smallerThan("sm")]: {
        borderBottom: "1px solid #000",
      },
      span: {
        [theme.fn.largerThan("sm")]: {
          borderBottom: "1px solid #000",
        },
      },
      ".green": {
        color: theme.colors["ocean-blue"][3],
      },
    },
  }));
  
  const ListAuction = () => {
    const [boxModal] = useGlobalState('boxModal')
    const { classes } = useStyles();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [imgBase64, setImg] = useState('')
  
  
    return (
      <>
        <div className={classes.whiteContainer}>
          <Container size="xl">
            <SimpleGrid
              breakpoints={[
                { maxWidth: "md", cols: 1, spacing: "xl" },
                { minWidth: "md", cols: 2 },
              ]}
            >
              <div>
                <div className={classes.imageContainer}>
                  <Image
                    src="/detail-minting-1.jpg"
                    width="100%"
                    height={409}
                    mx="auto"
                  />
                </div>
                <RecentArtworkCarousel
                  mt="xl"
                  withIndicators={false}
                  slidesToScroll={1}
                  align="start"
                  styles={{
                    root: {
                      maxWidth: 555,
                    },
                  }}
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
              </div>
  
              <RightDetailAuction />
            </SimpleGrid>
  
            <Title className={classes.nextAuctionTitle} mt="5rem">
              <span>
                <span className="green">Next </span>Auction Items
              </span>
            </Title>
            <SimpleGrid
              mt="xl"
              breakpoints={[
                {
                  maxWidth: "sm",
                  cols: 1,
                },
                {
                  maxWidth: "md",
                  cols: 2,
                },
                {
                  minWidth: "md",
                  cols: 3,
                },
              ]}
            >
              {[...Array(5)].map((_, i) => (
                <Card key={i} withBorder>
                  <Image
                    src="https://www.placehold.co/270x180"
                    width={270}
                    height={180}
                    mx="auto"
                  />
                  <Stack mt="md" spacing="md">
                    <Title size={20} weight={400} color="ocean-blue.4">
                      Van Gogh Portrait
                    </Title>
                    <Group>
                      <Avatar radius="xl" />
                      <Text size={16}>Christian Buehner</Text>
                    </Group>
                    <Group position="apart">
                      <Text>Price : 500 BTT</Text>
                      <Button
                        variant="subtle"
                        color="ocean-blue"
                        rightIcon={<AiOutlineArrowRight />}
                      >
                        See Details
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        </div>
      </>
    );
  };
  
  ListAuction.getLayout = (page: React.ReactNode) => (
    <WithAppshell headerTransparent>{page}</WithAppshell>
  );
  
  export default ListAuction;
  
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
  
  