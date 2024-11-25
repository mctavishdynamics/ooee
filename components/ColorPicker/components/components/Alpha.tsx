import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslaString } from "../../utils/convert";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { HsvaColor } from "../../types";
import { ColorPickerTheme, getThemeClassName } from "../../ColorPickerTheme.ts";
import { ReactNode } from "react";

interface Props {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }) => void;
}

export const Alpha = ({
  theme,
  getThemeClassName,
  hsva,
  onChange,
}: Props): ReactNode => {
  const handleMove = (interaction: Interaction) => {
    onChange({ a: interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Alpha always fit into [0, 1] range
    onChange({ a: clamp(hsva.a + offset.left) });
  };

  // We use `Object.assign` instead of the spread operator
  // to prevent adding the polyfill (about 150 bytes gzipped)
  const colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }));
  const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
  };

  const ariaValue = round(hsva.a * 100);

  return (
    <div className={getThemeClassName("ColorPicker_Alpha", theme.Alpha)}>
      <div
        className={getThemeClassName(
          "ColorPicker_AlphaGradient",
          theme.AlphaGradient,
        )}
        style={gradientStyle}
      />
      <Interactive
        theme={theme}
        getThemeClassName={getThemeClassName}
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${ariaValue}%`}
        aria-valuenow={ariaValue}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <Pointer
          theme={theme}
          getThemeClassName={getThemeClassName}
          className={getThemeClassName(
            "ColorPicker_AlphaPointer",
            theme.AlphaPointer,
          )}
          left={hsva.a}
          color={hsvaToHslaString(hsva)}
        />
      </Interactive>
    </div>
  );
};
