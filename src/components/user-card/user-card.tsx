import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { type User } from "../../interfaces/user.interface";

import styles from "./user-card.module.scss";

type UserCardProps = {
  data: Pick<User, "id" | "name" | "city" | "company">;
  className?: string;
};
type InfoRowProps = { param: string; value: string };

const InfoRow: React.FC<InfoRowProps> = ({ param, value }) => (
  <p className={styles.info_key}>
    {param} <span className={styles.info_value}>{value}</span>
  </p>
);

const UserCard: React.FC<UserCardProps> = ({ data, className }) => {
  const { id, city, name, company } = data;

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.info}>
        <InfoRow param="ФИО:" value={name} />
        <InfoRow param="Город:" value={city} />
        <InfoRow param="Компания:" value={company} />
      </div>
      <div className={styles.controls}>
        <Link className={styles.link} to={`/user/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
