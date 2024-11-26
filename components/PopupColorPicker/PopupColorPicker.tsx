import { ColorPicker, ColorPickerProps } from "../ColorPicker/ColorPicker.tsx";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  autoUpdate,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";

interface PopupColorPickerProps extends ColorPickerProps {
  defaultOpen?: boolean;
  children: (options: {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
  onClose: (newColor: string) => void;
}

export const PopupColorPicker: FC<PopupColorPickerProps> = ({
  mode,
  children,
  onChange = () => {},
  onClose = () => {},
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const selectedColorRef = useRef("");

  const { refs, floatingStyles, context } = useFloating({
    open: isOpened,
    onOpenChange: (newIsOpened) => {
      if (!newIsOpened) {
        onClose(selectedColorRef.current);
      }

      setIsOpened(newIsOpened);
    },
    whileElementsMounted: autoUpdate,
    middleware: [flip({ padding: 16 })],
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children({ isOpened, setIsOpened })}
      </div>
      {isOpened ? (
        <div
          ref={refs.setFloating}
          style={{ ...floatingStyles, zIndex: 10000 }}
          {...getFloatingProps()}
        >
          <ColorPicker
            mode={mode}
            onChange={(newColor) => {
              selectedColorRef.current = newColor;
              onChange(newColor);
            }}
          />
        </div>
      ) : null}
    </>
  );
};
