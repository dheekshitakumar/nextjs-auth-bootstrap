import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";

const basic = {
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 600,
    bold: 700,
  },
  colors: {
    brand: {
      100: "#F5F8FF",
    },
  },
};
const overrides = {
  styles,
  ...basic,
};

export const theme = extendTheme({ overrides, breakpoints });
