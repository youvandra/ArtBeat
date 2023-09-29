import {
    Box,
    Button,
    Center,
    Container,
    createStyles,
    Group,
    Image,
    Input,
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
  import { useForm } from "@mantine/form";
  
  import { showNotification } from "@mantine/notifications";
  import { ethers } from "ethers";
  import { GetServerSideProps } from "next";
  import { useRouter } from "next/router";
  import { getServerAuthSession } from "../server/common/get-server-auth-session";
  import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
  import { NextPageWithLayout } from "./_app";
  import WithAppshell from "../layout/WithAppshell";
  import { Styles } from "../const";
  import { AUCTION_ADDRESS } from '../const';
  import { getGlobalState, setGlobalState, useGlobalState } from '../utils/auction/store/index';
  import { createNftItem  } from '../utils/auction/services/blockchain';
  import { useEffect, useState } from "react";
  import { DROP_ADDRESS } from "../const";
  import ABI from "../utils/ABI/ABI_Drop.json"
  
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
  
  const CreateDrop = () => {
    const [boxModal] = useGlobalState('boxModal')
    const { classes } = useStyles();
    const [name, setName] = useState('')
    const [artistName, setArtistName] = useState('')
    const [description, setDescription] = useState('')
    const [totalSupply, setTotalSupply] = useState('')
    const [pricePerNft, setPrice] = useState('')
    const [tokenURI, setFileUrl] = useState('')
    const [image1, setImg1] = useState('')
    const [image2, setImg2] = useState('')
    const [image3, setImg3] = useState('')
    const [image4, setImg4] = useState('')
    const [image5, setImg5] = useState('')
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
  
      const nftItemData = {
        name: name,
        artistName: artistName,
        description: description,
        totalSupply: totalSupply,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        tokenURI: tokenURI,
        pricePerNft: pricePerNft, 
      };

      try {
       
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(DROP_ADDRESS, ABI, signer);
  
        const transaction = await contract.createNftDrop(
          name,
          artistName,
          description,
          totalSupply,
          ethers.utils.parseEther(pricePerNft), 
          tokenURI,
          image1,
          image2,
          image3,
          image4,
          image5
        );
  
        await transaction.wait();
  
        showNotification({
          title: "NFT Drop Created",
          message: "Your NFT drop has been created successfully!",
          color: "green",
        });
  
        resetForm();
      } catch (error) {
        console.error("Error creating NFT drop:", error);
  
        showNotification({
          title: "Error",
          message: "An error occurred while creating the NFT drop.",
          color: "red",
        });
      }
      
      
    }
    const closeModal = () => {
      setGlobalState('boxModal', 'scale-0')
      resetForm()
    }
  
    const resetForm = () => {
      setName('')
      setImg1('')
      setImg2('')
      setImg3('')
      setImg4('')
      setImg5('')
      setFileUrl('')
      setPrice('')
      setArtistName('')
      setDescription('')
      setTotalSupply('')
    }
  
  
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
                <Title>List Drop</Title>
              </Stack>
            </Center>
            <Center>
              <Paper className={classes.container} shadow={"lg"} radius="lg">
                <Container p={24}>
                  <form onSubmit={handleSubmit}
                  >
                    <Stack spacing={"xl"}>
                      <TextInput
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        size="md"
                        label="Title"
                        required
                      />
                      <TextInput
                        onChange={(e) => setArtistName(e.target.value)}
                        value={artistName}
                        type="text"
                        size="md"
                        label="Brand / Artist Name"
                        required
                      />
                      <Textarea
                        
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        size="md"
                        label="Description"
                        minRows={3}
                        required
                      />
                      <TextInput
                        
                        step={0.01}
                        min={0.01}
                        onChange={(e) => setTotalSupply(e.target.value)}
                        value={totalSupply}
                        type="number"
                        size="md"
                        label="Total Supply"
                        required
                      />
                      <TextInput
                        step={0.01}
                        min={0.01}
                        placeholder="Price (BTT)"
                        onChange={(e) => setPrice(e.target.value)}
                        value={pricePerNft}
                        type="number"
                        size="md"
                        label="Price"
                        required
                      />
                      <TextInput
                        
                        onChange={(e) => setFileUrl(e.target.value)}
                        value={tokenURI}
                        type="text"
                        size="md"
                        label="NFT Token URI"
                        required
                      />
                      <TextInput
                        
                        onChange={(e) => setImg1(e.target.value)}
                        value={image1}
                        type="text"
                        size="md"
                        label="Main Image"
                        required
                      />
                      <TextInput
                        
                        onChange={(e) => setImg2(e.target.value)}
                        value={image2}
                        type="text"
                        size="md"
                        label="Image 2"
                        required
                      />
                      <TextInput
                        
                        onChange={(e) => setImg3(e.target.value)}
                        value={image3}
                        type="text"
                        size="md"
                        label="Image 3"
                        required
                      />
                      <TextInput
                        
                        onChange={(e) => setImg4(e.target.value)}
                        value={image4}
                        type="text"
                        size="md"
                        label="Image 4"
                        required
                      />
                      <TextInput
                        
                        onChange={(e) => setImg5(e.target.value)}
                        value={image5}
                        type="text"
                        size="md"
                        label="Image 5"
                        required
                      />
                      
                      
  
                      <Button
                        mt={"xl"}
                        type="submit"
                        color={"brand"}
                      >
                        List Drop
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
  
  CreateDrop.getLayout = (page: React.ReactNode) => (
    <WithAppshell headerTransparent>{page}</WithAppshell>
  );
  
  export default CreateDrop;
  
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
  