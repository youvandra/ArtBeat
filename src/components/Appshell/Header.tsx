import {
  Group,
  Header as H,
  createStyles,
  Text,
  Box,
  Image,
  Burger,
  Drawer,
  Stack,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import ConnectWallet from "../ConnectWallet";
import MainUserButton from "../MainUserButton/MainUserButton";

const useStyles = createStyles((theme, { transparent }: HeaderProps) => ({
  header: {
    backgroundColor: transparent
      ? "transparent"
      : theme.colors["ocean-blue"][3],
    position: "relative",
    height: "auto",
    maxHeight: "fit-content",
  },
  onBig: { [theme.fn.smallerThan("sm")]: { display: "none" } },
  onSmall: { [theme.fn.largerThan("sm")]: { display: "none" } },
}));

type HeaderProps = {
  transparent: boolean;
};

export default function Header(props: HeaderProps) {
  const { classes } = useStyles(props);
  const router = useRouter();
  const [opened, { close, open, toggle }] = useDisclosure(false);

  useEffect(() => {
    close();
  }, [router.pathname]);

  const isActiveRoute = useCallback(
    (item: NavItemType) => {
      const HOME = "Home";

      if (router.pathname == "/" && item.label == HOME) {
        return true;
      }

      if (router.pathname.startsWith(item.link) && item.label != HOME) {
        return true;
      }

      return false;
    },
    [router.pathname]
  );

  return (
    <H
      className={classes.header}
      withBorder={false}
      py={"md"}
      px="xl"
      height={0}
    >
      {opened && (
        <Drawer
          size={"full"}
          position="right"
          opened={opened}
          onClose={close}
          padding="md"
        >
          <Stack align={"start"}>
            <MainUserButton color="#111" />
            {LINKS.map((props, i) => (
              <DrawerLink
                onClick={() => {
                  close();
                }}
                isActive={isActiveRoute(props)}
                key={i}
                {...props}
              />
            ))}
          </Stack>
        </Drawer>
      )}
      <Container size="xl">
        <Group position="apart">
          <NextLink href={"/"}>
            <Image width={39} height={52} src={"/Logo.png"} />
          </NextLink>
          <Group className={classes.onBig} spacing={40}>
            {LINKS.map((props, i) => (
              <Navitem isActive={isActiveRoute(props)} key={i} {...props} />
            ))}
          </Group>
          <Group spacing={"xl"}>
            <ConnectWallet />
            <Box className={classes.onBig}>
              <MainUserButton />
            </Box>
            <Burger
              color="white"
              opened={opened}
              onClick={() => {
                toggle();
              }}
              className={classes.onSmall}
            />
          </Group>
        </Group>
      </Container>
    </H>
  );
}

function Navitem({
  label,
  link,
  isActive = false,
}: NavItemType & { isActive?: boolean }) {
  return (
    <Box sx={{ position: "relative", color: "white" }}>
      <Text component={NextLink} href={link}>
        {label}
      </Text>
      {isActive && (
        <Box
          sx={(theme) => ({
            height: 2,
            width: "70%",
            backgroundColor: theme.colors["ocean-blue"][0],
            position: "absolute",
            right: 0,
          })}
        />
      )}
    </Box>
  );
}

function DrawerLink({
  label,
  link,
  isActive = false,
  onClick,
}: NavItemType & { isActive?: boolean; onClick: () => void }) {
  const theme = useMantineTheme();

  return (
    <Box sx={{ position: "relative", color: "#111" }}>
      <Text
        weight={600}
        onClick={onClick}
        size={"xl"}
        component={NextLink}
        href={link}
      >
        {label}
      </Text>
      {isActive && (
        <Box
          sx={{
            height: 2,
            width: "70%",
            backgroundColor: theme.colors["ocean-blue"][0],
            position: "absolute",
            left: 0,
          }}
        />
      )}
    </Box>
  );
}

interface NavItemType {
  label: string;
  link: string;
}

const LINKS: NavItemType[] = [
  { label: "Home", link: "/" },
  { label: "Artist", link: "/artist" },
  { label: "Event", link: "/event" },
  { label: "Museum", link: "/museum" },
  { label: "Explore", link: "/explore" },
  { label: "Minting", link: "/minting" },
  { label: "Auction", link: "/auction/4" },
];
