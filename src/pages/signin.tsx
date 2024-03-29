import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { NextPageWithLayout } from "./_app";
import WithAppshell from "../layout/WithAppshell";
import { Styles } from "../const";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/signup-banner.png')",
    height: 350,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginTop: `-${Styles.PULL_IMG_COVER}px`,
  },
  container: {
    width: 700,
    marginTop: t.spacing.xl * 2,
  },
}));

const SignIn: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (v) => (v === "" ? "Email is required!" : null),
      password: (v) => (v === "" ? "Password is required!" : null),
    },
  });

  return (
    <Box sx={{ backgroundColor: "white" }} pb={120}>
      <Box className={classes.banner}></Box>

      <Box>
        <Box mt={-200}>
          <Center>
            <Stack sx={{ color: "white" }} align={"center"} justify={"center"}>
              <Title>Welcome to Artbeat</Title>
              <Text>input your email and password</Text>
            </Stack>
          </Center>
          <Center>
            <Paper className={classes.container} shadow={"lg"} radius="lg">
              <Container p={24}>
                <form
                  onSubmit={form.onSubmit((data) => {
                    setIsLoading(true);
                    signIn("credentials", { redirect: false, ...data })
                      .then((e) => {
                        if (e.error === "CredentialsSignin")
                          return showNotification({
                            message: "Wrong Email and password combination!",
                            color: "red",
                          });
                        router.reload();
                      })
                      .finally(() => {
                        setIsLoading(false);
                      });
                  })}
                >
                  <Stack spacing={"xl"}>
                    <TextInput
                      {...form.getInputProps("email")}
                      type="email"
                      size="md"
                      styles={inputStyles}
                      label="email"
                      color="brand"
                      placeholder="example@email.com"
                      icon={<BiEnvelope color="#0f6c57" size={24} />}
                    />

                    <PasswordInput
                      {...form.getInputProps("password")}
                      size="md"
                      styles={inputStyles}
                      label="password"
                      color="brand"
                      placeholder="Input password"
                      icon={<BiLock color="#0f6c57" size={24} />}
                    />

                    <Stack mt={"xl"}>
                      <Group position="apart">
                        <Text
                          variant="link"
                          color={"brand"}
                          component={NextLink}
                          href="/signup"
                        >
                          Sign up
                        </Text>
                        <Text
                          variant="link"
                          color={"brand"}
                          component={NextLink}
                          href="/#"
                        >
                          Forgot password ?
                        </Text>
                      </Group>
                      <Button loading={isLoading} type="submit" color={"brand"}>
                        Sign In
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Container>
            </Paper>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

SignIn.getLayout = (page) => (
  <WithAppshell headerTransparent>{page}</WithAppshell>
);

export default SignIn;

const inputStyles = (t) => ({
  input: {
    border: `1px solid #0f6c57`,

    borderRadius: t.radius.md,
  },
  root: { color: t.colors.brand[5] },
});
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session?.user)
    return {
      redirect: { destination: "/", permanent: false },
      props: {},
    };
  return { props: {} };
};
