import { FC } from "react";

import { AlphaColorPicker } from "./components/AlphaColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { hsvaStringToHsva, hsvaToHsvaString } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HsvaStringColorPickerProps
  extends Partial<ColorPickerBaseProps<string>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<string> = {
  defaultColor: "hsva(0, 0%, 0%, 1)",
  toHsva: hsvaStringToHsva,
  fromHsva: hsvaToHsvaString,
  equal: equalColorString,
};

export const HsvaStringColorPicker: FC<HsvaStringColorPickerProps> = (
  props,
) => <AlphaColorPicker {...props} colorModel={colorModel} />;
