import React from "react";
import { type User } from "../../interfaces/user.interface";
import AppButton from "../ui/app-button/app-button";
import TextField from "../ui/text-field/text-field";

import styles from "./user-form.module.scss";

type UserFormProps = {
  edit?: boolean;
  data: User;
  onSubmit?: () => void;
};

const fields = [
  // Здесь также можно прокинуть pattern и использовать регулярки для нативной валидации
  // Так-как в ТЗ не уточняются варианты валидации, не стал усложнять
  { id: 1, name: "name", label: "Name", required: true },
  { id: 2, name: "username", label: "User name", required: true },
  {
    id: 3,
    name: "email",
    label: "E-mail",
    pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
    required: true,
  },
  { id: 4, name: "street", label: "Street", required: true },
  { id: 5, name: "city", label: "City", required: true },
  {
    id: 6,
    name: "zipcode",
    label: "Zip code",
    pattern: "^[0-9]{5}(?:-[0-9]{4})?$", // валидный пример - 12345-1234
    required: true,
  },
  {
    id: 7,
    name: "phone",
    label: "Phone",
    required: true,
  },
  {
    id: 8,
    name: "website",
    label: "Website",
    required: true,
  },
];

const defaultFormState = {
  email: "",
  name: "",
  username: "",
  street: "",
  phone: "",
  comment: "",
  website: "",
  city: "",
  zipcode: "",
};

const UserProfileForm: React.FC<UserFormProps> = ({
  data,
  edit = false,
  onSubmit,
}) => {
  const [values, setValues] = React.useState(defaultFormState);

  React.useEffect(() => {
    if (data) {
      setValues({ ...data, comment: "" });
    }
  }, []);

  const handleChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(JSON.stringify(Object.fromEntries(formData.entries()))); // Нужный вывод
  };

  return (
    <form
      className={styles.root}
      onSubmit={(e) => {
        handleSubmit(e);

        return onSubmit && onSubmit();
      }}
    >
      <div className={styles.wrapper}>
        {fields.map(({ id, label, name, required, pattern }) => (
          <TextField
            key={id}
            id={label}
            label={label}
            disabled={!edit}
            inputProps={{
              value: values[name as keyof typeof defaultFormState],
              onChange: handleChangeField,
              name,
              required,
              placeholder: `Введите ${name}`,
              pattern,
            }}
            gutterBottom
          />
        ))}
        <TextField
          id="comment"
          label="Comment"
          disabled={!edit}
          textAreaProps={{
            value: values.comment,
            onChange: handleChangeField,
            name: "comment",
            placeholder: "Введите comment",
          }}
          multiline
        />
      </div>
      <AppButton
        className={styles.submit_button}
        variant="success"
        type="submit"
        disabled={!edit}
      >
        Отправить
      </AppButton>
    </form>
  );
};

export default UserProfileForm;
