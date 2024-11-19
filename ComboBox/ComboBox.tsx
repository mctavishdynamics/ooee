import { FC, InputHTMLAttributes, forwardRef, useRef, useState } from "react";
import {
  autoUpdate,
  size,
  flip,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react";

import styles from "./ComboBox.module.css";
import { InputText } from "../InputText/InputText";
import { Button } from "../Button/Button";

const data = ["1", "2", "3"];

export const defaultClassNames = {
  ComboBox: styles.ComboBox,
};

export interface ComboBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

interface ItemProps {
  children: React.ReactNode;
  active: boolean;
}

const Item = forwardRef<
  HTMLDivElement,
  ItemProps & React.HTMLProps<HTMLDivElement>
>(({ children, active, ...rest }, ref) => {
  const id = useId();
  return (
    <div
      ref={ref}
      role="option"
      id={id}
      aria-selected={active}
      {...rest}
      style={{
        background: active ? "lightblue" : "none",
        padding: 4,
        cursor: "default",
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
});

export const ComboBox: FC<ComboBoxProps> = ({
  classNames = {},
  suppressDefaultStyles = false,
  ...inputProps
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 10 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, dismiss, listNav],
  );

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  const items = data.filter((item) =>
    item.toLowerCase().startsWith(inputValue.toLowerCase()),
  );

  return (
    <>
      <div ref={refs.setReference} className={styles.ComboBox}>
        <InputText
          {...getReferenceProps({
            ...inputProps,
            onChange,
            value: inputValue,
            "aria-autocomplete": "list",

            onKeyDown(event) {
              if (
                event.key === "Enter" &&
                activeIndex != null &&
                items[activeIndex]
              ) {
                setInputValue(items[activeIndex]);
                setActiveIndex(null);
                setOpen(false);
              }
            },
          })}
        />
        <Button
          onClick={() => {
            setOpen(!open);
          }}
        >
          &darr;
        </Button>
      </div>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            visuallyHiddenDismiss
          >
            <div
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                  background: "#eee",
                  color: "black",
                  overflowY: "auto",
                },
              })}
            >
              {items.map((item, index) => (
                <Item
                  key={item}
                  {...getItemProps({
                    ref(node) {
                      listRef.current[index] = node;
                    },
                    onClick() {
                      setInputValue(item);
                      setOpen(false);
                      refs.domReference.current?.focus();
                    },
                  })}
                  active={activeIndex === index}
                >
                  {item}
                </Item>
              ))}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
