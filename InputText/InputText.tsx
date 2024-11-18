import { InputHTMLAttributes, FC, forwardRef, Ref } from "react";
import styles from "./InputText.module.css";

export const defaultClassNames = {
  InputText: styles.InputText,
};

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: typeof defaultClassNames;
  suppressDefaultStyles?: boolean;
}

export const InputText = forwardRef(
  (props: InputTextProps, ref: Ref<HTMLInputElement>) => {
    const { classNames, suppressDefaultStyles, ...inputProps } = props;
    const _classNames = { ...defaultClassNames, ...classNames };

    return (
      <input {...inputProps} className={_classNames.InputText} ref={ref} />
    );
  },
);

// export const InputText: ForwardedRef<InputTextProps> = ({
//   classNames = {},
//   suppressDefaultStyles = false,
//   ...inputProps
// }) => {
//   const _classNames = { ...defaultClassNames, ...classNames };

//   console.log(inputProps.ref);

//   return <input {...inputProps} className={_classNames.InputText} />;
// };
