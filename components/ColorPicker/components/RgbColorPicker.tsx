import { FC, ReactNode } from "react";

import { ColorPicker } from "./components/ColorPicker";
import { ColorModel, ColorPickerBaseProps, RgbColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { rgbaToHsva, hsvaToRgba, rgbaToRgb } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface RgbColorPickerProps extends Partial<ColorPickerBaseProps<RgbColor>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<RgbColor> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsva: ({ r, g, b }) => rgbaToHsva({ r, g, b, a: 1 }),
  fromHsva: (hsva) => rgbaToRgb(hsvaToRgba(hsva)),
  equal: equalColorObjects,
};

export const RgbColorPicker: FC<RgbColorPickerProps> = (props): ReactNode => (
  <ColorPicker {...props} colorModel={colorModel} />
);
