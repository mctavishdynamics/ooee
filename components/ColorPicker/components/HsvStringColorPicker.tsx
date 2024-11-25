import { FC } from "react";

import { ColorPicker } from "./components/ColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { hsvStringToHsva, hsvaToHsvString } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HsvStringColorPickerProps
  extends Partial<ColorPickerBaseProps<string>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<string> = {
  defaultColor: "hsv(0, 0%, 0%)",
  toHsva: hsvStringToHsva,
  fromHsva: hsvaToHsvString,
  equal: equalColorString,
};

export const HsvStringColorPicker: FC<HsvStringColorPickerProps> = (props) => (
  <ColorPicker {...props} colorModel={colorModel} />
);
