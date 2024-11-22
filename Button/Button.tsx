import { ButtonHTMLAttributes, FC, useCallback, useState } from "react";

import styles from "./Button.module.css";
import {
  ButtonTheme,
  ButtonDefaultTheme,
  ButtonThemeArgs,
} from "./ButtonTheme.ts";
import { ThemeToken } from "../Theme/ThemeToken.ts";
import { Debug } from "../Debug/Debug.tsx";

export const defaultClassNames = {
  Button: styles.Button,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  __debug?: boolean;
  theme?: ButtonTheme;
  unstyled?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  __debug = false,
  theme = {},
  unstyled = false,
  className = "",
  ...buttonProps
}) => {
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
    ) => {
      if (unstyled) {
        return defaultClassName;
      } else if (typeof themeToken !== "function") {
        return themeToken;
      } else {
        return themeToken({
          hover: isHovered,
          active: isActive,
          focus: isFocused,
          ...overrides,
        });
      }
    },
    [isHovered, isActive, isFocused],
  );

  return (
    <>
      {__debug ? (
        <>
          <Debug
            data={{
              isHovered,
              isActive,
              isFocused,
              theme: getThemeClassName(className, __theme.Button),
            }}
          />
        </>
      ) : null}
      <button
        {...buttonProps}
        className={getThemeClassName(className, __theme.Button)}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => {
          setIsActive(true);
        }}
        onMouseUp={() => {
          setIsActive(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </>
  );
};
