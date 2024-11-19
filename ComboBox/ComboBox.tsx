import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import mergeRefs from "merge-refs";
import { useDebounce, useUpdateEffect } from "react-use";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";

import styles from "./ComboBox.module.css";
import { InputText } from "../InputText/InputText";
import { Button } from "../Button/Button";
import { ComboBoxItem } from "./ComboBoxItem";
import clsx from "clsx";

export const defaultClassNames = {
  ComboBox: styles.ComboBox,
  ComboBoxList: styles.ComboBoxList,
  ComboBoxItem: styles.ComboBoxItem,
  ComboBoxActive: styles.ComboBoxItemActive,
  ComboBoxNoResults: styles.ComboBoxNoResults,
};

export interface ComboBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  classNames?: Partial<typeof defaultClassNames>;
  suppressDefaultClassNames?: boolean;
  placement?: Placement;
  offsetMainAxis?: number;
  offsetAlignmentAxis?: number;
  offsetCrossAxis?: number;
  value?: string;
  values?: string[];
  noResults?: string | ReactNode;
  onCreate?: (value: string) => void;
  onChange?: (value: string) => void;
}

export const ComboBox: FC<ComboBoxProps> = ({
  className,
  classNames = {},
  suppressDefaultClassNames = false,
  placement,
  offsetMainAxis = 8,
  offsetAlignmentAxis,
  offsetCrossAxis,
  value = "",
  values = [],
  noResults = "No results",
  onCreate = () => {},
  onChange = () => {},
  ...inputProps
}) => {
  const _classNames = Object.assign(
    {} as typeof defaultClassNames,
    suppressDefaultClassNames ? {} : defaultClassNames,
    classNames,
  );

  const [open, setOpen] = useState(false);
  const [debouncedOpen, setDebouncedOpen] = useState(open);
  const [inputValue, setInputValue] = useState<string>(value);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  useDebounce(
    () => {
      setDebouncedOpen(open);
    },
    10,
    [open],
  );

  useUpdateEffect(() => {
    if (inputRef.current) {
      if (inputValue === "") {
        setOpen(true);
      }
    }
  }, [inputValue]);

  useUpdateEffect(() => {
    if (open && inputValue === value) {
      inputRef.current?.select();
    }
  }, [open]);

  useUpdateEffect(() => {
    if (!open) {
      if (!values.includes(inputValue)) {
        setInputValue(value);
      }
    }
  }, [debouncedOpen]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [
      offset({
        mainAxis: offsetMainAxis,
        alignmentAxis: offsetAlignmentAxis,
        crossAxis: offsetCrossAxis,
      }),
      flip({ padding: 16 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 16,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const click = useClick(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: (index) => {
      setActiveIndex(index);
    },
    openOnArrowKeyDown: true,
    virtual: true,
    loop: false,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, dismiss, listNav, click],
  );

  function _onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  const filteredItems = values.filter((value) =>
    value.toLowerCase().startsWith(inputValue.toLowerCase()),
  );

  return (
    <>
      <div
        ref={refs.setPositionReference}
        className={clsx(_classNames.ComboBox, className)}
      >
        <InputText
          ref={mergeRefs(refs.setReference, inputRef)}
          {...getReferenceProps({
            ...inputProps,
            onChange: _onChange,
            value: inputValue,
            "aria-autocomplete": "list",
            onKeyDown(ev) {
              if (ev.key === "Enter") {
                if (activeIndex !== null && filteredItems[activeIndex]) {
                  setInputValue(filteredItems[activeIndex]);
                  setActiveIndex(null);
                  setOpen(false);
                  onChange(filteredItems[activeIndex]);
                } else {
                  onCreate(inputValue);
                }
              }
            },
          })}
        />
        <Button
          onClick={() => {
            setOpen(!open);
            inputRef.current?.focus();
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
                className: _classNames.ComboBoxList,
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                },
              })}
            >
              {filteredItems.length === 0 && (
                <div className={_classNames.ComboBoxNoResults}>{noResults}</div>
              )}
              {filteredItems.map((item, index) => (
                <ComboBoxItem
                  className={_classNames.ComboBoxItem}
                  activeClassName={_classNames.ComboBoxActive}
                  key={item}
                  {...getItemProps({
                    ref(node) {
                      listRef.current[index] = node;
                    },
                    onClick() {
                      onChange(item);
                      setInputValue(item);
                      setOpen(false);
                      refs.domReference.current?.focus();
                    },
                  })}
                  active={activeIndex === index}
                >
                  {item}
                </ComboBoxItem>
              ))}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
