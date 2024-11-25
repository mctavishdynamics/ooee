import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";
import { HsvaColor } from "../../types";
import { hsvaToHslString } from "../../utils/convert";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { memo } from "react";
import { ColorPickerTheme, getThemeClassName } from "../../ColorPickerTheme.ts";

interface Props {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;

  hsva: HsvaColor;
  onChange: (newColor: { s: number; v: number }) => void;
}

const SaturationBase = ({
  theme,
  getThemeClassName,
  hsva,
  onChange,
}: Props) => {
  const handleMove = (interaction: Interaction) => {
    onChange({
      s: interaction.left * 100,
      v: 100 - interaction.top * 100,
    });
  };

  const handleKey = (offset: Interaction) => {
    // Saturation and brightness always fit into [0, 100] range
    onChange({
      s: clamp(hsva.s + offset.left * 100, 0, 100),
      v: clamp(hsva.v - offset.top * 100, 0, 100),
    });
  };

  const containerStyle = {
    backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
  };

  return (
    <div
      className={getThemeClassName("ColorPicker_Saturation", theme.Saturation)}
      style={containerStyle}
    >
      <Interactive
        theme={theme}
        getThemeClassName={getThemeClassName}
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Color"
        aria-valuetext={`Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`}
      >
        <Pointer
          theme={theme}
          getThemeClassName={getThemeClassName}
          className={getThemeClassName(
            "ColorPicker_SaturationPointer",
            theme.SaturationPointer,
          )}
          top={1 - hsva.v / 100}
          left={hsva.s / 100}
          color={hsvaToHslString(hsva)}
        />
      </Interactive>
    </div>
  );
};

export const Saturation = memo(SaturationBase);
