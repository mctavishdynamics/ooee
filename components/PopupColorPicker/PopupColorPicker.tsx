import { ColorPicker, ColorPickerProps } from "../ColorPicker/ColorPicker.tsx";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import {
  autoUpdate,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";

interface PopupColorPickerProps extends ColorPickerProps {
  defaultOpen?: boolean;
  children: (
    isOpened: boolean,
    setIsOpened: Dispatch<SetStateAction<boolean>>,
  ) => ReactNode;
}

export const PopupColorPicker: FC<PopupColorPickerProps> = ({
  mode,
  children,
  onChange,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpened,
    onOpenChange: setIsOpened,
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children(isOpened, setIsOpened)}
      </div>
      {isOpened ? (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <ColorPicker mode={mode} onChange={onChange} />
        </div>
      ) : null}
    </>
  );
};
