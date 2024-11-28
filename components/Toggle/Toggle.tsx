import { useState, useCallback, HTMLAttributes } from "react";
import {
  ToggleDefaultTheme,
  ToggleTheme,
  ToggleThemeArgs,
} from "./ToggleTheme.ts";
import { ThemeToken } from "../../lib/ThemeToken.ts";
import clsx from "clsx";

export interface ToggleProps extends HTMLAttributes<HTMLElement> {
  unstyled?: boolean;
  theme?: ToggleTheme;
}

export const Toggle = ({
  unstyled = false,
  theme = ToggleDefaultTheme,
  ...props
}: ToggleProps) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE

  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // THEME

  const __theme = Object.assign({} as ToggleTheme, ToggleDefaultTheme, theme);

  const getThemeClassName = useCallback(
    (
      defaultClassName: string,
      themeToken: ThemeToken<ToggleThemeArgs>,
      overrides: Partial<ToggleThemeArgs> = {},
      className?: string,
    ) => {
      if (unstyled) {
        return clsx(defaultClassName, className);
      } else if (typeof themeToken !== "function") {
        return clsx(themeToken, className);
      } else {
        return clsx(
          themeToken({
            hover: isHovered,
            active: isActive,
            focus: isFocused,
            checked: isChecked,
            ...overrides,
          }),
          className,
        );
      }
    },
    [unstyled, isHovered, isActive, isFocused, isChecked],
  );

  return (
    <div
      {...props}
      className={getThemeClassName(
        "Toggle",
        __theme.Toggle,
        {},
        props.className,
      )}
    >
      <div className={getThemeClassName("Toggle_Switch", __theme.Switch)} />
      <input
        checked={isChecked}
        className={getThemeClassName("Toggle_Input", __theme.Input)}
        type={"checkbox"}
        onChange={(ev) => {
          setIsChecked(ev.target.checked);

          if (props.onChange) {
            props.onChange(ev);
          }
        }}
        onMouseEnter={(ev) => {
          setIsHovered(true);

          if (props.onMouseEnter) {
            props.onMouseEnter(ev);
          }
        }}
        onMouseLeave={(ev) => {
          setIsHovered(false);
          setIsActive(false);

          if (props.onMouseLeave) {
            props.onMouseLeave(ev);
          }
        }}
        onMouseDown={(ev) => {
          setIsActive(true);
          setIsHovered(false);

          if (props.onMouseDown) {
            props.onMouseDown(ev);
          }
        }}
        onMouseUp={(ev) => {
          setIsActive(false);
          setIsHovered(true);

          if (props.onMouseUp) {
            props.onMouseUp(ev);
          }
        }}
        onFocus={(ev) => {
          setIsFocused(true);

          if (props.onFocus) {
            props.onFocus(ev);
          }
        }}
        onBlur={(ev) => {
          setIsFocused(false);

          if (props.onBlur) {
            props.onBlur(ev);
          }
        }}
      />
    </div>
  );
};
