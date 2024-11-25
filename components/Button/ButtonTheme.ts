import clsx from "clsx";

import { ThemeToken } from "../../lib/ThemeToken.ts";

import styles from "./Button.module.css";

export interface ButtonThemeArgs {
  hover: boolean;
  active: boolean;
  focus: boolean;
}

export interface ButtonTheme {
  Button: ThemeToken<ButtonThemeArgs>;
}

export const ButtonDefaultTheme: ButtonTheme = {
  Button: ({ hover, active, focus }) =>
    clsx(styles.Button, {
      [styles.Button__focus]: !hover && !active && focus,
      [styles.Button__hover]: !active && hover,
      [styles.Button__active]: active,
    }),
};
