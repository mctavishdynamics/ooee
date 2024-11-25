import { FC } from "react";

import { ColorPicker } from "./components/ColorPicker";
import { ColorModel, ColorPickerBaseProps, HsvColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { hsvaToHsv } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HsvColorPickerProps extends Partial<ColorPickerBaseProps<HsvColor>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<HsvColor> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsva: ({ h, s, v }) => ({ h, s, v, a: 1 }),
  fromHsva: hsvaToHsv,
  equal: equalColorObjects,
};

export const HsvColorPicker: FC<HsvColorPickerProps> = (props) => (
  <ColorPicker {...props} colorModel={colorModel} />
);
