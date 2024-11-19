import { InputHTMLAttributes, forwardRef, Ref } from "react";
import styles from "./InputText.module.css";

export const defaultClassNames = {
  InputText: styles.InputText,
};

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: typeof defaultClassNames;
  suppressDefaultClassNames?: boolean;
}

export const InputText = forwardRef(
  (
    { classNames, suppressDefaultClassNames, ...inputProps }: InputTextProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const _classNames = Object.assign(
      {} as typeof defaultClassNames,
      suppressDefaultClassNames ? {} : defaultClassNames,
      classNames,
    );

    return (
      <input {...inputProps} className={_classNames.InputText} ref={ref} />
    );
  },
);
