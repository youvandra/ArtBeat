import abi from '../../ABI/ABI_Auction.json';
import address from '../../ABI/contractAddress.json';
import { getGlobalState, setGlobalState } from '../store';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { showNotification } from "@mantine/notifications";

const ContractAddress = address.address;
const ContractAbi = abi;
let tx;

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

const isWalletConnected = async () => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase());

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
      await isWalletConnected();
      await loadCollections();
    });

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
    } else {
      alert('Please connect your wallet.');
      console.log('No accounts found.');
    }
  } catch (error) {
    reportError(error);
  }
};

const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
  } catch (error) {
    reportError(error);
  }
};

const createNftItem = async ({
  name,
  description,
  image,
  metadataURI,
  price,
}) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const connectedAccount = getGlobalState('connectedAccount');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    tx = await contract.createAuction(
      name,
      description,
      image,
      metadataURI,
      toWei(price),
      {
        from: connectedAccount,
        value: toWei(0.02),
      },
    );
    await tx.wait();
    await loadAuctions();
    showNotification({ message: "Create NFT successfully" });
  } catch (error) {
    showNotification({ message: "Create NFT failed", color: "red" });
  }
};

const updatePrice = async ({ tokenId, price }) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const connectedAccount = getGlobalState('connectedAccount');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    tx = await contract.changePrice(tokenId, toWei(price), {
      from: connectedAccount,
    });
    await tx.wait();
    await loadAuctions();
    showNotification({ message: "Update Price successfully" });
  } catch (error) {
    showNotification({ message: "Update Price Failed" });
  }
};

const offerItemOnMarket = async ({
  tokenId,
  biddable,
  sec,
  min,
  hour,
  day,
}) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const connectedAccount = getGlobalState('connectedAccount');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    tx = await contract.offerAuction(tokenId, biddable, sec, min, hour, day, {
      from: connectedAccount,
    });
    await tx.wait();
    await loadAuctions();
  } catch (error) {
    showNotification({ message: "Offer NFT Failed", color: "red" });
  }
};

const buyNFTItem = async ({ tokenId, price }) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const connectedAccount = getGlobalState('connectedAccount');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    tx = await contract.buyAuctionedItem(tokenId, {
      from: connectedAccount,
      value: toWei(price),
    });
    await tx.wait();
    await loadAuctions();
    await loadAuction(tokenId);
    showNotification({ message: "Buy NFT successfully" });
  } catch (error) {
    showNotification({ message: "Can't buy NFT", color: "red"});
  }
};

const bidOnNFT = async ({ tokenId, price }) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const connectedAccount = getGlobalState('connectedAccount');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    tx = await contract.placeBid(tokenId, {
      from: connectedAccount,
      value: toWei(price),
    });
    await tx.wait();
    await getBidders(tokenId);
    await loadAuction(tokenId);
    showNotification({ message: "Your bid on the NFT was successful!" });
    setTimeout(() => {
      window.location.reload(); // Memuat ulang halaman setelah 3 detik
    }, 3000);
  } catch (error) {
    showNotification({ message: "Your bid is lower than the current bid", color: "red"});
  }
};

const claimPrize = async ({ tokenId, id }) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const connectedAccount = getGlobalState('connectedAccount');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    tx = await contract.claimPrize(tokenId, id, {
      from: connectedAccount,
    });
    await tx.wait();
    await getBidders(tokenId);
    showNotification({ message: "Claim Prize successfully" });
  } catch (error) {
    showNotification({ message: "Failed to claim the prize", color: "red" });
  }
};

const loadAuctions = async () => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const auctions = await contract.getLiveAuctions();
    return structuredAuctions(auctions);
  } catch (error) {
    reportError(error);
  }
};

const loadAuction = async (id) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const auction = await contract.getAuction(id);
    setGlobalState('auction', structuredAuctions([auction])[0]);
    return structuredAuctions([auction])[0];
  } catch (error) {
    reportError(error);
  }
};

const getBidders = async (id) => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const bidders = await contract.getBidders(id);
    setGlobalState('bidders', structuredBidders(bidders));
    return (structuredBidders(bidders));
  } catch (error) {
    reportError(error);
  }
};

const loadCollections = async () => {
  try {
    if (!window.ethereum) return alert('Please install Metamask');
    const connectedAccount = getGlobalState('connectedAccount');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const collections = await contract.getMyAuctions({ from: connectedAccount });
    return structuredAuctions(collections);
  } catch (error) {
    reportError(error);
  }
};

const structuredAuctions = (auctions) =>
  auctions
    .map((auction) => ({
      tokenId: auction.tokenId.toNumber(),
      owner: auction.owner.toLowerCase(),
      seller: auction.seller.toLowerCase(),
      winner: auction.winner.toLowerCase(),
      name: auction.name,
      description: auction.description,
      duration: Number(auction.duration + '000'),
      image: auction.image,
      price: fromWei(auction.price),
      biddable: auction.biddable,
      sold: auction.sold,
      live: auction.live,
    }))
    .reverse();

const structuredBidders = (bidders) =>
  bidders
    .map((bidder) => ({
      timestamp: Number(bidder.timestamp + '000'),
      bidder: bidder.bidder.toLowerCase(),
      price: fromWei(bidder.price),
      refunded: bidder.refunded,
      won: bidder.won,
    }))
    .sort((a, b) => b.price - a.price);

const reportError = (error) => {
  console.log(error.message);
  throw new Error('No ethereum object.');
};

export {
  isWalletConnected,
  connectWallet,
  createNftItem,
  loadAuctions,
  loadAuction,
  loadCollections,
  offerItemOnMarket,
  buyNFTItem,
  bidOnNFT,
  getBidders,
  claimPrize,
  updatePrice,
};
