export const THEME_TYPES = {
  COLOR_CHANGE: "COLOR_CHANGE",
  MODE_CHANGE: "MODE_CHANGE",
  FONT_CHANGE: "FONT_CHANGE",
  BORDER_RADIUS_CHANGE: "BORDER_RADIUS_CHANGE",
  FONT_SIZE_CHANGE: "FONT_SIZE_CHANGE"
};

export const previousTheme = () => async (dispatch) => {
  const mode = localStorage.getItem("palettemode");
  const color = localStorage.getItem("palettecolor");
  const font = localStorage.getItem("palettefont");
  const borderradius = localStorage.getItem("paletteborderradius");
  const fontsize = localStorage.getItem("palettefontsize");

  if (mode || color || font || borderradius || fontsize) {
    if (mode === "light" || mode === "dark")
      dispatch({ type: THEME_TYPES.MODE_CHANGE, payload: mode });

    if (color === "blue" || color === "green" || color === "red" || color === "yellow" || color === "purple" || color === "orange") {
      dispatch({ type: THEME_TYPES.COLOR_CHANGE, payload: color });
    }

    if (font === "roboto" || font === "ubuntu" || font === "chakrapetch" || font === "lobster" || font === "sansita")
      dispatch({ type: THEME_TYPES.FONT_CHANGE, payload: font });

    if (borderradius)
      dispatch({ type: THEME_TYPES.BORDER_RADIUS_CHANGE, payload: borderradius });

    if (fontsize)
      dispatch({ type: THEME_TYPES.FONT_SIZE_CHANGE, payload: fontsize });
  }
};
