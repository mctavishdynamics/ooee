import clsx from "clsx";

import { ThemeToken } from "../../lib/ThemeToken.ts";

import styles from "./InputText.module.css";

export interface InputTextThemeArgs {
  hover: boolean;
  active: boolean;
  focus: boolean;
}

export interface InputTextTheme {
  InputText: ThemeToken<InputTextThemeArgs>;
}

export const InputTextDefaultTheme: InputTextTheme = {
  InputText: ({ hover, active, focus }) =>
    clsx(styles.InputText, {
      [styles.InputText__focus]: !hover && !active && focus,
      [styles.InputText__hover]: !active && hover,
      [styles.InputText__active]: active,
    }),
};
