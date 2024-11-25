import { FC } from "react";

import { ColorPicker } from "./components/ColorPicker";
import { ColorModel, ColorPickerBaseProps, HslColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { hslaToHsva, hsvaToHsla, hslaToHsl } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HslColorPickerProps extends Partial<ColorPickerBaseProps<HslColor>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<HslColor> = {
  defaultColor: { h: 0, s: 0, l: 0 },
  toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
  fromHsva: (hsva) => hslaToHsl(hsvaToHsla(hsva)),
  equal: equalColorObjects,
};

export const HslColorPicker: FC<HslColorPickerProps> = (props) => (
  <ColorPicker {...props} colorModel={colorModel} />
);
