import { FC, InputHTMLAttributes, ReactNode, useRef, useState } from "react";
import {
  autoUpdate,
  size,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  Placement,
  offset,
  useClick,
} from "@floating-ui/react";

import styles from "./ComboBox.module.css";
import { InputText } from "../InputText/InputText";
import { Button } from "../Button/Button";
import { ComboBoxItem } from "./ComboBoxItem";
import mergeRefs from "merge-refs";
import { useUpdateEffect } from "react-use";

export const defaultClassNames = {
  ComboBox: styles.ComboBox,
  ComboBoxList: styles.ComboBoxList,
  ComboBoxItem: styles.ComboBoxItem,
  ComboBoxActive: styles.ComboBoxItemActive,
  ComboBoxNoResults: styles.ComboBoxNoResults,
};

export interface ComboBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: typeof defaultClassNames;
  suppressDefaultClassNames?: boolean;
  placement?: Placement;
  offsetMainAxis?: number;
  offsetAlignmentAxis?: number;
  offsetCrossAxis?: number;
  openOnFocus?: boolean;
  values?: string[];
  noResults?: string | ReactNode;
  onCreate?: (value: string) => void;
}

export const ComboBox: FC<ComboBoxProps> = ({
  classNames = {},
  suppressDefaultClassNames = false,
  placement,
  offsetMainAxis = 8,
  offsetAlignmentAxis,
  offsetCrossAxis,
  openOnFocus = false,
  values = [],
  noResults = "No results",
  onCreate = () => {},
  ...inputProps
}) => {
  const _classNames = Object.assign(
    {} as typeof defaultClassNames,
    suppressDefaultClassNames ? {} : defaultClassNames,
    classNames,
  );

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  useUpdateEffect(() => {
    if (inputRef.current) {
      if (inputValue === "") {
        setOpen(true);
      }
    }
  }, [inputValue]);

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

  const filteredItems = values.filter((value) =>
    value.toLowerCase().startsWith(inputValue.toLowerCase()),
  );

  return (
    <>
      <div ref={refs.setPositionReference} className={_classNames.ComboBox}>
        <InputText
          ref={mergeRefs(refs.setReference, inputRef)}
          {...getReferenceProps({
            ...inputProps,
            onChange,
            value: inputValue,
            "aria-autocomplete": "list",
            onKeyDown(ev) {
              if (ev.key === "Enter") {
                if (activeIndex !== null && filteredItems[activeIndex]) {
                  setInputValue(filteredItems[activeIndex]);
                  setActiveIndex(null);
                  setOpen(false);
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
