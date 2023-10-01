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
import { NFT } from "./nft/NFTExploreCard";

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
} & NFT;

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
  ...props
}: ArtworkCardProps) => {
  const { classes } = useStyles();

  const maxLength = 30; 
  const text = String(titleProps.text); 

  const truncatedText = (text && text.length > maxLength)
  ? `${text.slice(0, maxLength)}...`
  : text;


  return (
    <Card className={classes.card} withBorder {...cardProps} sx={{ height: "100%", overflow: "hidden" }} radius={20}> 
      <NextLink href={`/artwork/${props.tokenId}`}>
        <Image
          src={props.metadata.image}
          width={300}
          height={200}
          mx="auto"
          {...imageProps}
        />
      </NextLink>
      <Stack mt="md" spacing="md">
        <Title size={20} weight={400} color="ocean-blue.4" {...titleProps}>
          {truncatedText}
        </Title>
        <Group>
          <Avatar radius="xl" {...avatarProps} />
          <Text size={16} {...artistProps}>
            {artistProps.text}
          </Text>
        </Group>
        <Group position="apart" noWrap>
          <Text {...priceProps}>Price : {parseFloat(priceProps?.text.toString()).toFixed(0) || "500"} BTT</Text>
          <Button
            component={NextLink}
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
