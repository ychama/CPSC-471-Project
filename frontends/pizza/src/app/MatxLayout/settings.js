import { createMuiTheme } from "@material-ui/core";
import { forEach, merge } from "lodash";
import layout1Settings from "./Layout1/Layout1Settings";
import themeColors from "./MatxTheme/themeColors";
import themeOptions from "./MatxTheme/themeOptions";

function createMatxThemes() {
  const themes = {};

  forEach(themeColors, (value, key) => {
    themes[key] = createMuiTheme(merge({}, themeOptions, value));
  });
  return themes;
}
const themes = createMatxThemes();

const MatxLayoutSettings = {
  activeLayout: "layout1",
  activeTheme: "pulse",
  perfectScrollbar: true,

  themes,
  layout1Settings,

  secondarySidebar: {
    show: true,
    theme: "pulse",
  },
  footer: {
    show: true,
    fixed: false,
    theme: "pulse",
  },
};

export default MatxLayoutSettings;
