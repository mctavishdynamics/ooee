import {
  useState,
  useEffect,
  useCallback,
  FC,
  ChangeEvent,
  FocusEvent,
} from "react";

import { useEventCallback } from "../../hooks/useEventCallback";
import { ColorInputBaseProps } from "../../types";
import { ColorPickerTheme } from "../../ColorPickerTheme.ts";
import { InputText } from "../../../InputText/InputText.tsx";

interface Props extends ColorInputBaseProps {
  theme?: ColorPickerTheme;

  /** Blocks typing invalid characters and limits string length */
  escape: (value: string) => string;
  /** Checks that value is valid color string */
  validate: (value: string) => boolean;
  /** Processes value before displaying it in the input */
  format?: (value: string) => string;
  /** Processes value before sending it in `onChange` */
  process?: (value: string) => string;
}

export const ColorInput: FC<Props> = (props) => {
  const {
    color = "",
    onChange,
    onBlur,
    escape,
    validate,
    format,
    process,
  } = props;
  const [value, setValue] = useState(() => escape(color));
  const onChangeCallback = useEventCallback<string>(onChange);
  const onBlurCallback = useEventCallback<FocusEvent<HTMLInputElement>>(onBlur);

  // Trigger `onChange` handler only if the input value is a valid color
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = escape(e.target.value);
      setValue(inputValue);
      if (validate(inputValue))
        onChangeCallback(process ? process(inputValue) : inputValue);
    },
    [escape, process, validate, onChangeCallback],
  );

  // Take the color from props if the last typed color (in local state) is not valid
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (!validate(e.target.value)) setValue(escape(color));
      onBlurCallback(e);
    },
    [color, escape, validate, onBlurCallback],
  );

  // Update the local state when `color` property value is changed
  useEffect(() => {
    setValue(escape(color));
  }, [color, escape]);

  return (
    <InputText
      value={format ? format(value) : value}
      spellCheck="false" // the element should not be checked for spelling errors
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
