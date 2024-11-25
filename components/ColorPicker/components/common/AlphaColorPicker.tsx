import { Hue } from "./Hue";
import { Saturation } from "./Saturation";
import { Alpha } from "./Alpha";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { useColorManipulation } from "../../hooks/useColorManipulation";
import { ReactNode, useRef } from "react";
import { ColorPickerTheme, getThemeClassName } from "../../ColorPickerTheme.ts";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;

  colorModel: ColorModel<T>;
}

export const AlphaColorPicker = <T extends AnyColor>({
  theme,
  getThemeClassName,

  colorModel,
  color = colorModel.defaultColor,
  onChange,
  ...rest
}: Props<T>): ReactNode => {
  const ref = useRef<HTMLDivElement>(null);

  const [hsva, updateHsva] = useColorManipulation<T>(
    colorModel,
    color,
    onChange,
  );

  return (
    <div
      {...rest}
      ref={ref}
      className={getThemeClassName("ColorPicker_Picker", theme.Picker)}
    >
      <Saturation
        hsva={hsva}
        onChange={updateHsva}
        theme={theme}
        getThemeClassName={getThemeClassName}
      />
      <Hue
        hue={hsva.h}
        onChange={updateHsva}
        theme={theme}
        getThemeClassName={getThemeClassName}
      />
      <Alpha
        hsva={hsva}
        onChange={updateHsva}
        theme={theme}
        getThemeClassName={getThemeClassName}
      />
    </div>
  );
};
