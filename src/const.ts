export const YOUTUBE_VIDEO = "https://www.youtube.com/embed/AhyqQeS-xj4";

export const CONTRACT_ADDRESS = "0xFf32dA47e3088e49710536570595DcCB58dfF853";

export const AUCTION_ADDRESS = "0x0bDde1bD9BEF9F34C2B0fdF03891D7F98328bD04";

export const DROP_ADDRESS = "0x5C3e5238Af1aB8d8cc953A01E3DFCd2C487Ab6cF";

export const TICKET_ADDRESS = "0x4AFC433761B25f945097723d5d605cD47A9c2ab3";


export const PINATA_KEY = "e5df88edb6306b65087b";

export const PINATA_SECRET =
  "99dde5bc2aa012cf2c22fb10bcaf4cedd1d83550d5b2f95db8d8ffc8b7797d4a";

export const CHAIN_ID = "0x405";

export const CHAIN_PARAMS = {
  chainName: "BitTorrent Chain Donau",
  chainId: CHAIN_ID,
  nativeCurrency: { name: "BTT", decimals: 18, symbol: "BTT" },
  rpcUrls: ["https://pre-rpc.bt.io/"],
  blockExplorerUrls: ["https://testnet.bttcscan.com"],
  iconUrls: ["https://static.bt.io/production/logo/1002000.png"],
};

export const Styles = {
  PULL_IMG_COVER: 84,
  TRUNCATE: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
  },
};
