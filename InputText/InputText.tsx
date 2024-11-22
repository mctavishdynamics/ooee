import { InputHTMLAttributes, forwardRef, Ref } from "react";
import styles from "./InputText.module.css";

export const defaultClassNames = {
  InputText: styles.InputText,
};

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  unstyled?: boolean;
  classNames?: typeof defaultClassNames;
  suppressDefaultClassNames?: boolean;
}

export const InputText = forwardRef(
  (
    {
      unstyled,
      className,
      classNames,
      suppressDefaultClassNames,
      ...inputProps
    }: InputTextProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const _classNames = Object.assign(
      {} as typeof defaultClassNames,
      suppressDefaultClassNames ? {} : defaultClassNames,
      classNames,
    );

    return (
      <input
        {...inputProps}
        className={unstyled ? className : _classNames.InputText}
        ref={ref}
      />
    );
  },
);
