// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
//---

import { useState, useCallback, HTMLAttributes } from "react";
import {
  NAME____DefaultTheme,
  NAME____Theme,
  NAME____ThemeArgs,
} from "./NAME____Theme.ts";
import { ThemeToken } from "../../lib/ThemeToken.ts";
import clsx from "clsx";

export interface NAME____Props extends HTMLAttributes<HTMLElement> {
  unstyled?: boolean;
  theme?: NAME____Theme;
}

export const NAME____ = ({
  unstyled = false,
  theme = NAME____DefaultTheme,
  ...props
}: NAME____Props) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // THEME

  const __theme = Object.assign(
    {} as NAME____Theme,
    NAME____DefaultTheme,
    theme,
  );

  const getThemeClassName = useCallback(
    (
      defaultClassName: string,
      themeToken: ThemeToken<NAME____ThemeArgs>,
      overrides: Partial<NAME____ThemeArgs> = {},
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
    <button
      {...props}
      className={getThemeClassName(
        "NAME____",
        __theme.NAME____,
        {},
        props.className,
      )}
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
  );
};
