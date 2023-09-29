import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CHAIN_ID, CHAIN_PARAMS } from "../const";
import { setGlobalState } from '../utils/auction/store/index';
import { truncate, useGlobalState } from '../utils/auction/store'

export default function ConnectWallet() {
  const router = useRouter();
  const { status, connect, addChain, chainId, switchChain, account } = useMetaMask();
  const [account_wallet, setWallet] = useState('');

  const handleConnect = async () => {
    try {
      await connect();
      router.reload()
    } catch (error) {
      showNotification({
        message: "Failed to connect with MetaMask",
        color: "red",
      });
    }
  };

  const handleNetworkChange = async () => {
    try {
      await switchChain(CHAIN_ID);
      router.reload();
    } catch (error) {
      if (error.code === 4902) {
        await addChain(CHAIN_PARAMS);
        await switchChain(CHAIN_ID);
        router.reload();
      } else {
        showNotification({
          message: "Failed to change network",
          color: "red",
        });
      }
    }
  };

  useEffect(() => {
    if (status === "notConnected") {
      showNotification({
        message: "Please connect your wallet to access all data",
        color: "red",
        autoClose: false,
      });
    } else if (status === "unavailable") {
      showNotification({
        message: "No wallet detected!",
        color: "red",
        autoClose: false,
      });
    } else if (status === "connected") {
      setWallet(account.toLowerCase());
    }
  }, [status, account]);

  useEffect(() => {
    if (status === "connected" && chainId !== CHAIN_ID) {
      handleNetworkChange();
      showNotification({ message: "Wrong network!", color: "red" });
    }
  }, [status, chainId]);

  console.log(account_wallet);
  return (
    <>
      {status === 'initializing' || status === 'notConnected' ? (
        <Button
          onClick={handleConnect}
          variant="white"
          color="dark"
          radius="xl"
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          variant="white"
          color="dark"
          radius="xl"
        >
          {truncate(account_wallet, 4, 4, 11)}
        </Button>
      )}
    </>
  );
}
