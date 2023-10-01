export const YOUTUBE_VIDEO = "https://www.youtube.com/embed/AhyqQeS-xj4";

export const CONTRACT_ADDRESS = "0x2886dF071280862C1e5262F0b65ce5703BF5c9d8";

export const AUCTION_ADDRESS = "0x3FB4b273d6e2D1c3f38b13Db964C6Ce7A782A697";

export const DROP_ADDRESS = "0x821207776d193ee5D17180ac5Ab963d7Af6c075b";

export const TICKET_ADDRESS = "0x02cF63F98dE1b6b449f11f24E9769d11e4a335D4";


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
