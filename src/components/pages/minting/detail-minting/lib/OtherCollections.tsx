import { Space } from "@mantine/core";
import { Box, Container, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    minHeight: 500,
  },
  title: {
    borderBottom: `1px solid black`,
  },
}));

const OtherCollections = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container} mt="5rem">
      <Container pt="3rem" size="xl">
        <Title weight={400} color="ocean-blue.3" className={classes.title}>
          Christian Buehner
          <Box<"span"> component="span" ml="sm" sx={{ color: "black" }}>
            Other Collections
          </Box>
        </Title>
      </Container>
    </Box>
  );
};

export default OtherCollections;
