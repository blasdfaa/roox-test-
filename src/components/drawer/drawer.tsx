import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/app-context";
import AppButton from "../ui/app-button/app-button";

import styles from "./drawer.module.scss";

const HOME_PAGE_ROUTE = "/";

const Drawer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { handleSortMode } = React.useContext(AppContext);

  const handleCheckHomePage = () => {
    // Решил сделать редирект на главную по нажатию на кнопку сортировки
    // Иначе не понятно зачем на них можно нажимать когда нет айтемов для сортирки
    // ? Как вариант кнопки можно дизаблить на других страницах
    if (pathname !== HOME_PAGE_ROUTE) {
      navigate(HOME_PAGE_ROUTE);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <p className={styles.title}>Сортировка</p>
        <AppButton
          className={styles.button}
          variant="primary"
          type="button"
          data-sort-type="city"
          onClick={(e) => {
            handleCheckHomePage();

            return handleSortMode && handleSortMode(e);
          }}
        >
          по городу
        </AppButton>
        <AppButton
          className={styles.button}
          variant="primary"
          type="button"
          data-sort-type="company"
          onClick={(e) => {
            handleCheckHomePage();
            return handleSortMode && handleSortMode(e);
          }}
        >
          по компании
        </AppButton>
      </div>
    </div>
  );
};

export default Drawer;
