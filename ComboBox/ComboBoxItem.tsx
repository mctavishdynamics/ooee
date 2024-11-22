import { forwardRef } from "react";
import { useId } from "@floating-ui/react";
import clsx from "clsx";

export interface ComboBoxItemProps {
  children: React.ReactNode;
  selected: boolean;
  className?: string;
}

export const ComboBoxItem = forwardRef<
  HTMLDivElement,
  ComboBoxItemProps & React.HTMLProps<HTMLDivElement>
>(({ children, selected, className, ...rest }, ref) => {
  const id = useId();

  return (
    <div
      className={clsx(className)}
      ref={ref}
      role="option"
      id={id}
      aria-selected={selected}
      {...rest}
      style={{
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
});
