import React from "react";
import cn from "classnames";

import styles from "./app-button.module.scss";

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.PropsWithChildren<{
    variant?: "success" | "primary";
  }>;

const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant = "primary",
  className,
  disabled,
  type,
  ...props
}) => (
  <button
    className={cn(styles.root, className, {
      [styles.primary]: variant === "primary",
      [styles.success]: variant === "success",
      [styles.disabled]: disabled,
    })}
    disabled={disabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default AppButton;
