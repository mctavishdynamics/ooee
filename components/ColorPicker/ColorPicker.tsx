import { FC, useCallback, useEffect, useState } from "react";
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
import { useDebounce } from "react-use";

export interface ColorPickerProps {
  theme?: () => void;
  unstyled?: boolean;

  color?: string;
  colorSwatches?: string[];

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

  onChange?: (color: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  theme = () => {},
  unstyled = false,
  color,
  colorSwatches,
  width = "200px",
  height = "200px",
  mode = "rgb",
  onChange = () => {},
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

  const [selectedColor, setSelectedColor] = useState(color || "#fff");
  const [debouncedSelectedColor, setDebouncedSelectedColor] =
    useState(selectedColor);

  useDebounce(
    () => {
      setDebouncedSelectedColor(selectedColor);
    },
    250,
    [selectedColor],
  );

  useEffect(() => {
    onChange(debouncedSelectedColor);
  }, [debouncedSelectedColor]);

  useEffect(() => {
    if (color) {
      setSelectedColor(color);
    } else {
      setSelectedColor("#fff");
    }
  }, [color]);

  const props = {
    theme: __theme,
    getThemeClassName,
    onChange: (newColor: AnyColor) => {
      setSelectedColor(newColor as string);
    },
  };

  return (
    <div className={getThemeClassName("ColorPicker", __theme.ColorPicker)}>
      <div style={{ width, height }}>
        {mode === "rgb" ? <RgbColorPicker {...props} /> : null}
        {mode === "rgbString" ? <RgbStringColorPicker {...props} /> : null}
        {mode === "rgba" ? <RgbaColorPicker {...props} /> : null}
        {mode === "rgbaString" ? <RgbaStringColorPicker {...props} /> : null}
        {mode === "hex" ? (
          <HexColorPicker color={selectedColor} {...props} />
        ) : null}
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

      {colorSwatches ? (
        <ul
          className={getThemeClassName(
            "ColorPicker_Swatches",
            __theme.Swatches,
          )}
          style={{ width: width }}
        >
          {colorSwatches.map((cs) => (
            <li
              className={getThemeClassName(
                "ColorPicker_Swatch",
                __theme.Swatch,
              )}
              style={{
                backgroundColor: cs,
              }}
            >
              <button
                onClick={() => {
                  setSelectedColor(cs);
                  setDebouncedSelectedColor(cs);
                }}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
