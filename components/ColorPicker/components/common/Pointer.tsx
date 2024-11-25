import { ColorPickerTheme, getThemeClassName } from "../../ColorPickerTheme.ts";

interface Props {
  theme: ColorPickerTheme;
  getThemeClassName: getThemeClassName;

  className?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer = ({
  theme,
  getThemeClassName,
  className,
  color,
  left,
  top = 0.5,
}: Props): JSX.Element => {
  const style = {
    top: `${top * 100}%`,
    left: `${left * 100}%`,
  };

  return (
    <div className={className} style={style}>
      <div
        className={getThemeClassName(
          "ColorPicker_PointerFill",
          theme.PointerFill,
        )}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
