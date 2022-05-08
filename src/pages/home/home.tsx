import React from "react";
import Container from "../../components/container/container";
import UserList from "../../components/user-list/user-list";

import styles from "./home.module.scss";

const Home = () => (
  <Container>
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Список пользователей</h2>
      </div>
      <div className={styles.body}>
        <UserList />
      </div>
    </section>
  </Container>
);

export default Home;
