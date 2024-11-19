import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";

export const defaultClassNames = {
  Button: styles.Button,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classNames?: typeof defaultClassNames;
  suppressDefaultClassNames?: boolean;
}

export const Button: FC<ButtonProps> = ({
  classNames = {},
  suppressDefaultClassNames = false,
  ...buttonProps
}) => {
  const _classNames = Object.assign(
    {} as typeof defaultClassNames,
    suppressDefaultClassNames ? {} : defaultClassNames,
    classNames,
  );

  return <button {...buttonProps} className={_classNames.Button} />;
};
