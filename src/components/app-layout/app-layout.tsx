import React from "react";
import { Outlet } from "react-router-dom";
import { AppContextProvider } from "../../context/app-context";
import Drawer from "../drawer/drawer";

import styles from "./app-layout.module.scss";

const AppLayout = () => (
  <AppContextProvider>
    <Drawer />
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  </AppContextProvider>
);

export default AppLayout;
