export const YOUTUBE_VIDEO = "https://www.youtube.com/embed/S18bREDCUs4?si=AsBTUOpuVJNWmCrH";

export const CONTRACT_ADDRESS = "0x406b87eC81fC161A97589844943c89303732Cef1";

export const AUCTION_ADDRESS = "0xFa8E33D5a12fC13DbF28375C2E3F4dDe91e71149";

export const DROP_ADDRESS = "0x079A07Ff8e3c501F188741687b8F548158dc29D4";

export const TICKET_ADDRESS = "0x02cF63F98dE1b6b449f11f24E9769d11e4a335D4";


export const PINATA_KEY = "e5df88edb6306b65087b";

export const PINATA_SECRET =
  "99dde5bc2aa012cf2c22fb10bcaf4cedd1d83550d5b2f95db8d8ffc8b7797d4a";

export const CHAIN_ID = "0xc7";

export const CHAIN_PARAMS = {
  chainName: "BitTorrent Chain Mainnet",
  chainId: CHAIN_ID,
  nativeCurrency: { name: "BTT", decimals: 18, symbol: "BTT" },
  rpcUrls: ["https://rpc.bt.io/"],
  blockExplorerUrls: ["https://scan.bt.io/"],
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