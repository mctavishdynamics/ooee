import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";

export const defaultClassNames = {
  Button: styles.Button,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  classNames?: typeof defaultClassNames;
  suppressDefaultStyles?: boolean;
}

export const Button: FC<ButtonProps> = ({
  classNames = {},
  className = "",
  suppressDefaultStyles = false,
  ...buttonProps
}) => {
  const _classNames = { ...defaultClassNames, ...classNames };

  return <button {...buttonProps} className={_classNames.Button} />;
};
