import { FC } from "react";

import { AlphaColorPicker } from "./common/AlphaColorPicker";
import { ColorModel, ColorPickerBaseProps, HsvaColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { roundHsva } from "../utils/convert";
import { ColorPickerTheme, getThemeClassName } from "../ColorPickerTheme.ts";

interface HsvaColorPickerProps
  extends Partial<ColorPickerBaseProps<HsvaColor>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
}

const colorModel: ColorModel<HsvaColor> = {
  defaultColor: { h: 0, s: 0, v: 0, a: 1 },
  toHsva: (hsva) => hsva,
  fromHsva: roundHsva,
  equal: equalColorObjects,
};

export const HsvaColorPicker: FC<HsvaColorPickerProps> = (props) => (
  <AlphaColorPicker {...props} colorModel={colorModel} />
);
