import { Button, ButtonProps, createStyles } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { NextLinkProps } from "@mantine/next/lib/NextLink";

import { AiOutlineArrowLeft } from "react-icons/ai";

const useStyles = createStyles({
  buttonBack: {
    ":hover": {
      backgroundColor: "transparent",
    },
  },
});

type ButtonBackProps = ButtonProps & NextLinkProps;

const ButtonBack = (props: ButtonBackProps) => {
  const { classes } = useStyles();

  return (
    <Button
      component={NextLink}
      className={classes.buttonBack}
      variant="subtle"
      leftIcon={<AiOutlineArrowLeft size={30} />}
      px={2}
      {...props}
    >
      Back
    </Button>
  );
};

export default ButtonBack;
