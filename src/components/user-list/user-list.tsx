import React from "react";
import { AppContext } from "../../context/app-context";
import useLoadingStatus from "../../hooks/use-loading-status";
import { User } from "../../interfaces/user.interface";
import userApi from "../../service/user-api.service";
import { sortUsersByType } from "../../utils/sort-users-by-type";
import UserCard from "../user-card/user-card";

import styles from "./user-list.module.scss";

const MAX_USERS_LENGTH = 10;

const UserList = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  const { setLoadingStatus, isLoading, isError, isSuccess } =
    useLoadingStatus("loading");

  const { sortMode } = React.useContext(AppContext);

  React.useEffect(() => {
    userApi.getAll(
      (data) => {
        setUsers(data.slice(0, MAX_USERS_LENGTH));
        setLoadingStatus("success");
      },
      () => {
        setLoadingStatus("error");
      }
    );
  }, []);

  React.useEffect(() => {
    setUsers(sortUsersByType(users, sortMode));
  }, [sortMode]);

  const isUsersDataExist = users.length !== 0;

  return (
    <>
      <ul className={styles.list}>
        {users &&
          users.map((user) => (
            <li className={styles.list_item} key={user.id}>
              <UserCard
                data={{
                  city: user.city,
                  id: user.id,
                  company: user.company,
                  name: user.name,
                }}
              />
            </li>
          ))}
      </ul>
      {isSuccess && !isUsersDataExist && (
        <p className={styles.status_text}>Список пользователей пуст 😕</p>
      )}
      {isLoading && <p className={styles.status_text}>Загрузка...</p>}
      {isError && (
        <p className={styles.status_text}>Ошибка! Попробуйте позже</p>
      )}
      {!isLoading && isUsersDataExist && (
        <p className={styles.stat_message}>
          Найдено {users.length} пользователей
        </p>
      )}
    </>
  );
};

export default UserList;
