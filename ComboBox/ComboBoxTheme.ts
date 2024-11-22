import clsx from "clsx";

import { ThemeToken } from "../Theme/ThemeToken.ts";

import styles from "./ComboBox.module.css";

export interface ComboBoxThemeArgs {
  open: boolean;
  hover: boolean;
  active: boolean;
  focus: boolean;
}

export interface ComboBoxTheme {
  ComboBox: ThemeToken<ComboBoxThemeArgs>;
  InputText: ThemeToken<ComboBoxThemeArgs>;
  Toggle: ThemeToken<ComboBoxThemeArgs>;
  Toggle_ClosedIcon: ThemeToken<ComboBoxThemeArgs>;
  Toggle_OpenedIcon: ThemeToken<ComboBoxThemeArgs>;
  List: ThemeToken<ComboBoxThemeArgs>;
  List_Item: ThemeToken<ComboBoxThemeArgs>;
  List_NoResults: ThemeToken<ComboBoxThemeArgs>;
}

export const ComboBoxDefaultTheme: ComboBoxTheme = {
  ComboBox: ({ hover, active, open }) =>
    clsx(styles.ComboBox, {
      [styles.ComboBox__hover]: hover,
      [styles.ComboBox__active]: active,
      [styles.ComboBox__closed]: !open,
      [styles.ComboBox__open]: open,
    }),

  InputText: ({ open, hover, active, focus }) =>
    clsx(styles.InputText, {
      [styles.InputText__open]: open,
      [styles.InputText__hover]: hover,
      [styles.InputText__active]: active,
      [styles.InputText__focus]: focus,
    }),

  Toggle: ({ open, hover, active, focus }) =>
    clsx(styles.Toggle, {
      [styles.Toggle__hover]: hover,
      [styles.Toggle__active]: active,
      [styles.Toggle__closed]: !open,
      [styles.Toggle__open]: open,
      [styles.Toggle__focus]: focus,
    }),

  Toggle_ClosedIcon: ({ open }) =>
    clsx(styles.Toggle_Icon, styles.Toggle_ClosedIcon, {
      [styles.Toggle_ClosedIcon__closed]: !open,
      [styles.Toggle_ClosedIcon__open]: open,
    }),

  Toggle_OpenedIcon: ({ open }) =>
    clsx(styles.Toggle_Icon, styles.Toggle_OpenedIcon, {
      [styles.Toggle_OpenedIcon__closed]: !open,
      [styles.Toggle_OpenedIcon__open]: open,
    }),

  List: styles.List,
  List_Item: ({ active }) =>
    clsx(styles.List_Item, { [styles.List_Item__Active]: active }),
  List_NoResults: styles.List_Item_NoResults,
};
