import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container/container";
import AppButton from "../../components/ui/app-button/app-button";
import UserProfileForm from "../../components/user-form/user-form";
import useLoadingStatus from "../../hooks/use-loading-status";
import { User } from "../../interfaces/user.interface";
import userApi from "../../service/user-api.service";
import NotFound from "../not-found/not-found";

import styles from "./user-screen.module.scss";

const UserScreen = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = React.useState<User | null>(null);
  const [editMode, setEditMode] = React.useState(false);

  const { setLoadingStatus, isLoading, isError } = useLoadingStatus("loading");

  React.useEffect(() => {
    if (id) {
      userApi.getById(
        id,
        (data) => {
          setUser(data);
          setLoadingStatus("success");
        },
        () => {
          setLoadingStatus("error");
        }
      );
    }
  }, [id]);

  if (!id) {
    return <NotFound message="Полльзователь не найден!" />;
  }

  return (
    <Container>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Профиль пользоваетля</h2>
          <AppButton
            type="button"
            disabled={editMode || isError}
            onClick={() => setEditMode(true)}
          >
            Редактироввать
          </AppButton>
        </div>
        {isLoading && <p className={styles.status_text}>Загрузка...</p>}
        {isError && (
          <p className={styles.status_text}>Ошибка! Попробуйте позже</p>
        )}
        {user && (
          <UserProfileForm
            edit={editMode}
            data={user}
            onSubmit={() => setEditMode(false)}
          />
        )}
      </section>
    </Container>
  );
};

export default UserScreen;
