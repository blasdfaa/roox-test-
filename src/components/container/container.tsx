import React from "react";

import styles from "./container.module.scss";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  React.FC<React.PropsWithChildren<Record<never, unknown>>>;

const Container: ContainerProps = ({ children, ...props }) => (
  <div className={styles.root} {...props}>
    {children}
  </div>
);

export default Container;
