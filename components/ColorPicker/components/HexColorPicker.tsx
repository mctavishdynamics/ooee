import { ColorPicker } from "./components/ColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalHex } from "../utils/compare";
import { hexToHsva, hsvaToHex } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";
import { FC } from "react";

interface HexColorPickerProps extends Partial<ColorPickerBaseProps<string>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<string> = {
  defaultColor: "000",
  toHsva: hexToHsva,
  fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
  equal: equalHex,
};

export const HexColorPicker: FC<HexColorPickerProps> = (props) => (
  <ColorPicker {...props} colorModel={colorModel} />
);
