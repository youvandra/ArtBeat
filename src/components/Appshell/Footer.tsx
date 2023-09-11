import {
  ActionIcon,
  Box,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { FaDiscord, FaTwitter, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const theme = useMantineTheme();

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          width: 581,
          height: 598,
          borderRadius: 999999,
          border: `5rem solid ${theme.colors["ocean-blue"][4]}`,
          position: "absolute",
          top: 0,
          right: -300,
        }}
      />

      <Container size={1760}>
        <Stack align={"start"} p={"xl"}>
          <Group align={"end"} sx={{ width: "100%" }} position="apart">
            <Stack align={"center"} spacing={0}>
              <NextLink href={"/"}>
                <Image width={98} src={"/Logo.png"} />
              </NextLink>
              <Text
                color={"white"}
                size={28}
                sx={{ fontFamily: theme.headings.fontFamily }}
              >
                ArtBeat
              </Text>
            </Stack>
          </Group>

          <Group position="apart" align="flex-end" sx={{ width: "100%" }}>
            <Text color="ocean-blue.0" size={"sm"}>
              Copyright 2022 Artbeat. All rights reserved.
            </Text>
            <Stack>
              <Group position="right" spacing={"xl"} sx={{ color: "#818181" }}>
                {SOCIALS.map(({ Icon, link }, i) => (
                  <ActionIcon
                    size={"xl"}
                    variant="transparent"
                    color={"gray"}
                    component={NextLink}
                    href={link}
                    key={i}
                  >
                    <Icon size={48} color="#CCCCCC" />
                  </ActionIcon>
                ))}
              </Group>
              <Group sx={{ position: "relative" }}>
                {LINKS.map(({ label, link }) => (
                  <Text
                    key={label}
                    color="ocean-blue.0"
                    component={NextLink}
                    href={link}
                    variant="link"
                    size={"sm"}
                  >
                    {label}
                  </Text>
                ))}
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}

const SOCIALS = [
  { Icon: FaTwitter, link: "/#" },
  { Icon: FaDiscord, link: "/#" },
  { Icon: FaTelegramPlane, link: "/#" },
];

const LINKS = [
  { label: "Terms & Conditions", link: "/#" },
  { label: "Privacy Policy", link: "/#" },
  { label: "Contact Us", link: "/#" },
];
