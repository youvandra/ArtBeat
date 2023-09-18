import { ReactNode } from "react";
import {
  Avatar,
  AvatarProps,
  Button,
  ButtonProps,
  Card,
  CardProps,
  Group,
  Image,
  ImageProps,
  Stack,
  Text,
  TextProps,
  Title,
  TitleProps,
  createStyles,
} from "@mantine/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NextLink } from "@mantine/next";
import { NextLinkProps } from "@mantine/next/lib/NextLink";

type TextValue = {
  text?: ReactNode;
};

type ArtworkCardProps = {
  cardProps?: CardProps;
  imageProps?: ImageProps;
  titleProps?: Omit<TitleProps, "children"> & TextValue;
  avatarProps?: AvatarProps;
  artistProps?: Omit<TextProps, "children"> & TextValue;
  priceProps?: Omit<TextProps, "children"> & TextValue;
  buttonProps?: Omit<ButtonProps, "children"> & NextLinkProps & TextValue;
};

const useStyles = createStyles((theme) => ({
  card: {
    border: `1px solid ${theme.colors["ocean-blue"][0]}`,
  },
}));

const ArtworkCard = ({
  cardProps,
  imageProps,
  titleProps,
  avatarProps,
  artistProps,
  priceProps,
  buttonProps,
}: ArtworkCardProps) => {
  const { classes } = useStyles();

  return (
    <Card className={classes.card} withBorder {...cardProps}>
      <Image
        src="https://www.placehold.co/270x180"
        width={270}
        height={180}
        mx="auto"
        {...imageProps}
      />
      <Stack mt="md" spacing="md">
        <Title size={20} weight={400} color="ocean-blue.4" {...titleProps}>
          {titleProps.text}
        </Title>
        <Group>
          <Avatar radius="xl" {...avatarProps} />
          <Text size={16} {...artistProps}>
            {artistProps.text}
          </Text>
        </Group>
        <Group position="apart">
          <Text {...priceProps}>Price : {priceProps?.text || "500"} BTT</Text>
          <Button
            component={NextLink}
            variant="subtle"
            color="ocean-blue"
            rightIcon={<AiOutlineArrowRight />}
            href="/"
            {...buttonProps}
          >
            {buttonProps?.text || "See Details"}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default ArtworkCard;
