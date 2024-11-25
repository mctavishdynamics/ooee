import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useMemo,
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

import { InputText } from "../InputText/InputText.tsx";
import { ComboBoxItem } from "./ComboBoxItem.tsx";
import { ComboBoxIcons } from "./ComboBoxIcons.tsx";
import {
  ComboBoxDefaultTheme,
  ComboBoxTheme,
  ComboBoxThemeArgs,
} from "./ComboBoxTheme.ts";
import { ThemeToken } from "../../lib/ThemeToken.ts";
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

  onChange?: (value: string) => void;

  enableCreation?: boolean;
  onCreate?: (value: string) => void;

  emptyMessage?: string;
  filteredEmptyMessage?: string;
  itemRenderer?: (
    value: string,
    inputValue?: null | string,
  ) => string | ReactNode;
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

  onChange = () => {},

  enableCreation = false,
  onCreate = () => {},

  emptyMessage = "(Empty)",
  filteredEmptyMessage = "(No Results)",
  itemRenderer = (value, inputValue) => {
    if (value === "__EMPTY__") {
      return emptyMessage;
    } else if (value === "__FILTERED_EMPTY__") {
      return filteredEmptyMessage;
    } else if (value === "__NEW__") {
      return `Create ${inputValue}...`;
    } else {
      return value;
    }
  },

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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // HOOKS

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
  // Value Filtering and selection/creation handlers

  const filteredValues = useMemo(() => {
    const _filteredValues = values.filter((value) => {
      if (inputValue === null) {
        return true;
      } else if (selectedValue !== inputValue) {
        return value.toLowerCase().startsWith(inputValue.toLowerCase());
      } else {
        return true;
      }
    });

    if (inputValue?.trim().length && enableCreation) {
      _filteredValues.push("__NEW__");
    } else if (!values.length) {
      _filteredValues.push("__EMPTY__");
    } else if (!_filteredValues.length) {
      _filteredValues.push("__FILTERED_EMPTY__");
    }

    return _filteredValues;
  }, [values, inputValue]);

  const isEmpty =
    filteredValues.length === 1 &&
    ["__EMPTY__", "__FILTERED_EMPTY__"].indexOf(filteredValues[0])
      ? true
      : false;

  console.log(isEmpty);

  function handleSelect(value: string) {
    if (enableCreation && value === "__NEW__") {
      if (inputValue !== null) {
        onCreate(inputValue);
        setSelectedValue(inputValue);
        setInputValue(null);
        setIsOpened(false);
      } else {
        setIsOpened(false);
      }
    } else if (value.startsWith("__")) {
      return;
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
          if (activeIndex !== null && filteredValues[activeIndex]) {
            handleSelect(filteredValues[activeIndex]);
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
            {ComboBoxIcons.Toggle_IconClosed()}
          </div>
          <div
            className={getThemeClassName(
              "ComboBox_Toggle_IconOpened",
              __theme.Toggle_OpenedIcon,
            )}
          >
            {ComboBoxIcons.Toggle_IconOpened()}
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
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                },
              })}
              onMouseLeave={(ev) => {
                if (ev.buttons) {
                  setIsOpened(false);
                }
              }}
            >
              {filteredValues.map((value, index) => (
                <ComboBoxItem
                  className={getThemeClassName(
                    "ComboBox_List_Item",
                    __theme.List_Item,
                    {
                      active: isEmpty ? false : activeIndex === index,
                    },
                  )}
                  selected={isEmpty ? false : activeIndex === index}
                  key={value}
                  {...(["__EMPTY__", "__FILTERED_EMPTY__"].indexOf(value) < 0
                    ? getItemProps({
                        ref(node) {
                          listRef.current[index] = node;
                        },
                        onClick() {
                          handleSelect(value);
                        },
                      })
                    : {})}
                >
                  {itemRenderer(value, inputValue)}
                </ComboBoxItem>
              ))}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
