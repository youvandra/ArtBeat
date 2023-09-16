import { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  colorScheme: "light",
  fontFamily: "'Poppins', sans-serif",
  headings: { fontFamily: "'Libre Baskerville', serif" },
  colors: {
    brand: [
      "#C4811C",
      "#483420",
      "#875A28",
      "#DDAB46",
      "#C4811C",
      "#483420",
      "#875A28",
      "#DDAB46",
      "#C4811C",
      "#483420",
    ],
    "ocean-blue": [
      // dark
      "#84A98C",
      // light
      "#65E4A3",
      "#3fdd95",
      // main
      "#354F52",
      "#52796F",
      "#1b9871",
      "#67e4a4",
      "#0f6c57",
      "#034239",
      "#0f6c26",
    ],
    straw: ["#DDAB46"],
  },
  primaryColor: "ocean-blue",
  components: {
    Button: {
      styles: (theme, params: ButtonStylesParams) => {
        return {
          root: {
            backgroundColor:
              params.variant == "filled"
                ? theme.colors["ocean-blue"][1]
                : undefined,
            ":hover": {
              backgroundColor:
                params.variant == "filled"
                  ? theme.colors["ocean-blue"][2]
                  : undefined,
            },
          },
        };
      },
    },
    Input: {
      styles: (theme) => {
        return {
          input: {
            color: theme.colors["ocean-blue"][8],
            fontWeight: 500,
            borderColor: theme.colors["ocean-blue"][4],
            ":focus": {
              borderColor: theme.colors["ocean-blue"][8],
            },
          },
        };
      },
    },
  },
};
export default theme;
