import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import darkScrollbar from "./themeUtils/darkScrollbar";
import lightScrollbar from "./themeUtils/lightScrollbar";
import { red, blue, yellow, green, purple, orange } from '@mui/material/colors';

const colorSchemes = {
  blue: { mainColor: [blue[500], blue[900]], lightTheme: ["#edeff6", "#fff"], darkTheme: ["#010005", "#161222"] },
  red: { mainColor: [red[400], red[900]], lightTheme: ["#f6eded", "#fff"], darkTheme: ["#010005", "#161222"] },
  yellow: { mainColor: [yellow[700], yellow[900]], lightTheme: ["#f6f4ed", "#fff"], darkTheme: ["#010005", "#161222"] },
  green: { mainColor: [green[700], green[900]], lightTheme: ["#edf6ee", "#fff"], darkTheme: ["#010005", "#161222"] },
  purple: { mainColor: ["#6B4AE0", purple[900]], lightTheme: ["#f1edf6", "#fff"], darkTheme: ["#010005", "#161222"] },
  orange: { mainColor: [orange[500], orange[900]], lightTheme: ["#f6f0ed", "#fff"], darkTheme: ["#010005", "#161222"] },
};

const fontSchemes = {
  roboto: "'Roboto', sans-serif",
  ubuntu: "'Ubuntu', sans-serif",
  chakrapetch: "'Chakra Petch', sans-serif",
  sansita: "'Sansita', sans-serif",
  lobster: "'Lobster Two', cursive",
};

const theme = (mode, color, font, borderradius, fontsize) => {
  return createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: mode === "light" ? lightScrollbar() : darkScrollbar(),
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: 'contained' },
            style: {
              color: "white !important",
              padding:"0.4rem 1.2rem"
            },
          },
          {
            props: { variant: 'gradient' },
            style: {
              background: `linear-gradient(45deg,${colorSchemes[color].mainColor[0]},${colorSchemes[color].mainColor[1]}) !important`,
              color: "white",
              padding:"0.4rem 1.2rem"
            },
          },
        ],
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            lineHeight: "0px !important",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            boxShadow:"none !important",
            overflow: 'visible !important',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32)) !important',
            mt: "12px !important",
            userSelect:"none",
            '&::before': {
              content: '""',
              display: 'block !important',
              position: 'absolute !important',
              top: `0px !important`,
              right: "14px !important",
              width: "10px !important",
              height: "10px !important",
              bgcolor: "background.paper !important",
              transform: 'translateY(-50%) rotate(45deg) !important',
              zIndex: 0,
            },

          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            background: colorSchemes[color].mainColor[0],
            lineHeight:0,
            padding:0,
            color: "#fff" 
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding:"0px !important"

          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            background:mode === "dark" ? colorSchemes[color].darkTheme[1] : colorSchemes[color].lightTheme[1],
          }
        }
      }

    },
    palette: {
      mode: mode,
      primary: {
        main: colorSchemes[color].mainColor[0],
      },
      secondary: {
        main: colorSchemes[color].mainColor[1],
      },
      success: {
        main: "#3dbf4c",
      },
      background: {
        default: mode === "dark" ? colorSchemes[color].darkTheme[0] : colorSchemes[color].lightTheme[0],
        paper: mode === "dark" ? colorSchemes[color].darkTheme[1] : colorSchemes[color].lightTheme[1]
      }
    },
    typography: {
      fontFamily: fontSchemes[font],
      htmlFontSize: Number(fontsize),
      button: {
        textTransform: "capitalize",
        fontWeight: 600,
      },
      h1: {
        fontSize: "4.5rem",
        fontWeight: 800,
      },
      h2: {
        fontSize: "1.2rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1rem",
        fontWeight: 700,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 700,
      },
      h5: {
        fontSize: "1.2rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: Number(borderradius),
    },
  });
};

const CustomThemeProvider = ({ children }) => {
  const Usertheme = useSelector((state) => state.theme);
  return (
    <ThemeProvider
      theme={theme(
        Usertheme.mode ? Usertheme.mode : "light",
        Usertheme.color ? Usertheme.color : "blue",
        Usertheme.font ? Usertheme.font : "roboto",
        Usertheme.borderradius ? Usertheme.borderradius : "10",
        Usertheme.fontsize ? Usertheme.fontsize : "18",
      )}
    >
      {children}
    </ThemeProvider>
  );
};
export default CustomThemeProvider;
