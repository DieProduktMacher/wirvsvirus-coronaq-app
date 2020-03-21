import { PaletteType } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import { Overrides } from "@material-ui/core/styles/overrides";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    status: {
      success: string;
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      success?: string;
    };
  }
}

interface ThemeSettings {
  palette?: PaletteOptions;
  overrides?: Overrides;
  typography?: TypographyOptions;
}

const status = {
  status: {
    success: "#2b8c78",
    danger: "#ffc210"
  }
};

const paletteType: PaletteType = "light";
const palette: PaletteOptions = {
  common: {
    white: "#ffffff"
  },
  primary: {
    main: "#A60063",
    light: "#24A1DF",
    dark: "#00325a"
  },
  secondary: {
    light: "#ff7076",
    main: "#f73340"
  },
  grey: {
    50: "#f2f2f2",
    500: "#cccccc",
    700: "#999999",
    900: "#333333"
  },
  text: {
    primary: "#333333",
    secondary: "#999999"
  },
  type: paletteType
};

const overrides: Overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        backgroundColor: "#f6f6fb"
      }
    }
  },
  MuiButton: {
    outlined: {
      borderColor: palette.grey![700],
      color: palette.grey![700]
    },
    containedPrimary: {
      color: "white"
    },
    label: {
      fontWeight: 200
    },
    root: {
      textTransform: "none"
    }
  },
  MuiStepIcon: {
    text: {
      fill: "white"
    }
  },
  MuiTableCell: {
    root: {
      fontSize: 16
    },
    head: {
      fontSize: 14
    }
  }
};

const typography = {
  fontFamily: ['"Karla"', "Helvetica", "Roboto", "sans-serif"].join(","),
  useNextVariants: true,
  htmlFontSize: 16,
  fontSize: 16,
  body1: {
    fontSize: 16,
    lineHeight: 1.33
  },
  body2: {
    fontSize: 14,
    lineHeight: 1.33
  },
  h1: {
    fontSize: 50,
    lineHeight: 1.33
  },
  h2: {
    fontSize: 32,
    lineHeight: 1.33
  },
  h3: {
    fontSize: 24,
    lineHeight: 1.33
  },
  h4: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.33
  },
  h5: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.33
  }
};
const defaultSettings: ThemeSettings = {
  overrides,
  palette,
  typography
};

export default function createTheme(settings = defaultSettings) {
  return createMuiTheme({ ...settings, ...status });
}
