import { FC } from "react";

import { AlphaColorPicker } from "./components/AlphaColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { hslaStringToHsva, hsvaToHslaString } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HslaStringColorPickerProps
  extends Partial<ColorPickerBaseProps<string>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<string> = {
  defaultColor: "hsla(0, 0%, 0%, 1)",
  toHsva: hslaStringToHsva,
  fromHsva: hsvaToHslaString,
  equal: equalColorString,
};

export const HslaStringColorPicker: FC<HslaStringColorPickerProps> = (
  props,
) => <AlphaColorPicker {...props} colorModel={colorModel} />;
