import React from "react"
import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import s from "./FormsControl.module.css"

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
};

export const Input: React.FC<FormControlPropsType & WrappedFieldProps> = ({
  input,
  meta,
  ...props
}) => {
  const hasError = meta.touched && meta.error;
  const hasLengthError = !meta.touched && meta.error !== "Обязательное поле";
  return (
    <div
      className={
        s.formControl +
        " " +
        (hasLengthError ? hasLengthError && s.error : hasError && s.error)
      }
    >
      <div>
        <input {...input} {...props} />
      </div>
      {/* {hasError && <span>{meta.error}</span>} */}
      {hasLengthError
        ? hasLengthError && <span>{meta.error}</span>
        : hasError && <span>{meta.error}</span>}
    </div>
  );
};

export type GetStringKeys<T> = Extract<keyof T, string>
