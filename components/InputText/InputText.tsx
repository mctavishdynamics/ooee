import {
  InputHTMLAttributes,
  forwardRef,
  Ref,
  useState,
  useCallback,
} from "react";
import { InputTextDefaultTheme, InputTextTheme } from "./InputTextTheme.ts";
import {
  ButtonDefaultTheme,
  ButtonTheme,
  ButtonThemeArgs,
} from "../Button/ButtonTheme.ts";
import { ThemeToken } from "../../lib/ThemeToken.ts";
import clsx from "clsx";

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  unstyled?: boolean;
  theme?: InputTextTheme;
}

export const InputText = forwardRef(
  (
    {
      unstyled = false,
      theme = InputTextDefaultTheme,
      ...inputProps
    }: InputTextProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STATE

    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // THEME

    const __theme = Object.assign({} as ButtonTheme, ButtonDefaultTheme, theme);

    const getThemeClassName = useCallback(
      (
        defaultClassName: string,
        themeToken: ThemeToken<ButtonThemeArgs>,
        overrides: Partial<ButtonThemeArgs> = {},
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
            ...overrides,
            }),
            className,
          );
        }
      },
      [unstyled, isHovered, isActive, isFocused],
    );

    return (
      <input
        {...inputProps}
        onMouseEnter={(ev) => {
          setIsHovered(true);

          if (inputProps.onMouseEnter) {
            inputProps.onMouseEnter(ev);
          }
        }}
        onMouseLeave={(ev) => {
          setIsHovered(false);
          setIsActive(false);

          if (inputProps.onMouseLeave) {
            inputProps.onMouseLeave(ev);
          }
        }}
        onMouseDown={(ev) => {
          setIsActive(true);
          setIsHovered(false);

          if (inputProps.onMouseDown) {
            inputProps.onMouseDown(ev);
          }
        }}
        onMouseUp={(ev) => {
          setIsActive(false);
          setIsHovered(true);

          if (inputProps.onMouseUp) {
            inputProps.onMouseUp(ev);
          }
        }}
        onFocus={(ev) => {
          setIsFocused(true);

          if (inputProps.onFocus) {
            inputProps.onFocus(ev);
          }
        }}
        onBlur={(ev) => {
          setIsFocused(false);

          if (inputProps.onBlur) {
            inputProps.onBlur(ev);
          }
        }}
        className={getThemeClassName(
          "InputText",
          __theme.InputText,
          {},
          inputProps.className,
        )}
        ref={ref}
      />
    );
  },
);
