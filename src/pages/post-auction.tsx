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
import ABI from "../utils/ABI/ABI_Auction.json";
import { NextPageWithLayout } from "./_app";
import WithAppshell from "../layout/WithAppshell";
import { Styles } from "../const";
import { AUCTION_ADDRESS } from '../const';
import { getGlobalState, setGlobalState, useGlobalState } from '../utils/auction/store/index';
import { createNftItem  } from '../utils/auction/services/blockchain';
import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = useStyles();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [imgBase64, setImg] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (!name || !price || !description || !fileUrl) return

    const nftItemData = {
      name: name,
      description: description,
      image: imgBase64,
      metadataURI: fileUrl,
      price: price, // Harga NFT
    };
    
    // Panggil fungsi createNftItem dengan objek nftItemData
    createNftItem(nftItemData)
    .then(() => {
      // Fungsi createNftItem selesai tanpa kesalahan
      console.log("NFT item berhasil dibuat.");
      closeModal();
    })
    .catch((error) => {
      console.log(nftItemData);
      console.log(getGlobalState('connectedAccount'))
      // Terjadi kesalahan dalam createNftItem
      console.error("Terjadi kesalahan saat membuat NFT item:", error);
    });
  }
  const closeModal = () => {
    setGlobalState('boxModal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setImg('')
    setFileUrl('')
    setPrice('')
    setDescription('')
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
              <Title>List Auction</Title>
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
                      
                      onChange={(e) => setImg(e.target.value)}
                      value={imgBase64}
                      type="text"
                      size="md"
                      label="Image URL"
                      required
                    />
                    <TextInput
                      
                      onChange={(e) => setFileUrl(e.target.value)}
                      value={fileUrl}
                      type="text"
                      size="md"
                      label="Metadata URL"
                      required
                    />
                     <TextInput
                      
                      step={0.01}
                      min={0.01}
                      placeholder="Price (BTT)"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      type="number"
                      size="md"
                      label="Price"
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

                    <Button
                      mt={"xl"}
                      type="submit"
                      color={"brand"}
                    >
                      List Auction
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
