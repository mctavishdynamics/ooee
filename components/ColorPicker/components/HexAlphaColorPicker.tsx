import { FC } from "react";

import { AlphaColorPicker } from "./components/AlphaColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalHex } from "../utils/compare";
import { hexToHsva, hsvaToHex } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HexAlphaColorPickerProps
  extends Partial<ColorPickerBaseProps<string>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<string> = {
  defaultColor: "0001",
  toHsva: hexToHsva,
  fromHsva: hsvaToHex,
  equal: equalHex,
};

export const HexAlphaColorPicker: FC<HexAlphaColorPickerProps> = (props) => (
  <AlphaColorPicker {...props} colorModel={colorModel} />
);
