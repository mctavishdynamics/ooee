import clsx from "clsx";

import { ThemeToken } from "../../lib/ThemeToken.ts";

import styles from "./NAME____.module.css";

export interface NAME____ThemeArgs {
  hover: boolean;
  active: boolean;
  focus: boolean;
}

export interface NAME____Theme {
  NAME____: ThemeToken<NAME____ThemeArgs>;
}

export const NAME____DefaultTheme: NAME____Theme = {
  NAME____: ({ hover, active, focus }) =>
    clsx(styles.NAME____, {
      [styles.NAME______focus]: !hover && !active && focus,
      [styles.NAME______hover]: !active && hover,
      [styles.NAME______active]: active,
    }),
};
