import { Drop } from "../components/nft/NFTExploreCard";
import ABI from "../utils/ABI/ABI_Drop.json";
import { ethers } from "ethers";
import { DROP_ADDRESS } from "../const";

// Fungsi untuk mengambil semua NFT Drops
export async function getAllDrops() {
  try {
    // Membuat Web3Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Mendapatkan signer dari provider
    const signer = provider.getSigner();

    // Membuat instance kontrak dengan ABI dan alamat yang sesuai
    const contract = new ethers.Contract(DROP_ADDRESS, ABI, signer);

    // Mengambil total ID yang ada
    const totalIds = await contract.getTotalDrops();

    // Mengambil detail dari setiap NFT Drop
    const items = await Promise.all(
      Array.from({ length: totalIds.toNumber() }, async (_, index) => {
        const nftDrop = await contract.nftDrops(index);
        return {
          tokenId: index,
          name: nftDrop.name,
          artistName: nftDrop.artistName,
          description: nftDrop.description,
          totalSupply: nftDrop.totalSupply.toString(),
          pricePerNft: nftDrop.pricePerNft.toString(),
          tokenURI: nftDrop.tokenURI,
          image1: nftDrop.image1,
          image2: nftDrop.image2,
          image3: nftDrop.image3,
          image4: nftDrop.image4,
          image5: nftDrop.image5,
        };
      })
    );

    return items;
  } catch (error) {
    console.error("Error fetching NFT Drops:", error);
    throw error;
  }
}
