import light from "./light";
import dark from "./dark";

export const themes = {
  light,
  dark,
};

export type ThemeType = keyof typeof themes;

export const getTheme = (mode: ThemeType) => {
  return themes[mode];
};

export default themes;
