import clsx from "clsx";

import { ThemeToken } from "../../lib/ThemeToken.ts";

import styles from "./Toggle.module.css";

export interface ToggleThemeArgs {
  hover: boolean;
  active: boolean;
  focus: boolean;
  checked: boolean;
}

export interface ToggleTheme {
  Toggle: ThemeToken<ToggleThemeArgs>;
  Input: ThemeToken<ToggleThemeArgs>;
  Switch: ThemeToken<ToggleThemeArgs>;
}

export const ToggleDefaultTheme: ToggleTheme = {
  Toggle: ({ hover, active, focus, checked }) =>
    clsx(styles.Toggle, {
      [styles.Toggle__focus]: !hover && !active && focus,
      [styles.Toggle__hover]: !active && hover,
      [styles.Toggle__active]: active,
      [styles.Toggle__unchecked]: !checked,
      [styles.Toggle__checked]: checked,
    }),

  Input: () => clsx(styles.Input),

  Switch: ({ checked }) =>
    clsx(styles.Switch, {
      [styles.Switch__unchecked]: !checked,
      [styles.Switch__checked]: checked,
    }),
};
