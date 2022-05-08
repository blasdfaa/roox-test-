import React from "react";
import cn from "classnames";

import styles from "./text-field.module.scss";

type TextFieldProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  label: string;
  multiline?: boolean;
  placeholder?: string;
  keyId?: React.Key | null;
  disabled?: boolean;
  className?: string;
  gutterBottom?: boolean;
  // Для более-менее понятного апи для контроллов, вдохновился апи из mui-библиотеки - https://mui.com/material-ui/api/input/
  // Так можно легко удобно разделить пропсы для компонента/инпута
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const TextField: React.FC<TextFieldProps> = ({
  multiline = false,
  label,
  id,
  placeholder,
  disabled = false,
  className,
  gutterBottom = false,
  inputProps,
  textAreaProps,
  ...props
}) => {
  // Для управления нативным валидатором через цсс можно получить доступ к дата-атрибутам через цсс и красить инпуты в зависимости от стейта
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <div
      className={cn(styles.root, className, {
        [styles.gutter_bottom]: gutterBottom,
        [styles.multiline]: multiline,
      })}
      {...props}
    >
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {!multiline && (
        <input
          className={styles.input}
          type="text"
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={() => setIsFocused(true)}
          data-focused={isFocused}
          {...inputProps}
        />
      )}
      {multiline && (
        <textarea
          className={styles.input}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={() => setIsFocused(true)}
          data-focused={isFocused}
          {...textAreaProps}
        />
      )}
    </div>
  );
};

export default TextField;
