import { FC } from "react";

import { ColorPicker } from "./components/ColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { hslStringToHsva, hsvaToHslString } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HslStringColorPickerProps
  extends Partial<ColorPickerBaseProps<string>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<string> = {
  defaultColor: "hsl(0, 0%, 0%)",
  toHsva: hslStringToHsva,
  fromHsva: hsvaToHslString,
  equal: equalColorString,
};

export const HslStringColorPicker: FC<HslStringColorPickerProps> = (props) => (
  <ColorPicker {...props} colorModel={colorModel} />
);
