import {
  Avatar,
  Box,
  Button,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";

import { MdOutlineVerified } from "react-icons/md";
import MintingIcon from "../../../../icons/MintingIcon";
import { ethers } from "ethers";
import { DROP_ADDRESS } from "../../../../../const";
import ABI from "../../../../../utils/ABI/ABI_Drop.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  container: {
    color: "white",
  },
  description: {
    maxWidth: 449,
  },
  verifIcon: {
    color: theme.colors["ocean-blue"][1],
  },
  input: {
    display: "flex",
    flexWrap: "nowrap",
    button: {
      color: theme.colors["ocean-blue"][3],
    },
  },
}));

const MintingDetailLeft = ({ router }) => {
  const { classes } = useStyles();
  const [nftDrop, setNftDrop] = useState(null);
  const [quantity, setQuantity] = useState(1); // State untuk jumlah yang ingin dibeli
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

  const handleBuyNft = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(DROP_ADDRESS, ABI, signer);

      const pricetotal = nftDrop.pricePerNft; // Konversi pricePerNft ke Wei

      // Menghitung nilai Ether berdasarkan quantity
      const totalValueInWei = pricetotal.mul(quantity);

      const tx = await contract.buyNft(tokenId, quantity, {
        value: totalValueInWei, // Mengatur nilai Ether yang akan dikirimkan bersamaan dengan transaksi
      });


      // Tunggu hingga transaksi berhasil
      await tx.wait();

      // Transaksi berhasil, tambahkan log atau notifikasi ke pengguna
      showNotification({ message: "You successfully bought the NFT Article"})
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // Anda dapat menambahkan notifikasi atau tindakan lain untuk memberi tahu pengguna tentang pembelian yang sukses
    } catch (error) {
      console.error("Error buying NFT:", error);
      // Handle kesalahan saat pembelian NFT
    }
  };

  if (!nftDrop) {
    return <div>Loading...</div>;
  }

  return (
    <Stack className={classes.container}>
      <Title>{nftDrop.name}</Title>
      <Group>
        <Avatar radius="xl" />
        <Text>{nftDrop.artistName}</Text>
        <MdOutlineVerified className={classes.verifIcon} size={24} />
      </Group>
      <Text className={classes.description}>{nftDrop.description}</Text>

      <Group>
        <Text>Price : </Text>
        <Text color="ocean-blue.1">
          {parseFloat(ethers.utils.formatUnits(nftDrop.pricePerNft, "ether")).toFixed(0)} BTT
        </Text>
      </Group>
      <Group>
        <Text>Stock : </Text>
        <Text color="red">
          {parseInt(nftDrop.totalSupply)} item left
        </Text>
      </Group>

      <Box className={classes.input}>
      <TextInput
        icon={<MintingIcon />}
        placeholder="Quantity"
        type="number"
        min={1}
        value={quantity.toString()} // Mengonversi quantity ke string
        onChange={(e) => setQuantity(Number(e.target.value))} // Mengonversi nilai input ke number
      />

        <Button ml="-2.5rem" onClick={handleBuyNft}>
          Mint Now
        </Button>
      </Box>
    </Stack>
  );
};

export default MintingDetailLeft;
