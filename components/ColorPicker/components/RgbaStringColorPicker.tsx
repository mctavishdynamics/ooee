import { FC } from "react";

import { AlphaColorPicker } from "./components/AlphaColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { rgbaStringToHsva, hsvaToRgbaString } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface RgbaStringColorPickerProps
  extends Partial<ColorPickerBaseProps<string>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<string> = {
  defaultColor: "rgba(0, 0, 0, 1)",
  toHsva: rgbaStringToHsva,
  fromHsva: hsvaToRgbaString,
  equal: equalColorString,
};

export const RgbaStringColorPicker: FC<RgbaStringColorPickerProps> = (
  props,
) => <AlphaColorPicker {...props} colorModel={colorModel} />;
