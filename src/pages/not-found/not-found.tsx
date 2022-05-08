import React from "react";
import { Link } from "react-router-dom";

import styles from "./not-found.module.scss";

const NotFound: React.FC<{ message?: string }> = ({
  message = "Страница не найдена",
}) => (
  <div className={styles.root}>
    <h1 className={styles.message}>{message}</h1>
    <Link className={styles.link} to="/">
      Вернуться на главную
    </Link>
  </div>
);

export default NotFound;
