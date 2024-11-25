import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslString } from "../../utils/convert";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { memo } from "react";
import { ColorPickerTheme, getThemeClassName } from "../../ColorPickerTheme.ts";

interface Props {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;

  hue: number;
  onChange: (newHue: { h: number }) => void;
}

const HueBase = ({ theme, getThemeClassName, hue, onChange }: Props) => {
  const handleMove = (interaction: Interaction) => {
    onChange({ h: 360 * interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    onChange({
      h: clamp(hue + offset.left * 360, 0, 360),
    });
  };

  return (
    <div className={getThemeClassName("ColorPicker_Hue", theme.Hue)}>
      <Interactive
        theme={theme}
        getThemeClassName={getThemeClassName}
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Hue"
        aria-valuenow={round(hue)}
        aria-valuemax="360"
        aria-valuemin="0"
      >
        <Pointer
          theme={theme}
          getThemeClassName={getThemeClassName}
          className={getThemeClassName(
            "ColorPicker_HuePointer",
            theme.HuePointer,
          )}
          left={hue / 360}
          color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
        />
      </Interactive>
    </div>
  );
};

export const Hue = memo(HueBase);
