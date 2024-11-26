import clsx from "clsx";

import { ThemeToken } from "../../lib/ThemeToken.ts";

import styles from "./ColorPicker.module.css";

export interface ColorPickerThemeArgs {
  [n: string]: never;
}

export interface ColorPickerTheme {
  ColorPicker: ThemeToken<ColorPickerThemeArgs>;
  Picker: ThemeToken<ColorPickerThemeArgs>;
  Saturation: ThemeToken<ColorPickerThemeArgs>;
  SaturationPointer: ThemeToken<ColorPickerThemeArgs>;
  Hue: ThemeToken<ColorPickerThemeArgs>;
  HuePointer: ThemeToken<ColorPickerThemeArgs>;
  Alpha: ThemeToken<ColorPickerThemeArgs>;
  AlphaGradient: ThemeToken<ColorPickerThemeArgs>;
  AlphaPointer: ThemeToken<ColorPickerThemeArgs>;
  Interactive: ThemeToken<ColorPickerThemeArgs>;
  PointerFill: ThemeToken<ColorPickerThemeArgs>;
  Swatches: ThemeToken<ColorPickerThemeArgs>;
  Swatch: ThemeToken<ColorPickerThemeArgs>;
}

export const ColorPickerDefaultTheme: ColorPickerTheme = {
  ColorPicker: () => clsx(styles.ColorPicker, {}),
  Picker: () => clsx(styles.Picker, {}),
  Saturation: () => clsx(styles.Control, styles.Saturation, {}),
  SaturationPointer: () => clsx(styles.Pointer, styles.SaturationPointer, {}),
  Hue: () => clsx(styles.Control, styles.Hue, {}),
  HuePointer: () => clsx(styles.Pointer, styles.HuePointer, {}),
  Alpha: () => clsx(styles.Control, styles.Alpha, {}),
  AlphaGradient: () => clsx(styles.Gradient, styles.AlphaGradient, {}),
  AlphaPointer: () => clsx(styles.Pointer, styles.AlphaPointer, {}),
  Interactive: () => clsx(styles.Interactive, {}),
  PointerFill: () => clsx(styles.PointerFill, {}),
  Swatches: () => clsx(styles.Swatches, {}),
  Swatch: () => clsx(styles.Swatch, {}),
};

export type getThemeClassName = (
  defaultClassName: string,
  themeToken: ThemeToken<ColorPickerThemeArgs>,
  overrides?: Partial<ColorPickerThemeArgs>,
) => string;
