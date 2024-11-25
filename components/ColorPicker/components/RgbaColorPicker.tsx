import { FC, ReactNode } from "react";

import { AlphaColorPicker } from "./components/AlphaColorPicker";
import { ColorModel, ColorPickerBaseProps, RgbaColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { rgbaToHsva, hsvaToRgba } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface RgbaColorPickerProps
  extends Partial<ColorPickerBaseProps<RgbaColor>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<RgbaColor> = {
  defaultColor: { r: 0, g: 0, b: 0, a: 1 },
  toHsva: rgbaToHsva,
  fromHsva: hsvaToRgba,
  equal: equalColorObjects,
};

export const RgbaColorPicker: FC<RgbaColorPickerProps> = (props): ReactNode => (
  <AlphaColorPicker {...props} colorModel={colorModel} />
);
