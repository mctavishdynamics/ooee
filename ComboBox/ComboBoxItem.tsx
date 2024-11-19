import { forwardRef } from "react";
import { useId } from "@floating-ui/react";
import clsx from "clsx";

export interface ComboBoxItemProps {
  children: React.ReactNode;
  active: boolean;
  className?: string;
  activeClassName?: string;
}

export const ComboBoxItem = forwardRef<
  HTMLDivElement,
  ComboBoxItemProps & React.HTMLProps<HTMLDivElement>
>(({ children, active, className, activeClassName, ...rest }, ref) => {
  const id = useId();

  return (
    <div
      className={clsx(className, {
        [activeClassName as string]: active,
      })}
      ref={ref}
      role="option"
      id={id}
      aria-selected={active}
      {...rest}
      style={{
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
});
