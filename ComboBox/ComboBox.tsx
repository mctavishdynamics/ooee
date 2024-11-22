import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import mergeRefs from "merge-refs";
import { useUpdateEffect } from "react-use";
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

import { InputText } from "../InputText/InputText";
import { ComboBoxItem } from "./ComboBoxItem";
import { IconsForComboBox } from "./IconsForComboBox";
import {
  ComboBoxDefaultTheme,
  ComboBoxTheme,
  ComboBoxThemeArgs,
} from "./ComboBoxTheme.ts";
import { ThemeToken } from "../ThemeToken.ts";
import { Debug } from "../Debug/Debug.tsx";

export interface ComboBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  __debug?: boolean;
  theme?: ComboBoxTheme;
  unstyled?: boolean;
  className?: string;

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
  __debug = false,
  theme = {},
  unstyled = false,
  className = "",

  placement,
  offsetMainAxis = 8,
  offsetAlignmentAxis,
  offsetCrossAxis,
  value = "",
  values = [],
  onCreate = () => {},
  onChange = () => {},
  ...inputProps
}) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STATE

  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [selectedValue, setSelectedValue] = useState<string>(value);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // THEME

  const __theme = Object.assign(
    {} as ComboBoxTheme,
    ComboBoxDefaultTheme,
    theme,
  );

  const getThemeClassName = useCallback(
    (
      defaultClassName: string,
      themeToken: ThemeToken<ComboBoxThemeArgs>,
      overrides: Partial<ComboBoxThemeArgs> = {},
    ) => {
      if (unstyled) {
        return defaultClassName;
      } else if (typeof themeToken !== "function") {
        return themeToken;
      } else {
        return themeToken({
          open: isOpened,
          hover: isHovered,
          active: isActive,
          focus: isFocused,
          ...overrides,
        });
      }
    },
    [isOpened, isHovered, isActive, isFocused],
  );

  useUpdateEffect(() => {
    if (inputValue !== null) {
      setIsOpened(true);
    }
  }, [inputValue]);

  useUpdateEffect(() => {
    if (!isOpened) {
      setInputValue(null);
    }
  }, [isOpened]);

  const toggleIsOpened = useCallback(() => {
    setIsOpened((o) => !o);
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FloatingUI Config

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open: isOpened,
    onOpenChange: (open) => {
      setIsOpened(open);
    },
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
  const dismiss = useDismiss(context, {
    enabled: true,
  });
  const click = useClick(context, { enabled: true });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex: activeIndex,
    onNavigate: (index) => {
      setActiveIndex(index);
    },
    openOnArrowKeyDown: true,
    virtual: true,
    loop: false,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, listNav, dismiss, click],
  );

  function _onChange(ev: ChangeEvent<HTMLInputElement>) {
    setInputValue(ev.target.value);
    setActiveIndex(0);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Item Filtering and selection/creation handlers

  const filteredItems = values.filter((value) => {
    if (inputValue === null) {
      return true;
    } else if (selectedValue !== inputValue) {
      return value.toLowerCase().startsWith(inputValue.toLowerCase());
    } else {
      return true;
    }
  });

  if (inputValue?.trim().length) {
    filteredItems.push("__NEW__");
  }

  function handleSelect(value: string) {
    if (value === "__NEW__") {
      if (inputValue !== null) {
        onCreate(inputValue);
        setSelectedValue(inputValue);
        setInputValue(null);
        setIsOpened(false);
      } else {
        setIsOpened(false);
      }
    } else {
      setSelectedValue(value);
      setInputValue(null);
      setIsOpened(false);
      onChange(value);
    }
  }

  const { referenceOnFocus, referenceOnBlur, ...referenceProps } =
    getReferenceProps({
      ...inputProps,
      onChange: _onChange,
      "aria-autocomplete": "list",
      onKeyDown(ev) {
        if (ev.key === "Enter") {
          if (activeIndex !== null && filteredItems[activeIndex]) {
            handleSelect(filteredItems[activeIndex]);
          }
        }
      },
    });

  return (
    <>
      {__debug ? (
        <>
          <Debug
            data={{
              isOpened,
              isHovered,
              isActive,
              isFocused,
              activeIndex: activeIndex,
              inputValue,
              selectedValue,
              // ComboBox: getThemeClassName("ComboBox", __theme.ComboBox),
              // Toggle: getThemeClassName("ComboBox_Toggle", __theme.Toggle),
              // InputText: getThemeClassName(
              //   "ComboBox_InputText",
              //   __theme.InputText,
              // ),
            }}
          />
        </>
      ) : null}
      <div
        className={getThemeClassName(className, __theme.ComboBox)}
        ref={refs.setPositionReference}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUpCapture={() => setIsActive(false)}
      >
        <InputText
          unstyled
          className={getThemeClassName("ComboBox_InputText", __theme.InputText)}
          ref={mergeRefs(refs.setReference, inputRef)}
          {...referenceProps}
          value={(() => {
            if (!isOpened) {
              if (inputValue === null) {
                return selectedValue;
              } else {
                return inputValue;
              }
            } else {
              if (inputValue === null) {
                return selectedValue;
              } else {
                return inputValue;
              }
            }
          })()}
          onFocus={(ev) => {
            if (typeof referenceOnFocus === "function") {
              referenceOnFocus(ev);
            }
            setIsFocused(true);
          }}
          onBlur={(ev) => {
            if (typeof referenceOnBlur === "function") {
              referenceOnBlur(ev);
            }
            setIsFocused(false);
          }}
        />
        <div
          onClick={() => {
            toggleIsOpened();
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(
              inputRef.current?.value.length,
              inputRef.current?.value.length,
            );
          }}
          className={getThemeClassName("ComboBox_Toggle", __theme.Toggle)}
        >
          <div
            className={getThemeClassName(
              "ComboBox_Toggle_IconClosed",
              __theme.Toggle_ClosedIcon,
            )}
          >
            {IconsForComboBox.Button_IconClosed()}
          </div>
          <div
            className={getThemeClassName(
              "ComboBox_Toggle_IconOpened",
              __theme.Toggle_OpenedIcon,
            )}
          >
            {IconsForComboBox.Button_IconOpened()}
          </div>
        </div>
      </div>
      <FloatingPortal>
        {isOpened && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            visuallyHiddenDismiss
          >
            <div
              className={getThemeClassName("ComboBox_List", __theme.List)}
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                },
              })}
            >
              {filteredItems.map((item, index) => (
                <ComboBoxItem
                  className={getThemeClassName(
                    "ComboBox_List_Item",
                    __theme.List_Item,
                    {
                      active: activeIndex === index,
                    },
                  )}
                  selected={activeIndex === index}
                  key={item}
                  {...getItemProps({
                    ref(node) {
                      listRef.current[index] = node;
                    },
                    onClick() {
                      handleSelect(item);
                    },
                  })}
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
