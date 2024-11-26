import { FC, useCallback } from "react";
import { ThemeToken } from "../../lib/ThemeToken.ts";
import {
  ColorPickerDefaultTheme,
  ColorPickerTheme,
  ColorPickerThemeArgs,
  getThemeClassName,
} from "./ColorPickerTheme.ts";

import { AnyColor } from "./types.ts";
import { RgbColorPicker } from "./components/RgbColorPicker.tsx";
import { RgbaColorPicker } from "./components/RgbaColorPicker.tsx";
import { RgbStringColorPicker } from "./components/RgbStringColorPicker.tsx";
import { RgbaStringColorPicker } from "./components/RgbaStringColorPicker.tsx";
import { HexColorPicker } from "./components/HexColorPicker.tsx";
import { HexAlphaColorPicker } from "./components/HexAlphaColorPicker.tsx";
import { HslColorPicker } from "./components/HslColorPicker.tsx";
import { HslStringColorPicker } from "./components/HslStringColorPicker.tsx";
import { HsvColorPicker } from "./components/HsvColorPicker.tsx";
import { HsvStringColorPicker } from "./components/HsvStringColorPicker.tsx";
import { HslaColorPicker } from "./components/HslaColorPicker.tsx";
import { HslaStringColorPicker } from "./components/HslaStringColorPicker.tsx";
import { HsvaColorPicker } from "./components/HsvaColorPicker.tsx";
import { HsvaStringColorPicker } from "./components/HsvaStringColorPicker.tsx";
import { HexColorInput } from "./components/HexColorInput.tsx";

interface ColorPickerProps {
  theme?: () => void;
  unstyled?: boolean;

  width?: string;
  height?: string;

  mode?:
    | "rgb"
    | "rgbString"
    | "rgba"
    | "rgbaString"
    | "hex"
    | "hexAlpha"
    | "hexInput"
    | "hsl"
    | "hslString"
    | "hsla"
    | "hslaString"
    | "hsv"
    | "hsvString"
    | "hsva"
    | "hsvaString";

  onChange?: (color: AnyColor) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  theme = () => {},
  unstyled = false,
  width = "200px",
  height = "200px",
  mode = "rgb",
  onChange = (newColor) => {
    console.log(newColor);
  },
}) => {
  const __theme = Object.assign(
    {} as ColorPickerTheme,
    ColorPickerDefaultTheme,
    theme,
  );

  const getThemeClassName: getThemeClassName = useCallback(
    (
      defaultClassName: string,
      themeToken: ThemeToken<ColorPickerThemeArgs>,
      overrides: Partial<ColorPickerThemeArgs> = {},
    ) => {
      if (unstyled) {
        return defaultClassName;
      } else if (typeof themeToken !== "function") {
        return themeToken;
      } else {
        return themeToken({
          ...{},
          ...overrides,
        });
      }
    },
    [],
  );

  const props = {
    theme: __theme,
    getThemeClassName,
    onChange,
  };

  return (
    <div
      className={getThemeClassName("ColorPicker", __theme.ColorPicker)}
      style={{ width, height }}
    >
      {mode === "rgb" ? <RgbColorPicker {...props} /> : null}
      {mode === "rgbString" ? <RgbStringColorPicker {...props} /> : null}
      {mode === "rgba" ? <RgbaColorPicker {...props} /> : null}
      {mode === "rgbaString" ? <RgbaStringColorPicker {...props} /> : null}
      {mode === "hex" ? <HexColorPicker {...props} /> : null}
      {mode === "hexAlpha" ? <HexAlphaColorPicker {...props} /> : null}
      {mode === "hexInput" ? <HexColorInput {...props} /> : null}
      {mode === "hsl" ? <HslColorPicker {...props} /> : null}
      {mode === "hslString" ? <HslStringColorPicker {...props} /> : null}
      {mode === "hsla" ? <HslaColorPicker {...props} /> : null}
      {mode === "hslaString" ? <HslaStringColorPicker {...props} /> : null}
      {mode === "hsv" ? <HsvColorPicker {...props} /> : null}
      {mode === "hsvString" ? <HsvStringColorPicker {...props} /> : null}
      {mode === "hsva" ? <HsvaColorPicker {...props} /> : null}
      {mode === "hsvaString" ? <HsvaStringColorPicker {...props} /> : null}
    </div>
  );
};
